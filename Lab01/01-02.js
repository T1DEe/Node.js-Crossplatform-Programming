const http = require('http');

const server = http.createServer();

server.on('request', (req, res) => {
    res.writeHead(200, { 'Content-Type' : 'text/html'});
    res.end('<h1>Hello, World</h1>');
}); 

server.listen(3000, 'localhost')
