# 03 Frontend: information architecture, screens, UX rules, performance

Owner: Claude HQ. Status: DRAFT v1, 4 Oct 2026. Codex reads, never edits.

Interface: **mobile-first web is the real v1 channel** (D-012), not a prototype for WhatsApp. Build and test on a phone, in the browser, because that is where users will be (UD's rule).

Stack: Next.js (App Router) + Tailwind reading `app/styles/tokens.css` + Convex React client. All copy comes from `04-copy.md`.

---

## 1. Site map

| Path | Screen | Purpose | Data |
|---|---|---|---|
| `/` | Landing | The product spec: what it does, why trust it, start a case | Static. Reads "Your cases" from device storage |
| `/sample` | Sample case | A real-case walkthrough to try before your own | Static fixture, no AI call |
| `/start` | Intake | Paste or upload, then start triage | Convex: upload URLs, `cases.create` |
| `/c/[code]` | Case page | The home of one case: status, next step, timeline, proof, check-ins, pay | Convex: subscribed queries; the token is read from the URL fragment |
| `/privacy` | Privacy and how it works | What we store, who processes it, how to delete | Static |
| `/taste` | Taste-lock screens | Temporary; removed after the lock | Static |

**Not in v1:** accounts, a dashboard of all cases across devices, an admin page (Ganesh uses the Convex dashboard), and anything WhatsApp-based beyond the phone's share sheet.

### Case link format

`https://<domain>/c/TB-7K2QX9#k=<43-char base64url secret>`

- `TB-7K2QX9` is the human case code (shown on screen, used in UPI notes).
- The secret after `#` never reaches the server in page requests or logs. The page reads it and sends it to Convex queries as an argument; the server compares its hash. The code alone opens nothing.

---

## 2. Navigation model

- No tab bar and no menu drawer. The case page is "home" for a user with a case.
- Header: wordmark on the left (links to `/`). On case pages, the case code on the right.
- Returning on the same device: the landing page shows **Your cases** (from device storage) above the hero, with the event, amount and route chip for each.
- Back: browser back always works. Sheets close on back (push a history state when a sheet opens).

---

## 3. Screen specs

Each spec lists the layout from top to bottom, then states and events. Event names are logged through Convex (`05-backend.md`, section 11).

### S1. Landing `/`

1. Header: wordmark, and **See a real case** as a text link.
2. **Your cases** (only if device storage has any): up to 3 cards. Tap opens the case.
3. Hero: eyebrow, H1, sub, primary button **Start my case**, secondary **See a real case first**, trust line under the buttons. On the right on desktop, below on mobile: an example case card (clearly labelled "Example").
4. "Sound familiar?": three short lines of the IPL story, with a "Based on a real case" note.
5. How it works: 4 numbered steps.
6. Why not just ask ChatGPT: 3 short columns.
7. What we never do: 4 lines with icons.
8. What we handle: situation chips, then one line on platforms and event types.
9. Pricing: two blocks (Free to check, Rs 49 to stay on it), plus the under-Rs 300 line.
10. FAQ: accordion, 7 questions.
11. Founder note (optional, Ganesh decides): name, one paragraph, contact link.
12. Footer: not-legal-advice line, Privacy, Contact.

- Sticky bottom bar on mobile after scrolling past the hero: **Start my case**.
- Events: `landing_view`, `cta_start_tap` (with position), `sample_tap`, `faq_open` (with id).
- Acceptance: a stranger can say what it does after 10 seconds; LCP of 2.0 s or less on a mid-range Android over 4G; readable at 360 px.

### S2. Sample case `/sample`

- The case page (S5) rendered from a fixture of the IPL story with numbers kept and the name removed.
- A top banner: "This is a sample based on a real case. Nothing here is live." with **Start my own case**.
- Interactions work locally: opening the send sheet, expanding the timeline. Send buttons show a note ("In your case, this opens your email") instead of opening anything.
- Events: `sample_view`, `sample_interaction`, `sample_to_start`.

### S3. Intake `/start`

1. Title and helper line.
2. Textarea (auto-grows, 16 px), with **Paste** and **Add screenshot** buttons under it.
3. Thumbnails of added screenshots (up to 4), each with a remove button.
4. "Or start with what happened" situation chips (multi-select). Tapping a chip adds a short line to the textarea that the user can edit.
5. Safety line about OTPs and card numbers.
6. Primary **Check my refund**, disabled until there is text, a screenshot or a chip, with the hint shown under it.

- On submit:
  1. Redact the text on the device (section 5.6).
  2. Upload the screenshots.
  3. Call `cases.create`.
  4. Save `{code, token}` to device storage.
  5. Navigate to `/c/[code]#k=...` at once (the case page shows progress).
- Errors: an upload fails, so that thumbnail shows "Retry"; creation fails, so the text stays and a banner offers "Try again".
- Events: `intake_view`, `intake_paste`, `intake_screenshot_add`, `intake_chip`, `intake_submit`, `intake_error`.

### S4. Agent progress (a state of the case page)

- The case header shows a skeleton. Below it, 4 progress steps tick live from Convex: Reading your message, Finding your refund route, Working out your date, Writing your next step.
- After 12 s, show the "still working" line. After 50 s, show the error state with **Try again** (the input is safe). The backend run ends by about 45 s, so the error never shows while a run is still going.
- `aria-live="polite"` announces each finished step.

### S5. Case page `/c/[code]`

Cards appear by stage. Top to bottom:

1. **Case header:** event name, platform, ticket count, amount (tabular), case code.
2. **Check-in banner** (only when stage is `DUE`): question and three answers.
3. **Status card** (the aha):
   - The route chip.
   - The headline (amount + date or situation).
   - The due-date block with the source line. Tag it "estimate" when `dueSource = estimate`.
   - For `FAILED_PAYMENT` past T+5: a compensation line.
   - Low confidence (below 0.6): "We think this is [route]. Is that right?" with Yes / Not quite.
4. **Next-step card:**
   - Title and a one-line why.
   - The main action by channel: **Open in my email** opens the send sheet, **Copy for the chat**, or the form checklist.
   - Then **I've sent it** / **I've done this**.
   - For `WAIT`: "Nothing to send yet" and the check-in date.
   - For `NO_ROUTE`: the options list.
   - For `NEED_INFO`: the questions inline (choice chips or a one-line input) and **Continue**.
5. **Save card** (until the user has saved once): **Add check-in to calendar**, **Copy my case link**, **Send to my WhatsApp**, and the note "This link is your key."
6. **Pay card** (amount Rs 300 or more or unknown, not paid, after the first written message): summary and **Stay on it for ₹49** (opens S9). Locked later messages show a preview line with a lock icon and the same button. Rules: `05-backend.md` section 8.4.
7. **"They replied?"** row: opens the reply sheet (S7).
8. **Timeline:** newest first, collapsed to the last 5 with **Show all**.
9. **Proof locker:** the screenshots and inputs so far, plus the checklist of what to keep for this route.
10. **Footer actions:** **It's in, close this case** · **Delete this case** · "Can the founder check in with you?" (optional contact field, once).

- Events: `case_view`, `aha_seen` (first time the status card renders with a route), `next_step_open`, `email_open`, `copy_message`, `marked_sent`, `calendar_add` (with platform), `link_copy`, `share_whatsapp`, `reply_open`, `checkin_answer` (with value), `pay_open`, `pay_claimed`, `case_delete`, `landed`.

### S6. Send sheet (bottom sheet)

1. Title: "Your message to [recipient]".
2. Fields, all editable: To, Subject, Body.
   - If `to` is unknown: an input with help text on where to find the address.
3. "Attach these from your phone" checklist.
4. **Open in my email** (primary). **Copy message** and **Copy address** (secondary).
5. Fine print: it opens your own email app; nothing is sent until you press send there.
6. After the user returns to the tab (visibility change): "Did you send it?" with **Yes, I've sent it** / **Not yet**.

- `mailto` rules are in section 5.2.
- Chat channel variant: no To or Subject. The body is copied, with "Where to paste it" steps shown only if verified in the KB.
- Helpline variant: "File it at consumerhelpline.gov.in or WhatsApp 8800001915", the complaint text to copy, and the checklist.
- Bank variant (`TRACE_bank`, `FAILED_bank`): no To field; the message to copy; steps to send it from the bank app's help section or the customer care email on the statement; then **I've sent it**.
- A REPORTED address (never auto-filled) shows as a hint under the empty To field with "check it on their website".

### S7. Reply sheet

- Textarea and **Add screenshot**. Primary button **Read their reply**.
- On submit, the case goes back to `TRIAGING` and progress shows. The result updates the status and next step, and the timeline shows "What changed".

### S8. Check-in banner

- Shows when stage is `DUE` (the check-in sets it at 10:00 IST on the date).
- **It's in** opens a confirm step with the amount pre-filled (editable, for partial refunds), then S10.
- **Not yet** triggers re-planning (next ladder step).
- **They replied** opens S7.

### S9. Pay sheet (bottom sheet)

1. Title, what Rs 49 adds (4 lines), and the guarantee line.
2. The payment action, by device:
   - **Android:** **Pay ₹49 by UPI** opens the `upi://` link, with the UPI ID and a copy button below it.
   - **iPhone:** the same `upi://` button (it opens whichever UPI app is set up, or nothing), plus **Save QR to Photos** (UPI apps can scan from the gallery), and copy buttons for the UPI ID and amount. A QR on the same phone's screen can't be scanned, so never rely on it alone.
   - **Desktop:** the QR to scan with a phone, plus the UPI ID with a copy button.
   - Always show the note to include (the case code).
3. **I've paid**: sets `paidState = claimed` and unlocks at once.
4. Fine print about manual confirmation.

- If Ganesh later marks the payment `not_found`, the case shows a caution banner: "We couldn't find your payment. If you paid, reply with the UPI reference and we'll fix it." Locked steps re-lock.

### S10. Money landed

- Big amount with "back." and a closed-case line. Direction C shows the REFUNDED stamp.
- **Share** (share sheet with text and the landing link with `?ref=landed`).
- Feedback: "Was this worth it?" with **Yes** / **Not really** and an optional one-line comment.
- The timeline stays readable. **Delete this case** stays available.

### S11. Out of scope

- The route card says what we heard and that we're starting with event tickets.
- One honest general route: the National Consumer Helpline handles complaints about any company.
- **Tell me when [category] is ready**: an email or phone field (either one), then "Thanks. We'll tell you once, when it's ready."

### S12. Privacy `/privacy`

- Plain sections: what we store, why, who processes it (Convex stores it, OpenAI reads and writes it, Vercel hosts the site), how long we keep it, how to delete it, and a contact.

### S13. Delete confirm (bottom sheet)

- Title, consequences, **Delete case** (destructive) and **Keep it**.
- After delete: remove the case from device storage and show "Deleted." with a link to `/`.

---

## 4. UX rules (apply everywhere)

1. One primary action per state.
2. No dead buttons. If it isn't built, it isn't shown.
3. Every send action names whose app opens.
4. Never block value behind sign-up or payment.
5. The user's input is never lost: save before any AI call; errors keep the text.
6. Every date shows its source. Estimates are tagged.
7. Confirm before destructive or money actions (delete, "It's in", "I've paid").
8. Copy actions show a toast: "Copied".
9. Respect the system font size (use rem). No horizontal scroll at 320 px.
10. Light theme only.

---

## 5. Device behaviours (exact rules)

### 5.1 Device detection
- `/iPhone|iPad|iPod/` in the user agent means iOS. `/Android/` means Android. Anything else is desktop, which shows both options where relevant.

### 5.2 mailto
- Build with `encodeURIComponent` for the subject and body. Line breaks are `%0D%0A`.
- Keep the whole URL at or under 1,900 characters.
- If the body is longer: copy the full body to the clipboard first, then open `mailto` with the To and Subject filled and the body "Your message is copied. Long-press here and tap Paste." Show a toast explaining it.
- Never use the Gmail web compose URL (it fails on mobile Safari).

### 5.3 Calendar
- **Android:** open the Google Calendar template link:
  - Format: `https://calendar.google.com/calendar/render?action=TEMPLATE&text=...&dates=YYYYMMDDT100000/YYYYMMDDT101500&details=...&ctz=Asia/Kolkata`.
  - Title and description come from `04-copy.md`. The description includes the full case link.
- **iPhone:** generate an `.ics` Blob on the device and download it.
  - Required lines: VERSION 2.0, PRODID, UID (`<code>-<checkinId>@<domain>`), DTSTAMP, DTSTART and DTEND at 10:00 to 10:15 IST, SUMMARY, DESCRIPTION, and a VALARM (ACTION:DISPLAY, TRIGGER:-PT0M).
  - Format: CRLF line ends, lines folded at 75 octets. Filename `tickback-<code>.ics`.
- **Desktop:** show both options.
- One calendar entry per scheduled check-in. When check-ins change after a re-plan, the save card reappears: "Your dates changed. Add the new check-in."

### 5.4 UPI
- **Link:** `upi://pay?pa=<VPA>&pn=<payee name>&am=49.00&tn=<case code>&cu=INR`.
- **Android:** the link button.
- **iPhone:** the link button, plus **Save QR to Photos** (a PNG of the QR made on the device with the `qrcode` npm package, downloaded so the user can scan it from the gallery), plus copy buttons for the VPA and amount.
- **Desktop:** the QR on screen, plus the VPA with a copy button.
- Some UPI apps reportedly block person-to-person links with a preset amount. Before Friday, test Google Pay, PhonePe and Paytm on both phones. If one blocks it, drop `am` for that path and show the amount to type.
- Always show the case code: "Add [code] in the payment note."

### 5.5 Share and clipboard
- Share uses `navigator.share` with `{title, text, url}`. If unavailable, copy the link and show a toast.
- **Paste** uses `navigator.clipboard.readText()` where allowed. If refused, focus the textarea and show "Long-press and tap Paste".

### 5.6 Redaction on the device (repeated on the server)
- Replace card numbers with `[card number removed]`: 13 to 19 digits, spaces or dashes allowed between groups, passing the Luhn check, and **not part of a longer run of digits** (so a 23-digit ARN or a UTR is left alone).
- Replace OTP-like codes with `[code removed]`: 4 to 8 digits within 30 characters of the whole words "OTP", "one time password", "verification code" or "PIN" (word boundaries, so "pincode" doesn't match).
- Images cannot be redacted in v1. The intake line asks users to crop them out.

### 5.7 Screenshots
- `accept="image/*"`. At most 4 per input.
- Resize on the device to a 1,600 px long edge and re-encode as JPEG at quality 0.8 (this also strips location data).
- Upload with Convex upload URLs, fetched right before each upload.

### 5.8 Device storage
- Key `tickback.cases`: an array of `{code, token, title, amountPaise, route, updatedAt}`, at most 20 entries.
- Wrap every read and write in try/catch. The app must work with storage blocked; the case link still works.

---

## 6. Performance budgets

| Metric | Budget |
|---|---|
| Landing LCP, mid-range Android, 4G | 2.0 s or less |
| Landing JavaScript (gzipped) | 120 KB or less; keep the Convex client out of the landing bundle |
| Case page: first skeleton | 1.0 s or less |
| Agent: first progress tick after submit | 1 s or less (optimistic) |
| Agent: route on screen | p50 8 s, p95 15 s |
| Screenshot after compression | Under 600 KB each |
| Fonts | 2 families max, `display: swap`, latin + latin-ext |

- Render the landing, sample and privacy pages statically. The case page renders on the client with Convex subscriptions.

---

## 7. SEO and sharing

- Title and meta description from `04-copy.md`. `lang="en-IN"`.
- OG image: a static card (light background, wordmark, the H1). Use `/og.png`, 1200 x 630.
- Case pages: `noindex, nofollow`. They are private links.

---

## 8. Accessibility checklist (summary)

Follow `02-design.md` section 10:
- AA contrast.
- Tap targets of 44 px or more.
- 16 px inputs.
- Labelled icon buttons.
- `aria-live` progress.
- Visible focus.
- Works at 320 px and at 200% zoom.
