const requestLogger = (req, _res, next) => {
  if (process.env.NODE_ENV === "development") {
    console.log(`[${new Date().toLocaleTimeString()}] ${req.method} ${req.originalUrl}`);
  }

  next();
};

module.exports = requestLogger;
