/// <reference types="vite/client" />
import {afterEach, beforeEach, expect, it, vi} from 'vitest';
import {convexTest} from 'convex-test';
import schema from '../convex/schema';
import {internal} from '../convex/_generated/api';
const {generate} = vi.hoisted(() => ({generate: vi.fn()}));
vi.mock('ai', () => ({generateObject: generate}));
const modules = import.meta.glob('../convex/**/*.ts');
beforeEach(() => {vi.useFakeTimers(); vi.setSystemTime(new Date('2026-10-24T10:59:59Z')); vi.stubEnv('GEMINI_MODEL', 'synthetic-model'); generate.mockReset();});
afterEach(() => {vi.useRealTimers(); vi.unstubAllEnvs();});
async function fixture(demo = false, refundType: 'flight' | 'event' = 'flight') {
  const t = convexTest(schema, modules);
  const ids = await t.run(async ctx => {
    const storageId = await ctx.storage.store(new Blob(['made-up screenshot'], {type: 'image/jpeg'}));
    const caseId = await ctx.db.insert('cases', {code: 'RG-AI0001', tokenHash: 'synthetic', stage: 'TRIAGING', refundType, latestRunId: 'run', ladderLevel: 0, draftsShown: 0, tier: 'free_check', paidState: 'none', createdAt: Date.now(), updatedAt: Date.now(), ...(demo ? {demo: {kind: refundType === 'flight' ? 'flight' as const : 'district' as const, round: 0, phase: 'ready' as const, now: '2026-10-24', expiresAt: Date.now() + 86400000}} : {})});
    const inputId = await ctx.db.insert('inputs', {caseId, kind: 'initial', text: 'Made-up cancelled booking, refund not received.', storageIds: [storageId], runId: 'run', createdAt: Date.now()});
    return {caseId, storageId, inputId};
  });
  return {t, ...ids};
}
it('allows 100 reservations and refuses the 101st across the app, by default', async () => {
  const {t, caseId} = await fixture();
  for (let i = 0; i < 100; i++) expect(await t.mutation(internal.aiQuota.take, {caseId, runId: 'run'})).toBe(true);
  expect(await t.mutation(internal.aiQuota.take, {caseId, runId: 'run'})).toBe(false);
  expect((await t.run(ctx => ctx.db.query('rateCounters').withIndex('by_key', q => q.eq('key', 'gemini:app-hour')).unique()))?.count).toBe(100);
});
it('resets at the next clock hour, not an hour after the first call', async () => {
  vi.stubEnv('AI_CALLS_PER_HOUR', '1'); const {t, caseId} = await fixture();
  expect(await t.mutation(internal.aiQuota.take, {caseId})).toBe(true);
  expect(await t.mutation(internal.aiQuota.take, {caseId})).toBe(false);
  vi.setSystemTime(new Date('2026-10-24T11:00:00Z'));
  expect(await t.mutation(internal.aiQuota.take, {caseId})).toBe(true);
});
it('uses one counter for demo and real cases, independent of browser/device', async () => {
  vi.stubEnv('AI_CALLS_PER_HOUR', '2'); const {t, caseId} = await fixture();
  const demoId = await t.run(async ctx => {const item = await ctx.db.get(caseId); const {_id, _creationTime, ...fields} = item!; return ctx.db.insert('cases', {...fields, code: 'RG-DEMO01', demo: {kind: 'flight', round: 0, phase: 'ready', now: '2026-10-24', expiresAt: Date.now() + 100000}});});
  expect(await t.mutation(internal.aiQuota.take, {caseId})).toBe(true);
  expect(await t.mutation(internal.aiQuota.take, {caseId: demoId})).toBe(true);
  expect(await t.mutation(internal.aiQuota.take, {caseId})).toBe(false);
});
it.each(['flight', 'event'] as const)('a refused %s read never calls Gemini and preserves input/upload with manual retry', async kind => {
  vi.stubEnv('AI_CALLS_PER_HOUR', '0'); const {t, caseId, inputId, storageId} = await fixture(false, kind);
  await t.action(kind === 'flight' ? internal.flightAgent.triage : internal.agent.triage, {caseId, runId: 'run'});
  expect(generate).not.toHaveBeenCalled();
  expect(await t.run(ctx => ctx.db.get(inputId))).toMatchObject({text: 'Made-up cancelled booking, refund not received.', storageIds: [storageId]});
  expect(await t.run(async ctx => !!await ctx.storage.get(storageId))).toBe(true);
  expect(await t.run(ctx => ctx.db.get(caseId))).toMatchObject({stage: 'ERROR', progress: {step: 'busy'}});
  expect(await t.run(ctx => ctx.db.system.query('_scheduled_functions').collect())).toHaveLength(0);
});
it('a stale run cannot consume quota or overwrite a newer case', async () => {
  const {t, caseId} = await fixture();
  expect(await t.mutation(internal.aiQuota.take, {caseId, runId: 'old'})).toBe(false);
  expect(await t.run(ctx => ctx.db.query('rateCounters').withIndex('by_key', q => q.eq('key', 'gemini:app-hour')).unique())).toBeNull();
});
it('actual demo and real reader actions both consume the shared budget', async () => {
  vi.stubEnv('AI_CALLS_PER_HOUR', '2'); generate.mockRejectedValue(new Error('Synthetic provider failure'));
  const {t, caseId} = await fixture();
  const demoId = await t.run(async ctx => {const item = await ctx.db.get(caseId); const {_id, _creationTime, ...fields} = item!; return ctx.db.insert('cases', {...fields, code: 'RG-DEMO02', demo: {kind: 'flight', round: 0, phase: 'ready', now: '2026-10-24', expiresAt: Date.now() + 100000}});});
  await t.action(internal.flightAgent.triage, {caseId, runId: 'run'});
  await t.action(internal.flightAgent.triage, {caseId: demoId, runId: 'run'});
  expect(generate).toHaveBeenCalledTimes(2);
  expect(await t.mutation(internal.aiQuota.take, {caseId})).toBe(false);
});
it('a blocked demo greeting preserves retry without reserving a mail', async () => {
  vi.stubEnv('AI_CALLS_PER_HOUR', '0'); const {t, caseId} = await fixture(true);
  await t.run(async ctx => {const item = await ctx.db.get(caseId); await ctx.db.patch(caseId, {demo: {...item!.demo!, session: 'session', phase: 'waiting_organiser'}});});
  expect(await t.mutation(internal.aiQuota.take, {caseId, demoSession: 'session'})).toBe(false);
  expect(await t.run(ctx => ctx.db.get(caseId))).toMatchObject({stage: 'ERROR', progress: {step: 'busy'}, demo: {phase: 'timed_out'}});
  expect(await t.run(ctx => ctx.db.query('demoReplies').withIndex('by_case', q => q.eq('caseId', caseId)).collect())).toHaveLength(0);
});
it.each(['bad', '-1', '1.5'])('invalid setting %s uses the bounded default', async value => {
  vi.stubEnv('AI_CALLS_PER_HOUR', value); const {t, caseId} = await fixture();
  expect(await t.mutation(internal.aiQuota.take, {caseId})).toBe(true);
});
it('concurrent reservations cannot overshoot the hourly cap', async () => {
  vi.stubEnv('AI_CALLS_PER_HOUR', '2'); const {t, caseId} = await fixture();
  const results = await Promise.all(Array.from({length: 4}, () => t.mutation(internal.aiQuota.take, {caseId})));
  expect(results.filter(Boolean)).toHaveLength(2);
});
