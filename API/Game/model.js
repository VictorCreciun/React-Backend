const mongoose = require("mongoose"); //

const GameSchema = new mongoose.Schema({
  title: String,
  image: String,
  description: String,
  price: Number,
  sale: Number,
  salePrice: Number,
  category: String,
});

const Game = new mongoose.model("Games", GameSchema);

module.exports = Game;
