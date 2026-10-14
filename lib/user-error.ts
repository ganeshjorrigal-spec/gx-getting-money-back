import {confirmationSendError} from './demo-email';
import {portalCopy} from "../app/copy";
// Only these fixed messages reach the screen; the original error stays in the console.
export function userError(error:unknown) {
 const message=error instanceof Error?error.message:"";
 if(message.includes(confirmationSendError))return confirmationSendError;
 if(/three confirmation emails per device per day/i.test(message))return "At most three confirmation emails per device per day. Try tomorrow.";
 if(/One demo per email per day/i.test(message))return "One demo per email per day. Try tomorrow.";
 if(/confirmation link expired|already used/i.test(message))return "This confirmation link expired or was already used. Request another link from your demo.";
 if(/valid email|Confirm your demo email/i.test(message))return "Please add a valid email and confirm it for the demo.";
 console.error(error);
 if(/13 digits|e-ticket/i.test(message))return portalCopy.ticketError;
 if(/valid date|pick a date|YYYY-MM-DD/i.test(message))return "Please pick a date from the calendar";
 if(/valid rupee|valid amount|amount in rupees|Enter an amount/i.test(message))return "Please enter an amount in rupees";
 if(/payment method/i.test(message))return "Please choose how you paid";
 if(/Add a PNR/i.test(message))return "Please add your PNR, not an OTP or bank detail";
 return "Something went wrong on our side. Your answers are saved; try again.";
}
