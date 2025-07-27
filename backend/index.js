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
const uploadImagesPath = path.join(__dirname, process.env.UPLOAD_DIR, "uploadedImages");
app.use("/uploadedImages", express.static(uploadImagesPath));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
