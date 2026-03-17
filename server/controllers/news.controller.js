const pool = require("../config/db");

module.exports = {
  getNews: async (req, res) => {
    try {
      const { friends, page = 1, limit = 10 } = req.body; // Получаем данные из тела запроса
      if (!friends || !Array.isArray(friends)) {
        return res.status(400).json({ error: "Friends array is required" });
      } // Проверяем наличие в теле запроса массива друзей
      if (friends.length === 0) {
        const news = [];
        res.send({
          news,
          resultCode: 0,
          hasMore: false,
          totalCount: 0,
        });
      }
      const offset = (page - 1) * limit; // Вычисляем смещение
      const placeholders = friends.map(() => "?").join(","); // Формируем заглушку для запроса к базе вида (?,?,?,?...)
      const [news] = await pool.query(
        `SELECT posts.*, users.firstName, users.lastName, users.photos 
        FROM posts 
        INNER JOIN users ON posts.author = users.id 
        WHERE posts.author IN (${placeholders})
        ORDER BY posts.id DESC
        LIMIT ? OFFSET ?`,
        [...friends, limit, offset]
      ); // Получаем массив результатов из базы, отсортированный на убывание по id
      const [totalCount] = await pool.query(
        `SELECT COUNT(*) as count FROM posts WHERE author IN (${placeholders})`,
        friends
      ); // Получаем общее число постов друзей в виде массива с элементом count
      res.send({
        news,
        resultCode: 0,
        hasMore: totalCount[0].count > (page - 1) * limit + news.length, // Есть ли еще посты?
        totalCount: totalCount[0].count,
      });
    } catch (error) {
      console.error("Ошибка при получении новостей: ", error);
      res.status(500).json({ error: "Database error" });
    }
  },
};
