const express = require("express");
const router = express.Router();
const Job = require("../models/Job");
const mongoose = require("mongoose");
console.log("hi");

// GET all jobs
router.get("/", async (req, res) => {
  try {
    const { category } = req.query;
    const filter = category ? { category } : {};
    const jobs = await Job.find(filter).sort({ createdAt: -1 });
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// CREATE job (updated to include category)
router.post("/", async (req, res) => {
  const job = new Job({
    title: req.body.title,
    company: req.body.company,
    location: req.body.location,
    salary: req.body.salary,
    category: req.body.category, // Add this
    type: req.body.type,
    description: req.body.description,
    requirements: req.body.requirements,
    applyLink: req.body.applyLink
  });

  try {
    const newJob = await job.save();
    res.status(201).json(newJob);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// UPDATE job
router.put("/:id", async (req, res) => {
  try {
    const updatedJob = await Job.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          ...req.body,
          requirements: Array.isArray(req.body.requirements)
            ? req.body.requirements
            : req.body.requirements.split("\n").filter((r) => r.trim() !== "")
        }
      },
      { new: true }
    );
    res.json(updatedJob);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Add a new endpoint to get job counts by category
router.get("/counts", async (req, res) => {
  try {
    const counts = await Job.aggregate([
      {
        $group: {
          _id: "$category",
          count: { $sum: 1 }
        }
      }
    ]);
    res.json(counts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE job
router.delete("/:id", async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid job ID" });
    }

    const job = await Job.findByIdAndDelete(req.params.id);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    res.json({ message: "Job deleted successfully" });
  } catch (err) {
    console.error("Error deleting job:", err);
    res.status(500).json({
      message: "Failed to delete job",
      error: err.message // Include the actual error message
    });
  }
});

// Middleware to get job by ID
async function getJob(req, res, next) {
  let job;
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid job ID" });
    }

    job = await Job.findById(req.params.id);
    if (!job) {
      return res.status(404).json({ message: "Cannot find job" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.job = job;
  next();
}

module.exports = router;
