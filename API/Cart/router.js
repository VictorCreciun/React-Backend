const express = require("express");
const Carts = require("./model");
const router = express.Router();

router.post("/", (req, res) => {
  const { user, games } = req.body; //

  new Carts({ user, games })
    .save()
    .then((cart) => {
      res.status(201).json(cart);
    })
    .catch((error) => {
      return res.status(500).json({ mess: "Something Went Wrong" });
    });
});

router.get("/", (req, res) => {
  Carts.find()
    .populate("user", "name -_id")
    .populate(
      "games",
      "title price contentImage description sale salePrice category -_id"
    )
    .exec()
    .then((Carts) => {
      res.status(200).json(Carts);
    })
    .catch((error) => {
      res.status(500).json({ mess: "Something Went Wrong" });
    });
});

router.get("/cart/:user_id", (req, res) => {
  const { user_id } = req.params;

  Carts.findOne({ user: user_id })
    .populate("user", "name -_id")
    .populate(
      "games",
      "title price contentImage description sale salePrice category -_id"
    )
    .exec()
    .then((Carts) => {
      res.status(200).json(Carts);
    })
    .catch((error) => {
      res.status(500).json({ mess: "Something Went Wrong" });
    });
});

module.exports = router;
