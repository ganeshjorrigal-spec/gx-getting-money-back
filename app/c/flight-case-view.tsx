"use client";
import Link from "next/link";
import { useEffect,useState } from "react";
import { useQuery,useMutation,useAction } from "convex/react";
import { api } from "../../convex/_generated/api";
import { type FlightRead,type FlightPlan } from "../../lib/flight";
import { displayDate } from "../../lib/dates";
import { buildGmailCompose } from "../../lib/outbound";
import { caseInboxAddress } from "../../lib/google-tracking";
import { refundRuleUrl } from "../../lib/flight-kb";
import { redact } from "../../lib/redact";

export default function FlightCaseView({code,token}:{code:string;token:string}) {
 const args={code,token};const data=useQuery(api.cases.get,args);const drafts=useQuery(api.cases.drafts,args);const timeline=useQuery(api.cases.timeline,args);const tracking=useQuery(api.googleConnect.status,args);
 const confirm=useMutation(api.flights.confirm),answer=useMutation(api.flights.answer),sent=useMutation(api.cases.markSent),addReply=useMutation(api.cases.addReply),close=useMutation(api.cases.answerCheckin),seen=useMutation(api.cases.markReplySeen),retry=useMutation(api.cases.retry);
 const beginCalendar=useAction(api.googleActions.begin);
 const skipDemo=useMutation(api.demo.skipAhead),retryDemo=useMutation(api.demo.retry);
 const [pnr,setPnr]=useState(""),[bookingId,setBooking]=useState(""),[contact,setContact]=useState(""),[busy,setBusy]=useState(false),[error,setError]=useState(""),[reply,setReply]=useState(""),[correction,setCorrection]=useState(""),[correcting,setCorrecting]=useState(false),[answerValue,setAnswerValue]=useState(""),[recipient,setRecipient]=useState(""),[opened,setOpened]=useState(false);
 useEffect(()=>{if(data?.facts){setPnr(data.facts.pnr??"");setBooking(data.facts.bookingId??"");}},[data?.factsConfirmedAt]);
 if(!data)return <main className="case-shell"><p>Opening your case…</p></main>;
 const facts=data.facts as FlightRead|null,plan=data.flightPlan as FlightPlan|null,draft=drafts?.[0];
 const inbox=tracking?.inboxAddress?caseInboxAddress(tracking.inboxAddress,code):"";
 const cc=[...(draft?.cc??[]),inbox].filter(Boolean).join(",");
 const date=(d:string|null|undefined)=>d?displayDate(d):"Not given";
 const run=async(fn:()=>Promise<unknown>)=>{if(busy)return;setBusy(true);setError("");try{await fn();}catch(e){setError(e instanceof Error?e.message:"Please try again.");}finally{setBusy(false);}};
 const waiting=data.stage==="TRIAGING";
 return <main className="case-shell"><header className="site-header"><Link className="wordmark" href="/">Tickback<span className="wordmark-dot">.</span></Link><Link className="text-link" href="/start">Start another case</Link></header><div className="case-wrap">
 <p>{data.demo?"Demo · ":""}{code} · Domestic flight refund</p><h1>{facts?.flightName??"Your flight refund"}</h1>
 <p>{tracking?.firstSent&&tracking?.configured?"Reply tracking is on through the case inbox.":"Reply tracking is off until you mark your first email sent."}</p>
 {error&&<p role="alert" className="error-banner">{error}</p>}
 {waiting?<section className="case-card" role="status"><span className="spinner" aria-hidden="true"/><h2>Reading your message…</h2><ol><li>Reading your message</li><li>Finding who owes it</li><li>Working out your date</li><li>Writing your next step</li></ol></section>:<>
 {data.newReply&&<section className="case-card new-reply-card"><h2>New reply from {facts?.reply.fromCompany??data.platform}</h2><p>{date(new Date(data.newReply.receivedAt).toISOString().slice(0,10))}</p><p>{data.newReply.summary}</p><blockquote>{data.newReply.keySentence}</blockquote><p>{plan?.note||`Who owes you: ${plan?.owner}`}</p><button className="text-button" disabled={busy} onClick={()=>run(()=>seen({...args,inputId:data.newReply!._id}))}>Seen</button></section>}
 {data.demo&&<p>The companies are pretend. Everything Tickback does is real.</p>}
 {data.route==="NEED_INFO"?<section className="case-card"><h2>Need a bit more</h2>{data.questions.map((q:{id:string;text:string;options:string[]})=><div key={q.id}><label htmlFor={`answer-${q.id}`}>{q.text}</label><div className="situation-list">{q.options.map(value=><button className="situation-chip" key={value} disabled={busy} onClick={()=>run(()=>answer({...args,id:q.id,value}))}>{value==="direct"?"Airline website or app":value}</button>)}</div>{!q.options.length&&<><input id={`answer-${q.id}`} value={answerValue} onChange={e=>setAnswerValue(e.target.value)}/><button disabled={busy||!answerValue.trim()} onClick={()=>run(()=>answer({...args,id:q.id,value:answerValue}))}>Continue</button></>}</div>)}</section>:null}
 {facts&&!data.factsConfirmedAt&&data.route!=="NEED_INFO"&&<section className="case-card"><h2>What we understood</h2><p>{facts.airline} · {facts.bookedVia==="direct"?"Booked direct":facts.bookedVia} · {facts.paymentMethod.replace("_"," ")} · Cancelled {date(facts.cancellationDate)}</p>
 <label htmlFor="flight-pnr">{data.demo?"PNR (demo: any made-up PNR works)":"PNR"}</label><input id="flight-pnr" value={pnr} maxLength={30} onChange={e=>setPnr(e.target.value)}/>{data.demo&&<button className="text-button" onClick={()=>setPnr("DEMO123")}>Use a sample PNR</button>}
 {facts.bookedVia!=="direct"&&<><label htmlFor="flight-booking">Travel-site booking ID (if you have it)</label><input id="flight-booking" value={bookingId} onChange={e=>setBooking(e.target.value)}/></>}
 <label htmlFor="flight-contact">Phone or email (optional)</label><input id="flight-contact" value={contact} onChange={e=>setContact(e.target.value)}/><p>So Ganesh can follow up.</p>
 {correcting?<><label htmlFor="flight-correction">What should we change?</label><textarea id="flight-correction" value={correction} onChange={e=>setCorrection(e.target.value)}/><button disabled={busy||!correction.trim()} onClick={()=>run(()=>confirm({...args,pnr,correction}))}>Read the correction</button></>:<><button className="button button-primary" disabled={busy||!pnr.trim()} onClick={()=>run(()=>confirm({...args,pnr,bookingId,contact}))}>Looks right</button><button className="text-button" onClick={()=>setCorrecting(true)}>Not quite</button></>}</section>}
 {plan&&data.route!=="NEED_INFO"&&<section className="case-card" aria-label="Who owes you"><h2>Who owes you</h2><h3>{plan.owner}</h3><p>{facts?.bookedVia!=="direct"?"You booked on a travel site, so the airline is responsible for your refund.":"You booked direct, so the airline is responsible for your refund."}</p><h3>{data.route==="TRACE"?"Left them, not with you yet":data.route==="WAIT"?"On its way":data.route==="NO_ROUTE"?"The other side is right":plan.dueSource==="estimate"?"Time to check":"Overdue"}</h3><p>{plan.dueDate?`Due ${date(plan.dueDate)}`:"No automatic bank date. Pick your reminder date."}</p><p>{plan.dueSourceText}</p>{plan.ruleId&&<a className="text-link" href={refundRuleUrl} target="_blank" rel="noreferrer">Read the DGCA refund rule</a>}
 {plan.moneyWith!=="unknown"&&<p><strong>Who has your money now: {plan.moneyWith}</strong></p>}
 {plan.nextPerson&&<p>Next person: {plan.nextPerson.value} · {plan.nextPerson.company} {plan.nextPerson.url&&<a href={plan.nextPerson.url} target="_blank" rel="noreferrer">Source, read {date(plan.nextPerson.readAt)}</a>}</p>}
 {plan.above&&<p>Above them: {plan.above.value} · {plan.above.company}</p>}{plan.note&&<p>{plan.note}</p>}</section>}
 {data.factsConfirmedAt&&draft&&draft.status!=="sent"&&plan?.nextStep!=="none"&&data.route!=="NEED_INFO"&&<section className="case-card"><h2>Your next {draft.channel==="email"?"mail":"step"}</h2>
 {draft.channel==="email"&&<><p>To: {draft.to||"Paste the address from the company's own page"}</p>{!draft.to&&<input aria-label="Company address" type="email" value={recipient} onChange={e=>setRecipient(e.target.value)}/>}<p>CC: {cc}</p><p>{draft.subject}</p></>}
 <pre className="flight-message">{draft.body}</pre><ul>{draft.attachChecklist.map((line:string)=><li key={line}>{line}</li>)}</ul>
 {draft.channel==="email"&&<a className="button button-primary" aria-disabled={!draft.to&&!recipient} href={draft.to||recipient?buildGmailCompose(draft.to||recipient,draft.subject??"",draft.body??"",cc).url:undefined} target="_blank" rel="noreferrer" onClick={()=>setOpened(true)}>Open in Gmail</a>}
 <button className="text-button" onClick={()=>run(async()=>{await navigator.clipboard.writeText(draft.body??"");setOpened(true);})}>Copy message</button><p>Add this address in CC: {inbox}</p><button className="text-button" onClick={()=>run(()=>navigator.clipboard.writeText(inbox))}>Copy CC address</button>
 <p>You send it yourself. Tickback never sends your mail.</p><button className="button button-primary" disabled={busy||(draft.channel==="email"&&!opened)} onClick={()=>run(()=>sent({...args,draftId:draft._id}))}>{draft.channel==="phone"?"I've called":"Yes, I've sent it"}</button></section>}
 {data.demo?.kind === "flight" && data.demo.round === 3 && data.demo.phase === "ready" && data.dueDate && data.demo.now < data.dueDate && <button className="button button-primary" disabled={busy} onClick={()=>run(()=>skipDemo(args))}>Skip to the bank check date</button>}
 {data.demo?.phase === "timed_out" && <section className="case-card"><p>The demo check stopped after its time limit.</p><button disabled={busy} onClick={()=>run(()=>retryDemo(args))}>Check again</button></section>}
 {data.demo?.phase.startsWith("waiting")&&<section className="case-card" role="status"><span className="spinner"/><h2>Waiting for {data.demo.round===1?"Demo Air":"DemoTrips"}'s reply…</h2><ol><li>Checking the demo inbox</li><li>Reading the reply</li><li>Updating your next step</li></ol></section>}
 {tracking?.firstSent&&!data.stage.startsWith("CLOSED")&&<section className="case-card"><h2>Keep the reply alert live</h2><p>A live reply alert needs Google Calendar permission. A downloaded calendar file is only a one-time reminder.</p><button onClick={()=>run(async()=>{const url=await beginCalendar({...args,kind:"calendar"});window.location.assign(url.url);})}>Connect Google Calendar</button><p>If they replied only to you, paste it here.</p></section>}
 {!data.stage.startsWith("CLOSED")&&data.factsConfirmedAt&&<section className="case-card"><h2>They replied?</h2><label htmlFor="flight-reply">Paste their reply</label><textarea id="flight-reply" value={reply} onChange={e=>setReply(e.target.value)} maxLength={8000}/><button disabled={busy||!reply.trim()} onClick={()=>run(async()=>{await addReply({...args,text:redact(reply),storageIds:[]});setReply("");})}>Read their reply</button><button className="text-button" disabled={busy} onClick={()=>run(()=>close({...args,answer:"not_yet"}))}>Not yet, next step</button><button className="button button-primary" disabled={busy} onClick={()=>run(()=>close({...args,answer:"landed",amountPaise:data.amountPaise??0}))}>It's in, close this case</button></section>}
 {data.stage==="CLOSED_LANDED"&&<section className="case-card"><h2>Money landed{data.demo?" · demo":""}</h2><p>Rs {((data.recoveredPaise??0)/100).toLocaleString("en-IN")}{data.demo?" simulated; no real money moved.":" recovered."}</p><p>Tickback told me who owed it and wrote every mail.</p></section>}
 {data.stage==="ERROR"&&<button disabled={busy} onClick={()=>run(()=>retry(args))}>Try again</button>}
 <section><h2>Timeline</h2><ol>{timeline?.map(row=><li key={row._id}>{row.summary} · {date(new Date(row.createdAt).toISOString().slice(0,10))}</li>)}</ol></section>
 </>}
 </div></main>;
}
