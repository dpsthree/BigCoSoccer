const http = require('http');

const data = JSON.stringify({ name: process.env.PLAYER });
const options = {
  hostname: 'localhost',
  port: 8085,
  path: '/soccer/players',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': data.length
  }
};

const req = http.request(options, res => {
  res.on('data', d => {
    process.stdout.write(d);
    process.exit(0);
  });
});

req.on('error', error => {
  process.exit(1);
});

req.write(data);
req.end();
