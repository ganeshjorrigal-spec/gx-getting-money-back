export const confirmCaseEmailMessage="Confirm your email first. Genie only writes and calls for the person who owns this booking's case.";
type EmailCase={email?:string|null;confirmedCaseEmail?:string;emailConfirmedAt?:number;demo?:{emailConfirmedAt?:number}|null};
export function hasConfirmedCaseEmail(item:EmailCase){return !!item.email&&!!(item.emailConfirmedAt&&item.confirmedCaseEmail===item.email||item.demo?.emailConfirmedAt);}
export function requireConfirmedCaseEmail(item:EmailCase,email?:string){
 if(!hasConfirmedCaseEmail(item)||email!==undefined&&email.trim().toLowerCase()!==item.email)throw new Error(confirmCaseEmailMessage);
}
