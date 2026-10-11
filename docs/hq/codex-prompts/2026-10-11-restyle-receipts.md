# Codex prompt: restyle to "Receipts + Calm ledger", with logo, visuals and brand logos (D-037)

Run AFTER `2026-10-11-walkthrough-fixes.md` is committed and deployed. Paste everything below the line.

---

git pull, then the AGENTS.md start-of-session order. Read D-033, D-036 and D-037. This is a look and copy change. Do not change flight or event logic, dates, playbook data, reply reading, demos or payment rules. One clean commit per step.

## Step 1: design tokens (one file, everything uses it)

Put these in one tokens file (CSS variables) and remove stray colours from components.

- Background `#f7f6f1` (warm paper). Card `#ffffff`. Line `#d9d8ce`.
- Ink `#14213d` (navy, headings and primary buttons). Body text `#3b4252`. Muted `#6a7067`.
- Overdue: amber fill `#fde7c4`, text `#8a4b00`, stamp border `#c2410c`, always with an icon and the word.
- Money received: green `#1f6b4a`. Used ONLY when a case is marked "It's in". Nowhere else.
- Fonts (Google Fonts, with fallbacks): headings Fraunces 500/700; body Public Sans 400/600; dates, codes, rule references JetBrains Mono 400.
- Radius 12px cards, 10px buttons, 6px for the receipt slip. Tap targets at least 44px. Light theme only for now.

## Step 2: shared components

- **Receipt slip**: the "who owes you" block. Mono labels on the left (WHO HAS IT, DUE BY, WRITE TO NEXT, ABOVE THEM, AMOUNT), plain values on the right, a rotated stamp "OVERDUE · N WORKING DAYS" in the corner when overdue. Rows in this order: who owes you, who to contact next, due date, above them, amount. Each fact appears once on the card (today "Next person" repeats "Who to contact next"; remove the repeat). Count overdue in the same unit as the rule: a rule in calendar days ("seven days", credit card) shows "Overdue by N days"; a rule in working days shows working days.
- **Source line**: under any rule or date, one mono line: rule name and section, or "From <company>'s reply of <date>", or "Refund Genie's reading". Every date and every claim on screen gets one.
- **Next move card**: the next mail with To, CC, subject and "Open in Gmail". This stays on every case card (D-037).
- **Status badge**: amber Overdue, grey Waiting, green It's in.

## Step 3: logo and illustrations (OpenAI image API)

Key: `OPENAI_API_KEY` in `.env` (Ganesh adds it; if missing, stop this step and list it). Use the OpenAI Images API with the current image model (check the docs for the model name; "DALL-E" is the family Ganesh means). Generate at build time with a script in `scripts/`, never at runtime. Spend cap: 40 images total.

Spend rules for the script:
- Run it once with `--dry-run` first: print how many images it will make, at what size and quality, and the estimated cost. Wait for Ganesh's go before the real run.
- Drafts at low quality and the smallest square size. Only the logo and illustrations Ganesh picks get one final run at high quality.
- Skip any image whose file already exists, so a rerun or a rebuild never pays twice. Keep a running count in `docs/design/image-spend.md` (images made, model, size, quality).
- On an API error, retry once, then stop and report. Never loop. Never call the image API from tests, CI or the deploy step.

- **Logo**: generate 8 mark ideas into `docs/design/logo-candidates/` (simple, works at 32px, navy on warm paper, idea: a genie lamp crossed with a receipt or a returning arrow; no text in the image). The wordmark "Refund Genie" is set in Fraunces in code, not drawn by the model. Do NOT ship a logo until Ganesh picks one: make `docs/design/logo-candidates/index.html` showing each mark beside the wordmark at 32px, 64px and header size, and list it for him. After his pick, trace or rebuild it as a clean SVG and make the favicon from it.
- **Illustrations**: 4 scenes, one consistent flat style, warm paper background, navy and amber accents, Indian people, no text, no brand logos inside the image:
  1. A young woman at an Indian airport departures board showing "Cancelled", phone in hand.
  2. A man on a call, on hold, looking tired (the customer-care run-around).
  3. A person at home reading a phone with a calm, relieved face (refund on its way).
  4. A family of three with bags, looking at a phone together.
  Save as webp under 120 KB each in `public/illustrations/`, with alt text. Show Ganesh the set in the same review page before using them.

## Step 4: airline and travel-site logos

