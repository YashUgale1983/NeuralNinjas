import Doctor from "../models/doctor.js";
import Patient from "../models/patient.js";
import Appointment from "../models/appointment.js";
import Slot from "../models/slot.js";

// TO CREATE A SLOT
export const createSlot = async (req, res) => {
  try {
    const { doctorId } = req.params;
    const { date, startTime, endTime } = req.body;

    const newSlot = new Slot({
      doctorId,
      date,
      startTime,
      endTime,
    });

    await newSlot.save();

    res.status(201).json({
      success: true,
      msg: "successfully created a slot!",
      data: newSlot,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({ success: false, error: err.message });
  }
};

// Show my appointments
// export const myAppointments = async (req, res) => {
//   try {
//     const doctorId = req.params.doctorId; // Get the patientId from the route params
//     // Use the Appointment model to find all appointments for the specified patientId
//     const doctor = await Doctor.findById(doctorId)
//       .populate({
//         path: "appointments",
//         populate: [
//           {
//             path: "patientId",
//             model: "Patient",
//             select: "name email phoneNumber", // Select the patient fields you need
//           },
//           {
//             path: "waitlist",
//             model: "Patient", // Populate waitlist patients
//             select: "name email phoneNumber", // Select the patient fields you need
//           },
//           { path: "slotId", model: "Slot" }, // Populate the slot details
//         ],
//       })
//       .exec();

//     if (!doctor) {
//       return res.status(404).json({
//         success: false,
//         error: "Doctor not found",
//       });
//     }
//     const appointments = doctor.appointments;
//     res.status(200).json({ success: true, data: appointments });
//   } catch (err) {
//     console.error(err);
//     res.status(400).json({ success: false, error: err.message });
//   }
// };
export const myAppointments = async (req, res) => {
  try {
    const doctorId = req.params.doctorId; // Get the doctorId from the route params

    // Use the Appointment model to find all appointments for the specified doctorId
    const appointments = await Appointment.find({ doctorId })
      .populate("slotId", "date startTime endTime")
      .exec();

    res.status(200).json({ success: true, data: appointments });
  } catch (err) {
    console.error(err);
    res.status(400).json({ success: false, error: err.message });
  }
};

// Show my slots
export const mySlots = async (req, res) => {
  try {
    const { doctorId } = req.body;
    const slots = await Slot.find({ doctorId });
    res.status(200).json({ success: true, data: slots });
  } catch (err) {
    console.error(err);
    res.status(400).json({ success: false, error: err.message });
  }
};
