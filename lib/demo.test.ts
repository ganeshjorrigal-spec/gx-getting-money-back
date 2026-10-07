import { describe, expect, it } from "vitest";
import { caseRecipient, demoMayReply, demoReplyBody, demoExpiry, demoPays, demoSheetPlatform, demoClockAfterSkip, emailAddresses } from "./demo";
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
  it("moves only the simulated clock past the promise", () => expect(demoClockAfterSkip("2026-10-07", "2026-10-21")).toBe("2026-10-31"));
  it("keeps the fixed three-round ladder and a visible footer", () => {
    const data = { platform: "District", event: "Sample Concert", amount: 2400, now: "2026-10-07", code: safe.code, bookingId: "SAMPLE-42" };
    expect(demoReplyBody({ ...data, round: 1 }).body).toContain("7 to 10 working days");
    expect(demoReplyBody({ ...data, round: 2 }).body).toContain("Please share your booking ID");
    expect(demoReplyBody({ ...data, round: 3 }).body).toContain("SAMPLE-42 has been processed");
    expect(demoReplyBody({ ...data, round: 3 }).footer).toContain("not from District");
    expect(emailAddresses('Buyer <buyer@example.com>, cases+tb-demo01@example.com')).toHaveLength(2);
  });
});
