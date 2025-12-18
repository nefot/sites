import fs from 'node:fs';
import http from 'node:http';

const tokenPath = new URL('../tmp-token.txt', import.meta.url);
if (!fs.existsSync(tokenPath)) {
  console.error('Token file not found. Run postLogin.js first.');
  process.exit(1);
}
const token = fs.readFileSync(tokenPath, 'utf8').trim();

const options = {
  hostname: 'localhost',
  port: 3000,
  path: '/auth/profile',
  method: 'GET',
  headers: {
    'Authorization': `Bearer ${token}`,
  },
};

const req = http.request(options, (res) => {
  console.log(`STATUS: ${res.statusCode}`);
  console.log('HEADERS:', res.headers);
  res.setEncoding('utf8');
  let body = '';
  res.on('data', (chunk) => (body += chunk));
  res.on('end', () => {
    console.log('BODY:', body);
  });
});

req.on('error', (e) => {
  console.error(`problem with request: ${e.message}`);
});

req.end();

