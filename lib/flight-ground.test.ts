import {it,expect} from "vitest";
import {sampleFlight} from "./flight-sample";
import {groundFlightRead} from "./flight-ground";
import {flightLookIn,flightWorkingDelay,flightWorkCount,flightSendCheckDate,planFlight} from "./flight";
it("rejects made-up dates, references and model confirmation",()=>{
 const a=sampleFlight();a.reply={...a.reply,claim:"processed_reference",fromCompany:"MakeMyTrip",reference:"INVENTED",paidDate:"2026-10-01",promisedDate:"2026-10-09"};a.replyConfirmed=true;
 const r=groundFlightRead(a,"The refund is processed",a);
 expect(r.reply.reference).toBeNull();expect(r.reply.promisedDate).toBeNull();expect(r.reply.paidDate).toBeNull();expect(r.replyConfirmed).toBe(false);
});
it("keeps stated dates and forces an unknown actual sender through confirmation",()=>{
 const a=sampleFlight();a.reply={...a.reply,claim:"paid_site",fromCompany:"IndiGo",paidDate:"2026-10-02"};
 const r=groundFlightRead(a,"IndiGo paid MakeMyTrip on 2 Oct 2026",a,false,"not-an-officer@example.test");
 expect(r.reply.paidDate).toBe("2026-10-02");expect(planFlight(r,"2026-10-09").route).toBe("NEED_INFO");
});
it("checks the exact direct look-in boundary, never travel-site bookings",()=>{
 const a={...sampleFlight(),bookedVia:"direct",cancelledBy:"passenger" as const,bookingTime:"2026-09-07T10:00:00+05:30",cancellationTime:"2026-09-09T10:00:00+05:30",departureDate:"2026-09-14"};
 expect(flightLookIn(a)).toBe(true);expect(flightLookIn({...a,cancellationTime:"2026-09-09T10:01:00+05:30"})).toBe(false);expect(flightLookIn({...a,bookedVia:"MakeMyTrip"})).toBe(false);expect(flightLookIn({...a,departureDate:"2026-09-13"})).toBe(false);
 expect(flightLookIn({...a,bookingTime:"2026-09-07",cancellationTime:"2026-09-09"})).toBe(false);
});
it("uses the transfer destination instead of a mistaken claim label",()=>{
 const a=sampleFlight();
 const site=planFlight({...a,reply:{...a.reply,fromCompany:"IndiGo",pointsAt:"MakeMyTrip",claim:"processed_reference",reference:"AIR-SAMPLE",paidDate:"2026-10-02"}},"2026-10-09");
 expect(site.route).toBe("OVERDUE");expect(site.moneyWith).toBe("MakeMyTrip");expect(site.dueDate).toBe("2026-10-03");
 const passenger=planFlight({...a,reply:{...a.reply,fromCompany:"MakeMyTrip",pointsAt:"passenger",claim:"paid_site",reference:"UTR-SAMPLE",paidDate:"2026-10-02"}},"2026-10-09");
 expect(passenger.route).toBe("TRACE");expect(passenger.dueDate).toBeNull();
});
it("requires a known destination before using a refund reference",()=>{
 const a=sampleFlight();const p=planFlight({...a,reply:{...a.reply,fromCompany:"IndiGo",claim:"processed_reference",reference:"REF-SAMPLE"}},"2026-10-09");
 expect(p.route).toBe("NEED_INFO");expect(p.questions[0].id).toBe("transferDestination");
});
it("never adds an automatic bank date when marking a bank message done",()=>{
 expect(flightSendCheckDate("bank","2026-10-09",null)).toBeNull();
 expect(flightSendCheckDate("bank","2026-10-09","2026-10-14")).toBe("2026-10-14");
 expect(flightSendCheckDate("bank","2026-10-09","2026-10-02")).toBeNull();
 expect(flightSendCheckDate("email","2026-10-09")).toBe("2026-10-16");
 expect(flightSendCheckDate("portal","2026-10-09")).toBe("2026-11-08");
});
it("seeks taxes and excess cancellation charge but not a disclosed agent fee",()=>{
 const a={...sampleFlight(),cancelledBy:"passenger" as const,nonRefundable:true,taxes:1000,baseFare:3000,fuel:500,cancellationCharge:4000};
 expect(planFlight(a,"2026-10-09").amountOwed).toBe(1500);expect(planFlight({...a,taxesReturned:true},"2026-10-09").route).toBe("NO_ROUTE");
});
it("opens AirSewa and NCH with labelled waits, never inventing portal mail",()=>{
 expect(planFlight(sampleFlight(),"2026-10-09",{rung:4}).nextStep).toBe("FLIGHT_airsewa");
 const p=planFlight(sampleFlight(),"2026-10-09",{rung:5});expect(p.to).toBeNull();expect(p.channel).toBe("portal");expect(p.body).toContain("1915");
});
it("counts work from known events and ignores unrelated entries",()=>{
 const events=[{type:"confirmed",actor:"user"},{type:"draft_opened",actor:"user"},{type:"marked_sent",actor:"user"},{type:"landed",actor:"user"},{type:"reply_read",actor:"agent"},{type:"date_set",actor:"agent"},{type:"date_set",actor:"agent"},{type:"draft_written",actor:"agent"},{type:"created",actor:"user"}];
 expect(flightWorkCount(events)).toEqual({taps:4,replies:1,dates:2,drafts:1});
});


it("never reuses an old reply date for the newest reply",()=>{const a=sampleFlight();a.reply={...a.reply,claim:"under_review",promisedDate:"2026-10-14"};expect(groundFlightRead(a,"Old promise: 14 Oct 2026. New: under review",a,false,undefined,false,"New: under review").reply.promisedDate).toBeNull();});
it("keeps compensation-only and no-ticket failures outside the refund ladder",()=>{for(const scopeIssue of ["failed_no_ticket","compensation_only"] as const)expect(planFlight({...sampleFlight(),scopeIssue},"2026-10-10").route).toBe("OUT_OF_SCOPE");});

it("counts approximate overdue working days without weekends or negative delays",()=>{expect(flightWorkingDelay("2026-09-25","2026-10-10")).toBe(10);expect(flightWorkingDelay("2026-10-09","2026-10-12")).toBe(1);expect(flightWorkingDelay("2026-10-14","2026-10-10")).toBe(0);});
