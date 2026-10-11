// Only these fixed messages reach the screen; the original error stays in the console.
export function userError(error:unknown) {
 console.error(error);
 const message=error instanceof Error?error.message:"";
 if(/valid date|pick a date|YYYY-MM-DD/i.test(message))return "Please pick a date from the calendar";
 if(/valid rupee|valid amount|amount in rupees|Enter an amount/i.test(message))return "Please enter an amount in rupees";
 if(/payment method/i.test(message))return "Please choose how you paid";
 if(/Add a PNR/i.test(message))return "Please add your PNR, not an OTP or bank detail";
 return "Something went wrong on our side. Your answers are saved; try again.";
}
