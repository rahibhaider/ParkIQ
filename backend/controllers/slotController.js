const Slot = require("../models/Slot");
const Location = require("../models/Location");

// ─── @route   GET /api/locations/:locationId/slots
// ─── @access  Public
const getSlotsByLocation = async (req, res, next) => {
  try {
    const loc = await Location.findById(req.params.locationId);
    if (!loc) return res.status(404).json({ success: false, message: "Location not found" });

    const { status } = req.query; // optional filter: ?status=available
    const query = { location: req.params.locationId };
    if (status && ["available", "booked"].includes(status)) query.status = status;

    const slots = await Slot.find(query).sort("slotNumber");

    res.status(200).json({ success: true, count: slots.length, data: slots });
  } catch (err) {
    next(err);
  }
};

// ─── @route   GET /api/slots/:id
// ─── @access  Public
const getSlot = async (req, res, next) => {
  try {
    const slot = await Slot.findById(req.params.id).populate("location", "name address");
    if (!slot) return res.status(404).json({ success: false, message: "Slot not found" });
    res.status(200).json({ success: true, data: slot });
  } catch (err) {
    next(err);
  }
};

// ─── @route   PUT /api/slots/:id   (admin – manually toggle status)
// ─── @access  Admin
const updateSlotStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    if (!["available", "booked"].includes(status)) {
      return res.status(400).json({ success: false, message: "status must be 'available' or 'booked'" });
    }

    const slot = await Slot.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );
    if (!slot) return res.status(404).json({ success: false, message: "Slot not found" });

    res.status(200).json({ success: true, data: slot });
  } catch (err) {
    next(err);
  }
};

// ─── @route   GET /api/slots   (admin – all slots)
// ─── @access  Admin
const getAllSlots = async (req, res, next) => {
  try {
    const slots = await Slot.find().populate("location", "name").sort("location slotNumber");
    res.status(200).json({ success: true, count: slots.length, data: slots });
  } catch (err) {
    next(err);
  }
};

module.exports = { getSlotsByLocation, getSlot, updateSlotStatus, getAllSlots };
