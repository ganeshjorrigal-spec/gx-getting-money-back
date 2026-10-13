# Codex prompt: publish current main tonight (authorised by Ganesh)

Written by HQ, Wed 14 Oct 2026, 00:15 IST. Replaces `2026-10-13-demo-release-tonight.md`: the demo-only branch hit conflicts in the demo screen; Ganesh chose to publish the reviewed, tested `main` instead.

1. Abandon `release/2026-10-13-demo` (abort any cherry-pick in progress; leave the branch unmerged, do not delete pushed history).
2. On `main` at `f6146af` or later (HQ docs only after `ec86aa2`): run the full test suite, type check, static build and the saved public-demo regression walk. All must pass. If anything fails, stop and report; do not publish.
3. Publish: `npm run deploy` (Convex) then `npm run deploy:web` (Cloudflare).
4. Live proof on refundgenie.app in a fresh browser profile, screenshots in `docs/qa/publish-2026-10-14/`:
   - the landing demo button and `/start/?demo=flight` play every round to "Money landed"; the escalation step shows "You send this one from your Gmail";
   - `/`, `/terms/`, `/refund-policy/`, `/contact/`, `/privacy/`, `/start/` return 200;
   - the old Convex address still shows the "We've moved" line and an old case link still opens;
   - one quick Lighthouse mobile run on the live landing page.
5. Log the deployed commit hash. No calling settings, allow-lists or keys. Mark nothing DONE.
6. Then do the landing polish in `docs/hq/review-2026-10-13-demo-speed-finals.md` on `main`, without publishing, and wait for HQ review.

## Short paste block

```
git pull. Ganesh authorises publishing current main tonight: abandon the demo release branch, then do docs/hq/codex-prompts/2026-10-14-publish-main.md (tests and demo walk must pass, then npm run deploy and npm run deploy:web, then live proof). Stop if anything fails. Then the landing polish on main, without publishing.
```
