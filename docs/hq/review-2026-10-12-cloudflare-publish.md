# HQ review: Cloudflare first publish a9c2afd

Reviewed Mon 12 Oct 2026 by Claude HQ. Against: `docs/hq/codex-prompts/2026-10-11-cloudflare-domain.md` (updated 12 Oct).

## Verdict

**Accepted.** The code does what the prompt asked and nothing more. Two items for Codex below. Neither blocks Ganesh's Razorpay and Google updates.

## What I ran myself

| Check | Result |
|---|---|
| `npx vitest run` | 201 passed, 22 files |
| `npx tsc --noEmit` | clean |
| Live site (`curl` of refundgenie.app) | could not verify: the HQ sandbox cannot reach the new domain. The proof below is Codex-reported (`docs/qa/cloudflare-http-2026-10-12.json`). Ganesh should open the five pages once in a browser. |

## Prompt, point by point

1. **Static site on Cloudflare.** Pass. Worker with static assets, `refundgenie.app` and `www` as custom domains, www redirects with a 308 and keeps the path and query. `npm run deploy:web` added. `npm run deploy` is unchanged. No publish on git push.
2. **Links use the new domain.** Pass. One helper (`lib/app-url.ts`) prefers `PUBLIC_APP_URL` and falls back to `CONVEX_SITE_URL`. Every user-facing link goes through it. Codex reports no `convex.site` left in app, lib or convex source outside the server callback and the old-site notice.
3. **Google callback stays on Convex.** Pass. Only the return link after sign-in changed.
4. **Section 2b storage note.** Pass. Codex stopped and asked, found what is stored (`tickback.cases`, `tickback.deviceId`, temporary Google sign-in keys), and showed the exact sentence on both addresses. Nothing was copied across addresses.
5. **Scope rules.** Pass. No unrelated deploy, no calling settings touched, no keys recorded. Old site got the notice through a scoped static upload, not `npm run deploy`.

## Notes for Codex

1. **"Overdue by about 0 working days" on a case due 21 Oct.** Codex saw this on the new sample case and flagged it, correctly. Overdue cases lead the pitch (D-030) and the launch video will show a sample case, so this must be right before recording. Fix it in the sample-case job.
2. **The Worker runs on every request** (`run_worker_first: true`). Fine at today's traffic. If traffic grows, run the Worker only for `www` and `/c/` paths so static pages do not count as Worker requests. Low priority, no action now.

## Small note on the sign-in return link

After Google sign-in, the return link now carries the private case key in the part after the `#`. Browsers do not send that part to a server, and it goes only to the user's own browser, so I accept it. It does mean the Convex server builds a link containing the key, as it already does for the case-link mail.

## For Ganesh, still open

- Razorpay: website URL to https://refundgenie.app.
- Google consent screen: add refundgenie.app as an authorised domain, update homepage, privacy and terms URLs. Keep the Convex callback.
- Open refundgenie.app, /terms/, /refund-policy/, /contact/, /privacy/, /start/ once in a browser.
- Optional later: hello@refundgenie.app routing to Gmail.

## Next

Sample-case job (with note 1), then the privacy follow-ups from `docs/hq/review-2026-10-12-privacy-fix.md`, then restyle, then Friday paid evals. Any further Cloudflare publish waits for Ganesh's say-so in chat.
