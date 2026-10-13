# Intake ask-once audit, 13 Oct 2026

Sources: app/start/page.tsx; app/c/{flight-case-view,case-view,event-question,chase-authority,email-case-link,mail-tools,public-chase-demo}.tsx; lib/flight.ts; convex/agent.ts. Controls and branch questions, including demo, draft, reply, payment and consent steps are listed below. Reasons live in app/copy.ts and the shared WhyAsk component. The AI event reader can write situation-specific clarification wording; that open-ended family is listed explicitly rather than claiming a fixed questionnaire.

| Field | Screen / step | Required or optional | Why | Other places / duplicate finding |
|---|---|---|---|---|
| Message / what happened | Both: Start | One message, screenshot or situation needed | Reads the evidence | Reply box asks new evidence, not original story |
| Screenshot | Both: Start / replies | Optional alternative | Reads evidence that cannot be pasted | New screenshots only; no forced re-upload |
| Flight / event | Both: Start | Default flight; selectable | Selects playbook | Confirmation shows result; never asked by permission |
| Situation chips | Both: Start | Optional | Adds a plain description | Not repeated |
| Name | Both: Start | Optional | Signs drafts | Permission requires booking name; NOW prefilled from case, editable confirmation |
| Airline | Flight: missing facts | Required if not read | Correct rule and owner | Confirm shows saved value; permission uses saved company |
| Booking company / direct | Flight: missing facts | Required if not read | Correct route | Confirm shows value; demo fixed |
| Domestic flight | Flight: missing facts | Required if unknown | Checks scope | Not repeated |
| Who cancelled | Flight: missing facts | Required if unknown | Chooses refund rule | Not repeated |
| Cancellation date | Flight: missing facts | Required if absent | Anchors due date | Confirm shows value; cancellation timestamp is separate precision |
| Payment method / card type | Flight: missing facts / unknown method card | Required for applicable rule | Credit card has different timeline | One chooser; held known method hides it |
| Amount paid | Both: missing amount / unknown amount | Required to state amount; pending unknown is allowed | Writes draft amount | Confirmation shows saved; landed amount is different actual money |
| Booking timestamp | Flight: passenger direct cancellation | Required for look-in branch | 48-hour calculation | Not a repeat of booking date alone; retained |
| Cancellation timestamp | Flight: passenger direct cancellation | Required for look-in branch | 48-hour calculation | More precise than cancellation date; retained |
| Departure date | Flight: passenger direct cancellation | Required for look-in branch | Departure eligibility | Not repeated |
| Taxes and airport fees | Flight: non-refundable fare | Required for branch | Refundable part | Breakdown form only |
| Basic fare, fuel surcharge, cancellation charge | Flight: fare breakdown | Optional | Checks excess charge | No later repeat |
| Taxes already returned | Flight: fare breakdown | Required choice | Avoids claiming twice | Not repeated |
| Contacted Cleartrip support? / date | Flight: support first | Required for branch | 72-hour support window | No later repeat |
| PNR | Flight: Confirm | Required | Booking lookup | Prefilled if read; first step and drafts show it, permission does not ask again |
| Booking ID | Both: Confirm; event demo round 2 | Optional for real cases; demo round needs it | Travel-site lookup | Prefilled from facts; event demo has held state, user confirms or picks sample |
| Phone or email contact | Both: Confirm | Optional | Case-only follow-up | Flight NOW prefills saved contact; permission reuses matching phone/email; link email prefilled |
| Fact correction | Both: Confirm / reply correction | Optional correction | Fixes saved interpretation | Explicit correction, not forced repeated intake |
| Refund deadline / promise date | Event: missing facts | Required answer, unknown allowed | Promise or labelled estimate | No-date choices resolve in code; not repeated |
| Message date | Event: missing facts | Required if no anchor | Anchors date calculation | Held answer resolved in code |
| Payment status | Event: missing facts | Required if unclear | Failed-payment route | Held answer resolved in code |
| Model-selected event clarification: company, situation, refund option, ticket format, completion dates, bank trace/reference | Event: NEED_INFO (max questions per run) | Conditional | Disambiguates current evidence | Dynamic question set; no static exhaustive wording possible; saved facts supplied to reader |
| Steps completed date | Event: action needed | Required when marking done | Starts post-action window | Different from original message date |
| Full booking name | Flight: written mail permission | Required for permission | Authority letter identity | NOW prefilled from saved optional name; user confirms spelling |
| Mobile | Flight: written mail permission | Required for permission | Authority letter identity | NOW prefills held phone contact; missing phone remains a new fact |
| Passenger email | Flight: written mail permission | Required for permission | Copies passenger on mail | NOW prefills held email contact; missing email remains a new fact |
| Mail permission checkbox | Flight / public demo: authority | Required for automatic support mail | Records scope | New consent, not repeated facts; officers user-sent |
| Call permission checkbox | Flight: active permission / demo | Separate optional consent | Permits simulated/test call | No extra PNR/company/mobile entry; uses held permission identity |
| Company To address | Both: draft when unknown / event editable | Required to email | Checked recipient | Verified/saved To already filled; user may edit |
| Address source | Event: unverified grievance To | Required for unverified route | Explains user-provided address | New source evidence; not company repeated |
| Subject and draft message | Event: draft editor | Prefilled, editable | Carries case in thread | Confirmation only; no need to rewrite |
| Include case inbox in CC | Event: draft | Optional real; fixed demo | Enables reply reading | New tracking choice |
| Attachment checkboxes | Both: mail draft | Optional | Lists only actual files | Does not ask to upload original proof again |
| Your email to save case link | Both: save link | Required for own compose | Sends private link to self | Prefilled if contact email; local only |
| Company reply / screenshot | Both: reply step | One needed to read reply | Writes next action | New evidence each round |
| Reply interpretation / transfer destination | Flight: unclear reply | Required if unclear | Avoids wrong money owner | Confirmation of new reply; not same booking facts |
| Bank reminder date | Flight: trace with no held timeline | Optional | Personal reminder | Chosen date, not guessed bank rule |
| Check again interval | Event: overdue | Optional choice | Personal reminder | Not refund due date |
| Amount received | Both: Money landed | Required, prefilled expected amount | Records actual recovery | Different from paid amount; kept |
| Worth it / feedback / review | Both: closed case | Optional | Learns if helped | New feedback |
| Waitlist email / phone | Event: out of scope | Optional | One readiness notice | Could reuse contact; not removed without HQ decision |

