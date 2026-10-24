/// <reference types="vite/client" />
import {afterEach,expect,it,vi} from 'vitest';
import {convexTest} from 'convex-test';
import schema from '../convex/schema';
import {api,internal} from '../convex/_generated/api';
import {hashToken} from '../convex/lib/access';
const modules=import.meta.glob('../convex/**/*.ts'),code='RG-SEC001',token='s'.repeat(43),email='passenger@example.invalid',deviceId='synthetic-device-0001';
afterEach(()=>vi.unstubAllEnvs());
async function fixture(){const t=convexTest(schema,modules);const caseId=await t.run(async ctx=>ctx.db.insert('cases',{code,tokenHash:await hashToken(token),deviceHash:await hashToken(deviceId),email,stage:'READY',refundType:'flight',factsConfirmedAt:1,facts:{pnr:'SAMPLE'},ladderLevel:0,draftsShown:0,tier:'free_check',paidState:'none',createdAt:Date.now(),updatedAt:Date.now()}));return {t,caseId};}
it('real cases reuse the one-time email link, bound to the creating device',async()=>{
 const {t,caseId}=await fixture();const args={code,token,deviceId,email,nonceHash:'synthetic-nonce',encryptedCaseToken:'synthetic'};
 await expect(t.mutation(internal.demoEmail.reserve,{...args,deviceId:'different-device-0001'})).rejects.toThrow('device');
 await t.mutation(internal.demoEmail.reserve,args);await t.mutation(internal.demoEmail.consume,{nonceHash:args.nonceHash});
 expect(await t.run(ctx=>ctx.db.get(caseId))).toMatchObject({email,confirmedCaseEmail:email,emailConfirmedAt:expect.any(Number)});
 await expect(t.mutation(internal.demoEmail.consume,{nonceHash:args.nonceHash})).rejects.toThrow('already used');
});
it('real hand-over refuses an unconfirmed case before generating any letter',async()=>{const {t}=await fixture();await expect(t.action(api.chaseActions.authorise,{code,token,name:'Sample Passenger',mobile:'',email,accepted:true})).rejects.toThrow('Confirm your email first');});
it('calling permission and request refuse an unconfirmed case even with old saved chase permission',async()=>{
 const {t,caseId}=await fixture();await t.run(async ctx=>{const letterId=await ctx.storage.store(new Blob(['sample']));await ctx.db.patch(caseId,{chase:{active:true,name:'Sample Passenger',mobile:'+910000000000',email,authorisedAt:1,callsAuthorisedAt:1,letterId,encryptedCaseToken:'synthetic'}});});
 await expect(t.mutation(api.calls.allow,{code,token,accepted:true})).rejects.toThrow('Confirm your email first');
 await expect(t.mutation(api.calls.request,{code,token,expectedMode:'simulated'})).rejects.toThrow('Confirm your email first');
 expect(await t.run(ctx=>ctx.db.system.query('_scheduled_functions').collect())).toEqual([]);
});