Full colour and prominent (D-037). Use each company's own official logo file: from their website, press or media kit, or Wikimedia Commons. Never draw them with the image model. Companies: IndiGo, Air India, SpiceJet, Akasa Air, MakeMyTrip, Goibibo, Cleartrip, EaseMyTrip. Save in `public/brands/` and record where each came from in `docs/design/brand-logo-sources.md`. Do not change their colours or shapes. Directly under the strip: "Refund Genie is not linked to or endorsed by these companies. Names and logos belong to their owners."

## Step 5: landing page, in this order, with this copy

Keep it in `app/copy.ts`. Plain English, a few everyday Indian words, no em dashes. Do not name any competitor.

1. **Header**: logo, "How it works", "Try a demo", "Check my refund" button.
2. **Hero** (illustration 1 beside or above on phone):
   - Eyebrow: "For cancelled domestic flights"
   - H1: "Flight cancelled. Refund still not in your account?"
   - Sub: "Refund Genie is an AI agent for stuck flight refunds in India. Tell it once what happened. Genie finds who has your money and the date they had to pay by under DGCA rules, then calls and mails them for you, and keeps at it till the money lands. You only step in if they need you." (D-038)
   - Buttons: "Check my refund" and "See a 3-minute demo".
   - Under the buttons: the receipt slip with the sample case (labelled "Sample case"): SpiceJet, due 1 Oct 2026, write to MakeMyTrip's grievance officer, ₹6,240, stamp OVERDUE.
3. **Logo strip**: "Works for refunds from" plus the 8 logos and the not-affiliated line.
4. **Sound familiar?** (illustration 2): "MakeMyTrip says ask the airline. The airline says it already paid MakeMyTrip. Customer care puts you on hold. Your paisa sits somewhere in between." Then: "Genie checks who actually has it, and puts it in writing with the rule and the date."
5. **What Genie does** (3 icons): "Reads your mail" (finds airline, booking site, PNR, cancellation date). "Knows the rules" (DGCA refund timelines, who the Nodal Officer and Appellate Authority are). "Writes and follows up" (every next mail ready; reads their reply and tells you what it means).
6. **Why Genie** (4 points, icons):
   - "Made for India. DGCA rules, Indian airlines and travel sites, the real grievance officers. Checked against the official text."
   - "Tell your story once. Genie keeps your case, calls and mails them, and updates you. No more explaining it again to a new person every time."
   - "You stay in control. No login, no OTP, no bank details. Ever. If they need you on a call, Genie connects you. Stop Genie any time."
   - "Every claim has a source. The rule, the date, the company's own page. No guesswork."
   - Price, from config: "Free until your first 3 refunds land. Then ₹49 a year. Nothing recovered in that year? You get the ₹49 back."
7. **See a real case**: a phone-frame screenshot of a sample flight case card (fixture, labelled "Sample case"), with "Try the demo" button.
8. **How it works** (4 steps with icons): Paste or upload the mail. See who owes you and the due date. Send the mail from your Gmail. When they reply, Genie reads it and your next step is ready.
9. **Footer**: Terms, Refund policy, Privacy, Contact, the not-affiliated line.

## Step 6: copy consistency (found while reviewing)

- The old pay sheet in `app/c/case-view.tsx` still says "₹49 for this case", the UPI "I've paid" flow, and `guaranteeLine` says "30 days after its due date". These contradict D-033, D-035 and D-036. Every price and guarantee line on every page must read from one config and match: free until 3 refunds land, then ₹49 a year, refund if nothing recovered in the paid year, paid through Razorpay Checkout. If the UPI sheet is still reachable, remove it from flight cases.
- `landingCopy` (events) stays for the event landing only; the main landing is flights.

## Step 7: apply to the other screens

Start, loading, case card, mail draft, demo, and the Terms, Refund policy, Privacy and Contact pages all use the tokens and components. No new features.

## Regression net (after every step, in today's log)

Screenshots at 375px and 1280px of these 6 screens: Landing, Start, flight case card (overdue fixture), mail draft, demo after round 3, Terms. Check: no horizontal scroll, all tap targets at least 44px, green appears only on "It's in", every date has a source line. Type check, unit tests and all evals still pass.

## For Ganesh (list in the log)

- Add `OPENAI_API_KEY` to `.env`.
- Pick a logo and approve the 4 illustrations on the review page.
- Anything skipped and why.

Mark nothing DONE. Update STATE.md, append the log, commit and push.
