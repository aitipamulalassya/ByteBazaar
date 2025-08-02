const jwt = require("jsonwebtoken");
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET;

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // Check if header exists and starts with "Bearer "
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(403).json({ message: "Authentication failed: Invalid token format" });
  }

  const token = authHeader.split(' ')[1]; // Extract the token

  try {
    const decoded = jwt.verify(token, JWT_SECRET); // Verify token

    if (decoded?.userId) {
      req.userId = decoded.userId; // Attach user ID to request
      next();
    } else {
      return res.status(403).json({ message: "Authentication failed: Token payload missing userId" });
    }
  } catch (e) {
    console.error("JWT verification failed:", e.message);
    return res.status(403).json({ message: "Authentication failed: Invalid or expired token" });
  }
};

module.exports = {
  authMiddleware
};
