const securityHeaders = (_req, res, next) => {
  // These headers provide a small baseline of browser-side protection.
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("X-Frame-Options", "DENY");
  res.setHeader("Referrer-Policy", "no-referrer");
  res.setHeader("X-XSS-Protection", "0");

  next();
};

module.exports = securityHeaders;
