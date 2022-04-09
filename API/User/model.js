const mongoose = require("mongoose");

const UsersSchema = new mongoose.Schema({
  name: String,
  password: String,
  email: String,
  wishlistCode: mongoose.Schema.Types.ObjectId,
  cartCode: mongoose.Schema.Types.ObjectId,
  role: { type: String, default: "user" },
});

const Users = new mongoose.model("Users", UsersSchema);

module.exports = Users; //
