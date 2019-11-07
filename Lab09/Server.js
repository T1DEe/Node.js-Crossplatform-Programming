const http = require('http');
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
                let jsonObj;

                request.on('data', chunk => {
                    data += chunk;
                });
                request.on('end', () => {
                    jsonObj = JSON.parse(data);
                    console.log(jsonObj);

                    let requestObj = {
                        __comment: "response 09-04",
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
            case '/09-06': {
                
            }

        }
    }

})

server.listen(5000);