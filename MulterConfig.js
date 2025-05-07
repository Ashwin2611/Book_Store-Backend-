const multer = require("multer");

// Memory storage (stores image in RAM before processing)
const storage = multer.memoryStorage();

const upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB file limit
    fileFilter: (req, file, cb) => {
        // Only accept image files
        if (!file.mimetype.startsWith("image/")) {
            return cb(new Error("Only  images are allowed"), false);
        }
        cb(null, true);
    }
});

module.exports = upload;
