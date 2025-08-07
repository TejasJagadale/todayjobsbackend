const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  company: { type: String, required: true },
  location: { type: String, required: true },
  salary: String,
  category: { type: String, enum: ["IT", "Govt"], required: true }, // Add this
  type: { type: String, required: true },
  description: { type: String, required: true },
  requirements: { type: [String], required: true },
  applyLink: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Job", jobSchema);
