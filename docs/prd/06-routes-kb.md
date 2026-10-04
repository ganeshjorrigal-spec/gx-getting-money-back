# 06 Routes knowledge base: platforms, rules, contacts

Owner: Claude HQ. Status: DRAFT v1, checked 4 Oct 2026. Codex seeds the `routeKb` table from the JSON in section 5 and never edits facts here.

Raw research with every source: `docs/archive/2026-10-04_research-event-refund-routes.md`.

**Confidence labels:**
- **VERIFIED:** primary source seen. The product may state it, and code may auto-fill it into a draft.
- **REPORTED:** secondary source only. The product may mention it as "reported", and must never auto-fill it as an address.
- **NOT FOUND:** the product says it doesn't know and tells the user where to look.

---

## 1. Platforms

### District (Zomato; Paytm Insider moved into it)

| Fact | Value | Label |
|---|---|---|
| Legal entity | Wasteland Entertainment Private Limited, Mumbai | VERIFIED |
| Cancelled event | Refund only if the organiser agrees; the organiser instructs District to process it | VERIFIED |
| Postponed event | Organiser may offer the new date, or a refund "within a specific duration communicated to you by District" | VERIFIED |
| Can't attend | "Tickets once sold cannot be exchanged, cancelled, modified, transferred, or refunded" | VERIFIED |
| Refund timeline | 7 to 10 working days from the refund request | VERIFIED |
| Failed payment | District processes it in 3 to 5 days; the bank may take 7 to 10 working days more | VERIFIED |
| Convenience fee | Non-refundable, except when the organiser cancels the event | VERIFIED |
| Support | In-app chat; support@district.in; 0124-4268565; web form with an "Events" category | VERIFIED |
| Grievance Officer | Not found on the contact page, booking terms or privacy policy | NOT FOUND |

Sources: https://www.district.in/policies/events/booking-terms and https://www.district.in/contact

### BookMyShow (Bigtree Entertainment Pvt Ltd)

| Fact | Value | Label |
|---|---|---|
| Can't attend (live events) | No cancellation for live entertainment; resale on its marketplace may be the only option | REPORTED |
| Cancelled event | Ticket price refunded to the original payment method; whether the convenience fee is refunded is unclear | REPORTED |
| Refund timeline in recent cancellations | 7 to 10 working days (Shubh tour); 8 to 10 working days (Bandland 2026) | REPORTED |
| Grievance Officer and escalation emails | Listed by a third-party aggregator only | REPORTED, **do not ship** until checked by hand |
| Support channels | Not confirmed (the site blocked our tools) | NOT FOUND |

### Others

| Platform | What we know | Label |
|---|---|---|
| SkillBox | Active ticketing platform. Policy and contacts not extracted | Active VERIFIED; rest NOT FOUND |
| Ticketgenie (RCB home matches, IPL 2025) | Refund claims to refund@ticketgenie.in | REPORTED |
| Ticketmaster India | No active consumer site found in 2026 | NOT FOUND |

### IPL and other cricket

- Each franchise and its ticketing partner sets the refund route per match.
- Washouts, venue moves and suspensions in 2025 each had a different process.
- Physical tickets often need an offline step: courier to the stadium, or collect the refund where bought.
- Rules depend on how much of the match was played.
- **What the agent does:** it never assumes one IPL rule. It reads the instructions from the user's own message and builds the checklist from those.

---

## 2. Rules the product may cite

| Rule | What it says | Use it for | Label |
|---|---|---|---|
| Consumer Protection (E-Commerce) Rules, 2020, Rule 4(4) and 4(5) | E-commerce entities must appoint a Grievance Officer, show their name and contact, acknowledge a complaint within 48 hours, and resolve it within one month | L1 drafts and the L1 why line, phrased "under the rules" | REPORTED (same wording in three copies; the gazette site could not be opened). Fine to cite with that phrasing |
| 2026 amendment (G.S.R. 789(E)) | Complaint copy to the complainant; National Consumer Helpline convergence mandatory | **Do not cite.** In force only from 1 Jan 2027 | REPORTED |
| RBI TAT circular, 20 Sep 2019 (RBI/2019-20/67) | Failed online card or UPI merchant payment (debited, merchant not confirmed): auto-reversal by T+5 calendar days; ₹100 per day after that, paid without a claim | `FAILED_PAYMENT` only. **Never** for cancelled-event refunds | VERIFIED (not checked whether it has been replaced since 2019) |
| National Consumer Helpline | 1915 or 1800-11-4000 (8 AM to 8 PM), WhatsApp and SMS +91 8800001915, consumerhelpline.gov.in, nch-ca@gov.in. Docket number; forwarded to the company; up to 30 days; convergence partners are "expected" to reply within 30 days | L2 and the out-of-scope help line | VERIFIED |

---

## 3. Tracing a refund

- **ARN:** a 23-digit reference for card refunds. The user's bank traces the credit with it. Usually in the platform's or payment gateway's refund email. (REPORTED)
- **RRN or UTR:** the reference for UPI refunds. Shown in the UPI app and on the statement. (REPORTED)
- **What the agent says:** "If they say it's refunded but it's not in your account, ask them for the refund reference number (ARN for cards, UTR for UPI), then give it to your bank."
- **UPI dispute order:** UPI app, then the PSP bank, then your bank, then NPCI, then the Banking Ombudsman. (VERIFIED) In v1 we go as far as "your bank" and name the rest.

---

## 4. What the product may say

