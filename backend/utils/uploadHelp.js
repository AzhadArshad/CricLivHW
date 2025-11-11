// server/utils/multerConfig.js
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const getUpload = (uploadDir) => {
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      const dir = path.join(
        __dirname,
        "../../frontend/public/grounds",
        uploadDir
      );
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      cb(null, dir);
    },
    filename: (req, file, cb) => {
      cb(null, `temp-${Date.now()}${path.extname(file.originalname)}`);
    },
  });

  return multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
    fileFilter: (req, file, cb) => {
      const ext = path.extname(file.originalname).toLowerCase();
      if (![".jpg", ".jpeg", ".png", ".webp"].includes(ext)) {
        return cb(new Error("Only images allowed"));
      }
      cb(null, true);
    },
  }).single("ground_photo"); // reusable name
};

module.exports = { getUpload };
