import {pricing,trialPriceLine,landingPriceLine} from '../lib/pricing';
export { productName } from "../lib/product";
export const guaranteeLine = pricing.guarantee;

export const metaCopy = {
  title: "Refund Genie: who owes your flight refund?",
  description: "Stuck domestic flight refund? See who owes you, the due date with its source, and your next message. You send every mail; Refund Genie follows the replies.",
};

export const landingCopy = {
  headerLink: "See a real case",
  eyebrow: "For event tickets bought in India",
  headline: "Stuck ticket refund? We'll stay on it till the money lands.",
  sub: "Paste what the organiser told you. In under a minute you'll know where your refund stands, the date it's due, and the exact message to send. Add the check-in to your calendar. If the money hasn't come by then, your next step is ready.",
  primary: "Start my case",
  secondary: "See a real case first",
  trust: "Free to check · No sign-up · Nothing is sent without you",
  example: {
    platform: "BookMyShow",
    label: "Example",
    event: "Monsoon Live, Bengaluru · 2 tickets",
    amount: "₹3,500",
    route: "On its way",
    due: "Due by 23 Oct 2026",
    source: "They said \"within 7-10 working days\" on 9 Oct 2026.",
    next: "Nothing to send yet. Your check-in: 24 Oct 2026.",
  },
  familiarTitle: "Sound familiar?",
  familiar: [
    "The match got moved to another city.",
    "Support said \"we don't know yet\". For four days.",
    "Then a form. Then a courier, at your cost. Then two weeks of silence.",
  ],
  familiarNote: "Based on a real case. ₹2,400. About 20 days.",
  howTitle: "How it works",
  how: [
    ["Paste the message.", "SMS, email, WhatsApp or a screenshot. Or just tell us what happened."],
    ["Know where you stand.", "Your refund route, the date it's due, and why that date."],
    ["Send the right message.", "Written for you. It opens in your own email, ready to send. Edit anything."],
    ["Check in on the date.", "It goes on your calendar with your case link. Not there yet? Your next step is ready."],
  ],
  whyTitle: "Why not just ask ChatGPT?",
  why: [
    ["It remembers your case.", "Every message, every date, every proof. One link."],
    ["It knows the route.", "Cancelled, postponed, moved, failed payment, \"refunded\" but missing. Each one has a different path."],
    ["It's ready when you come back.", "On your check-in date, the next step is already written."],
  ],
  neverTitle: "What we never do",
  never: [
    "Ask for OTPs, passwords, card numbers or bank logins.",
    "Send anything without you. Messages go from your own email.",
    "Keep your case after you delete it.",
  ],
  handleTitle: "What we handle",
  handles: ["Event cancelled", "Postponed", "Venue changed", "Money gone, no ticket", "\"Refunded\" but not received", "Can't attend (we'll tell you honestly)"],
  handleLine: "BookMyShow, District and organisers' own ticket sites. Concerts, comedy, cricket, festivals.",
  pricingTitle: "Pricing",
  freeTitle: `Free until ${pricing.trialLimit} refunds land`,
  freeBody: `Every message, reply and follow-up is free until ${pricing.trialLimit} refunds land on this device.`,
  paidTitle: `Then ${pricing.annualTitle}`,
  paidBody: `After ${pricing.trialLimit} refunds land, one year covers every flight and event refund chase.`,
  under300: trialPriceLine(),
  questionsTitle: "Questions",
  questions: [
    ["Do you contact the organiser for me?", "No. You send every message, from your own email or the app's chat. We write it and tell you where to send it. That keeps it real, and it keeps you in control."],
    ["How do you know the dates?", "From what the organiser promised, the platform's own refund policy, or the rules, like the RBI's rule for failed payments. Every date shows where it came from. When we have to estimate, we say so."],
    ["Is this legal advice?", "No. We help you use the routes that already exist: support, the platform's grievance officer, and the National Consumer Helpline."],
    ["Which platforms?", "BookMyShow, District, and organisers' own ticket sites in India. Flights are next."],
    ["My refund isn't for an event ticket.", "We're starting with event tickets. Tell us what it is and we'll let you know when we cover it."],
  ],
  privacyQuestion: "What happens to my data?",
  privacyPaid: "Your case lives at a private link only you have. We use Google's Gemini to read your messages and write drafts, on a paid plan where Google doesn't use them to improve its products. Delete your case and it's gone.",
  privacyFree: "Your case lives at a private link only you have. We use Google's Gemini to read your messages and write drafts. During testing we use Gemini's free tier, under which Google may use content to improve its products. Delete your case and it's gone.",
  footer: "Refund Genie helps you follow the refund routes that already exist. Not legal advice.",
  privacyLink: "Privacy",
  contactLink: "Contact",
};