**Safe to state (VERIFIED):**
- District: an agreed refund should reach you in 7 to 10 working days.
- District: on a postponed event, the organiser decides whether to offer a refund, and District tells you the window. Miss it and you may lose the refund.
- District: no refund just because you can't attend.
- District: the convenience fee is refunded only when the organiser cancels.
- District support: in-app chat, support@district.in, 0124-4268565.
- RBI: a failed card or UPI payment must be reversed by T+5 days, then ₹100 a day, paid automatically.
- National Consumer Helpline contacts and the 30-day expectation.

**State only with a caveat:**
- Anything about BookMyShow ("BookMyShow has said 7 to 10 working days in recent cancellations").
- The E-Commerce Rules timelines ("under the rules").
- IPL routes ("each team sets its own process; here's what your message says").

**Never state:**
- A Grievance Officer name or email that isn't VERIFIED.
- The 2026 amendment as current law.
- The RBI ₹100-per-day rule for cancelled-event refunds.

---

## 5. Seed data for `routeKb` (Codex loads this with `kb.seed()`)

Only `VERIFIED` contact values may be auto-filled into a draft's `to` field. `REPORTED` values may appear as a hint: "Reported address, check it on their site first."

```json
[
  {
    "key": "district",
    "displayName": "District",
    "legalName": "Wasteland Entertainment Private Limited",
    "supportEmail": { "value": "support@district.in", "confidence": "VERIFIED", "source": "https://www.district.in/contact" },
    "grievanceEmail": null,
    "chatPath": { "value": "District app, Help, in-app chat", "confidence": "VERIFIED", "source": "https://www.district.in/contact" },
    "defaultRefundWorkingDays": { "value": 10, "confidence": "VERIFIED", "source": "https://www.district.in/policies/events/booking-terms" },
    "policies": {
      "cancelled": { "text": "A refund is issued only if the organiser agrees; the organiser asks District to process it.", "confidence": "VERIFIED", "source": "https://www.district.in/policies/events/booking-terms" },
      "postponed": { "text": "The organiser may offer the new date or a refund within a window District tells you.", "confidence": "VERIFIED", "source": "https://www.district.in/policies/events/booking-terms" },
      "cantAttend": { "text": "Tickets once sold cannot be exchanged, cancelled, modified, transferred or refunded.", "confidence": "VERIFIED", "source": "https://www.district.in/policies/events/booking-terms" },
      "convenienceFee": { "text": "Not refunded, except when the organiser cancels the event.", "confidence": "VERIFIED", "source": "https://www.district.in/policies/events/booking-terms" },
      "failedPayment": { "text": "District processes it in 3 to 5 days; your bank may take 7 to 10 working days more.", "confidence": "VERIFIED", "source": "https://www.district.in/policies/events/booking-terms" }
    },
    "lastVerifiedAt": "2026-10-04"
  },
  {
    "key": "bookmyshow",
    "displayName": "BookMyShow",
    "legalName": "Bigtree Entertainment Pvt Ltd",
    "supportEmail": null,
    "grievanceEmail": null,
    "chatPath": null,
    "defaultRefundWorkingDays": { "value": 10, "confidence": "REPORTED", "source": "https://rollingstoneindia.com/bandland-festival-2026-canceled/" },
    "policies": {
      "cancelled": { "text": "Recent cancellations refunded the ticket price to the original payment method within 7 to 10 working days. Whether the convenience fee is refunded is unclear.", "confidence": "REPORTED", "source": "https://rollingstoneindia.com/bandland-festival-2026-canceled/" },
      "cantAttend": { "text": "Live event tickets are reported to be non-cancellable; resale on BookMyShow may be the only option.", "confidence": "REPORTED", "source": "https://swadeshiapps.com/entertainment/bookmyshow" }
    },
    "lastVerifiedAt": "2026-10-04"
  },
  {
    "key": "ticketgenie",
    "displayName": "Ticketgenie",
    "supportEmail": { "value": "refund@ticketgenie.in", "confidence": "REPORTED", "source": "https://www.crictracker.com/cricket-news/ipl-2025-will-fans-get-refund-for-washed-out-game-between-rcb-and-kkr-at-m-chinnaswamy-stadium-explained/" },
    "grievanceEmail": null,
    "chatPath": null,
    "defaultRefundWorkingDays": null,
    "policies": {},
    "lastVerifiedAt": "2026-10-04"
  },
  {
    "key": "organiser_site",
    "displayName": "the organiser",
    "supportEmail": null, "grievanceEmail": null, "chatPath": null,
    "defaultRefundWorkingDays": null,
    "policies": {},
    "lastVerifiedAt": "2026-10-04"
  }
]
```

Fixed helpline contacts (VERIFIED, may be auto-filled at L2): `consumerhelpline.gov.in`, `1915`, `1800-11-4000`, WhatsApp `+91 8800001915`, `nch-ca@gov.in`.

---

## 6. Ganesh's manual check (our tools could not open bookmyshow.com)

Do this before the first real BookMyShow case. Tell Claude HQ what you find; HQ updates this file and the seed.

1. **BookMyShow Grievance Officer:** open in.bookmyshow.com in your browser. Check the footer and the Terms and Conditions page for "Grievance Officer". Copy the exact name, email and the page URL.
2. **BookMyShow support:** check whether a support email is published, and the in-app path to chat (for example Profile, Help and Support, booking, chat).
3. **BookMyShow live-event refund policy:** cancelled, postponed, and the convenience fee rule.
4. **District Grievance Officer:** open district.in, Terms of Service (it didn't render for our tools).
5. **Helpline partners:** on consumerhelpline.gov.in, check whether BookMyShow and District are convergence partners.

Until step 1 is done, a BookMyShow L1 draft leaves `to` empty and shows the "find the Grievance Officer" help line.
