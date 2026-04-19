const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema({
  name:        { type: String, required: true },
  description: { type: String, default: "" },
  emoji:       { type: String, default: "🛠️" },
  category:    { type: String, default: "General" },
  price:       { type: Number, required: true },
  duration:    { type: String, default: "" },
}, { timestamps: true });

module.exports = mongoose.model("Service", serviceSchema);