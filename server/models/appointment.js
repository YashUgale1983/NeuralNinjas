import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
  doctorId: { type: mongoose.Schema.Types.ObjectId, ref: "Doctor" },
  patient: {
    name: { type: String },
    email: { type: String },
    phoneNumber: { type: String },
    dateAdded: { type: Date, default: Date.now },
  },
  slotId: { type: mongoose.Schema.Types.ObjectId, ref: "Slot" }, // Reference to slot
  date: { type: Date, required: true },
  startTime: { type: Date, required: true }, // Start time of the appointment
  endTime: { type: Date, required: true }, // End time of the appointment

  // Waitlisted patients for this appointment
  waitlist: [
    {
      name: { type: String, required: true },
      email: { type: String, required: true },
      phoneNumber: { type: String, required: true },
      dateAdded: { type: Date, default: Date.now },
    },
  ],
});

// Limit the waitlist to a maximum of 5 patients
appointmentSchema.path("waitlist").validate(function (value) {
  return value.length <= 2;
}, "Waitlist can have a maximum of 2 patients.");

const Appointment = mongoose.model("Appointment", appointmentSchema);

export default Appointment;
