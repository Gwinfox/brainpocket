const mysql = require("mysql2/promise");

const pool = mysql.createPool({
  host: "192.168.1.200",
  user: "sqladmin",
  password: "Diskordia19!",
  database: "facekontact",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});
// Проверка подключения к базе данных
async function testConnection() {
  try {
    const connection = await pool.getConnection();
    console.log("Успешное соединение с базой");
    connection.release();
  } catch (error) {
    console.log("Ошибка при подключении к базе ", error);
  }
}
testConnection();

module.exports = pool;
