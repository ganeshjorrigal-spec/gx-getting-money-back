"use client";
import {useEffect,useState} from 'react';
import Link from 'next/link';
import {SiteHeader} from '../components/site-header';
import {PolicyFooter} from '../policy-footer';
import {CASE_STORAGE_KEY,type SavedCase} from '../../lib/case-link';
import {landingCases} from '../../lib/landing-cases';
import {savedCasesNotice} from '../../lib/app-url';
export default function CasesPage(){
 const [cases,setCases]=useState<SavedCase[]>([]);
 useEffect(()=>{try{setCases(landingCases(localStorage.getItem(CASE_STORAGE_KEY),20));}catch{/* Private case links still work with blocked storage. */}},[]);
 return <main className="case-shell"><SiteHeader/><div className="case-wrap"><h1>Your cases</h1><section className="saved-cases" aria-label="Saved cases">{cases.length?<div>{cases.map(item=><Link prefetch={false} key={item.code} className="saved-case" href={`/c/index.html?code=${encodeURIComponent(item.code)}#k=${encodeURIComponent(item.token)}`}><span>{item.title||item.code}</span><span>Open →</span></Link>)}</div>:<><p>No saved cases on this browser yet.</p><Link className="button button-primary" href="/start/">Check my refund</Link></>}</section><p className="source-note saved-cases-note">{savedCasesNotice}</p><PolicyFooter/></div></main>;
}
