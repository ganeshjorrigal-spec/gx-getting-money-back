// Local comparison only; never part of build or deploy.
import {execFileSync} from 'node:child_process';
import {mkdtemp,writeFile,readFile,mkdir,rm} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {join,resolve,dirname,basename} from 'node:path';
import {build} from 'esbuild';
import {staticLandingHtml} from '../static-landing.mjs';
const folder=await mkdtemp(join(tmpdir(),'rg-loop-baseline-'));
try{
 const old=join(folder,'sample.ts');await writeFile(old,execFileSync('git',['show','73756dc:lib/sample-animation.ts']));
 await mkdir('out/proof-loop-baseline',{recursive:true});
 await build({entryPoints:['scripts/landing-browser.ts'],bundle:true,format:'esm',platform:'browser',minify:true,outdir:'out/proof-loop-baseline',splitting:true,entryNames:'entry',chunkNames:'chunk-[hash]',plugins:[{name:'pre-loop-baseline',setup(b){b.onResolve({filter:/sample-animation$/},()=>({path:old}));}}],define:{'process.env.NEXT_PUBLIC_CONVEX_URL':'""'}});
 await writeFile('out/proof-loop-baseline/index.html',staticLandingHtml(await readFile('out/index.html','utf8'),'proof-loop-baseline/entry.js'));
 console.log('Local equivalent landing with pre-loop animation. No external requests or publication.');
}finally{const target=resolve(folder);if(dirname(target).toLowerCase()!==resolve(tmpdir()).toLowerCase()||!basename(target).startsWith('rg-loop-baseline-'))throw new Error('Unexpected comparison folder');await rm(target,{recursive:true,force:true});}
