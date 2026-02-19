const pool = require("../config/db");
const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

module.exports = {
  getProfile: async (req, res) => {
    try {
      const userId = parseInt(req.params["id"]);
      const [users] = await pool.query("SELECT * FROM users");
      const user = users.find((u) => u.id === userId);
      if (user) {
        res.send({
          aboutMe: user.status,
          contacts: user.contacts,
          fullName: user.firstName + " " + user.lastName,
          userId: user.id,
          photos: user.photos,
          location: user.location,
          friends: user.friends,
        });
      } else {
        res.send(`Пользователь с id: ${userId} не существует`);
      }
    } catch (error) {
      console.error("Ошибка при получении профиля пользователя: ", error);
      res.status(500).json({ error: "Database error" });
    }
  },
  setPhoto: async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
      }
      const filename = req.file.filename; // Уже содержит uuid + расширение из multer
      const userId = req.params["id"];
      const originalPath = req.file.path;

      // Абсолютный путь для оптимизированного изображения
      const optimizedPath = path.join(__dirname, "../../public/img/avatars", filename);
      const publicUrl = `/img/avatars/${filename}`;
      // Оптимизация изображения
      await sharp(originalPath)
        .resize(300, 400) // изменение размера
        .jpeg({ quality: 80 }) // для JPEG
        .toFile(optimizedPath);
      // Удаление исходного файла
      try {
        fs.unlinkSync(originalPath);
      } catch (unlinkError) {
        console.error("Не удалось удалить временный файл:", unlinkError);
      }
      //Сохранение пути в БД
      await pool.execute(
        `UPDATE users SET photos = JSON_SET(
        COALESCE(photos, '{}'),
        '$.avatar', ?
        ) WHERE id = ?`,
        [publicUrl, userId]
      );
      res.json({
        resultCode: 0,
        avatarUrl: publicUrl,
      });
    } catch (error) {
      console.error("Ошибка при обработке запроса на смену фото: ", error);
      res.status(500).json({ error: "Database error" });
    }
  },
  setContacts: async (req, res) => {
    try {
      const contacts = JSON.stringify(req.body.data);
      const userId = req.body.userId;
      await pool.query("UPDATE users SET contacts = ? WHERE id = ?", [contacts, userId]);
      res.send({
        message: "Обновление данных прошло успешно",
        resultCode: 0,
      });
    } catch (error) {
      console.error("Ошибка при обновлении контактов: ", error);
      res.status(500).json({ error: "Database error" });
    }
  },
  getPosts: async (req, res) => {
    try {
      const userId = parseInt(req.params["id"]);
      const [posts] = await pool.query("SELECT * FROM posts");
      userPosts = posts.filter((p) => p.author === userId);
      res.send(userPosts);
    } catch (error) {
      console.error("Ошибка при получении постов: ", error);
      res.status(500).json({ error: "Database error" });
    }
  },
  updateStatus: async (req, res) => {
    const userId = req.body.id;
    const newStatus = req.body.status;
    await pool.query("UPDATE users SET status = ? WHERE id = ?", [newStatus, userId]);
    res.send({
      data: {},
      message: "Статус успешно обновлен",
      resultCode: 0,
    });
    try {
    } catch (error) {
      console.error("Ошибка при выполнении запроса на замену статуса: ", error);
      res.status(500).json({ error: "Database error" });
    }
  },
  addPost: async (req, res) => {
    try {
      const author = req.body.id;
      const post = req.body.post;
      await pool.query("INSERT INTO posts (author, post, likes) VALUES (?, ?, 0)", [author, post]);
      res.send("Пост успешно добавлен");
    } catch (error) {
      console.error("При добавлении поста произошла ошибка: ", error);
      res.status(500).json({ error: "Database error" });
    }
  },
  deletePost: async (req, res) => {
    try {
      const id = req.params["id"];
      await pool.query(" DELETE FROM posts WHERE id = ?", [id]);
      res.send("Пост успешно удален");
    } catch (error) {
      console.error("Ошибка при удалении поста: ", error);
      res.status(500).json({ error: "Database error" });
    }
  },
  addlike: async (req, res) => {
    try {
      const id = req.body.postId;
      await pool.query("UPDATE posts SET likes = likes + 1 WHERE id =?", [id]);
      res.send(id);
    } catch (error) {
      console.error("Ошибка при добавлении лайка: ", error);
      res.status(500).json({ error: "Database error" });
    }
  },
};
