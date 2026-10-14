# D-048 / D-050 publication, 15 October 2026

Deployed source: dd47738fd85d315874f594f646951472961109a8. Timeout-only commit dd47738 changes one line in lib/chase-send-action.test.ts, setting its file-local timeout to 20 seconds. No product code changed in this release session.

- Full suite twice: 350/350, 47 files, 7.19s and 7.31s. Type check and explicit static export passed.
- Saved 17-step public-demo walk passed on actual page components with isolated local transport. local-walk.json and local-walk.txt. Synthetic .invalid inbox only; no mail or call sent. This is not live Gmail delivery.
- npm run deploy succeeded; Convex static version 33e5ffdf-abdc-43cb-b07c-1bc9eb299f11, 131 files. Backend functions accepted too.
- Then npm run deploy:web succeeded; Cloudflare version 9705807a-1116-4425-b79e-338dc7abb39e, 32 new assets / 99 reused. Both configured custom domains published.
- live-routes.json: all six requested public paths plus /demo-confirm/ return 200.
- live-hero.json / live-hero-ending.png: live animation finished, reply visible, old mail hidden, final It's in visible at opacity 1. live-hero.png also saves the landing context.
- /demo-confirm/ renders the correct page. Opened without a confirmation nonce, it shows its error/return-link state, saved in demo-confirm.txt and demo-confirm.png. No valid email confirmation link was used; that test belongs to Ganesh.
- Real email demo not run by Codex. Ganesh must report confirmation arrival, link opening the case, and copied demo requests/replies with Demo: subjects and the notice. Nothing DONE.
- No calling settings, allow-list, key or environment change. No actual call or real-company mail. Rollback requires Ganesh's say-so.
