require("dotenv").config();
const express = require("express");
const cors = require("cors");

// routes
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");
const serviceRoutes = require("./routes/serviceRoutes");
const bookingRoutes = require("./routes/bookingRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/bookings", bookingRoutes);

app.get("/", (req, res) => res.send("HomeService API Running ✅"));

module.exports = app;