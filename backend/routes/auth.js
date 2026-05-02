const express = require("express");
const { body } = require("express-validator");
const { register, login, getMe, getAllUsers, updateUser, deleteUser } = require("../controllers/authController");
const { protect, adminOnly } = require("../middleware/auth");

const router = express.Router();

// Validation rules
const registerRules = [
  body("name").trim().notEmpty().withMessage("Name is required"),
  body("email").isEmail().withMessage("Valid email is required"),
  body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),
];

const loginRules = [
  body("email").isEmail().withMessage("Valid email is required"),
  body("password").notEmpty().withMessage("Password is required"),
];

const updateUserRules = [
  body("name").optional().trim().isLength({ min: 2 }).withMessage("Name must be at least 2 characters"),
  body("email").optional().isEmail().withMessage("Valid email is required"),
  body("password").optional().isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),
  body("role").optional().isIn(["user", "admin"]).withMessage("Role must be user or admin"),
];

router.post("/register", registerRules, register);
router.post("/login", loginRules, login);
router.get("/me", protect, getMe);
router.get("/users", protect, adminOnly, getAllUsers);
router.put("/users/:id", protect, adminOnly, updateUserRules, updateUser);
router.delete("/users/:id", protect, adminOnly, deleteUser);

module.exports = router;
