import {it,expect} from "vitest";
import {visibleTimeline} from "./timeline";
it("shows only one row per event type and minute, preserving different types and minutes",()=>{
 const rows=[{type:"draft_written",createdAt:120001,summary:"Prepared FLIGHT_mail"},{type:"draft_written",createdAt:120000,summary:"Prepared FLIGHT_mail"},{type:"marked_sent",createdAt:120000,summary:"You sent the FLIGHT_mail message"},{type:"draft_written",createdAt:60000,summary:"Prepared FLIGHT_mail"}];
 expect(visibleTimeline(rows,"MakeMyTrip").map(r=>r.summary)).toEqual(["Mail to MakeMyTrip ready","Mail sent to MakeMyTrip","Mail to MakeMyTrip ready"]);
});
it("turns other internal steps into plain action names",()=>{
 const rows=[{type:"draft_written",createdAt:1,summary:"Prepared FLIGHT_bank"},{type:"answered",createdAt:2,summary:"You answered paymentMethod"},{type:"marked_sent",createdAt:3,summary:"You sent the L1 message"}];
 const text=visibleTimeline(rows,"District").map(r=>r.summary).join(" ");expect(text).not.toMatch(/FLIGHT_|paymentMethod|L1/);expect(text).toContain("Bank tracing message ready");
});
