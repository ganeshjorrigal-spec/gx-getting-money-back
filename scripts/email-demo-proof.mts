import {build} from 'esbuild';import {mkdir,readFile,writeFile,readdir} from 'node:fs/promises';import {resolve} from 'node:path';
const folder='out/proof-email-demo';await mkdir(folder,{recursive:true});
const store=resolve('scripts/qa/email-demo-store.ts');
await build({entryPoints:['scripts/qa/email-demo-render.tsx'],bundle:true,platform:'browser',format:'esm',jsx:'automatic',outfile:folder+'/entry.js',define:{'process.env.NODE_ENV':'"production"'},plugins:[{name:'isolated-case-navigation',setup(b){b.onResolve({filter:/\/lib\/case-(link|navigation)$/},()=>({path:store}));}}],alias:{'convex/react':store,'next/link':resolve('scripts/qa/email-demo-link.tsx')}});
const css=(await Promise.all((await readdir('out/_next/static/css')).filter(f=>f.endsWith('.css')).map(f=>readFile('out/_next/static/css/'+f,'utf8')))).join('\n');
const home=await readFile('out/index.html','utf8'),fontClass=home.match(/<html[^>]*class="([^"]+)"/)?.[1]??'';
await writeFile(folder+'/index.html',`<!doctype html><html class="${fontClass}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><style>${css}</style><title>Local D-048 email proof</title></head><body><div id="root"></div><script type="module" src="entry.js"></script></body></html>`);
console.log('Actual landing/start/case components bundled with isolated demo transport.');

