import {readFile,readdir,writeFile} from 'node:fs/promises';
import {join} from 'node:path';
export function aboveFoldFonts(css) {
  return [...new Set([...css.matchAll(/@font-face\{([^}]+)\}/g)].flatMap(([,rule])=>{
    if(!/font-family:(?:Fraunces|Public Sans);/.test(rule)||!rule.includes('u+00??'))return [];
    const url=rule.match(/src:url\(([^)]+)\)/)?.[1];
    return url?[url]:[];
  }))];
}
export async function addStaticFontPreloads(root='out') {
  const dir=join(root,'_next/static/css');
  const css=(await Promise.all((await readdir(dir)).filter(f=>f.endsWith('.css')).map(f=>readFile(join(dir,f),'utf8')))).join('\n');
  const fonts=aboveFoldFonts(css);
  if(fonts.length!==2)throw new Error('Expected two above-fold Latin fonts; check the export before publishing.');
  async function visit(dir){for(const e of await readdir(dir,{withFileTypes:true})){
    const p=join(dir,e.name);if(e.isDirectory()&&!e.name.startsWith('proof-'))await visit(p);
    else if(e.isFile()&&e.name.endsWith('.html')){let s=await readFile(p,'utf8');const tags=fonts.filter(f=>!s.includes(`href="${f}"`)).map(f=>`<link rel="preload" href="${f}" as="font" type="font/woff2" crossorigin="anonymous"/>`).join('');if(tags)await writeFile(p,s.replace('<head>','<head>'+tags));}
  }}
  await visit(root);
  // The landing is small: inline its styles to remove the measured blocking CSS request.
  const home=join(root,'index.html');let html=await readFile(home,'utf8');
  if(!html.includes('data-landing-critical')){
    html=html.replace(/<link\b[^>]*rel="stylesheet"[^>]*>/g,'');
    html=html.replace('</head>',`<style data-landing-critical>${css}</style></head>`);
    await writeFile(home,html);
  }
  console.log('Static export: preloaded the two above-fold Latin fonts; monospace stays on demand.');
}
