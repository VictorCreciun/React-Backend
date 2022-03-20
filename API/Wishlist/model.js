const mongoose = require("mongoose");

const WishlistsSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
  games: { type: [mongoose.Schema.Types.ObjectId], ref: "Games" },
});

const Wishlists = new mongoose.model("Wishlists", WishlistsSchema);

module.exports = Wishlists;
//
