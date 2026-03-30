const { sumRequestHandler } = require("./sum");

const requestHandler = (req, res) => {
  // console.log("In request handler");
  if (req.url === "/") {
    res.setHeader("Content-Type", "text/html");
    res.write(`
      <html>
        <head><title>Calculator</title></head>
        <body>
        <h1>Welcome to Calculator</h1>
        <a href="/calculator">Go to calculator</a>
        </body>
      </html>
    `);
    return res.end();
  } else if (req.url.toLowerCase() === "/calculator") {
    res.setHeader("Content-Type", "text/html");
    res.write(`
      <html>
        <head><title>Calculator</title></head>
        <body>
          <h1>Here is the Calculator</h1>
          <form action="/calculate-result" method="POST">
            <input type="text" placeholder="Enter first number" name="first"><br><br>
            <input type="text" placeholder="Enter second number" name="second"><br><br>
            <input type="submit" value="Calculate">
          </form>
        </body>
      </html>
    `);
    return res.end();
  } else if (
    req.url.toLowerCase() === "/calculate-result" &&
    req.method === "POST"
  ) {
    return sumRequestHandler(req, res);
  }

  res.setHeader("Content-Type", "text/html");
  res.write(`
      <html>
        <head><title>Calculator</title></head>
        <body>
        <h1>404 Page does't exists</h1>
        <a href="/">Go to Home</a>
        </body>
      </html>
    `);
  return res.end();
};

exports.requestHandler = requestHandler;
