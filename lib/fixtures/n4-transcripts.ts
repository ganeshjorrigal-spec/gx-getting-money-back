import {callFixture} from '../calls';
const details={name:'Sample Passenger',pnr:'SAMPLE',amount:5400,date:'2026-10-25',code:'RG-N40001'};
const disclosure="Genie: Hi, I'm Refund Genie, an AI assistant calling for Sample Passenger with their permission. This call is recorded.";
export const n4KnownFacts={pnr:details.pnr,name:details.name,route:'Delhi to Mumbai'};
const oldOpening=`Genie: Hello, I'm an AI assistant from Refund Genie, calling on behalf of ${details.name}, with their permission, about a refund for PNR ${details.pnr}.`;
const oldStart=`${oldOpening}\nMenu: For refunds, press 2.\nGenie: [Pressed 2]\nMenu: Please hold. [Hold music, 20 seconds]\nCare: Please give the PNR.\nGenie: ${details.pnr}. What is the refund status, processing date, who has the money, and reference?`;
const oldReference=`${oldStart}\nCare: Demo Air paid Rs ${details.amount} to DemoTrips on ${details.date}. Airline reference DEMO-AIR-${details.code}. DemoTrips now has the refund.\nGenie: Thank you. I will ask DemoTrips for the bank transfer reference. Goodbye.`;
const oldIdentity=`${oldStart}\nCare: We need an OTP to prove the passenger's identity.\nGenie: I'll connect the passenger now.\nTransfer: [Simulated patch-in requested, no phone dialled]\nGenie to passenger: I reached the demo airline refund desk about your PNR. They need to speak to you to verify identity. I have shared no private code.\nTransfer: [Simulated passenger did not answer]\nGenie: The passenger will call back. Thank you, goodbye.`;
// Baseline fixtures deliberately preserve today's behaviour, including defects.
export function n4BaselineFixtures(){return [
 {id:'menu-then-person',source:'current simulated reference fixture',transcript:oldReference},
 {id:'second-person',source:'synthetic transfer using current repeat-disclosure instruction',transcript:`Menu: For refunds press 2.\nCare: Hello, how can I help?\n${disclosure}\nGenie: What is the refund status?\nCare: I will transfer you to refunds.\nTransfer: New person answers.\nCare: Hello, refunds desk.\n${disclosure}\nGenie: Can you share the bank reference?\nCare: It is SAMPLE-REF.`},
 {id:'otp-request',source:'current simulated identity fixture',transcript:oldIdentity},
];}

export function n4CurrentFixtures(){return [
 {id:'menu-then-person',transcript:callFixture('reference',details)},
 {id:'second-person',transcript:`Menu: For refunds press 2.\nCare: Hello, how can I help?\n${disclosure}\nGenie: What is the refund status?\nCare: I will transfer you to refunds.\nTransfer: New person answers.\nCare: Hello, refunds desk.\nGenie: With the passenger's permission, I am Refund Genie, an AI assistant; this conversation is being recorded.\nGenie: Can you confirm whether the refund was processed?\nCare: It was processed on 25 October, and DemoTrips holds it.\nGenie: Can you share the bank reference?\nCare: It is SAMPLE-REF.\nGenie: Thank you for confirming the refund details. Goodbye.`},
 {id:'otp-request',transcript:callFixture('identity',details)},
];}
