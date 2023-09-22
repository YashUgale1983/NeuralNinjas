import mongoose from "mongoose";

const slotSchema = new mongoose.Schema({
  doctorId: { type: mongoose.Schema.Types.ObjectId, ref: "Doctor" },
  date: { type: Date, required: true },
  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true },
});

// Pre save middleware to check if the doctor has already created a slot for that time
slotSchema.pre("validate", async function (next) {
  const existingSlot = await this.constructor.findOne({
    doctorId: this.doctorId,
    date: this.date,
    $or: [
      {
        $and: [
          { startTime: { $lt: this.endTime } }, // Check if new slot starts before existing slot ends
          { endTime: { $gt: this.startTime } }, // Check if new slot ends after existing slot starts
        ],
      },
      // You can add more conditions if needed
    ],
  });

  if (existingSlot) {
    // If there is a conflict, call next with an error
    next(new Error("Slot conflict: Doctor already has a slot at this time."));
  } else {
    // If no conflict, continue with validation
    next();
  }
});

const Slot = mongoose.model("Slot", slotSchema);

export default Slot;