## Clear duplicates fixed
- Written mail permission now pre-fills held case name and the matching email/phone instead of starting blank. These remain editable for a spelling correction; required permission fields remain required.
- Flight confirm now pre-fills held case contact, as PNR/booking ID already did. Event confirm already held booking/contact; own-link email already held an email contact.
- Why lines now appear below all visible text/file/checkbox/select inputs in these flow components, including new reply and consent controls. Personal fields repeat the existing no-private-details boundary. Choice-only clarifications have a shared reason. Hidden upload controls are explained by their visible screenshot action.
- Start type chips now explicitly have button type so selecting flight/event does not submit the unfinished form.

## For HQ
- Full name at permission is needed for the letter, but Start name is optional; prefill avoids duplicate typing without deciding to make it required earlier.
- Permission requires both mobile and email whereas Confirm permits one optional contact. The missing second value is a new fact, retained. Is mobile still needed for mail-only authority?
- Cancellation date versus full timestamp is extra precision for the look-in rule, retained.
- Event model questions have flexible wording; an unconditional promise that no company will ask anything again cannot be enforced. Landing copy uses HQ's prescribed promise; companies may still request identity checks (no OTP through Genie).
- Waitlist contact is a separate optional subscription purpose; do we want to reuse an existing contact for it? Left unchanged.
- Actual received amount, reply/correction, consent and reminder dates are new information, not repeat questions; retained.
