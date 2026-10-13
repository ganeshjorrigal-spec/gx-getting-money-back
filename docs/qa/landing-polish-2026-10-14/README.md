# Landing polish local proof, 14 October 2026

READY FOR REVIEW. Unpublished. Checked with the existing Chrome profile against the explicit static export at localhost:4320.

- `checks.json`: 375px and 1280px, empty and saved states. Exactly one saved section, below hero, hidden when empty; no horizontal overflow. Mascot element64px/120px. Final receipt contains reply and green stamp; mail label hidden.
- `mobile-empty.png`, `mobile-saved.png`, `desktop-empty.png`, `desktop-saved.png`: full-page views.
- `mobile-final.png`, `desktop-final.png`: final receipt close views. Art clears heading and rows; reply and stamp stay inside card.
- `demo-walk.json`, `demo-landed.png`: all12saved steps on actual landing/start/case components pass. Transport replaced by the existing local fixture, no real mail or call. This is not fresh live-transport evidence or a timed demo claim.
- Type check and explicit `node scripts/build-web.mjs` pass.321unit tests across43files pass, including two saved-link storage tests. `git diff --check` passes.

Repeat setup after a build: `node scripts/qa/landing-storage-fixture.mjs`, then `node --import tsx scripts/demo-flow-proof.mts`. Browser guard: `scripts/qa/landing-polish-check.mjs`. These proof files are local only; not included in the build/deploy scripts. Fixture adds/removes only its own synthetic RG-SEED01 entry, which was removed after proof. No existing saved case was removed.

The earlier unaccepted Lighthouse output was discarded; no new performance claim. Published44c942b remains the live version. No deployment command run for this polish. Reduced-motion handling is present in code; OS reduced-motion setting was not changed for these browser checks.
