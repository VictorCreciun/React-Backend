const mongoose = require("mongoose");

const CartsSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
  games: { type: [mongoose.Schema.Types.ObjectId], ref: "Games" },
});

const Carts = new mongoose.model("Carts", CartsSchema);

module.exports = Carts;
//
