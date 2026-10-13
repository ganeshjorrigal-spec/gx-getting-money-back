/// <reference types="vite/client" />
import { convexTest } from "convex-test";
import { it, expect, vi, beforeEach, afterEach } from "vitest";
import schema from "../convex/schema";
import { api, internal } from "../convex/_generated/api";
import { hashToken } from "../convex/lib/access";
const modules = import.meta.glob("../convex/**/*.ts");
const token = "x".repeat(43),
  code = "RG-SAMPLE";
beforeEach(() => {
  vi.useFakeTimers();
  vi.stubEnv("CHASE_ALLOWLIST", "desk@gmail.com,passenger@example.invalid");
  vi.stubEnv("CHASE_REAL_COMPANIES_ENABLED", "");
});
afterEach(() => {
  vi.clearAllTimers();
  vi.useRealTimers();
  vi.unstubAllEnvs();
});
it("registers Gmail's delivered message ID rather than the supplied ID", async () => {
  const f = await fixture();
  const reserved = await f.t.mutation(internal.chase.reserve, {
    caseId: f.caseId,
    draftId: f.draftId,
  });
  await f.t.mutation(internal.chase.delivered, {
    id: reserved!._id,
    threadId: "test-thread",
    gmailId: "test-gmail-id",
    messageId: "<gmail-assigned@example.invalid>",
  });
  expect(
    await f.t.query(internal.chase.demoMessage, {
      caseId: f.caseId,
      messageId: "<gmail-assigned@example.invalid>",
    }),
  ).toBe(true);
  expect(
    await f.t.query(internal.chase.demoMessage, {
      caseId: f.caseId,
      messageId: reserved!.messageId,
    }),
  ).toBe(false);
});
it("records accepted mail after Stop without restarting watchers or the chase", async () => {
  const f = await fixture();
  const reserved = await f.t.mutation(internal.chase.reserve, {
    caseId: f.caseId,
    draftId: f.draftId,
  });
  await f.t.mutation(api.chase.stop, { code, token });
  await f.t.mutation(internal.chase.delivered, {
    id: reserved!._id,
    threadId: "test-thread",
    gmailId: "test-gmail-id",
    messageId: "<gmail-assigned@example.invalid>",
  });
  const result = await f.t.run(async (ctx) => ({
    item: await ctx.db.get(f.caseId),
    watches: await ctx.db
      .query("gmailWatches")
      .withIndex("by_case", (q) => q.eq("caseId", f.caseId))
      .take(10),
  }));
  expect(result.item!.chase!.active).toBe(false);
  expect(result.watches).toHaveLength(0);
});
async function fixture() {
  const t = convexTest(schema, modules);
  const ids = await t.run(async (ctx) => {
    const letterId = await ctx.storage.store(new Blob(["test authority"]));
    const caseId = await ctx.db.insert("cases", {
      code,
      tokenHash: await hashToken(token),
      stage: "READY",
      refundType: "flight",
      factsConfirmedAt: 1,
      ladderLevel: 2,
      draftsShown: 1,
      tier: "free_check",
      paidState: "none",
      createdAt: 1,
      updatedAt: 1,
      facts: { airline: "Demo Air", bookedVia: "DemoTrips", pnr: "SAMPLE" },
      route: "OVERDUE",
      owner: "DemoTrips",
      flightPlan: { nextPerson: { company: "DemoTrips" } },
      demo: {
        kind: "flight",
        round: 1,
        phase: "ready",
        now: "2026-10-11",
        expiresAt: Date.now() + 86400000,
      },
      chase: {
        active: true,
        name: "Demo Passenger",
        mobile: "0000000000",
        email: "passenger@example.invalid",
        authorisedAt: 1,
        letterId,
        encryptedCaseToken: "test",
      },
    });
    const draftId = await ctx.db.insert("drafts", {
      caseId,
      step: "FLIGHT_mail",
      channel: "email",
      to: "desk+travelsite@gmail.com",
      cc: ["desk+airline@gmail.com"],
      subject: `Demo [${code}]`,
      body: "Dear desk,\n\nTest.",
      attachChecklist: [],
      status: "ready",
      createdAt: 1,
    });
    const connectionId = await ctx.db.insert("googleConnections", {
      kind: "inbox",
      chaseSendGranted: true,
      encryptedRefreshToken: "test",
      connectedAt: 1,
    });
    return { caseId, draftId, connectionId };
  });
  return { t, ...ids };
}
it("reserves once and counts both company roles in a single mail", async () => {
  const f = await fixture();
  const args = { caseId: f.caseId, draftId: f.draftId };
  expect(await f.t.mutation(internal.chase.reserve, args)).toMatchObject({
    state: "reserved",
    companies: ["DemoTrips", "Demo Air"],
  });
  expect(await f.t.mutation(internal.chase.reserve, args)).toBeNull();
});
it("fails closed for missing Gmail send permission or an unlisted CC", async () => {
  const f = await fixture();
  await f.t.run((ctx) =>
    ctx.db.patch(f.connectionId, { chaseSendGranted: false }),
  );
  expect(
    await f.t.mutation(internal.chase.reserve, {
      caseId: f.caseId,
      draftId: f.draftId,
    }),
  ).toBeNull();
  await f.t.run(async (ctx) => {
    await ctx.db.patch(f.connectionId, { chaseSendGranted: true });
    await ctx.db.patch(f.draftId, { cc: ["outside@example.invalid"] });
  });
  expect(
    await f.t.mutation(internal.chase.reserve, {
      caseId: f.caseId,
      draftId: f.draftId,
    }),
  ).toBeNull();
});
it("Stop blocks an already reserved worker and later reservation", async () => {
  const f = await fixture();
  await f.t.mutation(internal.chase.reserve, {
    caseId: f.caseId,
    draftId: f.draftId,
  });
  await f.t.mutation(api.chase.stop, { code, token });
  expect(
    await f.t.query(internal.chase.stillActive, {
      caseId: f.caseId,
      authorisedAt: 1,
      draftId: f.draftId,
    }),
  ).toBe(false);
  expect(
    await f.t.mutation(internal.chase.reserve, {
      caseId: f.caseId,
      draftId: f.draftId,
    }),
  ).toBeNull();
  expect(await f.t.query(internal.chase.load, { caseId: f.caseId })).toBeNull();
});
it("keeps non-demo cases off even if their recipient is on the test list", async () => {
  const f = await fixture();
  await f.t.run((ctx) => ctx.db.patch(f.caseId, { demo: undefined }));
  expect(
    await f.t.mutation(internal.chase.reserve, {
      caseId: f.caseId,
      draftId: f.draftId,
    }),
  ).toBeNull();
});
it("never dispatches a stale draft", async () => {
  const f = await fixture();
  await f.t.run((ctx) =>
    ctx.db.insert("drafts", {
      caseId: f.caseId,
      step: "new",
      channel: "email",
      to: "desk@gmail.com",
      body: "new",
      attachChecklist: [],
      status: "ready",
      createdAt: 2,
    }),
  );
  expect(
    await f.t.mutation(internal.chase.reserve, {
      caseId: f.caseId,
      draftId: f.draftId,
    }),
  ).toBeNull();
  expect(
    await f.t.query(internal.chase.stillActive, {
      caseId: f.caseId,
      authorisedAt: 1,
      draftId: f.draftId,
    }),
  ).toBe(false);
});
it("limits a second company mail to another day and leaves uncertain delivery unretried", async () => {
  const f = await fixture();
  const args = { caseId: f.caseId, draftId: f.draftId };
  const reserved = await f.t.mutation(internal.chase.reserve, args);
  await f.t.mutation(internal.chase.uncertain, { id: reserved!._id });
  await f.t.mutation(api.chase.skipDemo, { code, token });
  expect(await f.t.mutation(internal.chase.reserve, args)).toBeNull();
  const newId = await f.t.run((ctx) =>
    ctx.db.insert("drafts", {
      caseId: f.caseId,
      step: "next",
      channel: "email",
      to: "desk+airline@gmail.com",
      cc: [],
      body: "new",
      attachChecklist: [],
      status: "ready",
      createdAt: 2,
    }),
  );
  expect(
    await f.t.mutation(internal.chase.reserve, {
      caseId: f.caseId,
      draftId: newId,
    }),
  ).toBeNull();
});
it("blocks a second draft on the same company day and rejects expired demos", async () => {
  const f = await fixture();
  await f.t.mutation(internal.chase.reserve, {
    caseId: f.caseId,
    draftId: f.draftId,
  });
  const next = await f.t.run((ctx) =>
    ctx.db.insert("drafts", {
      caseId: f.caseId,
      step: "next",
      channel: "email",
      to: "desk+airline@gmail.com",
      cc: [],
      body: "new",
      attachChecklist: [],
      status: "ready",
      createdAt: 2,
    }),
  );
  expect(
    await f.t.mutation(internal.chase.reserve, {
      caseId: f.caseId,
      draftId: next,
    }),
  ).toBeNull();
  await f.t.run(async (ctx) => {
    const item = await ctx.db.get(f.caseId);
    await ctx.db.patch(f.caseId, {
      demo: { ...item!.demo!, now: "2026-10-16", expiresAt: 1 },
    });
  });
  expect(
    await f.t.mutation(internal.chase.reserve, {
      caseId: f.caseId,
      draftId: next,
    }),
  ).toBeNull();
});

