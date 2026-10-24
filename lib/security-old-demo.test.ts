/// <reference types="vite/client" />
import {expect,it,vi,afterEach} from 'vitest';
import {convexTest} from 'convex-test';
import schema from '../convex/schema';
import {api,internal} from '../convex/_generated/api';
const modules=import.meta.glob('../convex/**/*.ts');
afterEach(()=>vi.unstubAllGlobals());
it('the old public demo cannot create a case',async()=>{const t=convexTest(schema,modules);await expect(t.mutation(api.demo.create,{platform:'district',deviceId:'synthetic-device-0001',tokenHash:'a'.repeat(64)})).rejects.toThrow('confirmed-email demo');expect(await t.run(ctx=>ctx.db.query('cases').collect())).toEqual([]);});
it('the old organiser job cannot read mail or copy incoming recipients',async()=>{
 const t=convexTest(schema,modules),fetcher=vi.fn();vi.stubGlobal('fetch',fetcher);
 const caseId=await t.run(ctx=>ctx.db.insert('cases',{code:'RG-OLD001',tokenHash:'synthetic',stage:'READY',ladderLevel:0,draftsShown:0,tier:'free_check',paidState:'none',createdAt:Date.now(),updatedAt:Date.now(),demo:{kind:'flight',round:0,phase:'waiting_organiser',session:'old',now:'2026-10-25',expiresAt:Date.now()+60000}}));
 await t.action(internal.demoActions.checkOrganiser,{caseId,session:'old'});expect(fetcher).not.toHaveBeenCalled();
 expect(await t.run(ctx=>ctx.db.query('demoReplies').collect())).toEqual([]);
});
