import {requireConfirmedCaseEmail,hasConfirmedCaseEmail} from '../lib/confirmed-case-email';
import {demoRecipientsAllowed,confirmedDemoCc} from '../lib/demo-email';
import { isPassengerEscalation, escalationSendLine } from "../lib/chase-escalation";
import {
  query,
  mutation,
  internalMutation,
  internalQuery,
} from "./_generated/server";
import { v } from "convex/values";
import { internal } from "./_generated/api";
import { assertAccess } from "./lib/access";
import { recordDraftSent } from "./cases";
import {
  chaseRecipientsAllowed,confirmedChaseCc,realChaseRecipients,chaseDailyCap,
  chaseCompanyAddress,
  canChaseSend,
  companyDayUsed,
} from "../lib/chase";
import { caseTrial } from "./lib/trial";
import { takeRate } from "./lib/rate";
import { todayIST, addDays,addWorkingDays } from "../lib/dates";
const access = { code: v.string(), token: v.string() };
export const demoProofAccess=internalQuery({args:{caseId:v.id('cases')},returns:v.any(),handler:async(ctx,{caseId})=>{const item=await ctx.db.get(caseId);if(!item?.demo||!item.chase)return null;const connection=await ctx.db.query('googleConnections').withIndex('by_kind',q=>q.eq('kind','inbox')).first();return {item:{chase:{email:item.chase.email}},connection};}});
export const inspectByCode = internalQuery({
  args: { code: v.string() },
  returns: v.any(),
  handler: async (ctx, args) => {
    const item = await ctx.db
      .query("cases")
      .withIndex("by_code", (q) => q.eq("code", args.code))
      .unique();
    if (!item?.demo || !item.chase) return null;
    const attempts = await ctx.db
      .query("chaseOutbox")
      .withIndex("by_case", (q) => q.eq("caseId", item._id))
      .take(10);
    return { caseId: item._id, active: item.chase.active, attempts };
  },
});
export const sendConnection = internalQuery({
  args: {},
  returns: v.any(),
  handler: async (ctx) => {
    const connection = await ctx.db
      .query("googleConnections")
      .withIndex("by_kind", (q) => q.eq("kind", "inbox"))
      .first();
    return connection?.chaseSendGranted ? connection : null;
  },
});
export const reserveProbe = internalMutation({
  args: {},
  returns: v.null(),
  handler: async (ctx) => {
    await takeRate(ctx, "chase-send-permission-probe", 1, 86400000);
    return null;
  },
});
export const loadAccess = internalQuery({
  args: access,
  returns: v.any(),
  handler: async (ctx, args) => {
    const item = await assertAccess(ctx, args.code, args.token);
    requireConfirmedCaseEmail(item);
    if (
      item.refundType !== "flight" ||
      !item.factsConfirmedAt ||
      !item.facts?.pnr ||
      item.stage.startsWith("CLOSED")
    )
      throw new Error("Confirm your flight facts and PNR first");
    return item;
  },
});
export const authorise = internalMutation({
  args: {
    ...access,
    name: v.string(),
    mobile: v.string(),
    email: v.string(),
    letterId: v.id("_storage"),
    encryptedCaseToken: v.string(),
    authorisedAt: v.number(),
  },
  returns: v.null(),
  handler: async (ctx, args) => {
    const item = await assertAccess(ctx, args.code, args.token);
    requireConfirmedCaseEmail(item,args.email);
    if (
      item.refundType !== "flight" ||
      !item.factsConfirmedAt ||
      !item.facts?.pnr ||
      item.stage.startsWith("CLOSED")
    )
      throw new Error("Confirm your flight facts and PNR first");
    if(item.demo?.emailRequired&&(!item.demo.emailConfirmedAt||args.email!==item.email))throw new Error('Confirm your demo email first');
    if(item.demo?.chaseStory && (item.chase || item.demo.chasePhase!=='authority')) throw new Error('The sample permission is already saved');
    await ctx.db.patch(item._id, {
      chase: {
        active: true,
        name: args.name,
        mobile: args.mobile,
        email: args.email,
        letterId: args.letterId,
        priorLetterIds: [
          ...(item.chase?.priorLetterIds ?? []),
          ...(item.chase ? [item.chase.letterId] : []),
        ],
        encryptedCaseToken: args.encryptedCaseToken,
        authorisedAt: args.authorisedAt,
      },
    });
    await ctx.db.insert("caseEvents", {
      caseId: item._id,
      type: "chase_authorised",
      summary: "You gave written permission for Genie to mail and follow up",
      actor: "user",
      createdAt: Date.now(),
    });
    await ctx.scheduler.runAfter(0, internal.chaseActions.send, {
      caseId: item._id,
    });
    return null;
  },
});
export const stop = mutation({
  args: access,
  returns: v.null(),
  handler: async (ctx, args) => {
    const item = await assertAccess(ctx, args.code, args.token);
    if (item.chase?.active) {
      await ctx.db.patch(item._id, {
        chase: { ...item.chase, active: false, stoppedAt: Date.now() },
      });
      await ctx.db.insert("caseEvents", {
        caseId: item._id,
        type: "chase_stopped",
        summary: "You stopped Genie; no more queued mail will be sent",
        actor: "user",
        createdAt: Date.now(),
      });
    }
    return null;
  },
});
export const load = internalQuery({
  args: { caseId: v.id("cases") },
  returns: v.any(),
  handler: async (ctx, { caseId }) => {
    const item = await ctx.db.get(caseId);
    if (
      !item?.chase?.active ||
      item.refundType !== "flight" ||
      item.stage.startsWith("CLOSED")
    )
      return null;
    const draft = (await ctx.db
      .query("drafts")
      .withIndex("by_case", (q) => q.eq("caseId", caseId))
      .order("desc").take(30)).find(d=>d.step!=='FLIGHT_call_update')??null;
    const connection = await ctx.db
      .query("googleConnections")
      .withIndex("by_kind", (q) => q.eq("kind", "inbox"))
      .first();
    const attempts = await ctx.db
      .query("chaseOutbox")
      .withIndex("by_case", (q) => q.eq("caseId", caseId))
      .order("desc")
      .take(100);
    const parent = attempts.find((a) => a.state === "sent");
    const parentDraft = parent ? await ctx.db.get(parent.draftId) : null;
    const inputs = await ctx.db
      .query("inputs")
      .withIndex("by_case", (q) => q.eq("caseId", caseId))
      .order("desc")
      .take(30);
    return {
      item,
      draft,
      connection,
      attempts,
      parentSubject: parentDraft?.subject ?? null,
      senders: inputs
        .filter((i) => i.kind === "reply" && i.sender)
        .map((i) => i.sender),
      reply: inputs.find((i) => i.kind === "reply"),
      locked: (await caseTrial(ctx, item)).locked,
    };
  },
});
export const reserve = internalMutation({
  args: { caseId: v.id("cases"), draftId: v.id("drafts") },
  returns: v.any(),
  handler: async (ctx, args) => {
    const item = await ctx.db.get(args.caseId),
      draft = await ctx.db.get(args.draftId);
    if(!item||!hasConfirmedCaseEmail(item)||item.chase?.email!==item.email)return null;
    if (
      !item?.chase ||
      !draft ||
      draft.caseId !== args.caseId ||
      item.refundType !== "flight" ||
      draft.channel !== "email" ||
      draft.step === "FLIGHT_status" ||
      draft.step === "FLIGHT_call_update" ||
      isPassengerEscalation(item, draft) ||
      (item.demo &&
        (item.demo.expiresAt <= Date.now() ||
          item.demo.round >= 3 ||
          item.demo.phase.startsWith("waiting"))) ||
      !["READY", "DUE"].includes(item.stage) ||
      (item.route === "NEED_INFO" && draft.step !== "FLIGHT_call_confirmation") ||
      item.route === "WAIT" ||
      (await caseTrial(ctx, item)).locked
    )
      return null;
    if(item.demo?.chaseStory && !['first_mail','confirm_mail'].includes(item.demo.chasePhase??'')) return null;
    const latest = (await ctx.db
      .query("drafts")
      .withIndex("by_case", (q) => q.eq("caseId", item._id))
      .order("desc").take(30)).find(d=>d.step!=='FLIGHT_call_update')??null;
    if (latest?._id !== args.draftId) return null;
    const connection = await ctx.db
      .query("googleConnections")
      .withIndex("by_kind", (q) => q.eq("kind", "inbox"))
      .first();
    const realPublic=!item.demo&&process.env.CHASE_REAL_COMPANIES_ENABLED==='true';
    if(!item.demo&&!realPublic)return null;
    const inputs=await ctx.db.query('inputs').withIndex('by_case',q=>q.eq('caseId',item._id)).order('desc').take(30);
    const senders=inputs.flatMap(i=>i.kind==='reply'&&i.sender?[i.sender]:[]);
    const allowed=realPublic?realChaseRecipients(item,[draft.to??''],draft.cc??[],senders):demoRecipientsAllowed(item,[draft.to??''],[...(draft.cc??[]),item.chase.email],process.env.CHASE_ALLOWLIST,process.env.TICKBACK_DEMO_ADDRESS);
    if(!allowed)return null;
    if (
      await ctx.db
        .query("chaseOutbox")
        .withIndex("by_case_state", (q) =>
          q.eq("caseId", item._id).eq("state", "uncertain"),
        )
        .first()
    )
      return null;
    const previous = await ctx.db
      .query("chaseOutbox")
      .withIndex("by_draft", (q) => q.eq("draftId", args.draftId))
      .first();
    const day = item.demo?.now ?? todayIST(),
      company = draft.company ?? item.flightPlan?.nextPerson?.company ?? item.owner ?? "unknown";
    const companies = [
      ...new Set(
        [
          company,
          ...(draft.cc?.length
            ? [
                item.facts?.airline,
                item.facts?.bookedVia !== "direct"
                  ? item.facts?.bookedVia
                  : null,
              ]
            : []),
        ].filter((c): c is string => !!c),
      ),
    ];
    const prior = await ctx.db
      .query("chaseOutbox")
      .withIndex("by_case_day", (q) => q.eq("caseId", item._id).eq("day", day))
      .take(20);
    const usedToday = companyDayUsed(companies, prior) ? 1 : 0;
    if (
      !canChaseSend({
        active: item.chase.active,
        closed: item.stage.startsWith("CLOSED"),
        allowed,
        sendGranted: !!connection?.chaseSendGranted,
        usedToday,
        draftSent: draft.status === "sent",
        uncertain: !!previous,
      })
    ) {
      if (
        item.chase.active &&
        allowed &&
        connection?.chaseSendGranted &&
        usedToday &&
        !previous
      )
        await ctx.scheduler.runAt(
          Date.parse(addDays(todayIST(), 1) + "T04:30:00Z"),
          internal.chaseActions.send,
          { caseId: item._id },
        );
      return null;
    }
    const capDay=todayIST();
    if(realPublic){
      const cap=await ctx.db.query('chaseDaily').withIndex('by_day',q=>q.eq('day',capDay)).unique();
      if((cap?.count??0)>=chaseDailyCap(process.env.CHASE_DAILY_CAP)){
        const tomorrow=addDays(capDay,1);
        if(item.mailDeferredUntil!==tomorrow){await ctx.db.patch(item._id,{mailDeferredUntil:tomorrow});await ctx.scheduler.runAt(Date.parse(tomorrow+'T04:30:00Z'),internal.chaseActions.send,{caseId:item._id});}
        return null;
      }
      if(cap)await ctx.db.patch(cap._id,{count:cap.count+1});else await ctx.db.insert('chaseDaily',{day:capDay,count:1});
      if(item.mailDeferredUntil)await ctx.db.patch(item._id,{mailDeferredUntil:undefined});
    }
    const id = await ctx.db.insert("chaseOutbox", {
      dailyCapDay:realPublic?capDay:undefined,
      caseId: item._id,
      draftId: draft._id,
      company,
      companies,
      day,
      state: "reserved",
      messageId: `<${crypto.randomUUID()}@refundgenie.local>`,
      createdAt: Date.now(),
    });
    return await ctx.db.get(id);
  },
});
export const stillActive = internalQuery({
  args: {
    caseId: v.id("cases"),
    authorisedAt: v.number(),
    draftId: v.optional(v.id("drafts")),
  },
  returns: v.boolean(),
  handler: async (ctx, args) => {
    const item = await ctx.db.get(args.caseId);
    if(!item||!hasConfirmedCaseEmail(item)||item.chase?.email!==item.email)return false;
    if (
      !item?.chase?.active ||
      item.chase.authorisedAt !== args.authorisedAt ||
      (item.demo?.emailRequired&&!confirmedDemoCc(item)) ||
      item.stage.startsWith("CLOSED") ||
      (item.demo && item.demo.expiresAt <= Date.now())
    )
      return false;
    if (args.draftId) {
      const latest = (await ctx.db
        .query("drafts")
        .withIndex("by_case", (q) => q.eq("caseId", args.caseId))
        .order("desc").take(30)).find(d=>d.step!=='FLIGHT_call_update')??null;
      return (
        ["READY", "DUE"].includes(item.stage) &&
        latest?._id === args.draftId &&
        latest.status !== "sent" && latest.step !== "FLIGHT_status" && !isPassengerEscalation(item, latest)
      );
    }
    return true;
  },
});
export const delivered = internalMutation({
  args: {
    id: v.id("chaseOutbox"),
    threadId: v.string(),
    messageId: v.string(),
    gmailId: v.string(),
  },
  returns: v.null(),
  handler: async (ctx, args) => {
    const attempt = await ctx.db.get(args.id);
    if (!attempt || attempt.state !== "reserved") return null;
    const item = await ctx.db.get(attempt.caseId);
    if (!item) return null;
    await ctx.db.patch(attempt._id, {
      state: "sent",
      threadId: args.threadId,
      messageId: args.messageId,
      gmailId: args.gmailId,
    });
    if (item.chase?.active && !item.stage.startsWith("CLOSED"))
      await recordDraftSent(ctx, item, attempt.draftId, attempt.company);
    else {
      await ctx.db.patch(attempt.draftId, { status: "sent" });
      await ctx.db.insert("caseEvents", {
        caseId: item._id,
        type: "genie_mail_sent",
        summary: `Genie mailed ${attempt.company} before the stop completed`,
        actor: "agent",
        createdAt: Date.now(),
      });
    }
    return null;
  },
});
export const uncertain = internalMutation({
  args: { id: v.id("chaseOutbox"), releaseDaily:v.optional(v.boolean()) },
  returns: v.null(),
  handler: async (ctx, { id,releaseDaily }) => {
    const row = await ctx.db.get(id);
    if (row&&row.state==='reserved') {
      if(releaseDaily!==false&&row.dailyCapDay&&!row.dailyCapReleased){const cap=await ctx.db.query('chaseDaily').withIndex('by_day',q=>q.eq('day',row.dailyCapDay!)).unique();if(cap)await ctx.db.patch(cap._id,{count:Math.max(0,cap.count-1)});await ctx.db.patch(id,{dailyCapReleased:true});}
      await ctx.db.patch(id, { state: "uncertain" });
      await ctx.db.insert("caseEvents", {
        caseId: row.caseId,
        type: "chase_attention",
        summary: "Sending needs a check by Ganesh; no automatic retry",
        actor: "system",
        createdAt: Date.now(),
      });
    }
    return null;
  },
});
export const advance = internalMutation({
  args: { caseId: v.id("cases") },
  returns: v.null(),
  handler: async (ctx, { caseId }) => {
    const item = await ctx.db.get(caseId);
    if (
      !item?.chase?.active ||
      item.refundType !== "flight" ||
      item.stage.startsWith("CLOSED") ||
      item.route === "TRACE"
    )
      return null;
    const runId = crypto.randomUUID();
    await ctx.db.patch(item._id, {
      ladderLevel: Math.min(5, item.ladderLevel + 1),
      stage: "TRIAGING",
      latestRunId: runId,
    });
    await ctx.scheduler.runAfter(0, internal.flightAgent.triage, {
      caseId,
      runId,
      reuseFacts: true,
    });
    return null;
  },
});
export const demoMessage = internalQuery({
  args: { caseId: v.id("cases"), messageId: v.string() },
  returns: v.boolean(),
  handler: async (ctx, args) => {
    const item = await ctx.db.get(args.caseId);
    if (!item?.chase?.active || item.demo?.kind !== "flight") return false;
    const rows = await ctx.db
      .query("chaseOutbox")
      .withIndex("by_case", (q) => q.eq("caseId", args.caseId))
      .take(20);
    return rows.some(
      (r) => r.messageId === args.messageId && r.state === "sent",
    );
  },
});
export const skipDemo = mutation({
  args: access,
  returns: v.null(),
  handler: async (ctx, args) => {
    const item = await assertAccess(ctx, args.code, args.token);
    if (
      !item.chase?.active ||
      item.demo?.kind !== "flight" ||
      item.demo.round < 1 ||
      item.demo.round > 2 ||
      item.demo.phase !== "ready" ||
      item.demo.expiresAt <= Date.now() ||
      item.stage !== "READY"
    )
      throw new Error("Wait for the demo reply first");
    await ctx.db.patch(item._id, {
      demo: { ...item.demo, now: addDays(item.demo.now, 5) },
      updatedAt: Date.now(),
    });
    await ctx.db.insert("caseEvents", {
      caseId: item._id,
      type: "demo_skip",
      summary: "Demo clock moved ahead 5 days for the next mail",
      actor: "user",
      createdAt: Date.now(),
    });
    await ctx.scheduler.runAfter(0, internal.chaseActions.send, {
      caseId: item._id,
    });
    return null;
  },
});
export const resume = internalMutation({
  args: { cursor: v.optional(v.string()) },
  returns: v.null(),
  handler: async (ctx, args) => {
    const page = await ctx.db
      .query("cases")
      .withIndex("by_chase", (q) => q.eq("chase.active", true))
      .paginate({ cursor: args.cursor ?? null, numItems: 50 });
    for (const item of page.page)
      await ctx.scheduler.runAfter(0, internal.chaseActions.send, {
        caseId: item._id,
      });
    if (!page.isDone)
      await ctx.scheduler.runAfter(0, internal.chase.resume, {
        cursor: page.continueCursor,
      });
    return null;
  },
});
export const reserveNotice = internalMutation({
  args: { caseId: v.id("cases"), key: v.string() },
  returns: v.union(v.id("chaseNotices"), v.null()),
  handler: async (ctx, args) => {
    const item = await ctx.db.get(args.caseId);
    if (!item||item.demo||!hasConfirmedCaseEmail(item)||item.chase&&!item.chase.active||item.stage.startsWith('CLOSED')) return null;
    if (
      await ctx.db
        .query("chaseNotices")
        .withIndex("by_key", (q) =>
          q.eq("caseId", args.caseId).eq("key", args.key),
        )
        .first()
    )
      return null;
    return ctx.db.insert("chaseNotices", {
      ...args,
      state: "reserved",
      createdAt: Date.now(),
    });
  },
});
export const finishNotice = internalMutation({
  args: {
    id: v.id("chaseNotices"),
    state: v.union(v.literal("sent"), v.literal("uncertain")),
  },
  returns: v.null(),
  handler: async (ctx, args) => {
    if (await ctx.db.get(args.id))
      await ctx.db.patch(args.id, { state: args.state });
    return null;
  },
});
export const status = query({
  args: access,
  returns: v.string(),
  handler: async (ctx, args) => {
    const item = await assertAccess(ctx, args.code, args.token);
    if (!item.chase?.active) return "Genie is stopped.";
    if(!item.demo&&process.env.CHASE_REAL_COMPANIES_ENABLED==='true'&&item.mailDeferredUntil&&item.mailDeferredUntil>todayIST())return "Genie will send this tomorrow";
    const connection = await ctx.db
      .query("googleConnections")
      .withIndex("by_kind", (q) => q.eq("kind", "inbox"))
      .first();
    if (!connection?.chaseSendGranted)
      return "Waiting for Ganesh to allow sending from the case inbox.";
    if (
      await ctx.db
        .query("chaseOutbox")
        .withIndex("by_case_state", (q) =>
          q.eq("caseId", item._id).eq("state", "uncertain"),
        )
        .first()
    )
      return "Sending needs a check by Ganesh. Genie will not retry it.";
    if (item.stage === "TRIAGING") return "Genie is reading their reply.";
    if (item.route === "TRACE")
      return `Check your bank${item.flightPlan?.checkDate ? ` by ${item.flightPlan.checkDate}` : ""}; the mail chase has reached the bank step.`;
    if (item.route === "NEED_INFO")
      return "Answer the question on your case before Genie sends the next mail.";
    const draft = (await ctx.db
      .query("drafts")
      .withIndex("by_case", (q) => q.eq("caseId", item._id))
      .order("desc").take(30)).find(d=>d.step!=='FLIGHT_call_update')??null;
    if (isPassengerEscalation(item, draft)) return escalationSendLine;
    if (draft && draft.channel !== "email")
      return "Follow the next step on your case; Genie cannot send a portal form or make a call in this release.";
    if(!item.demo&&process.env.CHASE_REAL_COMPANIES_ENABLED==='true'){
      const inputs=await ctx.db.query('inputs').withIndex('by_case',q=>q.eq('caseId',item._id)).order('desc').take(30);
      if(!draft||!realChaseRecipients(item,[draft.to??''],draft.cc??[],inputs.flatMap(i=>i.kind==='reply'&&i.sender?[i.sender]:[])))return 'Waiting for checked company contacts and your confirmed email.';
    }else{
      if(!draft||!chaseRecipientsAllowed([draft.to??'',...(draft.cc??[]),item.chase.email],process.env.CHASE_ALLOWLIST))return "Waiting: every recipient must be on Ganesh's test allow-list.";
      if(!item.demo)return 'Real-company sending is off until Ganesh says go.';
    }
    return "Genie is watching the next ready mail and its date.";
  },
});