it("allows a safe call confirmation when the reader needs passenger details", async()=>{const f=await fixture();await f.t.run(async ctx=>{await ctx.db.patch(f.caseId,{route:"NEED_INFO"});await ctx.db.patch(f.draftId,{step:"FLIGHT_call_confirmation",company:"Demo Air",cc:[]});});const r=await f.t.mutation(internal.chase.reserve,{caseId:f.caseId,draftId:f.draftId});expect(r?.company).toBe("Demo Air");});

it.each(["Nodal Officer","Appellate Authority","Grievance Officer"])("refuses %s dispatch despite permission and an allowed recipient",async role=>{const f=await fixture();await f.t.run(ctx=>ctx.db.patch(f.caseId,{flightPlan:{rung:2,to:"desk+travelsite@gmail.com",nextPerson:{company:"DemoTrips",email:"desk+travelsite@gmail.com",role}}}));expect(await f.t.query(internal.chase.stillActive,{caseId:f.caseId,draftId:f.draftId,authorisedAt:1})).toBe(false);expect(await f.t.mutation(internal.chase.reserve,{caseId:f.caseId,draftId:f.draftId})).toBeNull();});
it("rejects a stale playbook officer address after the current plan switches to support",async()=>{const f=await fixture();const {flightContacts}=await import("./flight-kb");const contact=flightContacts.find(c=>c.role==="Nodal Officer"&&c.email)!;await f.t.run(ctx=>ctx.db.patch(f.draftId,{to:contact.email!,cc:[]}));vi.stubEnv("CHASE_ALLOWLIST",contact.email+",passenger@example.invalid");expect(await f.t.query(internal.chase.stillActive,{caseId:f.caseId,draftId:f.draftId,authorisedAt:1})).toBe(false);expect(await f.t.mutation(internal.chase.reserve,{caseId:f.caseId,draftId:f.draftId})).toBeNull();});
it("rejects rung three at reservation and final dispatch even to an allowed support address",async()=>{const f=await fixture();await f.t.run(ctx=>ctx.db.patch(f.caseId,{flightPlan:{rung:3,nextPerson:{company:"DemoTrips",role:"Customer support email"}}}));expect(await f.t.query(internal.chase.stillActive,{caseId:f.caseId,draftId:f.draftId,authorisedAt:1})).toBe(false);expect(await f.t.mutation(internal.chase.reserve,{caseId:f.caseId,draftId:f.draftId})).toBeNull();});
it("stops a reserved support mail if its plan becomes an escalation before dispatch",async()=>{const f=await fixture();expect(await f.t.mutation(internal.chase.reserve,{caseId:f.caseId,draftId:f.draftId})).not.toBeNull();await f.t.run(ctx=>ctx.db.patch(f.caseId,{flightPlan:{rung:3}}));expect(await f.t.query(internal.chase.stillActive,{caseId:f.caseId,draftId:f.draftId,authorisedAt:1})).toBe(false);});
it("keeps an allowed support follow-up dispatchable and records delivery",async()=>{const f=await fixture();await f.t.run(ctx=>ctx.db.patch(f.caseId,{flightPlan:{rung:2,to:"desk+travelsite@gmail.com",nextPerson:{company:"DemoTrips",email:"desk+travelsite@gmail.com",role:"Customer support email"}}}));const reservation=await f.t.mutation(internal.chase.reserve,{caseId:f.caseId,draftId:f.draftId});expect(reservation).not.toBeNull();expect(await f.t.query(internal.chase.stillActive,{caseId:f.caseId,draftId:f.draftId,authorisedAt:1})).toBe(true);await f.t.mutation(internal.chase.delivered,{id:reservation!._id,threadId:"synthetic-thread",gmailId:"synthetic-id",messageId:"<synthetic@example.invalid>"});expect((await f.t.run(ctx=>ctx.db.get(f.draftId)))!.status).toBe("sent");});

it("keeps saved officer-role/rung metadata blocked after the current plan changes",async()=>{const f=await fixture();await f.t.run(async ctx=>{await ctx.db.patch(f.caseId,{flightPlan:{rung:1}});await ctx.db.patch(f.draftId,{recipientRole:"Nodal Officer",rung:2});});expect(await f.t.query(internal.chase.stillActive,{caseId:f.caseId,draftId:f.draftId,authorisedAt:1})).toBe(false);await f.t.run(ctx=>ctx.db.patch(f.draftId,{recipientRole:"Customer support email",rung:3}));expect(await f.t.mutation(internal.chase.reserve,{caseId:f.caseId,draftId:f.draftId})).toBeNull();});
