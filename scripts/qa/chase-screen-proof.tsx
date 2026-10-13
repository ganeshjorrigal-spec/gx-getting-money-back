import React from "react";
import {renderToStaticMarkup} from "react-dom/server";
import {setProofData} from "./restyle-query-fixture";
import FlightCase from "../../app/c/flight-case-view";
import {sampleFlight} from "../../lib/flight-sample";
import {planFlight} from "../../lib/flight";
export function renderEscalation(){return buildHtml();}
function buildHtml(){const facts=sampleFlight();facts.cancellationDate="2026-09-01";const plan=planFlight(facts,"2026-10-13");setProofData({item:{code:"RG-QATEST",refundType:"flight",stage:"READY",route:plan.route,facts,flightPlan:plan,createdAt:Date.parse("2026-10-13T00:00:00Z"),updatedAt:Date.parse("2026-10-13T00:00:00Z"),factsConfirmedAt:1,chase:{active:true,letterUrl:null},publicAppUrl:"https://refundgenie.app",trialLanded:0,trialLimit:3,trialLocked:false},drafts:[{_id:"fixture",channel:"email",to:plan.to,cc:plan.cc,body:plan.body,subject:"Demo refund [RG-QATEST]",status:"ready",createdAt:Date.parse("2026-10-13T00:00:00Z")}]});const html=renderToStaticMarkup(<FlightCase code="RG-QATEST" token="visual-fixture"/>);return html; }
