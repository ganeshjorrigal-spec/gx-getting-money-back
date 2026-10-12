import {build} from 'esbuild';
import {readFile,writeFile,readdir,mkdir} from 'node:fs/promises';
import {resolve} from 'node:path';
import {createRequire} from 'node:module';
const step=process.argv[2]??'final';
await build({entryPoints:['scripts/qa/restyle-render.tsx'],bundle:true,platform:'node',format:'cjs',packages:'external',jsx:'automatic',outfile:'.env.restyle-render.cjs',alias:{'convex/react':resolve('scripts/qa/restyle-query-fixture.ts'),'next/link':resolve('scripts/qa/restyle-link-fixture.tsx')}});
const require=createRequire(import.meta.url);const pages=require(resolve('.env.restyle-render.cjs')).renderProof();
const cssDir='out/_next/static/css';const css=(await Promise.all((await readdir(cssDir)).filter(f=>f.endsWith('.css')).map(f=>readFile(cssDir+'/'+f,'utf8')))).join('\n');
const home=await readFile('out/index.html','utf8');const fontClass=home.match(/<html[^>]*class="([^"]+)"/)?.[1]??'';
await mkdir(`out/proof-${step}`,{recursive:true});await mkdir(`docs/qa/restyle-${step}-2026-10-13`,{recursive:true});
for(const [name,raw] of Object.entries(pages)){const markup=String(raw).replace('aria-label="Who owes you"','id="receipt-proof" aria-label="Who owes you"').replace('<section class="case-card"><h2>Your next','<section class="case-card" id="mail-proof"><h2>Your next');const html=`<!doctype html><html lang="en-IN" class="${fontClass}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Local fixture · ${name}</title><style>${css}
html{scroll-behavior:auto}</style></head><body>${markup}</body></html>`;await writeFile(`out/proof-${step}/${name}.html`,html);await writeFile(`docs/qa/restyle-${step}-2026-10-13/${name}.html`,html);}
console.log(`Rendered local presentation fixtures for ${step}. No backend calls.`);
