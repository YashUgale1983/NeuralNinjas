import Doctor from "../models/doctor.js";
import Patient from "../models/patient.js";
import Appointment from "../models/appointment.js";
import Slot from "../models/slot.js";

// To book an appointment
export const bookAppointment = async (req, res) => {
  try {
    // Extract the slotId from the route parameters
    const { slotId } = req.params;

    // Extract patient information from the request body (assuming it's sent as JSON)
    const { name, email, phoneNumber } = req.body;

    // Find the slot by its ID
    const slot = await Slot.findById(slotId);

    if (!slot || slot.date < Date.now()) {
      return res
        .status(404)
        .json({ success: false, error: "Slot not found or has expired..." });
    }

    // Check if an appointment already exists for this slot
    const existingAppointment = await Appointment.findOne({ slotId: slot._id });

    if (existingAppointment) {
      // Check if the patient already exists in the waitlist
      const isPatientInWaitlist = existingAppointment.waitlist.some(
        (patient) =>
          patient.email === email && patient.phoneNumber === phoneNumber
      );

      if (isPatientInWaitlist) {
        return res.status(200).json({
          success: true,
          message: "You are already in the waitlist for this appointment.",
        });
      }
      if (
        existingAppointment.patient.email === email ||
        existingAppointment.patient.phoneNumber === phoneNumber
      ) {
        return res.status(200).json({
          success: true,
          message: "You have booked the appointment already.",
        });
      }

      existingAppointment.waitlist.push({
        name,
        email,
        phoneNumber,
      });
      await existingAppointment.save();
      return res.status(200).json({
        success: true,
        message: "You have been added to the waitlist.",
      });
    }

    // Create a new appointment entry and add the patient to either the patient field or the waitlist
    const appointment = new Appointment({
      doctorId: slot.doctorId,
      slotId: slot._id,
      date: slot.date,
      startTime: slot.startTime,
      endTime: slot.endTime,
    });

    if (!appointment.patient.name) {
      appointment.patient = {
        name,
        email,
        phoneNumber,
      };
    }

    // Save the appointment to the database
    await appointment.save();

    const updatedPatient = await Patient.findOneAndUpdate(
      { email, phoneNumber },
      {
        $push: {
          appointments: {
            doctorId: slot.doctorId,
            slotId: slot._id,
            date: slot.date,
          },
        },
      },
      { new: true, upsert: true }
    );

    // await Doctor.findByIdAndUpdate(slot.doctorId, {
    //   $push: {
    //     appointments: {
    //       patientId: updatedPatient._id, // Add the patient's ID
    //       slotId: slot._id,
    //       date: slot.date,
    //     },
    //   },
    // });

    await Doctor.findByIdAndUpdate(
      slot.doctorId,
      {
        $push: {
          appointments: {
            patientId: updatedPatient._id,
            slotId: slot._id,
            date: slot.date,
          },
        },
      },
      { new: true } // This ensures that the updated doctor document is returned
    );

    res.status(201).json({ success: true, msg: "success", data: appointment });
  } catch (err) {
    console.log(err);
    res.status(400).json({ success: false, error: err.message });
  }
};

// Show all upcoming slots
export const allSlots = async (req, res) => {
  try {
    const currentDate = new Date(); // Get the current date and time

    const slots = await Slot.find({
      date: { $gte: currentDate }, // Filter slots where the date is greater than or equal to the current date
      endTime: { $gte: currentDate }, // Filter slots where the end time is greater than or equal to the current date
    });

    res.status(200).json({ success: true, data: slots }); // Send the filtered slots as a JSON response
  } catch (err) {
    console.log(err);
    res.status(400).json({ success: false, error: err.message });
  }
};

// Show my appointments
export const myAppointments = async (req, res) => {
  try {
    const patientId = req.params.patientId; // Get the patientId from the route params
    // Use the Appointment model to find all appointments for the specified patientId
    const patient = await Patient.findById(patientId)
      .populate({
        path: "appointments",
        populate: [
          { path: "doctorId", model: "Doctor" }, // Populate the doctor details
          { path: "slotId", model: "Slot" }, // Populate the slot details
        ],
      })
      .exec();
    const appointments = patient.appointments;
    res.status(200).json({ success: true, data: appointments });
  } catch (err) {
    console.error(err);
    res.status(400).json({ success: false, error: err.message });
  }
};
