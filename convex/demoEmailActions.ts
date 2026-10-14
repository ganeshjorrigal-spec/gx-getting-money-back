"use node";
import {action} from './_generated/server';
import {internal} from './_generated/api';
import {v} from 'convex/values';
import {accessToken,googleJson} from './googleActions';
import {encryptToken,decryptToken} from '../lib/token-crypto';
import {hashToken} from './lib/access';
import {publicAppUrl,privateCaseUrl} from '../lib/app-url';
import {confirmationBody,confirmationLink} from '../lib/demo-email';
export function confirmationRaw(from:string,email:string,link:string){return Buffer.from([`From: Refund Genie demo <${from}>`,`To: ${email}`,'Subject: Demo: Confirm your email','MIME-Version: 1.0','Content-Type: text/plain; charset=utf-8','Content-Transfer-Encoding: base64','',Buffer.from(confirmationBody(link)).toString('base64')].join('\r\n')).toString('base64url');}
export const request=action({args:{code:v.string(),token:v.string(),deviceId:v.string(),email:v.string()},returns:v.null(),handler:async(ctx,a):Promise<null>=>{
 const nonce=crypto.randomUUID().replaceAll('-','')+crypto.randomUUID().replaceAll('-','');
 const id=await ctx.runMutation(internal.demoEmail.reserve,{...a,nonceHash:await hashToken(nonce),encryptedCaseToken:await encryptToken(a.token)});
 const connection=await ctx.runQuery(internal.googleConnect.connectionByKind,{kind:'demo'}),desk=process.env.TICKBACK_DEMO_ADDRESS;
 if(!connection||!desk||connection.email!==desk.toLowerCase())throw new Error('The demo mailbox is unavailable.');
 const auth=await accessToken(connection.encryptedRefreshToken);
 await googleJson('https://gmail.googleapis.com/gmail/v1/users/me/messages/send',auth,{method:'POST',body:JSON.stringify({raw:confirmationRaw(desk,a.email.trim().toLowerCase(),confirmationLink(publicAppUrl(process.env),nonce))})});
 await ctx.runMutation(internal.demoEmail.sent,{id});return null;
}});
export const confirm=action({args:{confirmation:v.string()},returns:v.object({url:v.string()}),handler:async(ctx,a):Promise<{url:string}>=>{
 if(!/^[a-f0-9]{64}$/.test(a.confirmation))throw new Error('Invalid confirmation link');
 const result=await ctx.runMutation(internal.demoEmail.consume,{nonceHash:await hashToken(a.confirmation)});return {url:privateCaseUrl(publicAppUrl(process.env),result.code,await decryptToken(result.encryptedCaseToken))};
}});
