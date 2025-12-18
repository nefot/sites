import fs from 'node:fs';
import http from 'node:http';

const creds = JSON.parse(fs.readFileSync(new URL('../tmp-register.json', import.meta.url), 'utf8'));
const data = JSON.stringify({ email: creds.email, password: creds.password });

const options = {
  hostname: 'localhost',
  port: 3000,
  path: '/auth/login',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(data),
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
    try {
      const parsed = JSON.parse(body);
      if (parsed.access_token) {
        fs.writeFileSync(new URL('../tmp-token.txt', import.meta.url), parsed.access_token, 'utf8');
        console.log('[INFO] token saved to tmp-token.txt');
      }
    } catch (e) {}
  });
});

req.on('error', (e) => {
  console.error(`problem with request: ${e.message}`);
});

req.write(data);
req.end();

