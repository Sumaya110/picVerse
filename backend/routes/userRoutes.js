import { Router } from "express";
import { verifyToken } from "../middlewares/authMiddleware.js";
import {
  updateUser,
  fetchUsers,
  showUser,
  deleteUser,
  // getProfile,
} from "../Controller/UserController.js";

const router = Router();

router.get("/profile", verifyToken, (req, res) => {
  res.json({ message: "Profile Page", user: req.user });
});



router.put("/:id", updateUser);
router.get("/", fetchUsers);
router.get("/:id", showUser);
router.delete("/:id", deleteUser);

export default router;
