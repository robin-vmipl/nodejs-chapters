const http = require("http"); //core modules
const express = require("express"); //external module
const requestHandler = require("./user"); //local module

const app = express();

app.use("/", (req, res, next) => {
  console.log("first requested middleware", req.url, req.method);
  next();
});

app.use("/submit-details", (req, res, next) => {
  console.log("second requested middleware", req.url, req.method);
  res.send("<p>Welcome to my page</p>");
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server is listening on adsress http://localhost:${PORT}`);
});
