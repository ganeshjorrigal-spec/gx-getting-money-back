# Codex prompt: demo-only release tonight (authorised by Ganesh)

Written by HQ, Tue 13 Oct 2026, 23:55 IST. Ganesh authorises one publish tonight, demo fix only. Read `docs/hq/review-2026-10-13-demo-speed-finals.md`.

1. Make a release branch `release/2026-10-13-demo` from `4990087` (the live version). Cherry-pick only what the demo fix needs: `6ef05de` (customer-care demo roles) and `33fcc76` (public demo rounds, no static escalation dead end). If either needs another commit to apply cleanly, list it and include only the minimum; do not bring in the landing restyle, speed, finals, D-046 or portal work.
2. On the release branch: run the full test suite, type check, static build, and the saved public-demo regression walk. All must pass.
3. Publish from the release branch: `npm run deploy` (Convex) then `npm run deploy:web` (Cloudflare).
4. Live proof on refundgenie.app in a fresh browser profile: the landing demo button and `/start/?demo=flight` play every round to "Money landed"; the escalation step shows "You send this one from your Gmail"; `/`, `/terms/`, `/refund-policy/`, `/contact/`, `/privacy/`, `/start/` return 200. Screenshots in `docs/qa/release-2026-10-13-demo/`.
5. Push the release branch. Do not merge it into `main` (main already contains both commits). Log the deployed commit hash.

No calling settings, allow-lists or keys. Mark nothing DONE. If anything fails, stop, do not publish, and report.

## Short paste block

```
git pull. Publish authorised for the demo fix only: do docs/hq/codex-prompts/2026-10-13-demo-release-tonight.md. Release branch from 4990087 with only 6ef05de and 33fcc76, test, then npm run deploy and npm run deploy:web, then live proof. Stop if anything fails. Then do the landing polish in docs/hq/review-2026-10-13-demo-speed-finals.md on main, without publishing.
```
