# Current state, 15 October 2026

## Call-tool fix Part1: local gates pass, publishing next
Main pulled to61b63e2. Vapi read-only check confirms saved tool types [endCall], endCallFunctionEnabled absent. Removed only duplicate endCall from our overrides; DTMF and one passenger-specific transferCall remain, every instruction and transfer plan unchanged. Immediate refusal saves duration0, patchInfalse, empty transcript; history says Call could not start with safe reason. Admin-only historical correction is guarded and schedules/sends nothing.
359tests/48files pass, type check clean, static export15pages passes. One initial existing screen-test timeout resolved on rerun without test change; stale generated route types refreshed by export and new test null check fixed. Evidence docs/qa/call-tool-fix-2026-10-15. No call or env/key/allow-list/calling-setting change. Ganesh authorises Convex then Cloudflare publish for this fix after gates; next action publish this committed fix, correct known failed record, verify live routes. Nothing DONE.

## Earlier call and separate work
Earlier one live attempt on RG-06B69F failed before connection: duplicate endCall. Call ID n177azp5xf5vnxc22nppt64knd8gac58, no external ID/transcript/recording/mail, saved cost0. Owner restored simulated mode and it was verified. No retry authorised for this Part1 task. D-051/D-052 remains separately pushed on d051-d052 at e092e5e for HQ review; untouched. Published source before this fix is1a181a956b7193bf644cd0971fe81ec3f88ef997. Prior unrelated evidence gaps remain logged.
