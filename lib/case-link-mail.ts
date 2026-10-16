import {validEmail} from './case-email';
export function caseLinkRecipient(item:{email?:string|null;factsConfirmedAt?:number|null;demo?:unknown}){
 return validEmail(item.email)&&(item.demo?!!(item.demo as {emailConfirmedAt?:number}).emailConfirmedAt:!!item.factsConfirmedAt)?item.email.trim().toLowerCase():null;
}
export function maskedEmail(email:string){const [name,domain]=email.split('@');return `${name[0]}***@${domain}`;}
export const caseLinkLimitMessage='Already sent 3 times today.';
