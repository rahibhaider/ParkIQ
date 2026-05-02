const mongoose = require("mongoose");

const slotSchema = new mongoose.Schema(
  {
    location: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Location",
      required: true,
    },
    slotNumber: {
      type: String,
      required: [true, "Slot number is required"],
      trim: true,
    },
    status: {
      type: String,
      enum: ["available", "booked"],
      default: "available",
    },
  },
  { timestamps: true }
);

// Compound index: each slotNumber is unique per location
slotSchema.index({ location: 1, slotNumber: 1 }, { unique: true });

module.exports = mongoose.model("Slot", slotSchema);
