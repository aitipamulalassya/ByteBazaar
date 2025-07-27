app.use(express.json());
app.use('/api/v1',rootRouter);
const path = require("path");

const uploadImagesPath = path.join(__dirname, process.env.UPLOAD_DIR, "uploadedImages");
app.use("/uploadedImages", express.static(uploadImagesPath));

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
