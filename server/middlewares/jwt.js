const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env;

module.exports = (req, res, next) => {
  const authHeader = req.headers["autorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.status(403);
  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403);
    req.user = user;
    next();
  });
};