// All editorial calling text lives here; persisted call evidence remains data.
export const callingCopy = {
 landingSub:"Refund Genie is an AI agent for stuck flight refunds in India. Tell it once what happened. Genie finds who has your money and the date they had to pay by under DGCA rules, then calls and mails them for you, and keeps at it till the money lands. You only step in if they need you.",
 landingRelease:"Calls are simulated for now. Mail sending needs your written permission and is limited to approved test addresses.",
 tellWhy:"So every mail and call already has it.",
 landingOnce:"Genie carries every mail and call.",
 landingControl:"No OTP, bank details or login.",
 faqQuestion:"Does Genie call the airline?",
 faqAnswer:"Calling is simulated for now; no phone is dialled. Live calls need separate permission and approved test numbers.",
 startDemo: "Genie sends two test mails and plays a simulated care call. Watch the chase update live. No phone number, Gmail sign-in or real booking needed.",
 calledButton: "I've called",
 liveTestOnly: "Live calls can use only approved test numbers and separate permission.",
 simulatedNotice: "Calling is simulated for now. No phone is dialled.",
 startLiveTest: "Start approved live test call",
 runSimulation: "Run simulated demo call",
 savePermission: "Save calling permission",
 nextDemoCall: "Genie is on it. Next: simulated demo call to Demo Air.",
 nextConfirm: "Genie is on it. Next: mail Demo Air to confirm what care said.",
 speechUnavailable: "Speech playback is unavailable in this browser. Read the simulated transcript below.",
 speechStopped: "Playback stopped. You can read the simulated transcript below.",
 readingCall: "Reading the simulated care call…",
 readingAnswer: "Reading care’s answer…",
 playDemoCall: "Play simulated demo call",
 stopPlayback: "Stop playback",
 demoNotice: "Demo, nothing is sent to a real company. Mails go to our test desk. The call is simulated; no phone rings or call credits are used.",
 mobileLabel: "Mobile number for a permitted call",
 samplePermission: "Use the sample permission for test mails and a simulated call. I can stop this demo any time.",
 demoRecording: "Role-play recording. No real company was called.",
 browserReading: "Saved fixture read aloud by your browser; not a live call or a recorded person.",
 demoTranscript: "Read the simulated call transcript",
 callFailed: "The call could not connect. Genie will follow up by mail.",
 patchSimulated: "Passenger patch-in simulated. No phone rang.",
 patchRequested: "Passenger patch-in requested.",
 roleplayRecording: "Role-play recording. This is not a live company call.",
 callRecording: "Call recording",
 historyTitle: "Calls in this case",
 termsControl: "You can send messages yourself or give written permission for Genie to send and follow up, with your email copied and a letter of authority attached to the first mail. You can stop future sending at any time; already accepted mail cannot be recalled. This release enables only approved test recipients. Calling is simulated in this release; no phone is dialled. Separate permission is required for calling and connecting you if identity checks are needed. Live calls, when enabled by the founder, are made by an AI assistant and recorded. We store the call mode, time, duration, cost, safe transcript and recording link. Codes and private verification details are excluded; unsafe recordings are not retained. Stop ends future calls and requests ending any active call. Simulated calls are labelled and are not real company contacts. You file complaints yourself. Refund Genie never logs in to an airline, travel site, bank or payment account for you. It never asks for an OTP, password or bank details.",
 privacyChase: "Optional written permission lets Genie send refund mails from its case inbox and copy your email. We store your full name, email, permission timestamp, PDF letter of authority and outgoing mail record. We ask for your mobile only when you give separate calling permission, so you can join for identity checks. The first mail attaches that letter. Your email gets a short update when Genie sends a mail or reads a reply. Recipients follow the checked playbook or a known company’s own reply. Stop Genie ends queued and future sending; a mail already accepted by Gmail cannot be recalled. The current release sends only to approved test addresses. Real-company sending is off. Calling is simulated in this release; no phone is dialled. Separate permission is required for calling and connecting you if identity checks are needed. Live calls, when enabled by the founder, are made by an AI assistant and recorded. We store the call mode, time, duration, cost, safe transcript and recording link. Codes and private verification details are excluded; unsafe recordings are not retained. Stop ends future calls and requests ending any active call. Simulated calls are labelled and are not real company contacts.",
 permission:(company:string)=>`and to call ${company}'s customer care for me, and connect me to the call if they need me`,
 transcript:(mode:string)=>`Read the ${mode==='simulated'?'simulated ':''}call transcript`,
 demoWork:(mails:number,replies:number,simulated:number,real:number)=>`Genie sent ${mails} test mails, read ${replies} replies (including the simulated call), and ran ${simulated} simulated demo call. Real company calls: ${real}.`,
 demoShare:(origin:string)=>`I tried Refund Genie's demo: two test mails and one simulated care call, all in one chase. No real company was contacted. ${origin}/start/?demo=flight`,
 nextCall:(label:string,company:string)=>`Genie is on it. Next: ${label.toLowerCase()} with ${company}.`,
};

