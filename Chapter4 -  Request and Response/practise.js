const http = require("http");

const server = http.createServer((req, res) => {
  if (req.url === "/home") {
    res.write("<h1>Welcome to Home Page</h1>");
  } else if (req.url === "/men") {
    res.write("<h1>Welcome to Men Section</h1>");
  } else if (req.url === "/women") {
    res.write("<h1>Welcome to Women Section</h1>");
  } else if (req.url === "/kids") {
    res.write("<h1>Welcome to Kids Section</h1>");
  } else if (req.url === "/cart") {
    res.write("<h1>Welcome to Cart Page</h1>");
  } else {
    res.write("<h1>Page Not Found</h1>");
  }
  res.write(`
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Myntra</title>
      </head>
      <body>
        <head>
          <nav>
            <ul>
              <li><a href="/home">Home</a></li>
              <li><a href="/men">Men</a></li>
              <li><a href="/women">Women</a></li>
              <li><a href="/kids">Kids</a></li>
              <li><a href="/cart">🛒</a></li>

            </ul>
          </nav>
        </head>
      </body>
    </html>
  `);
  res.end();
});

server.listen(3000, () => {
  console.log("Server is listening on adsress http://localhost:3000");
});
