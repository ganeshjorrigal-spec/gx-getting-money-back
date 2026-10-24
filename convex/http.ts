import { httpRouter } from "convex/server";
import { httpAction } from "./_generated/server";
import { registerStaticRoutes } from "@convex-dev/static-hosting";
import { components, internal } from "./_generated/api";
import type { Id } from "./_generated/dataModel";

const http = httpRouter();
const uploadCors={'Access-Control-Allow-Origin':'*','Access-Control-Allow-Methods':'POST, OPTIONS','Access-Control-Allow-Headers':'Content-Type'};
http.route({path:'/case-upload',method:'OPTIONS',handler:httpAction(async()=>new Response(null,{status:204,headers:uploadCors}))});
http.route({path:'/case-upload',method:'POST',handler:httpAction(async(ctx,request)=>{
 let storageId:Id<'_storage'>|undefined;
 try{
  if(!['image/jpeg','image/png','image/webp'].includes(request.headers.get('content-type')??''))throw new Error('Image required');
  const bytes=await request.arrayBuffer();if(!bytes.byteLength||bytes.byteLength>4*1024*1024)throw new Error('Image too large');
  const ticket=new URL(request.url).searchParams.get('ticket')??'';
  const ticketId=await ctx.runMutation(internal.files.takeTicket,{ticket:await crypto.subtle.digest('SHA-256',new TextEncoder().encode(ticket)).then(d=>[...new Uint8Array(d)].map(b=>b.toString(16).padStart(2,'0')).join(''))});
  storageId=await ctx.storage.store(new Blob([bytes],{type:request.headers.get('content-type')!}));
  await ctx.runMutation(internal.files.record,{ticketId,storageId});
  return new Response(JSON.stringify({storageId}),{headers:{...uploadCors,'Content-Type':'application/json'}});
 }catch{if(storageId)await ctx.storage.delete(storageId);return new Response('Upload unavailable or expired',{status:400,headers:uploadCors});}
})});


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
      const destination = result.caseUrl ? new URL(result.caseUrl) : new URL("/c/index.html", request.url);
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
for (const page of ["terms", "refund-policy", "contact", "sample", "start", "privacy", "taste", "m0-font-check", "c", "cases", "demo-confirm"]) {
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

// A static export has one case screen; private case tokens stay in the browser fragment.
  http.route({
    pathPrefix: "/c/",
    method: "GET",
    handler: httpAction(async (ctx, request) => {
      const source = new URL(request.url);
      const code = source.pathname.slice(3).replace(/\/$/, "");
      if (!/^(RG|TB)-[A-Z0-9]{6}$/.test(code)) {
        // Preserve the actual exported case assets beneath the same prefix.
        const asset = await ctx.runQuery(components.staticHosting.lib.resolveAssetForHttp, {path: source.pathname, spaFallback: false});
        if (!asset) return new Response("Case unavailable", {status: 404});
        const blob = asset.appStorageId ? await ctx.storage.get(asset.appStorageId as Id<"_storage">) : null;
        const stored = blob ? null : asset.storageUrl ? await fetch(asset.storageUrl) : null;
        if (!blob && (!stored?.ok || !stored.body)) return new Response("Case unavailable", {status: 404});
        return new Response(blob ?? stored!.body, {headers: {"Content-Type": asset.contentType || "text/html; charset=utf-8", "Cache-Control": "no-cache", "X-Content-Type-Options": "nosniff"}});
      }
      const target = new URL("/c/index.html", source);
      target.search = source.search;
      target.searchParams.set("code", code);
      return Response.redirect(target, 302);
    }),
  });

// Keep root URLs available for the forthcoming Google OAuth callback.
registerStaticRoutes(http, components.staticHosting);

export default http;
