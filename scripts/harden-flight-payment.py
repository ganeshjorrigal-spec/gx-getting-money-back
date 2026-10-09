from pathlib import Path
def edit(path,old,new):
 p=Path(path);s=p.read_text(encoding='utf-8');assert old in s,(path,old[:70]);p.write_text(s.replace(old,new),encoding='utf-8')
edit('convex/schema.ts','deviceHash: v.optional(v.string()), handHelped:', 'firstFlightSentAt: v.optional(v.number()), deviceHash: v.optional(v.string()), handHelped:')
edit('convex/schema.ts','  annualPasses: defineTable', '  annualRecoveries: defineTable({sourceCode:v.string(),caseCode:v.string(),amountPaise:v.number(),landedAt:v.number()}).index("by_source",["sourceCode"]).index("by_case",["caseCode"]),\n  annualPasses: defineTable')
edit('convex/cases.ts','const latestTrackedReply =', 'const flightLocked=item.refundType==="flight"&&!item.demo&&!item.handHelped&&!!razorpayPaymentLink(process.env.NEXT_PUBLIC_RAZORPAY_PAYMENT_LINK)&&!annualActive(annual,Date.now())&&!!item.firstFlightSentAt;\n    const latestTrackedReply =')
edit('convex/cases.ts','flightPlan: item.flightPlan ?? null', 'flightPlan: item.flightPlan ? {...item.flightPlan,body:flightLocked?null:item.flightPlan.body} : null')
edit('convex/cases.ts','&&rows.some(r=>r.status==="sent")','&&!!item.firstFlightSentAt')
edit('convex/cases.ts','return rows.map((row, index) => ({ ...row, body: locked && index === 0 ? null : row.body }));','const firstDraft=item.refundType==="flight"?await ctx.db.query("drafts").withIndex("by_case",q=>q.eq("caseId",item._id)).order("asc").first():null;\n    return rows.map((row, index) => ({ ...row, body: (item.refundType==="flight"?flightLocked&&row._id!==firstDraft?._id:locked&&index===0) ? null : row.body }));')
edit('convex/cases.ts','facts:{...item.facts,supportContactDate:today},stage:', 'firstFlightSentAt:item.firstFlightSentAt??now,facts:{...item.facts,supportContactDate:today},stage:')
edit('convex/cases.ts','{ stage: "WAITING", updatedAt: now }','{ stage: "WAITING", ...(item.refundType==="flight"?{firstFlightSentAt:item.firstFlightSentAt??now}:{}), updatedAt: now }')
edit('convex/cases.ts','await ctx.db.insert("caseEvents", { caseId: item._id, type: "landed",','''if(item.refundType==="flight"&&!item.demo&&item.deviceHash){
        const pass=await ctx.db.query("annualPasses").withIndex("by_device",q=>q.eq("deviceHash",item.deviceHash!)).unique();
        const existing=await ctx.db.query("annualRecoveries").withIndex("by_case",q=>q.eq("caseCode",item.code)).first();
        if(pass&&pass.startedAt<=now&&pass.expiresAt>=now&&!existing)await ctx.db.insert("annualRecoveries",{sourceCode:pass.sourceCode,caseCode:item.code,amountPaise:amount,landedAt:now});
      }
      await ctx.db.insert("caseEvents", { caseId: item._id, type: "landed",''')
edit('app/privacy/page.tsx','for our accounts. Google may keep', 'for our accounts. For an annual plan we also keep the case code, amount and date of a reported recovery, without your messages or contact, to check the year’s guarantee. Google may keep')
edit('app/privacy/page.tsx','Demo cases use made-up refund details', 'Flight demos use DemoTrips and Demo Air, two labelled roles in the same demo account. Event demos keep their existing platform roles. Demo cases use made-up refund details')
edit('app/c/flight-case-view.tsx','const fare=','const [received,setReceived]=useState("");\n const fare=')
edit('app/c/flight-case-view.tsx','<button className="button button-primary" disabled={busy||!!data.demo', '<label>Amount received (rupees)<input type="number" min="0.01" step="0.01" value={received||String(plan?.amountOwed??(data.amountPaise??0)/100)} onChange={e=>setReceived(e.target.value)}/></label><button className="button button-primary" disabled={busy||!!data.demo')
edit('app/c/flight-case-view.tsx','Math.round((plan?.amountOwed??(data.amountPaise??0)/100)*100)', 'Math.round((received?Number(received):plan?.amountOwed??(data.amountPaise??0)/100)*100)')
