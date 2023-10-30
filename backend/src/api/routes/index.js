"use strict";

//Ce fichier agit comme un point d'entrée pour les routes de votre application. 
//Il crée un routeur Express et utilise router.use() pour monter les routes définies dans task.route.js sous le chemin /task. 
//Cela signifie que toutes les routes définies dans task.route.js seront préfixées par /task lorsque votre application Express sera montée. 
//Par exemple, si vous avez une route GET / dans task.route.js, elle sera accessible en tant que GET /task/ lorsque vous utiliserez index.js comme point d'entrée.

const express = require("express");
const router = express.Router();

router.use("/task", require("./task.route"));
router.use("/auth", require("./auth.route"));

module.exports = router;
