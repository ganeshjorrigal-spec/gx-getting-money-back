# Current state, 15 October 2026

## Authorised release stopped at failed test gate
Pulled main to 0c3636fd76d9a78b31bb589bd9842bc8b2a65065 (HQ docs only after 5c1e8be). Full tests: 349 passed, 1 failed, 47 files. lib/chase-send-action.test.ts:10, actual send action handles Customer support email before mocked Gmail dispatch, timed out at 5000ms. Type check passed. No rerun or code change; Ganesh explicitly said stop if anything fails.
Static export had started during result collection; interrupted after compilation, not completed or claimed passed. Saved local public-demo walk not run. Neither npm run deploy nor npm run deploy:web run; live checks not run. No real email demo, calling settings, keys or environment change. No deployed version change. Next: HQ review of the failed gate before a new release attempt. Nothing DONE.

## D-050 Parts 1 and 2, accepted by HQ, unpublished
Part 1 commit 8cf4c6d: call and transfer assistants select VAPI_MODEL_PROVIDER/VAPI_MODEL, defaulting to openai/gpt-4.1-mini. Calls no longer use GEMINI_MODEL. Both instruction texts, first messages, tools, recording and time limits match the pre-change snapshot; simulated transport still makes zero requests. Calling guide and empty optional .env.example names updated.
Part 2: confirmation-mail reservation enforces 3 per folded address per IST calendar day and 100 overall per IST calendar day. Gmail/Googlemail dots and plus aliases fold through one helper used by reserve and consume. Exact requested error messages; atomic counters/records. Existing 3/device/day and 1 confirmed demo/address/day remain.
350 tests / 47 files pass; npx tsc --noEmit and explicit static export pass. Proof: docs/qa/d050-2026-10-14, including built default simulated override with zero requests and no phone numbers. No live-call or inbox-arrival proof claimed. Nothing DONE. HQ accepted these parts in the follow-up review; publication remains pending the failed release gate.

## D-048 and live baseline
HQ accepted D-048 code, with confirmation-limit fix now ready for review. Ganesh's real Gmail-arrival check follows authorised publication; D-048 local 17-step browser proof uses mocked transport, not actual Gmail.
Published source remains 2156ce9, Cloudflare worker e88ac8bd-3bf2-467c-ac8b-4440be7c4be3. Previous flight 14/14 and event 16/16 paid evals on f47b849; no new paid eval run or claim.

## Boundaries and open items
No publication or deployment command, environment inspection/change, calling settings, allow-list or key change, actual call or mail. Static build loads the existing configuration normally; no values printed or logged. D-049 supervised live call not started. Goibibo own-page contact/path, post-trial payment and video/calendar evidence gaps remain as previously logged. Wait for HQ review and Ganesh's further instruction.
