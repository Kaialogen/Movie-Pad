import express from "express";
import { login, register, profile, logout } from "../controllers/authController.js";

const router = express.Router();

router.post("/login", login);
router.post("/register", register);
router.get("/profile", profile);
router.post("/logout", logout);

export default router;
