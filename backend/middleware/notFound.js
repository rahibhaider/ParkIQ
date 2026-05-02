const notFound = (req, res) => {
  const message = req.path === "/"
    ? "ParkIQ backend is running. Open the frontend at http://127.0.0.1:5173."
    : "Route not found";

  res.status(404).json({ success: false, message });
};

module.exports = notFound;
