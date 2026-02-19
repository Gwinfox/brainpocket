const cors = require("cors");

const corsOptions = {
  origin: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  credentials: true, // Разрешить куки
  optionsSuccessStatus: 200, //Для старых браузеров
};

module.exports = cors(corsOptions);