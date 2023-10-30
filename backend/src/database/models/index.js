
//ce fichier agit comme un module d'exportation qui permet d'importer les modèles Mongoose associés aux tâches 
//et aux utilisateurs dans d'autres parties de votre application. 
//Cela simplifie la gestion des opérations de base de données et la réutilisation de ces modèles à travers votre application

const TaskModel = require("./task.model");
const UserModel = require("./user.model");

module.exports = {
  TaskModel,
  UserModel,
};
