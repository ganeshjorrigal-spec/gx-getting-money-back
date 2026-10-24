import {internalMutation} from './_generated/server';
import {v} from 'convex/values';
import {takeRate, RateLimitError} from './lib/rate';
import {aiBusyMessage} from '../lib/ai-busy';

export const take = internalMutation({
  args: {caseId: v.id('cases'), runId: v.optional(v.string()), demoSession: v.optional(v.string())},
  returns: v.boolean(),
  handler: async (ctx, args) => {
    const item = await ctx.db.get(args.caseId);
    if (!item || item.stage.startsWith('CLOSED') || (args.runId && item.latestRunId !== args.runId)) return false;
    if (args.demoSession && (!item.demo || item.demo.session !== args.demoSession || item.demo.phase !== 'waiting_organiser')) return false;
    const setting = process.env.AI_CALLS_PER_HOUR?.trim();
    const limit = setting && /^\d+$/.test(setting) && Number.isSafeInteger(Number(setting)) ? Number(setting) : 100;
    const now = Date.now();
    try {
      // One persistent counter, aligned to the clock hour, for all AI paths/cases/devices.
      await takeRate(ctx, 'gemini:app-hour', limit, 3600000, Math.floor(now / 3600000) * 3600000);
      return true;
    } catch (error) {
      if (!(error instanceof RateLimitError)) throw error;
      await ctx.db.patch(item._id, {stage: 'ERROR', progress: {step: 'busy', at: now}, updatedAt: now,
        ...(args.demoSession && item.demo ? {demo: {...item.demo, phase: 'timed_out' as const}} : {})});
      await ctx.db.insert('caseEvents', {caseId: item._id, type: 'ai_busy', summary: aiBusyMessage, actor: 'system', createdAt: now});
      return false;
    }
  },
});