export const recordMessageId = internalMutation({
  args: { id: v.id("chaseOutbox"), messageId: v.string(), gmailId: v.string() },
  returns: v.null(),
  handler: async (ctx, args) => {
    const row = await ctx.db.get(args.id);
    if (row?.state === "sent")
      await ctx.db.patch(args.id, {
        messageId: args.messageId,
        gmailId: args.gmailId,
      });
    return null;
  },
});

export const dispatchAllowed=internalQuery({args:{caseId:v.id('cases'),draftId:v.id('drafts'),userCc:v.string(),to:v.string(),cc:v.array(v.string())},returns:v.boolean(),handler:async(ctx,args)=>{
 const item=await ctx.db.get(args.caseId),draft=await ctx.db.get(args.draftId);if(!item?.chase?.active||!draft||draft.caseId!==item._id||draft.to!==args.to||JSON.stringify(draft.cc??[])!==JSON.stringify(args.cc)||item.stage.startsWith('CLOSED'))return false;
 if(item.demo)return args.userCc===item.chase.email&&demoRecipientsAllowed(item,[args.to],[...args.cc,args.userCc],process.env.CHASE_ALLOWLIST,process.env.TICKBACK_DEMO_ADDRESS);
 if(process.env.CHASE_REAL_COMPANIES_ENABLED!=='true'||confirmedChaseCc(item)!==args.userCc)return false;
 const inputs=await ctx.db.query('inputs').withIndex('by_case',q=>q.eq('caseId',item._id)).order('desc').take(30);
 return realChaseRecipients(item,[args.to],args.cc,inputs.flatMap(i=>i.kind==='reply'&&i.sender?[i.sender]:[]));
}});

