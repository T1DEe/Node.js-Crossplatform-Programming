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

db.on('COMMIT', () => {
    let statusCode = db.commit();

    console.log(statusCode)
} );

// ===== сервер =========================================================
http.createServer('request', (request, response) => {
    if (request.url === '/') {
        let html = fs.readFileSync('./05-01.html');
        response.writeHead(200, {'Content-Type':'text/html; charset=utf-8'});
        response.end(html);
    } else if (url.parse(request.url).pathname === '/api/db') {
        db.emit(request.method, request, response); 
    }
}).listen(5000)

//===== ввод команд =====================================================

//да, генирация throws была бы куда лучше, но, знаете, cделайте сами
// ибо мне лень. Это же просто лаба, да?.

let sdTimerId = null;
let scTimerId = null

process.stdin.setEncoding('utf-8');
process.stdin.on('readable', () => {
    
    let chunk = null;

    while ((chunk = process.stdin.read()) != null) {
        
        chunk = chunk.trim();
        const array = chunk.split(' ');
        
        if (array.length == 2) {
            const num = parseInt(array[1])
            if (!Number.isInteger(num)) {
                console.error('Invalid command parametr. Try again.')
                continue;
            }

            switch (array[0]) {
                case 'sd':
                    if (sdTimerId != null) {
                        clearTimeout(sdTimerId);
                        sdTimerId = null;
                    }

                    sdTimerId = setTimeout(process.exit, num);
                    break;
                case 'sc':
                        if (scTimerId != null) {
                            clearInterval(scTimerId);
                            scTimerId = null;
                        }
    
                        scTimerId = setInterval(db.commit, num);
                    break;
                case 'ss':
                    console.log('ss ' + num);
                    break;
                default:
                    console.error('Invalid command. Try again:');
                    break;
            }
        } else if (array.length == 1) {
            switch (array[0]) {
                case 'sd':
                    clearTimeout(sdTimerId);
                    break;
                case 'sc':
                    clearInterval(scTimerId);
                    break;
                case 'ss':
                    console.log('ss');
                    break;
                default:
                    console.error('Invalid command. Try again:');
                    break;
            }
        } else {
            
        }
        
    }
    
});
