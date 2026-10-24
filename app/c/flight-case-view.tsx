"use client";
import {UnverifiedReplies} from "./unverified-replies";
import {BookingVerification} from "./booking-verification";
import {AiBusyNotice} from './ai-busy-notice';
import {verificationReady,bookingSummaryRows} from "../../lib/booking-verification";
import {SampleFieldLabel} from '../components/sample-field-label';
import {ChaseHistory} from './chase-history';
import {savedEmail,validEmail} from "../../lib/case-email";
import {Mascot,BrandMark} from "../components/brand";
import {AnswerStep,SharedSummary,SavedTick,useSavedAnswer,type SummaryItem} from '../components/answer-progress';
import {WhyAsk} from "../components/why-ask";
import { isPassengerEscalation, escalationSendLine } from "../../lib/chase-escalation";
import {isSelfSendFlightDemo,demoCcRoles} from '../../lib/video-demo';
import {airIndiaPortalFields} from '../../lib/flight-portal';
import {callingCopy,portalCopy} from '../copy';

import {ReceiptSlip,SourceLine,StatusBadge,NextMoveCard} from "../components/receipts";

import { PublicChaseDemo } from "./public-chase-demo";

import { CallHistory } from "./call-history";

import { ChaseAuthority } from "./chase-authority";

import { firstStep } from "../../lib/first-step";

import { questionValue, clearQuestion, questionInput, answerAmount } from "../../lib/flight-answers";

import { userError } from "../../lib/user-error";

import { CcList, AttachmentPicker } from "./mail-tools";

import { finishMail } from "../../lib/mail-copy";

import { privateCaseUrl } from "../../lib/app-url";

import {caseLinkRecipient} from "../../lib/case-link-mail";
import { EmailCaseLink } from "./email-case-link";

import { TrialCard } from "./trial-card";

import { PolicyFooter } from "../policy-footer";

import Link from "next/link";

import { useEffect,useState } from "react";

import { useQuery,useMutation,useAction } from "convex/react";

import { api } from "../../convex/_generated/api";

import { type FlightRead,type FlightPlan } from "../../lib/flight";

import { flightStatus,flightDateSource } from "../../lib/flight-status";

import { compressScreenshot } from "../../lib/images";

import { getDeviceId,forgetCase } from "../../lib/case-link";

import { todayIST,displayDate } from "../../lib/dates";

import { buildGmailCompose,buildIcs } from "../../lib/outbound";

import { caseInboxAddress } from "../../lib/google-tracking";

import { refundRuleUrl } from "../../lib/flight-kb";

import { redact } from "../../lib/redact";

