/// <reference types="vite/client" />
import { afterEach, beforeEach, expect, it, vi } from "vitest";
import { convexTest } from "convex-test";
import { makeFunctionReference } from "convex/server";
import schema from "../convex/schema";
import { internal } from "../convex/_generated/api";
import { hashToken } from "../convex/lib/access";
import { encryptToken } from "./token-crypto";
import { beginResponses } from "../convex/googleActions";

const modules = import.meta.glob("../convex/**/*.ts");
const begin = makeFunctionReference<"action">("googleActions:beginResponses");
const finish = makeFunctionReference<"action">("responsesActions:finishSetup");
const resume = makeFunctionReference<"action">("responsesActions:resumeSetup");
const setupSecret = "synthetic-owner-setup-secret-32-bytes-long";
const driveScope = "https://www.googleapis.com/auth/drive.file";
let requests: Array<{ url: string; method: string }>;
let accountEmail: string;

beforeEach(() => {
  requests = [];
  accountEmail = "owner@example.invalid";
  vi.stubEnv("RESPONSES_SETUP_SECRET", setupSecret);
  vi.stubEnv("TICKBACK_INBOX_ADDRESS", "owner@example.invalid");
  vi.stubEnv("RESPONSES_SHEET_SHARE_EMAIL", "personal@example.invalid");
  vi.stubEnv("GOOGLE_OAUTH_CLIENT_ID", "synthetic-client");
  vi.stubEnv("GOOGLE_OAUTH_CLIENT_SECRET", "synthetic-secret");
  vi.stubEnv("CONVEX_SITE_URL", "https://backend.example.invalid");
  vi.stubEnv("TOKEN_ENC_KEY", Buffer.alloc(32, 7).toString("base64"));
  vi.stubGlobal("fetch", vi.fn(async (input: string | URL | Request, init?: RequestInit) => {
    const url = String(input);
    requests.push({ url, method: init?.method ?? "GET" });
    if (url === "https://oauth2.googleapis.com/token") return Response.json({ access_token: "synthetic-access", refresh_token: "synthetic-refresh", scope: driveScope });
    if (url === "https://www.googleapis.com/drive/v3/about?fields=user(emailAddress)") return Response.json({ user: { emailAddress: accountEmail } });
    if (url === "https://sheets.googleapis.com/v4/spreadsheets") return Response.json({ spreadsheetId: "synthetic-new-sheet" });
    if (url.includes("/values/") || url.includes("/permissions?")) return Response.json({});
    throw new Error(`Unexpected test request: ${url}`);
  }));
});
afterEach(() => { vi.clearAllTimers(); vi.useRealTimers(); vi.unstubAllEnvs(); vi.unstubAllGlobals(); });

it("does not expose the sheet setup starter as a public action", () => {
  expect((beginResponses as unknown as { isInternal: boolean }).isInternal).toBe(true);
});

it("rejects setup without a secret before creating an OAuth state", async () => {
  const t = convexTest(schema, modules);
  await expect(t.action(begin, {})).rejects.toThrow();
  expect(await t.run(ctx => ctx.db.query("googleOauthStates").collect())).toEqual([]);
  expect(requests).toEqual([]);
});

it.each(["", "wrong-secret", undefined])("rejects an incorrect or unavailable setup secret: %s", async supplied => {
  const t = convexTest(schema, modules);
  if (supplied === undefined) vi.stubEnv("RESPONSES_SETUP_SECRET", "");
  await expect(t.action(begin, { setupSecret: supplied ?? setupSecret })).rejects.toThrow();
  expect(await t.run(ctx => ctx.db.query("googleOauthStates").collect())).toEqual([]);
});

it("rejects a pre-patch responses callback even if its state was valid", async () => {
  const t = convexTest(schema, modules);
  await t.mutation(internal.googleConnect.createState, { kind: "responses", stateHash: await hashToken("old-state") });
  const response = await t.fetch("/oauth/google/callback?code=synthetic-code&state=old-state");
  expect(response.status).toBe(400);
  expect(requests).toEqual([]);
  expect(await t.run(ctx => ctx.db.query("googleConnections").collect())).toEqual([]);
});

async function authorisedCallback(t: ReturnType<typeof convexTest>) {
  const result = await t.action(begin, { setupSecret }) as { url: string };
  const url = new URL(result.url);
  expect(url.search).not.toContain(setupSecret);
  const state = url.searchParams.get("state")!;
  const rows = await t.run(ctx => ctx.db.query("googleOauthStates").collect());
  expect(JSON.stringify(rows)).not.toContain(setupSecret);
  return `/oauth/google/callback?code=synthetic-code&state=${state}`;
}

