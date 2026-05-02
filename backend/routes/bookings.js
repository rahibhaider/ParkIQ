const express = require("express");
const {
  createBooking,
  getMyBookings,
  getBooking,
  cancelBooking,
  getAllBookings,
} = require("../controllers/bookingController");
const { protect, adminOnly } = require("../middleware/auth");

const router = express.Router();

// All booking routes require auth
router.use(protect);

router.route("/")
  .post(createBooking)
  .get(adminOnly, getAllBookings); // admin: all bookings

router.get("/my", getMyBookings);

router.route("/:id")
  .get(getBooking);

router.put("/:id/cancel", cancelBooking);

module.exports = router;