// Intake reasons are shared by flight, event, permission and reply screens.
export const intakeReasons = {
 message: "So Genie can read what happened and fill your case.",
 screenshot: "So Genie can read the message you cannot paste.",
 name: "So your drafts and permission use your name.",
 pnr: "So every company can find your booking without asking you again.",
 bookingId: "Travel sites look up refunds by this.",
 company: "So we choose the right company and checked contact.",
 amount: "So the draft and recovered amount match your refund.",
 date: "So we can work out the refund date and next check-in.",
 paymentMethod: "So we show the rule for how you paid.",
 contact: "Optional. Only used about this case.",
 mobile: "So you can join a permitted call for identity checks.",
 email: "So you receive a copy of every permitted mail.",
 recipient: "So your mail goes to the address you checked.",
 subject: "So replies stay with your case reference.",
 reply: "So Genie can read their answer and prepare the next step.",
 correction: "So we correct your saved case facts.",
 taxes: "So we can separate refundable fees from the fare.",
 fare: "So we can check any excess cancellation charge.",
 received: "So the closed case records what actually landed.",
 review: "So we can learn whether this case helped you.",
 reminder: "So your reminder uses the date you choose.",
 consent: "So we record exactly what you allow Genie to do.",
 attachments: "So the mail lists only files you will attach.",
 source: "So we record where you checked this address.",
 waitlist: "So we can tell you once when this refund type is ready.",
 default: "So your next step uses the right case details.",
};
export const personalSafetyLine = "No OTP, card or bank details, or login. Ever.";
export function reasonForQuestion(id: string) {
 if (/pnr/i.test(id)) return intakeReasons.pnr;
 if (/bookingId/i.test(id)) return intakeReasons.bookingId;
 if (/airline|bookedVia|platform/i.test(id)) return intakeReasons.company;
 if (/amount/i.test(id)) return intakeReasons.amount;
 if (/date|time|deadline/i.test(id)) return intakeReasons.date;
 if (/payment/i.test(id)) return intakeReasons.paymentMethod;
 if (/tax/i.test(id)) return intakeReasons.taxes;
 if (/reply|destination/i.test(id)) return intakeReasons.reply;
 return intakeReasons.default;
}

