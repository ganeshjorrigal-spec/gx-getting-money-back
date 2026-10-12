/// <reference types="vite/client" />
import { it, expect, vi, afterEach } from "vitest";
import { convexTest } from "convex-test";
import schema from "../convex/schema";
import { internal } from "../convex/_generated/api";
import { encryptToken } from "./token-crypto";
import { hashToken } from "../convex/lib/access";
import { CALENDAR_SCOPE } from "./google-tracking";

const modules = import.meta.glob("../convex/**/*.ts");
afterEach(() => { vi.unstubAllEnvs(); vi.unstubAllGlobals(); });

it.each(["https://refundgenie.app", ""])("returns from Google with the private key on the chosen app origin: %s", async app => {
  vi.stubEnv("PUBLIC_APP_URL", app);
  vi.stubEnv("CONVEX_SITE_URL", "https://old.example");
  vi.stubEnv("GOOGLE_OAUTH_CLIENT_ID", "fixture-client");
  vi.stubEnv("GOOGLE_OAUTH_CLIENT_SECRET", "fixture-secret");
  vi.stubEnv("TOKEN_ENC_KEY", Buffer.alloc(32, 7).toString("base64"));
  let callback = "";
  vi.stubGlobal("fetch", vi.fn(async (url: string, init: RequestInit) => {
    expect(url).toBe("https://oauth2.googleapis.com/token");
    const params = init.body as URLSearchParams;
    if (params.get("grant_type") === "authorization_code") callback = params.get("redirect_uri")!;
    return new Response(JSON.stringify({ access_token: "fixture-access", refresh_token: "fixture-refresh", scope: CALENDAR_SCOPE }));
  }));
  const t = convexTest(schema, modules);
  const caseId = await t.run(ctx => ctx.db.insert("cases", { code: "RG-SAMPLE", tokenHash: "fixture", stage: "READY", ladderLevel: 0, draftsShown: 0, tier: "free_check", paidState: "none", createdAt: Date.now(), updatedAt: Date.now() }));
  await t.mutation(internal.googleConnect.createState, { caseId, kind: "calendar", stateHash: await hashToken("fixture-state"), encryptedCaseToken: await encryptToken("fixture-private-key") });
  const response = await t.fetch("/oauth/google/callback?code=fixture-code&state=fixture-state");
  expect(response.status).toBe(302);
  const destination = new URL(response.headers.get("location")!);
  expect(destination.origin).toBe(app || "https://old.example");
  expect(destination.searchParams.get("code")).toBe("RG-SAMPLE");
  expect(destination.searchParams.get("google")).toBe("connected");
  expect(destination.hash).toBe("#k=fixture-private-key");
  expect(destination.search).not.toContain("fixture-private-key");
  expect(callback).toBe("https://old.example/oauth/google/callback");
});
