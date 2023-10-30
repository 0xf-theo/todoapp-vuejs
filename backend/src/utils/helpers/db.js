"use strict";

//permet de créer la base de données

const mongoose = require("mongoose");

const connectDB = () => {
  mongoose.connect(
    "mongodb+srv://theo:qAX838hR@cluster0.0d5f0s5.mongodb.net/",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  );

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
