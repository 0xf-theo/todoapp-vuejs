"use strict";

const joi = require("joi");

const taskSchema = joi.object({
  // createdBy: joi.string().required(),
  title: joi.string().max(50).required(),
  priority: joi.string().max(50).required(),
  createdBy: joi.string(),
  description: joi.string().max(500).required(),
  dueDate: joi.date().greater("now").required(),
  // subtasks: joi.array().items(joi.string()).required(),
});

module.exports = taskSchema;
