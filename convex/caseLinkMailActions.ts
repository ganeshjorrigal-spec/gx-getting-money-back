"use node";
import {action} from './_generated/server';
import {internal} from './_generated/api';
import {v} from 'convex/values';
import {accessToken,googleJson} from './googleActions';
import {rawMail} from './chaseActions';
import {publicAppUrl,privateCaseUrl} from '../lib/app-url';
import {maskedEmail} from '../lib/case-link-mail';
export const send=action({args:{code:v.string(),token:v.string()},returns:v.object({state:v.union(v.literal('sent'),v.literal('limit')),maskedEmail:v.string()}),handler:async(ctx,args):Promise<{state:'sent'|'limit';maskedEmail:string}>=>{
 const slot=await ctx.runMutation(internal.caseLinkMail.reserve,args);
 if(slot.limited)return {state:'limit' as const,maskedEmail:maskedEmail(slot.recipient)};
 if(!slot.id||!slot.connection)throw new Error('Case-link email unavailable');
 const slotId=slot.id,connection=slot.connection;
 let attempted=false;
 try{
  const token=await accessToken(connection.encryptedRefreshToken);
  const current=await ctx.runQuery(internal.caseLinkMail.current,{...args,id:slotId});
  if(!current||current.recipient!==slot.recipient)throw new Error('Case email changed');
  const from=process.env.TICKBACK_INBOX_ADDRESS||current.connection.email;
  const base=publicAppUrl(process.env);if(!from||!/^https:\/\//.test(base))throw new Error('Case-link email unavailable');
  const body=`Your Refund Genie case ${args.code}:\n${privateCaseUrl(base,args.code,args.token)}\n\nKeep this link private. Anyone with it can open the case.`;
  attempted=true;
  const sent=await googleJson<{id?:string}>('https://gmail.googleapis.com/gmail/v1/users/me/messages/send',token,{method:'POST',body:JSON.stringify({raw:rawMail(from,[current.recipient],[],`Your Refund Genie case ${args.code}`,body,`<${crypto.randomUUID()}@refundgenie.local>`)})});
  if(!sent.id)throw new Error('Delivery not confirmed');
  await ctx.runMutation(internal.caseLinkMail.settle,{id:slotId,state:'sent'});
  return {state:'sent' as const,maskedEmail:maskedEmail(current.recipient)};
 }catch{
  await ctx.runMutation(internal.caseLinkMail.settle,{id:slotId,state:attempted?'uncertain':'cancelled'});
  throw new Error(attempted?'Delivery could not be confirmed. Check your inbox before trying again.':'Could not send your case link. Copy the link instead.');
 }
}});
