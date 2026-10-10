import {ConvexHttpClient} from 'convex/browser';
import {makeFunctionReference} from 'convex/server';
import {readFileSync,writeFileSync} from 'node:fs';
const client=new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL);
const fixtures=JSON.parse(readFileSync('.env.trial-proof.json','utf8'));
const proof=[];
for(const f of fixtures){
 const args={code:f.code,token:f.token};
 const data=await client.query(makeFunctionReference('cases:get'),args);
 const drafts=await client.query(makeFunctionReference('cases:drafts'),args);
 if(data.trialLanded!==f.landed||data.trialLocked!==(f.landed>=3))throw new Error('Trial fixture mismatch');
 if(drafts[0].body===null!==data.trialLocked)throw new Error('Draft gate mismatch');
 proof.push({code:f.code,type:f.refundType,landed:data.trialLanded,limit:data.trialLimit,locked:data.trialLocked,draftVisible:drafts[0].body!==null,excludedDemoAndHelped:true});
}
writeFileSync('docs/qa/free-trial-record-proof-2026-10-10.json',JSON.stringify(proof,null,2)+'\n');
console.log(JSON.stringify(proof));
