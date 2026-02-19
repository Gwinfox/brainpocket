const express = require("express");
const cookieParser = require("cookie-parser");

module.exports = [
  express.urlencoded({ extended: true }), // Подключаем URL
  express.json(), // Подключаем JSON
  cookieParser(), // Подключаем куки
];
