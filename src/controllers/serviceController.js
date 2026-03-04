const Service = require("../models/Service");

// Create Service (Admin Only)
exports.createService = async (req, res) => {
  try {
    const { name, description, price } = req.body;

    const service = await Service.create({
      name,
      description,
      price
    });

    res.status(201).json({
      message: "Service created successfully ✅",
      service
    });

  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// Get All Services (Public)
exports.getServices = async (req, res) => {
  try {
    const services = await Service.findAll();
    res.status(200).json(services);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};