import { httpRouter } from "convex/server";
import { httpAction } from "./_generated/server";

const http = httpRouter();

http.route({
  path: "/",
  method: "GET",
  handler: httpAction(async () =>
    new Response("<!doctype html><html lang=\"en\"><head><title>Tickback</title></head><body></body></html>", {
      headers: { "content-type": "text/html; charset=utf-8" },
    }),
  ),
});

export default http;
