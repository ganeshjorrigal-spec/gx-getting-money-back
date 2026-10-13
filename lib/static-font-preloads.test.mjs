import {it,expect} from 'vitest';
import {aboveFoldFonts} from '../scripts/static-font-preloads.mjs';
it('preloads only above-fold Latin fonts, deduplicating shared weights',()=>{
 const face=(family,url,range='u+00??')=>`@font-face{font-family:${family};font-weight:400;src:url(${url});unicode-range:${range}}`;
 expect(aboveFoldFonts(face('Fraunces','/heading.woff2')+face('Fraunces','/heading.woff2')+face('Public Sans','/body.woff2')+face('JetBrains Mono','/mono.woff2')+face('Fraunces','/extended.woff2','u+0100-02ba'))).toEqual(['/heading.woff2','/body.woff2']);
});

it('static export keeps policy styles and adds landing styles/preloads once',async()=>{
 const {mkdtemp,mkdir,writeFile,readFile,rm}=await import('node:fs/promises');const {tmpdir}=await import('node:os');const {join}=await import('node:path');const {addStaticFontPreloads}=await import('../scripts/static-font-preloads.mjs');
 const root=await mkdtemp(join(tmpdir(),'genie-font-proof-'));
 try{await mkdir(join(root,'_next/static/css'),{recursive:true});await mkdir(join(root,'terms'));
 await writeFile(join(root,'_next/static/css/style.css'),'@font-face{font-family:Fraunces;src:url(/heading.woff2);unicode-range:u+00??}@font-face{font-family:Public Sans;src:url(/body.woff2);unicode-range:u+00??}h1{opacity:1}');
 const html='<html><head><link rel="stylesheet" href="/style.css"></head><body>Visible text</body></html>';await writeFile(join(root,'index.html'),html);await writeFile(join(root,'terms/index.html'),html);
 await addStaticFontPreloads(root);await addStaticFontPreloads(root);
 const home=await readFile(join(root,'index.html'),'utf8'),terms=await readFile(join(root,'terms/index.html'),'utf8');expect(home.match(/data-landing-critical/g)).toHaveLength(1);expect(home.match(/as="font"/g)).toHaveLength(2);expect(home).not.toContain('rel="stylesheet"');expect(terms).toContain('rel="stylesheet"');expect(home).toContain('Visible text');
 }finally{await rm(root,{recursive:true,force:true});}
});
