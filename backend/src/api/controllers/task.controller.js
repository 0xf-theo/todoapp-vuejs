"use strict";

const validator = require("../../utils/helpers/validator");
const { TaskModel } = require("../../database/models");
const taskSchema = require("../../utils/schemas/task.schema");

const listing = async (req, res, next) => {
  try {
    let filter = {};

    filter.createdBy = req?.custom?._id;

    if (req.query.priority) {
      filter.priority = req.query.priority;
    }

    if (req.query.status) {
      filter.status = req.query.status;
    }

    let data = await TaskModel.find().where(filter).exec();

    return res.json({
      status: true,
      message: "Task listing fetched successfully",
      data,
    });
  } catch (err) {
    next(err);
  }
};

const detail = async (req, res, next) => {
  try {
    const id = req.params.id;

    let data = await TaskModel.findById(id).exec();

    if (data.createdBy?._id.toString() !== req?.custom?._id) {
      throw new Error("You are not the owner of this task");
    }

    return res.json({
      status: true,
      message: "Task Detail fetched successfully",
      data,
    });
  } catch (err) {
    next(err);
  }
};

const create = async (req, res, next) => {
  try {
    req.body.createdBy = req?.custom?._id;

    validator.validateSchema(taskSchema, req.body);

    let data = await new TaskModel(req.body).save();

    return res.json({
      status: true,
      message: "Task created successfully",
      data,
    });
  } catch (err) {
    next(err);
  }
};

const update = async (req, res, next) => {
  try {
    const id = req.params.id;
    req.body.createdBy = req?.custom?._id;

    validator.validateSchema(taskSchema, req.body);

    let task = await TaskModel.findById(id).exec();

    if (task.createdBy?._id.toString() !== req.body.createdBy) {
      throw new Error("You are not the owner of this task");
    }

    task.title = req.body.title;
    task.description = req.body.description;
    task.dueDate = req.body.dueDate;
    task.priority = req.body.priority;
    task.subtasks = req.body.subtasks;

    await task.save();

    return res.json({
      status: true,
      message: "Task updated successfully",
      data: task,
    });
  } catch (err) {
    next(err);
  }
};

const destroy = async (req, res, next) => {
  try {
    const id = req.params.id;

    let task = await TaskModel.findById(id).exec();

    if (task.createdBy._id.toString() !== req?.custom?._id) {
      throw new Error("You are not the owner of this task");
    }

    await task.deleteOne();

    return res.json({
      status: true,
      message: "Task deleted successfully",
      data: task,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  listing,
  detail,
  create,
  update,
  destroy,
};
