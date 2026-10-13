import {it,expect} from "vitest";
import {planFlight} from "./flight";
import {sampleFlight} from "./flight-sample";
import {isPassengerEscalation,escalationSendLine} from "./chase-escalation";
import {finishMail} from "./mail-copy";
import {chaseNext} from "./chase-view";
it("shows user sending and leaves first-person escalation body without a chase prefix",()=>{const facts=sampleFlight();facts.cancellationDate="2026-09-01";const plan=planFlight(facts,"2026-10-13");const item={refundType:"flight",stage:"READY",flightPlan:plan,chase:{active:true}};const draft={to:plan.to,status:"ready"};expect(isPassengerEscalation(item,draft)).toBe(true);expect(chaseNext(item,{...draft,to:draft.to??undefined},null,"MakeMyTrip",false)).toBe(escalationSendLine);expect(finishMail(plan.body!,"RG-QATEST")).not.toContain("I am writing on behalf of");});
it("leaves support-level follow-up available and early status user-only",()=>{const item={refundType:"flight",stage:"READY",flightPlan:{rung:2,nextPerson:{role:"Customer support email",email:"support@example.invalid"}},chase:{active:true}};const draft={to:"support@example.invalid",status:"ready"};expect(isPassengerEscalation(item,draft)).toBe(false);expect(chaseNext(item,draft,null,"support",false)).toContain("mail support");expect(chaseNext({...item,flightPlan:{...item.flightPlan,nextStep:"FLIGHT_status"}},draft,null,"support",false)).toContain("You can send the optional status mail yourself");});
