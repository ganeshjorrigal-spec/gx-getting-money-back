from pathlib import Path
def edit(path,old,new):
 p=Path(path);s=p.read_text(encoding='utf-8');assert old in s,(path,old[:70]);p.write_text(s.replace(old,new),encoding='utf-8')
edit('convex/flightAgent.ts','import { todayIST }','import { groundFlightRead } from "../lib/flight-ground";\nimport { todayIST }')
edit('convex/flightAgent.ts','read=flightReadSchema.parse(result.object);','const newest=loaded.inputs.at(-1);\n read=groundFlightRead(flightReadSchema.parse(result.object),loaded.inputs.map(i=>i.kind==="reply"?latestReplyText(i.text??""):i.text??"").join("\\n"),loaded.item.facts,newest?.storageIds.length>0,newest?.sender,!!loaded.item.demo);')
edit('convex/flightAgent.ts','const plan=planFlight(read,today,','await ctx.runMutation(internal.agentWrites.progress,{caseId:args.caseId,runId:args.runId,step:"date"});\n const plan=planFlight(read,today,')
edit('convex/flightAgent.ts','await ctx.runMutation(internal.flights.apply,','await ctx.runMutation(internal.agentWrites.progress,{caseId:args.caseId,runId:args.runId,step:"writing"});\n await ctx.runMutation(internal.flights.apply,')
edit('convex/flights.ts','internalMutation, mutation, type MutationCtx','internalMutation, mutation, query, type MutationCtx')
edit('convex/flights.ts','type FlightPlan }','type FlightPlan, validFlightDate, flightWorkCount }')
edit('convex/flights.ts','if(["airline","bookedVia","cancellationDate","supportContactDate"].includes(args.id))Object.assign(read,{[args.id]:value});','''if(["cancellationDate","supportContactDate","departureDate"].includes(args.id)) {if(!validFlightDate(value))throw new Error("Use a valid date: YYYY-MM-DD");Object.assign(read,{[args.id]:value});}
 else if(["bookingTime","cancellationTime"].includes(args.id)){if(!/^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}$/.test(value)||!Number.isFinite(Date.parse(value+"+05:30")))throw new Error("Use YYYY-MM-DDTHH:mm");Object.assign(read,{[args.id]:value+"+05:30"});}
 else if(["airline","bookedVia"].includes(args.id)){if(value==="Other")throw new Error("Type the company name below");Object.assign(read,{[args.id]:value});}
 else if(args.id==="paymentMethod"){if(!["credit_card","debit_card","upi","netbanking","cash","unknown"].includes(value))throw new Error("Choose a payment method");read.paymentMethod=value as FlightRead["paymentMethod"];read.paymentConfirmed=true;}''')
edit('convex/flights.ts','else if(args.id==="taxes")','else if(["taxes","amountPaid"].includes(args.id))')
edit('convex/flights.ts','read.taxes=amount;','Object.assign(read,{[args.id]:amount});')
edit('convex/flights.ts','const reply=inputs.find(i=>i.kind==="reply"&&i.runId===args.runId);','const reply=inputs.find(i=>i.kind==="reply"&&i.runId===args.runId);')
edit('convex/flights.ts','if(plan.body && item.factsConfirmedAt){','''if(plan.body && item.factsConfirmedAt){
 if(plan.rung>=3&&plan.channel!=="bank"){
   const all=await ctx.db.query("inputs").withIndex("by_case",q=>q.eq("caseId",item._id)).collect();
   plan.body += "\\n\\nDated record (attach the original messages and screenshots):\\n"+all.map(i=>`${new Date(i.receivedAt??i.createdAt).toISOString().slice(0,10)} · ${i.kind}: ${redact(i.text??"Screenshot attached")}`).join("\\n\\n");
 }''')
# Give pasted flight replies a run id without altering event reply handling.
edit('convex/cases.ts','kind: "reply", text: text ? redact(text) : undefined, storageIds, createdAt: now','kind: "reply", text: text ? redact(text) : undefined, storageIds, createdAt: now, ...(item.refundType === "flight" ? {runId} : {})')
edit('convex/cases.ts','const now = Date.now();\n    const today = todayIST();\n    await clearCheckins', '''const now = Date.now();
    const today = item.demo?.now ?? todayIST();
    if (item.refundType === "flight" && draft.channel === "phone") {
      const runId=crypto.randomUUID();
      await ctx.db.patch(draftId,{status:"sent"});
      await ctx.db.patch(item._id,{facts:{...item.facts,supportContactDate:today},stage:"TRIAGING",latestRunId:runId});
      await ctx.db.insert("caseEvents",{caseId:item._id,type:"marked_sent",summary:"You called Cleartrip support",actor:"user",createdAt:now});
      await ctx.scheduler.runAfter(0,internal.flightAgent.triage,{caseId:item._id,runId,reuseFacts:true});return null;
    }
    await clearCheckins''')
edit('convex/cases.ts','if (draft.step === "L0_email"','if(item.refundType === "flight") await scheduleCheckin(ctx,item._id,addDays(today,draft.channel==="portal"?30:7),"flight_refund");\n    else if (draft.step === "L0_email"')
edit('convex/cases.ts','} else if (answer === "not_yet") {','''} else if (answer === "not_yet" && item.refundType === "flight") {
      const today=item.demo?.now??todayIST();const due=item.flightPlan?.checkDate??item.dueDate;
      if(!due||today<due)throw new Error("Your check-in date has not arrived yet");
      const runId=crypto.randomUUID();
      const sent=await ctx.db.query("drafts").withIndex("by_case",q=>q.eq("caseId",item._id)).collect();
      const bank=item.route==="TRACE";const rung=bank?item.ladderLevel:sent.some(d=>d.status==="sent")?Math.min(5,item.ladderLevel+1):2;
      const facts=bank?item.facts:{...item.facts,reply:{...item.facts.reply,claim:"none"}};
      await clearCheckins(ctx,item._id);
      await ctx.db.patch(item._id,{facts,ladderLevel:rung,stage:"TRIAGING",latestRunId:runId,updatedAt:now});
      await ctx.db.insert("caseEvents",{caseId:item._id,type:"checkin_answered",summary:bank?"Refund has not landed; bank trace ready":"Refund has not landed; next rung ready",actor:"user",createdAt:now});
      await ctx.scheduler.runAfter(0,internal.flightAgent.triage,{caseId:item._id,runId,reuseFacts:true});
    } else if (answer === "not_yet") {''')
edit('convex/demo.ts','demo:{...item.demo,now:item.dueDate},updatedAt:Date.now()','demo:{...item.demo,now:item.dueDate},stage:"DUE",updatedAt:Date.now()')
edit('convex/demoActions.ts','supplied cancelled event.','supplied cancelled booking (flight or event).')
edit('convex/demoActions.ts','prompt: `Event:','prompt: `Booking:')
