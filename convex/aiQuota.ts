import {internalMutation} from './_generated/server';
import {v} from 'convex/values';
import {takeRate} from './lib/rate';
import {aiBusyMessage,aiCaseDailyMessage} from '../lib/ai-busy';

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
    const dailySetting=process.env.AI_CALLS_PER_CASE_PER_DAY?.trim();
    const dailyLimit=dailySetting&&/^\d+$/.test(dailySetting)&&Number.isSafeInteger(Number(dailySetting))?Number(dailySetting):20;
    const dayStart=Math.floor((now+330*60000)/86400000)*86400000-330*60000;
    const hourStart=Math.floor(now/3600000)*3600000;
    const dailyKey=`gemini:case-day:${item._id}`,hourKey='gemini:app-hour';
    const daily=await ctx.db.query('rateCounters').withIndex('by_key',q=>q.eq('key',dailyKey)).unique();
    const hourly=await ctx.db.query('rateCounters').withIndex('by_key',q=>q.eq('key',hourKey)).unique();
    const dailyFull=dailyLimit<1||!!daily&&daily.windowStart===dayStart&&daily.count>=dailyLimit;
    const hourFull=limit<1||!!hourly&&hourly.windowStart===hourStart&&hourly.count>=limit;
    if(dailyFull||hourFull){
      await ctx.db.patch(item._id,{stage:'ERROR',progress:{step:dailyFull?'case_daily_limit':'busy',at:now},updatedAt:now,
        ...(args.demoSession&&item.demo?{demo:{...item.demo,phase:'timed_out' as const}}:{})});
      await ctx.db.insert('caseEvents',{caseId:item._id,type:'ai_busy',summary:dailyFull?aiCaseDailyMessage:aiBusyMessage,actor:'system',createdAt:now});return false;
    }
    // Both reservations share this transaction. A refusal consumes neither counter.
    await takeRate(ctx,dailyKey,dailyLimit,86400000,dayStart);
    await takeRate(ctx,hourKey,limit,3600000,hourStart);
    return true;
  },
});
