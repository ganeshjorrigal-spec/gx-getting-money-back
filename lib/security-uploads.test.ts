/// <reference types="vite/client" />
import {expect,it,vi,afterEach} from 'vitest';
import {convexTest} from 'convex-test';
import schema from '../convex/schema';
import {api,internal} from '../convex/_generated/api';
import {hashToken} from '../convex/lib/access';
const modules=import.meta.glob('../convex/**/*.ts'),token='f'.repeat(43),deviceA='synthetic-device-0001',deviceB='synthetic-device-0002';
afterEach(()=>vi.unstubAllEnvs());
async function fixture(){const t=convexTest(schema,modules);const ids=await t.run(async ctx=>{const storageId=await ctx.storage.store(new Blob(['sample screenshot'],{type:'image/jpeg'}));const caseId=await ctx.db.insert('cases',{code:'RG-FILE01',tokenHash:await hashToken(token),deviceHash:await hashToken(deviceA),stage:'READY',ladderLevel:0,draftsShown:0,tier:'free_check',paidState:'none',createdAt:Date.now(),updatedAt:Date.now()});return {caseId,storageId};});return {t,...ids};}
it('a new case cannot attach an arbitrary existing storage ID',async()=>{const {t,storageId}=await fixture();await expect(t.mutation(api.cases.create,{text:'Made-up cancellation',chips:[],storageIds:[storageId],tokenHash:await hashToken('n'.repeat(43)),deviceId:deviceB})).rejects.toThrow('Screenshot');});
it('addReply cannot attach an unregistered storage ID',async()=>{const {t,storageId}=await fixture();await expect(t.mutation(api.cases.addReply,{code:'RG-FILE01',token,storageIds:[storageId]})).rejects.toThrow('Screenshot');});
it('deletion does not delete a foreign file merely listed in an input',async()=>{const {t,caseId,storageId}=await fixture();await t.run(ctx=>ctx.db.insert('inputs',{caseId,kind:'reply',storageIds:[storageId],createdAt:Date.now()}));await t.mutation(api.cases.remove,{code:'RG-FILE01',token});expect(await t.run(async ctx=>!!await ctx.storage.get(storageId))).toBe(true);});
it('triage cannot retrieve a foreign unregistered screenshot',async()=>{const {t,caseId,storageId}=await fixture();expect(await t.query((internal.files as any).owns,{caseId,storageId})).toBe(false);});
it('a one-use upload ticket records ownership and cannot be replayed or claimed by another device',async()=>{
 vi.stubEnv('CONVEX_SITE_URL','https://test.example.invalid');const {t}=await fixture();const url=await t.mutation(api.files.generateUploadUrl,{deviceId:deviceA});const path=new URL(url).pathname+new URL(url).search;
 const response=await t.fetch(path,{method:'POST',headers:{'Content-Type':'image/jpeg'},body:new Uint8Array([1,2,3])});expect(response.status).toBe(200);const {storageId}=await response.json();
 expect((await t.fetch(path,{method:'POST',headers:{'Content-Type':'image/jpeg'},body:new Uint8Array([4])})).status).toBe(400);
 await expect(t.mutation(api.cases.create,{text:'Sample',chips:[],storageIds:[storageId],deviceId:deviceB,tokenHash:await hashToken('b'.repeat(43))})).rejects.toThrow('Screenshot');
 const made=await t.mutation(api.cases.create,{text:'Sample',chips:[],storageIds:[storageId],deviceId:deviceA,tokenHash:await hashToken('a'.repeat(43))});expect(made.code).toMatch(/^RG-/);
});
