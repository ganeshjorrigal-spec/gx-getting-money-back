import {freeRefundLimit} from './free-trial';
// Display copy only. Checkout amounts and trial enforcement stay in the backend.
export const pricing = {
 annualRupees:49,
 trialLimit:freeRefundLimit(),
 annualTitle:'Rs 49 a year',
 payYear:'Pay Rs 49 for a year',
 loadPay:'Load payment and pay Rs 49',
 guarantee:'If Refund Genie recovers nothing in that year, your Rs 49 comes back.',
};
export const trialPriceLine=(limit=pricing.trialLimit)=>`Free until ${limit} refunds land. Then Rs ${pricing.annualRupees} a year.`;
export const landingPriceLine=`Free until your first ${pricing.trialLimit} refunds land. Then ₹${pricing.annualRupees} a year.`;
