const path = require("path");
const express = require("express");

const homeRouter = require("./routes/homeRouter"); //local module
const contactRouter = require("./routes/contactRouter"); //local module

const app = express();

app.use(express.urlencoded({ extended: false }));

app.use(homeRouter);
app.use(contactRouter);

app.use((req, res, next) => {
  res.status(404).sendFile(path.join(__dirname, "views", "404.html"));
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server is listening on address http://localhost:${PORT}`);
});
