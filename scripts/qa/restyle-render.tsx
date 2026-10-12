import React from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import Home from '../../app/page';
import Start from '../../app/start/page';
import Terms from '../../app/terms/page';
import Privacy from '../../app/privacy/page';
import RefundPolicy from '../../app/refund-policy/page';
import Contact from '../../app/contact/page';
import {PublicChaseDemo} from '../../app/c/public-chase-demo';
import FlightCase from '../../app/c/flight-case-view';
import {setProofData} from './restyle-query-fixture';
import {sampleFlight} from '../../lib/flight-sample';
import {planFlight} from '../../lib/flight';
import {finishMail} from '../../lib/mail-copy';
export function renderProof(){
 const r=sampleFlight();r.airline='SpiceJet';r.cancellationDate='2026-09-11';r.amountPaid=6240;
 const plan=planFlight(r,'2026-10-13');
 const item={code:'RG-QATEST',stage:'READY',route:plan.route,facts:r,flightPlan:plan,factsConfirmedAt:1,amountPaise:624000,publicAppUrl:'https://refundgenie.app',trialLanded:0,trialLimit:3,trialLocked:false,annualPaid:false,annualUntil:null,checkoutEnabled:true,razorpayLink:null,handHelped:false,demo:null};
 const drafts=[{_id:'fixture-draft',channel:'email',to:plan.to,cc:plan.cc,body:finishMail(plan.body!,'RG-QATEST'),subject:'Flight refund follow-up [RG-QATEST]',status:'ready',createdAt:Date.parse('2026-10-13T00:00:00Z')}];
 setProofData({item,drafts});const flight=renderToStaticMarkup(<FlightCase code='RG-QATEST' token='visual-fixture'/>);
 const mail=flight;const pages:any={landing:renderToStaticMarkup(<Home/>),start:renderToStaticMarkup(<Start/>),flight,mail,terms:renderToStaticMarkup(<Terms/>),privacy:renderToStaticMarkup(<Privacy/>),refundPolicy:renderToStaticMarkup(<RefundPolicy/>),contact:renderToStaticMarkup(<Contact/>)};
 const early={...r,cancellationDate:'2026-10-01',reply:{...r.reply,claim:'waiting_airline' as const,fromCompany:'MakeMyTrip',pointsAt:'SpiceJet'}};
 for(const [name,facts] of [['waiting',early],['followup',{...early,reply:{...early.reply,claim:'credit_shell' as const}}]] as const){const p=planFlight(facts,'2026-10-13');setProofData({item:{...item,route:p.route,facts,flightPlan:p},drafts:[]});pages[name]=renderToStaticMarkup(<FlightCase code='RG-QATEST' token='visual-fixture'/>);}
 const bank={...r,airline:'Demo Air',bookedVia:'DemoTrips',reply:{...r.reply,claim:'processed_reference' as const,fromCompany:'DemoTrips',pointsAt:'passenger',reference:'DEMO-REF-2400',paidDate:'2026-10-13',promisedDate:'2026-10-16'}};
 const bankPlan=planFlight(bank,'2026-10-13',undefined,'fixture@example.invalid');
 setProofData({item:{...item,stage:'READY',route:'TRACE',facts:bank,flightPlan:bankPlan,demo:{kind:'flight',round:3,phase:'bank',now:'2026-10-13',expiresAt:Date.now()+86400000}},drafts:[]});
 pages.demo=renderToStaticMarkup(<FlightCase code='RG-QATEST' token='visual-fixture'/>);
 setProofData({item:{...item,stage:'TRIAGING',progress:{step:'writing'}},drafts:[]});pages.loading=renderToStaticMarkup(<FlightCase code='RG-QATEST' token='visual-fixture'/>);
 const demoData={...item,stage:'READY',dueDate:'2026-10-16',facts:bank,demo:{chaseStory:true,chasePhase:'bank',phase:'ready',now:'2026-10-16'},chase:{active:true}};
 setProofData({demoView:{events:[],calls:[],mails:2,replies:[],simulatedCalls:1,realCalls:0}});
 pages.chaseDemo=renderToStaticMarkup(<PublicChaseDemo code='RG-QATEST' token='visual-fixture' data={demoData}/>);
 setProofData({item:{...item,stage:'CLOSED_LANDED',recoveredPaise:624000},drafts:[]});pages.landed=renderToStaticMarkup(<FlightCase code='RG-QATEST' token='visual-fixture'/>);
 return pages;
}