export const updateContext=internalQuery({args:{caseId:v.id('cases')},returns:v.any(),handler:async(ctx,{caseId})=>{
 const item=await ctx.db.get(caseId);if(!item||item.demo||!hasConfirmedCaseEmail(item)||item.stage.startsWith('CLOSED')||item.chase&&!item.chase.active)return null;
 const encryptedCaseToken=item.confirmedEncryptedCaseToken??item.chase?.encryptedCaseToken;if(!encryptedCaseToken)return null;
 const connection=await ctx.db.query('googleConnections').withIndex('by_kind',q=>q.eq('kind','inbox')).first();
 if(!connection?.chaseSendGranted||!process.env.TICKBACK_INBOX_ADDRESS||connection.email!==process.env.TICKBACK_INBOX_ADDRESS.toLowerCase())return null;
 return {item,connection,recipient:item.email!,encryptedCaseToken};
}});
export const quietUpdates=internalMutation({args:{cursor:v.optional(v.string())},returns:v.null(),handler:async(ctx,{cursor})=>{
 const page=await ctx.db.query('cases').withIndex('by_email_confirmed',q=>q.gt('emailConfirmedAt',0)).paginate({numItems:50,cursor:cursor??null});
 for(const item of page.page){
  if(item.demo||!hasConfirmedCaseEmail(item)||item.stage.startsWith('CLOSED')||item.chase&&!item.chase.active)continue;
  const last=await ctx.db.query('chaseNotices').withIndex('by_case',q=>q.eq('caseId',item._id)).order('desc').first();
  const anchor=last?.createdAt??Math.max(item.createdAt,item.emailConfirmedAt??0,item.chase?.authorisedAt??0);
  if(addWorkingDays(todayIST(new Date(anchor)),5)>todayIST())continue;
  await ctx.scheduler.runAfter(0,internal.chaseActions.notify,{caseId:item._id,key:`quiet:${last?._id??anchor}`,what:'Genie is still watching your case. No new reply has been confirmed.',reply:'',next:item.nextStep??'Review your case for the next step.'});
 }
 if(!page.isDone)await ctx.scheduler.runAfter(0,internal.chase.quietUpdates,{cursor:page.continueCursor});return null;
}});
