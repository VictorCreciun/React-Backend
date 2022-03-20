const Users = require("./model"); //

const validate_email = async (req, res, next) => {
  const { email } = req.body;
  Users.findOne({ email })
    .exec()
    .then((find_user) => {
      if (find_user) {
        return res.status(400).json({ mess: "Email Already Exists" });
      } else {
        next();
      }
    })
    .catch((err) => {
      console.log("error", err);
      res.status(500).json({ mess: "Error 404" });
    });
};

module.exports = validate_email;
