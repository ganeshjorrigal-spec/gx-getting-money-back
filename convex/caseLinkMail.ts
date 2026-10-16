import {internalMutation,internalQuery} from './_generated/server';
import {v} from 'convex/values';
import {assertAccess} from './lib/access';
import {caseLinkRecipient} from '../lib/case-link-mail';
import {todayIST} from '../lib/dates';
const access={code:v.string(),token:v.string()};
export const reserve=internalMutation({args:access,returns:v.any(),handler:async(ctx,args)=>{
 const item=await assertAccess(ctx,args.code,args.token),recipient=caseLinkRecipient(item);
 if(!recipient)throw new Error('Copy your case link, or confirm your case email first');
 const connection=await ctx.db.query('googleConnections').withIndex('by_kind',q=>q.eq('kind','inbox')).first();
 if(!connection?.chaseSendGranted)throw new Error('Case-link email is unavailable. Copy your case link instead');
 const day=todayIST();
 // Only the daily quota is retained; it contains no recipient or private link.
 for(const old of await ctx.db.query('caseLinkMails').withIndex('by_case',q=>q.eq('caseId',item._id)).take(10))if(old.day!==day)await ctx.db.delete(old._id);
 const rows=await ctx.db.query('caseLinkMails').withIndex('by_case_day',q=>q.eq('caseId',item._id).eq('day',day)).take(3);
 if(rows.length>=3)return {limited:true,recipient};
 const id=await ctx.db.insert('caseLinkMails',{caseId:item._id,day,state:'reserved'});
 return {id,recipient,connection};
}});
export const current=internalQuery({args:{...access,id:v.id('caseLinkMails')},returns:v.any(),handler:async(ctx,args)=>{
 const item=await assertAccess(ctx,args.code,args.token),slot=await ctx.db.get(args.id),recipient=caseLinkRecipient(item);
 const connection=await ctx.db.query('googleConnections').withIndex('by_kind',q=>q.eq('kind','inbox')).first();
 if(!recipient||!connection?.chaseSendGranted||!slot||slot.caseId!==item._id||slot.state!=='reserved')return null;
 return {recipient,connection};
}});
export const settle=internalMutation({args:{id:v.id('caseLinkMails'),state:v.union(v.literal('sent'),v.literal('uncertain'),v.literal('cancelled'))},returns:v.null(),handler:async(ctx,args)=>{
 const slot=await ctx.db.get(args.id);if(!slot||slot.state!=='reserved')return null;
 if(args.state==='cancelled')await ctx.db.delete(args.id);else await ctx.db.patch(args.id,{state:args.state});return null;
}});
