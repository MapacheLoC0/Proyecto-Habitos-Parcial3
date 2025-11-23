import { Router } from "express";
import authRoutes from "./auth.routes";
import habitRoutes from "./habits.routes";
import routineRoutes from "./routine.routes";

const router = Router();

router.use("/auth", authRoutes);
router.use("/habits", habitRoutes);
router.use("/routines", routineRoutes);

export default router;
