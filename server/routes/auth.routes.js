const express = require("express");
const upload = require("../middlewares/upload");
const authController = require("../controllers/auth.controller");
const router = express.Router();

//Роуты аутентификации

//------------GET------------

/**
 * @swagger
 * /auth/me:
 *   get:
 *     summary: Проверка текущей авторизации пользователя
 *     description: Возвращает данные авторизованного пользователя на основе куки
 *     tags: [Authentication]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Успешный ответ
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     userId:
 *                       type: integer
 *                       example: 1
 *                     email:
 *                       type: string
 *                       example: "user@example.com"
 *                     login:
 *                       type: string
 *                       example: "user123"
 *                     friends:
 *                       type: array
 *                       items:
 *                         type: integer
 *                       example: [2, 3, 5]
 *                     avatar:
 *                       type: string
 *                       example: "/static/avatars/user1.jpg"
 *                 message:
 *                   type: string
 *                   example: "Вы авторизованы"
 *                 resultCode:
 *                   type: integer
 *                   enum: [0, 1]
 *                   example: 0
 *       401:
 *         description: Пользователь не авторизован
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties: {}
 *                 message:
 *                   type: string
 *                   example: "Вы не авторизованы"
 *                 resultCode:
 *                   type: integer
 *                   example: 1
 *       500:
 *         description: Ошибка сервера
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Database error"
 *
 * components:
 *   securitySchemes:
 *     cookieAuth:
 *       type: apiKey
 *       in: cookie
 *       name: user
 */
router.get("/me", authController.me);

/**
 * @swagger
 * /auth/logout:
 *   get:
 *     summary: Выход из системы
 *     description: Сбрасывает авторизационную куку и завершает сеанс пользователя
 *     tags: [Authentication]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Успешный выход из системы
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     userId:
 *                       type: null
 *                       example: null
 *                     email:
 *                       type: null
 *                       example: null
 *                     login:
 *                       type: null
 *                       example: null
 *                 message:
 *                   type: string
 *                   example: "Вы не авторизованы"
 *                 resultCode:
 *                   type: integer
 *                   enum: [0]
 *                   example: 0
 *         headers:
 *           Set-Cookie:
 *             schema:
 *               type: string
 *               example: "user=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT"
 *       500:
 *         description: Ошибка сервера
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Database error"
 *
 * components:
 *   securitySchemes:
 *     cookieAuth:
 *       type: apiKey
 *       in: cookie
 *       name: user
 */
router.get("/logout", authController.logout);

/**
 * @swagger
 * /auth/captcha:
 *   get:
 *     summary: Генерация каптчи
 *     description: Возвращает SVG-изображение каптчи и сохраняет текст в сессии
 *     tags: [Authentication]
 *     responses:
 *       200:
 *         description: SVG-изображение каптчи
 *         content:
 *           image/svg+xml:
 *             schema:
 *               type: string
 *               format: binary
 *         headers:
 *           Set-Cookie:
 *             schema:
 *               type: string
 *               description: Устанавливает session cookie
 *               example: "connect.sid=s%3A...; Path=/; HttpOnly"
 *       500:
 *         description: Ошибка генерации каптчи
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Captcha generation failed"
 *
 * components:
 *   schemas:
 *     CaptchaSession:
 *       type: object
 *       properties:
 *         captcha:
 *           type: string
 *           description: Текст каптчи
 *           example: "AB12CD"
 */
router.get("/captcha", authController.captcha);

//------------POST------------

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Аутентификация пользователя
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - data
 *             properties:
 *               data:
 *                 type: object
 *                 required:
 *                   - login
 *                   - password
 *                 properties:
 *                   login:
 *                     type: string
 *                     example: "user123"
 *                   password:
 *                     type: string
 *                     example: "securePassword123"
 *                   rememberMe:
 *                     type: boolean
 *                     example: true
 *                   captcha:
 *                     type: string
 *                     example: "ABCD12"
 *     responses:
 *       200:
 *         description: Успешная авторизация
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     userId:
 *                       type: integer
 *                     email:
 *                       type: string
 *                     login:
 *                       type: string
 *                     friends:
 *                       type: array
 *                       items:
 *                         type: integer
 *                     avatar:
 *                       type: string
 *                 messages:
 *                   type: array
 *                   items:
 *                     type: string
 *                 resultCode:
 *                   type: integer
 *                   enum: [0, 1]
 *       401:
 *         description: Ошибка авторизации
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     userId:
 *                       type: null
 *                     email:
 *                       type: null
 *                     login:
 *                       type: null
 *                 messages:
 *                   type: array
 *                   items:
 *                     type: string
 *                 resultCode:
 *                   type: integer
 *                   enum: [1]
 *       500:
 *         description: Ошибка сервера
 */
router.post("/login", authController.login);

router.post("/registration", upload.single("avatar"), authController.registration);

module.exports = router;
