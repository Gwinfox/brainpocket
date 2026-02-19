const express = require("express");
const usersController = require("../controllers/users.controller");

const router = express.Router();

//Роуты пользователей

//------------GET------------

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Получить список пользователей с пагинацией
 *     tags: [Users]
 *     parameters:
 *       - in: query
 *         name: count
 *         schema:
 *           type: integer
 *           default: 5
 *         description: Количество пользователей на странице
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Номер страницы
 *     responses:
 *       200:
 *         description: Успешный ответ с списком пользователей
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 items:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/User'
 *                 totalCount:
 *                   type: integer
 *                   example: 42
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
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         firstName:
 *           type: string
 *           example: "Иван"
 *         lastName:
 *           type: string
 *           example: "Петров"
 *         status:
 *           type: string
 *           nullable: true
 *           example: "В сети"
 *         location:
 *           type: object
 *           properties:
 *             city:
 *               type: string
 *               example: "Москва"
 *             country:
 *               type: string
 *               example: "Россия"
 *         photos:
 *           type: object
 *           properties:
 *             avatar:
 *               type: string
 *               example: "/img/avatars/user1.jpg"
 *         friends:
 *           type: array
 *           items:
 *             type: integer
 *           example: [2, 3, 5]
 */
router.get("", usersController.getAllUsers);

//------------POST-----------

/**
 * @swagger
 * /users/friends:
 *   post:
 *     summary: Получить список друзей с пагинацией
 *     description: Возвращает информацию о друзьях пользователя с возможностью пагинации
 *     tags: [Friends]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - friends
 *             properties:
 *               friends:
 *                 type: array
 *                 items:
 *                   type: integer
 *                 description: Массив ID друзей
 *                 example: [1, 3, 5]
 *               count:
 *                 type: integer
 *                 default: 5
 *                 description: Количество друзей на странице
 *               page:
 *                 type: integer
 *                 default: 1
 *                 description: Номер страницы
 *     responses:
 *       200:
 *         description: Успешный ответ со списком друзей
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 items:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Friend'
 *                 totalCount:
 *                   type: integer
 *                   example: 3
 *                 resultCode:
 *                   type: integer
 *                   example: 0
 *       400:
 *         description: Неверный запрос (отсутствует массив friends)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Friends array is required"
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
 *   schemas:
 *     Friend:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         firstName:
 *           type: string
 *           example: "Иван"
 *         lastName:
 *           type: string
 *           example: "Петров"
 *         status:
 *           type: string
 *           nullable: true
 *           example: "В сети"
 *         location:
 *           type: object
 *           properties:
 *             city:
 *               type: string
 *               example: "Москва"
 *             country:
 *               type: string
 *               example: "Россия"
 *         photos:
 *           type: object
 *           properties:
 *             avatar:
 *               type: string
 *               example: "/img/avatars/user1.jpg"
 */
router.post("/friends", usersController.getFriends);

/**
 * @swagger
 * /users/follow:
 *   post:
 *     summary: Добавить пользователя в друзья
 *     description: Обновляет список друзей пользователя
 *     tags: [Friends]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - friends
 *               - userId
 *             properties:
 *               friends:
 *                 type: array
 *                 items:
 *                   type: integer
 *                 description: Обновленный массив ID друзей
 *                 example: [1, 3, 5]
 *               userId:
 *                 type: integer
 *                 description: ID пользователя, чей список друзей обновляется
 *                 example: 2
 *     responses:
 *       200:
 *         description: Успешное обновление списка друзей
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 friends:
 *                   type: array
 *                   items:
 *                     type: integer
 *                   example: [1, 3, 5]
 *                 message:
 *                   type: string
 *                   example: "Пользователь добавлен в друзья"
 *                 resultCode:
 *                   type: integer
 *                   example: 0
 *       400:
 *         description: Неверный запрос (отсутствуют обязательные поля)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Missing required fields"
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
router.post("/follow", usersController.follow);

/**
 * @swagger
 * /friends/unfollow:
 *   post:
 *     summary: Удалить пользователя из друзей
 *     description: Обновляет список друзей пользователя, удаляя указанные ID
 *     tags: [Friends]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               friends:
 *                 type: array
 *                 items:
 *                   type: integer
 *                 example: [2, 3]
 *                 description: Новый список ID друзей (без удаленного пользователя)
 *               userId:
 *                 type: integer
 *                 example: 1
 *                 description: ID пользователя, чей список друзей обновляется
 *             required:
 *               - friends
 *               - userId
 *     responses:
 *       200:
 *         description: Успешное удаление из друзей
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 friends:
 *                   type: array
 *                   items:
 *                     type: integer
 *                   example: [2, 3]
 *                 message:
 *                   type: string
 *                   example: "Пользователь удален из друзей"
 *                 resultCode:
 *                   type: integer
 *                   example: 0
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
router.post("/unfollow", usersController.unfollow);

module.exports = router;
