# R3 review, played as Shaktimaan (idea lock gatekeeper)

Reviewer: Claude HQ sub-agent role-playing Shaktimaan, 9 Oct 2026. Read: CONTEXT.md, market-facts.md, drafts/R3.md, IDEA_SCOPE.md (4 Oct lock), DECISIONS.md, playbooks/flights.md and flights-verification.md, user-evidence/x-complaints.md. Did not open other reviews or R1/R2.

## Verdict

**LOCK WITH CHANGES.**

Why not reject: the bracket is now one case (stuck domestic flight refund), it follows UD's steer to where money really gets stuck, the playbook is real and verified, and the "who owes it now" switch is a job one ChatGPT prompt cannot do. The sheet is also honest about its weak spots, which I reward.

Why not a clean lock: the sheet mixes two users (already overdue vs fresh cancellation), states a Tickback date as if it were law, repeats a Gmail privacy promise I already pushed back on, leaves online stores inside the same milestone, and has no flight user and no flight flow live. Selling by 17 Oct is the weakest part.

## First fork question (with my lean)

Your agent only earns its keep when a reply comes back and it changes the next step. A fresh cancellation has a 14 working day clock that ends after 17 Oct. So which person is v1?

| Left: refund already overdue | Right: fresh cancellation, clock running |
|---|---|
| Past 14 working days (travel site) or 7 days (credit card), or "processed" and no money | Cancelled this week, "refund initiated" |
| First mail goes out on day one | First screen says "nothing to send yet" |
| Replies and owner switches happen before 17 Oct | First due date lands after 17 Oct |
| They are posting on X right now (waits of 10 to 120 days in your sample) | Hard to find; they don't know they are stuck yet |
| ChatGPT cannot run the owner-switch loop | A date plus a calendar link: ChatGPT plus a reminder app gets close |

My lean is the left column. Fresh cases still get the date and the calendar check for free, but they are not the pitch, the story or the demo.

## Remaining problems, ranked

### FATAL
None. Fix the MAJORs and this locks.

### MAJOR

1. **Two users in one sheet.** "Who exactly" says "whose refund has not landed by the date they were told" (overdue). But story 1 and onboarding sell the opposite moment: "Nothing to send now, it is on time. Honestly that is a relief." and "or 'nothing to send yet, it is on time' with the date on your calendar". Your own Fri 16 row admits "a fresh 14-working-day clock is longer than the sprint." Pick the left column and rewrite the trigger, story 1 and onboarding around it.

2. **A Tickback default dressed as law.** "Flights before stores because for flights the law fixes both the owner and the date (VERIFIED)" and story 1 "the airline has to finish my refund in 14 working days, and the date is in my calendar." Your own verifier marked F03 WEAKENED: the CAR fixes 14 working days and the airline's onus, but "does not say when the 14 working days start"; counting from the cancellation date is an HQ DEFAULT. Your header promises "A date marked 'Tickback's expectation' is our choice, never a law." Keep that promise here.

3. **The Gmail promise I already flagged.** "Tickback sees only replies on your refund thread: the ones that reach its case inbox in CC, or, if you choose, a read-only link to that one Gmail thread." There is no read-only link to one Gmail thread. The Gmail opt-in (D-021) uses gmail.readonly, which can read the whole inbox; that is exactly why the CC route became the default (D-022). Last time I found your privacy promise contradicting your privacy page. Don't make me find it twice.

4. **Stores still inside the bracket.** "Online-store refunds are built after flights in the same milestone as a second playbook on the same agent" and the Wed 14 gate "Under 3: I do not switch to stores" (which reads as: 3 or more and you switch to stores with 3 days left). All v1 features should stack in one bracket. Stores move to after 17 Oct, and the Wed 14 gate should change the channel or the sub-case, not the category. Same for "(or direct with the airline)" in v1 versus "widen to direct bookings" as the fallback: it is either in v1 or it is the fallback. Say which.

5. **Flight sheet, mixed-category numbers.** "Post on X; get 'please DM us' (17 of 29 posts)" and the trigger "(7 of 29 posts)" count Flipkart, Amazon, IRCTC, Jio, Meesho and a hotel. Flight-only from the same file: 13 flight posts; 7 got "please DM us" (A14, B2, B3, B4, B5, B11, B12); 3 were "processed, no money" (B6, B9, B15); 4 had the travel site waiting on the airline (B6, B9, B11, B15). Use the flight numbers. They still make your point.

6. **No way in from your main outreach.** "reply to the 11 open domestic flight posts ... no DMs, no links, no phone number". Then how does a stranger reach Tickback? Name the path in one line (link in your X bio, or a name they can search, or a public "drop your stuck flight refund here" post). Also: these posts are 1 to 5 weeks old (3 Sep to 8 Oct by post ID), "open" means open when NotebookLM read them, 5 of the 11 don't state the airline or route, and 3 of them (A13, B4, B11) are passenger-cancelled. Say whether passenger-cancelled refunds are in v1 ("cancelled, refund not landed" doesn't say who cancelled).

