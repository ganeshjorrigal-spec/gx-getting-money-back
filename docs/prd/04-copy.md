# 04 Copy: every word on screen, in calendar events and in drafts

Owner: Claude HQ. Status: DRAFT v1, 4 Oct 2026. Codex uses these strings as written. Put them in `app/copy.ts` so they can change in one place. `{curly}` marks a variable.

Product name constant: `PRODUCT_NAME = "Tickback"` (working name, P-5).

Guarantee constant: `guaranteeLine`. Until P-2 is accepted it follows D-009: `If you're not happy within 14 days, you get the ₹49 back.` If P-2 is accepted: `If your refund doesn't land, you get the ₹49 back.` Never hard-code either line anywhere else.

---

## 1. Voice

- Plain words. Short sentences. No em dashes.
- Calm and on the user's side. Never alarmed, never cute about money.
- Say exactly what happens: "Open in my email", not "Submit".
- Indian English. Amounts as `₹2,400` (no space, Indian digit grouping: `₹1,20,000`). Dates as `Fri, 23 Oct`. Times rarely needed.
- No emoji in the interface. No exclamation marks except on "It's in!" moments, at most one.
- Use "we" for Tickback and "you" for the user. Never "the AI".

---

## 2. Meta

- Title: `Tickback: get your stuck ticket refund back`
- Description: `Event cancelled or moved? Paste what the organiser told you. See your refund date and the exact next step, ready to send. Check in on the date and get the next step if it hasn't come.`
- OG title: `Stuck ticket refund? We'll stay on it till the money lands.`

---

## 3. Landing `/`

**Header link:** See a real case

**Your cases (returning device):** Your cases · Open

**Eyebrow:** For event tickets bought in India

**H1:** Stuck ticket refund? We'll stay on it till the money lands.

**Sub:** Paste what the organiser told you. In under a minute you'll know where your refund stands, the date it's due, and the exact message to send. Add the check-in to your calendar. If the money hasn't come by then, your next step is ready.

**Primary button:** Start my case
**Secondary button:** See a real case first
**Trust line:** Free to check · No sign-up · Nothing is sent without you

**Example card (hero visual):**
- Label: Example
- `Monsoon Live, Bengaluru · 2 tickets`
- `₹3,500`
- Chip: On its way
- `Due by Fri, 23 Oct`
- Source: `They said "within 7-10 working days" on 9 Oct.`
- `Nothing to send yet. Your check-in: Sat, 24 Oct.`

**Section: Sound familiar?**
- The match got moved to another city.
- Support said "we don't know yet". For four days.
- Then a form. Then a courier, at your cost. Then two weeks of silence.
- Note: Based on a real case. ₹2,400. About 20 days.

**Section: How it works**
1. **Paste the message.** SMS, email, WhatsApp or a screenshot. Or just tell us what happened.
2. **Know where you stand.** Your refund route, the date it's due, and why that date.
3. **Send the right message.** Written for you. It opens in your own email, ready to send. Edit anything.
4. **Check in on the date.** It goes on your calendar with your case link. Not there yet? Your next step is ready.

**Section: Why not just ask ChatGPT?**
- **It remembers your case.** Every message, every date, every proof. One link.
- **It knows the route.** Cancelled, postponed, moved, failed payment, "refunded" but missing. Each one has a different path.
- **It's ready when you come back.** On your check-in date, the next step is already written.

**Section: What we never do**
- Ask for OTPs, passwords, card numbers or bank logins.
- Send anything without you. Messages go from your own email.
- Sell or share your data.
- Keep your case after you delete it.

**Section: What we handle**
- Chips: Event cancelled · Postponed · Venue changed · Money gone, no ticket · "Refunded" but not received · Can't attend (we'll tell you honestly)
- Line: BookMyShow, District and organisers' own ticket sites. Concerts, comedy, cricket, festivals.

**Section: Pricing**
- **Free to check.** Your route, your date and your first step. Always free.
- **₹49 to stay on it.** For refunds of ₹300 or more. Every message after the first, written for you: follow-ups, the grievance officer email, the helpline complaint. {guaranteeLine}
- Line: Refunds under ₹300 are free, start to finish.

