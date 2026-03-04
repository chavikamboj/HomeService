const express = require("express");
const router = express.Router();

const bookingController = require("../controllers/bookingController");
const { protect } = require("../middleware/authMiddleware");
const { adminOnly } = require("../middleware/roleMiddleware");

// USER: create booking
router.post("/create", protect, bookingController.createBooking);

// USER: my bookings
router.get("/my", protect, bookingController.getMyBookings);

// ADMIN: all bookings
router.get("/", protect, adminOnly, bookingController.getAllBookings);

// ADMIN: update booking status
router.patch("/:id/status", protect, adminOnly, bookingController.updateBookingStatus);

// USER: cancel own booking
router.patch("/:id/cancel", protect, bookingController.cancelBooking);

module.exports = router;