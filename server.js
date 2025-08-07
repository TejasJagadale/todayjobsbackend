require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const jobRoutes = require("./routes/jobRoutes.js");
const govLinkRoutes = require("./routes/govLinkRoutes.js");

const app = express();

// Middleware
// Enable CORS
app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:3001"], 
    credentials: true
  })
);
app.use(express.json());

// Database connection
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Routes
app.use("/api/jobs", jobRoutes);
app.use("/api/links", govLinkRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
