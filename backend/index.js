const express  = require("express");
const rootRouter = require("./routes/RouteIndex");
const cors = require("cors");
const app = express();
require('dotenv').config();
const PORT = process.env.PORT || 3000;
app.use(cors());
app.use(express.json());
app.use('/api/v1',rootRouter);
const path = require("path");
app.use(
  "/uploadedImages",
  express.static(path.join(__dirname, "routes", "uploads", "uploadedImages"))
);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
