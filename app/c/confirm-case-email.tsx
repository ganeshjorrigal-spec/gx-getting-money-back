"use client";
import {useState} from 'react';
import {useAction} from 'convex/react';
import {api} from '../../convex/_generated/api';
import {getDeviceId} from '../../lib/case-link';
import {confirmCaseEmailMessage} from '../../lib/confirmed-case-email';
import {validEmail} from '../../lib/case-email';
import {userError} from '../../lib/user-error';
export function ConfirmCaseEmail({code,token,saved}:{code:string;token:string;saved?:string|null}){
 const request=useAction(api.demoEmailActions.request);
 const [email,setEmail]=useState(saved?.includes('@')?saved:''),[busy,setBusy]=useState(false),[sent,setSent]=useState(false),[error,setError]=useState('');
 return <section className="case-card"><h2>Confirm your email</h2><p>{confirmCaseEmailMessage}</p><label>Your email<input type="email" value={email} onChange={e=>{setEmail(e.target.value);setSent(false);}}/></label><button disabled={busy||!validEmail(email)} onClick={async()=>{setBusy(true);setError('');try{await request({code,token,deviceId:getDeviceId(),email});setSent(true);}catch(e){setError(userError(e));}finally{setBusy(false);}}}>{busy?'Sending confirmation link…':'Email me the confirmation link'}</button>{sent&&<p>Open the one-time link in your email, then return to your case.</p>}{error&&<p role="alert">{error}</p>}</section>;
}
