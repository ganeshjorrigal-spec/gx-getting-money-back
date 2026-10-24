import {addDays} from './dates';
/** Waiting deadlines are checked the following calendar day at 10:00 India time. */
export function dueCheckTime(date:string){return Date.parse(`${addDays(date,1)}T04:30:00.000Z`);}
export function dueCheckChoices(url:string,date:string){
 const choice=(answer:string)=>{const link=new URL(url);link.searchParams.set('checkin',answer);link.searchParams.set('due',date);return link.toString();};
 return `Has your refund arrived?\n\nIt came: ${choice('landed')}\n\nNot yet, chase it: ${choice('not_yet')}\n\nOpen your case and confirm your answer. Opening this link alone never changes your case.`;
}
