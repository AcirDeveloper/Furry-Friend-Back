import express from "express";
import { AuthController } from "../auth/auth.controller";

const router = express.Router();

const authController = new AuthController();
router.post('/login', (req, res) => authController.login(req, res));
router.post('/register', (req, res) => authController.registerNewUser(req, res));
export default router;