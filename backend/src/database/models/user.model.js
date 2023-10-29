"use strict";

const mongoose = require("mongoose");

const { Schema } = mongoose;

const schema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const model = mongoose.model("User", schema);

module.exports = model;
