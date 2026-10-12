import { it, expect } from "vitest";
import { publicAppUrl, privateCaseUrl } from "./app-url";
import worker from "../cloudflare/worker.mjs";

it("prefers the public domain and falls back for old deployments", () => {
  expect(publicAppUrl({ PUBLIC_APP_URL: " https://refundgenie.app/ ", CONVEX_SITE_URL: "https://old.example" })).toBe("https://refundgenie.app");
  expect(publicAppUrl({ PUBLIC_APP_URL: " ", CONVEX_SITE_URL: "https://old.example/" })).toBe("https://old.example");
});
it.each(["TB-SAMPLE", "RG-SAMPLE"])("keeps private case keys out of server query parameters: %s", code => {
  const link = new URL(privateCaseUrl("https://refundgenie.app/", code, "fixture_key"));
  expect(link.searchParams.get("code")).toBe(code);
  expect(link.search).not.toContain("fixture_key");
  expect(link.hash).toBe("#k=fixture_key");
});
it("redirects www while preserving the page and query", async () => {
  const assets = { fetch: () => { throw new Error("should not serve www"); } };
  const result = await worker.fetch(new Request("https://www.refundgenie.app/start/?demo=flight"), { ASSETS: assets });
  expect(result.status).toBe(308);
  expect(result.headers.get("location")).toBe("https://refundgenie.app/start/?demo=flight");
});
it.each(["TB-SAMPLE", "RG-SAMPLE"])("routes saved case paths to the case page: %s", async code => {
  const result = await worker.fetch(new Request(`https://refundgenie.app/c/${code}/?google=connected`), { ASSETS: { fetch: () => { throw new Error("should redirect"); } } });
  const destination = new URL(result.headers.get("location")!);
  expect(result.status).toBe(307);
  expect(destination.pathname).toBe("/c/");
  expect(destination.searchParams.get("code")).toBe(code);
  expect(destination.searchParams.get("google")).toBe("connected");
});
it.each(["/terms/", "/refund-policy/", "/contact/", "/privacy/", "/start/", "/missing/"])("delegates the exact page to static assets: %s", async path => {
  let fetched = "";
  const result = await worker.fetch(new Request(`https://refundgenie.app${path}`), { ASSETS: { fetch: (request: Request) => { fetched = new URL(request.url).pathname; return new Response(path, { status: path === "/missing/" ? 404 : 200 }); } } });
  expect(fetched).toBe(path);
  expect(result.status).toBe(path === "/missing/" ? 404 : 200);
});
