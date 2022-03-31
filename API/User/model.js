const mongoose = require("mongoose");

const UsersSchema = new mongoose.Schema({
  name: String,
  password: String,
  email: String,
  role: { type: String, default: "user" },
});

const Users = new mongoose.model("Users", UsersSchema);

module.exports = Users; //
