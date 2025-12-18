import http from 'node:http';
import fs from 'node:fs';

const ORIGIN = 'http://localhost:5173';
const host = 'localhost';
const port = 3000;

function doOptions(path) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: host,
      port,
      path,
      method: 'OPTIONS',
      headers: {
        Origin: ORIGIN,
        'Access-Control-Request-Method': 'POST',
        'Access-Control-Request-Headers': 'Content-Type,Authorization',
      },
    };

    const req = http.request(options, (res) => {
      let body = '';
      res.on('data', (c) => (body += c));
      res.on('end', () => resolve({ status: res.statusCode, headers: res.headers, body }));
    });
    req.on('error', reject);
    req.end();
  });
}

function doPost(path, data) {
  return new Promise((resolve, reject) => {
    const payload = JSON.stringify(data);
    const options = {
      hostname: host,
      port,
      path,
      method: 'POST',
      headers: {
        Origin: ORIGIN,
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(payload),
      },
    };

    const req = http.request(options, (res) => {
      let body = '';
      res.on('data', (c) => (body += c));
      res.on('end', () => resolve({ status: res.statusCode, headers: res.headers, body }));
    });
    req.on('error', reject);
    req.write(payload);
    req.end();
  });
}

(async () => {
  try {
    console.log('=== OPTIONS /auth/register ===');
    const opt = await doOptions('/auth/register');
    console.log(opt);

    console.log('\n=== POST /auth/register ===');
    const data = JSON.parse(fs.readFileSync(new URL('../tmp-register.json', import.meta.url), 'utf8'));
    const post = await doPost('/auth/register', data);
    console.log(post);
  } catch (e) {
    console.error('Error:', e);
  }
})();

