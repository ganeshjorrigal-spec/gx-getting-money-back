# Current state, 24 October 2026

## Submitted version frozen; separate test link ready for review
Tag submitted-v1 points to 6153907df62f36c196a8732f568ddd0c8ce1b427 (Add DESIGN.md), pushed with owner approval. Main was not pushed. Work folder: gx-getting-money-back-next, branch next. Original root prompt stays uncommitted in the original folder; its copy is committed here as 84d6bcb. PRODUCT.md unchanged.

## Test environment
Project refundgenie-test, deployment tangible-lemur-692, https://tangible-lemur-692.convex.site. Static version f837629c-5322-4a50-8a20-2f1968628ded. No env copies. Owner set the six required settings; Codex checked names/presence without disclosing values. Backend and 16-page static export/upload pass. Test setup commit f2aa131 includes necessary static route fixes and six passing tests; full type check and final backend push pass. Browser opens /, /start/, /cases/ and a made-up cancellation reaches Your free check on RG-23L67W. Screenshot and safe proof in docs/qa/test-link-2026-10-24/. README includes test link and live-deploy prohibition.

## Live unchanged
Read-only Cloudflare check confirms refundgenie-web remains on 69504117-ebf7-44b4-a939-a06294d4a6c9 at 100%. No live deployment, main push, Cloudflare mutation, live Convex setting change, calls or mail. Test-only code change: cases and private case links now resolve exported HTML instead of landing fallback. No product/planner changes.

## Next-build decisions logged; stop before N2
D-062 through D-070 and N1 through N8 copied exactly from HQ's prompt on next, old milestone history preserved. Nothing marked DONE; N2 not started. All six needed-now settings are present. Deferred settings remain for Ganesh: test-only Razorpay credentials when payments are needed; VAPI/call settings before N4; separate test Google OAuth, case inbox, demo desk, Gmail test accounts, responses Sheet sharing and CHASE settings after HQ/Ganesh choose a test inbox before N6. Never connect the live inbox here. Full names/purposes in docs/handoff/refundgenie-test-settings.md. Demo mail and case-link mail stay unavailable meanwhile. Await HQ review/Ganesh's next instruction.
