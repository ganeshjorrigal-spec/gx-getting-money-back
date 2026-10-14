# Codex prompt: publish D-048 and D-050 before the supervised live call

Written by HQ, Wed 14 Oct 2026, 23:59 IST. Authorised only when Ganesh pastes the block below in chat. HQ accepted 08ab48f, 2e9bd9c, 0f0f38a, 8cf4c6d and 5c1e8be (`docs/hq/review-2026-10-14-d048-email-demo-cc.md`).

1. git pull. On main at 5c1e8be or later (HQ docs only after it): full tests, type check, static export and the saved public-demo walk. If anything fails, stop and report. Do not publish.
2. Publish: `npm run deploy` (Convex), then `npm run deploy:web` (Cloudflare). Log both version IDs and the deployed commit.
3. Live checks: the six public paths return 200; `/demo-confirm/` loads; the landing hero still ends on "It's in".
4. Do not run the demo with any email yourself. Ganesh runs the first live demo with his own Gmail and reports: confirmation mail arrived, link started the demo, demo mails and replies arrived with "Demo:" subjects and the notice line. Log his result when he gives it.
5. If the public demo breaks, tell Ganesh at once. Rollback is republishing 2156ce9, only on his say-so.
6. No calling settings, CALL_MODE, allow-lists, keys or env values. No real calls or real-company mail. Mark nothing DONE.

## Short paste block

```
git pull. Ganesh authorises publishing main (5c1e8be or later): do docs/hq/codex-prompts/2026-10-15-publish-before-live-call.md. Tests, type check, export and demo walk must pass, then npm run deploy and npm run deploy:web, then the live checks. Stop if anything fails. Do not run the email demo yourself; I will. No calling settings, keys or env changes. Mark nothing DONE.
```
