const express = require("express");
const {
  getSlotsByLocation,
  getSlot,
  updateSlotStatus,
  getAllSlots,
} = require("../controllers/slotController");
const { protect, adminOnly } = require("../middleware/auth");

// mergeParams lets us access :locationId from the parent router
const router = express.Router({ mergeParams: true });

// /api/locations/:locationId/slots
router.route("/").get(getSlotsByLocation);

// /api/slots  (admin – all slots)
router.route("/all").get(protect, adminOnly, getAllSlots);

// /api/slots/:id
router.route("/:id")
  .get(getSlot)
  .put(protect, adminOnly, updateSlotStatus);

module.exports = router;
