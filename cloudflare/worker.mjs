export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.hostname === "www.refundgenie.app") {
      url.hostname = "refundgenie.app";
      return Response.redirect(url.toString(), 308);
    }
    const match = url.pathname.match(/^\/c\/((?:TB|RG)-[A-Z0-9]{6})\/?$/);
    if (match) {
      url.pathname = "/c/";
      url.searchParams.set("code", match[1]);
      return Response.redirect(url.toString(), 307);
    }
    return env.ASSETS.fetch(request);
  },
};
