const jwt = require("jsonwebtoken");
const Users = require("../User/model");

const restrict = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  } else {
    jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
      if (error) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      req.decoded = decoded;

      next();
    });
  }
};

module.exports = restrict;
