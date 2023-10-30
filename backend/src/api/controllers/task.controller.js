"use strict";

//Ce code est un ensemble de fonctions qui gèrent les opérations CRUD (Create, Read, Update, Delete) 
//pour les tâches (tasks) dans une application

const validator = require("../../utils/helpers/validator");
const { TaskModel } = require("../../database/models");
const taskSchema = require("../../utils/schemas/task.schema");


//Cette fonction gère la récupération des tâches. Elle prend en compte les filtres tels que la priorité et le statut 
//pour renvoyer une liste de tâches correspondant à ces critères. 
//Les tâches sont filtrées en fonction de l'utilisateur actuellement connecté, ce qui signifie qu'un utilisateur ne peut voir 
//que ses propres tâches. Les résultats sont renvoyés au format JSON avec un message de succès.

const listing = async (req, res, next) => {
  try {
    let filter = {};

    filter.createdBy = req?.user?._id.toString();

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

//Cette fonction récupère les détails d'une tâche spécifique en fonction de son identifiant (ID). 
//Elle vérifie également si l'utilisateur actuellement connecté est le propriétaire de cette tâche. 
//Si ce n'est pas le cas, une erreur est générée indiquant que l'utilisateur n'est pas autorisé à accéder à cette tâche. 
//Les détails de la tâche sont renvoyés au format JSON en cas de succès.

const detail = async (req, res, next) => {
  try {
    const id = req.params.id;

    let data = await TaskModel.findById(id).exec();

    if (data.createdBy?._id.toString() !== req?.user?._id.toString()) {
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

//Cette fonction crée une nouvelle tâche en utilisant les données fournies dans la requête. 
//Elle associe également la tâche à l'utilisateur actuellement connecté en tant que créateur. 
//Avant de créer la tâche, elle valide les données en utilisant un schéma de validation spécifique (taskSchema).

const create = async (req, res, next) => {
  try {
    req.body.createdBy = req?.user?._id.toString();
    req.body.status = "todo";

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

//Cette fonction met à jour les détails d'une tâche existante en fonction de son identifiant. 
//Elle vérifie également si l'utilisateur actuellement connecté est le propriétaire de la tâche avant de permettre la mise à jour. 
//Les détails de la tâche (titre, description, date d'échéance, priorité, sous-tâches) sont mis à jour avec les nouvelles données de la requête. 

const update = async (req, res, next) => {
  try {
    const id = req.params.id;
    req.body.createdBy = req?.user?._id.toString();

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
    task.status = req.body.status;

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

//Cette fonction supprime une tâche en fonction de son identifiant. 
//Elle vérifie si l'utilisateur actuellement connecté est le propriétaire de la tâche avant de permettre la suppression. 
//En cas de succès, elle renvoie un message indiquant que la tâche a été supprimée.

const destroy = async (req, res, next) => {
  try {
    const id = req.params.id;

    let task = await TaskModel.findById(id).exec();

    if (task.createdBy._id.toString() !== req?.user?._id.toString()) {
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
