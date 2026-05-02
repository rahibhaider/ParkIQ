const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, ".env") });

const connectDB = require("./config/db");
const errorHandler = require("./middleware/errorHandler");
const notFound = require("./middleware/notFound");
const requestLogger = require("./middleware/requestLogger");
const securityHeaders = require("./middleware/securityHeaders");

connectDB();

const app = express();

// Global middleware runs before every route.
app.use(securityHeaders);
app.use(cors({
  origin: ["http://localhost:5173", "http://127.0.0.1:5173", "http://localhost:3000"],
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(requestLogger);

// API routes.
app.use("/api/auth", require("./routes/auth"));
app.use("/api/locations", require("./routes/locations"));
app.use("/api/slots", require("./routes/slots"));
app.use("/api/bookings", require("./routes/bookings"));

app.get("/api/health", (_req, res) => {
  res.json({
    success: true,
    message: "ParkIQ API is running",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
  });
});

// Only serve the built frontend in production so local development never shows a stale build.
if (process.env.NODE_ENV === "production") {
  const clientDistPath = path.join(__dirname, "..", "frontend", "dist");
  app.use(express.static(clientDistPath));

  app.get("*", (req, res, next) => {
    if (req.path.startsWith("/api/")) return next();
    res.sendFile(path.join(clientDistPath, "index.html"));
  });
}

// Unknown routes return JSON instead of HTML errors.
app.use(notFound);

// Central error middleware must be last.
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`ParkIQ API running on http://localhost:${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/api/health`);
  console.log(`Environment: ${process.env.NODE_ENV}`);
});
