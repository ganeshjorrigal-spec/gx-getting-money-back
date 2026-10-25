/// <reference types="vite/client" />
import { afterEach, beforeEach, expect, it, vi } from "vitest";
import { convexTest } from "convex-test";
import schema from "../convex/schema";
import { api, internal } from "../convex/_generated/api";
import { hashToken } from "../convex/lib/access";
import { emailAddresses } from "./demo";

const transport = vi.hoisted(() => ({ accessToken: vi.fn(), listMessages: vi.fn(), getMessage: vi.fn(), googleJson: vi.fn() }));
vi.mock("../convex/googleActions", async original => ({ ...await original<Record<string, unknown>>(), ...transport }));
const modules = import.meta.glob("../convex/**/*.ts");
beforeEach(() => {
  vi.useFakeTimers();
  vi.stubEnv("GEMINI_MODEL", "");
  vi.stubEnv("TICKBACK_DEMO_ADDRESS", "desk@example.invalid");
  vi.stubEnv("TICKBACK_INBOX_ADDRESS", "inbox@example.invalid");
  transport.accessToken.mockResolvedValue("synthetic-access");
  transport.listMessages.mockResolvedValue([{ id: "synthetic-message", threadId: "synthetic-thread" }]);
  transport.googleJson.mockResolvedValue({ threadId: "synthetic-thread" });
});
afterEach(() => { vi.clearAllTimers(); vi.useRealTimers(); vi.unstubAllEnvs(); vi.clearAllMocks(); });

async function fixture(confirmed = false, newDemo = false) {
  const t = convexTest(schema, modules);
  const token = "x".repeat(43);
  await t.run(ctx => ctx.db.insert("googleConnections", { kind: "demo", email: "desk@example.invalid", encryptedRefreshToken: "synthetic", connectedAt: 1 }));
  await t.run(ctx => ctx.db.insert("googleConnections", { kind: "inbox", email: "inbox@example.invalid", encryptedRefreshToken: "synthetic", connectedAt: 1 }));
  const { code } = await t.mutation(api.demo.create, { platform: "district", tokenHash: await hashToken(token), deviceId: "synthetic-device-id" });
  const caseId = await t.run(async ctx => {
    const item = (await ctx.db.query("cases").withIndex("by_code", q => q.eq("code", code)).unique())!;
    const letterId = await ctx.storage.store(new Blob(["synthetic permission"]));
    await ctx.db.patch(item._id, { stage: "WAITING", email: "passenger@example.invalid", demo: { ...item.demo!, ...(newDemo ? { chaseStory: true, emailRequired: true } : {}), ...(confirmed ? { emailConfirmedAt: Date.now() } : {}), session: "synthetic-session", phase: "waiting_organiser", deadline: Date.now() + 120000 }, ...(newDemo ? { chase: { active: true, name: "Demo Passenger", mobile: "", email: "passenger@example.invalid", authorisedAt: 1, letterId, encryptedCaseToken: "synthetic" } } : {}) });
    const draftId = await ctx.db.insert("drafts", { caseId: item._id, step: "L0_email", channel: "email", subject: "Synthetic demo", body: "Synthetic demo", attachChecklist: [], status: "sent", createdAt: Date.now() });
    await ctx.db.insert("gmailWatches", { caseId: item._id, draftId, sentAt: Date.now() });
    return item._id;
  });
  transport.getMessage.mockResolvedValue({ id: "synthetic-message", threadId: "synthetic-thread", internalDate: String(Date.now() + 1), payload: { headers: [{ name: "From", value: "attacker@example.invalid" }, { name: "To", value: "desk@example.invalid, stranger@example.invalid" }, { name: "Cc", value: "another-stranger@example.invalid" }, { name: "Subject", value: `Refund [${code}]` }, { name: "Message-ID", value: "<synthetic-message@example.invalid>" }] } });
  return { t, caseId, code };
}

function sentRecipients() {
  const sends = transport.googleJson.mock.calls.filter(([url]) => String(url).endsWith("messages/send"));
  expect(sends).toHaveLength(1);
  const raw = Buffer.from(JSON.parse(sends[0][2].body).raw, "base64url").toString();
  return { raw, recipients: raw.split("\r\n").filter(line => /^(To|Cc|Bcc):/.test(line)).flatMap(emailAddresses) };
}

it("keeps the page-used legacy demo but sends its reply only to the case inbox", async () => {
  const f = await fixture();
  await f.t.action(internal.demoActions.checkOrganiser, { caseId: f.caseId, session: "synthetic-session" });
  const { recipients } = sentRecipients();
  expect([...new Set(recipients)]).toEqual([`inbox+${f.code.toLowerCase()}@example.invalid`]);
  const reply = await f.t.run(ctx => ctx.db.query("demoReplies").withIndex("by_case", q => q.eq("caseId", f.caseId)).first());
  expect(reply?.status).toBe("sent");
  expect((await f.t.run(ctx => ctx.db.get(f.caseId)))?.demo?.phase).toBe("waiting_inbox");
  // The passenger still sees the reply on their case, through our own inbox.
  transport.getMessage.mockResolvedValue({ id: "synthetic-reply", threadId: "synthetic-thread", internalDate: String(Date.now() + 2), payload: { mimeType: "text/plain", body: { data: Buffer.from("Demo refund initiated. Allow 7 to 10 working days.").toString("base64url") }, headers: [{ name: "From", value: "desk@example.invalid" }, { name: "To", value: `inbox+${f.code}@example.invalid` }, { name: "Subject", value: `Demo: Refund [${f.code}]` }, { name: "Message-ID", value: "<synthetic-reply@example.invalid>" }] } });
  await f.t.action(internal.demoActions.checkCaseInbox, { caseId: f.caseId, session: "synthetic-session" });
  expect(await f.t.run(ctx => ctx.db.get(f.caseId))).toMatchObject({ stage: "TRIAGING", demo: { round: 1, phase: "ready" } });
  expect((await f.t.run(ctx => ctx.db.query("inputs").withIndex("by_case", q => q.eq("caseId", f.caseId)).collect())).some(input => input.kind === "reply" && input.sender === "desk@example.invalid")).toBe(true);
});

it("sends the confirmed demo only to the case inbox and confirmed passenger, ignoring incoming To and CC", async () => {
  const f = await fixture(true, true);
  await f.t.action(internal.demoActions.checkOrganiser, { caseId: f.caseId, session: "synthetic-session" });
  const { recipients } = sentRecipients();
  expect([...new Set(recipients)].sort()).toEqual([`inbox+${f.code.toLowerCase()}@example.invalid`, "passenger@example.invalid"].sort());
});

it("does not mail an unconfirmed newer demo or reserve a reply for it", async () => {
  const f = await fixture(false, true);
  await f.t.action(internal.demoActions.checkOrganiser, { caseId: f.caseId, session: "synthetic-session" });
  expect(transport.googleJson).not.toHaveBeenCalled();
  expect(await f.t.run(ctx => ctx.db.query("demoReplies").withIndex("by_case", q => q.eq("caseId", f.caseId)).collect())).toEqual([]);
});
