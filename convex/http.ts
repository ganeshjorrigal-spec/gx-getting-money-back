import { httpRouter } from "convex/server";
import { httpAction } from "./_generated/server";
import { registerStaticRoutes } from "@convex-dev/static-hosting";
import { components, internal } from "./_generated/api";

const http = httpRouter();

http.route({
  path: "/oauth/google/callback", method: "GET",
  handler: httpAction(async (ctx, request) => {
    const incoming = new URL(request.url);
    const code = incoming.searchParams.get("code");
    const state = incoming.searchParams.get("state");
    if (!code || !state || incoming.searchParams.has("error")) return new Response("Google connection was not completed. Return to your case and try again.", { status: 400 });
    try {
      const result = await ctx.runAction(internal.googleActions.finishOauth, { code, state });
      if (result.kind === "demo") return new Response("Refund Genie demo organiser connected. You can close this tab.");
      if (result.kind === "inbox") return new Response("Refund Genie case inbox connected. You can close this tab.");
      if (result.kind === "responses" && result.sheetUrl) return new Response(`<!doctype html><meta charset="utf-8"><title>Refund Genie Responses connected</title><main style="font:18px system-ui;max-width:680px;margin:64px auto;padding:24px"><h1>Responses sheet connected</h1><p>Refund Genie created the sheet, shared it with Ganesh and started adding cases.</p><p><a href="${result.sheetUrl}">Open Refund Genie Responses</a></p><p>You can close this tab.</p></main>`, { headers: { "Content-Type": "text/html; charset=utf-8" } });
      if (!result.code) throw new Error("Case unavailable");
      const destination = new URL("/c/index.html", request.url);
      destination.searchParams.set("code", result.code);
      destination.searchParams.set("google", "connected");
      destination.searchParams.set("state", state);
      return Response.redirect(destination, 302);
    } catch (error) {
      const detail = error instanceof Error ? error.message : "";
      const sheetSetup = detail.includes("responsesActions:finishSetup") || detail.includes("Responses sheet setup");
      return new Response(sheetSetup
        ? "Google connected, but the Responses sheet could not be created. Enable the Google Sheets API and Google Drive API in this Google Cloud project, then try again."
        : "Google connection did not finish. Return to your case and try again.", { status: 400 });
    }
  }),
});

// Static Hosting serves exact uploaded paths. Next exports each page as
// /page/index.html, so direct visits to /page/ need a matching redirect.
for (const page of ["sample", "start", "privacy", "taste", "m0-font-check", "c"]) {
  for (const suffix of ["", "/"]) {
    http.route({
      path: `/${page}${suffix}`,
      method: "GET",
      handler: httpAction(async (_ctx, request) => {
        const target = new URL(`/${page}/index.html`, request.url);
        target.search = new URL(request.url).search;
        return Response.redirect(target, 302);
      }),
    });
  }
}

// Keep root URLs available for the forthcoming Google OAuth callback.
registerStaticRoutes(http, components.staticHosting);

export default http;
