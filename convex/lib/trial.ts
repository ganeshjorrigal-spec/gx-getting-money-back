import type { QueryCtx, MutationCtx } from "../_generated/server";
import type { Doc } from "../_generated/dataModel";
import { annualActive } from "../../lib/annual-pass";
import { countsForTrial, freeRefundLimit, trialStatus } from "../../lib/free-trial";
export async function caseTrial(ctx: QueryCtx | MutationCtx,item:Doc<"cases">) {
 const limit=freeRefundLimit(process.env.FREE_LANDED_REFUNDS);
 const annual=item.deviceHash?await ctx.db.query("annualPasses").withIndex("by_device",q=>q.eq("deviceHash",item.deviceHash!)).unique():null;
 let landed=0;
 if(item.deviceHash)for await(const row of ctx.db.query("cases").withIndex("by_device_stage",q=>q.eq("deviceHash",item.deviceHash!).eq("stage","CLOSED_LANDED"))) {
  if(countsForTrial(row))landed++; if(landed>=limit)break;
 }
 return {...trialStatus(landed,limit,annualActive(annual,Date.now()),item),annual};
}