// Flight positioning is separate so the existing event screens keep their copy.
export const annualGuaranteeLine = pricing.guarantee;
export const flightLandingCopy = {
 headerLink:"Try a demo",eyebrow:"For cancelled domestic flights",
 headline:"Flight cancelled. Refund still not in your account?",
 sub:callingCopy.landingSub,
 primary:"Check my refund",secondary:"See a 3-minute demo",
 releaseNote:callingCopy.landingRelease,
 brandTitle:"Works for refunds from",companies:["IndiGo","Air India","SpiceJet","Akasa Air","MakeMyTrip","Goibibo","Cleartrip","EaseMyTrip"],
 notAffiliated:"Refund Genie is not linked to or endorsed by these companies. Names and logos belong to their owners.",
 familiarTitle:"Sound familiar?",
 familiar:"MakeMyTrip says ask the airline. The airline says it already paid MakeMyTrip. Customer care puts you on hold. Your paisa sits somewhere in between.",
 familiarAnswer:"Genie checks who actually has it, and puts it in writing with the rule and the date.",
 familiarSource:"Patterns reported in public refund complaints. Each case needs its own evidence.",
 whatTitle:"What Genie does",
 what:[
 ["Reads your mail","Finds the airline, booking site, PNR and cancellation date."],
 ["Knows the rules","DGCA refund timelines, who the Nodal Officer and Appellate Authority are."],
 ["Writes and follows up","Every next mail ready; reads their reply and tells you what it means."],
 ],
 whyTitle:"Why Genie",
 why:[
 ["Made for India.","Official DGCA rules and checked contacts."],
 ["Tell your story once.",callingCopy.landingOnce],
 ["You stay in control.",callingCopy.landingControl],
 ["Every claim has a source.","The rule, date and company page."],
 ],
 priceLine:landingPriceLine,
 realCaseTitle:"See a real case",realCaseNote:"Sample case. Made-up booking details, checked refund rules and contacts.",tryDemo:"Try the demo",
 howTitle:"How it works",
 how:[
 ["Paste or upload the mail.","Tell Genie what happened. Don't include OTPs or card numbers."],
 ["See who owes you.","Your due date, its source and the next person to contact."],
 ["Send the mail from your Gmail.","Read your draft, keep the case inbox in CC, then tap I sent it. Written permission is an option for the test-only mail chase."],
 ["Your next step stays ready.","When they reply, Genie reads it and your next step is ready."],
 ],
};

export const sampleCopy = {
  banner: "This is a sample based on a real case. Nothing here is live.",
  start: "Start my own case",
  sendNote: "In your case, this opens your own email app.",
  timeline: "Timeline",
  showAll: "Show all",
  showLess: "Show less",
  message: "See the message we'd prepare",
  messageTitle: "Your message to support",
  messageBody: "Hello BookMyShow team,\n\nMy match was moved from Ahmedabad to Chennai. I chose the refund option and sent the physical tickets for scanning. Please confirm that you received them and tell me when my ₹2,400 refund will reach my original payment method. Please also share the refund reference number when it is processed.\n\nThank you.",
  close: "Close",
  status: "You need to act",
  event: "IPL match moved to another city",
  platform: "BookMyShow · 2 tickets",
  amount: "₹2,400",
  statusTitle: "A form and physical tickets were needed for this refund.",
  source: "Based on the organiser's instructions in the original case.",
  stepTitle: "Keep proof of each step",
  steps: ["Fill in the refund form.", "Photograph the tickets before sending them.", "Keep the courier receipt and tracking number.", "Screenshot the form after submitting it."],
  checkin: "The refund landed about 20 days after the venue change. This is a past case, not a promised date for yours.",
  saveTitle: "Your case stays at one private link",
  saveBody: "In your own case, you can add a check-in to your calendar and return through that link.",
};

export const intakeCopy = {
  title: "What did they tell you?",
  helper: "Paste the message from BookMyShow, District or the organiser. Or describe what happened in a line or two.",
  placeholder: "e.g. \"Your booking BKMY12345 for Monsoon Live on 18 Oct has been cancelled. Refund of Rs 3,500 in 7-10 working days.\"",
  paste: "Paste",
  screenshot: "Add screenshot",
  pasteRefused: "Long-press in the box and tap Paste.",
  chipsLabel: "Or start with what happened",
  chips: [
    ["Event cancelled", "My event was cancelled."],
    ["Postponed", "My event was postponed."],
    ["Venue changed", "The venue was changed."],
    ["Money gone, no ticket", "Money was debited but I didn't get a ticket."],
    ["\"Refunded\" but not received", "They say it's refunded but it's not in my account."],
    ["I can't go", "I can't attend and want my money back."],
  ],
  safety: "Don't include OTPs or card numbers. We remove them if you do. Crop them out of screenshots.",
  submit: "Check my refund",
  disabled: "Add a message, a screenshot or pick what happened.",
};

