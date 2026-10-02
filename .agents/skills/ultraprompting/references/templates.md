# Move-by-Move Language Templates

These are starting fragments for each of the seven moves, not a finished ultraprompt. Adapt the bracketed parts, drop what doesn't apply, and weave the rest into one coherent prompt. Never hand these over as a numbered checklist -- the person on the receiving end should see one job, not seven instructions stapled together.

## Move 1: Whole job, not next step

> Check whether this request only names one visible piece of a larger outcome. If it does, name the complete outcome that piece is meant to serve, and take on the whole thing rather than just the piece asked for -- unless doing so would require money, private data, extra permissions, or an action that can't be undone. If you expand the scope this way, say so before starting.

## Move 2: Destination, not route

> Destination: [the outcome wanted]
> Context: [background needed to get there]
> Boundaries: [what must never happen -- cost caps, off-limits systems, tone or brand limits]
> Exit criteria: [the observable signal that means "done"]
>
> Choose your own plan, tools, and order of operations, and change the plan mid-stream if the evidence calls for it. Only pause to check in if you need a permission you don't have, or you hit an ambiguity that's genuinely unsafe to guess on.

## Move 3: External scoreboard

> Check the result against: [test suite / reference artifact / rubric / real-world outcome].
>
> Polish is not evidence. Before calling anything finished, show what the check actually found, name whatever's still uncertain, and separate what's been verified from what's only been judged.

## Move 4: Check changes the next action

> After every attempt, run the check above. If the result falls short, find the single biggest gap, work out why it's there, fix that specifically, and rerun the full check. Keep whatever is already working. If two rounds in a row produce no real progress, change approach instead of repeating it. Stop once the exit criteria are met or the budget below is used up.

## Move 5: Independent builder and critic

> Split the builder and critic roles. The builder produces the work but doesn't get the final say. Give the critic the artifact, the success criteria, and any reference material -- not the builder's reasoning -- in a clean context. The critic should raise only gaps that actually matter, back each one with evidence, and is free to pass the work outright.

## Move 6: Durable learning memory

> Keep a running notebook across rounds:
> - Current best result
> - What's confirmed, with evidence
> - What's failed, and why
> - Open hypotheses and confidence in each
> - The next test worth running
>
> Read it before each round, update it after. Trim what's no longer useful instead of letting it grow without bound.

## Move 7: Cheap exploration before expensive commitment

> Propose a few approaches that differ in their core assumption, not just their wording. For each, name what would have to be true for it to work, then find the cheapest test that could prove it wrong. Run the cheapest, most informative tests first, drop what fails, and commit real budget only to whatever survives.

## Assembling these into one ultraprompt

A finished ultraprompt typically reads as: destination + context + boundaries + exit criteria + freedom over the route, then the evaluation method, the revise-and-retest loop, the critic setup, the memory instruction, and the budget/escalation limits -- as one continuous brief, in whatever order flows naturally for the specific job. Not every move needs a template line; small jobs may only need Moves 1-3.
