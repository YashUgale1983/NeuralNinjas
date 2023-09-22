import mongoose from "mongoose";
import validator from "validator";

const doctorSchema = new mongoose.Schema({
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
  expertise: { type: String, required: true },
  location: {
    type: String,
    required: [true, "Must enter your clinic location..."],
  },
  consultationFees: {
    type: Number,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: [true, "please provide your phone number..."],
    unique: true,
    validate: [validator.isMobilePhone, "Invalid phone number..."],
    max: 10,
  },
  // Appointments booked by patients for this doctor
  appointments: [
    {
      patientId: { type: mongoose.Schema.Types.ObjectId, ref: "Patient" },
      slotId: { type: mongoose.Schema.Types.ObjectId, ref: "Slot" },
      date: { type: Date, required: true },
    },
  ],
});

const Doctor = mongoose.model("Doctor", doctorSchema);

export default Doctor;
