"use strict";

//structure de la table task, modèle à respecter

const mongoose = require("mongoose");

const { Schema } = mongoose;

const schema = new Schema(
  {
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
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
      enum: ["todo", "pending", "in-progress", "completed"],
      default: "pending",
    },
    shares: [String],
  },
  { timestamps: true }
);

const model = mongoose.model("Task", schema);

module.exports = model;
