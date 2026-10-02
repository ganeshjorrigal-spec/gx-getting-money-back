# Ultraprompting Examples

## Example 1: Software migration -- Success

**User:** "Rewrite this Electron app in Swift. Make it behave exactly like the original."

**Skill decision:** Strong ultraprompt opportunity.

**Why:** Large outcome, executable environment, reference implementation exists for comparison, visual/functional tests are possible, and the work benefits from iterative convergence.

**Generated structure:**
- Goal: Swift version reaches functional and visual parity with the Electron original.
- Workflow: inspect existing app -> decompose into modules -> implement -> verify per module -> integration test.
- Scoreboard: automated test suite plus screenshot comparison against the original.
- Critic: independent visual/functional reviewer that receives artifacts without builder rationale.
- Loop: each cycle targets the largest verified parity gap.
- Memory: migration findings log, tracking confirmed parity, outstanding gaps, and failed approaches.
- Boundary: no destructive changes outside the project directory.
- Exit: all parity criteria satisfied, or agreed iteration budget exhausted.

**Expected result:** Autonomous work continues without requiring the user to specify every implementation step. The user reviews at meaningful checkpoints, not after every line of code.

---

## Example 2: Customer research -- Success

**User:** "Read the 60 call transcripts in this folder and tell me what customers want."

**Skill decision:** Expand the intermediate ask ("tell me") into a finished findings report. The user's real outcome is actionable insight, not a raw summary.

**Generated workflow:**
1. Fan out transcript analysis across the corpus.
2. Extract strongest complaints and requests with verbatim evidence.
3. Cluster findings into themes.
4. Quantify prevalence across transcripts.
5. Independently challenge the clusters (critic reviews theme logic and evidence).
6. Produce ranked recommendations with source traceability.

**Scoreboard:** Every theme must trace to specific transcript quotes. Theme consistency checked by independent review. Counts verified against the corpus.

**Failure prevented:** A simple summary would leave the human to perform clustering, prioritization, and synthesis manually, which is the actual hard work.

---

## Example 3: "Make my website amazing" -- Failure (downgrade to normal prompt)

**Skill decision:** Do not create a blind autonomous loop.

**Why:** "Amazing" is not an observable destination. No external scoreboard can be defined because the success criteria are undefined. An autonomous loop would produce endless subjective polishing with no convergence signal.

**Correct response:** Identify the missing outcome. Propose measurable criteria: task completion rate, accessibility score, Lighthouse performance, conversion against a baseline, or structured comparison against selected reference sites. Once criteria exist, revisit whether an ultraprompt is appropriate.

**Failure prevented:** Endless subjective polishing where the agent keeps changing things without a way to know whether it is improving.

---

## Example 4: Production database migration -- Blocked

**User:** "Autonomously migrate the production database and keep fixing things until it works."

**Skill decision:** Do not authorize unrestricted autonomy. STATUS: BLOCKED.

**Reason:** Irreversible, high-impact external action. Ambiguous rollback conditions. Unclear success criteria. "Keep fixing" is an unlimited authorization for consequential changes.

**Safe redesign:**
- Build and test the migration in a disposable environment.
- Generate and validate a rollback procedure.
- Run representative validation against test data.
- Define an explicit production-change checklist with success criteria.
- Stop before production execution.
- Require human confirmation for the consequential action.

**Failure prevented:** An agent interpreting persistence ("keep fixing") as permission to make uncontrolled production changes with real data.
