const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const rootRouter = require("./routes/RouteIndex"); // Make sure this exports a proper router

const app = express();
const PORT = process.env.PORT || 3000;

// Allowed CORS origins
const allowedOrigins = [
  "http://localhost:5173", // local dev (Vite)
  "https://bytebazaar-frontend.onrender.com" // Render frontend
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true,
}));

app.use(express.json());

// ===== API routes =====
app.use("/api/v1", rootRouter);

// ===== Public uploads folder =====
const publicDir = path.join(__dirname, process.env.UPLOAD_DIR || "public");
app.use("/uploadedImages", express.static(path.join(publicDir, "uploadedImages")));

// ===== Serve frontend if in production =====
if (process.env.NODE_ENV === "production") {
  // For Vite, frontend build output is "dist"
  const frontendPath = path.join(__dirname, "frontend", "dist");
  // For CRA, uncomment the next line instead:
  // const frontendPath = path.join(__dirname, "frontend", "build");

  // Serve static frontend files
  app.use(express.static(frontendPath));

  // Catch-all route for React Router (must be after all API routes)
  app.get("*", (req, res) => {
    res.sendFile(path.join(frontendPath, "index.html"));
  });
}

// ===== Start server =====
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
