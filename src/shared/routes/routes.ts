import { Router } from "express";
import authRouter from "../../features/auth/auth.routes";

const router = Router();

router.use('/auth', authRouter);

export default router;