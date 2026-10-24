import {mutation,internalMutation,internalQuery} from './_generated/server';
import {v} from 'convex/values';
import {takeRate} from './lib/rate';
import {assertAccess,hashToken} from './lib/access';
import {ownsFile} from './lib/files';
export const generateUploadUrl=mutation({
 args:{deviceId:v.string(),code:v.optional(v.string()),token:v.optional(v.string())},returns:v.string(),handler:async(ctx,a)=>{
  if(!/^[A-Za-z0-9_-]{12,100}$/.test(a.deviceId))throw new Error('Invalid device');
  const item=a.code&&a.token?await assertAccess(ctx,a.code,a.token):null;
  const origin=process.env.CONVEX_SITE_URL;if(!origin)throw new Error('Upload service unavailable');
  await takeRate(ctx,`upload:${a.deviceId}`,20,3600000);
  const ticket=crypto.randomUUID().replaceAll('-','')+crypto.randomUUID().replaceAll('-','');
  await ctx.db.insert('uploadTickets',{tokenHash:await hashToken(ticket),deviceHash:await hashToken(a.deviceId),caseId:item?._id,expiresAt:Date.now()+900000});
  return `${origin}/case-upload?ticket=${ticket}`;
 }
});
export const takeTicket=internalMutation({args:{ticket:v.string()},returns:v.id('uploadTickets'),handler:async(ctx,{ticket})=>{
 if(!/^[a-f0-9]{64}$/.test(ticket))throw new Error('Upload unavailable');
 const row=await ctx.db.query('uploadTickets').withIndex('by_hash',q=>q.eq('tokenHash',ticket)).unique();
 if(!row||row.usedAt||row.expiresAt<=Date.now())throw new Error('Upload expired');
 await ctx.db.patch(row._id,{usedAt:Date.now()});return row._id;
}});
export const record=internalMutation({args:{ticketId:v.id('uploadTickets'),storageId:v.id('_storage')},returns:v.null(),handler:async(ctx,a)=>{
 const ticket=await ctx.db.get(a.ticketId);if(!ticket?.usedAt||ticket.storageId||ticket.caseId&&!await ctx.db.get(ticket.caseId))throw new Error('Upload unavailable');
 await ctx.db.insert('caseFiles',{storageId:a.storageId,deviceHash:ticket.deviceHash,caseId:ticket.caseId,createdAt:Date.now()});await ctx.db.patch(ticket._id,{storageId:a.storageId});return null;
}});
export const owns=internalQuery({args:{caseId:v.id('cases'),storageId:v.id('_storage')},returns:v.boolean(),handler:(ctx,a)=>ownsFile(ctx,a.caseId,a.storageId)});
