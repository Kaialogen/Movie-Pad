import express from "express";
import {
  updateUsername,
  updatePassword,
  deleteAccount,
} from "../controllers/userController.js";

const router = express.Router();

router.put("/update-username", updateUsername);
router.put("/update-password", updatePassword);
router.delete("/delete-account", deleteAccount);

export default router;
