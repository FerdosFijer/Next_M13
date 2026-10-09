import express from "express";
import { authController } from "./auth.controller";

const router = express.Router();

router.post("/login", authController.loginUser ); // the link will be : http://localhost:5000/auth/login

export const authRoutes = router;