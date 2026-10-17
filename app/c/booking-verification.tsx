"use client";
import {useState} from 'react';
import {useMutation} from 'convex/react';
import {api} from '../../convex/_generated/api';
import type {FlightRead} from '../../lib/flight';
import {bookingContactPresent,missingVerification,verificationLabels,verificationSamples,bookingContactConsent} from '../../lib/booking-verification';
import {AnswerStep,SharedSummary} from '../components/answer-progress';
import {SampleFieldLabel} from '../components/sample-field-label';
import {userError} from '../../lib/user-error';
export function BookingVerification({code,token,facts,demo}:{code:string;token:string;facts:FlightRead;demo:boolean}){
 const save=useMutation(api.flights.verification);
 const [values,setValues]=useState<Record<string,string>>({}),[skipped,setSkipped]=useState<string[]>([]),[consent,setConsent]=useState(false),[busy,setBusy]=useState(false),[error,setError]=useState('');
 const field=missingVerification(facts).find(f=>!skipped.includes(f));
 async function submit(skip=false){setBusy(true);setError('');try{if(field){await save({code,token,field,value:skip?'':values[field]??''});if(skip)setSkipped(s=>[...s,field]);const next={...facts,[field]:skip?null:values[field]??null};if(!bookingContactPresent(next)&&missingVerification(next).every(f=>[...skipped,field].includes(f)))await save({code,token,field:'bookingContactReviewed',consent:false});}else await save({code,token,field:'bookingContactReviewed',consent});}catch(e){setError(userError(e));}finally{setBusy(false);}}
 return <section className="case-card"><AnswerStep step={2}/><h2>{field?verificationLabels[field]:'Booking contact permission'}</h2>
 <SharedSummary screen="booking-verification" items={[{label:'From',value:facts.routeFrom},{label:'To',value:facts.routeTo},{label:'Name on ticket',value:facts.nameOnTicket},{label:'Booking mobile',value:facts.bookingMobile},{label:'Booking email',value:facts.bookingEmail}]}/>
 {demo&&<p>Use made-up details. This is a demo.</p>}
 {field?<><SampleFieldLabel htmlFor={`verification-${field}`} label={verificationLabels[field]} disabled={busy} onFill={demo?()=>setValues(v=>({...v,[field]:verificationSamples[field]})):undefined}/>
 <input id={`verification-${field}`} type={field==='bookingEmail'?'email':field==='bookingMobile'?'tel':'text'} maxLength={150} value={values[field]??''} onChange={e=>setValues(v=>({...v,[field]:e.target.value}))}/>
 <button className="button button-primary" disabled={busy||!(values[field]??'').trim()} onClick={()=>void submit()}>Continue</button>
 {field.startsWith('booking')&&<button className="text-button" disabled={busy} onClick={()=>void submit(true)}>Skip this detail</button>}</>:<>
 <p>Booking mobile: {facts.bookingMobile||'Not shared'}</p><p>Booking email: {facts.bookingEmail||'Not shared'}</p>
 <label><input type="checkbox" checked={consent} onChange={e=>setConsent(e.target.checked)}/>{bookingContactConsent}</label>
 <button className="button button-primary" disabled={busy} onClick={()=>void submit()}>Continue</button></>}
 {busy&&<p role="status">Saving…</p>}{error&&<p role="alert">{error}</p>}</section>;
}
