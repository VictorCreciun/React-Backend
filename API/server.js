require("dotenv").config();
const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const server = express();
const gameRouter = require("./Game/router");
const userRouter = require("./User/router");
const wishlistRouter = require("./Wishlist/router");

server.use(cors());
server.use(express.json()); //// BODY PARSER .
server.use("/api/games", gameRouter);
server.use("/api/users", userRouter);
server.use("/api/wishlist", wishlistRouter);

// DB CONNECT
const connectDB = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://Admin:${process.env.PASSWORD}@step.r6sg6.mongodb.net/GameStore?retryWrites=true&w=majority`
    );
    console.log("MongoDB connected!");
  } catch (err) {
    console.log("Failed to connect to MongoDB", err);
  }
};
connectDB();

module.exports = server;
