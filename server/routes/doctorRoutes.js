import express from "express";
import {
  registerDoctor,
  doctorLogin,
  logout,
  protect,
  sample,
} from "../controllers/authController.js";
import {
  createSlot,
  myAppointments,
  mySlots,
} from "../controllers/doctorController.js";

const router = express.Router();

router.post("/signup", registerDoctor);
router.post("/login", doctorLogin);
router.get("/logout", logout);
router.get("/sample", protect, sample);

router.post("/createSlot/:doctorId", protect, createSlot);
router.get("/scheduledAppointments/:doctorId", protect, myAppointments);
router.post("/mySlots", protect, mySlots);

export default router;
