# Codex prompt: overnight build, M2.6 flights (paste everything below the line)

---

Run `git pull` first, then follow the AGENTS.md start-of-session order. Work only on M2.6 in MILESTONES.md. You will work through the night without me; I am asleep and will not answer questions until morning.

## The outcome

By morning, Tickback handles stuck domestic flight refunds alongside events, with payment:
1. A person pastes a flight cancellation mail (or screenshot). Tickback confirms airline, booked via, payment method and cancellation date, asks the PNR, and shows the "who owes you" card: who owes the refund, when it was due, the rule line, the officer above them, and the next mail ready to open in Gmail with the case inbox in CC.
2. When a reply comes (case inbox or pasted), the model reads which company it points at, what it claims, and any date or reference. Code decides who owes it now, the next person and the next rung. If the airline says it already paid the travel site, the owner switches to the travel site.
3. "Try a demo" for flights: one demo Gmail plays two labelled roles (demo travel site, demo airline), exactly 3 rounds, one case timeline, Skip ahead, Money landed, then the "who did what" count. About 3 minutes.
4. Payment: Rs 49 a year, the guarantee line under the price, the pay card opens the Razorpay Payment Link from `NEXT_PUBLIC_RAZORPAY_PAYMENT_LINK`.
5. Landing leads with flights. Events still work exactly as today.

The full spec is `docs/prd/01-product.md` v2: read sections 2.1 to 2.3, 3, 4, 5 (FS-1 to FS-7), 6.1, 6.2, 6.4, 7, 8.2 and 8.4. Rules and contacts come only from `docs/research/playbooks/flights.md` (rows F01 to F23, contacts table C, dates section G). Decisions: D-024 to D-033 in DECISIONS.md. Do not build online stores tonight (D-030).

## Order (stop at a clean commit after each step)

1. Flight playbook as data beside `lib/route-kb.ts` (rules with source and label, contacts from the company's own pages only).
2. Flight intake, routes, dates and the "who owes you" card (FS-1).
3. Reply reading and the owner switch, second company on a mail (FS-2 to FS-4).
4. Flight demo (6.2), reusing the event demo organiser. Remove or bypass any events-only shortcut in `convex/agent.ts` that would fake round 3.
5. FS-5 to FS-7 and the who-did-what count.
6. Payment per D-033, landing switched to flights, privacy page adds "Tickback never logs in" and "Gmail connect is open to test accounts only for now".
7. Eval: at least 8 new flight fixtures (from the stories and the patterns in `docs/research/user-evidence/x-complaints.md`), exact dates, zero invented contacts. All existing fixtures F1 to F16 must still pass.

If time runs short, cut in the order in 8.2: the who-did-what count on real cases first (keep it in the demo).

## What must not change

- Event flow behaviour, event data, existing fixtures, reply tracking, calendar alerts, the event demo.
- Level 1: the user sends every mail from their own Gmail. Tickback never asks for OTP, passwords or bank details, never logs in for anyone.
- Dates are computed in code, never by the model. Contacts are filled only from the playbook. Anything that is Tickback's own choice is labelled "Tickback's expectation" or "Tickback's reading" (D-029). Never promise the 48-hour look-in on a travel-site booking.

## Safety for an unattended night

- Never send an email to any real airline, travel site or person. Tests and demos use only the demo account and the case inbox. Demo replies only to subjects carrying a demo case code (D-027 rules, unit test each).
- Do not sign in to Google, Razorpay or any account. Do not change OAuth settings. If a step needs me (Allow taps, a real send, Razorpay link value), skip it and list it for the morning.
- Secrets stay in `.env`; never print, log or commit them.
- No force push, no history rewrite, no deleting data, nothing outside this repo folder.
- Paid Gemini calls: keep evals to what the milestone needs.
- Do not mark M2.6 READY FOR REVIEW until the morning live proofs are done.

## Proof it worked (in today's log)

- Type check and all unit tests pass; count them.
- Eval output: every flight fixture and F1 to F16, pass or fail, with dates.
- Deployed to the Convex site; the URL loads Home, a flight case, the flight demo start, Privacy, and an existing event case.
- Screenshots or saved HTML of: the who-owes-you card on a fixture case, the owner switch after a fixture reply, the pay card.
- A "For Ganesh in the morning" list: each live proof run I must do (real Gmail send on a test case, full flight demo with timing, Razorpay link paste), and anything you skipped and why.

Then update STATE.md, append the log, commit and push. Use the attribution lines from AGENTS.md conventions for commits.