export const caseCopy = {
  badLink: "We can't open this case. Check you copied the whole link, including the part after the # sign.",
  progress: ["Read message", "Confirm facts", "Choose next action"],
  working: "Still working. Your message is saved.",
  error: "Something went wrong on our side. Your case is safe.",
  retry: "Try again",
  needInfo: "Need a bit more",
  questionTitle: "A couple of quick questions",
  continue: "Continue",
  routeLabels: {
    WAIT: "On its way", OVERDUE: "Overdue", ACTION_NEEDED: "You need to act",
    TRACE: "Refunded, not received", FAILED_PAYMENT: "Payment failed",
    NO_ROUTE: "No refund route", NEED_INFO: "Need a bit more", OUT_OF_SCOPE: "Not tickets (yet)",
  },
  waitNext: "Nothing to send yet.",
  saveTitle: "Don't lose this case",
  calendar: "Add check-in to calendar",
  copyLink: "Copy my case link",
  share: "Send to myself",
  linkNote: "Anyone with this link can see this case, including your screenshots. Don't forward it.",
  copied: "Copied",
  addDate: "Your dates changed. Add the new check-in.",
  prepareEmail: "Prepare email",
  openEmail: "Open in Gmail",
  draftTitle: "Your message to support",
  emailHelp: "We couldn't confirm where to send this. Paste the organiser's message that names the channel, or find Contact us in the app's Help section.",
  emailNote: "Gmail opens in a browser tab. Nothing is sent until you press send there.",
  trackingOn: "Reply tracking is on for this case.",
  trackingOff: "Once you send the mail, tap 'I sent it' and we'll watch for their reply.",
  ccLabel: "Add this address in CC",
  liveAlertNeedsCalendar: "A live reply alert needs Google Calendar permission.",
  calendarFileOneTime: "A downloaded calendar file is a one-time reminder. It cannot alert you when a reply arrives.",
  calendarTitle: (amount: string, eventName: string) => `Check your ${amount}${amount === "refund" ? "" : " refund"} (${eventName})`,
  calendarDescription: (amount: string, eventName: string, caseLink: string) => `Has your ${amount}${amount === "refund" ? "" : " refund"} for ${eventName} landed? Open your case to update it or get your next step: ${caseLink}\n\nRefund Genie. Nothing is sent without you.`,
};



export const landingSections = {
 sample:"Sample case", sampleCompany:"SpiceJet", sampleDate:"1 Oct 2026", sampleNext:"MakeMyTrip grievance officer", sampleAmount:"₹6,240",
 receiptLabels:["WHO HAS IT","DUE BY","WRITE TO NEXT","AMOUNT"], overdue:"Overdue", landed:"It's in",
 mailReady:"Next mail ready", sent:"Sent", reply:"Refund processed. Reference UTR 4021…", sampleNote:"Made-up booking, refund and reference. This is an illustration of the chase.",
 familiar:[["You","Where is my refund?"],["MakeMyTrip","Please contact the airline."],["Airline","We already paid MakeMyTrip."],["Customer care","Please hold…"]],
 what:[["Reads your mail","Finds your booking details."],["Knows the rules","Shows the rule and date."],["Writes and follows up","Keeps your next step ready."]],
 how:[["Paste or upload","Share the cancellation message."],["Confirm once","Check the booking details."],["Choose how to send","Use Gmail or permit support follow-ups."],["Follow the reply","Your next step updates."]],
 tellTitle:"Tell us once.", tellLine:"We ask your PNR and booking ID once for each case. Every mail and call Genie makes already carries them, so you are not asked to repeat yourself to us.",
 tellAskTitle:"What we ask",tellAsk:"PNR, booking ID, the company, your name.",tellWhyTitle:"Why",tellNeverTitle:"What we never ask",tellNever:"OTP, card, bank details, login.",
 swipeHint:"Swipe to see the next step.", faqTitle:"Your questions",
 faq:[
 ["Why do you need my PNR?","So every company can find your booking without asking you again."],
 ["Will you ever ask for an OTP or bank details?","No. Never share OTPs, card or bank details, or a login with Genie."],
 ["Who sends the mails?","With written permission, Genie sends support-level follow-ups to approved test addresses. Escalations to officers go from your own Gmail."],
 [callingCopy.faqQuestion,callingCopy.faqAnswer],
 ["What does it cost?",`${landingPriceLine} ${pricing.landingGuarantee}`],
 ["Is Refund Genie linked to these airlines?","No. Refund Genie is not linked to or endorsed by the airlines or travel sites."],
 ["Can I stop Genie?","Yes. Stop Genie ends queued and future sending. A mail already accepted by Gmail cannot be recalled."],
 ],
};

export const demoEscalationCopy = {title:"You send this one from your Gmail",note:"Demo officer step. Genie prepares it; you send it in your own name."};
