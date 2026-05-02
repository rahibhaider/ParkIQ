const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Protect routes that require a valid logged-in user.
const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return res.status(401).json({ success: false, message: "Not authorized, no token" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select("-password");

    if (!req.user) {
      return res.status(401).json({ success: false, message: "User no longer exists" });
    }

    next();
  } catch (err) {
    return res.status(401).json({ success: false, message: "Token invalid or expired" });
  }
};

// Limit sensitive routes to users with the admin role.
const adminOnly = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    res.status(403).json({ success: false, message: "Access denied: Admins only" });
  }
};

module.exports = { protect, adminOnly };
