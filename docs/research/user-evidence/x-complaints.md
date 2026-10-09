# X complaints: refund evidence (REPORTED)

REPORTED practice evidence from public X posts. Not rules. Never cite these as law.

Collected by Ganesh on 9 Oct 2026 with NotebookLM. Two batches, 29 complaints in all. Links point to `x.com/i/status/<id>`; account handles were removed.
- Batch A: 14 complaints across companies (Flipkart, Cleartrip, IRCTC, Meesho, AJIO, Jio, MakeMyTrip, Amazon, Domino's, boAt, EaseMyTrip).
- Batch B: 15 complaints on MakeMyTrip and Goibibo profiles, mostly flights.

## HQ read (Claude HQ, 9 Oct 2026)

Small sample, public posts only, every outcome still open. Treat as signals, not rates.

1. **"Please DM us" is the standard first reply.** 17 of 29 complaints (7 in A, 10 in B). The public thread then goes quiet. Product signal: the agent should move the chase to email with the case inbox in CC and the grievance officer, so there is a written, dated trail. A DM thread is neither.
2. **Travel site says it is waiting for the airline.** 4 of 15 in batch B (rows 6, 9, 11, 15). This is the blame loop the flights playbook expects. Counter: F03 (airline holds the onus, 14 working days) and F22 (MakeMyTrip and Goibibo pass refunds on within 24 hours of receiving them, so ask for the date the airline paid).
3. **"Refund processed" but no money.** 7 complaints (A: 6, 9, 10; B: 6, 7, 9, 15). Counter: ask for ARN or UTR and the date it left.
4. **Very long waits on SpiceJet bookings.** Batch B rows 9 and 12 report about 90 and 120 days, both SpiceJet via Goibibo; row 6 also reports 120 days. Stated waits in batch B: 1 to 120 days, median 20.
5. **Fees kept on cancellation.** Batch A rows 1, 13, 14 and batch B row 12 mention convenience fees or taxes retained. Note the limit: taxes and airport fees must come back (F04), but a travel-agent fee disclosed at booking sits outside the cancellation cap (F07). The agent must not promise a convenience fee back.
6. **Chatbot loops.** 3 posts in batch B (rows 4, 7, 13) describe app bots repeating templates with no route to a person. This supports skipping straight to email and the grievance officer.

Data quality notes:
- Batch A row 11 (Domino's) has its columns shifted by one; "6" is likely days waiting.
- Batch B row 10 is a hotel booking labelled "denied boarding"; treat the scenario as "other".
- Several links are the company's own reply, not the original post.
- Batch A includes non-refund-type cases (Jio, Domino's) that are outside our two refund types.

## Batch A: mixed companies

### Step 1. One Row Per Complaint

| id | refund type | company complained to | airline or other company involved | scenario | days waiting so far | what support said | channel already tried | money stuck with | outcome visible in the thread | post link |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | flight | Cleartrip | SpiceJet | other | not stated | Requested time to look into the matter. Official ministry handle stated case was processed per applicable rules. | X | travel site | still open | https://x.com/i/status/2107189752130925019 |
| 2 | other | Flipkart | not stated | other | not stated | Support informed customer that return request cannot be created for undelivered items. | chat | company | still open | https://x.com/i/status/2106751319772209504 |
| 3 | other | Meesho | Shadowfax | other | 2 | Apologized for delay and asked customer to share tracking and contact details in private message. | call | unclear | still open | https://x.com/i/status/2108026586775920828 |
| 4 | train | IRCTC | Indian Railways | passenger cancelled | 15 | Requested customer to share mobile number in private message. | call | travel site | still open | https://x.com/i/status/2107711686929170687 |
| 5 | other | AJIO | not stated | other | not stated | not stated | X | company | still open | https://x.com/i/status/2107744591080509647 |
| 6 | other | Flipkart | not stated | refund processed not received | not stated | Apologized for delay and requested order details via private message. | none stated | unclear | still open | https://x.com/i/status/2107523297030349120 |
| 7 | other | Reliance Jio | not stated | other | not stated | Stated they already replied to customer in private message. | X | company | still open | https://x.com/i/status/2106673847756034062 |
| 8 | other | MakeMyTrip | not stated | other | not stated | Regretted inconvenience and asked customer to share booking ID and contact details in private message. | X | travel site | still open | https://x.com/i/status/2107908739273720225 |
| 9 | other | Amazon | not stated | refund processed not received | not stated | Directed customer to a web link. Specialized support team then stated they could not help. | chat | company | still open | https://x.com/i/status/2107872870554833339 |
| 10 | train | IRCTC | Indian Railways | refund processed not received | not stated | Requested customer to share booking reference and mobile number in private message. | none stated | unclear | still open | https://x.com/i/status/2108075941444612221 |
| 11 | other | Domino's India | not stated | other | not stated | 6 | Forwarded remarks to internal team and promised customer would be contacted. | X | company | still open | https://x.com/i/status/2108099819353129296 |
| 12 | other | boAt | not stated | credit shell or voucher pushed | not stated | Stated disputed funds would be credited back to original payment source. | X | company | still open | https://x.com/i/status/2108082384180814083 |
| 13 | flight | Cleartrip | Air India | passenger cancelled | not stated | Apologized for inconvenience and requested time to review thoroughly. | call | travel site | still open | https://x.com/i/status/2107469736636477907 |
| 14 | flight | EaseMyTrip | Goibibo | airline cancelled | not stated | Requested booking ID in private message to assist customer. | X | travel site | still open | https://x.com/i/status/2108093242168525062 |

### Step 2. Patterns

1. Pattern Name: Company asking to move conversation to private message
- Number of posts: 7 posts
- Row ids: 3, 4, 6, 7, 8, 10, 14
- Paraphrased example: Support account replies to public post by asking user to send booking details in direct message.

2. Pattern Name: Refund marked as processed or completed but money not received
- Number of posts: 3 posts
- Row ids: 6, 9, 10
- Paraphrased example: Application shows refund status as finished, but money has not arrived in customer bank account.

3. Pattern Name: Travel sites retaining fees or citing conflicting airline charges
- Number of posts: 3 posts
- Row ids: 1, 13, 14
- Paraphrased example: Booking site retains statutory taxes or convenience fees upon cancellation, citing agency policy or higher airline fees.

### Step 3. Counts

- Total posts evaluated: 15 sources in notebook.
- Total complaint posts analyzed: 14 posts.
- Posts per company:
  - Flipkart: 2
  - Cleartrip: 2
  - IRCTC: 2
  - Meesho: 1
  - AJIO: 1
  - Reliance Jio: 1
  - MakeMyTrip: 1
  - Amazon: 1
  - Domino's India: 1
  - boAt: 1
  - EaseMyTrip: 1
- Posts per scenario:
  - Other: 7
  - Refund processed not received: 3
  - Passenger cancelled: 2
  - Airline cancelled: 1
  - Credit shell or voucher pushed: 1
- Median days waiting where stated: 6 days (stated values are 2, 6, and 15 days).
- Share of posts where company replied publicly: 12 out of 14 posts (85.7%).
- What reply usually said: Support apologized for inconvenience and requested customer booking or contact details via direct message.

### Step 4. Limits

- What this sample cannot tell us:
  - This sample only reflects public complaints posted on X.
  - It does not represent total customer resolution rates, private support outcomes, or overall transaction volume.
  - Posts contain unverified user statements and initial corporate responses rather than complete internal audit logs.
- Posts skipped and why:
  - Skipped 1 source: "Flight Cancellation Refund Process: How to Get a Full Refund After Flight Cancellation Step by Step Guide". Reason: This source is a news article guide explaining refund procedures, not a customer complaint post on X.

## Batch B: MakeMyTrip and Goibibo

### STEP 1. ONE ROW PER COMPLAINT

| id | refund type (flight / hotel / bus / train / other) | company complained to | airline or other company involved | scenario (airline cancelled, rescheduled, passenger cancelled, denied boarding, refund processed not received, credit shell or voucher pushed, other) | days waiting so far (number, or "not stated") | what support said (paraphrase) | channel already tried (call, chat, email, X, none stated) | money stuck with (travel site / airline / bank / unclear) | outcome visible in the thread (resolved / still open / unknown) | post link |
|---|---|---|---|---|---|---|---|---|---|---|
| 1 | flight | MakeMyTrip | Cathay Pacific | other | not stated | Asked customer to review prior email and requested 24 hours to check the issue. | email, X | travel site | still open | https://x.com/i/status/2095548902812549496 |
| 2 | flight | MakeMyTrip | Akasa Air | airline cancelled | not stated | Requested booking details and contact info via private message. | call, X | travel site | still open | https://x.com/i/status/2104051801406513639 |
| 3 | flight | MakeMyTrip | Etihad | passenger cancelled | not stated | Requested booking details and contact info via private message. | X | travel site | still open | https://x.com/i/status/2102689824646070432 |
| 4 | flight | MakeMyTrip | not stated | passenger cancelled | not stated | Requested booking details and contact info via private message. | chat, X | travel site | still open | https://x.com/i/status/2103739598077829387 |
| 5 | flight | MakeMyTrip | not stated | other | not stated | Requested contact details, email ID, and screen recording of the login process via private message. | X | travel site | still open | https://x.com/i/status/2099829219354464402 |
| 6 | flight | MakeMyTrip | not stated | refund processed not received | 120 | Stated phone attempt failed, confirmed processing airline refund, and requested time to validate full balance. | call, X | airline | still open | https://x.com/i/status/2105940631994675245 |
| 7 | other | MakeMyTrip | not stated | refund processed not received | 15 | Requested booking details and contact info via private message. | chat, X | travel site | still open | https://x.com/i/status/2106346348232737262 |
| 8 | other | MakeMyTrip | not stated | other | not stated | Requested booking details and contact info via private message. | call, X | travel site | still open | https://x.com/i/status/2099813037280837992 |
| 9 | flight | Goibibo | SpiceJet | refund processed not received | 90 | Apologized for delay and stated the case is under review. | X | airline | still open | https://x.com/i/status/2098324406414274621 |
| 10 | hotel | Goibibo | not stated | denied boarding | not stated | Requested booking details and contact info via private message. | X | travel site | still open | https://x.com/i/status/2099817271032230311 |
| 11 | flight | MakeMyTrip | SpiceJet | passenger cancelled | 10 | Requested booking details and contact info via private message. | X | airline | still open | https://x.com/i/status/2097962580828696615 |
| 12 | flight | Goibibo | SpiceJet | airline cancelled | 120 | Requested booking details and contact info via private message. | X | airline | still open | https://x.com/i/status/2103795159150579968 |
| 13 | other | Goibibo | not stated | passenger cancelled | 1 | Requested booking details and contact info via private message. | chat, X | travel site | still open | https://x.com/i/status/2104848302458224730 |
| 14 | other | Goibibo | not stated | credit shell or voucher pushed | not stated | Offered voucher deactivation, confirmed raising refund request for Rs 2,000, and asked for 48 hours to complete review. | X | travel site | still open | https://x.com/i/status/2100529093364314270 |
| 15 | flight | Goibibo | not stated | refund processed not received | 20 | Requested 48 hours to check with team, and later asked for airline cancellation notice. | email, X | travel site | still open | https://x.com/i/status/2096873710913478754 |


### STEP 2. PATTERNS

List of complaint patterns observed in 3 or more posts:

### 1. Standard public response requesting private message (DM)
* **Count:** 10 posts
* **Row IDs:** 2, 3, 4, 5, 7, 8, 10, 11, 12, 13
* **Example:** The company social media care account responded publicly asking the customer to send their booking ID and contact phone number via direct message.

### 2. Travel site delaying refund while awaiting airline confirmation or funds
* **Count:** 4 posts
* **Row IDs:** 6, 9, 11, 15
* **Example:** The travel booking application indicated that the refund request was initiated but remained pending awaiting final confirmation or release from the airline.

### 3. Refund processed or reference email issued but money not credited to bank
* **Count:** 4 posts
* **Row IDs:** 6, 7, 9, 15
* **Example:** The customer received an official email or notification stating the refund was raised, but no money appeared in their bank account after several weeks.

### 4. Multi-month refund waiting period
* **Count:** 3 posts
* **Row IDs:** 6, 9, 12
* **Example:** A customer waited nearly four months for a pending refund following an operational flight cancellation by the airline.

### 5. Automated AI customer support loop or missing live chat options
* **Count:** 3 posts
* **Row IDs:** 4, 7, 13
* **Example:** The customer attempted to resolve their complaint using the mobile app, but encountered automated AI chatbots that repeated template answers without offering resolution options.


### STEP 3. COUNTS

* **Total posts:** 16 posts in dataset (representing 15 unique complaint cases).
* **Posts per company:**
  * MakeMyTrip: 9 posts (9 complaints: Rows 1, 2, 3, 4, 5, 6, 7, 8, 11)
  * Goibibo: 7 posts (6 unique complaints: Rows 9, 10, 12 [2 posts in dataset], 13, 14, 15)
* **Posts per scenario:**
  * passenger cancelled: 4 complaints (Rows 3, 4, 11, 13)
  * refund processed not received: 4 complaints (Rows 6, 7, 9, 15)
  * other: 3 complaints (Rows 1, 5, 8)
  * airline cancelled: 2 complaints (Rows 2, 12)
  * denied boarding: 1 complaint (Row 10)
  * credit shell or voucher pushed: 1 complaint (Row 14)
* **Median days waiting where stated:** 20 days (calculated from stated waiting periods: 1, 10, 15, 20, 90, 120, and 120 days).
* **Share of posts where the company replied publicly:** 100% (16 out of 16 posts received a public response from the company handle).
* **What that reply usually said:** The public reply asked the customer to send a private direct message (DM) containing their contact details and booking ID, or asked for an additional 24 to 48 hours to review the issue internally.


### STEP 4. LIMITS

* **Sample limitations:**
  * This dataset reflects only customer grievances made publicly on X. It does not represent overall customer satisfaction, non-public support tickets, or resolution rates after private DM interactions.
  * The posts present only customer claims and company public replies. They do not contain internal transaction records, banking transfer logs, or official airline communications needed to establish legal liability or verify unstated facts.
* **Posts skipped and why:**
  * **Source 13:** Skipped as a separate row in the Step 1 complaint table because it is part 4 of a multi-tweet thread posted by the same user as Source 12 (part 5). Both tweets describe the exact same flight cancellation, convenience fee deduction, and Rs 15,500 refund claim. Combining them prevents double-counting a single complaint.
