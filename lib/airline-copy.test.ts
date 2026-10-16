import {it,expect} from 'vitest';
import {callingCopy} from '../app/copy';
import {readFileSync} from 'node:fs';
it('permission names the company, AI disclosure, recording and callback',()=>expect(callingCopy.permission('IndiGo')).toBe("and to call IndiGo's customer care for me. Genie says it is an AI assistant calling with my permission. The call is recorded. If they need to verify me, I will call them back."));
it('FAQ has user-only calling, hours, recording and callback, with real button wording',()=>{
 expect(callingCopy.faqAnswer).toBe('Yes, for IndiGo to start. Genie calls Monday to Saturday, 10:00 to 18:00 IST, only after you give calling permission and press call. It says it is an AI, gets the status and reference, and mails you what it learned. Calls are recorded. If the airline needs to verify you, Genie tells you how to call back.');
 expect(callingCopy.realCallButton('IndiGo')).toBe('Ask Genie to call IndiGo');expect(callingCopy.startLiveTest).toBe('Start approved live test call');expect(callingCopy.runSimulation).toBe('Run simulated demo call');
});
it('privacy and logo disclaimer are centralized and use existing support contact',()=>{
 expect(callingCopy.privacyChase).toContain('call recordings and safe transcripts for the case');expect(callingCopy.privacyChase).toContain('The call stops at any request for OTP, card or bank details.');
 expect(callingCopy.brandDisclaimer).toBe('Refund Genie is independent and not affiliated with these companies. Names and logos only show which companies Genie can chase.');
 const privacy=readFileSync('app/privacy/page.tsx','utf8');expect(privacy).toContain('{callingCopy.privacyRequests} <SupportContact />');expect(readFileSync('app/components/brand.tsx','utf8')).toContain('{callingCopy.brandDisclaimer}');
 expect(callingCopy.privacyRequests).not.toMatch(/days|automatic/i);
});

import {build} from 'esbuild';
import {createRequire} from 'node:module';
import {resolve} from 'node:path';

it('rendered real airline button names the airline and demos keep their existing label',async()=>{
 await build({entryPoints:['scripts/qa/airline-copy-proof.tsx'],bundle:true,platform:'node',format:'cjs',packages:'external',jsx:'automatic',outfile:'.env.airline-copy.cjs',alias:{'convex/react':resolve('scripts/qa/airline-hooks-fixture.ts')}});
 const proof=createRequire(import.meta.url)(resolve('.env.airline-copy.cjs'));
 expect(proof.renderCall(false)).toContain('Ask Genie to call IndiGo');expect(proof.renderCall(false)).not.toContain('Start approved live test call');expect(proof.renderCall(true)).toContain('Start approved live test call');expect(proof.renderCall(false,'Air India')).not.toContain('Ask Genie to call Air India');
});
