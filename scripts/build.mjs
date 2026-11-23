import { cp, mkdir, rm } from 'node:fs/promises';
import { spawnSync } from 'node:child_process';
await rm('dist',{recursive:true,force:true});
await mkdir('dist/src',{recursive:true});
await cp('index.html','dist/index.html');
await cp('src','dist/src',{recursive:true});
const files=['src/main.js','src/domain.js','scripts/server.mjs'];
for(const file of files){const result=spawnSync(process.execPath,['--check',file],{stdio:'inherit'});if(result.status!==0)process.exit(result.status||1)}
console.log('Built static WildTrack frontend in dist/ (Node.js only; no external packages required).');
