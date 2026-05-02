const express = require("express");
const {
  getLocations,
  getLocation,
  createLocation,
  updateLocation,
  deleteLocation,
} = require("../controllers/locationController");
const { protect, adminOnly } = require("../middleware/auth");

// Include slot router for nested route
const slotRouter = require("./slots");

const router = express.Router();

// Re-route into slot router: GET /api/locations/:locationId/slots
router.use("/:locationId/slots", slotRouter);

router.route("/")
  .get(getLocations)
  .post(protect, adminOnly, createLocation);

router.route("/:id")
  .get(getLocation)
  .put(protect, adminOnly, updateLocation)
  .delete(protect, adminOnly, deleteLocation);

module.exports = router;
