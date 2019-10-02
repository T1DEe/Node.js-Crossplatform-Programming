const http = require('http');
const url = require('url');
const fs = require('fs');
const DB = require('./DB');

let db = new DB();

//===== слушатели =======================================
db.on('GET', (request, response) => {
    response.end(JSON.stringify(db.getAllRows()));
});

db.on('POST', (request, response) => {
    request.on('data', data => {
        let row = JSON.parse(data);
        row.id = db.lastIndex() + 1;
        db.addRow(row);
        response.end(JSON.stringify(row));
    });
});

db.on('PUT', (request) => {
    request.on('data', data => {
        let row = JSON.parse(data);
        db.editRow(row.id, row)
    });
});

db.on('DELETE', (request, response) => {
    if (typeof url.parse(request.url, true).query.id != 'undefined') {
        let id = parseInt(url.parse(request.url, true).query.id);
        if (Number.isInteger(id)) {
            let deletedRow = db.deleteRow(id);

            response.writeHead(200, {'Content-Type' : 'application/json'});
            response.end(JSON.stringify(deletedRow));
        }
    }
});
//=======================================================

http.createServer('request', (request, response) => {
    if (request.url === '/') {
        let html = fs.readFileSync('./04-02.html');
        response.writeHead(200, {'Content-Type':'text/html; charset=utf-8'});
        response.end(html);
    } else if (url.parse(request.url).pathname === '/api/db') {
        db.emit(request.method, request, response); 
    }
}).listen(5000)