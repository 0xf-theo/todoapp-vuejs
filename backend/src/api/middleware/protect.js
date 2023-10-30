const { promisify } = require("util");
const jwt = require("jsonwebtoken");
const { UserModel } = require("../../database/models");

module.exports = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    // eslint-disable-next-line prefer-destructuring
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies && req.cookies.jwt) {
    token = req.cookies.jwt;
  }

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

  const user = await UserModel.findById(decoded.id).exec();

  if (!user) {
    return res.status(401).send({
      error: true,
      message: "You need to be connected",
    });
  }

  req.user = user;

  return next();
};
