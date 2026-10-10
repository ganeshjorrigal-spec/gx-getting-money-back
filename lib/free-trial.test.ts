import { describe, expect, it } from "vitest";
import { trialStatus, freeRefundLimit, countsForTrial } from "./free-trial";
describe("landed refund trial", () => {
 for (const count of [0,2,3,4]) it(`${count} landed cases`,()=>expect(trialStatus(count,3,false,{}).locked).toBe(count>=3));
 it("excludes demos and hand-helped cases from counting and payment",()=>{for(const item of [{demo:{}},{handHelped:true}]){expect(countsForTrial({...item,stage:"CLOSED_LANDED"})).toBe(false);expect(trialStatus(4,3,false,item).locked).toBe(false);}});
 it("counts both events and flights only when landed",()=>{for(const refundType of ["flight","event"]){expect(countsForTrial({refundType,stage:"CLOSED_LANDED"})).toBe(true);expect(countsForTrial({refundType,stage:"WAITING"})).toBe(false);}});
 it("an active annual pass skips payment",()=>expect(trialStatus(4,3,true,{}).locked).toBe(false));
 it("defaults to three and accepts positive integer configuration",()=>{expect(freeRefundLimit(undefined)).toBe(3);expect(freeRefundLimit("2")).toBe(2);for(const value of ["0","-1","bad","2.5"])expect(freeRefundLimit(value)).toBe(3);});
});
