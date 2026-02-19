const express = require("express");
const router = express.Router();

//Подключение роутов
const authRoutes = require("./auth.routes");
const profileRoutes = require("./profile.routes");
const usersRoutes = require("./users.routes");
const dialogsRoutes = require("./dialogs.routes");
const newsRoutes = require("./news.routes");

router.use("/api/auth", authRoutes);
router.use("/api/profile", profileRoutes);
router.use("/api/users", usersRoutes);
router.use("/api/dialogs", dialogsRoutes);
router.use("/api/news", newsRoutes);

module.exports = router;