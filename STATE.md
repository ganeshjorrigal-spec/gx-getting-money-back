# Current state, 15 October 2026

## d051-d052 HQ fixes READY FOR REVIEW, unpublished
Branch d051-d052 only, source fix eed3336. Added outlined44px Fill sample buttons on each sample field's label row, right-aligned with field-specific accessible names. Date, amount, PNR, booking and flight fill correctly; personal fields remain typed. Existing older demos and non-demo labels preserved.18screens at checked375/1280CSS viewports, including actual facts/date and amount steps. Keyboard Shift+Tab/Enter verified; aligned rows, no overflow, detector[]. Proof docs/qa/d051-d052-fixes-2026-10-15.

## Fair speed and regression gates pass
Three main and three branch Lighthouse13.5mobile runs alternated serially with identical settings and no concurrent builds/tests/benchmarks. Main scores99/99/99, branch99/99/98: both medians99, difference0within allowed3points. TBT medians0/0ms, benchmark medians2622/2521. All six raw reports retained. Earlier speed gate is superseded by this passing comparison, not erased.
368tests/51files pass in4.20s; type check clean, final static export16pages passes. Saved21-step local walk reaches Money landed in11.778s; transport replaced, no actual Gmail/phone proof. Comparison main copy moved outside test tree after initial combined727test discovery; clean branch-only run count above.

## Boundaries and next step
No publish, env, key, calling or allow-list changes; no actual mail/call. Main remains0f15c1f after initial requested HQ-doc pull; no source edits/commits/merge there. Main's call-tool fix/review is separate. Nothing DONE. Push branch proof then wait for HQ review; no merge/publication authorised. Live Gmail intake timing and prior unrelated proof gaps remain in historical logs.
