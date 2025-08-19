const express  = require("express");
const rootRouter = require("./routes/RouteIndex");
const cors = require("cors");
const app = express();

require("dotenv").config();
app.use("/uploads", express.static(path.join(__dirname, "public", "uploadedImages")));

app.use(cors());
app.use(express.json());
app.use('/api/v1',rootRouter);

app.listen(process.env.PORT, () => {
    console.log("Server is running on port 3000");
});
