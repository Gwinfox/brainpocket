const jwt = require('jsonwebtoken');
const JWT_SECRET = "superSecretkey1234256521723343!";

module.exports = (req, res, next) => {
  try {
    //Проверяем наличие токена в запросе
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Auth failed' });
    //Декодируем токен
    const decoded = jwt.verify(token, JWT_SECRET);
    //Подставляем результат в запрос
    req.userData = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Auth failed' });
  }
};