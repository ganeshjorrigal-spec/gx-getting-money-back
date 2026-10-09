from pathlib import Path
def edit(path,old,new):
 p=Path(path);s=p.read_text(encoding='utf-8');assert old in s,(path,old[:70]);p.write_text(s.replace(old,new),encoding='utf-8')
edit('app/c/flight-case-view.tsx','import { buildGmailCompose }','import { buildGmailCompose,buildIcs }')
edit('app/c/flight-case-view.tsx','const counts=','const fare=useMutation(api.flights.fare);\n const [baseFare,setBaseFare]=useState(""),[fuel,setFuel]=useState(""),[charge,setCharge]=useState(""),[taxesReturned,setTaxesReturned]=useState(false);\n const counts=')
edit('app/c/flight-case-view.tsx','{(!q.options.length||q.options.includes("Other"))&&<>', '''{q.id==="taxes"?<><input aria-label="Taxes and airport fees, rupees" type="number" min="0" value={answerValue} onChange={e=>setAnswerValue(e.target.value)}/><label>Basic fare (optional)<input type="number" min="0" value={baseFare} onChange={e=>setBaseFare(e.target.value)}/></label><label>Fuel surcharge (optional)<input type="number" min="0" value={fuel} onChange={e=>setFuel(e.target.value)}/></label><label>Cancellation charge (optional)<input type="number" min="0" value={charge} onChange={e=>setCharge(e.target.value)}/></label><label><input type="checkbox" checked={taxesReturned} onChange={e=>setTaxesReturned(e.target.checked)}/> My taxes and airport fees already came back</label><p>Include UDF, ADF and PSF in taxes and fees. A disclosed agent fee is outside the cap. We only calculate an excess charge if basic fare, fuel and charge are all supplied.</p><button disabled={busy||!answerValue} onClick={()=>run(()=>fare({...args,taxes:Number(answerValue),baseFare:baseFare?Number(baseFare):undefined,fuel:fuel?Number(fuel):undefined,cancellationCharge:charge?Number(charge):undefined,taxesReturned}))}>Use this breakdown</button></>:(!q.options.length||q.options.includes("Other"))&&<>''')
edit('app/c/flight-case-view.tsx','onClick={()=>{setOpened(true);void openedDraft', 'onClick={()=>{if(buildGmailCompose(draft.to||recipient,draft.subject??"",draft.body??"",cc).copyFirst)void navigator.clipboard.writeText(draft.body??"").catch(()=>setError("Copy the message before opening Gmail, then paste it."));setOpened(true);void openedDraft')
edit('app/c/flight-case-view.tsx','{plan?.route==="TRACE"&&!plan.checkDate', '''{checkDate&&!data.stage.startsWith("CLOSED")&&<section className="case-card"><h2>Your check-in: {date(checkDate)}</h2><p>{plan?.route==="TRACE"?"The company’s bank date, unless you picked your own reminder.":"Tickback's expectation for the next follow-up; not an official deadline."}</p><button className="text-button" onClick={()=>{const content=buildIcs({code,date:checkDate,title:"Tickback refund check-in",description:`Return to your private case: ${location.href}`,domain:location.hostname,checkinId:checkDate});const url=URL.createObjectURL(new Blob([content],{type:"text/calendar;charset=utf-8"}));const link=document.createElement("a");link.href=url;link.download=`tickback-${code}.ics`;link.click();URL.revokeObjectURL(url);}}>Download one-time calendar reminder</button></section>}
 {plan?.route==="TRACE"&&!plan.checkDate''')
# Ensure a previously chosen reminder cannot be represented as their promise on rerun.
edit('convex/flightAgent.ts','const plan=planFlight(read,today,','const plan=planFlight(read,today,')
edit('convex/flightAgent.ts','await ctx.runMutation(internal.agentWrites.progress,{caseId:args.caseId,runId:args.runId,step:"writing"});','if(args.reuseFacts&&loaded.item.dueSource==="user_choice"&&plan.route==="TRACE"){plan.dueSource="user_choice";plan.dueSourceText="Your chosen reminder date; not the company’s promise.";}\n await ctx.runMutation(internal.agentWrites.progress,{caseId:args.caseId,runId:args.runId,step:"writing"});')
p=Path('app/globals.css');p.write_text(p.read_text()+'''
/* Flight screens extend the existing card and control system. */
.flight-case .case-card label { display: block; margin-block: var(--space-3); font-size: var(--text-small); font-weight: 600; }
.flight-case .case-card input:not([type="checkbox"]), .flight-case .case-card textarea { width: 100%; min-height: var(--control-height); border: var(--border-width) solid var(--line); border-radius: var(--radius-control); padding: var(--space-3); background: var(--surface); color: var(--ink); font: inherit; }
.flight-case .case-card textarea { min-height: 120px; }
.flight-message { white-space: pre-wrap; overflow-wrap: anywhere; font: inherit; line-height: var(--leading-body); padding: var(--space-4); background: var(--surface-alt, var(--surface)); border: var(--border-width) solid var(--line); border-radius: var(--radius-control); }
.flight-case .case-card button { margin-block: var(--space-2); min-height: var(--control-height); }
.flight-case .case-card { overflow-wrap: anywhere; }
.flight-case .case-card h3 { margin-top: var(--space-5); }
''',encoding='utf-8')
p=Path('STATE.md');p.write_text('''# Current state (owned by Codex)

Last updated: 10 October 2026. M2.6 is ACTIVE under the overnight flight prompt. Do not mark READY until morning live proofs. M2.5 READY FOR REVIEW: Ganesh accepts 3:10.731 as meeting the target, committed and pushed.

## Overnight flight build
- Steps 1–4 committed and pushed separately: sourced playbook data, flight intake/card, reply decisions, flight demo using the real reader and existing bounded inbox path.
- Step 5 in progress: fare rules, escalation/check-ins, closing count from case events. Backend additive; static frontend not deployed yet.
- Paid model remains gemini-3.5-flash-lite. No Gmail sent, account login, OAuth changes or user-data deletion during this night.
- Next: finish step 5, then annual payment and flight landing, 8+ paid flight fixtures plus F1–F16, deploy and live page proof.
- Morning-only: real Gmail test send, three full timed flight demos, Razorpay Payment Link value, gated medical/AirSewa/source checks.

## Existing product
- Convex static site: https://harmless-lyrebird-924.ap-southeast-2.convex.site/
- Event flow and event demo retained. Frozen Vercel deployment/config retained; backend changes remain additive.
- M2.4 and M2.5 READY, not DONE. Earlier proof remains in the 7 and 9 October logs.
- Physical phone checks, real payment reconciliation, public support contact and budget alert remain open. M3/M4/T1 not advanced tonight.
''',encoding='utf-8')
