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
        let pathArray = url.parse(request.url, true).pathname.split('/');
        console.log(pathArray);
            
        if (pathArray[1] == 'files' && pathArray.length == 3) {
            let fileName = pathArray[2];
            let filePath = `./${fileName}`;
            
            fs.access(filePath, fs.constants.R_OK, err => {
                if(err) {
                    response.writeHead(404, 'File not found.');
                    response.end();
                } 
                else {
                    // ?????????????????
                    // ?????????????????
                }
            });
        } else if (pathArray[1] == 'parameter' && pathArray.length == 4 &&
         Number.isInteger(parseInt(pathArray[2])) && Number.isInteger(parseInt(pathArray[3])) ) {
            let xValue = parseInt(pathArray[2]);
            let yValue = parseInt(pathArray[3]);

            response.writeHead(200, {'Content-Type': 'text/plain'});
            response.write(xValue + yValue + '\n');
            response.write(xValue - yValue + '\n');
            response.write(xValue * yValue + '\n');
            response.write(xValue / yValue + '\n');
            response.end();
         }

        switch (url.parse(request.url).pathname) {
            case '/connection': {
                const queryData = url.parse(request.url, true).query;
                console.log(queryData)

                if (isEmpty(queryData)) {
                    response.writeHead(200, {'Content-Type': 'text/plain'});
                    response.end('Server alive timeout: ' + server.keepAliveTimeout);
                } else {
                    const setValue = parseInt(queryData.set);

                    if (typeof(setValue) != 'undefined' && Number.isInteger(setValue)) {
                        server.keepAliveTimeout = setValue;
                        response.writeHead(200, {'Content-Type': 'text/plain'});
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
                response.writeHead(200, {'Content-Type':'text/plain'});
                
                response.write('Request headers: ' + JSON.stringify(request.headers) + '\n');
                response.write('Response headers: ' + JSON.stringify(response.getHeaders()) + '\n');
               
                response.end();
                break;
            }
            case '/parameter': {
                const queryData = url.parse(request.url, true).query;
                console.log(queryData)

                if (isEmpty(queryData)) {
                    response.writeHead(200, {'Content-Type': 'text/plain'});
                    response.end('Invalid parameter.');
                } else {
                    const xValue = parseInt(queryData.x);
                    const yValue = parseInt(queryData.y);

                    if (typeof(xValue) != 'undefined' && typeof(yValue) != 'undefined' &&
                                        Number.isInteger(xValue) && Number.isInteger(yValue)) {

                        response.writeHead(200, {'Content-Type': 'text/plain'});
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
            case '/close': {
                response.writeHead(200, {'Content-Type':'text/plain'});
                response.end('The server will shutdown after 10 seconds');
                setTimeout(() => server.close(), 10000);
                break;
            }
            case '/socket': {
                const serverInfo = server.address();

                response.writeHead(200, {'Content-Type':'text/plain'});
                
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

                let data = [];
                request.on('data', chunk => {
                    data.push(chunk);
                });
                request.on('end', () => {
                    console.log(data);
                    response.end();
                });

                break;
            }
            case '/resp-status': {
                const queryData = url.parse(request.url, true).query;
                console.log(queryData)

                if (isEmpty(queryData)) {
                    response.writeHead(200, {'Content-Type': 'text/plain'});
                    response.end('Invalid parameter.');
                } else {
                    const codeValue = parseInt(queryData.code);
                    const messValue = queryData.mess;

                    if (typeof(codeValue) != 'undefined' && Number.isInteger(codeValue)) {

                        response.writeHead(200, {'Content-Type': 'text/plain'});
                        response.write(codeValue + ': ');
                        response.write(messValue + '\n');
                        response.end();
                    } else {
                        response.writeHead(400, 'Invalid "code" or "mess" parameter value.');
                        response.end();
                    }
                }

                break;
            }
            case '/files': {
                
                fs.readdir('./', (err, files) => {
                    response.writeHead(200, {'Content-Type': 'text/plain'});
                    response.end(files.length + '');
                });

                break;
            }
            case '/upload': {
                
                const html = fs.readFileSync('upload-form.html');
                
                response.writeHead(200, {'Content-Type': 'text/html'});
                response.end(html);
                break;
            }
        }

    } else if (request.method == 'POST') {
        switch (url.parse(request.url).pathname) {
            case '/formparameter': {
                response.writeHead(200, {'Content-Type': 'text/plain'});

                let data = '';
                request.on('data', chunk => {
                    data += chunk;
                });
                request.on('end', () => {
                    console.log(data); 
                    response.end(data);
                });

                break;
            }
            case '/json': {

                let data = '';
                let jsonObj;

                request.on('data', chunk => {
                    data += chunk;
                });
                request.on('end', () => {
                    jsonObj = JSON.parse(data);
                    console.log(jsonObj);

                    let requestObj = {
                        __comment: "response Lab08 json",
                        x_plus_y: jsonObj.x + jsonObj.y,
                        Concatination_s_o: jsonObj.s + jsonObj.o.surname + jsonObj.o.name,
                        Length_m: jsonObj.m.length
                    }

                    requestJsonObj = JSON.stringify(requestObj);

                    response.writeHead(200, {'Content-Type': 'application/json'});
                    response.end(requestJsonObj);
                });

                break;
            }
            case '/xml': {
                
                let data = '';
                let xmlObj;

                request.on('data', chunk => {
                    data += chunk;
                });
                request.on('end', () => {
                    console.log(data);
                    
                    const DOMParser = require('xmldom').DOMParser;
                    let parser = new DOMParser();
                    let xmlObj = parser.parseFromString(data, 'text/xml');

                    //????????????????????
                    //????????????????????

                    response.writeHead(200, {'Content-Type': 'application/xml'});
                    response.end();
                });
                break;
            }
            case '/upload': {
                const formidable = require('formidable');
                
                let form = new formidable.IncomingForm();
                form.parse(request, function (err, fields, files) {
                    
                    let oldpath = files.filetoupload.path;
                    let newpath = './' + files.filetoupload.name;

                    fs.rename(oldpath, newpath, function (err) {
                        if (err) throw err;
                        
                        response.write('File uploaded.');
                        response.end();
                    });
                });

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