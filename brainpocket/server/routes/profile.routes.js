const express = require("express");
const upload = require("../middlewares/upload");
const profileController = require("../controllers/profile.controller");

const router = express.Router();

//Роуты профиля

//------------GET------------

/**
 * @swagger
 * /profile/{id}:
 *   get:
 *     summary: Получение профиля пользователя
 *     description: Возвращает полную информацию о профиле пользователя по ID
 *     tags: [Profile]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: ID пользователя
 *         example: 1
 *     responses:
 *       200:
 *         description: Данные профиля пользователя
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 aboutMe:
 *                   type: string
 *                   description: Статус пользователя
 *                   example: "Ищу новые знакомства"
 *                 contacts:
 *                   type: object
 *                   properties:
 *                     email:
 *                       type: string
 *                       example: "user@example.com"
 *                     phone:
 *                       type: string
 *                       example: "+79001234567"
 *                     socials:
 *                       type: array
 *                       items:
 *                         type: string
 *                       example: ["vk.com/id123", "t.me/user123"]
 *                 fullName:
 *                   type: string
 *                   example: "Иван Петров"
 *                 userId:
 *                   type: integer
 *                   example: 1
 *                 photos:
 *                   type: object
 *                   properties:
 *                     avatar:
 *                       type: string
 *                       example: "/static/avatars/user1.jpg"
 *                     cover:
 *                       type: string
 *                       example: "/static/covers/user1.jpg"
 *                 location:
 *                   type: object
 *                   properties:
 *                     city:
 *                       type: string
 *                       example: "Москва"
 *                     country:
 *                       type: string
 *                       example: "Россия"
 *                 friends:
 *                   type: array
 *                   items:
 *                     type: integer
 *                   example: [2, 3, 5]
 *       404:
 *         description: Пользователь не найден
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: "Пользователь с id: 999 не существует"
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
 */
router.get("/:id", profileController.getProfile);

/**
 * @swagger
 * /profile/posts/{id}:
 *   get:
 *     summary: Получение постов пользователя
 *     description: Возвращает все посты указанного пользователя
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: ID пользователя
 *         example: 1
 *     responses:
 *       200:
 *         description: Список постов пользователя
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   author:
 *                     type: integer
 *                     example: 1
 *                   content:
 *                     type: string
 *                     example: "Это мой первый пост!"
 *                   created_at:
 *                     type: string
 *                     format: date-time
 *                     example: "2023-06-15T10:30:00Z"
 *                   likes:
 *                     type: integer
 *                     example: 5
 *                   comments:
 *                     type: array
 *                     items:
 *                       type: integer
 *                     example: [1, 2, 3]
 *       404:
 *         description: Пользователь не найден
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "User not found"
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
 */
router.get("/posts/:id", profileController.getPosts);

//------------POST-----------

