const express = require("express");
const path = require("path");

const homeRouter = express.Router();
const rootDir = require("../utils/pathUtils"); //local module

homeRouter.get("/", (req, res, next) => {
  res.sendFile(path.join(rootDir, "views", "home.html"));
});

module.exports = homeRouter;
