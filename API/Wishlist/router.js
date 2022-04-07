const express = require("express");
const Wishlists = require("./model");
const router = express.Router();

router.post("/", (req, res) => {
  const { user, games } = req.body; //

  new Wishlists({ user, games })
    .save()
    .then((wishlist) => {
      res.status(201).json(wishlist);
    })
    .catch((error) => {
      return res.status(500).json({ mess: "Something Went Wrong" });
    });
});

router.get("/", (req, res) => {
  Wishlists.find()
    .populate("user", "username -_id")
    .populate("games", "title price -_id")
    .exec()
    .then((Wishlists) => {
      res.status(200).json(Wishlists);
    })
    .catch((error) => {
      res.status(500).json({ mess: "Something Went Wrong" });
    });
});

router.get("/wishlist/:user_id", (req, res) => {
  const { user_id } = req.params;

  Wishlists.findOne({ user: user_id })
    .populate("user", "username -_id")
    .populate("games", "title price contentImage -_id")
    .exec()
    .then((Wishlists) => {
      res.status(200).json(Wishlists);
    })
    .catch((error) => {
      res.status(500).json({ mess: "Something Went Wrong" });
    });
});

module.exports = router;
