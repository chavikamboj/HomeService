const Booking = require("../models/Booking");
const Service = require("../models/Service");
const User = require("../models/User");

const sendEmail = require("../utils/sendEmail");
const { getIO } = require("../socket");

// ✅ POST /api/bookings/create  (protected)
exports.createBooking = async (req, res) => {
  try {
    const { serviceId, bookingDate, address } = req.body;

    if (!serviceId || !bookingDate || !address) {
      return res.status(400).json({ message: "All fields required ❌" });
    }

    // service exists?
    const service = await Service.findByPk(serviceId);
    if (!service) {
      return res.status(404).json({ message: "Service not found ❌" });
    }

    const booking = await Booking.create({
      bookingDate,
      address,
      status: "pending",
      ServiceId: serviceId,
      UserId: req.user.id
    });

    // user details for email
    const user = await User.findByPk(req.user.id);

    // 🔔 SOCKET: booking created
    try {
      const io = getIO();
      io.to(String(req.user.id)).emit("booking:created", {
        message: "Booking created ✅",
        bookingId: booking.id,
        status: booking.status,
        serviceId: booking.ServiceId
      });
    } catch (e) {
      console.log("Socket emit failed (create):", e.message);
    }

    // 📧 EMAIL: booking received
    try {
      if (user?.email) {
        await sendEmail({
          to: user.email,
          subject: "Booking Received ✅",
          text: `Hi ${user.name}, your booking request is received.\n\nService: ${service.name}\nDate: ${bookingDate}\nAddress: ${address}\nStatus: pending\n\n- HomeService`
        });
      }
    } catch (e) {
      console.log("Email failed (create):", e.message);
    }

    return res.status(201).json({
      message: "Booking created successfully ✅",
      booking
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Server Error" });
  }
};

// ✅ GET /api/bookings/my  (protected)
exports.getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.findAll({
      where: { UserId: req.user.id },
      include: [{ model: Service }],
      order: [["createdAt", "DESC"]]
    });

    return res.status(200).json(bookings);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Server Error" });
  }
};

// ✅ GET /api/bookings  (admin only) - all bookings
exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.findAll({
      include: [{ model: Service }, { model: User, attributes: ["id", "name", "email", "role"] }],
      order: [["createdAt", "DESC"]]
    });

    return res.status(200).json(bookings);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Server Error" });
  }
};

// ✅ PATCH /api/bookings/:id/status  (admin only)
exports.updateBookingStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const { id } = req.params;

    const allowed = ["pending", "confirmed", "completed", "cancelled"];
    if (!allowed.includes(status)) {
      return res.status(400).json({ message: "Status not allowed ❌" });
    }

    const booking = await Booking.findByPk(id);
    if (!booking) return res.status(404).json({ message: "Booking not found ❌" });

    booking.status = status;
    await booking.save();

    // email + socket to booking owner
    const user = await User.findByPk(booking.UserId);

    // 🔔 SOCKET: status updated
    try {
      const io = getIO();
      io.to(String(booking.UserId)).emit("booking:status_updated", {
        message: `Booking status updated: ${booking.status}`,
        bookingId: booking.id,
        status: booking.status
      });
    } catch (e) {
      console.log("Socket emit failed (status):", e.message);
    }

    // 📧 EMAIL: confirmed/completed/cancelled
    try {
      if (user?.email) {
        await sendEmail({
          to: user.email,
          subject: `Booking ${status.toUpperCase()} ✅`,
          text: `Hi ${user.name}, your booking #${booking.id} status is now: ${status}.\n\n- HomeService`
        });
      }
    } catch (e) {
      console.log("Email failed (status):", e.message);
    }

    return res.status(200).json({
      message: "Booking status updated ✅",
      booking
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Server Error" });
  }
};

// ✅ PATCH /api/bookings/:id/cancel  (protected) - user cancels own booking
exports.cancelBooking = async (req, res) => {
  try {
    const { id } = req.params;

    const booking = await Booking.findByPk(id);
    if (!booking) return res.status(404).json({ message: "Booking not found ❌" });

    // only owner can cancel
    if (booking.UserId !== req.user.id) {
      return res.status(403).json({ message: "Not allowed ❌" });
    }

    booking.status = "cancelled";
    await booking.save();

    const user = await User.findByPk(req.user.id);

    // 🔔 SOCKET: cancelled
    try {
      const io = getIO();
      io.to(String(req.user.id)).emit("booking:cancelled", {
        message: "Booking cancelled ❌",
        bookingId: booking.id,
        status: booking.status
      });
    } catch (e) {
      console.log("Socket emit failed (cancel):", e.message);
    }

    // 📧 EMAIL: cancelled
    try {
      if (user?.email) {
        await sendEmail({
          to: user.email,
          subject: "Booking Cancelled ❌",
          text: `Hi ${user.name}, your booking #${booking.id} has been cancelled.\n\n- HomeService`
        });
      }
    } catch (e) {
      console.log("Email failed (cancel):", e.message);
    }

    return res.status(200).json({
      message: "Booking cancelled ✅",
      booking
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Server Error" });
  }
};