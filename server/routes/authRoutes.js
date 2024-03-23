import express from "express";
import {
  register,
  login,
  logout,
  protect,
} from "../controllers/authController.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);
router.get("/protect", protect);

export default router;
