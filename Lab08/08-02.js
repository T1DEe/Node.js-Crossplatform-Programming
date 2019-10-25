const http = require('http');
const fs = require('fs');
const url = require('url');


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
            case '/headers': {
                response.setHeader('X-CustomHeader','accept');
                response.writeHead(200, {'Content-Type':'text/plant'});
                
                response.write('Request headers: ' + JSON.stringify(request.headers) + '\n');
                response.write('Response headers: ' + JSON.stringify(response.getHeaders()) + '\n');
               
                response.end();
                break;
            }
            case '/parameter': {
                const queryData = url.parse(request.url, true).query;
                console.log(queryData)

                if (isEmpty(queryData)) {
                    response.writeHead(200, {'Content-Type': 'text/plant'});
                    response.end('Invalid parameter.');
                } else {
                    const xValue = parseInt(queryData.x);
                    const yValue = parseInt(queryData.y);

                    if (typeof(xValue) != 'undefined' && typeof(yValue) != 'undefined' &&
                                        Number.isInteger(xValue) && Number.isInteger(yValue)) {

                        response.writeHead(200, {'Content-Type': 'text/plant'});
                        response.write(xValue + yValue + '\n');
                        response.write(xValue - yValue + '\n');
                        response.write(xValue * yValue + '\n');
                        response.write(xValue / yValue + '\n');
                        response.end();
                    } else {
                        response.writeHead(400, 'Invalid "x" or "y" parameter value.');
                        response.end();
                    }
                }

                break;
            }
            case '/parameterX': {
                
                break;
            }
            case '/close': {
                response.writeHead(200, {'Content-Type':'text/plant'});
                response.end('The server will shutdown after 10 seconds');
                setTimeout(() => server.close(), 10000);
                break;
            }
            case '/socket': {
                const serverInfo = server.address();

                response.writeHead(200, {'Content-Type':'text/plant'});
                
                response.write('Server info: \n');
                response.write('IP: ' + serverInfo.address + '\n' +
                                'Port: ' + serverInfo.port + '\n');

                response.write('Client info: \n');
                response.write('IP: ' + request.connection.remoteAddress + '\n' +
                                'Port: ' + request.connection.remotePort + '\n');

                response.end();
                break;
            }
            case '/req-data': {
                
                break;
            }
            case '/resp-status': {
                
                break;
            }
            case '/files': {
                
                break;
            }
            case '/filesX': {
                
                break;
            }
            case '/upload': {
                
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


function isEmpty(obj) {
    if (JSON.stringify(obj) == "{}") {
        return true;
    } else {
        return false;
    }
}