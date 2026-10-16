import {it,expect,beforeAll} from 'vitest';
import React from 'react';
import {renderToStaticMarkup as render} from 'react-dom/server';
import {readFile} from 'node:fs/promises';
import {transform} from 'esbuild';
import {createRequire} from 'node:module';
let EmailCaseLink:any;
beforeAll(async()=>{
 const source=await readFile('app/c/email-case-link.tsx','utf8'),compiled=await transform(source,{loader:'tsx',jsx:'automatic',format:'cjs'}),module={exports:{} as any},require=createRequire(import.meta.url);
 new Function('require','module','exports',compiled.code)((name:string)=>name==='convex/react'?{useAction:()=>()=>Promise.resolve({state:'sent',maskedEmail:'f***@example.invalid'})}:name.includes('_generated/api')?{api:{caseLinkMailActions:{send:'fixture'}}}:name.includes('case-link-mail')?{caseLinkLimitMessage:'Already sent 3 times today.'}:name.includes('user-error')?{userError:()=> 'Fixture error'}:require(name),module,module.exports);EmailCaseLink=module.exports.EmailCaseLink;
});
it('confirmed case renders a real send button and no editable recipient',()=>{
 const html=render(React.createElement(EmailCaseLink,{code:'RG-LINKQA',token:'fixture',confirmedEmail:'fixture@example.invalid',link:'https://example.invalid/private'}));
 expect(html).toContain('<button class="button button-secondary"');expect(html).toContain('Email me this case link');expect(html).not.toContain('<input');expect(html).not.toContain('Open in Gmail');expect(html).not.toContain('fixture@example.invalid');
});
it('no confirmed email renders copy-only fallback',()=>{
 const html=render(React.createElement(EmailCaseLink,{code:'RG-LINKQA',token:'fixture',link:'https://example.invalid/private'}));expect(html).toContain('Copy my case link');expect(html).not.toContain('Email me');
});
