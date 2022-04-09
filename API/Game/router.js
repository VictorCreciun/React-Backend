const Game = require("./model"); //
const express = require("express");
const restrict = require("../Middleware/auth");
const router = express.Router();
const validate_game = require("./middleware");

router.get("/", (req, res) => {
  Game.find()
    .exec()
    .then((games) => {
      res.status(200).json(games);
    })
    .catch((err) => {
      //next()
      console.log("error", err);
      res.status(500).json({ mess: "Error 404" });
    });
});

router.post("/", (req, res) => {
  const {
    title,
    contentImage,
    images,
    description,
    price,
    sale,
    salePrice,
    category,
  } = req.body;

  console.log("request ", req.body);

  new Game({
    title,
    contentImage,
    images,
    description,
    price,
    sale,
    salePrice,
    category,
  })
    .save()
    .then((games) => {
      res.status(201).json(games);
    })
    .catch((err) => {
      console.log("error", err);
      res.status(500).json({ mess: "Error 404" });
    });
});

router.put("/:game_id", validate_game, (req, res) => {
  const {
    title,
    contentImage,
    images,
    description,
    price,
    sale,
    salePrice,
    category,
  } = req.body;

  const { game_id } = req.params;

  Game.findByIdAndUpdate(game_id, req.body)
    .exec()
    .then((games) => {
      res.status(200).json(games);
    })
    .catch((err) => {
      console.log("error", err);
      res.status(500).json({ mess: "Error 404" });
    });
});

router.get("/:game_id", validate_game, (req, res) => {
  const { game_id } = req.params;

  Game.findById(game_id)
    .exec()
    .then((games) => {
      return res.status(200).json(games);
    })
    .catch((err) => {
      console.log("error", err);
      res.status(500).json({ mess: "Something Went Wrong, Please Try Again" });
    });
});

router.delete("/:game_id", restrict, validate_game, (req, res) => {
  const { game_id } = req.params;

  Game.findByIdAndDelete(game_id)
    .exec()
    .then((games) => {
      return res.status(200).json("Game Was Successfully deleted");
    })
    .catch((err) => {
      console.log("error", err);
      res.status(500).json({ mess: "Something Went Wrong, Please Try Again" });
    });
});

module.exports = router;
