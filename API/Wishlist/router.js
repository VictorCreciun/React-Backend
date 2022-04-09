const express = require("express");
const Wishlists = require("./model");
const router = express.Router();
const restrict = require("../Middleware/auth");
const Users = require("../User/model");

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
    .populate("user", "name wishlistCode -_id")
    .populate(
      "games",
      "title price contentImage description sale salePrice category -_id"
    )
    .exec()
    .then((Wishlists) => {
      res.status(200).json(Wishlists);
    })
    .catch((error) => {
      res.status(500).json({ mess: "Something Went Wrong" });
    });
});

router.get("/user", restrict, async (req, res, next) => {
  console.log(req.decoded);

  const { email } = req.decoded;
  const user = await Users.findOne({ email }).exec();

  console.log("decoded user: ", user);

  Wishlists.findOne({ user: user._id })
    .populate("user", "name wishlistCode -_id")
    .populate(
      "games",
      "title price contentImage description sale salePrice category -_id"
    )
    .exec()
    .then((Wishlists) => {
      res.status(200).json(Wishlists);
    })
    .catch((error) => {
      res.status(500).json({ mess: "Something Went Wrong" });
    });
});

module.exports = router;
