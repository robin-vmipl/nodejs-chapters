const http = require('http');

const server = http.createServer((req, res) =>{
  console.log('Request received', req);
});

const PORT = 3000;

server.listen(PORT, () => {
  console.log(`Server is listening on adsress http://localhost:${PORT}`);
});