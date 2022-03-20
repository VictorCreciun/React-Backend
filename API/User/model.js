const mongoose = require("mongoose");

const UsersSchema = new mongoose.Schema({
  name: String,
  password: String,
  email: String,
});

const Users = new mongoose.model("Users", UsersSchema);

module.exports = Users; //
