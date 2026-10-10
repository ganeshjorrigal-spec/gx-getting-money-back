# Codex prompt: free until 3 landed refunds (D-036)

git pull. Change who sees the Rs 49 pay card. Run after the Razorpay checkout prompt.

Outcome: a user uses Refund Genie fully free (every mail, every rung, flights and events) until they have 3 cases closed as "It's in". From then on, opening a new case or unlocking the next mail on an open case shows the Rs 49 a year checkout (D-035). An active annual pass skips the card.

Rules:
- Count landed cases per device hash (same identity as annualPasses). Demo cases and hand-helped cases never count and never see the card.
- Threshold from config `FREE_LANDED_REFUNDS` (default 3).
- Replace the current flight lock rule ("locked after first sent mail unless paid") with this trial rule. Events and flights follow the same rule.
- Show the trial plainly: "Free until 3 refunds land. Then Rs 49 a year." plus "N of 3 free refunds used" on the case page. Update landing, Terms and Refund policy copy to match. Guarantee line stays for paid years.

Must not change: checkout and signature verification, flows, demos, reply tracking.

Proof: unit tests for 0, 2, 3 and 4 landed cases; demo and hand-helped excluded; paid pass skips the card. Deployed; screenshots of the counter at 0 and the card at 3 (fixture). Log it.
