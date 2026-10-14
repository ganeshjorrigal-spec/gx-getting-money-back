import {internalMutation,type MutationCtx} from './_generated/server';
import {internal} from './_generated/api';
import {v} from 'convex/values';
import {assertAccess,hashToken} from './lib/access';
import {takeRate} from './lib/rate';
import {validEmail} from '../lib/case-email';
import {todayIST} from '../lib/dates';
import {foldGmailAddress} from '../lib/demo-email';
const ttl=30*60*1000;
async function takeConfirmationMailRate(ctx:MutationCtx,key:string,limit:number,message:string){
 const used=await ctx.db.query('rateCounters').withIndex('by_key',q=>q.eq('key',key)).unique();
 if(used&&used.count>=limit)throw new Error(message);
 await takeRate(ctx,key,limit,86400000);
}
export const reserve=internalMutation({args:{code:v.string(),token:v.string(),deviceId:v.string(),email:v.string(),nonceHash:v.string(),encryptedCaseToken:v.string()},returns:v.id('demoEmailConfirmations'),handler:async(ctx,a)=>{
 const item=await assertAccess(ctx,a.code,a.token);const email=a.email.trim().toLowerCase();
 if(!item.demo?.chaseStory||!item.demo.emailRequired||item.demo.emailConfirmedAt||item.chase||item.demo.expiresAt<=Date.now())throw new Error('Use an unconfirmed demo');
 if(!validEmail(email)||!/^[A-Za-z0-9_-]{12,100}$/.test(a.deviceId)||await hashToken(a.deviceId)!==item.deviceHash)throw new Error('Use a valid email on the device that started this demo');
 const day=todayIST();const used=await ctx.db.query('rateCounters').withIndex('by_key',q=>q.eq('key',`demo-confirm-device:${item.deviceHash}:${day}`)).unique();if(used&&used.count>=3)throw new Error('At most three confirmation emails per device per day. Try tomorrow.');await takeRate(ctx,`demo-confirm-device:${item.deviceHash}:${day}`,3,86400000);
 // All reservations are atomic: rejection rolls back every counter and record.
 await takeConfirmationMailRate(ctx,`demo-confirm-mail-address:${await hashToken(foldGmailAddress(email))}:${day}`,3,"We've sent this address three links today. Try tomorrow.");
 await takeConfirmationMailRate(ctx,`demo-confirm-mail-overall:${day}`,100,'The demo is busy today. Try again tomorrow.');
 const previous=await ctx.db.query('demoEmailConfirmations').withIndex('by_case',q=>q.eq('caseId',item._id)).take(4);for(const row of previous)if(!row.usedAt)await ctx.db.patch(row._id,{superseded:true});
 const id=await ctx.db.insert('demoEmailConfirmations',{caseId:item._id,email,nonceHash:a.nonceHash,encryptedCaseToken:a.encryptedCaseToken,createdAt:Date.now(),expiresAt:Date.now()+ttl});await ctx.scheduler.runAfter(ttl,internal.demoEmail.expire,{id});return id;
}});
export const sent=internalMutation({args:{id:v.id('demoEmailConfirmations')},returns:v.null(),handler:async(ctx,{id})=>{await ctx.db.patch(id,{sentAt:Date.now()});return null;}});
export const consume=internalMutation({args:{nonceHash:v.string()},returns:v.object({code:v.string(),encryptedCaseToken:v.string()}),handler:async(ctx,{nonceHash})=>{
 const row=await ctx.db.query('demoEmailConfirmations').withIndex('by_hash',q=>q.eq('nonceHash',nonceHash)).unique();
 if(!row||row.usedAt||row.superseded||row.expiresAt<=Date.now())throw new Error('This confirmation link expired or was already used. Request another link from your demo.');
 const item=await ctx.db.get(row.caseId);if(!item?.demo?.chaseStory||!item.demo.emailRequired||item.chase||item.demo.emailConfirmedAt||item.demo.expiresAt<=Date.now())throw new Error('Demo unavailable');
 const canonical=foldGmailAddress(row.email);
 const addressKey=`demo-confirm-address:${await hashToken(canonical)}:${todayIST()}`;const used=await ctx.db.query('rateCounters').withIndex('by_key',q=>q.eq('key',addressKey)).unique();if(used&&used.count>=1)throw new Error('One demo per email per day. Try tomorrow.');
 await takeRate(ctx,addressKey,1,86400000);
 await ctx.db.patch(row._id,{usedAt:Date.now()});await ctx.db.patch(item._id,{email:row.email,demo:{...item.demo,emailConfirmedAt:Date.now()}});return {code:item.code,encryptedCaseToken:row.encryptedCaseToken};
}});
export const expire=internalMutation({args:{id:v.id('demoEmailConfirmations')},returns:v.null(),handler:async(ctx,{id})=>{const row=await ctx.db.get(id);if(row&&row.expiresAt<=Date.now())await ctx.db.delete(id);return null;}});
