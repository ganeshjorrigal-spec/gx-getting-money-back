# Codex morning addendum, 10 Oct (paste after the overnight run finishes)

git pull. Two small jobs on top of M2.6, then continue with the morning list.

1. Rename the product to **Refund Genie** (D-034). Change the one name constant and every user-facing place it shows: page titles, landing copy, privacy page, demo sender names ("Refund desk · demo (... role)" stays, only the product name changes), share card, draft footers, Sheet headers if they show the name. Do not rename the repo, Convex deployment, env names, case codes or the case inbox address. Keep "Tickback" out of anything a user sees.
2. Add three plain pages for Razorpay review, linked in the footer next to Privacy: Terms (what Refund Genie does and does not do: it writes messages you send yourself, never logs in, never asks for OTP, password or bank details, no legal advice), Refund and cancellation policy (Rs 49 a year; full refund if Refund Genie recovers nothing in that year; how to ask: the contact email), and Contact (Ganesh's support email from env `NEXT_PUBLIC_SUPPORT_EMAIL`; if empty, list it for me in the log). Light backgrounds, existing tokens, no em dashes.

Must not change: event and flight behaviour, demos, reply tracking, payments logic.
Proof: type check, unit tests, eval still passing; deployed; the four footer pages load; a grep showing no user-facing "Tickback". Log it under "For Ganesh".
