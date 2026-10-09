# Codex prompt: Razorpay Standard Checkout on Convex (adapted from Razorpay's IDE prompt)

Use this only if Ganesh chooses verified checkout over the Payment Link (D-035 if recorded). Keys are NOT in this file on purpose.

---

git pull. Replace the annual-pass "I've paid" self-claim with Razorpay Standard Checkout, verified on the server. Everything else about the annual pass stays (D-033: Rs 49 a year, guarantee, hand-helped and demo cases never see the offer, the flight lock after the first sent mail).

Stack facts: the site is a Next.js static export served by Convex. There are no Next.js API routes. The backend is Convex: use Convex actions (or routes in `convex/http.ts`) for the two server steps. Do not add Vercel or Netlify functions.

1. Create order (server, Convex action): checks case access and that the case is a real flight case (not demo, not hand-helped), then calls Razorpay `POST https://api.razorpay.com/v1/orders` with amount 4900 paise, currency INR, receipt = case code plus a short nonce, notes = case code. Basic auth from Convex env `RAZORPAY_KEY_ID` and `RAZORPAY_KEY_SECRET`. Store the order id against the case as `pending`. Rate-limit per device (reuse `takeRate`).
2. Checkout (client): load `https://checkout.razorpay.com/v1/checkout.js` only on the case page when the pay card shows. Open the modal with the order id and `NEXT_PUBLIC_RAZORPAY_KEY_ID`, name "Refund Genie" (or the current name constant), description "1 year". Handle dismiss (no change, button usable again) and `payment.failed` (plain message, try again).
3. Verify (server, Convex action): HMAC-SHA256 of `order_id|payment_id` with `RAZORPAY_KEY_SECRET`, constant-time compare to `razorpay_signature`, and the order id must match the one stored for this case. Only then mark the annual pass `confirmed`, the payment `confirmed`, add a case event, and unlock. Mismatch or missing fields: reject, mark nothing. Use Web Crypto in the action; no new SDK needed unless you prefer `razorpay` in a Node action.
4. Keep `reconcile` for manual fixes. Remove the self-claim path for flight cases once verify works; keep the Payment Link fallback only if `RAZORPAY_KEY_ID` is unset.

Secrets:
- Never write either key into code, logs, markdown, tests or commits. Read the secret only inside Convex actions from Convex env. The key id may be public (`NEXT_PUBLIC_RAZORPAY_KEY_ID`); the secret never reaches the client bundle.
- Do not set Convex env vars yourself. Ganesh sets them. If missing, leave the pay card off and list it for him.

Must not change: event and flight flows, demos, reply tracking, the annual-pass rules above.

Proof (test mode keys only):
- Unit tests: signature check passes with a known good vector and fails on any changed character; order id mismatch rejected; demo and hand-helped cases cannot create orders.
- `grep` of the built client bundle shows no key secret.
- In the morning list: Ganesh pays Rs 49 with a Razorpay test card or test UPI on a fixture flight case, sees it unlock, and sees the payment in the Razorpay test dashboard. Live keys only after Razorpay activation.
