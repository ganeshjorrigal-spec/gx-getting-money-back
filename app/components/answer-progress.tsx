"use client";
import {useEffect,useRef,useState,type ReactNode} from 'react';
export type SummaryItem={label:string;value:ReactNode;edit?:()=>void;href?:string};
export function AnswerStep({step,total}:{step:number;total?:number}){
 const known=total!==undefined&&total>=step;
 return <div className="answer-step"><p>Step {step}{known?` of ${total}`:''}</p><div className="answer-step-track" role="progressbar" aria-label="Answer progress" aria-valuenow={step} aria-valuemin={1} aria-valuemax={known?total:undefined} aria-valuetext={`Step ${step}${known?` of ${total}`:''}`}><span style={{width:known?`${step/total!*100}%`:'24%'}}/></div></div>;
}
export function SharedSummary({items=[],children,confirm=false,screen}:{items?:SummaryItem[];children?:ReactNode;confirm?:boolean;screen:string}){
 const content=<><dl className="shared-facts">{items.map(item=><div key={item.label}><dt>{item.label}</dt><dd>{item.value??'Not given'} {item.edit?<button type="button" className="summary-edit" onClick={item.edit} aria-label={`Edit ${item.label}`}>Edit</button>:item.href?<a className="summary-edit" href={item.href} aria-label={`Edit ${item.label}`}>Edit</a>:null}</dd></div>)}</dl>{children}</>;
 if(confirm)return <section className="shared-summary confirm-summary" aria-label="Check what you've shared"><h3>Check what you&apos;ve shared</h3>{content}</section>;
 return <details key={screen} className="shared-summary"><summary>See what you&apos;ve shared</summary>{content}</details>;
}
export function SavedTick({field}:{field:string|null}){return <span className="saved-answer" role="status" aria-live="polite" aria-atomic="true">{field&&<>✓ Saved<span className="sr-only">: {field}</span></>}</span>;}
export function useSavedAnswer(){
 const [saved,setSaved]=useState<string|null>(null),[count,setCount]=useState(0);const timer=useRef<ReturnType<typeof setTimeout>|null>(null);
 useEffect(()=>()=>{if(timer.current)clearTimeout(timer.current);},[]);
 function markSaved(field:string){if(timer.current)clearTimeout(timer.current);setSaved(field);setCount(n=>n+1);timer.current=setTimeout(()=>setSaved(null),1500);}
 return {saved,count,markSaved};
}
