const http = require('http');
let DB = require('DB');

http.createServer('request', (request, response) => {
    if (request.url === '/api/db') {
        switch(request.method) {
            case 'GET': 

            case 'POST':

            case 'PUT':
            
            case 'DELETE':
                
        }
    }
}).listen(5000)