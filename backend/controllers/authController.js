const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const User = require("../models/User");
const Booking = require("../models/Booking");
const Slot = require("../models/Slot");

// Helper: sign and return token
const generateToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE });

// Helper: send token response
const sendTokenResponse = (user, statusCode, res) => {
  const token = generateToken(user._id);
  res.status(statusCode).json({
    success: true,
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });
};

const serializeUser = (user) => ({
  id: user._id,
  name: user.name,
  email: user.email,
  role: user.role,
});

// ─── @route   POST /api/auth/register
// ─── @access  Public
const register = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const { name, email, password } = req.body;

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ success: false, message: "Email already registered" });
    }

    const user = await User.create({ name, email, password });
    sendTokenResponse(user, 201, res);
  } catch (err) {
    next(err);
  }
};

// ─── @route   POST /api/auth/login
// ─── @access  Public
const login = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    sendTokenResponse(user, 200, res);
  } catch (err) {
    next(err);
  }
};

// ─── @route   GET /api/auth/me
// ─── @access  Private
const getMe = async (req, res) => {
  res.status(200).json({ success: true, user: req.user });
};

// ─── @route   GET /api/auth/users   (admin)
// ─── @access  Admin
const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find().sort("-createdAt");
    res.status(200).json({ success: true, count: users.length, data: users });
  } catch (err) {
    next(err);
  }
};

// ─── @route   PUT /api/auth/users/:id   (admin)
// ─── @access  Admin
const updateUser = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const user = await User.findById(req.params.id).select("+password");
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const { name, email, role, password } = req.body;

    if (req.user._id.toString() === user._id.toString() && role && role !== "admin") {
      return res.status(400).json({ success: false, message: "You cannot remove your own admin access" });
    }

    if (name !== undefined) user.name = name;
    if (email !== undefined) user.email = email;
    if (role !== undefined) user.role = role;
    if (password) user.password = password;

    await user.save();

    res.status(200).json({ success: true, data: serializeUser(user) });
  } catch (err) {
    next(err);
  }
};

// ─── @route   DELETE /api/auth/users/:id   (admin)
// ─── @access  Admin
const deleteUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    if (req.user._id.toString() === user._id.toString()) {
      return res.status(400).json({ success: false, message: "You cannot delete your own account" });
    }

    if (user.role === "admin") {
      const adminCount = await User.countDocuments({ role: "admin" });
      if (adminCount <= 1) {
        return res.status(400).json({ success: false, message: "At least one admin account must remain" });
      }
    }

    const bookings = await Booking.find({ user: user._id });
    const activeSlotIds = bookings
      .filter((booking) => booking.status === "confirmed")
      .map((booking) => booking.slot);

    if (activeSlotIds.length > 0) {
      await Slot.updateMany({ _id: { $in: activeSlotIds } }, { status: "available" });
    }

    await Booking.deleteMany({ user: user._id });
    await user.deleteOne();

    res.status(200).json({ success: true, message: "User deleted" });
  } catch (err) {
    next(err);
  }
};

module.exports = { register, login, getMe, getAllUsers, updateUser, deleteUser };
