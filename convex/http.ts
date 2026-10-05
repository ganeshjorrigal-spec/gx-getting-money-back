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
      if (result.kind === "inbox") return new Response("Tickback case inbox connected. You can close this tab.");
      if (!result.code) throw new Error("Case unavailable");
      const destination = new URL("/c/index.html", request.url);
      destination.searchParams.set("code", result.code);
      destination.searchParams.set("google", "connected");
      destination.searchParams.set("state", state);
      return Response.redirect(destination, 302);
    } catch {
      return new Response("Google connection did not finish. Return to your case and try again.", { status: 400 });
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
