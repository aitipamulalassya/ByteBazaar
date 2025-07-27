const express = require("express");
const rootRouter = require("./routes/RouteIndex");
const cors = require("cors");
const app = express();
require('dotenv').config();

const PORT = process.env.PORT || 3000;

app.use(cors({
  origin: "https://bytebazaar-frontend.onrender.com", 
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true,
}));

app.use(express.json());
app.use('/api/v1', rootRouter);

const path = require("path");
const publicDir = path.join(__dirname, process.env.UPLOAD_DIR || "public");

// 👇 Serve static files from /uploadedImages and /uploadedFiles
app.use("/uploadedImages", express.static(path.join(publicDir, "uploadedImages")));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
