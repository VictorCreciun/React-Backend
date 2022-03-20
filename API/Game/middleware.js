const Game = require("./model"); //

const validate_game = (req, res, next) => {
  const { game_id } = req.params;

  Game.findById(game_id)
    .exec()
    .then((game) => {
      if (!game) {
        return res.status(404).json({ mess: "Game Not Found" });
      } else {
        next();
      }
    });
};

module.exports = validate_game;
