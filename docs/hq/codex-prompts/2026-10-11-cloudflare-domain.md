# Codex prompt: put Refund Genie on refundgenie.app (Cloudflare)

Ganesh bought refundgenie.app on Cloudflare (11 Oct). Updated by HQ on 12 Oct: Ganesh chose to do this FIRST, before the privacy follow-ups and the sample-case job. Due Thu 15 Oct at the latest. It touches deploy, not features. Paste everything below the line.

---

git pull, then the AGENTS.md start-of-session order. Goal: https://refundgenie.app serves the same site that is live on the Convex site today, with the Convex backend unchanged.

Two rules for this job:
- Deploy only what this prompt asks for: the static site to Cloudflare, and the small Convex change in section 2. Do not deploy anything else, and do not run `npm run deploy` for unreviewed feature work. Commit and push, then wait for HQ review.
- Live calling and Vobiz are not part of this job. Leave CALL_MODE and CALL_ALLOWLIST alone.

## 0. Set up Cloudflare tools (once)

Follow Cloudflare's agent setup for Codex (https://developers.cloudflare.com/agent-setup/prompt.md): `codex mcp add cloudflare --url https://mcp.cloudflare.com/mcp`, then `codex mcp login cloudflare` (Ganesh approves the browser login). Use `npx wrangler` for deploys (`npx wrangler login` once, Ganesh approves). Do not install anything globally beyond what that page says. Never write any Cloudflare token into the repo.

## 1. Host the static site on Cloudflare

- The Next.js static export (`out/`) deploys as a Cloudflare Worker with static assets (wrangler.jsonc in the repo, assets directory `out`, `not_found_handling` set so `/terms/`, `/refund-policy/`, `/contact/`, `/privacy/`, `/c/...` and `/start/` all serve their own pages, as they do on Convex now). Check Cloudflare's current docs for the exact config.
- Attach the custom domains `refundgenie.app` and `www.refundgenie.app` (www redirects to the bare domain). HTTPS is automatic.
- The browser keeps talking to Convex at the existing `NEXT_PUBLIC_CONVEX_URL`. No backend moves.
- Add `npm run deploy:web` (build, then wrangler deploy). Keep `npm run deploy` for Convex.

## 2. Links that must use the new domain

- Add Convex env `PUBLIC_APP_URL` (Ganesh sets it to `https://refundgenie.app`). Every link a user receives (case links in mails, "Email me this case link", calendar items, demo links, chase updates) uses `PUBLIC_APP_URL`, falling back to `CONVEX_SITE_URL` if unset.
- Keep `CONVEX_SITE_URL` for server routes only: the Google OAuth callback, Razorpay and any webhook. Do not move those.
- Old Convex site links keep working (people already have them). The Convex site may show a small line "We've moved to refundgenie.app" with a link; do not break case pages there.
- Canonical URL and Open Graph tags point to refundgenie.app.

## 2b. Browser storage does not carry over (HQ note, 12 Oct)

Saved cases and the device ID live in the browser's storage, and browser storage is per address. Someone who used the Convex site will open refundgenie.app and see an empty list, and a new device ID. Do not try to copy storage across addresses. Instead:
- Find out exactly what is stored in the browser today (saved case list, device ID, anything else) and whether a case link alone is enough to reopen a case on the new domain. Write the answer in today's log in two lines.
- If a case link reopens the case anywhere, keep that working on both addresses.
- On the new domain, where saved cases are listed, add one plain line: "Cases you saved on the old address stay there. Open them from your case link, or from the old address." On the old Convex site, the "We've moved" line should say the same in the same words.
- Check that nothing in the app treats a new device ID as a new person in a way that breaks a case (limits, free check count, demo state). If something does, stop and tell Ganesh. Do not decide it yourself.

## 3. For Ganesh (list these, do not do them)

- Razorpay dashboard: change the website URL to https://refundgenie.app (Terms, Refund policy, Contact pages live there).
- Google Cloud OAuth consent screen: add refundgenie.app as an authorised domain, homepage, privacy and terms URLs.
- Later, optional: email on the domain (Cloudflare Email Routing to forward hello@refundgenie.app to his Gmail).

## Proof (in today's log)

- `curl -I` of https://refundgenie.app, /terms/, /refund-policy/, /contact/, /privacy/, /start/ all return 200 with their own titles; www redirects.
- A live synthetic flight case started on refundgenie.app works end to end (create, answer, case card); its "Email me this case link" uses refundgenie.app.
- An old Convex-site case link still opens.
- grep shows no hard-coded convex.site in user-facing copy.

Mark nothing DONE. Update STATE.md, append the log, commit and push.

## Short paste block for Codex

```
git pull. Read docs/hq/codex-prompts/2026-10-11-cloudflare-domain.md (updated 12 Oct) and do it, in order, now. It comes before the privacy follow-ups and the sample-case job. Deploy only what that file asks for. Mark nothing DONE. Update STATE.md, append the log, commit and push, then wait for HQ review.
```
