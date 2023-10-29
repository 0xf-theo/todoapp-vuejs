"use strict";

const express = require("express");
const router = express.Router();

router.use("/task", require("./task.route"));

module.exports = router;
