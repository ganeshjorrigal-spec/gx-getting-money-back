import {it,expect} from 'vitest';
import {callingCopy} from '../app/copy';
import {readFileSync} from 'node:fs';
it('public release and control copy names permission, checked recipients, user CC and real hours',()=>{
 expect(callingCopy.landingRelease).toBe('Genie mails and calls only after your written permission. Calls start with IndiGo, Monday to Saturday, 10:00 to 18:00.');
 for(const line of [callingCopy.realMailNotice,callingCopy.termsControl,callingCopy.privacyChase]){expect(line).toMatch(/checked company contacts|checked contacts/);expect(line).toContain('confirmed email');expect(line).not.toMatch(/approved test|sending is off|simulated for now/);}
 expect(callingCopy.startDemo).toContain('simulated');expect(callingCopy.liveTestOnly).toContain('approved test numbers');
});
it('real-case authority and privacy do not claim test-only company mail; demo remains labelled',()=>{
 const authority=readFileSync('app/c/chase-authority.tsx','utf8'),privacy=readFileSync('app/privacy/page.tsx','utf8');expect(authority).toContain('demo?callingCopy.demoMailNotice:callingCopy.realMailNotice');expect(authority).not.toContain('Real-company\n        sending is off');expect(privacy).not.toContain('separate test-only mail chase');expect(privacy).toContain('labelled demo mail chase');
});
