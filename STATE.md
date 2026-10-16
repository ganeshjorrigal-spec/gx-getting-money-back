# Current state, 16 October 2026

## Urgent fixes published, call blocked before request
Published source 67c1eb2: test timeout 20000ms (78e9876), caller role and status question (7177754), demo-only daily 09:00 to 21:00 IST hours (67c1eb2). Existing real hours, safety and two-call cap unchanged. Full suite once: 375/375 across 52 files; type check and 16-page static export pass. npm run deploy and npm run deploy:web succeeded. Convex static 254cafe7-f479-432a-8a1f-e7ac5e802566; Cloudflare ec289016-5eaf-4c9a-aa38-ba8187dfd867. Reviewed D-051/D-052 merge now published. Six public routes return 200. Proof docs/qa/urgent-call-fix-2026-10-16. No actual email demo run. Nothing DONE.

## Supervised case waits: stop on failed budget precheck
RG-A64786 still zero calls and zero mails. At 17:46:28 IST daily reservation budget cannot cover another maximum reservation; owner-set live mode confirmed on recheck at 17:54:14 IST, with budget still insufficient and zero calls/mails. No call request made. Asked Ganesh restore simulated; awaiting owner reset confirmation. No env/key/allow-list/calling-setting changes by Codex. No further action until owner/HQ resolves this stop; no automatic retry or cap bypass.

## Remaining proof and scope
Earlier RG-06B69F calls: busy, then completed opening but voice role drift and no passenger transfer. Full live status/reference/transfer/privacy scenario remains unproven despite the now-published caller-role fix. Daily reservation-release fix and transcriber are outside tonight's urgent code scope. Earlier unrelated proof gaps/free-plan warning remain logged. Next: confirm owner reset and HQ review. Mark nothing DONE.
