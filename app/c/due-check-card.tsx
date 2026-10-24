"use client";
import {useState} from 'react';
import {useMutation} from 'convex/react';
import {api} from '../../convex/_generated/api';
import {userError} from '../../lib/user-error';
export function DueCheckCard({code,token,date}:{code:string;token:string;date:string}){
 const answer=useMutation(api.cases.answerCheckin),[busy,setBusy]=useState(false),[error,setError]=useState('');
 async function submit(value:'landed'|'not_yet'){setBusy(true);setError('');try{await answer({code,token,answer:value,checkinDate:date});}catch(e){setError(userError(e));}finally{setBusy(false);}}
 return <section className="case-card"><h2>Has your refund arrived?</h2><p>Your case stays at its current step until you answer.</p><button disabled={busy} onClick={()=>void submit('landed')}>It came</button><button disabled={busy} onClick={()=>void submit('not_yet')}>Not yet, chase it</button>{error&&<p role="alert">{error}</p>}</section>;
}
