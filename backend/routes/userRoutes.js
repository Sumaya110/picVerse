import { Router } from "express";
import { verifyToken } from "../middlewares/authMiddleware.js";
import {
  updateUser,
  fetchUsers,
  showUser,
  deleteUser,
} from "../Controller/UserController.js";

const router = Router();

router.get("/profile", verifyToken, (req, res) => {
  const { userId, email } = req.user;
  res.json({ userId, email });
});

router.put("/:id", updateUser);
router.get("/", fetchUsers);
router.get("/:id", showUser);
router.delete("/:id", deleteUser);

export default router;
