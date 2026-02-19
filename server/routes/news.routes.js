const express = require("express");
const newsController = require("../controllers/news.controller");

const router = express.Router();

// Роуты новостей

//-----------POST-------------
router.post("/list", newsController.getNews);


module.exports = router;