/**
 * @swagger
 * /profile/status:
 *   post:
 *     summary: Обновление статуса пользователя
 *     description: Изменяет статус (aboutMe) в профиле пользователя
 *     tags: [Profile]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *               - status
 *             properties:
 *               id:
 *                 type: integer
 *                 description: ID пользователя
 *                 example: 1
 *               status:
 *                 type: string
 *                 description: Новый статус пользователя
 *                 example: "Ищу новые знакомства"
 *                 maxLength: 100
 *     responses:
 *       200:
 *         description: Статус успешно обновлен
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
 *                   example: "Статус успешно обновлен"
 *                 resultCode:
 *                   type: integer
 *                   enum: [0]
 *                   example: 0
 *       400:
 *         description: Неверные параметры запроса
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Missing required fields"
 *       401:
 *         description: Пользователь не авторизован
 *       403:
 *         description: Нет прав на изменение статуса
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
router.post("/status", profileController.updateStatus);

/**
 * @swagger
 * /profile/posts:
 *   post:
 *     summary: Создание нового поста
 *     description: Добавляет новый пост от имени пользователя
 *     tags: [Posts]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *               - post
 *             properties:
 *               id:
 *                 type: integer
 *                 description: ID автора поста
 *                 example: 1
 *               post:
 *                 type: string
 *                 description: Текст поста
 *                 example: "Это мой новый пост!"
 *                 maxLength: 500
 *     responses:
 *       200:
 *         description: Пост успешно создан
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: "Пост успешно добавлен"
 *       400:
 *         description: Неверные параметры запроса
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Missing required fields"
 *       401:
 *         description: Пользователь не авторизован
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
router.post("/addpost", profileController.addPost);

/**
 * @swagger
 * /profile/posts/like:
 *   put:
 *     summary: Добавление лайка к посту
 *     description: Увеличивает счетчик лайков поста на 1
 *     tags: [Posts]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - postId
 *             properties:
 *               postId:
 *                 type: integer
 *                 description: ID поста
 *                 example: 1
 *     responses:
 *       200:
 *         description: Лайк успешно добавлен
 *         content:
 *           application/json:
 *             schema:
 *               type: integer
 *               description: ID поста с обновленным лайком
 *               example: 1
 *       400:
 *         description: Неверный запрос
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Missing postId parameter"
 *       401:
 *         description: Пользователь не авторизован
 *       404:
 *         description: Пост не найден
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Post not found"
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
router.post("/posts/like", profileController.addlike);

//------------PUT------------

/**
 * @swagger
 * /profile/photo:
 *   put:
 *     summary: Обновление аватара пользователя
 *     description: Загружает и оптимизирует изображение для аватара пользователя
 *     tags: [Profile]
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - in: formData
 *         name: avatar
 *         type: file
 *         required: true
 *         description: Файл изображения для аватара (JPG/PNG)
 *       - in: formData
 *         name: userId
 *         type: integer
 *         required: true
 *         description: ID пользователя
 *     responses:
 *       200:
 *         description: Аватар успешно обновлен
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 resultCode:
 *                   type: integer
 *                   example: 0
 *                 avatarUrl:
 *                   type: string
 *                   example: "/img/avatars/uuid-filename.jpg"
 *       400:
 *         description: Ошибка в запросе
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "No file uploaded"
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
router.put("/photo/:id", upload.single("avatar"), profileController.setPhoto);

/**
 * @swagger
 * /profile/contacts:
 *   put:
 *     summary: Обновление контактных данных пользователя
 *     description: Обновляет контактную информацию пользователя в базе данных
 *     tags: [Profile]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - data
 *               - userId
 *             properties:
 *               userId:
 *                 type: integer
 *                 example: 1
 *               data:
 *                 type: object
 *                 properties:
 *                   email:
 *                     type: string
 *                     format: email
 *                     example: "user@example.com"
 *                   phone:
 *                     type: string
 *                     example: "+79001234567"
 *                   socials:
 *                     type: object
 *                     properties:
 *                       vk:
 *                         type: string
 *                         example: "vk.com/id123"
 *                       telegram:
 *                         type: string
 *                         example: "@username"
 *     responses:
 *       200:
 *         description: Контакты успешно обновлены
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Обновление данных прошло успешно"
 *                 resultCode:
 *                   type: integer
 *                   example: 0
 *       400:
 *         description: Неверный формат данных
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Invalid data format"
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
router.put("/contacts", profileController.setContacts);

//------------DELETE---------

/**
 * @swagger
 * /profile/posts/{id}:
 *   delete:
 *     summary: Удаление поста
 *     description: Удаляет пост по его идентификатору
 *     tags: [Posts]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: ID поста для удаления
 *         example: 1
 *     responses:
 *       200:
 *         description: Пост успешно удален
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: "Пост успешно удален"
 *       401:
 *         description: Пользователь не авторизован
 *       403:
 *         description: Нет прав на удаление поста
 *       404:
 *         description: Пост не найден
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Post not found"
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
router.delete("/deletepost/:id", profileController.deletePost);

module.exports = router;
