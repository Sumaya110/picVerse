import prisma from "../DB/db.config.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const createUser = async (req, res) => {
  console.log("Uploading image...");

  try {
    const { username, email, password } = req.body;

    const findUser = await prisma.user.findUnique({ where: { email } });
    if (findUser)
      return res.status(400).json({ message: "Email already taken." });

    const hashedPassword = await bcrypt.hash(password, 10);

    // If an image is uploaded, use its path; otherwise, set a default image
    const profilePic = req.file
      ? `/uploads/images/${req.file.filename}`
      : "/uploads/images/default-profile.png";

    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
        profilePic,
      },
    });

    return res
      .status(201)
      .json({ status: 201, data: newUser, msg: "User created successfully" });
  } catch (error) {
    console.error("Error creating user:", error);
    return res.status(500).json({ message: "Server error", error });
  }
};


export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  // Check if user exists
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    return res.status(400).json({ message: "Invalid email or password" });
  }

  // Compare entered password with stored hash
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(400).json({ message: "Invalid email or password" });
  }

  // Generate JWT token
  const token = jwt.sign(
    { userId: user.id, email: user.email },
    process.env.SECRET_KEY,
    {
      expiresIn: "1h",
    }
  );

  return res.status(200).json({ message: "Login successful", token });
};

export const updateUser = async (req, res) => {
  const userId = req.params.id;
  const { username, bio, profilePic } = req.body;

  await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      username,
      bio,
      profilePic,
    },
  });

  return res.json({ status: 200, message: "User updated successfully" });
};

export const fetchUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        username: true,
        email: true,
        bio: true,
        profilePic: true,
      },
    });

    return res.status(200).json({ status: "success", data: users });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ status: "error", message: "Failed to fetch users" });
  }
};

export const showUser = async (req, res) => {
  const userId = req.params.id;
  console.log("userId", userId);

  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  return res.json({ status: 200, data: user });
};

export const deleteUser = async (req, res) => {
  const userId = req.params.id;
  await prisma.user.delete({
    where: {
      id: userId,
    },
  });

  return res.json({ status: 200, msg: "User deleted successfully" });
};