export default function FlightCaseView({code,token}:{code:string;token:string}) {

 const {saved,count,markSaved}=useSavedAnswer();
 const args={code,token};const chaseView=useQuery(api.calls.chaseView,args);const data=useQuery(api.cases.get,args);const drafts=useQuery(api.cases.drafts,args);const timeline=useQuery(api.cases.timeline,args);const tracking=useQuery(api.googleConnect.status,args);

 const fillSamples=useMutation(api.chaseDemo.fillSamples),useNewEmail=useMutation(api.chaseDemo.changeEmail);
 const [name,setName]=useState(''),[flightName,setFlightName]=useState('');
 const demoIntake=!!data?.demo?.intakeRequired&&!data?.factsConfirmedAt;
 const editSaved=useMutation(api.flights.editFact);
 const [editing,setEditing]=useState<{field:string;label:string;value:string}|null>(null);
 useEffect(()=>{if(editing)document.getElementById('review-edit')?.focus();},[editing?.field]);
 const confirm=useMutation(api.flights.confirm),answer=useMutation(api.flights.answer),sent=useMutation(api.cases.markSent),addReply=useMutation(api.cases.addReply),close=useMutation(api.cases.answerCheckin),seen=useMutation(api.cases.markReplySeen),retry=useMutation(api.cases.retry);

 const [received,setReceived]=useState("");
 const [portalCopied,setPortalCopied]=useState(false);
 useEffect(()=>setPortalCopied(false),[data?.flightPlan?.body]);

 const [cardChoice,setCardChoice]=useState(false);

 const [attachments,setAttachments]=useState<string[]>([]);

 useEffect(()=>setAttachments([]),[drafts?.[0]?._id]);

 const fare=useMutation(api.flights.fare);

 const [baseFare,setBaseFare]=useState(""),[fuel,setFuel]=useState(""),[charge,setCharge]=useState(""),[taxesReturned,setTaxesReturned]=useState(false);

 const counts=useQuery(api.flights.workCount,args),replyHistory=useQuery(api.flights.replies,args);

 const openedDraft=useMutation(api.flights.opened),reminder=useMutation(api.flights.reminder),uploadUrl=useMutation(api.files.generateUploadUrl),feedback=useMutation(api.feedback.send),remove=useMutation(api.cases.remove);

 const [picture,setPicture]=useState<File|null>(null),[reminderDate,setReminderDate]=useState(""),[feedbackText,setFeedbackText]=useState(""),[feedbackDone,setFeedbackDone]=useState(false);

 const beginCalendar=useAction(api.googleActions.begin),disconnectGoogle=useAction(api.googleActions.disconnect);

 const skipDemo=useMutation(api.demo.skipAhead),retryDemo=useMutation(api.demo.retry);

 const [pnr,setPnr]=useState(""),[bookingId,setBooking]=useState(""),[contact,setContact]=useState(""),[email,setEmail]=useState(""),[busy,setBusy]=useState(false),[error,setError]=useState(""),[reply,setReply]=useState(""),[correction,setCorrection]=useState(""),[correcting,setCorrecting]=useState(false),[answerValues,setAnswerValues]=useState<Record<string,string>>({}),[recipient,setRecipient]=useState(""),[opened,setOpened]=useState(false);

 useEffect(()=>{if(data?.facts){setName(data.name??"");setFlightName(data.facts.flightName??"");setPnr(data.facts.pnr??"");setBooking(data.facts.bookingId??"");setContact(data.contact?.includes("@")?"":data.contact??"");setEmail(savedEmail(data));}},[data?.factsConfirmedAt,data?.facts?.pnr,data?.facts?.bookingId,data?.facts?.flightName]);

 if(data&&['busy','case_daily_limit'].includes(data?.progress?.step??''))return <main className="case-shell"><AiBusyNotice daily={data.progress?.step==='case_daily_limit'} onRetry={()=>data.demo?.phase==='timed_out'?retryDemo(args):retry(args)}/></main>;
 if(data?.demo?.chaseStory&&(!demoIntake||!data.demo.emailConfirmedAt))return <PublicChaseDemo code={code} token={token} data={data}/>;

 if(!data)return <main className="case-shell"><Mascot head/><p>Opening your case…</p></main>;

 const facts=data.facts as FlightRead|null,plan=data.flightPlan as FlightPlan|null,draft=drafts?.[0];

 const dateSource=plan?flightDateSource(plan,facts?.reply.fromCompany??'the company',facts?.bookedVia??'',replyHistory?.[0]?.date):null;
 const status=plan?flightStatus(plan,data.demo?.now??todayIST()):null;

 const inbox=tracking?.inboxAddress?caseInboxAddress(tracking.inboxAddress,code):"";

 const selfSendDemo=isSelfSendFlightDemo(data.demo);
 const passengerEscalation=isPassengerEscalation(data,draft);
 const ccList=[...(draft?.cc??[]),inbox].filter(Boolean);

 const cc=ccList.join(",");

 const mailBody=draft?.channel==="email"&&draft.body?finishMail(draft.body,code,attachments,data.name):draft?.body??"";

 const date=(d:string|null|undefined)=>d?displayDate(d):"Not given";

 const run=async(fn:()=>Promise<unknown>)=>{if(busy)return;setBusy(true);setError("");try{await fn();}catch(e){setError(userError(e));}finally{setBusy(false);}};

 const submitAnswer=async(id:string,value:string)=>{await answer({...args,id,value});markSaved(data.questions?.find((q:any)=>q.id===id)?.text??id);setAnswerValues(current=>clearQuestion(current,id));};

 const checkDate=plan?.checkDate??data.checkin?.date??(data.route==="WAIT"?data.dueDate:null);

 const checkDue=!!checkDate&&(data.demo?.now??todayIST())>=checkDate;

 const answering=data.route==='NEED_INFO'||((!data.factsConfirmedAt||(!data.demo&&!savedEmail(data)))&&!data.stage.startsWith('CLOSED'));
 const editFact=(field:string,label:string)=>setEditing({field,label,value:String(field==='name'?data.name??'':field==='contact'?contact:['airIndiaRefundRequested','shareBookingContact'].includes(field)?((facts as any)?.[field]?'Yes':'No'):(facts as any)?.[field]??'')});
 const summaryItems:SummaryItem[]=facts?[
 ...bookingSummaryRows(facts,editFact),
 {label:'Airline',value:facts.airline,edit:demoIntake?undefined:()=>editFact('airline','airline')},
 {label:'Booked on',value:facts.bookedVia,edit:demoIntake?undefined:()=>editFact('bookedVia','booking site')},
 {label:'Payment method',value:facts.paymentMethod==='unknown'?'Not yet shared':facts.paymentMethod.replaceAll('_',' '),edit:()=>editFact('paymentMethod','payment method')},
 {label:'Cancellation date',value:date(facts.cancellationDate),edit:()=>editFact('cancellationDate','cancellation date')},
 {label:'Amount',value:facts.amountPaid===null?'Not given':`Rs ${facts.amountPaid}`,edit:()=>editFact('amountPaid','amount')},
 {label:'Name',value:data.name??'Not given',edit:()=>editFact('name','name')},
 {label:'PNR',value:pnr||facts.pnr||'Not given',href:'#flight-pnr'},
 ...(facts.bookedVia!=='direct'?[{label:'Booking ID',value:bookingId||facts.bookingId||'Not given',href:'#flight-booking'}]:[]),
 ...(!selfSendDemo?[{label:'Contact',value:contact||'Not given',href:'#flight-contact'}]:[]),
 ...(facts.eTicketNumber?[{label:'E-ticket number',value:facts.eTicketNumber,edit:()=>editFact('eTicketNumber','e-ticket number')}]:[]),
 ...(facts.airIndiaRefundRequested!==undefined?[{label:'Refund requested',value:facts.airIndiaRefundRequested?'Yes':'No',edit:()=>editFact('airIndiaRefundRequested','refund requested')}]:[])]:[];
 const waiting=busy||data.stage==="TRIAGING";

 return <main className="case-shell flight-case"><header className="site-header"><Link className="wordmark" href="/"><BrandMark/></Link><Link className="text-link" href="/start">Start another case</Link></header><div className="case-wrap"><UnverifiedReplies code={code} token={token}/>

 <p className="case-code">{data.demo?"Demo · ":""}{code} · Domestic flight refund</p><h1>{facts?.flightName??"Your flight refund"}</h1>{!selfSendDemo&&!passengerEscalation&&data.chase&&<p role="status">{chaseView?.next}</p>}

 <EmailCaseLink code={code} token={token || ""} confirmedEmail={caseLinkRecipient(data)} link={privateCaseUrl(data.publicAppUrl || location.origin, code, token)}/>

 <p>{tracking?.firstSent&&tracking?.configured?"Reply tracking is on through the case inbox.":"Once you send the mail, tap 'I sent it' and we'll watch for their reply."}</p>

 {error&&<p role="alert" className="error-banner">{error}</p>}

 <SavedTick field={saved}/>
 {editing&&<section className='case-card'><label htmlFor='review-edit'>Edit {editing.label}</label>{editing.field==='paymentMethod'?<select id='review-edit' value={editing.value} onChange={e=>setEditing({...editing,value:e.target.value})}>{['credit_card','debit_card','upi','netbanking','wallet','cash','unknown'].map(v=><option key={v} value={v}>{v.replaceAll('_',' ')}</option>)}</select>:['airIndiaRefundRequested','shareBookingContact'].includes(editing.field)?<select id='review-edit' value={editing.value} onChange={e=>setEditing({...editing,value:e.target.value})}><option>Yes</option><option>No</option></select>:<input id='review-edit' type={['cancellationDate','departureDate'].includes(editing.field)?'date':editing.field==='bookingEmail'?'email':editing.field==='bookingMobile'?'tel':'text'} value={editing.value} onChange={e=>setEditing({...editing,value:e.target.value})}/>}<button className='button button-primary' disabled={busy} onClick={()=>run(async()=>{await editSaved({...args,field:editing.field as any,value:editing.value});markSaved(editing.label);setEditing(null);})}>Save this detail</button><button className='text-button' onClick={()=>setEditing(null)}>Cancel edit</button></section>}
 {demoIntake&&<section className='case-card'><p>Airline: Demo Air · Booked on: DemoTrips</p><p>Demo roles, so no real company is involved.</p><button className='text-button' disabled={busy} onClick={()=>run(()=>fillSamples(args))}>Fill all samples</button></section>}
 {answering&&data.route==='NEED_INFO'&&<SharedSummary screen='flight-questions' items={summaryItems.map(({edit,href,...item})=>item)}/>}
 {waiting?<section className="case-card progress-card" role="status"><Mascot head/><span className="spinner" aria-hidden="true"/><h2>Reading your message…</h2><ol>{["Read message","Confirm facts","Choose next action"].map((label,i)=><li key={label} className={i<({reading:0,route:1,date:1,writing:2,done:3} as Record<string,number>)[data.progress?.step??"reading"]?"progress-done":""}>{i<({reading:0,route:1,date:1,writing:2,done:3} as Record<string,number>)[data.progress?.step??"reading"]?"✓ ":""}{label}</li>)}</ol></section>:<>

 {data.newReply&&<section className="case-card new-reply-card"><h2>New reply from {facts?.reply.fromCompany??data.platform}</h2><time dateTime={new Date(data.newReply.receivedAt).toISOString()}>{date(todayIST(new Date(data.newReply.receivedAt)))}</time><SourceLine>Received in your tracked company thread</SourceLine><p>{data.newReply.summary}</p><blockquote>{data.newReply.keySentence}</blockquote><p>{plan?.note||`Who owes you: ${plan?.owner}`}</p><button className="text-button" disabled={busy} onClick={()=>run(()=>seen({...args,inputId:data.newReply!._id}))}>Seen</button></section>}

 {data.demo&&<p>The companies are pretend. Everything Refund Genie does is real.</p>}

 {facts&&plan&&(!data.demo||demoIntake)&&answering&&data.route!=="NEED_INFO"&&<section className="case-card"><h2>Your free check</h2><p>Who owes you: {plan.owner}</p><p>Who has the money: {plan.moneyWith&&plan.moneyWith!=="unknown"?plan.moneyWith:"Not confirmed yet"}</p><p>Due: {plan.dueDate?displayDate(plan.dueDate):"No promised date"}</p><SourceLine>{plan.dueSourceText}</SourceLine><p>First step: {firstStep(facts,plan,data.cancellationProofAdded).action}</p></section>}
 {facts&&plan&&!answering&&<section className="case-card"><h2>Your first step</h2><p>{firstStep(facts,plan,data.cancellationProofAdded).action}</p><h3>Have you got these?</h3><ul>{firstStep(facts,plan,data.cancellationProofAdded).checklist.map(item=><li key={item.id}><strong>{item.present?"✓ ":"Needed: "}{item.label}</strong><p>{item.help}</p></li>)}</ul><h3>Which rule applies</h3><p>{firstStep(facts,plan,data.cancellationProofAdded).rule}</p><SourceLine href={plan.dueSource!=="estimate"?refundRuleUrl:null}>{plan.dueSource==="estimate"?"Refund Genie’s expectation, not a published deadline":`Rule ${plan.ruleId}, Refund Genie’s reading`}</SourceLine>{firstStep(facts,plan,data.cancellationProofAdded).contactSource&&<a href={firstStep(facts,plan,data.cancellationProofAdded).contactSource!} target="_blank" rel="noreferrer">Company's own contact page</a>}</section>}

 {facts?.paymentMethod==="unknown"&&(!data.demo||demoIntake)&&!data.stage.startsWith("CLOSED")&&<section className="case-card"><AnswerStep step={count+2}/><h2>How did you pay?</h2><WhyAsk field="paymentMethod"/><div className="situation-list"><button className="situation-chip" disabled={busy} onClick={()=>setCardChoice(true)}>Card</button>{[ ["UPI","upi"],["Net banking","netbanking"],["Wallet","wallet"]].map(([label,value])=><button className="situation-chip" key={value} disabled={busy} onClick={()=>run(()=>submitAnswer("paymentMethod",value))}>{label}</button>)}</div>{cardChoice&&<div className="situation-list">{[["Credit card","credit_card"],["Debit card","debit_card"]].map(([label,value])=><button className="situation-chip" key={value} disabled={busy} onClick={()=>run(()=>submitAnswer("paymentMethod",value))}>{label}</button>)}</div>}</section>}

 {data.route==="NEED_INFO"?<section className="case-card"><h2>Need a bit more</h2>{data.questions.filter((q:{id:string})=>q.id!=="paymentMethod").map((q:{id:string;text:string;options:string[]},index:number)=><div key={q.id}><AnswerStep step={count+index+2}/><SampleFieldLabel htmlFor={`answer-${q.id}`} label={q.text} disabled={busy} onFill={demoIntake&&['cancellationDate','amountPaid'].includes(q.id)?()=>run(()=>fillSamples({...args,field:q.id as 'cancellationDate'|'amountPaid'})):undefined}/><WhyAsk question={q.id} personal={q.id==='eTicketNumber'}/>{demoIntake&&index===0&&<p>Use made-up details. This is a demo.</p>}<div className="situation-list">{q.options.map(value=><button className="situation-chip" key={value} disabled={busy} onClick={()=>{if(value==="Other"){document.getElementById(`answer-${q.id}`)?.focus();return;}if(value==="Not quite"||value==="Not clear"){setCorrecting(true);return;}void run(()=>submitAnswer(q.id,value));}}>{value==="passenger"?(q.id==="cancelledBy"?"I did":"Me, original payment method"):value==="direct"?"Airline website or app":value==="unknown"?"Not sure":value.replaceAll("_"," ")}</button>)}</div>{q.id==="taxes"?<><input aria-label="Taxes and airport fees, rupees" inputMode="numeric" value={answerValues[q.id]??""} onChange={e=>setAnswerValues(current=>questionValue(current,q.id,e.target.value))}/><label>Basic fare (optional)<input type="number" min="0" value={baseFare} onChange={e=>setBaseFare(e.target.value)}/><WhyAsk field="fare"/></label><label>Fuel surcharge (optional)<input type="number" min="0" value={fuel} onChange={e=>setFuel(e.target.value)}/><WhyAsk field="fare"/></label><label>Cancellation charge (optional)<input type="number" min="0" value={charge} onChange={e=>setCharge(e.target.value)}/><WhyAsk field="fare"/></label><label><input type="checkbox" checked={taxesReturned} onChange={e=>setTaxesReturned(e.target.checked)}/><WhyAsk field="taxes"/> My taxes and airport fees already came back</label><p>Include UDF, ADF and PSF in taxes and fees. A disclosed agent fee is outside the cap. We only calculate an excess charge if basic fare, fuel and charge are all supplied.</p><button disabled={busy||!answerValues[q.id]} onClick={()=>run(async()=>{await fare({...args,taxes:answerAmount(answerValues[q.id]),baseFare:baseFare?Number(baseFare):undefined,fuel:fuel?Number(fuel):undefined,cancellationCharge:charge?Number(charge):undefined,taxesReturned});markSaved("Fare breakdown");setAnswerValues(current=>clearQuestion(current,q.id));})}>Use this breakdown</button></>:(!q.options.length||q.options.includes("Other"))&&<><input id={`answer-${q.id}`} type={questionInput(q.id)} inputMode={["amountPaid","eTicketNumber"].includes(q.id)?"numeric":undefined} maxLength={q.id==='eTicketNumber'?13:undefined} pattern={q.id==='eTicketNumber'?'[0-9]{13}':undefined} value={answerValues[q.id]??""} onChange={e=>setAnswerValues(current=>questionValue(current,q.id,e.target.value))}/><button className="button button-primary" disabled={busy||!(answerValues[q.id]??"").trim()} onClick={()=>run(async()=>{await submitAnswer(q.id,answerValues[q.id]);})}>Continue</button></>}</div>)}{correcting&&<><label htmlFor="reply-correction">What did Refund Genie read wrong?</label><textarea id="reply-correction" value={correction} onChange={e=>setCorrection(e.target.value)}/><WhyAsk field="correction" personal/><button disabled={busy||!correction.trim()} onClick={()=>run(async()=>{await confirm({...args,pnr,correction});markSaved("Correction");setCorrecting(false);setCorrection("");})}>Read my correction</button></>}</section>:null}

 {facts&&!data.factsConfirmedAt&&!data.stage.startsWith("CLOSED")&&data.route!=="NEED_INFO"&&!verificationReady(facts)&&<BookingVerification {...args} facts={facts} demo={demoIntake}/>}
 {facts&&(!data.factsConfirmedAt||(!data.demo&&!savedEmail(data)))&&!data.stage.startsWith("CLOSED")&&data.route!=="NEED_INFO"&&verificationReady(facts)&&<section className="case-card"><AnswerStep step={count+2}/><h2>What we understood</h2><SharedSummary screen="flight-confirm" confirm items={summaryItems}/><SourceLine>From your cancellation message; confirm or correct below</SourceLine>

 <SampleFieldLabel htmlFor="flight-pnr" label={data.demo?"PNR (demo: any made-up PNR works)":"PNR"} onFill={demoIntake?()=>setPnr('SAMPLE'):undefined}/><input id="flight-pnr" value={pnr} maxLength={30} onChange={e=>setPnr(e.target.value)}/><WhyAsk field="pnr" personal/>{data.demo&&!demoIntake&&<button className='text-button' onClick={()=>setPnr('SAMPLE')}>Use a sample PNR</button>}

 {facts.bookedVia!=="direct"&&<><SampleFieldLabel htmlFor="flight-booking" label="Travel-site booking ID (if you have it)" onFill={demoIntake?()=>setBooking('DEMO-2400'):undefined}/><input id="flight-booking" value={bookingId} onChange={e=>setBooking(e.target.value)}/><WhyAsk field='bookingId' personal/></>}

 {demoIntake&&<><label htmlFor='demo-name'>Your name</label><input id='demo-name' autoComplete='name' value={name} onChange={e=>setName(e.target.value)}/><SampleFieldLabel htmlFor='demo-flight' label='Flight' onFill={()=>setFlightName('Delhi to Mumbai')}/><input id='demo-flight' value={flightName} onChange={e=>setFlightName(e.target.value)}/><p>Use made-up details. This is a demo.</p></>}
 {!selfSendDemo&&<><label htmlFor="flight-email">Email (required)</label><input id="flight-email" type="email" required readOnly={demoIntake} value={email} onChange={e=>setEmail(e.target.value)}/><p>So you see every mail about your case in your own inbox.</p>{demoIntake&&<button className='text-button' onClick={()=>run(()=>useNewEmail(args))}>Change email with a new confirmation</button>}<label htmlFor="flight-contact">Phone (optional)</label><input id="flight-contact" value={contact} onChange={e=>setContact(e.target.value)}/><WhyAsk field="contact" personal/></>}

 {correcting?<><label htmlFor="flight-correction">What should we change?</label><textarea id="flight-correction" value={correction} onChange={e=>setCorrection(e.target.value)}/><WhyAsk field="correction" personal/><button disabled={busy||!correction.trim()} onClick={()=>run(async()=>{await confirm({...args,pnr,correction});markSaved("Correction");})}>Read the correction</button></>:<><button className="button button-primary" disabled={busy||!pnr.trim()||(!data.demo&&!validEmail(email))||(demoIntake&&(!name.trim()||!flightName.trim()||facts.paymentMethod==='unknown'))} onClick={()=>run(async()=>{await confirm({...args,pnr,bookingId,contact,email,...(demoIntake?{name,flightName}:{})});markSaved("Booking details");})}>Looks right</button>{!demoIntake&&<button className="text-button" onClick={()=>setCorrecting(true)}>Not quite</button>}</>}</section>}

 {plan&&!answering&&data.route!=="NEED_INFO"&&<ReceiptSlip

  status={status?.pastDue&&data.stage!=='CLOSED_LANDED'?undefined:<StatusBadge kind={data.stage==='CLOSED_LANDED'?'landed':status?.pastDue?'overdue':data.route==='WAIT'?'waiting':'ready'} label={data.stage==='CLOSED_LANDED'?"It's in":status?.pastDue?'Overdue':status?.label??'Follow-up ready'}/>}

  stamp={status?.pastDue&&!data.stage.startsWith('CLOSED')?`OVERDUE · ${status.delay} ${status.delayUnit.toUpperCase()}`:undefined}

  rows={[

   {label:'WHO HAS IT',source:'From your booking; airline responsibility under the DGCA refund rule',value:<><strong>{plan.owner}</strong>{plan.moneyWith!=='unknown'&&plan.moneyWith!==plan.owner&&<span className='receipt-detail'>Money now with {plan.moneyWith}</span>}</>},

   {label:'WRITE TO NEXT',value:plan.nextPerson?.value??(plan.channel==='bank'?'Your bank':plan.channel==='phone'?'Company support':plan.channel==='portal'?'Complaint portal':plan.nextStep==='FLIGHT_status'?"Use the company's own support page":'No mail needed yet'),source:plan.nextPerson?.url?<a href={plan.nextPerson.url} target='_blank' rel='noreferrer'>Company's own page, checked {date(plan.nextPerson.readAt)}</a>:undefined},

   {label:'DUE BY',value:plan.dueDate?<time dateTime={plan.dueDate}>{date(plan.dueDate)}</time>:'Pick your reminder date',source:dateSource?.text},

   ...(plan.above?[{label:'ABOVE THEM',value:plan.above.value,source:plan.above.url?<a href={plan.above.url} target='_blank' rel='noreferrer'>Company's own page, checked {date(plan.above.readAt)}</a>:undefined}]:[]),

   {label:'AMOUNT',value:data.amountPaise!=null?`Rs ${(data.amountPaise/100).toLocaleString('en-IN')}`:'Not given',source:'From your booking details'},

  ]}>

  {!status?.pastDue&&<p className='receipt-status'>{status?.label}</p>}

  <p>{facts?.bookedVia!=='direct'?'You booked on a travel site, so the airline is responsible for your refund.':'You booked direct, so the airline is responsible for your refund.'}</p><SourceLine href={refundRuleUrl}>DGCA refund rule, responsibility for refund</SourceLine>

  {facts?.cancelledBy==='passenger'&&plan.amountOwed!==null&&<p>Refund sought: Rs {plan.amountOwed.toLocaleString('en-IN')}</p>}

  <SourceLine href={dateSource?.href}>{plan.dueSourceText}</SourceLine>

  {plan.note&&<><p>{plan.note}</p><SourceLine>From your saved case facts and the rule above</SourceLine></>}

 </ReceiptSlip>}

 {!selfSendDemo&&!passengerEscalation&&data.factsConfirmedAt&&facts?.pnr&&!data.stage.startsWith("CLOSED")&&!(draft?.channel==="email"&&draft.status!=="sent"&&draft.body!==null&&plan?.nextStep!=="none"&&data.route!=="NEED_INFO")&&plan?.nextStep!=="FLIGHT_status"&&<ChaseAuthority emailConfirmed={data.emailConfirmed} callCompany={facts.airline??undefined} code={code} token={token} company={[facts.airline,facts.bookedVia!=="direct"?facts.bookedVia:null].filter(Boolean).join(" and ")} pnr={facts.pnr} chase={data.chase} saved={{name:data.name,contact:data.email||data.contact}} demo={!!data.demo} canSkip={!!data.demo&&data.demo.round>=1&&data.demo.round<=2&&data.demo.phase==="ready"&&data.stage==="READY"}/>}

 {plan?.portal&&facts&&<NextMoveCard title={plan.portal.kind==='support'?portalCopy.statusTitle:portalCopy.refundTitle}>
 {plan.portal.kind==='support'?<><p>{plan.portal.path}</p><p>{portalCopy.userSends}</p><pre className="flight-message">{plan.body}</pre><button className="button button-primary" disabled={busy||!plan.body} onClick={()=>run(async()=>{await navigator.clipboard.writeText(plan.body??'');setPortalCopied(true);})}>{portalCopied?portalCopy.copied:portalCopy.copy}</button><a className="button button-secondary" href={plan.portal.url} target="_blank" rel="noreferrer">{portalCopy.open(plan.portal.company??'Company support')}</a></>:<>
 <p>{plan.portal.subcategory?`Choose “${plan.portal.subcategory}”.`:'Answer the saved case questions to choose the form category.'}</p>
 <p>You fill and submit this on Air India. Genie does not submit forms.</p>
 <dl>{airIndiaPortalFields(facts,{name:data.name??undefined,email:data.contact?.includes('@')?data.contact:undefined,phone:data.contact&&!data.contact.includes('@')?data.contact:undefined},plan.body??'').map(field=><div key={field.label}><dt>{field.label}</dt><dd>{field.value}</dd></div>)}</dl>
 <p>For a new request, have your boarding pass and ticket copy ready. Attach reference documents for a status check.</p>
 <a className="button button-primary" href={plan.portal.url} target="_blank" rel="noreferrer">Open Air India refund form</a></>}
 <SourceLine href={plan.portal.sourceUrl??plan.portal.url}>{portalCopy.source(plan.portal.checkedAt??'13 Oct 2026')}</SourceLine>
 </NextMoveCard>}
 <TrialCard data={data} code={code} token={token}/>

 {data.factsConfirmedAt&&draft&&draft.body===null&&<section className="case-card"><h2>Your next message is ready</h2><p>The annual plan unlocks follow-ups. Your route and date remain visible.</p></section>}

 {data.factsConfirmedAt&&draft&&!plan?.portal&&draft.body!==null&&draft.status!=="sent"&&plan?.nextStep!=="none"&&data.route!=="NEED_INFO"&&<NextMoveCard title={plan?.nextStep==="FLIGHT_status"?"Your optional status mail":`Your next ${draft.channel==="email"?"mail":"step"}`}>

 {draft.channel==="email"&&<><p>To: {draft.to||(plan?.nextStep==="FLIGHT_status"?"Use the company's own support page":"Paste the address from the company's own page")}</p>{!draft.to&&<><input aria-label="Company address" type="email" value={recipient} onChange={e=>setRecipient(e.target.value)}/><WhyAsk field="recipient"/></>}<CcList roles={selfSendDemo?demoCcRoles(ccList):undefined} addresses={ccList} copy={()=>void navigator.clipboard.writeText(cc)} /><p>{draft.subject}</p></>}

 <pre className="flight-message">{mailBody}</pre>{!selfSendDemo&&draft.channel==="email"&&<AttachmentPicker selected={attachments} change={setAttachments}/>}

 {draft.channel==="email"&&<a className="button button-primary" aria-disabled={!draft.to&&!recipient} href={draft.to||recipient?buildGmailCompose(draft.to||recipient,draft.subject??"",mailBody,cc).url:undefined} target="_blank" rel="noreferrer" onClick={()=>{if(buildGmailCompose(draft.to||recipient,draft.subject??"",mailBody,cc).copyFirst)void navigator.clipboard.writeText(mailBody).catch(()=>setError("Copy the message before opening Gmail, then paste it."));setOpened(true);void openedDraft({...args,draftId:draft._id}).catch(()=>setError("Could not record opening the draft."));}}>Open in Gmail</a>}

 {passengerEscalation&&draft.channel==="email"&&<p className="input-hint">{escalationSendLine}</p>}
 {!selfSendDemo&&!passengerEscalation&&draft.channel==="email"&&facts?.pnr&&plan?.nextStep!=="FLIGHT_status"&&<ChaseAuthority emailConfirmed={data.emailConfirmed} callCompany={facts.airline??undefined} code={code} token={token} company={[facts.airline,facts.bookedVia!=="direct"?facts.bookedVia:null].filter(Boolean).join(" and ")} pnr={facts.pnr} chase={data.chase} saved={{name:data.name,contact:data.email||data.contact}} demo={!!data.demo} canSkip={!!data.demo&&data.demo.round>=1&&data.demo.round<=2&&data.demo.phase==="ready"&&data.stage==="READY"}/>}

 {!selfSendDemo&&<button className="text-button" onClick={()=>run(async()=>{await navigator.clipboard.writeText(mailBody);await openedDraft({...args,draftId:draft._id});setOpened(true);})}>Copy message</button>}

 {!selfSendDemo&&!passengerEscalation&&draft.channel==="email"&&<p>{plan?.nextStep==="FLIGHT_status"?"This early status mail is optional. You send it yourself; Genie will not send it.":"Use Gmail to send it yourself, or give Genie written permission above."}</p>}{!selfSendDemo&&!(data.demo&&data.demo.round===3)&&<button className="button button-primary" disabled={busy||(draft.channel==="email"&&!opened)} onClick={()=>run(()=>sent({...args,draftId:draft._id}))}>{draft.channel==="phone"?callingCopy.calledButton:"Yes, I've sent it"}</button>}</NextMoveCard>}

 {selfSendDemo&&data.factsConfirmedAt&&draft&&draft.body!==null&&draft.status!=="sent"&&plan?.nextStep!=="none"&&data.route!=="NEED_INFO"&&data.demo?.round!==3&&<button className="button button-primary" disabled={busy||!opened} onClick={()=>run(()=>sent({...args,draftId:draft._id}))}>Yes, I've sent it</button>}
 {data.demo?.kind === "flight" && data.demo.round === 3 && data.demo.phase === "ready" && data.dueDate && data.demo.now < data.dueDate && <button className="button button-primary" disabled={busy} onClick={()=>run(()=>skipDemo(args))}>Skip to the bank check date</button>}

 {data.demo?.phase === "timed_out" && <section className="case-card"><p>The demo check stopped after its time limit.</p><button disabled={busy} onClick={()=>run(()=>retryDemo(args))}>Check again</button></section>}

 {data.demo?.phase.startsWith("waiting")&&<section className="case-card" role="status"><span className="spinner"/><h2>Waiting for {data.demo.round===1?"Demo Air":"DemoTrips"}'s reply…</h2><ol><li>Checking the demo inbox</li><li>Reading the reply</li><li>Updating your next step</li></ol></section>}

 {checkDate&&!data.stage.startsWith("CLOSED")&&<section className="case-card"><h2>Your check-in: {date(checkDate)}</h2><SourceLine>{plan?.route==="TRACE"?"From the company’s bank-date reply, unless you picked your own reminder":"Refund Genie’s expectation for the next follow-up; not an official deadline"}</SourceLine><button className="text-button" onClick={()=>{const content=buildIcs({code,date:checkDate,title:"Refund Genie refund check-in",description:`Return to your private case: ${privateCaseUrl(data.publicAppUrl || location.origin, code, token)}`,domain:location.hostname,checkinId:checkDate});const url=URL.createObjectURL(new Blob([content],{type:"text/calendar;charset=utf-8"}));const link=document.createElement("a");link.href=url;link.download=`refund-genie-${code}.ics`;link.click();URL.revokeObjectURL(url);}}>Download one-time calendar reminder</button></section>}

 {plan?.route==="TRACE"&&!plan.checkDate&&!data.stage.startsWith("CLOSED")&&<section className="case-card"><h2>Remind me on a date I pick</h2><p>No regulator bank timeline is held. This date is your choice.</p><input aria-label="Bank reminder date" type="date" value={reminderDate} onChange={e=>setReminderDate(e.target.value)}/><WhyAsk field="reminder"/><button disabled={busy||!reminderDate} onClick={()=>run(()=>reminder({...args,date:reminderDate}))}>Set my reminder</button></section>}

 {tracking?.firstSent&&!data.demo&&!data.stage.startsWith("CLOSED")&&<section className="case-card"><h2>Keep the reply alert live</h2><p>A live reply alert needs Google Calendar permission. A downloaded calendar file is only a one-time reminder.</p>{!tracking.calendar&&<button onClick={()=>run(async()=>{const url=await beginCalendar({...args,kind:"calendar"});window.location.assign(url.url);})}>Connect Google Calendar</button>}{tracking.calendar&&<><p>Google Calendar is connected.</p><button disabled={busy} onClick={()=>run(()=>disconnectGoogle(args))}>Disconnect Google</button></>}{tracking.gmailReady&&!tracking.gmail&&<button disabled={busy} onClick={()=>run(async()=>{const result=await beginCalendar({...args,kind:"gmail"});window.location.assign(result.url);})}>Connect Gmail (test accounts only)</button>}<p>If they replied only to you, paste it here.</p></section>}

 {(data.stage==="CLOSED_NO_ROUTE"||data.stage==="CLOSED_OUT_OF_SCOPE"||!data.stage.startsWith("CLOSED")&&data.factsConfirmedAt)&&<section className="case-card"><h2>{data.stage.startsWith("CLOSED")?"New evidence? Paste it to re-open this case.":checkDue?`Has your Rs ${(data.amountPaise??0)/100} landed?`:"They replied?"}</h2><label htmlFor="flight-reply">Paste their reply</label><textarea id="flight-reply" value={reply} onChange={e=>setReply(e.target.value)} maxLength={8000}/><WhyAsk field="reply" personal/><label htmlFor="flight-reply-picture">Or add a screenshot (crop bank details first)</label><input id="flight-reply-picture" type="file" accept="image/*" onChange={e=>setPicture(e.target.files?.[0]??null)}/><WhyAsk field="reply" personal/><button disabled={busy||(!reply.trim()&&!picture)} onClick={()=>run(async()=>{const storageIds=[];if(picture){const blob=await compressScreenshot(picture);const url=await uploadUrl({deviceId:getDeviceId(),code,token});const response=await fetch(url,{method:"POST",headers:{"Content-Type":"image/jpeg"},body:blob});if(!response.ok)throw new Error("Screenshot could not be uploaded");storageIds.push((await response.json()).storageId);}await addReply({...args,text:redact(reply)||undefined,storageIds});setReply("");setPicture(null);})}>Read their reply</button>{checkDue&&<button className="text-button" disabled={busy} onClick={()=>run(()=>close({...args,answer:"not_yet"}))}>Not yet, next step</button>}{!data.stage.startsWith("CLOSED")&&<><label>Amount received (rupees)<input type="number" min="0.01" step="0.01" value={received||String(plan?.amountOwed??(data.amountPaise??0)/100)} onChange={e=>setReceived(e.target.value)}/><WhyAsk field="received"/></label><button className="button button-primary" disabled={busy||!!data.demo&&(data.demo.round!==3||!checkDue)} onClick={()=>run(()=>close({...args,answer:"landed",amountPaise:Math.round((received?Number(received):plan?.amountOwed??(data.amountPaise??0)/100)*100)}))}>It's in, close this case</button></>}</section>}

 {data.stage==="CLOSED_LANDED"&&<section className="case-card landed-card"><Mascot className="landed-mascot"/><h2>Money landed{data.demo?" · demo":""}</h2><p>Rs {((data.recoveredPaise??0)/100).toLocaleString("en-IN")}{data.demo?" simulated; no real money moved.":" recovered."}</p><p>Refund Genie told me who owed it and wrote every mail.</p>{counts&&<p>You: {counts.taps} taps. Refund Genie: read {counts.replies} replies, set {counts.dates} dates, wrote {counts.drafts} messages.</p>}<button className="text-button" onClick={()=>run(()=>navigator.clipboard.writeText(`${data.demo?"I tried a simulated refund chase. No real money moved.":`My Rs ${(data.recoveredPaise??0)/100} landed.`} Refund Genie told me who owed it and wrote every mail. ${data.publicAppUrl || location.origin}`))}>Copy share card</button>{!data.demo&&!feedbackDone&&<><h3>A review? Only if you want.</h3><textarea aria-label="Optional review" value={feedbackText} onChange={e=>setFeedbackText(e.target.value)} maxLength={500}/><WhyAsk field="review"/><p>You can share a screenshot of money arriving with Refund Genie. Blur bank details. Nothing is published without your permission.</p><button disabled={busy||!feedbackText.trim()} onClick={()=>run(async()=>{await feedback({...args,worthIt:true,comment:redact(feedbackText)});setFeedbackDone(true);})}>Save my review</button></>}</section>}

 {data.stage==="ERROR"&&<button disabled={busy} onClick={()=>run(()=>retry(args))}>Try again</button>}

 <section className="case-card"><h2>Your messages</h2>{replyHistory?.map((row:{_id:string;text:string;summary:string;date:string})=><details key={row._id} id={`flight-reply-${row._id}`}><summary>Reply · {date(row.date)} · {row.summary||"Read the original"}</summary><SourceLine>From the company’s saved reply</SourceLine><pre className="flight-message">{row.text}</pre></details>)}{drafts?.map((row:{_id:string;subject?:string;body:string|null;createdAt:number;status:string})=><details key={row._id}><summary>{row.subject} · {date(todayIST(new Date(row.createdAt)))} · {row.status}</summary><SourceLine>Prepared from your saved case facts on the date shown</SourceLine><pre className="flight-message">{row.body??"Annual plan unlocks this follow-up."}</pre></details>)}{facts?.reply.claim!=="none"&&<button className="text-button" disabled={busy} onClick={()=>setCorrecting(!correcting)}>Not quite: correct the reply read</button>}{correcting&&data.route!=="NEED_INFO"&&data.factsConfirmedAt&&<><label htmlFor="history-correction">What should we change?</label><textarea id="history-correction" value={correction} onChange={e=>setCorrection(e.target.value)}/><WhyAsk field="correction" personal/><button disabled={busy||!correction.trim()} onClick={()=>run(async()=>{await confirm({...args,pnr,correction});markSaved("Correction");setCorrecting(false);setCorrection("");})}>Read my correction</button></>}</section>{!selfSendDemo&&<CallHistory {...args}/>}<ChaseHistory events={chaseView?.events??timeline??[]}/><footer className="case-footer-actions"><PolicyFooter /><button className="text-button danger-text" disabled={busy} onClick={()=>{if(window.confirm("Delete this case and its saved messages?"))void run(async()=>{await remove(args);forgetCase(code);window.location.assign("/start");});}}>Delete this case</button></footer>

 </>}

 </div></main>;

}

