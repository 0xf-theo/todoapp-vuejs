"use strict";

//configure un serveur web Node.js avec Express, définit des middlewares pour gérer les demandes, gère les erreurs, 
//et écoute les demandes entrantes sur un port spécifié. Cela permet de créer une application web qui peut répondre aux requêtes HTTP

require("dotenv").config();

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");
const db = require("./utils/helpers/db");
const routes = require("./api/routes");

const PORT = process.env.PORT || 8081;

const app = express();

db.connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(helmet());
app.use(compression());

app.use("/api", routes);

app.all("*", (req, res, next) => {
  throw new Error("Route not found");
});

app.use((err, req, res, next) => {
  return res.status(err.statusCode || 400).json({
    status: false,
    message: err.message,
    data: null,
  });
});

app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}`);
});