7. **Zero flight users, and the live link says events.** "Honest first: I have no stuck flight refund of my own and I have not met a person with one yet." and "Shaktimaan, the live link today still shows events." I locked events on one real interview. Here there is none, and nothing for me to click. I lock the sheet, not the product, so the lock is conditional: one real person with a stuck flight refund by Mon 12 night, and the flight flow plus flight demo live on the .convex.site link by Tue 13. I will click it then.

### MINOR

8. "The idea in one line" is seven sentences. One sentence for the idea, one line for v1 scope, move the out-of-scope list down.
9. "(REPORTED, Outlook Business, 22 Jul 2026)" and "order (18 Jul 2026)" and "cancelled in 2020": the checked source in market-facts is Business Today, 22 Jul 2026, and it does not give the order date. Cite what was checked, or check the extra details.
10. "Voxya charges Rs 899 ... (Voxya's blog, 2021, VERIFIED)": the price is from a 2021 post, so say "Voxya's own 2021 blog; current price not confirmed". And you left out that Voxya files complaints by email for free ("Send complaint via Email 28% success"). That free first mail is your closest Indian rival. List it.
11. "Big direct airline refunds clear under public pressure (IndiGo, Dec 2025, REPORTED)": the source says IndiGo claims refunds were cleared. Write "IndiGo says".
12. "Weak spots ... the travel-site-versus-airline loop rests on one commission order, not my sample" reads as if your X sample shows no loop, while 4 of your 13 flight posts show the travel site waiting on the airline. Be precise: the sample shows that direction; the reverse (airline paid, site sits on it) rests on one order.
13. Story 5 sends a passenger to AirSewa for any refund. Your verifier notes AirSewa in M-IV covers denied boarding, cancellation and long delay; using it for a passenger-cancelled refund is reasonable but not stated. Label it.
14. "With Tickback, 4 steps" hides the repeat. Write "4 steps, then one tap per round".

## Exact changes that make me lock it

1. Answer the fork: v1 user is a domestic flight refund already past due (14 working days for travel-site bookings, 7 days for credit card) or marked "processed" with no money. Rewrite "Who exactly", the trigger, story 1 and onboarding for that person. Fresh cancellations: free date and calendar check, one line, not the pitch.
2. Replace "the law fixes both the owner and the date (VERIFIED)" with: "the law fixes who owes it (the airline) and a 14 working day limit (VERIFIED). It does not say when the clock starts, so Tickback counts from the cancellation date and labels that as its own expectation."
3. Delete "or, if you choose, a read-only link to that one Gmail thread". Trust line becomes: CC'd case inbox, or you paste the reply. If Gmail connect stays anywhere, say plainly it can read the whole inbox and is opt-in.
4. Online stores: "after 17 Oct, not in this sprint." Rewrite the Wed 14 gate so it never switches category. One line deciding direct airline bookings (in v1 or fallback, not both) and passenger-cancelled refunds (in or out).
5. Swap in flight-only counts (13 posts: 7, 3, 4).
6. One line naming how an X stranger reaches the product without a DM or a link in the reply.
7. Add two dated checkpoints: first real stuck flight case by Mon 12, 22:00 (first name and amount, or the honest zero); flight flow and flight demo live on the .convex.site link by Tue 13, and tell me when so I can click it.
8. Fix the minors 9 to 11 (Bilaspur source, Voxya free email and date, "IndiGo says"). Cut the one line to one sentence.

## Scores (1 to 10)

| Area | Score | Why |
|---|---|---|
| One-bracket clarity | 6 | Flights clearly lead, but stores in the milestone, direct bookings, passenger-cancelled and fresh vs overdue blur the edge |
| ChatGPT-check answer | 7 | Reads replies, switches owner, code dates, verified named officers, "who did what" count. Weaker for fresh cases and wherever companies don't reply-all |
| Honesty | 7 | Leads with weaknesses, labels nearly everything. Loses points for date-as-law, the Gmail thread promise, mixed counts and one wrong source |
| Sellability by 17 Oct | 4 | No flight user, no flight flow live, no path in from X, price off the page, 14-day clocks longer than the sprint |
| User picture | 6 | Ganesh's voice is good and the push and anxiety ring true, but it is written from posts and mixes two moments |
| Readability | 6 | Delta 4, stories and the dated table read well; the one line is a paragraph and the trust and pay sections are dense |

## The reply I would send Ganesh

Ganesh, this is the most honest sheet you have sent me. The playbook is real work, and the "who owes it now" switch passes my ChatGPT test. One fork first:

| Overdue now | Fresh cancellation |
|---|---|
| Mail goes out day one | "Nothing to send yet" |
| Replies land before 17 Oct | First due date lands after 17 Oct |
| They are on X today | You can't find them yet |

Which one is v1? My lean is the left column.

Three fixes before I lock. The 14 working days is law; the start date is yours, so say so. Drop the "read-only link to one Gmail thread"; that scope reads the whole inbox, we have been here. Stores leave this sprint.

Then one real stuck flight case by Monday night, and the flight flow live on your link by Tuesday. I will click it. Locked with changes.
