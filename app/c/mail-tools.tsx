"use client";
import {WhyAsk} from "../components/why-ask";
export function CcList({addresses,copy,roles}:{addresses:string[];copy:()=>void;roles?:Record<string,string>}) {
 const list=[...new Set(addresses.filter(Boolean))];
 if(!list.length)return null;
 return <div className="cc-copy"><strong>CC</strong><ul>{list.map(address=><li key={address}>{roles?.[address]&&<span>{roles[address]} · </span>}<code>{address}</code></li>)}</ul><p>{list.length===2?"Keep both in CC. The second one lets Refund Genie read their reply.":list.length===1?"Keep this in CC so Refund Genie can read their reply.":"Keep all in CC. The last one lets Refund Genie read their reply."}</p><button className="text-button" onClick={copy}>Copy CC addresses</button></div>;
}
export function AttachmentPicker({selected,change}:{selected:string[];change:(labels:string[])=>void}) {
 return <fieldset><legend>Only list files you will attach in Gmail</legend>{["cancellation mail","payment receipt","dated replies"].map(label=><label key={label}><input type="checkbox" checked={selected.includes(label)} onChange={e=>change(e.target.checked?[...selected,label]:selected.filter(x=>x!==label))}/><WhyAsk field="consent"/>{label}</label>)}</fieldset>;
}
