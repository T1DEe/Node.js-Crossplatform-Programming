const http = require('http')
const fs = require('fs')
const url = require('url')

const server = http.createServer()
server.keepAliveTimeout = 10000

server.on('connection', (socket) => {
    console.log('connected')
});

server.on('request', (request, response) => {
    if (request.method == 'GET') {
        switch (url.parse(request.url).pathname) {
            case '/connection': {
                const queryData = url.parse(request.url, true).query;
                console.log(queryData)

                if (isEmpty(queryData)) {
                    response.writeHead(200, {'Content-Type': 'text/plant'});
                    response.end('Server alive timeout: ' + server.keepAliveTimeout);
                } else {
                    const setValue = parseInt(queryData.set);

                    if (typeof(setValue) != 'undefined' && Number.isInteger(setValue)) {
                        server.keepAliveTimeout = setValue;
                        response.writeHead(200, {'Content-Type': 'text/plant'});
                        response.end('New server alive timeout value set – ' + server.keepAliveTimeout);
                    } else {
                        response.writeHead(400, 'Invalid "set" parameter value.');
                        response.end();
                    }
                }

                break;
            }
            case 'headers': {
                
                break;
            }
            case 'parameter': {
                
                break;
            }
            case 'parameterX': {
                
                break;
            }
            case 'close': {
                
                break;
            }
            case 'socket': {
                
                break;
            }
            case 'req-data': {
                
                break;
            }
            case 'resp-status': {
                
                break;
            }
            case 'files': {
                
                break;
            }
            case 'filesX': {
                
                break;
            }
            case 'upload': {
                
                break;
            }
        }

    } else if (request.method == 'POST') {
        switch (request.url) {
            case 'formparameter': {

                break;
            }
            case 'json': {
                
                break;
            }
            case 'xml': {
                
                break;
            }
            case 'upload': {
                
                break;
            }
        }

    } else {

    }
});

server.listen(5000)

// function isEmpty(obj) {
//     for(var key in obj) {
//         if(obj.hasOwnProperty(key))
//             return false;
//     }
//     return true;
// }

function isEmpty(obj) {
    if (JSON.stringify(obj) == "{}") {
        return true;
    } else {
        return false;
    }
}