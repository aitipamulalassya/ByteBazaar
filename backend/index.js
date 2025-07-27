const express = require("express");
const app = express();
const path = require("path");
require('dotenv').config();

// Middleware for parsing JSON and urlencoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 🔥 Serve uploadedImages statically (IMPORTANT PART)
const uploadImagesPath = path.join(__dirname, process.env.UPLOAD_DIR, "uploadedImages");
app.use("/uploadedImages", express.static(uploadImagesPath));

// Example: Import routes

// Start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

