const multer = require("multer");
const uuid = require("uuid").v4;
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, "../../brainpocket/public/img/uploads");
    cb(null, uploadPath); // папка для сохранения
  },
  filename: (req, file, cb) => {
    let ext = path.extname(file.originalname).toLowerCase();
    // Проверяем, что расширение валидное
    const validExtensions = [".jpg", ".jpeg", ".png", ".gif", ".webp", ".svg", ".bmp"];
    // Если расширения нет или оно невалидное - определяем по MIME-типу
    if (!ext || !validExtensions.includes(ext)) {
      // Маппинг MIME-типов в расширения
      const mimeToExt = {
        "image/jpeg": ".jpg",
        "image/jpg": ".jpg",
        "image/png": ".png",
        "image/gif": ".gif",
        "image/webp": ".webp",
        "image/svg+xml": ".svg",
        "image/bmp": ".bmp",
        "image/x-icon": ".ico",
        "image/heic": ".heic",
        "image/heif": ".heif",
      };
      // Получаем расширение из MIME-типа
      ext = mimeToExt[file.mimetype] || ".jpg"; // .jpg по умолчанию
      // Для jpeg используем .jpg (единообразие)
    }
    if (ext === ".jpeg") ext = ".jpg";
    cb(null, `${uuid()}${ext}`);
  },
});
const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Only images are allowed!"), false);
    }
  },
  limits: { fileSize: 20 * 1024 * 1024 }, // лимит 5Mb
});
module.exports = upload;
