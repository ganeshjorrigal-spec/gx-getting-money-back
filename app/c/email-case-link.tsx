"use client";
import {WhyAsk} from "../components/why-ask";
import {useState} from "react";
import {buildGmailCompose} from "../../lib/outbound";
export function EmailCaseLink({code,contact,link}:{code:string;contact?:string|null;link:string}) {
 const [open,setOpen]=useState(false),[address,setAddress]=useState(contact&&/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact)?contact:"");
 return <div><button className="text-button" onClick={()=>setOpen(!open)}>Email me this case link</button>{open&&<><label htmlFor="save-case-email">Your own email address</label><input id="save-case-email" type="email" autoComplete="email" value={address} onChange={e=>setAddress(e.target.value)}/><WhyAsk field="email" personal/><button className="button button-secondary" disabled={!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(address)} onClick={()=>window.open(buildGmailCompose(address,`My Refund Genie case ${code}`,`My private case ${code}:\n${link}\n\nKeep this link private. Anyone with it can open the case.`).url,"_blank","noopener,noreferrer")}>Open in Gmail</button><p>You send it yourself. We do not save this address or send a mail.</p></>}</div>;
}
