import {callFixture} from '../calls';
const details={name:'Sample Passenger',pnr:'SAMPLE',amount:5400,date:'2026-10-25',code:'RG-N40001'};
const disclosure="Genie: Hi, I'm Refund Genie, an AI assistant calling for Sample Passenger with their permission. This call is recorded.";
export const n4KnownFacts={pnr:details.pnr,name:details.name,route:'Delhi to Mumbai'};
// Baseline fixtures deliberately preserve today's behaviour, including defects.
export function n4BaselineFixtures(){return [
 {id:'menu-then-person',source:'current simulated reference fixture',transcript:callFixture('reference',details)},
 {id:'second-person',source:'synthetic transfer using current repeat-disclosure instruction',transcript:`Menu: For refunds press 2.\nCare: Hello, how can I help?\n${disclosure}\nGenie: What is the refund status?\nCare: I will transfer you to refunds.\nTransfer: New person answers.\nCare: Hello, refunds desk.\n${disclosure}\nGenie: Can you share the bank reference?\nCare: It is SAMPLE-REF.`},
 {id:'otp-request',source:'current simulated identity fixture',transcript:callFixture('identity',details)},
];}
