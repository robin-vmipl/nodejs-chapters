const express = require("express");
const path = require("path");

const contactRouter = express.Router();
const rootDir = require("../utils/pathUtils"); //local module

contactRouter.get("/contact-us", (req, res, next) => {
  res.sendFile(path.join(rootDir, "views", "contact-us.html"));
});

contactRouter.post("/contact-us", (req, res, next) => {
  console.log("Handling /contact-us for POST", req.body);
  res.sendFile(path.join(rootDir, "views", "contact-success.html"));
});

module.exports = contactRouter;
