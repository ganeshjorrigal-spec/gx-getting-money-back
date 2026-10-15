# Current state, 15 October 2026

## Call-tool fix Part1 READY FOR REVIEW, published
Deployed source17d70763667b833fe048f306073c9430fb4cd4a8. Saved Vapi assistant read-only tool list [endCall]; endCallFunctionEnabled absent. Removed our extra endCall, kept DTMF and one passenger-specific transferCall. Snapshot changed only the duplicate tool entry; instructions/model/transfer/privacy plan unchanged.
Refused calls now save zero duration, false patch-in and no fixture text; history says Call could not start with safe reason. Guarded admin correction updated the existing rejected call n177azp5xf5vnxc22nppt64knd8gac58 once: duration0/patchInfalse/empty transcript/no recording/no external ID/cost0. Exactly one call record remains, no confirming mail. No new call or mail by this task.
359tests/48files pass, type check clean, static export15pages passes. Convex static deployment0121f762-1b52-4244-a4c3-ca902c3daa51 then Cloudflare51cb6ac8-2f11-4df1-b273-e519cd7774df succeed. Seven public paths200/HTML on each origin,14/14. Existing live case shows safe failure reason without old65seconds/patch-in claim. Evidence docs/qa/call-tool-fix-2026-10-15. No env/key/allow-list/calling-setting change. Nothing DONE; wait for HQ review.

## Not started / separate work
Part2 supervised retry not run. It requires separate owner go, owner live-mode changes and the prompt's16Oct10:00–18:00IST window. Today's earlier one attempt failed before connection; this fix has not yet been proven by another call. d051-d052 remains separately pushed at e092e5e for HQ review and is untouched. Existing unrelated evidence gaps remain in the log. Convex deploy emitted existing free-plan-limit warning; no account/plan change made.
