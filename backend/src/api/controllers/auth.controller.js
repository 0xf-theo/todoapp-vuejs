"use strict";

//Ce code gère l'authentification des utilisateurs dans une application

const validator = require("../../utils/helpers/validator");
const { UserModel } = require("../../database/models");
const taskSchema = require("../../utils/schemas/task.schema");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { OAuth2Client } = require("google-auth-library");
const fetch = require("node-fetch");

const signToken = (id) => {
  return jwt.sign({ id }, "MY_SECRET_KEY", {
    expiresIn: 3600000,
  });
};

//Cette fonction permet aux utilisateurs de se connecter en vérifiant leur adresse e-mail et leur mot de passe. 
//Si les informations sont correctes, un jeton JWT est créé, stocké dans un cookie, et les informations de l'utilisateur sont renvoyées.
const login = async (req, res) => {
  const { email, password } = req.body;

  if (email === undefined || email === "") {
    return res.status(400).json({
      error: true,
      message: "Missing email",
    });
  }

  if (password === undefined || password === "") {
    return res.status(400).json({
      error: true,
      message: "Missing password",
    });
  }

  const entity = await UserModel.findOne({
    email,
  });

  if (!entity || entity.password == null) {
    return res.status(400).json({
      error: true,
      message: "Account not found",
    });
  }

  const match = await bcrypt.compare(password, entity.password);

  if (!match) {
    return res.status(400).json({
      error: true,
      message: "Account not found",
    });
  }

  const token = signToken(entity.id);

  const cookieOptions = {
    expires: new Date(
      Date.now() + parseInt(3600000n, 10) * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  if (process.env.NODE_ENV === "production") cookieOptions.secure = true;

  res.cookie("jwt", token, cookieOptions);

  return res.json({
    user: {
      ...JSON.parse(JSON.stringify(entity)),
      token,
    },
  });
};


//Les utilisateurs peuvent s'inscrire en fournissant leur adresse e-mail, mot de passe et nom d'utilisateur. 
//La fonction vérifie si un compte avec la même adresse e-mail existe déjà, puis crée un nouvel utilisateur en hachant le mot de passe. Les informations de l'utilisateur sont renvoyées en cas de succès.
const register = async (req, res) => {
  const { email, password, username } = req.body;

  if (email === undefined || email === "") {
    return res.status(400).json({
      error: true,
      message: "Missing email",
    });
  }

  if (password === undefined || password === "") {
    return res.status(400).json({
      error: true,
      message: "Missing password",
    });
  }

  if (username === undefined || username === "") {
    return res.status(400).json({
      error: true,
      message: "Missing username",
    });
  }

  const entity = await UserModel.findOne({
    email,
  });

  if (entity) {
    return res.status(400).json({
      error: true,
      message: "Account already exists with that email",
    });
  }

  try {
    const a = await new UserModel({
      password: await bcrypt.hash(password, 10),
      email,
      username,
      type: "local",
    }).save();

    return res.json({ user: a });
  } catch (e) {
    console.log(e);
    return res
      .status(500)
      .json({ error: true, message: "Unable to save new user" });
  }
};

// Cette fonction gère l'authentification via Google en vérifiant un jeton d'identification Google fourni. 
//Si l'utilisateur avec la même adresse e-mail n'existe pas, un nouveau compte utilisateur est créé. 
//En fin de compte, un jeton JWT est généré, stocké dans un cookie, et les informations de l'utilisateur sont renvoyées.

const google = async (req, res) => {
  const { credential } = req.body;

  if (credential === undefined || credential === "") {
    return res.status(400).json({
      error: true,
      message: "Missing credential",
    });
  }

  const client = new OAuth2Client();

  const ticket = await client.verifyIdToken({
    idToken: credential,
    audience:
      "932116579427-40n2t2gsf0b0h6gstlsl5lsid8st0rnb.apps.googleusercontent.com",
  });
  const { email, name, picture } = ticket.getPayload();

  const entity = await UserModel.findOne({
    email,
  });

  if (!entity) {
    try {
      const a = await new UserModel({
        picture,
        password: null,
        email,
        username: name,
        type: "google",
      }).save();

      const token = signToken(a.id);

      const cookieOptions = {
        expires: new Date(
          Date.now() + parseInt(3600000n, 10) * 24 * 60 * 60 * 1000
        ),
        httpOnly: true,
      };

      if (process.env.NODE_ENV === "production") cookieOptions.secure = true;

      res.cookie("jwt", token, cookieOptions);

      return res.json({
        user: {
          ...JSON.parse(JSON.stringify(a)),
          token,
        },
      });
    } catch (e) {
      console.log(e);
      return res
        .status(500)
        .json({ error: true, message: "Unable to save new user" });
    }
  } else if (entity && entity.type == "google") {
    const token = signToken(entity.id);

    const cookieOptions = {
      expires: new Date(
        Date.now() + parseInt(3600000n, 10) * 24 * 60 * 60 * 1000
      ),
      httpOnly: true,
    };

    if (process.env.NODE_ENV === "production") cookieOptions.secure = true;

    res.cookie("jwt", token, cookieOptions);

    return res.json({
      user: {
        ...JSON.parse(JSON.stringify(entity)),
        token,
      },
    });
  } else {
    return res.status(500).json({
      error: true,
      message: "Unable to save login to that user, not a google account",
    });
  }
};

const msal = async (req, res) => {
  const { credential } = req.body;

  if (credential === undefined || credential === "") {
    return res.status(400).json({
      error: true,
      message: "Missing credential",
    });
  }

  fetch("https://graph.microsoft.com/v1.0/me", {
    headers: {
      Authorization: "Bearer " + credential,
      "Content-Type": "application/json",
      Host: "graph.microsoft.com",
    },
  })
    .then((response) => response.json())
    .then(async (json) => {
      const { displayName, mail } = json;

      const entity = await UserModel.findOne({
        mail,
      });

      if (!entity) {
        try {
          const a = await new UserModel({
            picture: null,
            password: null,
            email: mail,
            username: displayName,
            type: "microsoft",
          }).save();

          const token = signToken(a.id);

          const cookieOptions = {
            expires: new Date(
              Date.now() + parseInt(3600000n, 10) * 24 * 60 * 60 * 1000
            ),
            httpOnly: true,
          };

          if (process.env.NODE_ENV === "production")
            cookieOptions.secure = true;

          res.cookie("jwt", token, cookieOptions);

          return res.json({
            user: {
              ...JSON.parse(JSON.stringify(a)),
              token,
            },
          });
        } catch (e) {
          console.log(e);
          return res
            .status(500)
            .json({ error: true, message: "Unable to save new user" });
        }
      } else if (entity && entity.type == "microsoft") {
        const token = signToken(entity.id);

        const cookieOptions = {
          expires: new Date(
            Date.now() + parseInt(3600000n, 10) * 24 * 60 * 60 * 1000
          ),
          httpOnly: true,
        };

        if (process.env.NODE_ENV === "production") cookieOptions.secure = true;

        res.cookie("jwt", token, cookieOptions);

        return res.json({
          user: {
            ...JSON.parse(JSON.stringify(entity)),
            token,
          },
        });
      } else {
        return res.status(500).json({
          error: true,
          message: "Unable to save login to that user, not a google account",
        });
      }
    });
};

module.exports = {
  login,
  register,
  google,
  msal,
};
