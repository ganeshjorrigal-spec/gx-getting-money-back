"use client";
import {callingCopy} from '../copy';
import {useQuery} from 'convex/react';
import {api} from '../../convex/_generated/api';
export function CallHistory({code,token}:{code:string;token:string}){
 const calls=useQuery(api.calls.list,{code,token});
 if(!calls?.length)return null;
 return <section className="case-card"><h2>{callingCopy.historyTitle}</h2>{calls.map((call:any)=><article key={call._id}><h3>{call.label} · {call.company}</h3><p>{call.status==='start_uncertain'?callingCopy.startUncertain:call.status==='failed'?(!call.externalId?callingCopy.callCouldNotStart(call.reason??''):callingCopy.callFailed):call.status==='completed'?'Finished':'Waiting to connect'} · {call.durationSeconds} seconds</p>{call.testPhoneNote&&<p>{call.testPhoneNote}</p>}{call.privacyNote&&<p>{call.privacyNote}</p>}{call.patchIn&&<p>{call.mode==='simulated'?callingCopy.patchSimulated:callingCopy.patchRequested}</p>}{call.readerOutput?.reply?.summary&&<p>{call.readerOutput.reply.summary}</p>}{call.readerOutput?.reply?.reference&&<p>Reference: {call.readerOutput.reply.reference}</p>}{call.recordingUrl&&<><p>{call.recordingKind==='roleplay'?callingCopy.roleplayRecording:callingCopy.callRecording}</p><audio controls preload="none" src={call.recordingUrl}/></>}{call.transcript&&<details><summary>{callingCopy.transcript(call.mode)}</summary><pre className="flight-message">{call.transcript}</pre></details>}</article>)}</section>;
}
