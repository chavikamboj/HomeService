const express = require("express");
const router = express.Router();
const Contact = require("../models/Contact");

// POST - Contact form submit
router.post("/", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ message: "All fields are required" });
    }

    await Contact.create({
      name,
      email,
      message,
    });

    res.status(201).json({ message: "Message sent successfully" });
  } catch (error) {
    console.error("Contact route error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// GET - Admin ke liye saare contact messages lana
router.get("/", async (req, res) => {
  try {
    const contacts = await Contact.findAll({
      order: [["createdAt", "DESC"]],
    });

    res.status(200).json(contacts);
  } catch (error) {
    console.error("Fetch contacts error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;