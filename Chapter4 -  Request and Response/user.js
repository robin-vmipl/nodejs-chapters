const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
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
    fs.writeFileSync("user.txt", "User created successfully!");
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
});

const PORT = 3000;

server.listen(PORT, () => {
  console.log(`Server is listening on adsress http://localhost:${PORT}`);
});
