"use strict";

const mongoose = require("mongoose");

const { Schema } = mongoose;

const schema = new Schema(
  {
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User"
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    dueDate: {
      type: Date,
      required: true,
    },
    subtasks: [String],
    priority: {
      type: String,
      required: true,
      enum: ["low", "moderate", "high"],
    },
    status: {
      type: String,
      required: false,
      enum: ["pending", "in-progress", "completed"],
      default: "pending",
    },
  },
  { timestamps: true }
);

const model = mongoose.model("Task", schema);

module.exports = model;