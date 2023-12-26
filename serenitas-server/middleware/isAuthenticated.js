const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) return res.status(403).json({ error: "No token provided" });

  jwt.verify(token, process.env.TOKEN_SECRET, (error, decoded) => {
    if (error) return res.status(401).json({ error: "Invalid token" });
    req.user = decoded;
    next();
  });
};
