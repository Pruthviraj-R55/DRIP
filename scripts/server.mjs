import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { extname, join, normalize } from 'node:path';

const root = process.cwd();
const types = { '.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.json':'application/json; charset=utf-8' };
const server = createServer(async (req,res) => {
  const pathname = decodeURIComponent(new URL(req.url,'http://localhost').pathname);
  const relative = pathname === '/' ? 'index.html' : pathname.replace(/^\/+/, '');
  const file = normalize(join(root,relative));
  if (!file.startsWith(root)) { res.writeHead(403).end('Forbidden'); return; }
  try { const body = await readFile(file); res.writeHead(200,{'Content-Type':types[extname(file)]||'application/octet-stream'}); res.end(body); }
  catch { try { const body=await readFile(join(root,'index.html'));res.writeHead(200,{'Content-Type':types['.html']});res.end(body); } catch { res.writeHead(404).end('Not found'); } }
});
const port=Number(process.env.PORT||5173);
server.listen(port,'0.0.0.0',()=>console.log(`WildTrack available at http://localhost:${port}`));
