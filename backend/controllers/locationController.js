const Location = require("../models/Location");
const Slot = require("../models/Slot");

const makeSlotNumber = (index) => {
  const row = String.fromCharCode(65 + Math.floor(index / 6));
  const col = (index % 6) + 1;
  return `${row}${col}`;
};

// ─── @route   GET /api/locations
// ─── @access  Public
const getLocations = async (req, res, next) => {
  try {
    const locations = await Location.find({ isActive: true }).sort("name");

    // Attach available slot count to each location
    const data = await Promise.all(
      locations.map(async (loc) => {
        const totalSlots = await Slot.countDocuments({ location: loc._id });
        const availableSlots = await Slot.countDocuments({ location: loc._id, status: "available" });
        return {
          ...loc.toObject(),
          totalSlots,
          availableSlots,
        };
      })
    );

    res.status(200).json({ success: true, count: data.length, data });
  } catch (err) {
    next(err);
  }
};

// ─── @route   GET /api/locations/:id
// ─── @access  Public
const getLocation = async (req, res, next) => {
  try {
    const loc = await Location.findById(req.params.id);
    if (!loc) return res.status(404).json({ success: false, message: "Location not found" });

    const totalSlots = await Slot.countDocuments({ location: loc._id });
    const availableSlots = await Slot.countDocuments({ location: loc._id, status: "available" });

    res.status(200).json({
      success: true,
      data: { ...loc.toObject(), totalSlots, availableSlots },
    });
  } catch (err) {
    next(err);
  }
};

// ─── @route   POST /api/locations   (admin)
// ─── @access  Admin
const createLocation = async (req, res, next) => {
  try {
    const { name, address, totalSlots, icon } = req.body;

    if (!name || !address || !totalSlots) {
      return res.status(400).json({ success: false, message: "name, address and totalSlots are required" });
    }
    if (totalSlots < 1 || totalSlots > 500) {
      return res.status(400).json({ success: false, message: "totalSlots must be between 1 and 500" });
    }

    const location = await Location.create({ name, address, totalSlots, icon });

    // Auto-generate slots for the new location
    const slotDocs = [];
    for (let i = 0; i < totalSlots; i++) {
      slotDocs.push({ location: location._id, slotNumber: makeSlotNumber(i) });
    }
    await Slot.insertMany(slotDocs);

    res.status(201).json({ success: true, data: { ...location.toObject(), availableSlots: totalSlots } });
  } catch (err) {
    next(err);
  }
};

// ─── @route   PUT /api/locations/:id   (admin)
// ─── @access  Admin
const updateLocation = async (req, res, next) => {
  try {
    const loc = await Location.findById(req.params.id);
    if (!loc) return res.status(404).json({ success: false, message: "Location not found" });

    const { name, address, totalSlots, icon } = req.body;

    if (name !== undefined) loc.name = name;
    if (address !== undefined) loc.address = address;
    if (icon !== undefined) loc.icon = icon;

    if (totalSlots !== undefined) {
      const nextTotal = Number(totalSlots);
      if (!Number.isInteger(nextTotal) || nextTotal < 1 || nextTotal > 500) {
        return res.status(400).json({ success: false, message: "totalSlots must be between 1 and 500" });
      }

      const existingSlots = await Slot.find({ location: loc._id }).sort({ createdAt: 1, _id: 1 });
      if (nextTotal < existingSlots.length) {
        const removableSlots = existingSlots.slice(nextTotal);
        if (removableSlots.some((slot) => slot.status === "booked")) {
          return res.status(400).json({ success: false, message: "Cannot reduce slots while the removable slots are booked" });
        }
        await Slot.deleteMany({ _id: { $in: removableSlots.map((slot) => slot._id) } });
      } else if (nextTotal > existingSlots.length) {
        const slotDocs = [];
        for (let i = existingSlots.length; i < nextTotal; i++) {
          slotDocs.push({ location: loc._id, slotNumber: makeSlotNumber(i) });
        }
        await Slot.insertMany(slotDocs);
      }

      loc.totalSlots = nextTotal;
    }

    await loc.save();

    const totalSlotCount = await Slot.countDocuments({ location: loc._id });
    const availableSlots = await Slot.countDocuments({ location: loc._id, status: "available" });

    res.status(200).json({
      success: true,
      data: { ...loc.toObject(), totalSlots: totalSlotCount, availableSlots },
    });
  } catch (err) {
    next(err);
  }
};

// ─── @route   DELETE /api/locations/:id   (admin)
// ─── @access  Admin
const deleteLocation = async (req, res, next) => {
  try {
    const loc = await Location.findById(req.params.id);
    if (!loc) return res.status(404).json({ success: false, message: "Location not found" });

    // Soft delete
    loc.isActive = false;
    await loc.save();

    res.status(200).json({ success: true, message: "Location deactivated" });
  } catch (err) {
    next(err);
  }
};

module.exports = { getLocations, getLocation, createLocation, updateLocation, deleteLocation };
