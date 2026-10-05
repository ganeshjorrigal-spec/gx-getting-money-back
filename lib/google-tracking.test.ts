import { describe, expect, it } from "vitest";
import { buildMailto } from "./outbound";
import { caseInboxAddress, codedSubject, checkinEvent, gmailTestAllowed, gmailTestCaseAllowed, gmailTestConfigured, messageMatchesCase, replyAlertEvent } from "./google-tracking";

describe("test Gmail access", () => {
  it("allows only named test accounts before the paid tier is enabled", () => {
    const list = "test.one@example.com, case.inbox@example.com";
    expect(gmailTestConfigured(false, list)).toBe(true);
    expect(gmailTestAllowed("TEST.ONE@example.com", false, list)).toBe(true);
    expect(gmailTestAllowed("stranger@example.com", false, list)).toBe(false);
    expect(gmailTestAllowed("stranger@example.com", true, undefined)).toBe(true);
    expect(gmailTestCaseAllowed("TB-ABC123", false, "TB-ABC123")).toBe(true);
    expect(gmailTestCaseAllowed("TB-OTHER1", false, "TB-ABC123")).toBe(false);
  });
});
import { decryptToken, encryptToken } from "./token-crypto";

describe("case reply tracking", () => {
  it("puts the case code in the subject and CC address without replacing the user's recipient", () => {
    const code = "TB-A9AEFG";
    const subject = codedSubject("Refund for Monsoon Live", code);
    const cc = caseInboxAddress("tickback.cases@gmail.com", code);
    const mail = buildMailto("support@example.com", subject, "My refund has not arrived.", cc);
    const url = new URL(mail.url);
    expect(decodeURIComponent(url.pathname)).toBe("support@example.com");
    expect(url.searchParams.get("subject")).toBe("Refund for Monsoon Live [TB-A9AEFG]");
    expect(url.searchParams.get("cc")).toBe("tickback.cases+TB-A9AEFG@gmail.com");
    expect(codedSubject(subject, code)).toBe(subject);
  });

  it("accepts only a later reply carrying this case code, and excludes our own message", () => {
    const candidate = { to: "tickback.cases+TB-A9AEFG@gmail.com", subject: "Re: refund", from: "organiser@example.com", code: "TB-A9AEFG", inbox: "tickback.cases@gmail.com", ownEmail: "tickback.cases@gmail.com", sentAt: 1000, receivedAt: 2000 };
    expect(messageMatchesCase(candidate)).toBe(true);
    expect(messageMatchesCase({ ...candidate, code: "TB-OTHER1" })).toBe(false);
    expect(messageMatchesCase({ ...candidate, receivedAt: 1000 })).toBe(false);
    expect(messageMatchesCase({ ...candidate, from: "tickback.cases@gmail.com" })).toBe(false);
  });

  it("makes a five-minute reply alert with one pop-up and a separate check-in", () => {
    const alert = replyAlertEvent({ id: "tb123", platform: "BookMyShow", amountPaise: 350000, nextStep: "Read their reply", link: "https://example.com/c#k=secret", now: Date.parse("2026-10-05T10:00:00Z") });
    expect(alert.summary).toBe("BookMyShow replied about your ₹3,500 refund");
    expect(alert.start.dateTime).toBe("2026-10-05T10:05:00.000Z");
    expect(alert.end.dateTime).toBe("2026-10-05T10:20:00.000Z");
    expect(alert.reminders).toEqual({ useDefault: false, overrides: [{ method: "popup", minutes: 0 }] });
    const checkin = checkinEvent({ id: "tb456", platform: "BookMyShow", date: "2026-10-24", link: "https://example.com/c#k=secret" });
    expect(checkin.start.dateTime).toBe("2026-10-24T10:00:00+05:30");
    expect(checkin.id).not.toBe(alert.id);
  });
});

describe("Google refresh token storage", () => {
  it("round trips a token through AES-GCM and rejects tampering", async () => {
    const previous = process.env.TOKEN_ENC_KEY;
    process.env.TOKEN_ENC_KEY = Buffer.alloc(32, 37).toString("base64");
    try {
      const encrypted = await encryptToken("test-refresh-token");
      expect(encrypted).not.toContain("test-refresh-token");
      expect(await decryptToken(encrypted)).toBe("test-refresh-token");
      await expect(decryptToken(`${encrypted.slice(0, -2)}AA`)).rejects.toThrow();
    } finally {
      if (previous === undefined) delete process.env.TOKEN_ENC_KEY;
      else process.env.TOKEN_ENC_KEY = previous;
    }
  });
});