it("refuses another Google account without replacing the existing sheet connection", async () => {
  const t = convexTest(schema, modules);
  const connectionId = await t.run(ctx => ctx.db.insert("googleConnections", { kind: "responses", encryptedRefreshToken: "existing-synthetic", connectedAt: 1 }));
  accountEmail = "attacker@example.invalid";
  const response = await t.fetch(await authorisedCallback(t));
  expect(response.status).toBe(400);
  expect((await t.run(ctx => ctx.db.get(connectionId)))?.encryptedRefreshToken).toBe("existing-synthetic");
  expect(requests.some(r => r.method !== "GET" && r.url.includes("googleapis.com/drive/"))).toBe(false);
  expect(requests.some(r => r.url.includes("sheets.googleapis.com"))).toBe(false);
});

it("invalidates an authorised pending callback when the setup secret changes", async () => {
  const t = convexTest(schema, modules);
  const callback = await authorisedCallback(t);
  vi.stubEnv("RESPONSES_SETUP_SECRET", "rotated-synthetic-secret-with-at-least-32-bytes");
  expect((await t.fetch(callback)).status).toBe(400);
  expect(requests).toEqual([]);
});

async function existingSheet(t: ReturnType<typeof convexTest>) {
  const encryptedRefreshToken = await encryptToken("existing-synthetic-refresh");
  return t.run(async ctx => {
    const connectionId = await ctx.db.insert("googleConnections", { kind: "responses", encryptedRefreshToken, connectedAt: 1 });
    const configId = await ctx.db.insert("responsesSheetConfig", { connectionId, spreadsheetId: "synthetic-existing-sheet", sheetUrl: "https://docs.google.com/spreadsheets/d/synthetic-existing-sheet/edit", nextRow: 12, createdAt: 1, updatedAt: 1 });
    return { connectionId, configId };
  });
}

it("requires the setup secret at finishSetup and resumeSetup too", async () => {
  const t = convexTest(schema, modules);
  const { connectionId } = await existingSheet(t);
  await expect(t.action(finish, { connectionId })).rejects.toThrow();
  await expect(t.action(resume, {})).rejects.toThrow();
  expect(requests).toEqual([]);
});

it("checks the actual Google account at finishSetup rather than trusting a stored email", async () => {
  const t = convexTest(schema, modules);
  const { connectionId } = await existingSheet(t);
  await t.run(ctx => ctx.db.patch(connectionId, { email: "owner@example.invalid" }));
  accountEmail = "attacker@example.invalid";
  await expect(t.action(finish, { connectionId, setupSecret })).rejects.toThrow(/owner/i);
  expect(requests.some(r => r.url.includes("sheets.googleapis.com"))).toBe(false);
});

it("keeps the existing owner's sheet, row counter and connection when setup is resumed", async () => {
  const t = convexTest(schema, modules);
  const { configId } = await existingSheet(t);
  expect(await t.action(resume, { setupSecret })).toContain("synthetic-existing-sheet");
  expect(await t.run(ctx => ctx.db.get(configId))).toMatchObject({ spreadsheetId: "synthetic-existing-sheet", nextRow: 12 });
  expect(requests.some(r => r.url.includes("sheets.googleapis.com"))).toBe(false);
});

it("keeps that same sheet connected when the correct owner completes OAuth again", async () => {
  const t = convexTest(schema, modules);
  const { connectionId, configId } = await existingSheet(t);
  const response = await t.fetch(await authorisedCallback(t));
  expect(response.status).toBe(200);
  expect(await t.run(ctx => ctx.db.get(configId))).toMatchObject({ connectionId, spreadsheetId: "synthetic-existing-sheet", nextRow: 12 });
  expect((await t.run(ctx => ctx.db.get(connectionId)))?.email).toBe("owner@example.invalid");
  expect(requests.some(r => r.url.includes("sheets.googleapis.com"))).toBe(false);
});

it("allows a secret-authorised owner to set up a sheet when none exists", async () => {
  vi.useFakeTimers();
  const t = convexTest(schema, modules);
  const response = await t.fetch(await authorisedCallback(t));
  expect(response.status).toBe(200);
  const config = await t.run(ctx => ctx.db.query("responsesSheetConfig").first());
  expect(config?.spreadsheetId).toBe("synthetic-new-sheet");
  expect(requests.filter(r => r.url === "https://sheets.googleapis.com/v4/spreadsheets")).toHaveLength(1);
});

it("continues ordinary updates to the existing sheet without running setup or requiring its new secret", async () => {
  const t = convexTest(schema, modules);
  const { configId } = await existingSheet(t);
  vi.stubEnv("RESPONSES_SETUP_SECRET", "");
  const caseId = await t.run(ctx => ctx.db.insert("cases", { code: "RG-QATEST", tokenHash: "synthetic", stage: "READY", ladderLevel: 0, draftsShown: 0, tier: "free_check", paidState: "none", createdAt: 1, updatedAt: 1 }));
  await t.action(internal.responsesActions.syncCase, { caseId });
  expect(requests.filter(r => r.method === "PUT").map(r => r.url)).toEqual(["https://sheets.googleapis.com/v4/spreadsheets/synthetic-existing-sheet/values/Cases!A12%3AL12?valueInputOption=RAW"]);
  expect(await t.run(ctx => ctx.db.get(configId))).toMatchObject({ spreadsheetId: "synthetic-existing-sheet", nextRow: 13 });
});
