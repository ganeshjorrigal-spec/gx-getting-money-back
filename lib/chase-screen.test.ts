import {it,expect} from "vitest";
import {build} from "esbuild";
import {createRequire} from "node:module";
import {resolve} from "node:path";
import {escalationSendLine} from "./chase-escalation";
it("shows manual sending and Gmail, with neither permission block nor chase prefix on an escalation",async()=>{
 await build({entryPoints:["scripts/qa/chase-screen-proof.tsx"],bundle:true,platform:"node",format:"cjs",packages:"external",jsx:"automatic",outfile:".env.chase-screen.cjs",alias:{"convex/react":resolve("scripts/qa/restyle-query-fixture.ts"),"next/link":resolve("scripts/qa/restyle-link-fixture.tsx")}});
 const html=createRequire(import.meta.url)(resolve(".env.chase-screen.cjs")).renderEscalation();
 expect(html).toContain(escalationSendLine);expect(html).toContain("Open in Gmail");expect(html).not.toContain("Let Genie send and follow up");expect(html).not.toContain("give Genie written permission above");expect(html).not.toContain("I am writing on behalf of");
});
