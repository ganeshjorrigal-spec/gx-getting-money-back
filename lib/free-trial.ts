type TrialCase = { stage?: string; refundType?: string; demo?: unknown; handHelped?: boolean };
export function freeRefundLimit(value?: string): number {
 const n=Number(value); return Number.isSafeInteger(n)&&n>0?n:3;
}
export function countsForTrial(item: TrialCase): boolean { return item.stage==="CLOSED_LANDED"&&!item.demo&&!item.handHelped; }
export function trialStatus(landed:number,limit:number,paid:boolean,item:TrialCase) {
 return {landed:Math.min(landed,limit),limit,locked:!item.demo&&!item.handHelped&&!paid&&landed>=limit};
}
