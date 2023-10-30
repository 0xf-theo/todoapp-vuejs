"use strict";

//Ce fichier définit les routes spécifiques liées à la gestion des tâches. 
//Il utilise Express pour créer un routeur (router) et associe des chemins d'URL spécifiques à des fonctions de contrôleur 
//(comme taskController.listing, taskController.detail, etc.). 
//Ces fonctions de contrôleur sont responsables de la logique métier associée à chaque route. 

const express = require("express");
const taskController = require("../controllers/task.controller");

const router = express.Router();

router.get("/", taskController.listing);
router.get("/:id", taskController.detail);
router.post("/", taskController.create);
router.put("/:id", taskController.update);
router.delete("/:id", taskController.destroy);

module.exports = router;
