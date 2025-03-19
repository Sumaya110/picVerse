import { Router } from "express";
import UserRoutes from './userRoutes.js'
import AuthRoutes from './authRoutes.js'
const router = Router();

router.use("/api/auth", AuthRoutes);
router.use("/api/users", UserRoutes);

export default router;