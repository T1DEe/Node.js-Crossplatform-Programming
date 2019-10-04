const http = require('http');
const fs = require('fs');
const EmailSender = require('./m0603');


const server = http.createServer('request', (request, response) => {
    if (request.url === '/') {
        const html = fs.readFileSync('./06-02.html');
        response.writeHead(200, {'Content-Type' : 'text/html; charset=utf-8'});
        response.end(html);
    } else if(request.url === '/mail') {
        request.on('data', data => {
            let mail = JSON.parse(data);
            console.log(mail);
            console.log(mail.content);
            EmailSender.send(mail.content);
        });
    }
}).listen(5000)

