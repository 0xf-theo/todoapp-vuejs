"use strict";

//this code is to define a schema for validating task objects. 
//We use this schema to ensure that task data provided to your application meets specific criteria, 
//such as data types, lengths, and date constraints. This is particularly useful for input validation, 
//data integrity, and ensuring that your application processes data that adheres to a predefined structure

const joi = require("joi");

const taskSchema = joi.object({
  createdBy: joi.string().required(),
  title: joi.string().max(50).required(),
  priority: joi.string().max(50).required(),
  description: joi.string().max(500).required(),
  dueDate: joi.date().required(),
  status: joi.string(),
  subtasks: joi.array().items(joi.string()).required(),
});

module.exports = taskSchema;
