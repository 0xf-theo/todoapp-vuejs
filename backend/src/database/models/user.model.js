"use strict";

const mongoose = require("mongoose");

const { Schema } = mongoose;

const schema = new Schema(
  {
    picture: {
      type: String,
    },
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
    },
    type: {
      type: String,
      required: true,
      enum: ["local", "google", "microsoft"],
    },
  },
  { timestamps: true }
);

const model = mongoose.model("User", schema);

module.exports = model;
