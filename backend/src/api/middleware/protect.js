// Importation des dépendances

const { promisify } = require("util");
const jwt = require("jsonwebtoken");
const { UserModel } = require("../../database/models");

// Middleware d'authentification utilisateur
module.exports = async (req, res, next) => {
  let token;

  // Vérifie si un jeton JWT est inclus dans la requête
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {

    // Extrait le jeton des en-têtes de la requête
    // (au format "Bearer <token>")
    // eslint-disable-next-line prefer-destructuring
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies && req.cookies.jwt) {
    // Extrait le jeton des cookies de la requête
    token = req.cookies.jwt;
  }

  // Si aucun jeton n'est trouvé, renvoie une réponse d'erreur 401
  if (!token) {
    return res.status(401).send({
      error: true,
      message: "You need to be connected",
    });
  }

  const decoded = await promisify(jwt.verify)(
    token,
    "MY_SECRET_KEY"
  );

  // Recherche l'utilisateur correspondant dans la base de données
  const user = await UserModel.findById(decoded.id).exec();

  // En cas d'erreur lors de la vérification du jeton, ou si l'utilisateur n'est pas trouvé
    // dans la base de données, renvoie une réponse d'erreur 401
  if (!user) {
    return res.status(401).send({
      error: true,
      message: "You need to be connected",
    });
  }

  req.user = user;

  return next();
};
