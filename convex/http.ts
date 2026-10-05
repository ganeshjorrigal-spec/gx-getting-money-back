import { httpRouter } from "convex/server";
import { httpAction } from "./_generated/server";
import { registerStaticRoutes } from "@convex-dev/static-hosting";
import { components } from "./_generated/api";

const http = httpRouter();

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
