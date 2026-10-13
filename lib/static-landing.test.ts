import {it,expect} from 'vitest';
import {staticLandingHtml} from '../scripts/static-landing.mjs';
it('keeps visible landing content and ordinary navigation while removing hydration and script preloads',()=>{
 const html='<head><link rel="preload" as="script" href="/_next/a.js"/><link rel="preload" as="font" href="/font.woff2"/></head><body><main><a href="/start/?demo=flight">Demo</a><h1>Refund Genie</h1></main><script src="/_next/a.js"></script><script>self.__next_f.push([1,"data"])</script></body>';
 const result=staticLandingHtml(html,'landing/entry.js');
 expect(result).toContain('<h1>Refund Genie</h1>');expect(result).toContain('href="/start/?demo=flight"');expect(result).toContain('as="font"');expect(result).not.toContain('_next');expect(result).not.toContain('self.__next');expect(result).toContain('type="module" src="/landing/entry.js"');
});
it('landing uses Latin subsets and local fallback glyphs without fetching unused language fonts',()=>{
 const result=staticLandingHtml('<head><style data-landing-critical>@font-face{font-family:Public Sans;src:url(latin.woff2);unicode-range:u+00??;}@font-face{font-family:Public Sans;src:url(extra.woff2);unicode-range:u+20b9;}@font-face{font-family:Public Sans Fallback;src:local(Arial);}</style></head><body></body>','landing/entry.js');
 expect(result).toContain('latin.woff2');expect(result).not.toContain('extra.woff2');expect(result).toContain('src:local(Arial)');
});
