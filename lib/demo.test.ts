import { describe, expect, it } from "vitest";
import { caseRecipient, demoMayReply, demoReplyBody, demoExpiry, demoPays, demoSubject, demoSheetPlatform, demoClockAfterSkip, emailAddresses } from "./demo";
const safe = { isDemo: true, code: "TB-DEMO01", subject: "Refund [TB-DEMO01]", from: "buyer@example.com", demoAddress: "demo@example.com", inboxAddress: "cases@example.com", replies: 0 };
describe("demo safety", () => {
  it("gives only demo cases the demo address", () => {
    expect(caseRecipient(true, safe.demoAddress, "support@example.com")).toBe(safe.demoAddress);
    expect(caseRecipient(false, safe.demoAddress, safe.demoAddress)).toBeUndefined();
    expect(caseRecipient(false, safe.demoAddress, "support@example.com")).toBe("support@example.com");
  });
  it("requires an actual demo case and its bracketed code in the subject", () => {
    expect(demoMayReply(safe)).toBe(true);
    expect(demoMayReply({ ...safe, isDemo: false })).toBe(false);
    expect(demoMayReply({ ...safe, subject: "Refund TB-DEMO01 elsewhere" })).toBe(false);
    expect(demoMayReply({ ...safe, subject: "Refund [TB-OTHER1]" })).toBe(false);
  });
  it("never responds to itself or the case inbox, including plus addresses", () => {
    for (const from of [safe.demoAddress, safe.inboxAddress, "cases+tb-demo01@example.com", "demo+test@example.com"]) expect(demoMayReply({ ...safe, from })).toBe(false);
  });
  it("recognises Gmail dot and googlemail aliases as the same inbox", () => {
    const gmail = { ...safe, demoAddress: "demo.desk@gmail.com", inboxAddress: "case.inbox@gmail.com" };
    for (const from of ["demodesk@gmail.com", "d.e.m.o.d.e.s.k+test@googlemail.com", "caseinbox@gmail.com", "c.a.s.e.i.n.b.o.x+test@googlemail.com"]) expect(demoMayReply({ ...gmail, from })).toBe(false);
  });
  it("never responds to auto-replies", () => {
    expect(demoMayReply({ ...safe, autoSubmitted: "auto-replied" })).toBe(false);
    expect(demoMayReply({ ...safe, precedence: "bulk" })).toBe(false);
    expect(demoMayReply({ ...safe, suppress: "All" })).toBe(false);
    expect(demoMayReply({ ...safe, from: "noreply@example.com" })).toBe(false);
  });
  it("caps replies at three and stops for expired cases", () => {
    expect(demoMayReply({ ...safe, replies: 2 })).toBe(true);
    expect(demoMayReply({ ...safe, replies: 3 })).toBe(false);
    expect(demoMayReply({ ...safe, expired: true })).toBe(false);
  });
  it("excludes demos from payments and expires them in seven days", () => {
    expect(demoPays(true, false)).toBe(true);
    expect(demoPays(false, false)).toBe(false);
    expect(demoExpiry(1000)).toBe(1000 + 7 * 86_400_000);
  });
  it("labels demo rows in the responses sheet without changing real platforms", () => {
    expect(demoSheetPlatform(true, "District")).toBe("Demo · District");
    expect(demoSheetPlatform(false, "District")).toBe("District");
  });
  it("labels all demo subjects while preserving the tracking code and real subjects", () => {
    for (const step of ["Refund for Sample Concert", "Refund follow-up", "Booking ID"]) {
      const subject = `${step} [TB-DEMO01]`;
      expect(demoSubject(true, subject)).toBe(`Demo: ${subject}`);
      expect(demoMayReply({ ...safe, subject: demoSubject(true, subject) })).toBe(true);
      expect(demoSubject(false, subject)).toBe(subject);
    }
    expect(demoSubject(true, "Demo: Refund [TB-DEMO01]")).toBe("Demo: Refund [TB-DEMO01]");
  });
  it("moves only the simulated clock past the promise", () => expect(demoClockAfterSkip("2026-10-07", "2026-10-21")).toBe("2026-10-31"));
  it("keeps the fixed three-round ladder and a visible footer", () => {
    const data = { platform: "District", event: "Sample Concert", amount: 2400, now: "2026-10-07", code: safe.code, bookingId: "SAMPLE-42" };
    expect(demoReplyBody({ ...data, round: 1 }).body).toContain("7 to 10 working days");
    expect(demoReplyBody({ ...data, round: 2 }).body).toContain("Please share your booking ID");
    expect(demoReplyBody({ ...data, round: 3 }).body).toContain("SAMPLE-42 has been processed");
    expect(demoReplyBody({ ...data, round: 3 }).footer).toContain("not from District");
    expect(emailAddresses('Buyer <buyer@example.com>, cases+tb-demo01@example.com')).toHaveLength(2);
  });
  it("keeps flight replies separate from the event ladder", () => {
    const data = {kind:"flight" as const, platform:"DemoTrips",event:"Sample domestic flight",amount:5400,now:"2026-10-10",cancellationDate:"2026-09-07",code:safe.code};
    const replies=[1,2,3].map(round=>demoReplyBody({...data,round}));
    expect(replies[0].body).toContain("pending with Demo Air");
    expect(replies[1].body).toContain("2026-09-14");
    expect(replies[1].body).not.toContain("share your booking ID");
    expect(replies[2].body).toContain("2026-10-14");
    expect(replies.every(reply=>reply.footer.includes("not from a real travel site or airline"))).toBe(true);
  });
});
