import {PublicChaseDemo} from '../../app/c/public-chase-demo';
import React from "react";
import {renderToStaticMarkup} from "react-dom/server";
import {setProofData} from "./restyle-query-fixture";
import FlightCase from "../../app/c/flight-case-view";
import {sampleFlight} from "../../lib/flight-sample";
import {planFlight} from "../../lib/flight";
export function renderEscalation(){return buildHtml();}
function buildHtml(){const facts=sampleFlight();facts.cancellationDate="2026-09-01";const plan=planFlight(facts,"2026-10-13");setProofData({item:{code:"RG-QATEST",refundType:"flight",stage:"READY",route:plan.route,facts,flightPlan:plan,createdAt:Date.parse("2026-10-13T00:00:00Z"),updatedAt:Date.parse("2026-10-13T00:00:00Z"),factsConfirmedAt:1,chase:{active:true,letterUrl:null},publicAppUrl:"https://refundgenie.app",trialLanded:0,trialLimit:3,trialLocked:false},drafts:[{_id:"fixture",channel:"email",to:plan.to,cc:plan.cc,body:plan.body,subject:"Demo refund [RG-QATEST]",status:"ready",createdAt:Date.parse("2026-10-13T00:00:00Z")}]});const html=renderToStaticMarkup(<FlightCase code="RG-QATEST" token="visual-fixture"/>);return html; }

export function renderDemoCall(){const facts={...sampleFlight(),airline:'Demo Air',bookedVia:'DemoTrips'};setProofData({drafts:[],demoView:{calls:[{label:'Simulated demo call',durationSeconds:30,transcript:'Made-up demo conversation. No real company.',readerOutput:{reply:{summary:'Demo payment reference supplied.'}}}],events:[],mails:0,replies:[],simulatedCalls:1,realCalls:0}});return renderToStaticMarkup(<PublicChaseDemo code='RG-QATEST' token='synthetic' data={{name:'Fixture Passenger',facts,amountPaise:540000,stage:'READY',chase:{active:true},demo:{phase:'ready',chasePhase:'confirm_ready',emailRequired:true,emailConfirmedAt:1,now:'2026-10-15'}}}/>);}
