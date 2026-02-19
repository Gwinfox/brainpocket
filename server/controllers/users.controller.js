const pool = require("../config/db");

module.exports = {
  getAllUsers: async (req, res) => {
    try {
      const count = parseInt(req.query.count) || 5; //count - количество объектов в выводе
      const page = parseInt(req.query.page) || 1; // page - номер порции вывода
      const [users] = await pool.query("SELECT * FROM users");
      const items = users.map((u) => ({
        id: u.id,
        firstName: u.firstName,
        lastName: u.lastName,
        status: u.status,
        location: u.location,
        photos: u.photos,
        friends: u.friends,
      }));
      res.send({
        items: items.slice(count * page - count, count * page),
        totalCount: items.length,
      });
    } catch (error) {
      console.error("Ошибка при запросе к базе данных пользователей: ", error);
      res.status(500).json({ error: "Database error" });
    }
  },
  getFriends: async (req, res) => {
    try {
      const arrFriends = req.body.friends;
      const placeholders = arrFriends.map(() => "?").join(",");
      const count = req.body.count || 5; //count - количество объектов в выводе
      const page = req.body.page || 1; // page - номер порции вывода
      const [users] = await pool.query(`SELECT * FROM users WHERE id IN (${placeholders})`, arrFriends);
      const items = users.map((f) => ({
        id: f.id,
        firstName: f.firstName,
        lastName: f.lastName,
        status: f.status,
        location: f.location,
        photos: f.photos,
      }));
      res.send({
        items: items.slice(count * page - count, count * page),
        totalCount: items.length,
        resultCode: 0,
      });
    } catch (error) {
      console.error("Ошибка при запросе списка друзей", error);
      res.status(500).json({ error: "Database error" });
    }
  },
  follow: async (req, res) => {
    try {
      const friends = req.body.friends;
      const userId = req.body.userId;
      await pool.query("UPDATE users SET friends = ? WHERE id = ?", [JSON.stringify(friends), userId]);
      res.send({
        friends,
        message: "Пользователь добавлен в друзья",
        resultCode: 0,
      });
    } catch (error) {
      console.error("Ошибка при обработке запроса: ", error);
      res.status(500).json({ error: "Database error" });
    }
  },
  unfollow: async (req, res) => {
    try {
      const friends = req.body.friends;
      const userId = req.body.userId;
      await pool.query("UPDATE users SET friends = ? WHERE id = ?", [JSON.stringify(friends), userId]);
      res.send({
        friends,
        message: "Пользователь удален из друзей",
        resultCode: 0,
      });
    } catch (error) {
      console.error("Ошибка при обработке запроса: ", error);
      res.status(500).json({ error: "Database error" });
    }
  },
};
