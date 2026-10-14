import React,{useSyncExternalStore} from 'react';import {createRoot} from 'react-dom/client';
import EventCase from '../../app/c/case-view';
import {inboxRows,openLocalConfirmation,item} from './email-demo-store';
import Home from '../../app/page';import Start from '../../app/start/page';import FlightCase from '../../app/c/flight-case-view';
import {subscribe,snapshot,route,escalationFixture} from './email-demo-store';
function App(){useSyncExternalStore(subscribe,snapshot,snapshot);return <><p>LOCAL TEST · transport replaced; no mail or call</p>{route==='landing'?<Home/>:route==='start'?<Start/>:item.refundType==='event'?<EventCase code='RG-QATEST'/>:<FlightCase code='RG-QATEST' token='synthetic'/>}<section className="case-card" aria-label="Local test inbox"><h2>Local test inbox · transport replaced</h2><p>Synthetic allow-listed inbox only. Nothing is sent to Gmail.</p>{inboxRows.map((mail,i)=><article key={i}><h3>{mail.subject}</h3><p>To: {mail.to}</p><p>CC: {mail.cc.join(", ")||"none"}</p><pre style={{whiteSpace:"pre-wrap",overflowWrap:"anywhere"}}>{mail.body}</pre>{mail.link&&<a className="button button-secondary" href={mail.link} onClick={e=>{e.preventDefault();openLocalConfirmation();}}>Open confirmation link</a>}</article>)}</section></>;}
createRoot(document.getElementById('root')!).render(<App/>);
