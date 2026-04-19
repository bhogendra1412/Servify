const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  userId:    { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  serviceId: { type: String, required: true },
  date:      { type: String, required: true },
  timeSlot:  { type: String, required: true },
  status:    { type: String, enum: ["confirmed", "cancelled"], default: "confirmed" },
}, { timestamps: true });

// THIS is what prevents double booking
bookingSchema.index({ serviceId: 1, date: 1, timeSlot: 1 }, { unique: true });

module.exports = mongoose.model("Booking", bookingSchema);