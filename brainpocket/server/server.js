const express = require("express");
const app = express();
const logger = require('./middlewares/logger');

// Конфигурации
const { port } = require("./config/options");
const specs = require("./middlewares/swagger");
const corsOptions = require("./middlewares/cors");
// Middleware
const swaggerUi = require("swagger-ui-express");
const session = require("./middlewares/captcha");
const parsers = require("./middlewares/parsers");
const staticAvatars = require("./middlewares/static");
//Роуты
const routes = require("./routes");

app.use(logger);

// Подключение Middleware
app.use(corsOptions); // Подключаем cors
app.use(parsers); // Подключаем парсеры
app.use(session); // хранение правильного ответа каптчи в сессии
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs)); // Подключаем Swagger UI
app.use("/static/avatars", staticAvatars); // Подключаем пути для сохранения аватара

//Подключение роутов
app.use(routes);

//Открываем порт
app.listen(port, () => {
  console.log("Сервер запущен на порту: ", port);
});
