const express = require("express");
const dialogsController = require("../controllers/dialogs.controller");

const router = express.Router();

//Роуты диалогов

//------------GET------------

/**
 * @swagger
 * /dialogs/{id}:
 *   get:
 *     summary: Получение списка диалогов пользователя
 *     description: Возвращает все диалоги для указанного пользователя с данными собеседников
 *     tags: [Dialogs]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID пользователя
 *     responses:
 *       200:
 *         description: Список диалогов
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: ID диалога
 *                     example: 15
 *                   sender1:
 *                     type: integer
 *                     description: ID инициатора диалога
 *                     example: 1
 *                   sender2:
 *                     type: integer
 *                     description: ID собеседника
 *                     example: 2
 *                   senderData:
 *                     type: object
 *                     properties:
 *                       firstName:
 *                         type: string
 *                         example: "Иван"
 *                       lastName:
 *                         type: string
 *                         example: "Петров"
 *                       avatar:
 *                         type: string
 *                         example: "/static/avatars/user2.jpg"
 *                   dialog:
 *                     type: string
 *                     description: Содержимое последнего сообщения
 *                     example: "Привет, как дела?"
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
router.get("/:id", dialogsController.getDialogs);

module.exports = router;