# 01 Product: Tickback v2 (domestic flight refunds lead)

Owner: Claude HQ. Status: DRAFT v2, 9 Oct 2026, written with the re-lock sheet (`IDEA_SCOPE.md`, re-lock of 10 Oct). Independent review and fixes on 9 Oct: `docs/hq/relock-2026-10/reviews/PRODUCT-review.md`. Codex reads, never edits. The events version (v1, 4 Oct) is archived unchanged at `docs/archive/01-product-events-v1.md`.

**Which file wins.** `IDEA_SCOPE.md` and `DECISIONS.md` win over this file. This file wins over `docs/prd/02` to `11` on anything about flights or online stores. On design tokens, copy tone, backend mechanics, reply tracking and the red-team rules in `08` ("Overdue" only for a rule or a promise, the "What we understood" strip, plain dates), those files still apply.

**Labels used in this file.**
- VERIFIED: official text or the company's own page, opened by us. REPORTED: news, public posts or a secondary source. OBSERVATION: what Ganesh saw himself, small samples. MISSING: not known yet, with when we get it.
- Rule rows: F01 to F23 are in `docs/research/playbooks/flights.md`; O01 to O15 are in `docs/research/playbooks/online-stores.md`. Every rule here cites its row. Code and tests use the row ids. Users never see a row id; they see the plain sentence and the source, for example "DGCA refund rule, CAR M-II Rev 3, para 3(c)".
- TICKBACK DEFAULT: our product choice, not a law. On screen it always reads "Tickback's expectation". It is never cited as DGCA, RBI or any rule.
- LATER: beyond D-030 scope. Do not build now.

**Scope in one line (D-030).** Flights first: the landing page, the demo, outreach and tests are flights only. Online stores are built in the same milestone only after the flight flow passes a live proof run, stay off the landing page, and are cut first if flights slip. Events stay live and are not sold.

---

## 1. Problem, evidence, user, job

### 1.1 The problem

A domestic flight gets cancelled, by the airline or by the passenger. The app says "refund initiated" or "processed". The bank shows nothing. The travel site says the airline has not paid it yet. The airline's chatbot repeats a template. On X they say "please DM us", and after the booking ID goes in the DM, it goes quiet. The passenger does not know who actually holds the money, what the rule says, or who sits above the person ignoring them. Most people are not refused. They are outlasted.

For flights, unlike most refunds, the rule names who owes the money and, for travel-site, credit-card and cash bookings, by when (F03, F01, F02). Direct bookings paid by debit card, UPI or net banking have no DGCA day count (D-029 (2)). That is why flights lead. For online stores the law only says "a reasonable period" (O06).

### 1.2 Evidence ledger

