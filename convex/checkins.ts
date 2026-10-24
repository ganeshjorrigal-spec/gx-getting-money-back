import { internalMutation } from "./_generated/server";
import { internal } from "./_generated/api";
import { v } from "convex/values";
import {dueCheckTime} from '../lib/due-check';
import {todayIST} from '../lib/dates';
import {hasConfirmedCaseEmail} from '../lib/confirmed-case-email';

export const fire = internalMutation({
  args: { checkinId: v.id("checkins") },
  returns: v.null(),
  handler: async (ctx, { checkinId }) => {
    const checkin = await ctx.db.get(checkinId);
    if (!checkin || checkin.status !== "scheduled") return null;
    const item = await ctx.db.get(checkin.caseId);
    if (!item || item.stage.startsWith("CLOSED")) return null;
    if(item.refundType==='flight'&&!item.demo&&item.route==='WAIT'){
      const at=dueCheckTime(checkin.date);
      if(Date.now()<at){const scheduledId=await ctx.scheduler.runAt(at,internal.checkins.fire,{checkinId});await ctx.db.patch(checkinId,{scheduledId});return null;}
      const prior=await ctx.db.query('checkins').withIndex('by_case',q=>q.eq('caseId',item._id)).order('desc').take(100);
      await ctx.db.patch(checkinId,{status:'fired',firedAt:Date.now()});
      if(prior.some(c=>c.status==='fired'&&c.firedAt&&todayIST(new Date(c.firedAt))===todayIST()))return null;
      await ctx.db.patch(item._id,{stage:'DUE',updatedAt:Date.now()});
      await ctx.db.insert('caseEvents',{caseId:item._id,type:'checkin_due',summary:'Has your refund arrived? Your answer decides the next step.',actor:'system',createdAt:Date.now()});
      if(hasConfirmedCaseEmail(item))await ctx.scheduler.runAfter(0,internal.chaseActions.notify,{caseId:item._id,key:`due-check:${checkin.date}`,what:'Has your refund arrived?',reply:'',next:'Your case stays at its current step until you answer.',dueCheck:checkin.date});
      return null;
    }
    await ctx.db.patch(checkinId, { status: "fired" });
    if (["READY", "ACTED", "WAITING"].includes(item.stage)) await ctx.db.patch(item._id, { stage: "DUE", updatedAt: Date.now() });
    await ctx.db.insert("caseEvents", { caseId: item._id, type: "checkin_due", summary: "Time to check if the refund landed", actor: "system", createdAt: Date.now() });
    if(item.refundType==="flight"&&!item.demo&&item.flightPlan?.nextStep==="FLIGHT_status"){
      const runId=crypto.randomUUID();
      await ctx.db.patch(item._id,{stage:"TRIAGING",latestRunId:runId,updatedAt:Date.now()});
      await ctx.scheduler.runAfter(0,internal.flightAgent.triage,{caseId:item._id,runId,reuseFacts:true});
      return null;
    }
    if(item.chase?.active&&item.refundType==="flight")await ctx.scheduler.runAfter(0,internal.chase.advance,{caseId:item._id});
    return null;
  },
});
