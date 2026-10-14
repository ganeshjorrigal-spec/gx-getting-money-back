/// <reference types="vite/client" />
import {it,expect,vi,afterEach} from 'vitest';
import {convexTest} from 'convex-test';
import schema from '../convex/schema';
import {api,internal} from '../convex/_generated/api';
import {userError} from './user-error';
import {hashToken} from '../convex/lib/access';
const transport=vi.hoisted(()=>({accessToken:vi.fn().mockResolvedValue('synthetic-auth'),googleJson:vi.fn().mockResolvedValue({id:'fixture-mail'})}));
vi.mock('../convex/googleActions',async original=>({...await original<Record<string,unknown>>(),...transport}));
vi.mock('../lib/token-crypto',()=>({encryptToken:vi.fn().mockResolvedValue('synthetic-encrypted'),decryptToken:vi.fn().mockResolvedValue('x'.repeat(43))}));
afterEach(()=>{vi.clearAllTimers();vi.useRealTimers();vi.unstubAllEnvs();vi.clearAllMocks();});
it('actual confirmation actions send only an opaque link from the demo mailbox, then unlock its case once',async()=>{
 vi.useFakeTimers();vi.stubEnv('TICKBACK_DEMO_ADDRESS','desk@example.invalid');vi.stubEnv('PUBLIC_APP_URL','https://example.invalid');const t=convexTest(schema,import.meta.glob('../convex/**/*.ts')),token='x'.repeat(43),deviceId='synthetic-device-id';
 const caseId=await t.run(async ctx=>{await ctx.db.insert('googleConnections',{kind:'demo',email:'desk@example.invalid',encryptedRefreshToken:'synthetic',connectedAt:1});return ctx.db.insert('cases',{code:'RG-QATEST',tokenHash:await hashToken(token),deviceHash:await hashToken(deviceId),stage:'READY',refundType:'flight',factsConfirmedAt:1,ladderLevel:0,draftsShown:0,tier:'free_check',paidState:'none',createdAt:1,updatedAt:1,demo:{kind:'flight',chaseStory:true,emailRequired:true,chasePhase:'authority',round:0,phase:'ready',now:'2026-10-14',expiresAt:Date.now()+86400000}});});
 await t.action(api.demoEmailActions.request,{code:'RG-QATEST',token,deviceId,email:'passenger@example.invalid'});
 const raw=Buffer.from(JSON.parse(transport.googleJson.mock.calls[0][2].body).raw,'base64url').toString();expect(raw).toContain('From: Refund Genie demo <desk@example.invalid>');expect(raw).toContain('To: passenger@example.invalid');expect(raw).not.toContain('Cc:');expect(raw).toContain('Subject: Demo:');const body=Buffer.from(raw.split('\r\n\r\n')[1],'base64').toString();expect(body).not.toContain(token);expect(body).not.toContain('#k=');const nonce=body.match(/confirmation=([a-f0-9]{64})/)![1];const result=await t.action(api.demoEmailActions.confirm,{confirmation:nonce});expect(result.url).toContain('RG-QATEST');expect((await t.run(ctx=>ctx.db.get(caseId)))?.email).toBe('passenger@example.invalid');await expect(t.action(api.demoEmailActions.confirm,{confirmation:nonce})).rejects.toThrow(/already used/);
});
async function failedSendFixture(){
 vi.useFakeTimers();vi.setSystemTime(new Date('2026-10-15T00:30:00Z'));vi.stubEnv('TICKBACK_DEMO_ADDRESS','desk@example.invalid');vi.stubEnv('PUBLIC_APP_URL','https://example.invalid');
 const t=convexTest(schema,import.meta.glob('../convex/**/*.ts')),token='x'.repeat(43),deviceId='synthetic-device-id';
 const caseId=await t.run(async ctx=>{await ctx.db.insert('googleConnections',{kind:'demo',email:'desk@example.invalid',encryptedRefreshToken:'synthetic',connectedAt:1});return ctx.db.insert('cases',{code:'RG-QATEST',tokenHash:await hashToken(token),deviceHash:await hashToken(deviceId),stage:'READY',refundType:'flight',factsConfirmedAt:1,ladderLevel:0,draftsShown:0,tier:'free_check',paidState:'none',createdAt:1,updatedAt:1,demo:{kind:'flight',chaseStory:true,emailRequired:true,chasePhase:'authority',round:0,phase:'ready',now:'2026-10-15',expiresAt:Date.now()+86400000}});});
 const keys=[`demo-confirm-device:${await hashToken(deviceId)}:2026-10-15`,`demo-confirm-mail-address:${await hashToken('passenger@example.invalid')}:2026-10-15`,'demo-confirm-mail-overall:2026-10-15'];
 return {t,caseId,keys,args:{code:'RG-QATEST',token,deviceId,email:'passenger@example.invalid'}};
}
it('failed Google send returns all three counts without resetting earlier attempts and deletes only its unsent row',async()=>{
 const f=await failedSendFixture();await f.t.run(async ctx=>{for(const key of f.keys)await ctx.db.insert('rateCounters',{key,count:1,windowStart:Date.now()});});
 transport.googleJson.mockRejectedValueOnce(new Error('Google API request failed (403)'));
 await expect(f.t.action(api.demoEmailActions.request,f.args)).rejects.toThrow("We couldn't send the confirmation mail just now. Try again in a few minutes.");
 for(const key of f.keys)expect(await f.t.run(ctx=>ctx.db.query('rateCounters').withIndex('by_key',q=>q.eq('key',key)).unique())).toMatchObject({count:1});
 expect(await f.t.run(ctx=>ctx.db.query('demoEmailConfirmations').withIndex('by_case',q=>q.eq('caseId',f.caseId)).take(4))).toHaveLength(0);
});
it('missing demo connection also releases new reservations with the safe message',async()=>{
 const f=await failedSendFixture();await f.t.run(async ctx=>{const connection=await ctx.db.query('googleConnections').withIndex('by_kind',q=>q.eq('kind','demo')).first();await ctx.db.delete(connection!._id);});
 await expect(f.t.action(api.demoEmailActions.request,f.args)).rejects.toThrow("We couldn't send the confirmation mail just now. Try again in a few minutes.");
 for(const key of f.keys)expect(await f.t.run(ctx=>ctx.db.query('rateCounters').withIndex('by_key',q=>q.eq('key',key)).unique())).toMatchObject({count:0});
 expect(transport.googleJson).not.toHaveBeenCalled();
});

