const Users = require("./model");
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const validate_email = require("./middleware");
const restrict = require("../Middleware/auth");

const router = express.Router(); //

router.get("/", (req, res) => {
  Users.find()
    .exec()
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((err) => {
      //next()
      console.log("error", err);
      res.status(500).json({ mess: "Something Went Wrong" });
    });
});

router.post("/register", validate_email, async (req, res) => {
  const { name, email, password } = req.body;

  console.log("request ", req.body);

  new Users({ name, email, password: await bcrypt.hash(password, 14) })
    .save()
    .then((user) => {
      res.status(201).json(user);
    })
    .catch((err) => {
      console.log("error", err);
      res.status(500).json({ mess: "Error 404" });
    });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  console.log("request ", req.body);

  const find_user = await Users.findOne({ email }).exec();

  if (!find_user) {
    return res.status(404).json({ mess: "User Not Found" });
  }

  await bcrypt.compare(password, find_user.password, (error, result) => {
    if (!result) {
      return res.status(401).json({ message: "Incorrect Password" });
    } else {
      const token = jwt.sign(
        { email: find_user.email },
        process.env.JWT_SECRET
      );
      return res
        .status(200)
        .json({ mess: "Login Successful", token, role: find_user.role });
    }
  });
});

router.get("/check_auth", restrict, (req, res) => {
  return res.status(200).json({ mess: "Logged In" });
});

module.exports = router;
