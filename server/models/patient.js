import mongoose from "mongoose";
import validator from "validator";

const patientSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "User name must be entered..."],
    unique: true,
    trim: true,
    max: 50,
  },
  password: {
    type: String,
    required: [true, "please provide a password..."],
    unique: true,
    minlength: 4,
    select: false,
  },
  email: {
    type: String,
    required: [true, "User email address must be provided..."],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Invalid email..."],
    max: 50,
  },
  phoneNumber: {
    type: String,
    required: [true, "please provide your phone number..."],
    unique: true,
    validate: [validator.isMobilePhone, "Invalid phone number..."],
    max: 10,
  },

  // Appointments that are currently booked by the patient
  appointments: [
    {
      doctorId: { type: mongoose.Schema.Types.ObjectId, ref: "Doctor" },
      slotId: { type: mongoose.Schema.Types.ObjectId, ref: "Slot" },
      date: { type: Date, required: true },
    },
  ],
});

const Patient = mongoose.model("Patient", patientSchema);

export default Patient;
