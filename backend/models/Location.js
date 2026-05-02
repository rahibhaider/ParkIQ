const mongoose = require("mongoose");

const locationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Location name is required"],
      trim: true,
    },
    address: {
      type: String,
      required: [true, "Address is required"],
      trim: true,
    },
    totalSlots: {
      type: Number,
      required: [true, "Total slots is required"],
      min: [1, "Must have at least 1 slot"],
    },
    icon: {
      type: String,
      default: "🅿️",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Virtual: count available slots dynamically
locationSchema.virtual("availableSlots", {
  ref: "Slot",
  localField: "_id",
  foreignField: "location",
  count: false,
  match: { status: "available" },
});

module.exports = mongoose.model("Location", locationSchema);
