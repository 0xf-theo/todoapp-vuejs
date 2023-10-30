"use strict";

//Ce fichier définit les routes spécifiques liées à la gestion des tâches.
//Il utilise Express pour créer un routeur (router) et associe des chemins d'URL spécifiques à des fonctions de contrôleur
//(comme taskController.listing, taskController.detail, etc.).
//Ces fonctions de contrôleur sont responsables de la logique métier associée à chaque route.

const express = require("express");
const taskController = require("../controllers/task.controller");
const protect = require("../middleware/protect");

const router = express.Router();

router.get("/", protect, taskController.listing);
router.get("/:id", protect, taskController.detail);
router.post("/", protect, taskController.create);
router.put("/:id", protect, taskController.update);
router.delete("/:id", protect, taskController.destroy);
router.get("/share/:id", protect, taskController.share);

module.exports = router;
