# Red-team prompt for ChatGPT Pro

How to use: in ChatGPT, attach the single bundle file `tickback-prd-bundle.md` (Claude HQ sends it; it contains every file listed below), or attach the files one by one, or connect the GitHub repo `ganeshjorrigal-spec/gx-getting-money-back` if your ChatGPT has the GitHub connector. Choose the strongest reasoning model, then paste everything between the lines. Bring the report back to Claude HQ; HQ decides what to change. ChatGPT's report is input, not a decision.

Files to attach: `docs/prd/README.md`, `docs/prd/01-product.md` to `docs/prd/07-build-plan.md`, `DECISIONS.md`, `IDEA_SCOPE.md`, `docs/archive/2026-10-04_research-event-refund-routes.md`, `docs/archive/2026-10-04_research-tech-facts.md`.

---

You are the independent critic for a product spec. You did not write it, and your job is to find what will make it fail, not to improve its prose.

**The product:** Tickback, a mobile web agent for people in India whose event-ticket refund (concerts, comedy, cricket, festivals on BookMyShow, District or organiser sites) is stuck or unclear. The user pastes the organiser's message or a screenshot. The agent picks the refund route, computes the date the money should land (in code, not by the model), and drafts the next message, which opens in the user's own email for them to send. It keeps the case at a private link, adds check-ins to the user's calendar, and escalates on the due date: support, then the platform's grievance officer, then the National Consumer Helpline. Free to check; Rs 49 to stay on it for refunds of Rs 300 or more. Stack: Next.js, Convex, OpenAI API. Solo founder, two-week sprint: ready to sell on Friday 9 October 2026, final submission Saturday 17 October 2026. Today is Sunday 4 October 2026.

**The destination:** a red-team report that would let the founder fix or cut the riskiest parts of this spec tonight.

**How to judge (your scoreboard):**
1. **Will a real user get value?** Walk through the six user stories in `01-product.md` as a stressed buyer on a phone. Where does the flow break, confuse, or fail to beat "ask ChatGPT once"?
2. **Will a real organiser respond?** Is anything in the escalation ladder or the drafts likely to be ignored, or to backfire?
3. **Is it true?** Flag any claim the spec states as fact that the attached research marks REPORTED or NOT FOUND, and any rule cited outside its scope.
4. **Will it pay?** Is the paywall in the right place? Is Rs 49 with an outcome guarantee sound? What would make 2 of 10 people pay by day 5?
5. **Can one person build it by Friday?** Rank what to cut or defer.
6. **Will it survive contact with the real world?** Privacy of the private-link model, prompt injection through pasted messages, mailto and UPI behaviour on iPhone and Android, model mistakes on messy Indian messages (Hinglish, screenshots).

**Rules for you:**
- Use only the attached files plus general knowledge. Mark anything you assert about the world (laws, platform policies, prices) as VERIFIED with a source, or as UNVERIFIED.
- Before writing the final report, list the 10 most likely failure points. Then test each against the files and drop the ones the spec already handles. Report only what survives.
- Separate facts you read in the files from your judgement.
- Be concrete: file, section, the problem, the smallest fix.

**Output:**
1. **Verdict** in three sentences: ship as is, ship with fixes, or rethink, and why.
2. **Blockers** (would make it fail or harm users): file and section, problem, smallest fix.
3. **Major issues:** same format.
4. **Cut or defer for Friday,** ranked.
5. **Three questions the founder should answer before building,** each with why it matters.
6. **What the spec gets right** (at most three lines, so the founder doesn't fix what isn't broken).

Keep it under 1,500 words.
