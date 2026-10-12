# HQ review: mail fixes 8cc942d and restyle Phase A (to 3c4525e)

Reviewed Tue 13 Oct 2026, 01:30 IST, by Claude HQ.

## Verdict

**Accepted.** One small polish item goes into tonight's queue. Nothing is deployed.

## What I ran myself

| Check | Result |
|---|---|
| `npx vitest run` | 234 passed, 27 files |
| `npx tsc --noEmit` | clean |
| Screenshots | looked at landing 375px and flight case 1280px |
| Codex checks (`docs/qa/restyle-step7-2026-10-13/checks.json`) | no overflow, no small tap targets, no green outside "It's in" |

## Mail fixes (from the 12 Oct review)

Both fixed. The 15-working-day estimate now says so, seven days stays only for the pass-on estimate, and address-type contacts get "Dear <company> support,". Tests added.

## Phase A

- Tokens, receipt slip, source lines, next-move card and landing order match the prompt. Every date on the flight card has a source line.
- Price and guarantee copy now reads from one place (`lib/pricing.ts`). The old "for this case" line is gone. The "I've paid" button remains only on the fallback Payment Link path when Razorpay Checkout is not configured; fine for now.
- Calling sentences live in `app/copy.ts` (`callingCopy`), as asked.

## Polish (in tonight's queue)

The overdue flight card says Overdue three times: the badge top right, the stamp, and the "Overdue by 8 working days" heading under the slip. Keep the stamp only. Remove the badge on the case card and change the heading under the slip to the plain sentence that follows it.
