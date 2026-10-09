import {it,expect} from "vitest";
import {annualActive,annualExpiry,razorpayPaymentLink} from "./annual-pass";
it("accepts only HTTPS Razorpay payment links without credentials",()=>{
 expect(razorpayPaymentLink("https://rzp.io/l/sample")).toBe("https://rzp.io/l/sample");
 for(const url of [undefined,"javascript:alert(1)","https://razorpay.com.example.test/pay","https://user:pass@rzp.io/pay","http://rzp.io/pay"])expect(razorpayPaymentLink(url)).toBeNull();
});
it("covers one calendar year, including the leap-day boundary",()=>{
 expect(new Date(annualExpiry(Date.parse("2028-02-29T10:00:00Z"))).toISOString()).toBe("2029-02-28T10:00:00.000Z");
 expect(new Date(annualExpiry(Date.parse("2026-10-10T10:00:00Z"))).toISOString()).toBe("2027-10-10T10:00:00.000Z");
});
it("unlocks claims immediately, expires coverage and bounds missing-payment grace",()=>{
 expect(annualActive({state:"claimed",expiresAt:100},50)).toBe(true);
 expect(annualActive({state:"confirmed",expiresAt:100},100)).toBe(false);
 expect(annualActive({state:"not_found",expiresAt:100,graceUntil:70},60)).toBe(true);
 expect(annualActive({state:"not_found",expiresAt:100,graceUntil:70},70)).toBe(false);
 expect(annualActive(null,50)).toBe(false);
});