| # | Claim | Label | Source |
|---|---|---|---|
| E1 | DGCA CAR M-II Rev 3, dated 24 Feb 2026, in force 26 Mar 2026: travel-site bookings refunded in 14 working days with the airline responsible (F03); credit card refunds in 7 days (F01); taxes and airport fees always refunded (F04); credit shell is the passenger's choice (F06); the airline may not charge to process a refund (F08) | VERIFIED | `flights.md` B; `flights-verification.md` |
| E2 | Named Nodal Officer and Appellate Authority for IndiGo, Air India, SpiceJet, Akasa; grievance officers for MakeMyTrip, Goibibo, Cleartrip, EaseMyTrip, each read on the company's own page on 9 Oct 2026 and re-checked by a separate verifier | VERIFIED (Ganesh spot-checks IndiGo, Air India, SpiceJet and EaseMyTrip before Codex hard-codes them, because those pages were read through tool summaries) | `flights.md` C; `reviews/R3-judge.md` row 2 |
| E3 | Yatra and ixigo grievance officers | NOT FOUND | `flights.md` C, H5 |
| E4 | A Gemini Deep Research run on the same job quoted the superseded (pre-2026) refund rule in 6 of its 10 load-bearing lines, including 21 working days for travel-site bookings (it is 14 now) and a 5-day look-in limit (it is 7 now), listed Yatra's investor (IEPF) contact as the passenger contact, and named a MakeMyTrip grievance officer from the holidays subdomain | OBSERVATION, one run | `flights-gemini-raw-verification.md`; `flights.md` C note |
| E5 | The Gemini store draft: 9 of its 10 load-bearing lines were unsupported by their sources | OBSERVATION, one run | `online-stores-gemini-raw-verification.md` C |
| E6 | 13 public flight complaints on X (9 Oct): 7 got "please DM us"; 3 say "processed", no money; 4 show the travel site waiting on the airline (Ganesh's reading of the posts); two SpiceJet-via-Goibibo posts at 90 and 120 days; all still open. 11 of the 13 are domestic | REPORTED, signals not rates | `user-evidence/x-complaints.md` |
| E7 | Bilaspur consumer commission order, 18 Jul 2026: Go Airlines refunded Rs 6,437 to Paytm for a flight cancelled in 2020, the passenger never got it, and Paytm was held liable | REPORTED (Outlook Business, 22 Jul 2026) | `relock-2026-10/market-facts.md` |
| E8 | IndiGo's Dec 2025 mass-cancellation refunds cleared under public pressure (the airline's own claim, through news) | REPORTED | `market-facts.md` section 4 |
| E9 | National Consumer Helpline, Apr to Dec 2025: airlines 668 grievances, Rs 95.57 lakh refunded; travel and tourism 4,050, Rs 3.52 crore | VERIFIED (PIB) | `market-facts.md` section 1 |
| E10 | Five earlier stuck-money conversations: nobody was refused; most gave up because chasing cost more than it was worth; one got it back only through a personal bank contact | OBSERVATION, 5 interviews, mixed categories | `user-evidence/2026-09-10_outlasted-not-refused.md` |
| E11 | Ganesh's own Rapido Rs 100 and Swiggy Rs 210 refunds were promised within a day | OBSERVATION | `user-evidence/2026-10-02_own-cases-rapido-swiggy.md` |
| E12 | No first-hand stuck flight or online-store refund yet, and no person met with one | FACT, a weakness we say first | CONTEXT section 4 |
| E13 | Voxya: free complaint filing; Rs 899 legal notice; Rs 1,499 consumer forum preparation | VERIFIED (Voxya's blog, 2021) | `market-facts.md` section 5 |
| E14 | Online stores: a D2C brand is an inventory e-commerce entity (O02); it must show a grievance officer (O03) who acknowledges in 48 hours and resolves in one month (O04); it cannot refuse a refund for defective, not-as-advertised or late goods (O09); accepted refunds are due "within a reasonable period" (O06) | VERIFIED | `online-stores.md` B |
| E15 | The events demo ran end to end in 3 min 11 s through the real path (own Gmail sends, case inbox reads) | OBSERVATION (our build log) | `STATE.md`, case TB-JNEC29 |
| E16 | Willingness to pay | MISSING; reported Fri 16 | IDEA_SCOPE table |
| E17 | How many people in Ganesh's network have a stuck flight refund now | MISSING; got by doing, not counting | IDEA_SCOPE |
| E18 | Google Trends for "flight refund" in India | MISSING; run by hand Sat 10 | IDEA_SCOPE |

Weak spots, said first (same as the sheet): no flight case of our own; the travel-site-versus-airline loop rests on one commission order and 4 public posts; willingness to pay unknown; replies are caught only when the company replies to all or the user pastes them; Gmail connect is not open to everyone yet (test accounts only, `STATE.md`).

### 1.3 The user

**Leads (v1, sold):** someone in India who flies domestic a few times a year, books on a travel site for the deal, whose flight got cancelled, and whose refund is now past the date they were told. Big direct airline refunds clear under public pressure (E8); the money gets stuck in the tail, the travel-site leg and smaller airlines (E6). Direct airline bookings are in v1 too, with the date rules in section 2.

**Second (built after flights pass a live run, not on the landing page):** someone who bought from a small D2C brand's own website, returned or cancelled, and the refund is past the store's own promise.

**Live, not sold:** event-ticket buyers. Section 2.5.

**Not v1:** international flights, compensation claims, hotels, trains, EPF, marketplaces as a lead (contrast only), anyone who wants legal action.

**Decision bench:** one person. The passenger decides, sends and pays.

### 1.4 The job, in my words (Ganesh)

When my flight got cancelled and the app is showing "refund initiated" since many weeks, I want to know who is actually having my money and when it should have come, so that I can stop running behind the chatbot and stop opening my bank app every morning.

| Force | In my words |
|---|---|
| **Push** (away from today) | The bot gives the same line again and again, on X they say please DM, I send my booking ID and then nothing. The travel site says it is with the airline, and I think the airline will say it is with the travel site. Nobody tells me a date. |
| **Pull** (toward Tickback) | Somebody just tells me straight: this company has to pay, it was due on this date, this is the person above them, and the mail is already written. And when they reply, I don't have to decode it, the next mail is ready. |
| **Anxiety** (about Tickback) | If I don't keep following up I think the money just sits with them, and it is not a small amount for me. Every blog is saying a different number of days, and if I write something wrong, what if they close my complaint? Also, is this app going to ask my OTP or bank details? Will it send mails in my name without asking me? |
| **Habit** (staying put) | I open the app chat one more time, maybe ask ChatGPT to write one angry mail, post on X, and then mostly I wait. Maybe I will call 1915 some day. |

### 1.5 Delta 4 (same as the sheet)

**Today, about 10 steps** (from the playbook and 13 public flight complaints on X, REPORTED, not my own case):
1. Cancellation mail; app says "refund initiated"
2. Weeks pass, I check the bank, nothing
3. App chatbot repeats the same template
4. Post on X; they reply "please DM us" (7 of 13 flight posts)
5. Send booking ID in DM; "under review"; quiet
6. Google the rule; blogs give old day counts
7. Hunt for the Nodal Officer or grievance officer email
8. Write a long mail, guess the proof
9. Forget the date; open the bank app every morning
10. AirSewa or 1915, or give up

**With Tickback, 4 steps:**
1. Paste the cancellation mail or a screenshot
2. See the "who owes you" card: who, when it was due, which rule, who sits above them, and the next mail ready
3. Open it in my own Gmail, read it, press send, with Tickback's case inbox in CC
4. When anyone replies, or the next date comes, the next mail is ready; on the day, "It's in" or "Not yet"

### 1.6 Why an agent, and not one ChatGPT prompt

One prompt can write the first mail. It cannot do the rest, and the rest is where the money is.

| One ChatGPT prompt | Tickback |
|---|---|
| Writes one mail from what you tell it | Writes every mail over the life of the case, each from the dated thread so far |
| Never sees the reply | Reads every reply that reaches its case inbox in CC (or that you paste), and says what changed |
| Cannot switch who it writes to | **The owner switch.** When a reply says the other company has the money, code moves the case: the next mail goes to the other company, with the first one still in CC |
| Asks nothing that pins anyone down | **The pinning question.** The first mail puts one plain question to both companies on the same mail: "On which date did the airline pay this refund to you?" Whoever answers, the answer decides who holds the money |
| Guesses day counts (a strong model quoted the superseded rule in 6 of 10 load-bearing lines, including the old 21 working days, E4) | Rules and named officers come from the verified playbook, as data. Dates are computed in code, never by the model |
| Never comes back | Comes back on the date worked out in code: a calendar check-in, and an alert when a reply lands |
| Forgets the thread | Carries the dated thread up the ladder: grievance officer and Nodal Officer, Appellate Authority, AirSewa, 1915 |
| No record of the work | **The who-did-what count** at case close, for example "You: 4 taps. Tickback: read 3 replies, set 3 dates, wrote 4 mails." Computed from the case's own events, never typed in |

Why the variance needs an agent: the reply can be a stall, "under review", "waiting on the airline", "we paid the travel site on 2 Oct", "processed, here is the UTR", or "take a credit shell instead". Each one changes who owes the money, the date, the next person and the next rung. A fixed workflow cannot read that. The model reads; code decides; the playbook supplies every rule and contact. Without the agent it is a rules page. Without the playbook it is ChatGPT guessing.

You send every mail yourself on purpose (Level 1, D-011, D-025): the complaint should come from the passenger's own address, and nothing leaves without your tap.

---

## 2. Routes and the "who owes you" card

### 2.1 Flight routes (reuse the live route codes)

| Route | When | User sees | Next step |
|---|---|---|---|
| `WAIT` | The refund date (2.2) has not passed and nothing contradicts it | **On its way** | Nothing to send. Check-in on the due date |
| `OVERDUE` | The due date has passed and the money has not landed | **Overdue** when the date is a rule (F01, F02, F03) or the company's own written promise. **Time to check** when the date is Tickback's expectation (rule C1 in `08`, live today) | The next rung's mail (2.4, section 3) |
| `TRACE` | A company says it sent the money, with a reference (UTR, ARN or RRN), and the bank shows nothing | **Left them, not with you yet** | The bank message, ready now |
| `NEED_INFO` | Booked-on, payment method or cancellation date is unknown, or the read is low confidence | **Need a bit more** | Up to 3 one-tap questions (section 4) |
| `NO_ROUTE` | Nothing more is owed by rule, for example taxes and fees already back on a non-refundable fare the passenger cancelled (F04) | **The other side is right** | The honest answer with its source. No charge. Case closes |
| `OUT_OF_SCOPE` | International flight, a compensation-only claim, hotel, train, or a refund type not yet sold | **Not in Tickback yet** | Honest note. Optional waitlist (live today) |

`ACTION_NEEDED` and `FAILED_PAYMENT` are not used for flights in v1. Money debited with no ticket issued is not a v1 flight case (LATER).

### 2.2 Who owes the refund and when it was due (flights)

Owner by rule and due date. The cancellation date is the date on the cancellation notice, or the date the passenger cancelled. Working days are Monday to Friday, holidays ignored, and the screen says "about" (TICKBACK DEFAULT, `flights.md` H3).

| Booked on | Paid by | Owner by rule | Due date | Shown source |
|---|---|---|---|---|
| A travel site (v1 is built and tested for MakeMyTrip, Goibibo, Cleartrip and EaseMyTrip; the rule is the same for any travel site, so others get the card without a checked travel-site address) | Any method | The airline: "onus of refund shall lie with the airlines" (F03) | Cancellation date + 14 working days (F03) | "DGCA refund rule. The rule gives no start day; Tickback counts from your cancellation date." The 14 is the rule; the start day is TICKBACK DEFAULT |
| The airline, direct | Credit card | The airline (F01) | Cancellation date + 7 calendar days (F01) | DGCA refund rule |
| The airline, direct | Cash at the airline office | The airline (F02) | Same day (F02) | DGCA refund rule |
| The airline, direct | Debit card, UPI, net banking | The airline | Cancellation date + 15 working days | "Tickback's expectation, not a DGCA rule" (TICKBACK DEFAULT, D-029 (2)) |

Worked example for tests (`addWorkingDays` in `lib/dates.ts`): cancellation Mon 7 Sep 2026. Travel site: due Fri 25 Sep 2026. Direct, credit card: due Mon 14 Sep 2026. Direct, UPI: check date Mon 28 Sep 2026, labelled Tickback's expectation, so the label is "Time to check", not "Overdue".

**Who has the money now** changes with replies, not with the rule. F03 keeps the airline answerable, so the airline stays on the thread even when the money sits with the travel site:

| A reply says | Who has the money now | Date the card shows |
|---|---|---|
| The travel site is waiting for the airline (pending with airline) | The airline (F03) | Unchanged |
| The airline paid the travel site on date D | The travel site | MakeMyTrip or Goibibo: D + 24 hours, their own terms (F22). Their terms count from when they receive the money; Tickback uses the airline's paid date D as a stand-in and says "about". For bookings over 6 months old their terms say 96 hours, and only after the customer gives them bank details directly (never through Tickback, 4.3). Others: no published pass-on time; check date is the rung wait, 7 days from sending (TICKBACK DEFAULT, `flights.md` D2) |
| A company sent it to your account with a reference | The last leg is your bank | The date in their reply, labelled as their promise. If none: open question Q3 (section 8) |

**Never promised (D-029 (1)):** the 48-hour free look-in (F05) on a travel-site booking. The agent says the look-in duty sits on the airline and travel sites say they do not offer it. If the user bought the site's own "zero cancellation" add-on, the agent chases under that add-on's terms (REPORTED until each site's terms page is checked). For direct bookings, F05 applies as written: within 48 hours of booking, and only if departure is at least 7 days after booking.

**Compensation (out of v1):** if the notice came less than 24 hours before departure, the case shows one line: "You may also be owed compensation under the DGCA rule, unless the cause was beyond the airline's control (weather, ATC, security). Tickback does not chase compensation yet." Source rows F15, F17. No amounts are computed (block time is rarely known, `flights.md` H6). LATER: the compensation playbook (F10 to F19).

### 2.3 The "who owes you" card (flights)

One card at the top of every flight case. Every owner, rule, date and contact comes from code and the playbook data, never from the model. The model only supplies its read of a pasted message or reply (7.3), which code then applies.

| Field | What it shows | Source of the value |
|---|---|---|
| **Who owes you** | The airline's name, with one plain line: "You booked on a travel site, so the airline is responsible for your refund" (or the direct-booking line) | 2.2, F01 to F03 |
| **When it was due** | The date, "Overdue by about N working days" or "Time to check", and the source line from 2.2 | Code, `lib/dates.ts` |
| **Who has your money now** | Only after a reply tells us. "DemoTrips, from Demo Air's reply of 2 Oct" style, with the reply linked | Reply read plus 2.2 table |
| **Next person** | Name, role and company, with the page it was read on and the date read, for example "Isha Gandhi, Nodal Officer, IndiGo (goindigo.in/contact-us.html, read 9 Oct 2026)" | `flights.md` C as data |
| **Above them** | The next rung's name and role | Section 3 |
| **Your next mail** | Ready, with To, CC and subject, and the button to open it in Gmail | Draft builder |

Rules for contacts (live rule since M2.3, kept):
- Only contacts read on the company's own page fill in automatically, each with page and date read (`flights.md` C).
- Yatra, ixigo, or any travel site or airline not in the table: the card says "We don't hold a checked address for <company>. Paste the address from your booking mail or the company's grievance page." The airline side still fills if the airline is in the table.
- Air India has no customer care email in the playbook. Overdue Air India cases start at its Nodal Officer, which is the normal start for overdue cases anyway (3.1).
- AirSewa: named in F20 (VERIFIED). The web address airsewa.gov.in is NOT CHECKED; Ganesh opens it before any case reaches that rung.

### 2.4 Online stores (built after flights pass a live run, D-030)

Owner and dates, briefly. Same card, fewer fields.

| Situation (playbook scenario) | Who owes you | Due date | Shown source |
|---|---|---|---|
| Return accepted or order cancelled, refund not issued (a, b) | The store, as an inventory e-commerce entity (O02) | The store's own promised date | "The store's promise" |
| Same, store promised no date | The store (O02) | Return accepted + 7 days (for a cancelled order with no return, the start day is open: Q22) | "Tickback's expectation, not a rule" (D-029 (3)) |
| Defective, damaged, fake or not as advertised, refund refused (d, h) | The store; it cannot refuse (O09) | As above | O09 sentence plus the date source above |
| Paid by card on the website or UPI, the store never got the order confirmation (g1) | Your bank and payment system auto-reverse | Payment date + 5 calendar days; Rs 100 a day after that "may be owed", paid without a claim (O11, O12, O13) | RBI rule. Not computed for net banking or other methods |
| "Refund processed", not received (f) | The last leg is your bank | The store's stated date, if any | The store's promise |

Next person: store support, then the store's grievance officer (O03, O04). Contacts come from a live lookup of the store's own pages (`online-stores.md` C), labelled with page and date read. If no grievance officer is shown, the card says so: the rules require one (O03). If nothing is found, the user pastes the address from the order email. The lookup is the first thing cut if time runs short (lesson 11); the paste fallback is the floor.

Marketplaces (Amazon, Flipkart, Myntra, Meesho, Nykaa): contrast only. Their grievance officers are NOT FOUND until rechecked. LATER.

### 2.5 Events (live, not sold)

The event flow stays live exactly as built: routes `WAIT`, `OVERDUE`, `ACTION_NEEDED`, `TRACE`, `FAILED_PAYMENT`, `NO_ROUTE`, `NEED_INFO`, `OUT_OF_SCOPE`; ladder support, grievance officer, National Consumer Helpline; the BookMyShow and District demo organiser. It is not on the landing page and not in outreach. Nothing in it changes for this milestone, except that a pasted flight message now goes to the flight flow instead of `OUT_OF_SCOPE`. Its full spec is `docs/archive/01-product-events-v1.md`, with the changes in `08` and `10`.

---

## 3. Escalation ladders

Each rung says whether its wait is a rule, a company's own policy, or a Tickback default. The agent may cite rules and company policies; it never presents a Tickback default as a deadline anyone must meet.

### 3.1 Flights, refund cases (`flights.md` D, scenarios 1, 2, 3, 6, 7)

| Rung | To (CC) | What the mail does | Wait before the next rung | Type of wait |
|---|---|---|---|---|
| 1 | Where the ticket was bought: airline customer care (direct) or the travel site's support | Cites the rows that fit (F01 to F08); asks for the complaint reference number (F21) | Until the due date in 2.2 | Rule (F01, F02, F03) or Tickback's expectation (direct, non-credit, D-029) |
| 1, Cleartrip only | Cleartrip support by phone (+91 9595333333, 24x7), Trip ID quoted. The playbook holds no Cleartrip support email, so this step is a call: Tickback shows the number and what to say, and the user confirms with the existing "I've sent it" step (worded "I've called") | Cleartrip's own process: support first | 72 hours | Company policy (F23) |
| 2 | Travel-site booking: the travel site's grievance officer, with the airline's Nodal Officer in CC on the same thread. Direct booking: the airline's Nodal Officer. Case inbox always in CC | Travel site: asks the pinning question ("On which date did the airline pay this refund to you?") and cites F03. Direct: asks "On which date was this refund sent, and with which reference?" and cites F01 or F02 only for credit card or cash; for debit card, UPI and net banking it cites no DGCA day count (D-029). Always asks for the complaint reference (F21) | 7 days | TICKBACK DEFAULT. Tickback's reading (not shown as a rule): a travel site is an e-commerce entity, so the 48-hour acknowledgement and one-month redressal (O04) apply to its grievance officer. Only once a reply says the airline has paid MakeMyTrip or Goibibo: their own 24 hours (F22, company terms, 2.2) |
| 3 | The airline's Appellate Authority, with the full dated thread (travel site in CC if one is involved) | Says who answered what and when; asks for the refund date and reference | 7 days | TICKBACK DEFAULT |
| 4 | AirSewa app or portal (F20). The user files; Tickback prepares the complaint text and the dated thread | Same facts, with every date and every reply | 30 days (no official window found) | TICKBACK DEFAULT. Scope note: the DGCA text names AirSewa for denied boarding, cancellation and long delay; for a refund on a ticket the passenger cancelled, Tickback says "you can also file on AirSewa", not that the rule covers it (`flights-verification.md`, F20) |
| 5 | National Consumer Helpline: 1915 or consumerhelpline.gov.in | Same facts | "May take up to 30 days" (described by NCH, not a duty) | NCH's own description (O15) |
| Beyond | Consumer commission (e-Daakhil) | Tickback names it; it does not prepare or file it | n/a | LATER |

Two ladder rules for code:
- **Rung 1 is never drafted as a mail in v1.** Before the due date the case is `WAIT` (nothing to send); after it, the case starts at rung 2. The only rung 1 step Tickback shows is the Cleartrip call.
- **Where a case starts.** A `WAIT` case has nothing to send. When the due date passes (at the start, or at a check-in "Not yet"), the first mail is rung 2, because rung 1's wait has run out. Exception: Cleartrip, where Tickback first asks "Did you contact Cleartrip support about this more than 72 hours ago?" and, if not, starts at rung 1 (F23).
- **Early jump (TICKBACK DEFAULT).** A reply after the due date that confirms the owner has not paid yet ("not processed", "under process from our side") is an answer, so the next rung's mail is ready at once, without waiting the 7 days. A vague stall with no facts ("under review, we'll revert") waits the rung's wait, or the company's own promised date if the reply gives one.

### 3.2 Flights, refund "processed" but not received (`flights.md` D, scenario 5)

| Step | Who | Wait | Type |
|---|---|---|---|
| 1 | Whoever says they sent it: ask for the UTR or ARN and the date it left. MakeMyTrip or Goibibo: cite F22 | 7 days, the same wait as rung 2 (this ask usually happens on the rung 2 thread) | TICKBACK DEFAULT |
| 2 | The user's own bank, with that reference (Tickback writes what to say; the user goes through the bank's own channel) | Date in the company's reply, if any | Their promise; otherwise open question Q3 |
| 3 | RBI Integrated Ombudsman, if the bank does not resolve it | n/a | Named only. TICKBACK DEFAULT route; no rule in the playbook covers it. LATER |

### 3.3 Online stores (`online-stores.md` D, built after flights)

| Rung | To | Wait | Type |
|---|---|---|---|
| 1 | Store support by email, with order ID and evidence. Cites O09 if the goods were defective or not as advertised, else the store's own terms (O07) and O06. Asks for a ticket number (O08) | 3 days, or the store's own promised date if later | TICKBACK DEFAULT, or the store's promise |
| 2 | The store's grievance officer (O03) | Acknowledge within 48 hours, resolve within one month of receipt (O04). Tickback checks at about 48 hours after sending (send time stands in for receipt) | Rule (O04) |
| 3 | National Consumer Helpline (O15) | "May take up to 30 days" | NCH's own description |
| Beyond | Consumer commission (e-Daakhil) | n/a | Named only. LATER |

Payment side (stores): for a failed payment (g1), the user's bank, then the RBI Ombudsman (O11 to O13). For "processed, not received" and unresponsive stores, the user's bank dispute or chargeback is named; Tickback does not run chargebacks, and chargeback windows are NOT FOUND (`online-stores.md` H4).

---

## 4. Intake: what the agent asks, and what it never asks

### 4.1 Flights (`flights.md` E)

The user pastes the cancellation mail, the travel site's reply or a screenshot (up to 4, compressed, as live). Optional name sits on the first screen with one line on why (D-024). The agent reads what it can, shows the "What we understood" strip, and asks only what is missing.

| Field | How we get it | Why (row) | v1? |
|---|---|---|---|
| Airline | Read from paste; else one tap from a list plus "Other" | Owner and contacts (F03, C) | Yes |
| Booked on (travel site or airline direct) | Read; else chips: MakeMyTrip, Goibibo, Cleartrip, EaseMyTrip, Airline website or app, Other | Due date rule (F01 to F03) | Yes |
| Payment method | Read; else chips: Credit card, Debit card, UPI, Net banking, Cash, Not sure. Travel-site bookings do not need it for the date (F03). On a direct booking, "Not sure" uses the 15-working-day Tickback's expectation and says so (TICKBACK DEFAULT) | Due date (F01, F02, D-029) | Yes |
| Cancellation date, and who cancelled | Read; else "When was it cancelled?" (one date tap) and "Who cancelled?" (Airline, I did) | Every date (2.2); what is owed (F04, F07) | Yes |
| Amount paid | Read; else one line | Card, count, price tier | Yes |
| PNR, and the travel site's booking ID if booked on one | Asked at the confirm step (D-024) | Every mail quotes them | Yes |
| Domestic or international | Read; else one tap | Scope | Yes |
| Flight date, booking date and time | Read if present; asked only when the passenger cancelled a direct booking (look-in check, F05) | F05 | Yes, when needed |
| Fare breakdown (taxes, UDF, ADF, PSF) | Asked only when the passenger cancelled or a fee was kept | F04, F07 | Yes, when needed |
| Earlier contact (did you contact support, any complaint reference) | One tap; Cleartrip always asked (F23) | Ladder start (3.1) | Yes |
| Optional phone or email "so Ganesh can follow up" | Optional field (D-024) | Founder follow-up | Yes |
| Boarding pass or counter proof; whether a phone or email was given at booking; block time | Not asked | Compensation only (F10 to F16, H6) | LATER |

The "What we understood" strip shows: airline, booked on, payment method, cancellation date (IDEA_SCOPE onboarding), with "Looks right" and "Not quite". Low confidence goes to `NEED_INFO`, at most 3 questions.

### 4.2 Online stores (`online-stores.md` E, built after flights)

Store name and website; order ID and order date; payment method and amount (for a failed payment, the debit date and UTR); what happened (cancellation mail, return request, pickup proof or failed pickup messages, delivery date versus promised date); photos of a wrong, damaged or fake product if the user has them (kept in the case, used only to list as proof); the store's reply and any ticket number.

### 4.3 What the agent never asks for (all types)

- OTPs, passwords or PINs, including UPI PIN.
- Card numbers, CVV, bank account numbers, or any bank login.
- Anything that needs Tickback to log in for the user, anywhere.

If a company asks the user for bank details (for example a cash or COD refund), Tickback says: give them to the company directly through its own channel, never through Tickback. Intake strips card numbers and OTPs before anything is saved (live redaction, kept). The privacy page states what we store (live).

---

## 5. User stories (flights first, then stores)

Written from public posts until the first real case. Ganesh rewrites them in that person's words by Sun 11 night and says whose case it is (IDEA_SCOPE). Build in the order listed. Acceptance checks are plain Given, When, Then; dates use the worked example in 2.2 unless stated.

### FS-1 (build first): "My refund is late and I don't know who has it"

I booked my flight on a travel site because the deal was good, and the airline cancelled it. Since then the app is showing "refund initiated" and my bank is showing nothing. I paste the cancellation mail. I just want somebody to tell me straight who has to pay me, when it should have come, and to whom I should write, without me reading DGCA circulars at night.

- **Given** a pasted cancellation mail for an airline-cancelled IndiGo flight booked on MakeMyTrip, paid by UPI, cancelled Mon 7 Sep 2026, and today is 9 Oct 2026, **when** I tap Check my refund and then Looks right, **then** the confirm step asks for my PNR and MakeMyTrip booking ID, and nothing else is required.
- **Given** I enter the PNR, **when** the case opens, **then** the "who owes you" card shows: Who owes you: IndiGo, with the travel-site line; When it was due: 25 Sep 2026, "Overdue", with "DGCA refund rule. The rule gives no start day; Tickback counts from your cancellation date."; Next person: Jasbir Kaur, Grievance Officer, MakeMyTrip, and in CC Isha Gandhi, Nodal Officer, IndiGo, each with page and date read; Above them: Pratik Arjun Sen, Appellate Authority, IndiGo.
- **Then** one mail is ready: To grievanceofficer@makemytrip.com; CC nodalofficer@goindigo.in and the case inbox address with the case code; subject carrying the case code; body quoting PNR, booking ID, amount, cancellation date and the rule in one plain sentence, and asking one question: "On which date did the airline pay this refund to you?"
- **Given** the same case booked direct on IndiGo's website with UPI, **then** the date is 28 Sep 2026, the label is "Time to check", the source reads "Tickback's expectation, not a DGCA rule", and the mail goes To the Nodal Officer. The mail cites no DGCA day count and asks: "On which date was this refund sent, and with which reference?"
- **Given** direct with a credit card, **then** the date is 14 Sep 2026 and the source is the DGCA rule.
- **Given** booked on Yatra, **then** the travel-site line says we hold no checked address for Yatra and asks me to paste one; the IndiGo Nodal Officer still fills.
- **Given** booked on Cleartrip and I say I have not contacted Cleartrip support, **then** the first step is a call to Cleartrip support (number shown, Trip ID quoted, no mail drafted), and after I confirm the call, a check-in 72 hours later (F23). At that check-in, Not yet opens the rung 2 mail to Cleartrip's grievance officer.
- Every travel-site case: no look-in promise anywhere (D-029 (1)).
- No model output sets a date, a rule or an address (unit test: the model's read is replaced with junk dates and addresses; the card is unchanged).
- Target: card on screen in under 60 seconds from Start my case (MISSING until measured; log 10 runs).

### FS-2: "They replied, and now who has my money?"

A reply comes from the travel site saying it is pending from the airline side. I am thinking, here we go again, the same circle. I don't want to decode it and I don't want to be the messenger between two companies.

- **Given** FS-1's case and a reply-all from MakeMyTrip that says the refund is pending with the airline, **when** the case inbox catches it (or I paste it), **then** within one check cycle the reply banner shows "New reply from MakeMyTrip", one line on what it says, and "Who owes you: still IndiGo. The rule puts the refund on the airline."
- **Then** the next mail is ready To nodalofficer@goindigo.in, CC the MakeMyTrip grievance officer and the case inbox, asking: "On which date did you pay this refund to MakeMyTrip?"
- **Given** instead a reply from IndiGo saying it paid MakeMyTrip on 2 Oct 2026, **then** the card adds "Who has your money now: MakeMyTrip, from IndiGo's reply of 2 Oct 2026", marked as changed; the date shows 3 Oct 2026 with the source "MakeMyTrip's own terms say they try to pass refunds on within 24 hours of receiving them" (F22, company policy, not a law); the next mail goes To MakeMyTrip's grievance officer, IndiGo's Nodal Officer in CC, quoting IndiGo's date and asking for the bank reference (UTR or ARN) and the date they sent it.
- **Given** instead IndiGo says it has not processed the refund yet, **then** the early jump applies (3.1): the next mail is ready now To Pratik Arjun Sen, Appellate Authority, with the dated thread.
- **Given** the reply is from a company not on the thread, or the read is low confidence, **then** before anything switches I see "Tickback read: <one line>. Looks right / Not quite."
- Old check-ins move; one calendar alert for the reply if Calendar is connected (live, D-022).

### FS-3: "They gave a reference number"

After all this, they send me a UTR number and say it is processed. But my bank is still not showing it. I think, okay, so now who? Is it the bank? I don't know what to tell the bank also.

- **Given** a reply with a UTR and a sent date, **when** it is read, **then** the route is `TRACE`, the card says "The money has left MakeMyTrip. The last leg is your bank.", and a short message for my bank is ready with the UTR, amount and date. It tells me to use my bank's own channel and never share an OTP.
- **Then** the check date is the date in their reply, labelled as their promise. If the reply gives no date, open question Q3 applies (section 8): until Ganesh decides, no automatic date is set and the case offers "Remind me on a date I pick".
- **Given** the reply names where the money was sent (for example "card ending 1234" or a wallet) and I tell Tickback that is not my account or card (through the existing "Not quite" on the read), **then** the case says so plainly and the next mail asks the company to confirm the destination. Tickback never asks for my account or card number to check this (4.3).

### FS-4: "They are offering a credit shell"

The airline mail says I can take the amount as a credit shell for future travel. I don't want to fly them again soon, I want my money. But I am scared if I say no, will I get nothing?

- **Given** a reply offering a credit shell or travel credit, **when** it is read, **then** the card says "A credit shell is your choice, not their default" with the DGCA source (F06), the owner is unchanged, and a mail is ready declining the credit shell and asking for the refund to the original payment method.
- **Given** the user says the cancellation was because of a medical emergency, **then** the card says the airline may give either a refund or a credit shell in that case (F09), and the mail asks, it does not insist. Build gate: the verifier could not read the rest of para 3(m), which may add conditions; Ganesh reads it before this branch ships (Q17).
- For a travel site's own wallet credit, the mail asks for the money to the original method and the source line says "Tickback's reading: the travel site acts for the airline (F03), and the airline's credit shell is your choice (F06)".

### FS-5: "I cancelled myself, and the fare was non-refundable"

My plans changed, I cancelled. The fare was non-refundable so I thought nothing will come, but even the taxes were not refunded and some fee also got cut. I am not sure what I am even owed, honestly.

- **Given** a passenger-cancelled, non-refundable booking, **when** I confirm, **then** the agent asks for the fare breakdown (taxes, UDF, ADF, PSF) once.
- **Then** the card says plainly: the base fare follows the fare rules, but taxes and airport fees always come back (F04); the cancellation charge cannot be more than basic fare plus fuel surcharge (F07); a travel-agent fee disclosed at booking is outside that cap and Tickback does not ask for it back; the airline cannot charge to process the refund (F08).
- **Then** the amount owed is the taxes and fees (plus any amount above the F07 cap), and the due date follows 2.2.
- **Given** a direct booking cancelled within 48 hours of booking with departure 7 or more days after booking, **then** the card says the look-in applied: no cancellation charge (F05). (The fare difference in F05 applies only when the ticket is changed, not cancelled.) Never for travel-site bookings (D-029 (1)).
- **Given** the breakdown shows the taxes and fees already came back, **then** the route is `NO_ROUTE`, "The other side is right", with the source, no charge, and the case closes.

### FS-6: "Still nothing after the officers"

I wrote to the grievance officer, the Nodal Officer, then the Appellate Authority. Still nothing. I was about to just leave it. Somebody told me about AirSewa but I don't know what to write there.

- **Given** a case at rung 3 with no answer for 7 days (Tickback's expectation) and I tap Not yet at the check-in, **then** rung 4 opens: the AirSewa complaint text with every date, every reply and who said what, plus a checklist of what to attach.
- **Then** the case says plainly that the user files on AirSewa (the app or portal named in the DGCA rule) and that the 30-day wait after it is Tickback's expectation, not an official window.
- **Given** 30 days pass with no result, **then** the National Consumer Helpline text is ready (1915 or consumerhelpline.gov.in), with "may take up to 30 days" as NCH's own description.
- The consumer commission is named, not prepared.

### FS-7: "It's in!"

One morning the money is in my account. I want to close it and, honestly, I want to see how much running around I didn't have to do.

- **Given** any open flight case, **when** I tap It's in, **then** the case closes with the amount and the who-did-what count, for example "You: 4 taps. Tickback: read 3 replies, set 3 dates, wrote 4 mails."
- Every number in the count comes from the case's own events: user taps (confirm, open-mail, I've sent it, answers, It's in), replies read, check-in dates set or moved, drafts written. A unit test builds a case from known events and checks the count.
- The share card says "Tickback told me who owed it and wrote every mail" and never claims Tickback sent anything (live rule).
- If the count is cut for time (D-030 (5)), the case closes with the amount only, and the sheet's count line must change before Shaktimaan sees it (section 8).

### SS-1 to SS-3: online stores (second; built after the flight flow passes a live run)

These are hypotheses: no store complaints are collected yet (`online-stores.md` F) and no store case is known (E12).

**SS-1: "Return picked up, refund not coming."** I returned a damaged item to a small brand's website. They picked it up and said refund in 7 days. That date is gone and their support mail is just auto-replying.
- **Given** a paste showing pickup on a date and a 7-day promise, **when** the case opens, **then** the card shows the store as owner (O02), the store's promised date as due with "the store's promise", "Overdue", and a support mail citing O09 (damaged goods) and asking for a ticket number (O08).
- **Given** no promise in the paste, **then** the date is return accepted + 7 days with "Tickback's expectation, not a rule" and the label "Time to check".

**SS-2: "They want to give me store credit."** They are saying refund can come only as store credit. I don't want credit in a brand I will not buy again.
- **Given** a reply offering store credit for defective or not-as-advertised goods, **then** the mail declines and asks for the refund, citing O09. **Given** a simple change of mind, **then** the card says no rule bars store credit for that (`online-stores.md` H3) and does not overclaim.

**SS-3: "Nobody is answering."**
- **Given** 3 days with no answer at support (Tickback's expectation), **when** I tap Not yet, **then** the grievance officer mail is ready (O03, O04), with a check at about 48 hours for the acknowledgement. **Given** no grievance officer is shown on the site, **then** the mail says the rules require one (O03) and goes to the support address. **Given** a month with no resolution, **then** the National Consumer Helpline text is ready (O15).

---

## 6. The demo, per refund type

### 6.1 What every demo reuses

The flight and store demos reuse the M2.5 demo organiser as built (`convex/demo.ts`, `convex/demoActions.ts`, `lib/demo.ts`):
- the separate demo Gmail account, connected by Ganesh tapping Allow (Codex never signs in);
- the user's own Gmail sends every mail, with the case inbox in CC; the case inbox reads the demo replies through the real reply path (`googleData.saveReply`, then the real triage);
- bounded fast checks only while a demo round waits: the demo inbox every 10 seconds for up to 2 minutes, then the case inbox every 10 seconds for up to 1 minute; "Waiting for <role>'s reply" with live steps; Try again after a timeout (`demo.retry`);
- at most 3 demo replies per case (`DEMO_MAX_REPLIES`), the reservation table `demoReplies`, the AI-written opening line only (with its existing checks: no digits, no refund words, no contacts; its prompt names the flight or the order instead of an event), fixed ladder text for everything else;
- "Demo" tag on every demo screen, demo cases excluded from the paywall, "Demo ·" in the responses Sheet, deletion after 7 days.

### 6.2 Flight demo (built with the flight flow; on the landing page)

**Cast (all made up, never real brands):** "DemoTrips" plays the travel site; "Demo Air" plays the airline. The card shows demo officers ("Grievance Officer, DemoTrips (demo)", "Nodal Officer, Demo Air (demo)", "Appellate Authority, Demo Air (demo)"), never a real name or address from the playbook.

**What "one thread" means here.** Both roles are on every mail (one in To, the other in CC), every subject carries the same case code, and each demo reply lands in the Gmail thread of the mail it answers (live: the demo desk replies with In-Reply-To and the same Gmail thread id). Mails 2 and 3 open through Gmail web compose as new messages, so Gmail may show each round as its own conversation; the case page shows all six messages on one case timeline. The demo does not promise one Gmail conversation across all three rounds (open question Q20).

**Addresses:** both roles live in the one demo account. Drafts address the roles as plus-addresses of the demo account (for example `<demo>+travelsite@` and `<demo>+airline@`), so the user sees two recipients. Replies are sent from the demo account's own address with a role display name. Code changes: the demo inbox check must accept the demo mailbox in To or Cc, matched by `sameDemoMailbox` (which already ignores the plus part), instead of the exact To match today. If plus-addressed receipt fails in the live test, fall back to one demo address with the role carried only by the sender name, and say so in the log.

**Sender names and footer:** "Refund desk · demo (travel site role)" and "Nodal desk · demo (airline role)". Last line, small: "Demo reply from Tickback's demo desk, not from a real travel site or airline."

**Sample case** (created by `demo.create` with a new kind `flight`): a cancellation mail dated today minus 30 days: Demo Air cancelled the flight, booked on DemoTrips, paid by UPI, one fixed sample amount. The confirm step asks for the PNR with "PNR (demo: any made-up PNR works)" and a "Use a sample PNR" button (the D-027 booking-ID pattern, moved to the confirm step). On confirm, the case is `OVERDUE` (30 calendar days is past 14 working days) and the "who owes you" card shows Demo Air as owner by rule (F03) with the due date and source, exactly as for a real case.

**The 3 rounds:**

| Step | User | Demo reply (scripted) | Tickback (live) |
|---|---|---|---|
| Start | Taps Try a demo, Looks right, Use a sample PNR | none | Card: owner Demo Air (F03), due date "Overdue", next person DemoTrips grievance with Demo Air Nodal in CC; mail 1 asks "On which date did the airline pay this refund to you?" |
| Round 1 | Sends mail 1 from own Gmail, taps I've sent it | DemoTrips (travel site role): the refund is pending from the airline's side and will be credited once received. No date | Reads "waiting on the other company, points at the airline". Card: "Still Demo Air. The rule puts the refund on the airline." Mail 2 ready To Demo Air Nodal, CC DemoTrips: "On which date did you pay this refund to DemoTrips?" |
| Round 2 | Sends mail 2, taps I've sent it | Demo Air (airline role): the refund was paid to DemoTrips on a date (cancellation date + 5 working days), with a demo airline reference | Reads "paid on a date, to DemoTrips". **Owner switch on screen:** "Who has your money now: DemoTrips, from Demo Air's reply of <date>." Mail 3 ready To DemoTrips grievance, CC Demo Air Nodal, quoting Demo Air's date and asking for the bank reference and the date sent |
| Round 3 | Sends mail 3, taps I've sent it | DemoTrips: the refund was sent to the original payment method today, UTR `DEMO-<code>-REF`, check your bank by today + 3 working days | Reads "processed with a reference". Route `TRACE`: "The money has left DemoTrips. The last leg is your bank." Bank message ready. Check date = DemoTrips' promised date, labelled as their promise |
| Skip ahead | Taps **Skip ahead to <check date>** (demo cases only) | none | Demo clock moves to the check date; the check-in banner asks "Has your Rs <amount> landed?" with It's in, Not yet, They replied |
| Close | Taps It's in | none | **Money landed** with the amount and the who-did-what count, computed from the case's own events |

Exactly 3 demo replies. Target about 3 minutes from Try a demo to Money landed (the events demo measured 3 min 11 s, with the made-up booking ID typed in round 2; here the PNR moves to the confirm step).

**Acceptance checks (flight demo).** Codex runs these on the live site and records evidence in the log, as for M2.5:
- **Given** the demo desk is connected, **when** I tap Try a demo, Looks right and Use a sample PNR, **then** the card shows Demo Air as owner by rule (F03), "Overdue" with the date and source, the demo officers only, and mail 1 To the DemoTrips role with the Demo Air role and the case inbox in CC.
- **When** I send each mail from my own Gmail and tap I've sent it, **then** exactly one reply arrives per round, from the role in the table, with the role sender name and the demo footer, in the Gmail thread of the mail it answers, and caught by the case inbox (not pasted).
- After round 1: "Who owes you: still Demo Air" and mail 2 To the Demo Air role. After round 2: "Who has your money now: DemoTrips" marked Changed, with the reply linked. After round 3: route `TRACE`, the bank message, and the check date labelled as their promise.
- Skip ahead, then It's in: Money landed with the who-did-what count, and its numbers match the case's events.
- No demo draft names a playbook contact; no demo screen shows the Rs 49 offer; the Sheet row says "Demo ·".
- Time from Try a demo to Money landed is measured on 3 runs and logged. About 3 minutes is the target; any overrun is recorded for HQ to judge, as with M2.5 (no pass or fail threshold is set here).

**Code changes to the existing organiser (summary for Codex):**
- `demo.create`: add kind `flight` with the sample above and the demo cast in the case facts.
- `lib/demo.ts` `demoReplyBody`: a ladder per kind; for `flight`, the role per round as in the table, and the flight footer. Dates in replies are computed from the demo clock in code. The sender name is set today in `convex/demoActions.ts` (`Refund desk · demo (<platform> role)`) and the footer in `demoReplyBody` ("not from <platform>"); both become per-role for flights.
- The demo opening-line check in `demoActions.ts` today requires the event name in the line; for flights it checks for the flight wording instead, with the same bans (no digits, no refund words, no contacts).
- `convex/agent.ts` today forces route `TRACE` and a made-up bank date when an events demo reaches round 3. That shortcut must not apply to `flight`: the flight demo's route and dates come from the real decision code.
- `demo.skipAhead`: for `flight`, allowed only after round 3 with route `TRACE`; moves the demo clock to the round 3 check date. The events rule (after round 1, 10 days past due) stays for event kinds.
- `demo.booking` is not used for flights (PNR is taken at confirm).
- Mails 2 and 3 must come from the real reply handler and the real decision code, not from demo mutations. Unit test: feed the three scripted replies into the real reader stub and the real decision code; check owner, who has the money, next To and CC, and route after each.
- Demo draft recipients: only demo role addresses, never a playbook contact (unit test).

**Scripted versus live (say this on the demo screen in one line: "The companies are pretend. Everything Tickback does is real.")**

| Scripted (pretend) | Live (the real product path) |
|---|---|
| The sample cancellation mail and amount | Your own Gmail sends every mail, with the case inbox in CC |
| DemoTrips and Demo Air, their 3 replies and their reply dates | The case inbox catches each reply-all; the reply banner shows it |
| The opening line of each reply (AI, checked) | The model reads each reply; code decides owner, who has the money, date, next person and next rung from the rule data |
| The Skip ahead clock | Every mail Tickback writes; the check-in banner; the who-did-what count from real events |

### 6.3 Store demo (built only after the flight flow passes a live run; not on the landing page)

Cast: "DemoWear (demo store)". This is the events ladder with store words, the cheapest version (lesson 11 cut order):
- Sample: a damaged item returned, pickup dated today minus 20 days, refund promised within 7 days of pickup, paid by UPI. Card: owner DemoWear (O02), due = the store's promise, "Overdue". Mail 1 to the demo support role, citing O09 and asking for a ticket number (O08).
- Round 1 (support role): refund initiated, 7 to 10 working days, with a demo ticket number. Tickback: `WAIT` with their promise.
- Skip ahead 10 days (the existing events skip, unchanged). Tickback: overdue; mail 2 to "Grievance Officer, DemoWear (demo)", citing O04.
- Round 2 (grievance role): asks for the order ID. The existing booking field relabelled "Order ID (demo: any made-up ID works)" with "Use a sample ID".
- Round 3: refund processed with a demo reference and a check-your-bank date. Money landed with the count (if built).
- Reachable only by a direct link until stores go on the page.

### 6.4 Demo safety rules (carried over from D-027 and its amendment; unit test each)

1. Only demo cases use the demo account's addresses, and a demo case never fills a real contact.
2. The demo desk replies only to subjects carrying a demo case code; never to the case inbox, itself, or auto-replies; at most 3 replies per case.
3. It never sends as a real platform, airline or store. Sender names carry "demo" and a role; every reply ends with the demo footer.
4. Demo cases are excluded from the paywall, marked in the Sheet, and deleted after 7 days. No money moves. The demo is never presented as a refund result, and demo runs never count as users.
5. Any made-up PNR, booking ID or order ID works, and the screen says so.
6. Real cases are unchanged: 10-minute inbox check, Google scopes, calendar alerts.
7. The privacy page's "Demo cases" paragraph stays true: up to three replies per demo case, made-up details, deleted after seven days. Add one line naming the two flight roles.

---

## 7. State machine and main flows

### 7.1 Case stages (unchanged from live) and new case fields

Stages stay as built: `TRIAGING`, `NEED_INFO`, `READY`, `ACTED`, `WAITING`, `DUE`, `ERROR`, `CLOSED_LANDED`, `CLOSED_NO_ROUTE`, `CLOSED_OUT_OF_SCOPE`. Delete is an action, not a stage.

Case fields (set only by code). Reuse what exists; add only what is new:
- `refundType` (new): event, flight or store.
- `owner` (new): who owes the refund by rule (airline, travel site, store).
- `moneyWith` (new): who has the money now, from replies (airline, travel site, store, bank leg, unknown).
- Rung: reuse the existing `ladderLevel` for the ladder position (section 3); no second field.
- Due source: reuse the existing `dueSource` and `dueSourceText`. Live values are `message_promise`, `platform_policy` and `estimate`; flights add a rule row id (F01, F02, F03, F22 as company policy). Tickback defaults stay `estimate`, which keeps the C1 "Time to check" label.
- `count`: derived at close from case events (not stored by hand).

### 7.2 Transitions

| From | Event | To |
|---|---|---|
| (new) | User submits paste or screenshots | `TRIAGING` |
| `TRIAGING` | Missing field or low confidence | `NEED_INFO` |
| `NEED_INFO` | User answers | `TRIAGING` |
| `TRIAGING` | Route `WAIT` | `WAITING` (check-in on the due date) |
| `TRIAGING` | Route `OVERDUE` or `TRACE`, mail ready | `READY` |
| `TRIAGING` | Route `NO_ROUTE` | `CLOSED_NO_ROUTE` |
| `TRIAGING` | International, compensation-only, or a type not sold | `CLOSED_OUT_OF_SCOPE` |
| `TRIAGING` | Model failed after retries | `ERROR` (Try again returns to `TRIAGING`) |
| `READY` | I've sent it | `ACTED`, then `WAITING` with the rung's check-in |
| `WAITING` or `READY` | A reply arrives (case inbox, paste, or Gmail opt-in) | `TRIAGING` (reply handling, 7.4) |
| `WAITING` | Check-in date reached | `DUE` |
| `DUE` | Not yet | `READY` with the next rung |
| `DUE` | They replied | `TRIAGING` |
| any open stage | It's in | `CLOSED_LANDED` with the count |
| `CLOSED_NO_ROUTE` or `CLOSED_OUT_OF_SCOPE` | User pastes a new message | `TRIAGING` |

### 7.3 Reply decisions (the core loop)

The model returns a read, nothing more: which company the reply is from; which company it points at; the claim; any date, reference and amount; and a confidence. Claims: stall, under review, waiting on the other company, paid on a date, processed with a reference, credit shell offered (IDEA_SCOPE), plus asks for details and something else (added for code). Code applies this table with the playbook data:

| Claim read | Owner | Money with | Next mail (To, CC) | Date set | Rung |
|---|---|---|---|---|---|
| Stall or under review, no facts | Unchanged | Unchanged | None now | Their promised date if given (their promise); else the rung wait (Tickback default) | Same; next rung at check-in "Not yet" |
| Owner says not paid yet, after the due date | Unchanged | Owner | Next rung now, with the thread | Next rung's wait | +1 (early jump, Tickback default) |
| Travel site waiting on the airline | Airline (F03) | Airline | To airline Nodal Officer, CC travel site grievance: "On which date did you pay this refund to <site>?" | Rung wait (Tickback default) | Same (rung 2) |
| Airline paid the travel site on date D | Airline stays answerable (F03) | Travel site | To travel site grievance, CC airline Nodal: quote D, ask for bank reference and date sent | MakeMyTrip or Goibibo: D + 24 hours, their own terms, shown as company policy (F22). Others: rung wait (Tickback default) | Same |
| Processed with a reference, to the user | Unchanged | Bank leg | Bank message for the user (route `TRACE`) | Date in the reply (their promise); else Q3 | Bank leg (3.2) |
| Credit shell offered | Unchanged | Unchanged | Decline mail, F06 (F09 if medical) | Unchanged | Same |
| Asks for details | Unchanged | Unchanged | Reply filled from the case (PNR, booking ID, dates); if a field is missing, one question to the user. Never OTPs or bank details (4.3) | Rung wait | Same |
| Something else, or low confidence | Unchanged | Unchanged | None until the user confirms "Tickback read: ... Looks right / Not quite" | Unchanged | Same |

Rules: the model never sets an owner, a date, a rule or an address. A switch of `moneyWith` always shows "Changed" on the card with the reply that caused it. Every reply, date and draft is an event, so the count is exact.

### 7.4 Flow F1: landing to first value (overdue flight case)

1. Landing page, flights only: one line on what it does, the trust line, Start my case, and "No live case? Try a demo". No sign-up.
2. Start: optional name with one line on why. Paste the cancellation mail, the travel site's reply or a screenshot. Chips: Airline cancelled, I cancelled, Says refunded, not received, They offered a credit shell.
3. Check my refund: button disabled, spinner, live steps (reading, finding who owes it, working out your date, writing your next step), as live.
4. "What we understood": airline, booked on, payment method, cancellation date. Looks right or Not quite; up to 3 questions if needed.
5. Confirm step: PNR, and the travel site's booking ID if booked on one.
6. The "who owes you" card and mail 1 (target under 60 seconds from step 1, MISSING until measured).
7. Open in Gmail (web compose) with To, CC (officer and case inbox) and subject filled. Fallback: copy, with "Add this address in CC" and the exact case inbox address (live). Then I've sent it.
8. Save: check-in on the calendar, the case link, and the offer to allow Google Calendar for reply alerts (live, D-022).

### 7.5 Flow F2: a reply arrives

1. The company replies to all: the case inbox matches the case code within its 10-minute check. Or the user pastes it. Or, for Gmail opt-in users (test list this sprint), the thread is read.
2. The reply is redacted and saved; the reply banner shows it at the top of the case without a refresh (M2.4, live), and one calendar alert fires if Calendar is connected.
3. The model reads it (7.3). If confidence is low or the sender is not on the thread, the user confirms the read first.
4. Code applies 7.3: owner, money with, date, next person, rung. The card marks what changed.
5. The next mail is ready, or the case waits with the new check-in. Old check-ins move.
6. If the company replied only to the user, the case inbox misses it; the case says "If they replied only to you, paste it here" on every waiting screen.

### 7.6 Flow F3: the flight demo

1. Landing: Try a demo. The demo case is created with the sample mail; the "Demo" tag shows.
2. Looks right; Use a sample PNR; the card shows Demo Air as owner, overdue, with mail 1.
3. Round 1: Open in Gmail, send, I've sent it. "Waiting for DemoTrips' reply" with live steps. DemoTrips' reply lands in the same thread; the case updates live.
4. Round 2: mail 2 to Demo Air; Demo Air's reply; the owner switch shows on the card.
5. Round 3: mail 3 to DemoTrips; the reference reply; `TRACE` and the bank message.
6. Skip ahead to the check date; the check-in banner; It's in; Money landed with the count.
7. If a round times out: Try again (live). If the demo desk is not connected: "The demo desk is not connected yet" (live message).

### 7.7 Flow F4: check-in on the date (live, kept)

On the check-in date the banner asks "Has your Rs <amount> landed?" with It's in, Not yet, They replied. It's in closes (FS-7). Not yet opens the next rung (section 3). They replied opens the paste box (F2).

---

## 8. Out of scope, open questions, and the Shaktimaan checklist

### 8.1 Out of scope for v1

International flights; compensation claims (F10 to F19: one note line only, 2.2); hotels, trains, EPF; marketplaces as a lead; legal notices; chargebacks run by Tickback; consumer commission filing; RBI Ombudsman filing; voice calls; logging in for the user; asking for passwords, OTPs or bank details; sending mail from Tickback's address or one-tap send (Levels 2 and 3, decided after the tester round using the share of drafts never sent, D-025); money debited with no ticket issued (flights); the store contact lookup if it is cut (paste fallback stays).

### 8.2 Build order and cut order (for Codex)

Order: (1) flight data (rules and contacts as data, from `flights.md` B and C); (2) the flight route, dates and "who owes you" card (FS-1); (3) reply decisions and the owner switch (FS-2, FS-3, FS-4); (4) the flight demo (6.2); (5) FS-5, FS-6, FS-7 with the count; (6) the landing page switched to flights. Then the live proof run. Only after it passes: stores (2.4, 3.3, SS-1 to SS-3, 6.3).

Cut order if time runs short:
- If flights slip, stores go entirely (D-030 (2)).
- Inside the flight build, the who-did-what count on real cases goes first (D-030 (5)). Keep it in the demo if at all possible, since the demo is where most people will see it.
- Inside the store build: the contact lookup first, then extras, then the store demo shrinks to the events ladder with store words (lesson 11; 6.3 is already that version).

What success means by 17 Oct (IDEA_SCOPE, Fri 16): at least 3 live flight cases where a real reply was read and the next step moved; owner named; bank reference got where one came; replies caught by CC versus pasted; drafts written versus sent; who saw the Rs 49 offer and who paid. Money landed counts only if it truly lands. Hand-helped users and product users are counted separately; demo runs never count.

Price on the page (D-020, D-030 (3)): the route, the date and the first step are free; Rs 49 to stay on a case of Rs 300 or more, back if the money has not landed 30 days after its due date and you followed the steps (live `guaranteeLine` in `app/copy.ts`). The pay button stays off until Ganesh adds his UPI ID (live: the pay card is hidden while `NEXT_PUBLIC_UPI_VPA` is empty, `STATE.md`), as the sheet says. Cases Ganesh helps by hand this week are free. Demo cases never see the offer.

### 8.3 Open questions

From the playbooks (section H) and D-029:

| # | Question | Status |
|---|---|---|
| Q1 | UPI, debit card, net banking refunds on direct bookings have no DGCA day count (`flights.md` H1) | DECIDED, D-029 (2): 15 working days, Tickback's expectation |
| Q2 | Look-in on travel-site bookings (H2) | DECIDED, D-029 (1): never promised. Each site's zero-cancellation add-on terms are REPORTED until their pages are checked |
| Q3 | Bank-leg check date when a reference reply gives no date (no regulator timeline, `flights.md` A5) | OPEN, needs Ganesh. Proposal: reuse the 7-day rung wait as Tickback's expectation. Until decided: no automatic date; "Remind me on a date I pick" |
| Q4 | Working days are not defined in the CAR (H3) | TICKBACK DEFAULT: Monday to Friday, holidays ignored, say "about" |
| Q5 | Reschedules by the airline, other than the 6-hour delay case (H4, F18) | No specific refund rule found. v1 treats them through the airline's own policy and says so; LATER |
| Q6 | Yatra and ixigo grievance officers (H5); airlines beyond the four | NOT FOUND. The user pastes the address |
| Q7 | Block time for compensation tiers (H6) | Compensation is out of v1 |
| Q8 | F03 gives no start day | TICKBACK DEFAULT: the cancellation date, shown on the card |
| Q9 | Cleartrip and EaseMyTrip publish no pass-on time after the airline pays them | The 7-day rung wait applies (Tickback default) |
| Q10 | AirSewa web address (`flights.md` C) | NOT CHECKED by HQ. The verifier saw airsewa.gov.in load with "Report Grievance" but could not read who runs it. Ganesh opens it before any case reaches rung 4 |
| Q11 | Four contact pages read through tool summaries (IndiGo, Air India, SpiceJet, EaseMyTrip) | Ganesh spot-checks before Codex hard-codes them |
| Q12 | Stores: no fixed refund deadline (`online-stores.md` H1) | DECIDED, D-029 (3): the store's promise, or 7 days after the return is accepted, as Tickback's expectation |
| Q13 | Stores: reverse pickup duty; store credit on change of mind; chargeback windows (H2 to H4) | NOT FOUND in law. The agent does not claim them |
| Q14 | Stores: the E-Commerce (Amendment) Rules 2026 take effect 1 Jan 2027 (H5; `market-facts.md` now marks it CONFIRMED from PIB, no Gazette number) | Re-read O03 to O09 against the amendment before 1 Jan 2027. No effect on this sprint |
| Q15 | Stores: marketplace grievance officers (H6) | NOT FOUND until rechecked |
| Q16 | Flight demo: plus-addressed recipients in the one demo account | Codex proves it in the live demo test; fallback in 6.2 |
| Q17 | F09 (medical emergency): the verifier could not read the rest of CAR M-II para 3(m) (`flights-verification.md`) | Ganesh reads the full 3(m) before the FS-4 medical branch ships |
| Q18 | What counts as the "live proof run" that unlocks stores (D-030 (2)) | OPEN, needs Ganesh. Not defined in the sheet or decisions |
| Q19 | How hand-helped cases move into the product, and how a case is marked hand-helped so the two user counts stay separate (D-030 (4)) | OPEN, needs Ganesh |
| Q20 | Flight demo: is "one thread" one case thread (as built, 6.2) or one Gmail conversation across all three rounds? | OPEN, needs Ganesh. One Gmail conversation would need a different send path than Gmail web compose and is not in this build |
| Q21 | Which slice must be live on Tue 13 (the sheet's target), if not all of build steps 1 to 6 | OPEN, needs Ganesh. Cut order in 8.2 applies until he says |
| Q22 | Stores: start date for "7 days" when an order was cancelled (not returned) and the store promised no date. D-029 (3) names only "return accepted" | OPEN, needs Ganesh |

### 8.4 What Shaktimaan will click, and what he must find

Ganesh ticks each line on the live site before telling Shaktimaan flights are live. Until then the live link still shows events, and the sheet says so.

| # | He clicks or does | He must find | Source of truth |
|---|---|---|---|
| 1 | Opens the landing page | Flights only. No event or store selling. Start my case and Try a demo. The Rs 49 offer as the sheet states it | IDEA_SCOPE, D-030 |
| 2 | Pastes an overdue MakeMyTrip, UPI, airline-cancelled mail | The understood strip (airline, booked on, payment, cancellation date), a PNR ask, then the card: IndiGo or the right airline as owner, the 14-working-day date with "the rule gives no start day; Tickback counts from your cancellation date", the named grievance officer and Nodal Officer with page and date read, the pinning question, the case inbox in CC | FS-1, F03, `flights.md` C |
| 3 | Same mail, booked direct, UPI | 15 working days, "Tickback's expectation, not a DGCA rule", label "Time to check" | D-029 (2) |
| 4 | Booked on Yatra | "We don't hold a checked address", paste asked; no invented address | E3 |
| 5 | Pastes "pending with the airline", then "we paid MakeMyTrip on <date>" | Owner stays the airline after the first; "Who has your money now: MakeMyTrip" after the second, with F22's 24 hours and the bank-reference ask | FS-2 |
| 6 | Pastes a reply offering a credit shell | "Your choice, not their default" and a decline mail | FS-4, F06 |
| 7 | Pastes a reply with a UTR | `TRACE`, "the last leg is your bank", a bank message, no OTP ask | FS-3 |
| 8 | Looks for a look-in promise on a travel-site booking | None anywhere | D-029 (1) |
| 9 | Types an OTP or a card number into the paste | It is stripped before saving; the agent never asks for it | 4.3 |
| 10 | Runs Try a demo | Two labelled roles on every mail, each reply in the Gmail thread of the mail it answers and all of them on one case timeline (6.2, Q20), exactly 3 replies, the owner switch on screen, Skip ahead, Money landed with the count, about 3 minutes, the demo footer on every reply | 6.2 |
| 11 | Reads the privacy page | It matches the sheet's trust line word for word in meaning: reads what you paste and replies that reach the case inbox in CC; optional read-only Gmail; never logs in; never asks for an OTP or bank details | IDEA_SCOPE "Who they trust" |
| 12 | Pastes an international flight or an event | International: honest out-of-scope note. Event: the old event flow still works | 2.1, 2.5 |
| 13 | Closes a case with It's in | The amount and the who-did-what count from real events | FS-7, D-030 (5) |

Mismatches known today, to fix or say before he looks:
- **Pay card.** Resolved in the re-lock sheet: it now says the price shows on the page and the pay button stays off until the UPI ID is added, which matches the build (`STATE.md`). Nothing to fix unless Ganesh adds the UPI ID, in which case the Fri 16 report covers who paid.
- **Gmail opt-in wording.** Resolved in the re-lock sheet: it now says Gmail connect is open only to test accounts and that Tickback reads the refund thread, or a reply from a known sender if the thread can't be found, which matches the privacy page.
- **Privacy page gaps against the sheet's trust line.** The live privacy page (`app/privacy/page.tsx`) does not say "Tickback never logs in for you" or that Gmail connect is open only to test accounts. Line 11 above fails until those two lines are added (copy only, no feature change), plus the flight-roles line in 6.4 rule 7.
- **The count.** The sheet says every case ends with the count. If the count is cut (D-030 (5)), the sheet line changes first.
- **Flight demo.** Not built yet. The sheet's Tue 13 row is a target; Ganesh tells Shaktimaan the real day.
