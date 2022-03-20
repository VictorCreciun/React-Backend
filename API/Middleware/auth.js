const jwt = require("jsonwebtoken"); //

const restrict = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  } else {
    jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
      if (error) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      console.log(decoded);

      next();
    });
  }
};

module.exports = restrict;
