const http = require("http");
const fs = require("fs");

const userRequestHandler = (req, res) => {
  if (req.url === "/") {
    res.setHeader("Content-Type", "text/html");
    res.write("<html>");
    res.write("<head><title>My First Page</title></head>");
    res.write("<body><h1>Enter your details</h1>");
    res.write("<form action='/create-user' method='POST'>");
    res.write(
      "<input type='text' name='username' placeholder='Enter your name'><br><br>",
    );
    res.write("<label for='gender'>Gender:</label>");
    res.write("<input type='radio' id='male' name='gender' value='male'>");
    res.write("<label for='male'>Male</label>");
    res.write("<input type='radio' id='female' name='gender' value='female'>");
    res.write("<label for='female'>Female</label><br><br>");
    res.write("<button type='submit'>Submit</button>");
    res.write("</form>");

    res.write("</body>");
    res.write("</html>");
    return res.end();
  } else if (
    req.url.toLowerCase() === "/create-user" &&
    req.method === "POST"
  ) {
    const body = [];
    req.on("data", (chunk) => {
      console.log(chunk);
      body.push(chunk);
    });

    req.on("end", () => {
      const parsedBody = Buffer.concat(body).toString();
      console.log(parsedBody);

      const params = new URLSearchParams(parsedBody);
      // const bodyObject = {};

      // for (const [key, value] of params.entries()) {
      //   bodyObject[key] = value;
      // }

      const bodyObject = Object.fromEntries(params);
      console.log(bodyObject);
      fs.writeFileSync("user-details.txt", JSON.stringify(bodyObject));
    });

    res.statusCode = 302;
    res.setHeader("Location", "/");
    return res.end();
  }
  res.setHeader("Content-Type", "text/html");
  res.write("<html>");
  res.write("<head><title>My First Page</title></head>");
  res.write("<body><h1>Hello from my Node.js Server!</h1></body>");
  res.write("</html>");
  res.end();
};

module.exports = userRequestHandler;
