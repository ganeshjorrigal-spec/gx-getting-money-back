import { it, expect } from "vitest";
import {
  authorityLine,
  chaseAddressAllowed,
  chaseRecipientsAllowed,
  canChaseSend,
  chaseCompanyAddress,
  companyDayUsed,
  chaseBody,
} from "./chase";
it("permission names the company and PNR and allows stopping", () =>
  expect(authorityLine("Demo Air", "SAMPLE")).toBe(
    "I authorise Refund Genie to contact Demo Air about my refund for PNR SAMPLE, and to receive their replies for me. I can stop this any time.",
  ));
it("fails closed without a list and checks every To and CC including passenger", () => {
  expect(chaseAddressAllowed("test@example.invalid", undefined)).toBe(false);
  expect(
    chaseRecipientsAllowed(
      ["test@example.invalid", "other@example.invalid"],
      "test@example.invalid",
    ),
  ).toBe(false);
  expect(
    chaseRecipientsAllowed(["test@example.invalid"], "TEST@example.invalid"),
  ).toBe(true);
  expect(
    chaseAddressAllowed("test+other@example.invalid", "test@example.invalid"),
  ).toBe(false);
  expect(chaseAddressAllowed("demo+airline@gmail.com", "demo@gmail.com")).toBe(
    true,
  );
  expect(chaseAddressAllowed("other@gmail.com", "demo@gmail.com")).toBe(false);
});
it("stops immediately at dispatch and rejects a daily duplicate or unknown delivery", () => {
  const args = {
    active: true,
    closed: false,
    allowed: true,
    sendGranted: true,
    usedToday: 0,
    draftSent: false,
    uncertain: false,
  };
  expect(canChaseSend(args)).toBe(true);
  for (const change of [
    { active: false },
    { closed: true },
    { allowed: false },
    { sendGranted: false },
    { usedToday: 1 },
    { draftSent: true },
    { uncertain: true },
  ])
    expect(canChaseSend({ ...args, ...change })).toBe(false);
});
it("only uses playbook recipients or an actual sender on a known company domain", () => {
  expect(chaseCompanyAddress("nodalofficer@goindigo.in", ["IndiGo"], [])).toBe(
    true,
  );
  expect(
    chaseCompanyAddress(
      "case-team@goindigo.in",
      ["IndiGo"],
      ["case-team@goindigo.in"],
    ),
  ).toBe(true);
  expect(
    chaseCompanyAddress(
      "outsider@example.invalid",
      ["IndiGo"],
      ["outsider@example.invalid"],
    ),
  ).toBe(false);
  expect(chaseCompanyAddress("other@goindigo.in", ["IndiGo"], [])).toBe(false);
});
it("counts a company in CC against its daily limit too", () => {
  expect(
    companyDayUsed(["Demo Air"], [{ companies: ["DemoTrips", "Demo Air"] }]),
  ).toBe(true);
  expect(companyDayUsed(["Demo Air"], [{ companies: ["Other Demo"] }])).toBe(
    false,
  );
});
it("puts typed authority at the start of the mail and distinguishes the first attachment", () => {
  expect(
    chaseBody("Dear desk,\n\nRefund please.", "Demo Passenger", true),
  ).toContain("Dear desk,\n\nI am writing on behalf of Demo Passenger");
  expect(chaseBody("Refund please.", "Demo Passenger", false)).toMatch(
    /^I am writing on behalf/,
  );
  expect(chaseBody("Refund please.", "Demo Passenger", false)).toContain(
    "previously attached",
  );
});
