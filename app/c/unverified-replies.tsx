"use client";
import {useState} from 'react';
import {useQuery,useMutation} from 'convex/react';
import {api} from '../../convex/_generated/api';
import {userError} from '../../lib/user-error';
export function UnverifiedReplies({code,token}:{code:string;token:string}){
 const args={code,token},rows=useQuery(api.cases.unverifiedReplies,args),useReply=useMutation(api.cases.useUnverifiedReply);
 const [busy,setBusy]=useState(false),[error,setError]=useState('');
 return <>{rows?.map((row:any)=><section className="case-card" key={row._id}><h2>A mail we couldn't verify came in for your case</h2><p>{row.sender} · {new Date(row.receivedAt).toLocaleDateString('en-IN')}</p><blockquote>{row.text}</blockquote><p>It has not changed your case.</p><button disabled={busy} onClick={async()=>{setBusy(true);setError('');try{await useReply({...args,inputId:row._id});}catch(e){setError(userError(e));}finally{setBusy(false);}}}>This is real, use it</button></section>)}{error&&<p role="alert">{error}</p>}</>;
}