**Section: Questions**
1. **Do you contact the organiser for me?** No. You send every message, from your own email or the app's chat. We write it and tell you where to send it. That keeps it real, and it keeps you in control.
2. **How do you know the dates?** From what the organiser promised, the platform's own refund policy, or the rules, like the RBI's rule for failed payments. Every date shows where it came from. When we have to estimate, we say so.
3. **Is this legal advice?** No. We help you use the routes that already exist: support, the platform's grievance officer, and the National Consumer Helpline.
4. **Which platforms?** BookMyShow, District, and organisers' own ticket sites in India. Flights are next.
5. **My refund isn't for an event ticket.** We're starting with event tickets. Tell us what it is and we'll let you know when we cover it.
6. **What happens to my data?** Your case lives at a private link only you have. We use Google's Gemini to read your messages and write drafts, on a paid plan where Google doesn't use them to improve its products. Delete your case and it's gone.
7. **Who's behind this?** (optional, Ganesh decides) I'm Ganesh. I'm building Tickback in public. Write to me at {contact}.

**Sticky bar (mobile):** Start my case

**Footer:** Tickback helps you follow the refund routes that already exist. Not legal advice. · Privacy · Contact

---

## 4. Sample case `/sample`

- Banner: This is a sample based on a real case. Nothing here is live. · **Start my own case**
- Send button note: In your case, this opens your own email app.

---

## 5. Intake `/start`

