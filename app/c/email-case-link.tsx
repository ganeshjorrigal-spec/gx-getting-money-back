"use client";
import {useState} from 'react';
import {useAction} from 'convex/react';
import {api} from '../../convex/_generated/api';
import {caseLinkLimitMessage} from '../../lib/case-link-mail';
import {userError} from '../../lib/user-error';
export function EmailCaseLink({code,token,confirmedEmail,link}:{code:string;token:string;confirmedEmail?:string|null;link:string}){
 const send=useAction(api.caseLinkMailActions.send),[busy,setBusy]=useState(false),[message,setMessage]=useState(''),[limited,setLimited]=useState(false);
 async function click(){if(busy)return;setBusy(true);setMessage('');try{
 if(!confirmedEmail){await navigator.clipboard.writeText(link);setMessage('Case link copied. Keep it private.');}
 else{const result=await send({code,token});if(result.state==='limit'){setLimited(true);setMessage(caseLinkLimitMessage);}else setMessage(`Sent to ${result.maskedEmail}`);}
 }catch(e){setMessage(userError(e));}finally{setBusy(false);}}
 return <div><button className="button button-secondary" disabled={busy||limited} onClick={()=>void click()}>{busy?'Sending…':confirmedEmail?'Email me this case link':'Copy my case link'}</button>{message&&<p role="status">{message}</p>}</div>;
}
