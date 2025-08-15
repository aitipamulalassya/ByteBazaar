this is my index.js backend const express = require("express");
const rootRouter = require("./routes/RouteIndex");
const cors = require("cors");
const app = express();
require('dotenv').config();

const PORT = process.env.PORT || 3000;

const allowedOrigins = [
  "http://localhost:5173",
  "https://bytebazaar-frontend.onrender.com"
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
app.use('/api/v1', rootRouter);

const path = require("path");
const publicDir = path.join(__dirname, process.env.UPLOAD_DIR || "public");

// 👇 Serve static files from /uploadedImages and /uploadedFiles
app.use("/uploadedImages", express.static(path.join(publicDir, "uploadedImages")));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