- Title: What did they tell you?
- Helper: Paste the message from BookMyShow, District or the organiser. Or describe what happened in a line or two.
- Placeholder: `e.g. "Your booking BKMY12345 for Monsoon Live on 18 Oct has been cancelled. Refund of Rs 3,500 in 7-10 working days."`
- Buttons: Paste · Add screenshot
- Paste refused: Long-press in the box and tap Paste.
- Chips label: Or start with what happened
- Chip lines added to the text:
  - Event cancelled → `My event was cancelled.`
  - Postponed → `My event was postponed.`
  - Venue changed → `The venue was changed.`
  - Money gone, no ticket → `Money was debited but I didn't get a ticket.`
  - "Refunded" but not received → `They say it's refunded but it's not in my account.`
  - I can't go → `I can't attend and want my money back.`
- Safety line: Don't include OTPs or card numbers. We remove them if you do. Crop them out of screenshots.
- Primary button: Check my refund
- Disabled hint: Add a message, a screenshot or pick what happened.
- Screenshot limit: You can add up to 4 screenshots.
- Upload failed: That screenshot didn't upload. Retry, or paste the text instead.

---

## 6. Agent progress

- Reading your message
- Finding your refund route
- Working out your date
- Writing your next step
- After 12 s: Still working. Screenshots take a little longer.
- Failure: We couldn't finish reading that. Your message is saved. · **Try again**

---

## 7. Status card by route

`{platform}` is the display name, or "the organiser" if unknown. `{amount}` uses Indian grouping.

| Route | Chip | Headline | Source line | Next |
|---|---|---|---|---|
| WAIT | On its way | Your ₹{amount} should land by {due} | From the message: `{platform} said "{quote}" on {messageDate}.` From a VERIFIED policy: `{platform}'s policy says {n} working days.` From a REPORTED policy: `{platform} has said {n} working days in recent cancellations (reported).` Estimate: `No date was given. Most platforms say 7 to 10 working days, so this is an estimate.` | Nothing to send yet. Your check-in: {checkin}. |
| OVERDUE | Overdue | Your ₹{amount} was due by {due}. It's {daysLateText} late. | (same as WAIT) | Time to ask {platform} in writing. |
| ACTION_NEEDED | You need to act | Do this by {deadline} to get your ₹{amount} back | `From {platform}'s message on {messageDate}.` | (checklist) |
| TRACE | Refunded, not received | {platform} says your ₹{amount} was refunded on {date}. Let's find it. (If no date: `{platform} says your ₹{amount} was refunded. Let's find it.`) | `Banks trace refunds with a reference number from the platform.` | Ask them for the refund reference number. |
| FAILED_PAYMENT | Payment failed | Your ₹{amount} should be back by {due} | `Under the RBI's 2019 rule, a failed online payment should be reversed within 5 days of the payment date.` | Inside the window: Nothing to send yet. Your check-in: {checkin}. Past it: It's {daysLateText} late. Under the same rule, your bank may owe you ₹{compensation} on top. |
| NO_ROUTE (can't attend) | No refund route | {platform}'s policy doesn't refund tickets when you can't attend. | VERIFIED: `From {platform}'s booking terms.` REPORTED: `Reported for {platform}. Check its terms in the app.` | Here's what you can still try: |
| NO_ROUTE (postponed, no refund offered) | No refund offered (yet) | Your ticket is still valid for {newDate}. No refund has been offered yet. (If no date: `Your ticket is still valid for the new date. No refund has been offered yet.`) | `From {platform}'s message on {messageDate}.` | Here's what you can still try: |
| NEED_INFO | Need a bit more | A couple of quick questions | n/a | (questions) |
| OUT_OF_SCOPE | Not tickets (yet) | This looks like a {category} refund. We're starting with event tickets. | n/a | (see section 13) |

- `{daysLateText}`: `1 day` or `{n} days`.
- Standard questions:
  - Message date: `When did they send this?` · Today · Yesterday · Earlier (date picker)
  - Payment date: `When did you pay?` · Today · Yesterday · Earlier (date picker)
  - Payment status: `Did the app show your payment as failed, pending or successful?` · Failed · Pending · Successful · Not sure
  - Platform: `Where did you buy the tickets?` · BookMyShow · District · The organiser's site · Somewhere else
  - Situation: `What happened?` · Event cancelled · Postponed · Venue changed · Money gone, no ticket · Says refunded, not received · I can't go

- Estimate tag: estimate
- Low confidence: We think this is "{chip}". Is that right? · Yes · Not quite
- Platform unknown: the organiser

---

## 8. Next-step card

| Step | Title | Why line |
|---|---|---|
| L0 email | Ask {platform} support in writing | Email leaves a dated record. That matters if you need to go higher. |
| L0 chat | Ask {platform} in the app's chat | Their chat is the fastest route they offer. Save a screenshot of their reply. |
| L1 | Escalate to {platform}'s Grievance Officer | Under the rules, they must acknowledge within 48 hours and resolve within a month. |
| L2 | File with the National Consumer Helpline | It's free and run by the government. Many companies reply within 30 days. |
| TRACE ask | Ask {platform} for the refund reference | Your bank needs it to find the money. |
| TRACE bank | Ask your bank to trace it | Give them the reference. They can see where the money is. |
| FAILED_PAYMENT bank | Ask your bank to reverse it | Under the RBI rule this should have happened by {due}. |
| ACTION_NEEDED | Do these {n} things by {deadline} | Miss the deadline and you may lose the refund. |
| NO_ROUTE ask | Ask if a refund will be offered | Organisers sometimes add refunds later. Asking puts you on record. |

Buttons: Open in my email · Copy for the chat · Copy message · I've sent it · I've done this
WAIT: Nothing to send yet. Your check-in: {checkin}. Add it to your calendar so you don't miss it.
Locked step (unpaid, ₹300+): Next step ready: {title}. Unlock for ₹49.

**NO_ROUTE options (show only the ones that apply):**
- Ask {platform} if a refund will be offered. (draft ready)
- If you can't attend: check whether {platform} lets you transfer or resell the ticket. We couldn't confirm this for {platform}, so check in the app. (Hide this line when the platform's VERIFIED policy forbids transfer, as District's does.)
- Keep this case open. If they announce refunds, paste the message here.

**ACTION_NEEDED checklist proof lines:**
- Take a photo of the tickets before you send them.
- Keep the courier receipt and the tracking number.
- Screenshot the form after you submit it.

---

## 9. Send sheet

- Title: Your message to {recipientLabel}
- Sub: Edit anything before you send.
- Labels: To · Subject · Message
- Unknown address help: We couldn't confirm {platform}'s address for this. Look for "Grievance Officer" or "Contact us" at the bottom of their website or in the app's Help section, then paste it here.
- Attach label: Attach these from your phone
- Primary: Open in my email
- Secondary: Copy message · Copy address
- Fine print: This opens your own email app. Nothing is sent until you press send there.
- Long message: the email body says `Your message is copied. Long-press here and tap Paste.` and a toast says `Message copied. Paste it into the email.`
- Reported address hint: Reported address. Check it on their website before you send.
- Bank variant title: Your message for your bank
- Bank variant steps: Send this from your bank app's help or support section, or to the customer care email on your statement. Keep the reference number they give you.
- Return prompt: Did you send it? · Yes, I've sent it · Not yet
- Chat variant title: Your message for {platform}'s chat
- Chat variant fine print: Paste this in the chat. Screenshot their reply and add it here.
- Helpline variant title: Your complaint for the National Consumer Helpline
- Helpline variant steps: File at consumerhelpline.gov.in, or WhatsApp 8800001915, or call 1915 (8 AM to 8 PM). Paste the text below. Save the docket number they give you.

---

## 10. Save card

- Title: Don't lose this case
- Buttons: Add check-in to calendar · Copy my case link · Send to my WhatsApp
- Note: This link is your key. Anyone with it can see this case.
- After a re-plan: Your dates changed. Add the new check-in.
- Toasts: Copied · Added

**Calendar event**
- Title: `Check your ₹{amount} refund ({eventName})`
- Description: `Has your ₹{amount} refund for {eventName} landed? Open your case to update it or get your next step: {caseLink}\n\nTickback. Nothing is sent without you.`

**WhatsApp share text:** `My refund case for {eventName}: {caseLink}`

---

## 11. Check-in banner

- Question: It's {today}. Has your ₹{amount} landed?
- Answers: It's in · Not yet · They replied
- It's in confirm: How much came back? `₹{amount}` (editable) · Confirm

---

## 12. Pay sheet

- Pay card button: Stay on it for ₹49
- Amount unknown first: How much did you pay? `₹` (number) · Continue
- Title: Stay on it till the money lands
- Price: ₹49 for this case
- Lines:
  - Every message after the first, written for you
  - Each one built from their last reply and your case
  - Grievance officer and helpline steps, with the right rule cited
  - {guaranteeLine}
- Android button: Pay ₹49 by UPI
- iPhone button: Pay ₹49 by UPI (opens your UPI app if one is set up)
- iPhone and desktop extras: Save QR to Photos · Copy UPI ID · Copy amount
- QR help (iPhone): Can't open the app? Save the QR, then scan it from your gallery in any UPI app.
- UPI ID row: {vpa} · Copy
- Note: Add {code} in the payment note so we can match it.
- Confirm: I've paid
- Fine print: We confirm payments by hand in our first weeks. If we can't find yours, we'll tell you here.
- Not found banner: We couldn't find your payment. If you paid, send us the UPI reference at {contact} and we'll fix it.

## 13. Out of scope

- Headline: This looks like a {category} refund. We're starting with event tickets.
- Help line: Meanwhile, the National Consumer Helpline handles complaints about any company: consumerhelpline.gov.in, WhatsApp 8800001915, or call 1915.
- Waitlist: Tell me when {category} refunds are ready
- Field: Email or phone
- Thanks: Thanks. We'll tell you once, when it's ready.
- Categories (match `outOfScopeCategory`): flight · train or bus · hotel · food delivery · cab · shopping · subscription · something else

---

## 14. Money landed

- Headline: ₹{recovered} back.
- Line: Case closed, {days} days after you started.
- Share button: Tell a friend who's waiting on a refund
- Share text: `Got my ₹{recovered} ticket refund back. Tickback told me the date and wrote every message: {landingLink}`
- Feedback: Was this worth it? · Yes · Not really
- Feedback follow-up: Anything we should fix? (optional) · Send

---

## 15. Founder check-in (optional field)

- Label: Can the founder check in with you about this case?
- Field: Email or phone (optional)
- Saved: Thanks. Ganesh may reach out once.

---

## 16. Delete

- Title: Delete this case?
- Body: We'll remove your messages, screenshots and drafts. This can't be undone.
- Buttons: Delete case · Keep it
- Done: Deleted. · Back to Tickback

---

## 17. Errors and edge states

- Bad link: We can't open this case. Check you copied the whole link, including the part after the # sign.
- Offline: You're offline. Your case is saved. We'll pick up when you're back.
- Rate limited: Lots of cases right now. Please try again in a few minutes. Your message is saved.
- Generic: Something went wrong on our side. Your case is safe. · Try again

---

## 18. Privacy page `/privacy`

- **What we store:** what you paste or upload, the facts we read from it, the drafts we write, your dates and your answers. If you choose, an email or phone for check-ins or the founder.
- **Why:** to work out your refund route and dates, write your messages and remind you.
- **Who handles it:** Convex stores it. Google's Gemini reads your messages and writes drafts. We use Gemini's paid tier, under which Google doesn't use your content to improve its products. (Show this only when `GEMINI_PAID_TIER=true`. Otherwise show: "Google's Gemini reads your messages and writes drafts. During testing we use Gemini's free tier, under which Google may use content to improve its products." The FAQ line follows the same flag.) Vercel hosts the website.
- **What we never collect:** OTPs, passwords, card numbers, bank logins. We remove card numbers and codes from text automatically.
- **Who can see a case:** anyone with its private link. Keep it to yourself. In our first weeks, the founder may look at cases to fix mistakes in the product. We never contact you unless you ask us to.
- **How long we keep it:** until you delete it. We remove screenshots from closed cases after 180 days, and delete cases with no activity for 12 months.
- **Calendar:** if you add a check-in to Google Calendar, your case link is saved in your calendar.
- **Delete:** open your case and tap Delete this case. Your messages, screenshots and drafts are removed at once. We keep only the case code, amount and date of any payment, for our accounts. Google may keep request logs for abuse monitoring under the Gemini API terms.
- **Contact:** {contact}

---

## 19. Draft writing rules (for the agent's drafts)

These rules go into the drafting prompt (`05-backend.md`, section 7.3).

- Written as the user, first person. Polite, firm, specific.
- Always include, when known: booking ID, event name and date, ticket count, amount, what was promised and when, what happened, the exact ask, and a reply-by date.
- One clear ask per message: refund to the original payment method plus the refund reference number.
- Cite a rule only where allowed: the E-Commerce Rules at the grievance-officer and helpline steps; the RBI rule at the failed-payment bank step. Only rules listed in `06-routes-kb.md`.
- No threats, no legal claims beyond the cited rule, no "or else".
- Length: chat 80 words or fewer; email 160 words or fewer; helpline complaint 200 words or fewer.
- Plain English. No "Dear Sir/Madam". Use "Hello {platform} team" or "Hello Grievance Officer".
- Sign-off: "Thank you," then `{name}` and `{registered email or phone}` as placeholders the user fills in. Never invent them.
- Subject lines say the booking, the event and the problem: `Refund for booking {bookingId} ({eventName}, {eventDate}) not received`.

### Skeletons (the agent fills and adapts; never adds facts)

**L0 support email**
Subject: `Refund for booking {bookingId} ({eventName}) not received`
> Hello {platform} team,
> My booking {bookingId} for {eventName} on {eventDate} ({ticketCount} tickets, ₹{amount}) was {situation}. On {promiseDate} you said the refund would reach me {promise}. It has not arrived as of {today}.
> Please refund ₹{amount} to my original payment method and share the refund reference number (ARN or UTR). Could you reply by {replyBy}?
> Thank you,
> {name}
> {registered email or phone}

**L1 Grievance Officer email**
Subject: `Grievance: refund for booking {bookingId} ({eventName}, {eventDate}) not received`
> Hello Grievance Officer,
> I'm writing about my booking {bookingId} for {eventName} on {eventDate} ({ticketCount} tickets, ₹{amount}). The event was {situation}. On {promiseDate}, {platform} said the refund would reach me {promise}. As of {today}, I have not received it. I wrote to support on {l0Date} {and have not had a resolution}.
> Please refund ₹{amount} to my original payment method and share the refund reference number. Under the Consumer Protection (E-Commerce) Rules, 2020, I look forward to your acknowledgement within 48 hours.
> Thank you,
> {name}
> {registered email or phone}

**L2 National Consumer Helpline complaint text**
> Company: {platformLegalOrDisplayName}. Booking {bookingId} for {eventName} on {eventDate}, {ticketCount} tickets, ₹{amount}, paid on {paymentDate} by {paymentMethod}. The event was {situation}. The company promised a refund {promise} on {promiseDate}. It has not been received as of {today}. I contacted support on {l0Date} and the Grievance Officer on {l1Date} {with no resolution / reply: "{quote}"}. I request a refund of ₹{amount} to my original payment method. Documents: booking confirmation, the company's refund message, my follow-up emails.

**TRACE: ask for the reference**
> Hello {platform} team,
> Your message on {refundProcessedDate} said the refund of ₹{amount} for booking {bookingId} was processed. It has not reached my account. Please share the refund reference number (ARN for card, or RRN/UTR for UPI) so my bank can trace it.
> Thank you, {name}

**TRACE: to the bank**
> Hello,
> A refund of ₹{amount} from {platform} for my payment on {paymentDate} has not reached my account. The merchant says it was processed on {refundProcessedDate}. Reference: {arnOrUtr}. Please trace this credit and tell me when it will reach my account.
> Thank you, {name}, account/card ending {last4 placeholder}

**FAILED_PAYMENT: to the bank**
> Hello,
> On {paymentDate} I paid ₹{amount} to {platform} by {paymentMethod}. The money was debited but no ticket was issued. Under the RBI's rule for failed transactions, this should have been reversed by {due}. Please reverse ₹{amount} and credit the compensation due for the delay.
> Thank you, {name}, account/card ending {last4 placeholder}

**NO_ROUTE: ask whether a refund will be offered**
> Hello {platform} team,
> {eventName} (booking {bookingId}, ₹{amount}) has moved to {newDate}. I can't attend on the new date. Will you offer a refund option, and by when should I request it?
> Thank you, {name}

---

## 20. Strings used by screens (not listed above)

- Case page: Show all · Continue · It's in, close this case · Delete this case
- Locked preview: Next step ready: {title}. Unlock for ₹49.
- Beyond the ladder (`beyond` step): You've tried every step we cover. The next option is a formal complaint at a Consumer Commission, through the government's e-Daakhil portal. That's a legal process we don't handle, but your case history here has everything you'd need. Keep this case open; if they reply, paste it here.
- Reopen a closed case: Got a new message? Paste it here.
