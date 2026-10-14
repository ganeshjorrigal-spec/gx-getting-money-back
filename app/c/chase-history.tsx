"use client";
import {useState,useId} from 'react';
import {chaseHistoryRows} from '../../lib/chase-history';
import {SourceLine} from '../components/receipts';
type Entry={_id:string;summary:string;createdAt:number};
export function ChaseHistory({events=[],demo=false,className='case-timeline'}:{events:Entry[];demo?:boolean;className?:string}){
 const [expanded,setExpanded]=useState(false),id=useId();
 return <section className={className} aria-label="The chase"><h2>The chase</h2><ol id={id}>{chaseHistoryRows(events,expanded).map(row=><li key={row._id}>{row.summary} · <time dateTime={new Date(row.createdAt).toISOString()}>{new Date(row.createdAt).toLocaleString('en-IN',{timeZone:'Asia/Kolkata',day:'numeric',month:'short',hour:'2-digit',minute:'2-digit'})} IST</time><SourceLine>Recorded in this {demo?'demo':'case'}’s activity history</SourceLine></li>)}</ol>{events.length>1&&<button className="text-button summary-edit chase-history-toggle" aria-controls={id} aria-expanded={expanded} onClick={()=>setExpanded(!expanded)}>{expanded?'Hide':`See all ${events.length} messages`}</button>}</section>;
}
