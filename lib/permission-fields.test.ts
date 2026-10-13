/// <reference types="vite/client" />
import {it,expect,vi,afterEach} from 'vitest';
import {convexTest} from 'convex-test';
import schema from '../convex/schema';
import {api} from '../convex/_generated/api';
import {hashToken} from '../convex/lib/access';
const letter=vi.hoisted(()=>vi.fn(async()=>new Uint8Array([1,2,3])));
vi.mock('../convex/lib/authority_letter',()=>({makeAuthorityLetter:letter}));
vi.mock('../lib/token-crypto',async original=>({...await original<Record<string,unknown>>(),encryptToken:vi.fn().mockResolvedValue('synthetic')}));
afterEach(()=>{vi.clearAllTimers();vi.useRealTimers();vi.clearAllMocks();});
async function fixture(){vi.useFakeTimers();const t=convexTest(schema,import.meta.glob('../convex/**/*.ts')),token='x'.repeat(43);const id=await t.run(async ctx=>ctx.db.insert('cases',{code:'RG-QATEST',tokenHash:await hashToken(token),refundType:'flight',factsConfirmedAt:1,stage:'READY',ladderLevel:0,draftsShown:0,tier:'free_check',paidState:'none',createdAt:1,updatedAt:1,facts:{airline:'Demo Air',bookedVia:'direct',pnr:'SAMPLE'}}));return{t,id,token};}
it('mail-only authorisation succeeds without collecting a mobile',async()=>{const {t,id,token}=await fixture();await t.action(api.chaseActions.authorise,{code:'RG-QATEST',token,name:'Sample Passenger',email:'passenger@example.invalid',accepted:true});const row=await t.run(ctx=>ctx.db.get(id));expect(row!.chase!.mobile).toBe('');expect(row!.chase!.callsAuthorisedAt).toBeUndefined();expect(letter).toHaveBeenCalledWith(expect.objectContaining({mobile:''}));});
it('legacy mail clients cannot silently grant calling or collect a phone',async()=>{const {t,id,token}=await fixture();await t.action(api.chaseActions.authorise,{code:'RG-QATEST',token,name:'Sample Passenger',mobile:'0000000000',email:'passenger@example.invalid',accepted:true});expect((await t.run(ctx=>ctx.db.get(id)))!.chase!.mobile).toBe('');});
it('separate calling permission requires a mobile and accepted consent',async()=>{const {t,id,token}=await fixture();await t.action(api.chaseActions.authorise,{code:'RG-QATEST',token,name:'Sample Passenger',email:'passenger@example.invalid',accepted:true});await expect(t.mutation(api.calls.allow,{code:'RG-QATEST',token,accepted:true})).rejects.toThrow(/mobile/);await expect(t.mutation(api.calls.allow,{code:'RG-QATEST',token,accepted:false,mobile:'0000000000'})).rejects.toThrow(/permission/);expect((await t.run(ctx=>ctx.db.get(id)))!.chase!.callsAuthorisedAt).toBeUndefined();await t.mutation(api.calls.allow,{code:'RG-QATEST',token,accepted:true,mobile:'0000000000'});const row=await t.run(ctx=>ctx.db.get(id));expect(row!.chase!.mobile).toBe('0000000000');expect(row!.chase!.callsAuthorisedAt).toBeGreaterThan(0);});
