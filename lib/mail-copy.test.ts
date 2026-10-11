import { describe,it,expect } from "vitest";
import { greeting, finishMail } from "./mail-copy";
import { planFlight } from "./flight";
import { sampleFlight } from "./flight-sample";
import { draftForCase } from "../convex/lib/draft";
import { caseReadSchema } from "../convex/lib/read";
describe("mail handed to the passenger",()=>{
 it("greets a named officer without calling them a team",()=>expect(greeting({value:"Ms. Sample Officer, officer@example.com",role:"Grievance Officer"})).toBe("Dear Ms. Sample Officer,"));
 it("greets the role when no name is held",()=>expect(greeting({value:"officer@example.com",role:"Nodal Officer"})).toBe("Dear Nodal Officer,"));
 it("keeps counting notes out of each flight mail",()=>{for(const claim of ["none","waiting_airline","paid_site","credit_shell","not_paid","asks_details","destination_wrong"] as const){const read=sampleFlight();read.reply={...read.reply,claim,confidence:1,fromCompany:"MakeMyTrip",paidDate:"2026-10-01",paymentDestination:"travel_site"};const p=planFlight(read,"2026-10-11");expect(p.body).not.toMatch(/Refund Genie counts|our reading|holidays|Refund Genie's reading/i);if(claim==="none"){expect(p.body).toContain("14 working days");expect(p.body).toContain("25 Sep 2026");}}});
 it("puts the case reference above the sign-off exactly once",()=>{for(const code of ["RG-ABC123","TB-ABC123"]){const body=finishMail("Dear Support team,\n\nPlease check.\n\nThank you.",code);expect(body).toContain(`Please reply to all on this mail and keep ${code} in the subject, so my records stay in one thread.\n\nThank you.`);expect(finishMail(body,code)).toBe(body);}});
 it("lists only attachments the user selected",()=>{expect(finishMail("Please check.\n\nThank you.","RG-ABC123",["cancellation mail","payment receipt"])).toContain("Attached: cancellation mail, payment receipt.");expect(finishMail("Please check.","RG-ABC123")).not.toContain("Attached:");});
});
