"use client";
import {useQuery} from 'convex/react';
import {api} from '../../convex/_generated/api';
export function CallHistory({code,token}:{code:string;token:string}){
 const calls=useQuery(api.calls.list,{code,token});
 if(!calls?.length)return null;
 return <section className="case-card"><h2>Calls in this case</h2>{calls.map((call:any)=><article key={call._id}><h3>{call.label} · {call.company}</h3><p>{call.status==='failed'?'The call could not connect. Genie will follow up by mail.':call.status==='completed'?'Finished':'Waiting to connect'} · {call.durationSeconds} seconds</p>{call.patchIn&&<p>{call.mode==='simulated'?'Passenger patch-in simulated. No phone rang.':'Passenger patch-in requested.'}</p>}{call.readerOutput?.reply?.summary&&<p>{call.readerOutput.reply.summary}</p>}{call.readerOutput?.reply?.reference&&<p>Reference: {call.readerOutput.reply.reference}</p>}{call.recordingUrl&&<><p>{call.recordingKind==='roleplay'?'Role-play recording. This is not a live company call.':'Call recording'}</p><audio controls preload="none" src={call.recordingUrl}/></>}{call.transcript&&<details><summary>Read the {call.mode==='simulated'?'simulated ':''}call transcript</summary><pre className="flight-message">{call.transcript}</pre></details>}</article>)}</section>;
}