it('confirmation mail error passes through the safe user-facing message',()=>{
 const message="We couldn't send the confirmation mail just now. Try again in a few minutes.";
 expect(userError(new Error(`[CONVEX A(demoEmailActions:request)] Server Error: ${message}`))).toBe(message);
});
it('cleanup is idempotent and cannot return the counts for an already sent confirmation',async()=>{
 const f=await failedSendFixture();await f.t.action(api.demoEmailActions.request,f.args);const row=await f.t.run(ctx=>ctx.db.query('demoEmailConfirmations').withIndex('by_case',q=>q.eq('caseId',f.caseId)).first());
 await f.t.mutation(internal.demoEmail.releaseFailedSend,{id:row!._id});expect(await f.t.run(ctx=>ctx.db.get(row!._id))).not.toBeNull();
 for(const key of f.keys)expect(await f.t.run(ctx=>ctx.db.query('rateCounters').withIndex('by_key',q=>q.eq('key',key)).unique())).toMatchObject({count:1});
});
it('a second cleanup does not return another reservation; failed sends after midnight refund the original day only',async()=>{
 const f=await failedSendFixture();const id=await f.t.mutation(internal.demoEmail.reserve,{...f.args,nonceHash:'synthetic-hash',encryptedCaseToken:'synthetic-encrypted'});
 vi.setSystemTime(new Date('2026-10-15T18:30:00Z'));const nextKeys=f.keys.map(key=>key.replace('2026-10-15','2026-10-16'));
 await f.t.run(async ctx=>{for(const key of nextKeys)await ctx.db.insert('rateCounters',{key,count:1,windowStart:Date.now()});});
 await f.t.mutation(internal.demoEmail.releaseFailedSend,{id});await f.t.mutation(internal.demoEmail.releaseFailedSend,{id});
 expect(await f.t.run(ctx=>ctx.db.get(id))).toBeNull();
 for(const key of f.keys)expect(await f.t.run(ctx=>ctx.db.query('rateCounters').withIndex('by_key',q=>q.eq('key',key)).unique())).toMatchObject({count:0});
 for(const key of nextKeys)expect(await f.t.run(ctx=>ctx.db.query('rateCounters').withIndex('by_key',q=>q.eq('key',key)).unique())).toMatchObject({count:1});
});
