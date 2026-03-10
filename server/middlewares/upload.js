const multer = require("multer");
const uuid = require("uuid").v4;
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, '../../brainpocket/public/img/uploads');
    cb(null, uploadPath); // папка для сохранения
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${uuid()}${ext}`)
  }
});
const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error("Only images are allowed!"), false);
    }
  },
  limits: {fileSize: 20 * 1024 * 1024} // лимит 5Mb
})
module.exports = upload;