/// <reference types="vite/client" />
import {afterEach, expect, it, vi} from 'vitest';
import {convexTest} from 'convex-test';
import schema from '../convex/schema';
import {api, internal} from '../convex/_generated/api';
import {hashToken} from '../convex/lib/access';
const modules=import.meta.glob('../convex/**/*.ts');
afterEach(()=>{vi.unstubAllEnvs();vi.unstubAllGlobals();});
it('responses setup rejects a public request without the owner secret before any Google request',async()=>{
 vi.stubEnv('RESPONSES_SETUP_SECRET','synthetic-owner-secret');
 const fetcher=vi.fn();vi.stubGlobal('fetch',fetcher);
 await expect(convexTest(schema,modules).action(api.googleActions.beginResponses,{})).rejects.toThrow('Owner setup');
 expect(fetcher).not.toHaveBeenCalled();
});
it('responses callback rejects a different account before storing a connection',async()=>{
 vi.stubEnv('RESPONSES_SETUP_SECRET','synthetic-owner-secret');vi.stubEnv('RESPONSES_OWNER_EMAIL','owner@example.invalid');
 vi.stubEnv('GOOGLE_OAUTH_CLIENT_ID','synthetic');vi.stubEnv('GOOGLE_OAUTH_CLIENT_SECRET','synthetic');vi.stubEnv('TOKEN_ENC_KEY','a'.repeat(64));vi.stubEnv('CONVEX_SITE_URL','https://example.invalid');
 const t=convexTest(schema,modules);await t.mutation(internal.googleConnect.createState,{stateHash:await hashToken('state'),kind:'responses'});
 vi.stubGlobal('fetch',vi.fn().mockResolvedValueOnce(new Response(JSON.stringify({access_token:'synthetic',refresh_token:'synthetic',scope:'https://www.googleapis.com/auth/drive.file'}))).mockResolvedValueOnce(new Response(JSON.stringify({user:{emailAddress:'stranger@example.invalid'}}))));
 await expect(t.action(internal.googleActions.finishOauth,{code:'synthetic',state:'state'})).rejects.toThrow('configured owner');
 expect(await t.run(ctx=>ctx.db.query('googleConnections').collect())).toEqual([]);
});
it('finishSetup refuses a stored responses connection belonging to someone else',async()=>{
 vi.stubEnv('RESPONSES_SETUP_SECRET','synthetic-owner-secret');vi.stubEnv('RESPONSES_OWNER_EMAIL','owner@example.invalid');
 const t=convexTest(schema,modules);const connectionId=await t.mutation(internal.googleConnect.store,{kind:'responses',email:'stranger@example.invalid',encryptedRefreshToken:'synthetic'});
 const fetcher=vi.fn();vi.stubGlobal('fetch',fetcher);
 await expect(t.action(internal.responsesActions.finishSetup,{connectionId})).rejects.toThrow('configured owner');expect(fetcher).not.toHaveBeenCalled();
});
