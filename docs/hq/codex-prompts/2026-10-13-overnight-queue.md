# Codex overnight queue, Tue 13 Oct 2026

Written by HQ at 01:30 IST. Ganesh is asleep. Work through the items in order. One commit per item. After each item, append the log and push.

If an item needs a decision that is not in DECISIONS.md, do not decide it: write the question under "For Ganesh" in today's log, skip that part, and go on to the next item.

Rules for every item: no Cloudflare publish, no `npm run deploy`, no calling settings or allow-list changes, no keys in the repo, logs or chat, no live calls, no real-company mail. Mark nothing DONE. Keep the whole suite green.

## 1. Restyle polish (small)

Read `docs/hq/review-2026-10-13-restyle-phase-a.md`. On the case card, Overdue appears three times. Keep only the stamp in the slip. Remove the Overdue badge on the case card, and replace the "Overdue by N working days" heading under the slip with the plain sentence that follows it. Screenshots at 375px and 1280px of the overdue flight case.

## 2. Privacy follow-ups 1 and 2 (needed before today's live-call decision)

Read `docs/hq/review-2026-10-12-privacy-fix.md`, "Follow-ups for Codex".
- **1. "code" blocks too much.** Treat "code" and "digit" as a private ask only when the care line asks for it (read out, share, confirm, tell, send, text, give) or mentions an SMS, OTP or the phone. Let "reference code", "refund reference" and "complaint reference" through. Tests: "Care: Your refund reference code is ABC12345." is kept with its recording link; "Care: Please read out the code we sent." still triggers. All four HQ probe strings still keep no passenger answer and no recording link.
- **2. Vapi speaker labels.** Check Vapi's current docs for how an ended call's transcript and messages label the two sides. Map the side that answered the phone (the care agent) to `Care:` and the assistant to `Genie:` before `safeTranscript` runs. Only a side that joins after a transfer is the passenger. Add a test with a Vapi-shaped payload. Write in the log what the docs say and the link. If the docs are unclear, say so and keep today's fail-safe behaviour.

## 3. Support contacts (checked, with sources)

Ganesh's notes: `docs/research/support-contacts-ganesh-2026-10-13.md`. For each address below, open the company's OWN page and add it to the playbook only if the address appears there. Record the page URL and today's date as the source, as other contacts do. Mark it VERIFIED only when found on the company's own page; otherwise leave it out and list it for Ganesh.
- MakeMyTrip `triphelp@makemytrip.com` (support / refunds email)
- Goibibo `travel@goibibo.com`
- Cleartrip `customersupport@cleartrip.com` (and `wecare@cleartrip.com` only if the page names it for customers)
- Yatra `support@yatra.com`
- ixigo `customersupport@ixigo.com`
Do not add `IPR@go-mmt.com` or `report@go-mmt.com` (trademark and abuse addresses). Grievance officer addresses stay as the escalation contacts they already are.
- **Air India:** no support email. Add a portal step: the refunds page `https://www.airindia.com/in/en/contact-us/customer-support-portal/refunds.html` with subcategory "Status Check on Pending Refund" for the early status step, and "New Refund Request" where no request was made. Show the user the fields the form asks for, filled from the case where known: title, name, email used to book, phone, booking channel, e-ticket number, comment, and that it needs the boarding pass and ticket copy. Use the existing `portal` channel. Genie never fills the form itself.
- Tests: the early status mail for a MakeMyTrip pending case now has a To address; an Air India case gives the portal step with its field list.

## 4. Sample case for the launch video

Do `docs/hq/codex-prompts/2026-10-12-sample-case-for-video.md`. The sample case must have a due date in the past, so it shows a real Overdue stamp under D-042.

## 5. Restyle Phase B, dry run only

From `docs/hq/codex-prompts/2026-10-11-restyle-receipts.md`, Steps 3 and 4. Run the image script with `--dry-run` only: print the count, size, quality and estimated cost, and stop. Do NOT make any paid image call until Ganesh says go in chat. You may collect the 8 official brand logo files and their sources (Step 4), since that costs nothing, but do not place them on the page yet.

## At the end

Update STATE.md once with where each item stands. Report: commit per item, test count, anything skipped and why, and the "For Ganesh" list.

## Short paste block

```
git pull. Read docs/hq/codex-prompts/2026-10-13-overnight-queue.md and work through items 1 to 5 in order, one commit per item, pushing after each. If an item needs a decision not in DECISIONS.md, log the question for Ganesh, skip that part and continue. No Cloudflare publish, no npm run deploy, no calling settings, no keys, no paid image calls. Mark nothing DONE.
```
