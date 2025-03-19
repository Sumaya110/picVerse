import { Router } from "express";
import { createUser, loginUser } from "../Controller/UserController.js";
import upload from "../middlewares/upload.js";

const router = Router();

// router.post("/signup", createUser);
router.post("/signup",upload.single("profilePic"), createUser);
router.post("/login", loginUser);

export default router;