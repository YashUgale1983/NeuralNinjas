import express from "express";
import {
  registerPatient,
  patientLogin,
  logout,
  protect,
  sample,
} from "../controllers/authController.js";
import {
  bookAppointment,
  allSlots,
  myAppointments,
} from "../controllers/patientController.js";

const router = express.Router();

router.post("/signup", registerPatient);
router.post("/login", patientLogin);
router.get("/logout", logout);
router.get("/sample", protect, sample);

router.post("/bookAppointment/:slotId", protect, bookAppointment);
router.get("/allSlots", allSlots);
router.get("/myAppointments/:patientId", protect, myAppointments);

export default router;
