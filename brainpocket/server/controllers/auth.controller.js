const svgCaptcha = require("svg-captcha");
const fs = require("fs");
const path = require("path");
const sharp = require("sharp");
const pool = require("../config/db");
const defaultContacts = {
  vk: null,
  email: null,
  github: null,
  twitter: null,
  website: null,
  youtube: null,
  facebook: null,
  mainlink: null,
  instagram: null,
};

module.exports = {
  me: async (req, res) => {
    try {
      const userId = parseInt(req.cookies.user);
      const [users] = await pool.query("SELECT * FROM users");
      const user = users.find((u) => u.id === userId);
      if (user) {
        res.send({
          data: {
            userId: user.id,
            email: user.contacts.email,
            login: user.login,
            friends: user.friends,
            avatar: user.photos.avatar,
          },
          message: "Вы авторизованы",
          resultCode: 0,
        });
      } else {
        res.send({
          data: {},
          message: "Вы не авторизованы",
          resultCode: 1,
        });
      }
    } catch (error) {
      console.error("Ошибка при проверке авторизации: ", error);
      res.status(500).json({ error: "Database error" });
    }
  },
  login: async (req, res) => {
    try {
      const { login, password, rememberMe, captcha } = req.body.data;
      const realCaptcha = req.session.captcha;
      const mounthToSeconds = 30 * 24 * 60 * 60 * 1000;
      const [users] = await pool.query("SELECT * FROM users WHERE login = ?", [login]);
      if (users.length === 0 || password !== users[0].password) {
        res.send({
          data: {
            userId: null,
            email: null,
            login: null,
          },
          messages: ["Логин или пароль введены неверно"],
          resultCode: 1,
        });
      } else {
        const user = users[0];
        if (captcha === realCaptcha) {
          if (rememberMe) {
            res.cookie("user", user.id, { maxAge: mounthToSeconds });
          }
          res.send({
            data: {
              userId: user.id,
              email: user.contacts.email,
              login: user.login,
              friends: user.friends,
              avatar: user.photos.avatar,
            },
            messages: ["Вы авторизованы"],
            resultCode: 0,
          });
        } else {
          res.send({
            data: {
              userId: null,
              email: null,
              login: null,
            },
            messages: ["Каптча введена неверно"],
            resultCode: 1,
          });
        }
      }
    } catch (error) {
      console.error("При авторизации произошла ошибка: ", error);
      res.status(500).json({ error: "Database error" });
    }
  },
  logout: async (req, res) => {
    try {
      res.clearCookie("user");
      res.send({
        data: {
          userId: null,
          email: null,
          login: null,
        },
        message: "Вы не авторизованы",
        resultCode: 0,
      });
    } catch (error) {
      console.error("Ошибка при выходе из профиля: ", error);
      res.status(500).json({ error: "Database error" });
    }
  },
  captcha: (req, res) => {
    const captcha = svgCaptcha.create();
    req.session.captcha = captcha.text; // Сохраняем текст каптчи в сессии
    res.type("svg");
    res.status(200).send(captcha.data);
  },
  registration: async (req, res) => {
    try {
      const { firstName, lastName, login, password } = req.body;
      let publicUrl = null;
      console.log(req.file);
      console.log(req.body);
      if (req.file) {
        const filename = req.file.filename; // Уже содержит uuid + расширение из multer
        publicUrl = `/img/avatars/${filename}`;
        const originalPath = req.file.path;
        const optimizedPath = path.join(__dirname, "../../public/img/avatars", filename);
        await sharp(originalPath)
          .resize(300, 400) // изменение размера
          .jpeg({ quality: 80 }) // для JPEG
          .toFile(optimizedPath);
        // Удаление исходного файла
        try {
          fs.unlinkSync(originalPath);
        } catch (unlinkError) {
          console.warn("Не удалось удалить временный файл:", unlinkError);
        }
      }
      const mounthToSeconds = 30 * 24 * 60 * 60 * 1000;
      const location = JSON.stringify({ city: req.body.city, country: req.body.country });
      const friends = JSON.stringify([]);
      const photos = JSON.stringify({ mini: null, avatar: publicUrl, profileHeader: null });
      const contacts = JSON.stringify(defaultContacts);
      await pool.query(
        "INSERT INTO users (firstName, lastName, location, photos, contacts, login, password, friends) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
        [firstName, lastName, location, photos, contacts, login, password, friends]
      );
      const [users] = await pool.query("SELECT * FROM users WHERE login = ?", [login]);
      const user = users[0];
      res.cookie("user", user.id, { maxAge: mounthToSeconds });
      res.send({
        data: {
          userId: user.id,
          email: user.contacts.email,
          login: user.login,
          friends: user.friends,
          avatar: user.photos.avatar,
        },
        messages: ["Вы авторизованы"],
        resultCode: 0,
      });
    } catch (error) {
      console.error("При регистрации произошла ошибка: ", error);
      res.status(500).json({ error: "Database error" });
    }
  },
};
