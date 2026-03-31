const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");

const userRouter = require("./routes/userRouter"); //local module
const hostRouter = require("./routes/hostRouter"); //local module
const rootDir = require("./utils/pathUtils"); //local module

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
// app.use(express.urlencoded());

app.use("/", userRouter);
app.use("/host", hostRouter);

app.use((req, res, next) => {
  res.status(404).sendFile(path.join(rootDir, "views", "404.html"));
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server is listening on adsress http://localhost:${PORT}`);
});
