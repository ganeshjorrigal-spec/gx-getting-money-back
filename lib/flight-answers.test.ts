import {describe,it,expect,vi} from "vitest";
import {answerAvailable,answerDate,answerAmount,questionValue,clearQuestion,questionInput} from "./flight-answers";
import {userError} from "./user-error";
describe("flight answer hotfix",()=>{
 it("accepts unknown payment even when absent from questions",()=>{expect(answerAvailable({facts:{paymentMethod:"unknown"},questions:[{id:"cancellationDate"}]},"paymentMethod")).toBe(true);expect(answerAvailable({facts:{paymentMethod:"credit_card"},questions:[]},"paymentMethod")).toBe(false);});
 it("ignores stale questions and retains currently available ones",()=>{expect(answerAvailable({questions:[]},"cancellationDate")).toBe(false);expect(answerAvailable({questions:[{id:"amountPaid"}]},"amountPaid")).toBe(true);});
 it("normalizes three date formats and rejects impossible days",()=>{for(const value of ["2026-09-07","07/09/2026","07-09-2026"])expect(answerDate(value)).toBe("2026-09-07");expect(()=>answerDate("31/02/2026")).toThrow();expect(questionInput("cancellationDate")).toBe("date");});
 it("accepts rupees with a comma or currency symbol",()=>{for(const value of ["6,240","₹6240","₹6,240","6240"])expect(answerAmount(value)).toBe(6240);expect(()=>answerAmount("bad")).toThrow();});
 it("keeps two inputs separate and clears only the answered question",()=>{let values=questionValue({},"cancellationDate","2026-09-07");expect(values.amountPaid).toBeUndefined();values=questionValue(values,"amountPaid","6,240");values=clearQuestion(values,"cancellationDate");expect(values.amountPaid).toBe("6,240");expect(values.cancellationDate).toBeUndefined();values=clearQuestion(values,"amountPaid");expect(values).toEqual({});});
 it("shows fixed plain messages even when errors carry server diagnostics",()=>{const log=vi.spyOn(console,"error").mockImplementation(()=>{});expect(userError(new Error("[CONVEX M(flights:answer)] Request ID abc Uncaught Error: Use a valid date: YYYY-MM-DD"))).toBe("Please pick a date from the calendar");expect(userError(new Error("Request ID abc Uncaught Error"))).toBe("Something went wrong on our side. Your answers are saved; try again.");expect(log).toHaveBeenCalledTimes(2);log.mockRestore();});
});
