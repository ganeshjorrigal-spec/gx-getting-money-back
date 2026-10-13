import {readFile,writeFile} from 'node:fs/promises';
import {join} from 'node:path';
import {build} from 'esbuild';
import nextEnv from '@next/env';
export function staticLandingHtml(html,entry){
 // Keep server-rendered content. Replace homepage-only hydration/flight data with the small entry.
 return html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi,'')
  .replace(/<link\b[^>]*(?:rel="(?:preload|modulepreload)"[^>]*as="script"|as="script"[^>]*rel="(?:preload|modulepreload)")[^>]*>/gi,'')
  .replace('</body>',`<script type="module" src="/${entry}"></script></body>`);
}
export async function addStaticLanding(root='out'){
 nextEnv.loadEnvConfig(process.cwd(),false, {info(){},error(){}});
 const result=await build({entryPoints:['scripts/landing-browser.ts'],outdir:join(root,'landing'),entryNames:'entry-[hash]',chunkNames:'chunk-[hash]',bundle:true,splitting:true,format:'esm',platform:'browser',minify:true,metafile:true,define:{'process.env.NEXT_PUBLIC_CONVEX_URL':JSON.stringify(process.env.NEXT_PUBLIC_CONVEX_URL||process.env.VITE_CONVEX_URL||'')}});
 const entry=Object.entries(result.metafile.outputs).find(([,v])=>v.entryPoint==='scripts/landing-browser.ts')?.[0];
 if(!entry)throw new Error('Missing static landing entry');
 const path=join(root,'index.html');await writeFile(path,staticLandingHtml(await readFile(path,'utf8'),entry.replaceAll('\\','/').replace(root+'/','')));
 await writeFile(join(root,'landing/bundle.json'),JSON.stringify(result.metafile,null,2));
 console.log('Static landing: small browser entry; intake/case HTML unchanged.');
}
