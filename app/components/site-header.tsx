"use client";
import {useEffect,useRef} from 'react';
import Link from 'next/link';
import {BrandMark} from './brand';
import {enhanceHeaderMenu} from '../../lib/header-menu';
export function SiteHeader(){
 const root=useRef<HTMLElement>(null);useEffect(()=>enhanceHeaderMenu(root.current),[]);
 return <header ref={root} className="site-header"><Link className="wordmark" href="/" aria-label="Refund Genie"><BrandMark/></Link><div className="header-actions"><Link prefetch={false} className="button button-primary" href="/start/">Check my refund</Link><details className="header-menu"><summary aria-label="Open navigation menu"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M4 6h16M4 12h16M4 18h16"/></svg></summary><nav aria-label="Main"><a href="/#how-it-works">How it works</a><Link prefetch={false} href="/start/?demo=flight">Try a demo</Link><Link prefetch={false} href="/cases/">Your cases</Link></nav></details></div></header>;
}
