const express = require("express");
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ message: "All fields are required" });
    }

    console.log("Contact Message Received:");
    console.log("Name:", name);
    console.log("Email:", email);
    console.log("Message:", message);

    res.status(200).json({ message: "Message sent successfully" });
  } catch (error) {
    console.error("Contact route error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;