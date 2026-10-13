/// <reference types="vite/client" />
import {it,expect,vi,afterEach} from "vitest";
import {convexTest} from "convex-test";
import schema from "../convex/schema";
import {internal} from "../convex/_generated/api";
const transport=vi.hoisted(()=>({accessToken:vi.fn().mockResolvedValue("synthetic-token"),googleJson:vi.fn(async(url:string)=>url.includes("format=metadata")?{payload:{headers:[{name:"Message-ID",value:"<synthetic-delivered@example.invalid>"}]}}:{id:"synthetic-gmail-id",threadId:"synthetic-thread"})}));
vi.mock("../convex/googleActions",async original=>({...await original<Record<string,unknown>>(),...transport}));
vi.mock("../lib/token-crypto",async original=>({...await original<Record<string,unknown>>(),decryptToken:vi.fn().mockResolvedValue("x".repeat(43))}));
afterEach(()=>{vi.clearAllTimers();vi.useRealTimers();vi.unstubAllEnvs();vi.clearAllMocks();});
it.each(["Customer support email","Nodal Officer","Appellate Authority","Grievance Officer"])("actual send action handles %s before mocked Gmail dispatch",async role=>{
 vi.useFakeTimers();vi.stubEnv("CHASE_ALLOWLIST","desk@example.invalid,passenger@example.invalid");vi.stubEnv("TICKBACK_INBOX_ADDRESS","inbox@example.invalid");
 const t=convexTest(schema,import.meta.glob("../convex/**/*.ts"));const ids=await t.run(async ctx=>{const letterId=await ctx.storage.store(new Blob(["synthetic authority"]));const caseId=await ctx.db.insert("cases",{code:"RG-QATEST",tokenHash:"synthetic",stage:"READY",route:"OVERDUE",refundType:"flight",factsConfirmedAt:1,ladderLevel:2,draftsShown:1,tier:"free_check",paidState:"none",createdAt:1,updatedAt:1,facts:{airline:"Demo Air",bookedVia:"DemoTrips",pnr:"SAMPLE"},flightPlan:{rung:2,to:"desk@example.invalid",nextPerson:{company:"DemoTrips",email:"desk@example.invalid",role}},demo:{kind:"flight",round:1,phase:"ready",now:"2026-10-13",expiresAt:Date.now()+86400000},chase:{active:true,name:"Demo Passenger",mobile:"0000000000",email:"passenger@example.invalid",authorisedAt:1,letterId,encryptedCaseToken:"synthetic"}});const draftId=await ctx.db.insert("drafts",{caseId,step:"FLIGHT_mail",channel:"email",to:"desk@example.invalid",subject:"Demo [RG-QATEST]",body:"Dear support,\n\nPlease give a refund update.",attachChecklist:[],status:"ready",createdAt:1});await ctx.db.insert("googleConnections",{kind:"inbox",chaseSendGranted:true,encryptedRefreshToken:"synthetic",connectedAt:1});return {caseId,draftId};});
 await t.action(internal.chaseActions.send,{caseId:ids.caseId});const draft=await t.run(ctx=>ctx.db.get(ids.draftId));
 if(role==="Customer support email"){expect(draft!.status).toBe("sent");expect(transport.googleJson.mock.calls.some(([url])=>url.endsWith("messages/send"))).toBe(true);}else{expect(draft!.status).toBe("ready");expect(transport.accessToken).not.toHaveBeenCalled();expect(transport.googleJson).not.toHaveBeenCalled();}
});
