const http = require('http');
const app = require('./app');

const server = http.createServer(app);

port = process.env.PORT || 3001;

server.listen(port, ()=> {
  console.log(`server started on port ${port}`);
});