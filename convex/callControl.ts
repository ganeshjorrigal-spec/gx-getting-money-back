import {v} from 'convex/values';
import {internalMutation,internalQuery} from './_generated/server';
import type {MutationCtx,QueryCtx} from './_generated/server';
import type {Id} from './_generated/dataModel';
import {hasConfirmedCaseEmail} from '../lib/confirmed-case-email';
import {testCallDeployment} from '../lib/calls';

const auth={id:v.id('calls'),tokenHash:v.string(),externalId:v.string()};
function equalHash(a:string,b:string){if(a.length!==64||b.length!==64)return false;let difference=0;for(let i=0;i<64;i++)difference|=a.charCodeAt(i)^b.charCodeAt(i);return difference===0;}
async function authorised(ctx:QueryCtx|MutationCtx,args:{id:Id<'calls'>;tokenHash:string;externalId:string}){
 if(!testCallDeployment(process.env))return null;
 const call=await ctx.db.get(args.id);
 if(!call?.finishControl||call.status!=='queued'||call.mode!=='live'||call.externalId!==args.externalId||!equalHash(call.finishControl.tokenHash,args.tokenHash))return null;
 const item=await ctx.db.get(call.caseId);
 if(!item?.demo||item.demo.chaseStory||item.demo.expiresAt<=Date.now()||item.stage.startsWith('CLOSED')||!item.chase?.active||!item.chase.callsAuthorisedAt||item.chase.authorisedAt!==call.authorisedAt||!hasConfirmedCaseEmail(item))return null;
 return {call,item};
}
export const prepare=internalMutation({args:{id:v.id('calls'),tokenHash:v.string()},returns:v.null(),handler:async(ctx,args)=>{
 const call=await ctx.db.get(args.id);
 if(!testCallDeployment(process.env)||!call||call.mode!=='live'||call.status!=='reserved'||call.finishControl||!/^[a-f0-9]{64}$/.test(args.tokenHash))throw new Error('Controlled call is not ready');
 const item=await ctx.db.get(call.caseId);if(!item?.demo||item.demo.chaseStory)throw new Error('Use a supervised test demo');
 await ctx.db.patch(call._id,{finishControl:{tokenHash:args.tokenHash,closing:false,toolIds:[],missingDetails:[]}});return null;
}});
export const load=internalQuery({args:auth,returns:v.any(),handler:async(ctx,args)=>{
 const loaded=await authorised(ctx,args);return loaded?{name:loaded.item.chase!.name,closing:loaded.call.finishControl!.closing}:null;
}});
export const progress=internalMutation({args:{...auth,ledger:v.any()},returns:v.null(),handler:async(ctx,args)=>{
 const loaded=await authorised(ctx,args);if(!loaded||loaded.call.finishControl!.closing)return null;
 if(JSON.stringify(args.ledger).length>16000)throw new Error('Call state too large');
 await ctx.db.patch(loaded.call._id,{finishControl:{...loaded.call.finishControl!,ledger:args.ledger}});return null;
}});
export const claimClose=internalMutation({args:{...auth,toolId:v.string(),ledger:v.any(),missingDetails:v.array(v.string())},returns:v.boolean(),handler:async(ctx,args)=>{
 const loaded=await authorised(ctx,args);if(!loaded||loaded.call.finishControl!.closing||loaded.call.finishControl!.toolIds.includes(args.toolId))return false;
 if(args.toolId.length>160||JSON.stringify(args.ledger).length>16000||args.missingDetails.length>6)throw new Error('Invalid closing state');
 await ctx.db.patch(loaded.call._id,{finishControl:{...loaded.call.finishControl!,closing:true,toolIds:[args.toolId],ledger:args.ledger,missingDetails:args.missingDetails}});return true;
}});
