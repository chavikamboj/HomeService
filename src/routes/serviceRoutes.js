const express = require("express");
const router = express.Router();

const Service = require("../models/Service");
const { protect } = require("../middleware/authMiddleware");
const { adminOnly } = require("../middleware/roleMiddleware");

// GET all services (public)
router.get("/", async (req, res) => {
  try {
    const services = await Service.findAll();
    res.status(200).json(services);
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Server Error" });
  }
});

// POST create service (admin)
router.post("/", protect, adminOnly, async (req, res) => {
  try {
    const { name, description, price } = req.body;

    const service = await Service.create({ name, description, price });
    res.status(201).json({ message: "Service created ✅", service });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Server Error" });
  }
});

// PUT update service (admin)
router.put("/:id", protect, adminOnly, async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price } = req.body;

    const service = await Service.findByPk(id);
    if (!service) return res.status(404).json({ message: "Service not found ❌" });

    service.name = name ?? service.name;
    service.description = description ?? service.description;
    service.price = price ?? service.price;

    await service.save();
    res.json({ message: "Service updated ✅", service });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Server Error" });
  }
});

// DELETE service (admin)
router.delete("/:id", protect, adminOnly, async (req, res) => {
  try {
    const { id } = req.params;

    const service = await Service.findByPk(id);
    if (!service) return res.status(404).json({ message: "Service not found ❌" });

    await service.destroy();
    res.json({ message: "Service deleted ✅" });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;