const sumRequestHandler = (req, res) => {
  console.log("In sum request handler");
  let body = [];

  req.on("data", (chunk) => {
    body.push(chunk);
  });

  req.on("end", () => {
    bodyStr = Buffer.concat(body).toString();
    const params = new URLSearchParams(bodyStr);
    const bodyObj = Object.fromEntries(params);

    const result = Number(bodyObj.first) + Number(bodyObj.second);

    console.log("Result is ", result);

    res.setHeader("Content-Type", "text/html");
    res.write(`
      <html>
        <head><title>Calculator</title></head>
        <body>
        <h1>Your sum is ${result}</h1>
        </body>
      </html>
    `);
    return res.end();
  });
};

exports.sumRequestHandler = sumRequestHandler;