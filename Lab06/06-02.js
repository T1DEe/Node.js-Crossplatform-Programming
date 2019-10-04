const http = require('http');
const url = require('url');
const fs = require('fs');


const server = http.createServer('request', (request, response) => {
    if (request.url === '/') {
        const html = fs.readFileSync('./06-02.html');
        response.writeHead(200, {'Content-Type' : 'text/html; charset=utf-8'});
        response.end(html);
    }


}).listen(5000)

