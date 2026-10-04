# Research: build tech facts (raw, 4 Oct 2026)

Source: research run by a Claude HQ sub-agent on 4 Oct 2026 against vendor docs. Raw material, write once. Read exact numbers on the vendor pages again before they go into code; the fetch tool returns page summaries.

Labels: VERIFIED = vendor docs read on the day. REPORTED = third party or not confirmed on an official page. UNSURE = sources disagree or nothing found.

## Convex

- Agent component `@convex-dev/agent`: official (get-convex on GitHub and npm). Threads, message history added to calls, tool calls, streaming, files, durable workflows, RAG via a separate component, usage tracking per provider/model/user/agent, rate limiting. VERIFIED: https://docs.convex.dev/agents . No beta label seen; maturity UNSURE.
- Works with OpenAI through the Vercel AI SDK. The default example uses the Convex AI Gateway, which is for paid teams only. On the Free plan use `@ai-sdk/openai` with our own `OPENAI_API_KEY` as a Convex env var. VERIFIED: https://docs.convex.dev/agents/getting-started
- Scheduler (VERIFIED: https://docs.convex.dev/scheduling/scheduled-functions):
  - `ctx.scheduler.runAfter(ms, fn, args)` and `ctx.scheduler.runAt(timestamp, fn, args)`; jobs stored in the database, can be months ahead.
  - Scheduling from a mutation is atomic. From an action it is not.
  - Scheduled mutations run exactly once. Scheduled actions run at most once and are never retried.
  - `cancel` stops a job not yet started. Status kept 7 days in `_scheduled_functions`.
  - Limits: 1,000 jobs per mutation, 1,000,000 outstanding, 4 MiB args per job.
- File uploads (VERIFIED: https://docs.convex.dev/file-storage/upload-files): mutation returns `ctx.storage.generateUploadUrl()`; client POSTs the file; second mutation saves the `storageId` (`v.id("_storage")`). Upload URL expires in 1 hour. No size limit through the URL, 2 minute POST timeout. HTTP-action uploads limited to 20 MB.
- Actions: 10 minute timeout (Node runtime). Actions write to the database only through `ctx.runMutation`. Pattern: mutation saves request and schedules action; action calls a mutation after each step; subscribed clients see each update. Node action args max 5 MiB; document max 1 MiB. VERIFIED.
- Free plan (VERIFIED on the limits page: https://docs.convex.dev/production/state/limits): 1M function calls/month, 0.5 GB database, 1 GB/month database I/O, 1 GB file storage, 1 GB/month file bandwidth, 20 GB-hours action compute. Pricing page summary showed larger numbers; UNSURE, check by eye. Professional: $25 per developer per month.
- Convex Auth: Google OAuth and email codes/magic links supported; "in beta". Email codes need our own sender (Resend example). VERIFIED: https://labs.convex.dev/auth

## OpenAI API

- Models page leads with the GPT-6 family. Small, fast, image input and structured outputs:
  - `gpt-6-luna`: image in yes, structured outputs yes, 1.05M context, reasoning effort none to max (default medium). Price UNSURE: model page $0.10 / $0.01 cached / $0.50 per 1M tokens; pricing page "standard, short context" $0.05 / $0.005 / $0.25. https://developers.openai.com/api/docs/models/gpt-6-luna
  - `gpt-5.4-mini` (snapshot `gpt-5.4-mini-2026-03-17`): image in yes, structured outputs yes, $0.75 / $0.075 / $4.50. VERIFIED on its model page; may be heading to legacy.
- Responses API is recommended for new projects; Chat Completions still supported. Structured outputs: Responses uses `text: { format: { type: "json_schema", ... } }`. VERIFIED: https://developers.openai.com/api/docs/guides/structured-outputs
- Data: API data not used for training by default. Abuse-monitoring logs up to 30 days. Responses stores responses at least 30 days by default (`store=true`); set `store: false`. Zero retention needs approval. VERIFIED: https://developers.openai.com/api/docs/guides/your-data

## Deep links and files

- Google Calendar template link (REPORTED, undocumented by Google): `https://calendar.google.com/calendar/render?action=TEMPLATE&text=...&dates=START/END&details=...&location=...&ctz=Asia/Kolkata`. Timed UTC: `20261010T043000Z/20261010T050000Z`. Local time: drop Z, add ctz. All-day: `20261010/20261011` (end exclusive). URL-encode every value.
- .ics (VERIFIED, RFC 5545): MIME `text/calendar`, `Content-Disposition: attachment; filename="x.ics"`. VCALENDAR needs VERSION:2.0 and PRODID. VEVENT needs UID and DTSTAMP, plus DTSTART, DTEND, SUMMARY. VALARM with ACTION:DISPLAY needs TRIGGER and DESCRIPTION. CRLF line ends, fold lines over 75 octets. iPhone opens Apple Calendar; Android Chrome often just downloads it (REPORTED), so give Android the Google Calendar link.
- Gmail compose URL (REPORTED): `https://mail.google.com/mail/?view=cm&to=...&su=...&body=...`. Does not open compose in Mobile Safari. Not dependable on mobile.
- mailto (VERIFIED, RFC 6068): line breaks `%0D%0A`; UTF-8 then percent-encode; the rupee sign becomes `%E2%82%B9`; use `encodeURIComponent`. No official length limit; about 2,000 characters for the whole URL is the cited practical ceiling (REPORTED). Test on real phones.
- UPI link (NPCI Linking Specs 1.6, 2017 copy): `upi://pay?pa=<VPA>&pn=<name>&am=<decimal>&tn=<note>&cu=INR`. `pa` and `pn` required. `tr` required for merchant payments. Android Chrome hands it to installed UPI apps via a chooser. iOS has no chooser; it opens one app or nothing (REPORTED). Some apps reportedly block person-to-person links with a preset amount (UNSURE).

## Transactional email

- Resend: before verifying a domain, can only send from resend.dev to our own account email; others get 403. VERIFIED. Free: 3,000/month, 100/day, 3 domains. Pro $20/month for 50,000. DNS verification time not stated; minutes to hours in practice, up to 48 hours (UNSURE).
- Postmark: free developer tier 100/month; Basic $15/month for 10,000. VERIFIED.

## Hosting

- Vercel Hobby: "restricted to non-commercial personal use only". Taking payments counts as commercial. VERIFIED: https://vercel.com/docs/limits/fair-use-guidelines
- Vercel Pro: $20 per developer seat per month. VERIFIED.
- Netlify Free: commercial use not stated (UNSURE). Cloudflare Workers Free: no stated commercial restriction (VERIFIED); Next.js there via OpenNext is REPORTED.

## Implications noted by the researcher

1. Vercel Pro from the day we charge users; Hobby breaks the terms once the product takes payments.
2. Convex Agent component or AI SDK with our own OpenAI key; pin versions.
3. Mutation saves request and schedules action; action writes progress through runMutation; client subscribes.
4. Actions are never retried automatically; wrap OpenAI calls in our own retry; schedule reminders from mutations.
5. Uploads via upload URLs; compress images on the phone first; watch the 1 GB storage and bandwidth.
6. Default model `gpt-6-luna` on the Responses API with JSON schema and low reasoning effort; confirm price; `gpt-5.4-mini` as fallback.
7. `store: false` on Responses calls.
8. Verify the email domain early; Resend sends only to our own address before that; 100/day free cap.
9. mailto with UTF-8 encoding, short body, copy-to-clipboard fallback; Gmail web compose fails on mobile.
10. Google Calendar link for Android, .ics for iPhone; UPI links Android-first with the VPA as a copy fallback.

## Extra check done in HQ (4 Oct 2026): fonts

Checked the Fontsource 5.3.0 packages with fontTools for the rupee sign (U+20B9) and tabular figures (`tnum`):

| Font | Has the rupee sign | Subset that has it | tnum |
|---|---|---|---|
| Newsreader | yes | latin-ext | yes |
| Source Serif 4 | yes | latin-ext | yes |
| Geist | yes | latin-ext | yes |
| Manrope | yes | latin-ext | yes |
| Bricolage Grotesque | yes | latin-ext | yes |
| Inter | yes | latin-ext | yes |
| IBM Plex Sans / Serif / Mono | yes | latin-ext | not in GSUB (Mono is fixed width anyway) |
| DM Sans | yes | latin-ext | no |
| Fraunces | yes | latin-ext | no |
| Instrument Serif | NO | none | no |
| Instrument Sans | NO | none | yes |

Implication: load the `latin-ext` subset or the rupee sign silently falls back to another font. Do not use Instrument Serif or Instrument Sans.
