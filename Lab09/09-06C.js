const http = require('http');
const fs = require('fs');


const path = '/09-06';
const bound = 'mag-mag-mag';

let options = {
    hostname : 'localhost',
    port : 5000,
    path : path, 
    method : 'POST',
    headers: {'Content-Type':'multipart/form-data; boundary=' + bound}
}

let body = `--${bound}\r\n`;
    body += 'Content-Disposition: form-data; name="file"; filename="textFile.txt"\r\n';
    body += 'Content-Type: text/pain\r\n\r\n';
    body += fs.readFileSync('./textFile.txt');
    body += `\r\n--${bound}--\r\n`;


const req = http.request(options, (response) => {
    let data = '';

    response.on('data', chunk => {
        data += chunk;
    });
    response.on('end', () => {
        console.log(data);
    });
});

req.write(body);
req.end();