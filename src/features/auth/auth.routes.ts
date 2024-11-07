import express from "express";
import { AuthController } from "../auth/auth.controller";

const router = express.Router();

const authController = new AuthController();
router.post('/register', authController.registerNewUser.bind(authController));
router.post('/login', authController.login.bind);

export default router;