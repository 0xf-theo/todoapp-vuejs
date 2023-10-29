"use strict";

const mongoose = require("mongoose");

const connectDB = () => {
  mongoose.connect("mongodb://localhost:27017", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const db = mongoose.connection;

  db.on("error", (err) => {
    console.log("Error while connecting to mongoDB", err);
  });

  db.once("open", () => {
    console.log("Connected successfully to mongoDB");
  });
};

module.exports = {
  connectDB,
};
