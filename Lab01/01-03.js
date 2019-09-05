const http = require('http');

const server = http.createServer();

server.on('request', (req, res) => {
    res.writeHead(200, { 'Content-Type' : 'text/html'});
    
    switch (req.method) {
        case 'GET':
            res.end(`<h1> ${req.url}, ${req.method} </h1>`);
        case 'POST':
            res.end(`<h1> ${req.url}, ${req.method} </h1>`);
    }
}); 

server.listen(3000, 'localhost')
