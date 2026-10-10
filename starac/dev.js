// Serveur local : node dev.js  → http://localhost:3000/starac/
const http = require('http');
const fs = require('fs');
const path = require('path');
const handler = require('./api/[...path].js');

const types = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.svg': 'image/svg+xml', '.png': 'image/png', '.webmanifest': 'application/manifest+json' };

http.createServer(async (req, res) => {
  const url = new URL(req.url, 'http://x');
  let p = url.pathname.replace(/^\/starac/, '') || '/';
  if (p.startsWith('/api/')) {
    let raw = '';
    for await (const c of req) raw += c;
    try { req.body = raw ? JSON.parse(raw) : {}; } catch { req.body = {}; }
    req.query = { path: p.slice(5).split('/').filter(Boolean) };
    return handler(req, res);
  }
  if (p === '/') p = '/index.html';
  const file = path.join(__dirname, 'public', path.normalize(p));
  if (!file.startsWith(path.join(__dirname, 'public')) || !fs.existsSync(file)) { res.statusCode = 404; return res.end('404'); }
  res.setHeader('Content-Type', types[path.extname(file)] || 'application/octet-stream');
  fs.createReadStream(file).pipe(res);
}).listen(process.env.PORT || 3000, () => console.log('Star Ac dev → http://localhost:3000/starac/'));
