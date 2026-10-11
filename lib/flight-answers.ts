import { validFlightDate } from "./flight";

export function answerAvailable(item:{questions?:{id:string}[];facts?:{paymentMethod?:string}|null},id:string) {
 return !!item.questions?.some(q=>q.id===id)||(id==="paymentMethod"&&item.facts?.paymentMethod==="unknown");
}
export function answerDate(value:string) {
 const input=value.trim();const local=input.match(/^(\d{2})[/-](\d{2})[/-](\d{4})$/);
 const date=local?`${local[3]}-${local[2]}-${local[1]}`:input;
 if(!validFlightDate(date))throw new Error("Please pick a date from the calendar");
 return date;
}
export function answerAmount(value:string) {
 const input=value.trim().replace(/^₹\s*/,"").replace(/,/g,"");
 if(!/^\d+(?:\.\d{1,2})?$/.test(input))throw new Error("Please enter an amount in rupees");
 const amount=Number(input);if(!Number.isFinite(amount)||amount<0)throw new Error("Please enter an amount in rupees");
 return amount;
}
export function questionValue(values:Record<string,string>,id:string,value:string) {return {...values,[id]:value};}
export function clearQuestion(values:Record<string,string>,id:string) {const next={...values};delete next[id];return next;}
export function questionInput(id:string) {return /Date$/.test(id)?"date":/Time$/.test(id)?"datetime-local":"text";}
