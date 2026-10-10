import { describe, it, expect } from "vitest";
import { createHmac } from "node:crypto";
import { checkoutEligible, checkoutKeyMatches, validPaymentSignature } from "./razorpay";

describe("verified annual checkout", () => {
  const fixture = "synthetic-test-input-only";
  const order = "order_fixture123", payment = "pay_fixture123";
  const signature = createHmac("sha256", fixture).update(`${order}|${payment}`).digest("hex");
  it("rejects mismatched checkout setup before creating an order", () => {
    expect(checkoutKeyMatches("synthetic-public-id", "different-public-id")).toBe(false);
    expect(checkoutKeyMatches(undefined, "synthetic-public-id")).toBe(false);
    expect(checkoutKeyMatches("synthetic-public-id", "synthetic-public-id")).toBe(true);
  });
  it("accepts an independently computed HMAC vector", async () => {
    expect(await validPaymentSignature(fixture, order, order, payment, signature)).toBe(true);
  });
  it("rejects each changed signature character", async () => {
    for(let i=0;i<signature.length;i++) {
      const altered=signature.slice(0,i)+(signature[i]==="0"?"1":"0")+signature.slice(i+1);
      expect(await validPaymentSignature(fixture, order, order, payment, altered)).toBe(false);
    }
  });
  it("rejects an order that is not stored for the case", async () => {
    expect(await validPaymentSignature(fixture, "order_other", order, payment, signature)).toBe(false);
  });
  it("rejects missing or malformed fields and changed payment ids", async () => {
    for(const bad of ["", "abc", "g".repeat(64)]) expect(await validPaymentSignature(fixture, order, order, payment, bad)).toBe(false);
    expect(await validPaymentSignature(fixture, order, order, "pay_changed", signature)).toBe(false);
    expect(await validPaymentSignature(fixture, order, "", payment, signature)).toBe(false);
  });
  it("allows real flights only, excluding demo and hand-helped cases", () => {
    expect(checkoutEligible({refundType:"flight"})).toBe(true);
    expect(checkoutEligible({refundType:"flight",demo:{round:0}})).toBe(false);
    expect(checkoutEligible({refundType:"flight",handHelped:true})).toBe(false);
    expect(checkoutEligible({refundType:"event"})).toBe(false);
  });
});
