/// <reference types="vite/client" />
import {it,expect,vi,afterEach} from 'vitest';
import {convexTest} from 'convex-test';
import schema from '../convex/schema';
import {api,internal} from '../convex/_generated/api';
import {hashToken} from '../convex/lib/access';
import {caseLinkRecipient} from './case-link-mail';
const transport=vi.hoisted(()=>({accessToken:vi.fn().mockResolvedValue('fixture-token'),googleJson:vi.fn().mockResolvedValue({id:'fixture-id'})}));
vi.mock('../convex/googleActions',async original=>({...await original<Record<string,unknown>>(),...transport}));
afterEach(()=>{vi.clearAllMocks();vi.unstubAllEnvs();vi.useRealTimers();});
async function setup(confirmed=true){
 vi.stubEnv('PUBLIC_APP_URL','https://refundgenie.example.invalid');vi.stubEnv('TICKBACK_INBOX_ADDRESS','inbox@example.invalid');vi.stubEnv('CHASE_ALLOWLIST','company@example.invalid');
 const t=convexTest(schema,import.meta.glob('../convex/**/*.ts')),code='RG-LINKQA',token='x'.repeat(43);
 const id=await t.run(async ctx=>{await ctx.db.insert('googleConnections',{kind:'inbox',chaseSendGranted:true,encryptedRefreshToken:'fixture',connectedAt:1});return ctx.db.insert('cases',{code,tokenHash:await hashToken(token),stage:'READY',email:'owner@example.invalid',factsConfirmedAt:confirmed?1:undefined,contact:'stranger@example.invalid',ladderLevel:0,draftsShown:0,tier:'free_check',paidState:'none',createdAt:1,updatedAt:1});});return {t,id,args:{code,token}};
}
it('sends the private link only to confirmed email, never user-supplied recipient or CC',async()=>{
 const {t,args}=await setup();const result=await t.action(api.caseLinkMailActions.send,args);expect(result).toEqual({state:'sent',maskedEmail:'o***@example.invalid'});
 const raw=Buffer.from(JSON.parse((transport.googleJson.mock.calls[0] as any)[2].body).raw,'base64url').toString();
 expect(raw).toContain('To: owner@example.invalid\r\nCc: \r\n');expect(raw).not.toContain('Bcc:');expect(raw).not.toContain('stranger@');expect(raw).toContain('From: Refund Genie <inbox@example.invalid>');
 const decodedBody=Buffer.from(raw.split('Content-Transfer-Encoding: base64\r\n\r\n')[1].split('\r\n')[0],'base64').toString();
 expect(decodedBody).toContain(`#k=${args.token}`);expect(decodedBody).toContain('Keep this link private. Anyone with it can open the case.');
 await expect(t.action(api.caseLinkMailActions.send,{...args,to:'stranger@example.invalid'} as any)).rejects.toThrow();expect(transport.googleJson).toHaveBeenCalledTimes(1);
});
it('atomic reservations cap parallel taps at three per case/day and reset next day',async()=>{
 vi.useFakeTimers();vi.setSystemTime(new Date('2026-10-17T12:00:00+05:30'));
 const {t,args}=await setup();const result=await Promise.all(Array.from({length:4},()=>t.action(api.caseLinkMailActions.send,args)));
 expect(result.filter(r=>r.state==='sent')).toHaveLength(3);expect(result.filter(r=>r.state==='limit')).toHaveLength(1);expect(transport.googleJson).toHaveBeenCalledTimes(3);
 vi.setSystemTime(new Date('2026-10-18T12:00:00+05:30'));expect((await t.action(api.caseLinkMailActions.send,args)).state).toBe('sent');
});
it('missing confirmation cannot send; contact fallback is never eligible',async()=>{
 const {t,args}=await setup(false);await expect(t.action(api.caseLinkMailActions.send,args)).rejects.toThrow(/confirm/);expect(transport.googleJson).not.toHaveBeenCalled();
 expect(caseLinkRecipient({factsConfirmedAt:1,email:null})).toBeNull();expect(caseLinkRecipient({email:'owner@example.invalid',demo:{}})).toBeNull();expect(caseLinkRecipient({email:'owner@example.invalid',demo:{emailConfirmedAt:1}})).toBe('owner@example.invalid');
});
it('changed email during authentication cancels delivery without disclosing link',async()=>{
 const {t,id,args}=await setup();transport.accessToken.mockImplementationOnce(async()=>{await t.run(ctx=>ctx.db.patch(id,{email:'changed@example.invalid'}));return 'fixture-token';});
 await expect(t.action(api.caseLinkMailActions.send,args)).rejects.toThrow(/Copy/);expect(transport.googleJson).not.toHaveBeenCalled();expect(await t.run(ctx=>ctx.db.query('caseLinkMails').withIndex('by_case',q=>q.eq('caseId',id)).take(4))).toHaveLength(0);
});

it('unknown delivery consumes a slot without any automatic retry',async()=>{
 const {t,id,args}=await setup();transport.googleJson.mockRejectedValueOnce(new Error('fixture unknown delivery'));
 await expect(t.action(api.caseLinkMailActions.send,args)).rejects.toThrow(/Delivery could not be confirmed/);expect(transport.googleJson).toHaveBeenCalledTimes(1);
 expect((await t.run(ctx=>ctx.db.query('caseLinkMails').withIndex('by_case',q=>q.eq('caseId',id)).first()))?.state).toBe('uncertain');
});
it('case token and Google send permission are required before reserving or sending',async()=>{
 const {t,args}=await setup();await expect(t.action(api.caseLinkMailActions.send,{...args,token:'wrong'})).rejects.toThrow();
 await t.run(async ctx=>{const connection=await ctx.db.query('googleConnections').withIndex('by_kind',q=>q.eq('kind','inbox')).first();await ctx.db.patch(connection!._id,{chaseSendGranted:false});});
 await expect(t.action(api.caseLinkMailActions.send,args)).rejects.toThrow(/unavailable/);expect(transport.googleJson).not.toHaveBeenCalled();expect(transport.accessToken).not.toHaveBeenCalled();
});
