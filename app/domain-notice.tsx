"use client";
import {useEffect,useState} from 'react';
import {savedCasesNotice} from '../lib/app-url';
import {readDomainMove} from '../lib/domain-notice';
export function DomainNotice(){
 const [moved,setMoved]=useState(false);
 useEffect(()=>{let active=true;void readDomainMove(location.origin,process.env.NEXT_PUBLIC_CONVEX_URL,async()=>{
  const [{ConvexHttpClient},{api}]=await Promise.all([import('convex/browser'),import('../convex/_generated/api')]);
  const client=new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);return ()=>client.query(api.site.urls,{});
 }).then(value=>{if(active)setMoved(value);});return ()=>{active=false;};},[]);
 return moved?<aside className="section-wrap" aria-label="New address"><p>We've moved to <a href="https://refundgenie.app">refundgenie.app</a>.</p><p>{savedCasesNotice}</p></aside>:null;
}
