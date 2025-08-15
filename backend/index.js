const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const rootRouter = require("./routes/RouteIndex");

const app = express();
const PORT = process.env.PORT || 3000;

// Allowed CORS origins
const allowedOrigins = [
  "http://localhost:5173", // Local dev (Vite)
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

// API routes
app.use("/api/v1", rootRouter);

// Public uploads folder
const publicDir = path.join(__dirname, process.env.UPLOAD_DIR || "public");
app.use("/uploadedImages", express.static(path.join(publicDir, "uploadedImages")));

// ===== Serve frontend if in production =====
if (process.env.NODE_ENV === "production") {
  const frontendPath = path.join(__dirname, "frontend", "dist"); // For Vite builds
  // const frontendPath = path.join(__dirname, "frontend", "build"); // For CRA builds

  app.use(express.static(frontendPath));

  // Catch-all for client-side routing
  app.get("*", (req, res) => {
    res.sendFile(path.join(frontendPath, "index.html"));
  });
}

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
