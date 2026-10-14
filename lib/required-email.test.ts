/// <reference types="vite/client" />
import {it,expect,vi,afterEach} from 'vitest';
import {convexTest} from 'convex-test';
import schema from '../convex/schema';
import {api,internal} from '../convex/_generated/api';
import {hashToken} from '../convex/lib/access';
import {sampleFlight} from './flight-sample';
afterEach(()=>{vi.clearAllTimers();vi.useRealTimers();});
async function fixture(type:'flight'|'event',contact?:string){vi.useFakeTimers();const t=convexTest(schema,import.meta.glob('../convex/**/*.ts'));const token='x'.repeat(43);const caseId=await t.run(async ctx=>ctx.db.insert('cases',{code:'RG-EMAIL1',tokenHash:await hashToken(token),stage:'READY',refundType:type,facts:type==='flight'?sampleFlight():{},contact,ladderLevel:0,draftsShown:0,tier:'free_check',paidState:'none',createdAt:1,updatedAt:1}));return {t,token,caseId};}
it.each(['flight','event'] as const)('real %s confirmation refuses a missing email',async type=>{const {t,token}=await fixture(type);await expect(type==='flight'?t.mutation(api.flights.confirm,{code:'RG-EMAIL1',token,pnr:'SAMPLE'}):t.mutation(api.cases.confirmFacts,{code:'RG-EMAIL1',token,looksRight:true})).rejects.toThrow(/email/i);});
it.each(['flight','event'] as const)('real %s reuses an earlier email at confirm',async type=>{const {t,token,caseId}=await fixture(type,'passenger@example.invalid');if(type==='flight')await t.mutation(api.flights.confirm,{code:'RG-EMAIL1',token,pnr:'SAMPLE'});else await t.mutation(api.cases.confirmFacts,{code:'RG-EMAIL1',token,looksRight:true});expect((await t.run(ctx=>ctx.db.get(caseId)))?.email).toBe('passenger@example.invalid');});
it('event draft persistence refuses unconfirmed real email but keeps free check facts',async()=>{const {t,caseId}=await fixture('event');await t.run(ctx=>ctx.db.patch(caseId,{latestRunId:'read'}));await t.mutation(internal.agentWrites.saveDraft,{caseId,runId:'read',step:'L0_email',channel:'email',body:'Fixture',attachChecklist:[],model:'fixture',latencyMs:0,inputTokens:0,outputTokens:0,totalTokens:0});expect(await t.run(ctx=>ctx.db.query('drafts').withIndex('by_case',q=>q.eq('caseId',caseId)).collect())).toEqual([]);});
