const http = require('http');
const fs = require('fs');
const url = require('url');
const query = require('querystring');

const server = http.createServer();

server.on('request', (request, response) => {
    if (request.method == 'GET') {
        switch (url.parse(request.url, true).pathname) {
            case '/09-01': {
    
                response.writeHead(200, {'Content-Type':'text/plain'})
                response.end('09-01 OK');
                break;
            }
            case '/09-02': {
                let queryData = url.parse(request.url, true).query;
                const xValue = parseInt(queryData.x);
                const yValue = parseInt(queryData.y);

                if (Number.isInteger(xValue) && Number.isInteger(yValue)) {
                    response.writeHead(200, {'Content-Type':'text/plain'});
                    response.end(`X value: ${xValue}, Y value: ${yValue}`);
                } else {
                    response.writeHead(400, 'Invalid parameter value.');
                    response.end();
                }
            }
            case '/09-07': {

                response.writeHead(200, {'Content-Type': 'image/jpeg'});
                let file = fs.readFileSync('./pic.jpeg')
                response.end(file);

                break;
            }
        }
    } else if (request.method == 'POST') {
        switch (url.parse(request.url, true).pathname) {
            case '/09-03': {

                let dataString = '';
                let dataObj;
                request.on('data', chunk => {
                    dataString += chunk;
                });

                request.on('end', () => {
                    dataObj = query.parse(dataString);
                    console.log(dataString);
                    console.log(dataObj);

                    response.writeHead(200, {'Content-Type':'text/plain'});
                    response.write(dataObj.x + '\n');
                    response.write(dataObj.y + '\n');
                    response.write(dataObj.s + '\n');
                    response.end();
                });

                break;
            }
            case '/09-04': {

                let data = '';
                let reqJsonObj;

                request.on('data', chunk => {
                    data += chunk;
                });
                request.on('end', () => {
                    reqJsonObj = JSON.parse(data);
                    console.log(reqJsonObj);

                    let resJsonObj = {
                        __comment: "response 09-04",
                        x_plus_y: reqJsonObj.x + reqJsonObj.y,
                        Concatination_s_o: reqJsonObj.s + reqJsonObj.o.surname + reqJsonObj.o.name,
                        Length_m: reqJsonObj.m.length
                    }

                    response.writeHead(200, {'Content-Type': 'application/json'});
                    response.end(JSON.stringify(resJsonObj));
                });

                break;
            }
            case '/09-06': {

                let data = '';

                request.on('data', chunk => {
                    data += chunk;
                });
                request.on('end', () => {
                    
                    response.writeHead(200, {'Content-Type': 'text/plain'});
                    response.end(data);
                });
                break;
            }
        }
    }

})

server.listen(5000);