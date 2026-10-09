from pathlib import Path
def edit(path, old, new):
    p=Path(path); s=p.read_text(encoding='utf-8'); assert old in s, (path,old[:60]); p.write_text(s.replace(old,new),encoding='utf-8')
edit('convex/schema.ts','demo: v.optional(v.object({ round:', 'demo: v.optional(v.object({ kind: v.optional(v.union(v.literal("flight"), v.literal("event"))), round:')
edit('convex/demo.ts','deviceId: v.string() },','deviceId: v.string(), kind: v.optional(v.union(v.literal("flight"), v.literal("event"))) },')
edit('convex/demo.ts','const platform = demoPlatformName(args.platform);','const flight = args.kind === "flight";\n    const platform = flight ? "DemoTrips" : demoPlatformName(args.platform);')
edit('convex/demo.ts','const text = `${addDays(today, -30)}.', 'const text = flight ? `Domestic flight Delhi to Mumbai, Demo Air, booked through DemoTrips, paid Rs 5,400 by UPI. Airline cancelled on ${addDays(today,-30)}. Full refund not received. Sample flight; no real booking. PNR not supplied yet.` : `${addDays(today, -30)}.')
edit('convex/demo.ts','{ code, tokenHash: args.tokenHash, stage:', '{ code, refundType: flight ? "flight" : "event", tokenHash: args.tokenHash, stage:')
edit('convex/demo.ts','amountPaise: 240000, eventName: "Sample Concert"','amountPaise: flight ? 540000 : 240000, eventName: flight ? "Sample domestic flight" : "Sample Concert"')
edit('convex/demo.ts','demo: { round: 0,','demo: { kind: args.kind ?? "event", round: 0,')
edit('convex/demo.ts','if (!item.demo || item.demo.round !== 1', '''if (item.demo?.kind === "flight") {
      if(item.demo.round !== 3 || item.demo.phase !== "ready" || !item.dueDate || item.stage.startsWith("CLOSED")) throw new Error("Skip to the bank check date after the third reply");
      await ctx.db.patch(item._id,{demo:{...item.demo,now:item.dueDate},updatedAt:Date.now()});
      await ctx.db.insert("caseEvents",{caseId:item._id,type:"demo_skip",summary:"Demo clock moved to the promised bank date",actor:"user",createdAt:Date.now()});
      return null;
    }
    if (!item.demo || item.demo.round !== 1''')
edit('convex/demo.ts','if (!item.demo || item.demo.round !== 2','if (!item.demo || item.demo.kind === "flight" || item.demo.round !== 2')
edit('convex/cases.ts','if (item.demo.round === 1 &&','if (item.demo.kind !== "flight" && item.demo.round === 1 &&')
edit('convex/cases.ts','if (item.demo.round === 2 &&','if (item.demo.kind !== "flight" && item.demo.round === 2 &&')
edit('convex/demoActions.ts','!emailAddresses(header(message, "to")).includes(demoAddress.toLowerCase())','![...emailAddresses(header(message, "to")), ...emailAddresses(header(message, "cc"))].some(address => sameDemoMailbox(address, demoAddress))')
edit('convex/demoActions.ts','{ round, platform: loaded.item.platform','{ round, kind: loaded.item.demo.kind, cancellationDate: loaded.item.facts?.cancellationDate, platform: loaded.item.platform')
edit('convex/demoActions.ts','const name = `Refund desk · demo (${loaded.item.platform} role)`;', 'const name = loaded.item.demo.kind === "flight" ? `${round === 2 ? "Nodal desk" : "Refund desk"} · demo (${round === 2 ? "airline" : "travel site"} role)` : `Refund desk · demo (${loaded.item.platform} role)`;')
edit('app/start/page.tsx','async function startDemo(platform: "bookmyshow" | "district")','async function startDemo(platform: "bookmyshow" | "district", kind: "flight"|"event" = "event")')
edit('app/start/page.tsx','createDemo({ platform, tokenHash:', 'createDemo({ platform, kind, tokenHash:')
edit('app/start/page.tsx','{!demoPicker ? <button', '{refundType === "flight" ? <button type="button" className="button button-secondary" disabled={working} onClick={()=>startDemo("district","flight")}>Try a flight demo</button> : !demoPicker ? <button')
edit('app/c/flight-case-view.tsx','const beginCalendar=useAction(api.googleActions.begin);','const beginCalendar=useAction(api.googleActions.begin);\n const skipDemo=useMutation(api.demo.skipAhead),retryDemo=useMutation(api.demo.retry);')
edit('app/c/flight-case-view.tsx','{data.demo?.phase.startsWith("waiting")', '''{data.demo?.kind === "flight" && data.demo.round === 3 && data.demo.phase === "ready" && data.dueDate && data.demo.now < data.dueDate && <button className="button button-primary" disabled={busy} onClick={()=>run(()=>skipDemo(args))}>Skip to the bank check date</button>}
 {data.demo?.phase === "timed_out" && <section className="case-card"><p>The demo check stopped after its time limit.</p><button disabled={busy} onClick={()=>run(()=>retryDemo(args))}>Check again</button></section>}
 {data.demo?.phase.startsWith("waiting")''')
