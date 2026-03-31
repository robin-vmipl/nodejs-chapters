const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use((req, res, next) => {
  console.log("first dummy middleware", req.url, req.method);
  next();
});

app.use((req, res, next) => {
  console.log("second dummy middleware", req.url, req.method);
  next();
});

// app.use(() => {
//   console.log("third dummy middleware", req.url, req.method);
//   res.send("<h1>Welcome to my page</h1>");
// });

app.get("/", (req, res, next) => {
  console.log("Handling / for GET", req.url, req.method);
  res.send(`<h1>Welcome to homepage</h1>`);
});

app.get("/contact-us", (req, res, next) => {
  console.log("Handling /contact-us for GET", req.url, req.method);
  res.send(`<h1>Please fill your details:</h1>
    <form action="/contact-us" method="POST">
      <input type="text" name="name" placeholder="Enter your name"><br><br>
      <input type="email" name="email" placeholder="Enter your email"><br><br>
      <input type="submit"/>
    </form>
    `);
});

app.use(bodyParser.urlencoded());

app.post("/contact-us", (req, res, next) => {
  console.log("Handling /contact-us for POST", req.url, req.method, req.body);
  res.send(`<h1>Thank you for your submission</h1>`);
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server is listening on adsress http://localhost:${PORT}`);
});
