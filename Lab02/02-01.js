const http = require('http');
const fs = require('fs');

const server = http.createServer();

server.on('request', (req, res) => {

    switch (req.url) {
        //02-01
        case '/html':
            res.writeHead(200, { 'Content-Type' : 'text/html'});
            res.end(fs.readFileSync('./index.html'));
        //02-02
        case '/png':
            res.writeHead(200, { 'Content-Type' : 'image/jpg'});
            res.end(fs.readFileSync('./pic.jpg'));
        //02-03
        case '/api/name':
            res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8'});
            res.end('Марковский Артемий, ФИТ, 4 группа, 3 курс.');
        //02-04
        case '/xmlhttprequest':
            res.writeHead(200, { 'Content-Type' : 'text/html'});
            res.end(fs.readFileSync('./xmlhttprequest.html'));
        //02-05
        case '/fetch':
            res.writeHead(200, { 'Content-Type' : 'text/html'});
            res.end(fs.readFileSync('./fetch.html'));
        //02-06
        case '/jquery':
            res.writeHead(200, { 'Content-Type' : 'text/html'});
            res.end(fs.readFileSync('./fetch.html'));
        default:
            res.writeHead(404, 'Page not found.');
            res.end('Error');
    }
}); 

server.listen(5000, 'localhost')
