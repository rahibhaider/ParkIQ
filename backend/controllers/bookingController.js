const Booking = require("../models/Booking");
const Slot = require("../models/Slot");
const Location = require("../models/Location");

// ─── @route   POST /api/bookings
// ─── @access  Private (user)
const createBooking = async (req, res, next) => {
  try {
    const { slotId, locationId, date, startTime, endTime, vehicleType = "car" } = req.body;
    const allowedVehicleTypes = ["bike", "car", "suv", "ev"];

    if (!slotId || !locationId || !date || !startTime || !endTime) {
      return res.status(400).json({ success: false, message: "slotId, locationId, date, startTime and endTime are required" });
    }

    if (!allowedVehicleTypes.includes(vehicleType)) {
      return res.status(400).json({ success: false, message: "vehicleType must be one of bike, car, suv or ev" });
    }

    // Validate time order
    if (endTime <= startTime) {
      return res.status(400).json({ success: false, message: "endTime must be after startTime" });
    }

    // Check slot exists and belongs to location
    const slot = await Slot.findOne({ _id: slotId, location: locationId });
    if (!slot) {
      return res.status(404).json({ success: false, message: "Slot not found in this location" });
    }

    // Check slot is available
    if (slot.status === "booked") {
      return res.status(409).json({ success: false, message: "Slot is already booked" });
    }

    // Check location exists
    const location = await Location.findById(locationId);
    if (!location) {
      return res.status(404).json({ success: false, message: "Location not found" });
    }

    // Mark slot as booked
    slot.status = "booked";
    await slot.save();

    // Create booking record
    const booking = await Booking.create({
      user: req.user._id,
      location: locationId,
      slot: slotId,
      date,
      startTime,
      endTime,
      vehicleType,
    });

    // Populate for response
    const populated = await Booking.findById(booking._id)
      .populate("user", "name email")
      .populate("location", "name address icon")
      .populate("slot", "slotNumber");

    res.status(201).json({ success: true, data: populated });
  } catch (err) {
    next(err);
  }
};

// ─── @route   GET /api/bookings/my
// ─── @access  Private
const getMyBookings = async (req, res, next) => {
  try {
    const bookings = await Booking.find({ user: req.user._id })
      .populate("location", "name address icon")
      .populate("slot", "slotNumber")
      .sort("-createdAt");

    res.status(200).json({ success: true, count: bookings.length, data: bookings });
  } catch (err) {
    next(err);
  }
};

// ─── @route   GET /api/bookings/:id
// ─── @access  Private (owner or admin)
const getBooking = async (req, res, next) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate("user", "name email")
      .populate("location", "name address icon")
      .populate("slot", "slotNumber");

    if (!booking) return res.status(404).json({ success: false, message: "Booking not found" });

    // Only owner or admin can view
    if (booking.user._id.toString() !== req.user._id.toString() && req.user.role !== "admin") {
      return res.status(403).json({ success: false, message: "Not authorized" });
    }

    res.status(200).json({ success: true, data: booking });
  } catch (err) {
    next(err);
  }
};

// ─── @route   PUT /api/bookings/:id/cancel
// ─── @access  Private (owner or admin)
const cancelBooking = async (req, res, next) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ success: false, message: "Booking not found" });

    // Only owner or admin can cancel
    if (booking.user.toString() !== req.user._id.toString() && req.user.role !== "admin") {
      return res.status(403).json({ success: false, message: "Not authorized" });
    }

    if (booking.status === "cancelled") {
      return res.status(400).json({ success: false, message: "Booking is already cancelled" });
    }

    // Free the slot
    await Slot.findByIdAndUpdate(booking.slot, { status: "available" });

    booking.status = "cancelled";
    await booking.save();

    res.status(200).json({ success: true, message: "Booking cancelled", data: booking });
  } catch (err) {
    next(err);
  }
};

// ─── @route   GET /api/bookings   (admin – all bookings)
// ─── @access  Admin
const getAllBookings = async (req, res, next) => {
  try {
    const { status, locationId } = req.query;
    const query = {};
    if (status) query.status = status;
    if (locationId) query.location = locationId;

    const bookings = await Booking.find(query)
      .populate("user", "name email")
      .populate("location", "name address icon")
      .populate("slot", "slotNumber")
      .sort("-createdAt");

    res.status(200).json({ success: true, count: bookings.length, data: bookings });
  } catch (err) {
    next(err);
  }
};

// ─── @route   GET /api/bookings/stats   (admin)
// ─── @access  Admin
const getStats = async (req, res, next) => {
  try {
    const totalBookings    = await Booking.countDocuments();
    const confirmedBookings = await Booking.countDocuments({ status: "confirmed" });
    const cancelledBookings = await Booking.countDocuments({ status: "cancelled" });

    const totalSlots     = await (await import("../models/Slot.js")).default.countDocuments();
    const availableSlots = await (await import("../models/Slot.js")).default.countDocuments({ status: "available" });
    const bookedSlots    = await (await import("../models/Slot.js")).default.countDocuments({ status: "booked" });

    const totalLocations = await Location.countDocuments({ isActive: true });

    res.status(200).json({
      success: true,
      data: {
        totalBookings,
        confirmedBookings,
        cancelledBookings,
        totalSlots,
        availableSlots,
        bookedSlots,
        totalLocations,
      },
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { createBooking, getMyBookings, getBooking, cancelBooking, getAllBookings, getStats };
