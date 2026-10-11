# Codex prompt: "Genie chases for you" (D-038)

Run after the hotfix (`2026-10-11-hotfix-answers.md`). The restyle can run alongside, but keep the commits separate. Paste everything below the line.

---

git pull, then the AGENTS.md start-of-session order. Read D-038 first; it changes how much Genie does by itself. Build in five parts, one clean commit each, and stop at each "WAIT" for me. Do not change the playbook data, date rules, or the event flow.

## Part 1: Start the journey (no new services)

The first answer after a user's message becomes "Your first step", above the who-owes-you slip:
- **What to do first:** call or mail whom, and why. Use the playbook only.
- **Have you got these?** A checklist built from the case: cancellation proof (mail, SMS or a screenshot from the airline app), PNR, booking ID, payment method, amount. Missing items say where to find them (for example "Screenshot the 'Cancelled' screen in the IndiGo app").
- **Which rule applies:** for passenger-cancelled tickets inside the look-in window, say what the rule allows and that taxes always come back (D-029 limits apply: never promise the look-in on travel-site bookings).

Tests: three fixtures (airline-cancelled via travel site, passenger-cancelled direct within 24 hours, no proof yet) give the right first step and checklist.

## Part 2: Genie sends the mails (authorisation)

- New choice on the case card, beside "Open in Gmail": **"Let Genie send and follow up"**.
- Authorisation screen: the user types their full name, mobile number and email, and ticks one plain line: "I authorise Refund Genie to contact <company> about my refund for PNR <PNR>, and to receive their replies for me. I can stop this any time." Save the authorisation with a timestamp. Attach it to the first mail as a short PDF ("Letter of authority").
- Genie sends from the case address (current Gmail connection), the user in CC, the case code in the subject. The body opens "I am writing on behalf of <name>, who has authorised Refund Genie to follow up this refund (letter attached)."
- Follow-ups go out by themselves on the dates the plan already sets, up the same ladder. Each sent mail is a case event. The user gets a short email at each step: what was sent, what they said, what's next.
- A **Stop Genie** button ends all sending at once.
- Limits: at most 1 mail per company per case per day; every recipient must come from the playbook or from the company's own reply; never mail anyone else.
- Until I say go, sending works only for demo cases and for addresses on an allow-list in Convex env (`CHASE_ALLOWLIST`, my test addresses). **WAIT** for me before any real company gets a mail.

## Part 3: Genie calls (Vapi + Vobiz)

Keys go in Convex env, which I set: `VAPI_API_KEY`, `VAPI_PHONE_NUMBER_ID` (the Vobiz number brought into Vapi as a SIP trunk; check Vapi's current docs for BYO SIP setup), `CALL_ALLOWLIST`.
- **When:** after the user ticks a second line on the authorisation, "and to call <company>'s customer care for me, and connect me to the call if they need me". Office hours only (10:00 to 18:00 IST, Mon to Sat). At most 2 calls per case per day.
- **Whom:** only the official care number in the playbook. Add a `careNumber` with its source URL per company to the playbook data only where the company's own page lists it; if one is missing, list it for me and do not call.
- **The agent:** an outbound Vapi assistant whose script is built from the case. It opens with: "Hello, I'm an AI assistant from Refund Genie, calling on behalf of <passenger name>, with their permission, about a refund for PNR <PNR>." It asks for: refund status, the date it was processed or will be, who has the money (airline or travel site), and a reference number. It gets through the phone menu (DTMF) using menu notes in the playbook, waits on hold, and ends politely. English and Hindi.
- **Hard rules for the agent:** never say or ask for an OTP, card, bank or password; never agree to a credit shell or voucher; never cancel or change a booking; never pretend to be the passenger. If asked to prove identity, for an OTP, or told "we can only speak to the passenger": say "I'll connect the passenger now" and warm-transfer to the user's mobile with a 15-second summary to the user first. If the user doesn't pick up: end politely and say they will call back.
- **Limits:** 25 minutes per call (hold included), then hang up and log "hold too long". A daily spend cap in config.
- **After the call:** save the transcript and recording link to the case. The model reads the transcript with the same reply reader as mails (who has the money, any date, any reference). The owner switch and the next step work as they do for a mail reply. Then a confirming mail goes to the company: "As told on our call today at <time> by your agent, <what they said>. Please confirm in writing." The call becomes a paper trail.
- **Testing first:** a "Demo airline care" Vapi assistant on a second number plays IndiGo care (menu, hold music, asks for PNR, once asks for OTP so the patch-in fires). All tests call only numbers in `CALL_ALLOWLIST`. **WAIT** for me before any call to a real company. I will sit in on the first three.

## Part 4: Show the chase

Use the case timeline as "The chase": each mail, each call (duration, what they said, the reference), each reply, each date, in plain words with times. The top of the case says one line: "Genie is on it. Next: call SpiceJet care on Tue 14 Oct, 11:00." Landing page: add "Genie calls and mails them for you. You only step in if they need you." beside the existing points, and Rohan's story (below).

### Rohan's story (landing page, "Sound familiar?" section)

Show it only after I confirm Rohan has okayed this exact text:

> "Every time I called, it was a new person. I had to start the story from the beginning." Rohan cancelled his IndiGo return flight, booked through a travel app, within a day of booking. IndiGo said the app would pass on the refund. The app wanted proof he didn't have. Seven or eight calls and three weeks later, about ₹15,000 came back.

## Part 5: The public flight demo shows the new chase

"Try a demo" today shows the old flow (the user opens each mail in Gmail and sends it). Update it to D-038, reusing the demo organiser, the two demo roles and the one case thread (D-032):
- The visitor taps "Let Genie send and follow up" with a pre-filled sample authorisation (labelled "Demo, nothing is sent to a real company").
- Round 1: Genie sends the mail to the demo travel site by itself; the demo travel site replies "ask the airline".
- Round 2: Genie calls the demo airline care line. In the public demo this is NOT a live call: play the recording and transcript saved from the Part 3 test call (the one that ends with a reference), so no visitor burns call credits or needs to give a phone number. The call result moves the owner, as in a real case.
- Round 3: Genie mails the confirming note; the demo airline replies "refund processed, reference X". Money landed, then the who-did-what count, now counting Genie's mails and calls.
- Keep Skip ahead and the 3-minute length. The chase timeline is the hero of the demo.
- Optional, only if time remains: a "Call my phone to hear Genie" button for the demo, limited to numbers in CALL_ALLOWLIST (for Ganesh's live pitch).

Proof: one full demo run timed, with screenshots at 375px of each round and the final count.

## Proof (in the log, per part)

- Part 1: fixture outputs.
- Part 2: a demo case where Genie sends 3 mails over a skipped 10 days, reads 3 demo replies and switches owner; the authorisation PDF; Stop works.
- Part 3: two recorded calls to the demo care line: one ends with a reference, one hits the OTP ask and patches my phone in. Transcripts in the log, reply reader output, the confirming mail. Cost per call.
- Part 4: screenshots at 375px.
- Part 5: see above.
- Privacy page and Terms updated: authorisation, what Genie sends, calls are AI and recorded, what is stored, how to stop.

Mark nothing DONE. Update STATE.md, append the log, commit and push after each part.
