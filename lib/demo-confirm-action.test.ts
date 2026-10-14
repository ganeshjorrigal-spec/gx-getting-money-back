/// <reference types="vite/client" />
import {it,expect,vi,afterEach} from 'vitest';
import {convexTest} from 'convex-test';
import schema from '../convex/schema';
import {api} from '../convex/_generated/api';
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
