# Decorrelation Subset — the Chat rival-check

**This is the Chat mirror's decorrelation floor.** It does the job the Code version's
**decorrelation engine** (`decorrelate.py` over `Paradigm_Tensions.csv`) does at runtime — name the
operative worldview's **rival worldviews**, so the answer can be pressure-tested against a genuinely
different paradigm instead of staying confidently one-eyed. Chat can't run the live fetch, so the
rivals are **precomputed and baked in here** — generated *by* the Code engine, so the two stay
consistent.

Read this when producing **Artifact 2, Layer 3** (the rival-check) — it consumes the
`[Rival-check pending — decorrelation engine.]` hook the signature's Layer 3 prints.

> **Altitude seam (unchanged from Code):** the signature *names* the operative paradigm + its core
> assumption (Layer 3). This subset *fetches that paradigm's rivals*. It is **not** the first-class
> paradigm *lens* (running a whole turn through a rival worldview — a Code-only S7 ceiling). This is
> the floor: name the rivals so the answer can be checked against them.

---

## How to use it (3 steps)

1. **Name the operative worldview** (signature Layer 3 already did this — semantic judgment, not string
   match). The everyday label the user reveals (e.g. "Lean Startup", "just optimize for ROI") rarely
   matches a corpus paradigm verbatim — resolve it to the nearest entry below by *meaning*. The
   **"Reveals in framing like"** lines and the **alias table** are your resolver.
2. **Look it up below.** Each entry gives the operative paradigm and its **2–3 sharpest rivals**, each
   with the **fault line** and **what the rival sees that your worldview misses** (already oriented to
   the blind-spot side — never the flattering mirror).
3. **Pressure-test Artifact 4 against the rival** (the anti-theater rule, carried from the engine):
   *the rival must change the answer, or it's decoration.* State the link explicitly — "your framing
   treats X as the test; the [rival] asks Y — does your answer survive that?" A rival that doesn't
   pressure the answer is dropped.

**Lean by default.** Surface the 1–2 sharpest rivals, not all of them. The "N rivals in corpus" count
tells you how rivalry-rich the worldview is; offer "the full rival table" only on request. Counts are
ceilings, not quotas — one sharp rival beats three limp ones.

**No viability gate here.** Like the bias/fallacy detector, this is a *naming/recognition* operation,
not answer-retrieval, so it isn't governed by the model viability gate (the paradigm corpus has no
confidence column anyway). Same exemption logic as `cognitive-signature.md`.

---

## When the worldview isn't in this subset (the honest floor)

This subset curates the **~23 worldviews most likely to surface** in a general "stuck problem" query —
it is deliberately not the whole 389-paradigm corpus. When the operative worldview isn't here:

- **Name the rival by reasoning, and say so.** You know these intellectual traditions; name the 1–2
  worldviews that most sharply see what the user's framing misses, and **flag that it's a reasoned
  rival, not a corpus-fetched one** — e.g. *"(named by reasoning — not in the baked subset)"*. This is
  the labeled-substitution discipline the engine uses for its cluster fallback: honest about the seam.
- **Don't fabricate a `#record`.** A reasoned rival has no tension-ID; don't invent one. The baked
  entries below cite real corpus rivals; reasoned ones are clearly marked as such.
- **Common everyday labels with no clean corpus paradigm** (handle by reasoning): *Stoicism* (rival:
  Existentialism — you don't just manage your response, you author meaning), *Techno-Solutionism /
  "tech will fix it"* (rivals: Surveillance Capitalism — who profits from the fix; Complex Adaptive
  Systems — the fix has emergent second-order costs; Care Ethics — the fix ignores the particular
  person), *Scientism / "just measure it"* (rival: Phenomenology — the measurable isn't the whole of
  what's real). Name them honestly; the floor is *naming the absence*, never faking a citation.

## Everyday-label → corpus-paradigm resolver (the Hop-1 bridge)

The signature does this by judgment; this table speeds the common cases:

| The user's everyday framing | Resolve to (entry below) |
|---|---|
| "Lean Startup", "build-measure-learn", "MVP", "ship and iterate", "fail fast" | **Experimentalist / Pragmatist** |
| "optimize", "maximize ROI", "follow the incentives", "rational actor", "efficient market" | **Rational-Optimizer** |
| "nudge", "debias", "people are irrational", "behavioral" | **Bounded-Rationality / Nudge** |
| "systems thinking", "it's all connected", "emergence", "you can't control it" | **Complex-Adaptive-Systems** |
| "it goes viral", "network effects", "hubs", "tipping point" | **Network / Contagion** |
| "greatest good", "the ends justify", "cost-benefit the outcome" | **Consequentialist** |
| "it's a matter of principle", "some lines you don't cross" | **Principled / Duty** |
| "do the most measurable good", "evidence-based giving", "EA" | **Evidence-Maximizing Good** |
| "find meaning", "be authentic", "my choice defines me" | **Existentialist** |
| "follow the power", "who really owns this", "class interest" | **Material-Power / Class** |
| "the system is structured to…", structural/institutional critique | **Structural-Power** |
| "what's their move", "rational players", game-theoretic | **Strategic-Rational** |
| "align it", "control the downside", "x-risk", safety-first | **Alignment / Control-the-risk** |

> **Note on the source data (defect found and RESOLVED — swap-fix session, 2026-06-27):** a set of rows
> in the upstream `Paradigm_Tensions.csv` had their two "what each side sees" fields internally swapped
> relative to the A/B assignment. The full scope was mapped (27 rows: 25 scanner-confirmed + #45
> Adaptive↔Efficient-Markets and #188 Complex-Adaptive↔System-Dynamics, recovered by blind read) and
> **repaired in a derived copy** — `Paradigm_Tensions_FIXED.csv`, produced by the reproducible
> transform `scripts/fix_tension_swaps.py`; the upstream CSV stays pristine. The **Code engine now
> reads the fixed copy**, and this subset was **re-baked against it**: one baked rival (CAS → System
> Dynamics, the lone single-row pair that the original curation could not dodge because #188 was still
> in the ambiguous bucket at bake time) was corrected from the flattering-mirror text to the true rival
> view. Every baked rival below has been re-verified to describe the *rival*, not the user's own
> worldview. See `KNOWN-ISSUES.md` #1 for the full record.

---

<!-- The entries below are machine-baked from the Code engine (decorrelate.py), curated for the
     sharpest, most cross-worldview rivals. 23 worldviews, 64 verified-oriented rivals. -->

## Decision / economic

### Rational-Optimizer
*Operative paradigm:* **Neoclassical Economics** (#1) · 28 rivals in corpus, sharpest below.  
*Reveals in framing like:* "optimize", "maximize ROI", "incentives", "efficient", "rational actor"

- **Behavioral Economics (Kahneman/Tversky)** — *fault line:* Neoclassicals assume rational optimization under constraints; behavioral economists document systematic, predictable deviations from rationality that…  
  *Sees what you miss:* Behavioral economics identifies the specific cognitive biases — loss aversion, framing effects, hyperbolic discounting — that make real markets deviate from efficient out…
- **Ecological Economics (Daly/Costanza)** — *fault line:* Neoclassicals treat the environment as a set of externalities to be priced; ecological economists insist the economy is a subsystem of the biosphere w…  
  *Sees what you miss:* Ecological economics sees absolute biophysical limits, entropy, and the impossibility of infinite growth on a finite planet — constraints that relative pricing cannot add…
- **Marxian Economics** — *fault line:* A foundational split between seeing the economy as a system of voluntary exchange among equals (neoclassical) vs. a system of exploitation structured…  
  *Sees what you miss:* Marxian economics sees how class structure, ownership of productive assets, and labor exploitation shape outcomes that neoclassical models treat as free individual choice…

### Interventionist
*Operative paradigm:* **Keynesian Economics** (#12) · 22 rivals in corpus, sharpest below.  
*Reveals in framing like:* "intervene", "stimulate demand", "manage the cycle"

- **Austrian Economics** — *fault line:* The most ideologically charged tension in economics: whether economic downturns are caused by government-induced malinvestment (Austrian) or insuffici…  
  *Sees what you miss:* Austrian economics identifies how artificially low interest rates distort the capital structure, creating unsustainable booms that must end in busts that stimulus only po…
- **Minsky Financial Instability Hypothesis** — *fault line:* Keynes focused on demand deficiency and the multiplier; Minsky extended this to show how financial structures endogenously evolve from hedge to specul…  
  *Sees what you miss:* Minsky sees how the financial system endogenously generates fragility during good times through leverage accumulation, creating the crisis that Keynesian tools then must…

### Bounded-Rationality / Nudge
*Operative paradigm:* **Behavioral Economics (Kahneman/Tversky)** (#23) · 9 rivals in corpus, sharpest below.  
*Reveals in framing like:* "debias", "nudge", "people are irrational"

- **Neoclassical Economics** — *fault line:* Neoclassicals assume rational optimization under constraints; behavioral economists document systematic, predictable deviations from rationality that…  
  *Sees what you miss:* Neoclassical economics explains when and why markets discipline irrational behavior through competition, arbitrage, and learning — the self-correcting mechanisms that beh…
- **Austrian Economics** — *fault line:* Austrians insist on purposeful human action as the irreducible unit of analysis; behavioral economists document systematic irrationality. They disagre…  
  *Sees what you miss:* Austrian economics sees the purposeful, creative dimension of human action — entrepreneurial discovery, subjective valuation — that behavioral experiments in controlled s…
- **Frankfurt School Critical Theory (Adorno/Horkheimer/Habermas)** — *fault line:* Critical theory explains systematic irrationality as produced by social structures (culture industry, administered society); behavioral economics loca…  
  *Sees what you miss:* Critical theory sees that calling biases 'cognitive' individualizes what are actually socially produced distortions — the problem is the system, not the brain.

### Spontaneous-Order
*Operative paradigm:* **Austrian Economics** (#2) · 7 rivals in corpus, sharpest below.  
*Reveals in framing like:* "let the market discover", "don't centrally plan"

- **Keynesian Economics** — *fault line:* The most ideologically charged tension in economics: whether economic downturns are caused by government-induced malinvestment (Austrian) or insuffici…  
  *Sees what you miss:* Keynesian economics sees how demand deficiency creates self-reinforcing downward spirals where everyone's rational individual retrenchment makes the collective situation…
- **Marxian Economics** — *fault line:* Both see deep structural dynamics that mainstream economics ignores, but they reach diametrically opposite conclusions: Austrians see the market as a…  
  *Sees what you miss:* Marxian economics reveals how ownership of the means of production, surplus extraction, and class dynamics shape market outcomes in ways that voluntarist frameworks canno…
- **Behavioral Economics (Kahneman/Tversky)** — *fault line:* Austrians insist on purposeful human action as the irreducible unit of analysis; behavioral economists document systematic irrationality. They disagre…  
  *Sees what you miss:* Behavioral economics provides rigorous experimental evidence of specific, predictable decision-making failures that Austrian praxeology cannot detect because it deduces r…


## Power / structure

### Self-Interested-Institutions
*Operative paradigm:* **Public Choice Theory** (#10) · 7 rivals in corpus, sharpest below.  
*Reveals in framing like:* "follow the bureaucracy's incentives", "rent-seeking", "capture"

- **Deliberative Democracy (Habermas)** — *fault line:* Public choice models political actors as fixed-preference maximizers; deliberative democracy argues that preferences are transformed through reasoned…  
  *Sees what you miss:* Deliberative democracy shows that public choice's assumption of fixed preferences is empirically wrong — well-designed deliberative processes actually do change participa…
- **Technocracy** — *fault line:* Public choice sees technocrats as self-interested agents who use expertise as a cover for expanding their own power and budgets; technocracy sees itse…  
  *Sees what you miss:* Technocracy identifies real domains where public choice cynicism is wrong — where experts genuinely know better than voters or markets, and where the cost of ignoring exp…

### Material-Power / Class
*Operative paradigm:* **Marxian Economics** (#15) · 11 rivals in corpus, sharpest below.  
*Reveals in framing like:* "follow the power", "who owns it", "class interest"

- **Neoclassical Economics** — *fault line:* A foundational split between seeing the economy as a system of voluntary exchange among equals (neoclassical) vs. a system of exploitation structured…  
  *Sees what you miss:* Neoclassical economics tracks efficiency, consumer surplus, and welfare gains from trade that Marxian analysis dismisses as surface phenomena masking deeper extraction.
- **Behavioral Economics (Kahneman/Tversky)** — *fault line:* Behavioral economists see individual cognitive biases as the source of suboptimal outcomes; Marxians see structural class exploitation. The fault line…  
  *Sees what you miss:* Behavioral economics identifies specific cognitive mechanisms — framing effects, anchoring, loss aversion — that shape individual decisions in ways that class analysis ca…
- **Elite Theory (Pareto/Mosca/Michels)** — *fault line:* Both see society as ruled by minorities, but Marxians insist the ruling class is defined by ownership of production (an economic category); elite theo…  
  *Sees what you miss:* Elite theory sees how elites persist, circulate, and reproduce themselves through mechanisms — organizational oligarchy, psychological traits, cultural capital — that ope…

### Structural-Power
*Operative paradigm:* **Critical Race Theory** (#202) · 5 rivals in corpus, sharpest below.  
*Reveals in framing like:* "the system is structured to…", structural / institutional critique

- **Moral Foundations Theory (Haidt)** — *fault line:* Are moral-political divisions rooted in universal psychological foundations (care, fairness, loyalty, authority, purity), or in historically construct…  
  *Sees what you miss:* Moral Foundations Theory sees cross-cultural moral diversity rooted in evolved psychological systems — reducing all moral conflict to power and race misses the genuine pl…
- **Weberian Interpretivism** — *fault line:* CRT insists that race is a structural system of power that produces material outcomes; Weberian interpretivism focuses on how actors subjectively unde…  
  *Sees what you miss:* Weberian interpretivism sees that CRT's structural emphasis cannot explain variation in how individuals within the same racial position experience and respond to racism.

### Surveillance-Capital
*Operative paradigm:* **Surveillance Capitalism (Zuboff)** (#269) · 5 rivals in corpus, sharpest below.  
*Reveals in framing like:* "data is the product", "extract behavioral surplus", platform power

- **Libertarianism** — *fault line:* Is the extraction of behavioral data by tech platforms a new form of domination requiring regulation, or is it voluntary exchange that government inte…  
  *Sees what you miss:* Libertarianism sees that users voluntarily choose platforms, accept terms, and receive valuable services in return — paternalistic regulation restricts individual freedom…
- **Virtue Ethics (Aristotle/MacIntyre)** — *fault line:* Can human character and practical wisdom flourish in an environment designed to predict and modify behavior, or does surveillance capitalism systemati…  
  *Sees what you miss:* Virtue Ethics sees that surveillance capitalism destroys the autonomy, deliberation, and practice that virtue requires — you cannot develop practical wisdom when your beh…
- **Attention Economy (Simon/Goldhaber)** — *fault line:* Both see digital platforms as extractive, but Surveillance Capitalism focuses on behavioral data extraction while Attention Economy focuses on attenti…  
  *Sees what you miss:* Attention Economy sees that attention itself is the ultimate scarce resource — data extraction is one consequence of the battle for eyeballs, not its purpose.


## Ethics / values

### Consequentialist
*Operative paradigm:* **Classical Utilitarianism (Bentham/Mill)** (#92) · 4 rivals in corpus, sharpest below.  
*Reveals in framing like:* "greatest good", "cost-benefit the outcome", "ends justify", utilitarian

- **Kantian Deontology** — *fault line:* Utilitarianism says the morality of an act depends entirely on its consequences; Kant says some acts are intrinsically right or wrong regardless of ou…  
  *Sees what you miss:* Deontology sees that treating people as mere means to aggregate welfare erodes the moral standing of individuals; some constraints are non-negotiable.
- **Virtue Ethics (Aristotle/MacIntyre)** — *fault line:* Utilitarianism asks 'what should I do?' while virtue ethics asks 'who should I become?' — one optimizes outcomes, the other cultivates character.  
  *Sees what you miss:* Virtue ethics sees that optimizing outcomes without cultivating judgment produces fragile moral agents who collapse when the calculator breaks.
- **Effective Altruism** — *fault line:* Both maximize welfare, but classical utilitarianism is a philosophical framework while EA is a social movement that operationalizes it — generating te…  
  *Sees what you miss:* EA sees that classical utilitarianism without institutional discipline degenerates into armchair philosophizing — rigorous measurement and cause prioritization are not op…

### Principled / Duty
*Operative paradigm:* **Kantian Deontology** (#102) · 5 rivals in corpus, sharpest below.  
*Reveals in framing like:* "it's a matter of principle", "lines you don't cross", duties / rights

- **Classical Utilitarianism (Bentham/Mill)** — *fault line:* Utilitarianism says the morality of an act depends entirely on its consequences; Kant says some acts are intrinsically right or wrong regardless of ou…  
  *Sees what you miss:* Utilitarianism sees that rigid rules can produce catastrophic outcomes when context demands flexibility; it forces honest confrontation with tradeoffs.
- **Existentialism (Sartre/de Beauvoir)** — *fault line:* Kant grounds morality in universal rational law; existentialism insists there is no pre-given moral framework and individuals must create values throu…  
  *Sees what you miss:* Existentialism sees that appeals to universal moral law are acts of bad faith — attempts to escape the anguish of genuine choice by hiding behind rules.
- **Moral Foundations Theory (Haidt)** — *fault line:* Haidt shows morality is built from multiple intuitive foundations (care, fairness, loyalty, authority, purity, liberty); Kant insists morality is unif…  
  *Sees what you miss:* Moral Foundations Theory sees that Kantian rationalism describes only the 'fairness' foundation and treats the others as irrational — missing most of actual moral life.

### Character / Virtue
*Operative paradigm:* **Virtue Ethics (Aristotle/MacIntyre)** (#103) · 6 rivals in corpus, sharpest below.  
*Reveals in framing like:* "what would a good person do", character, integrity

- **Classical Utilitarianism (Bentham/Mill)** — *fault line:* Utilitarianism asks 'what should I do?' while virtue ethics asks 'who should I become?' — one optimizes outcomes, the other cultivates character.  
  *Sees what you miss:* Utilitarianism sees that good character without good outcomes is self-congratulatory; it demands measurable results.
- **Conflict Theory (Marx/Dahrendorf)** — *fault line:* Virtue ethics focuses on cultivating individual character within communities of practice; conflict theory insists that character is shaped by structur…  
  *Sees what you miss:* Conflict theory sees that virtue ethics' focus on individual cultivation ignores how structural violence makes virtue a luxury of the privileged classes.
- **Contractualism (Scanlon)** — *fault line:* Scanlon asks what principles people could not reasonably reject; virtue ethics asks what character traits enable human flourishing. One focuses on int…  
  *Sees what you miss:* Contractualism sees that virtue ethics provides no procedure for resolving disputes between people with different conceptions of the good — you need principles, not just…

### Relational / Care
*Operative paradigm:* **Care Ethics (Gilligan/Noddings)** (#104) · 5 rivals in corpus, sharpest below.  
*Reveals in framing like:* "attend to the relationship/need", responsiveness, particular others

- **Effective Altruism** — *fault line:* EA demands impartial maximization across all beings; care ethics insists morality begins in concrete relationships and particular attachments.  
  *Sees what you miss:* EA sees that parochial care ignores massive suffering that happens to be distant or abstract; scope sensitivity matters.
- **Rights-Based Ethics** — *fault line:* Care ethics centers concrete relationships and responsiveness to particular others; rights-based ethics insists on abstract, universalizable protectio…  
  *Sees what you miss:* Rights-based ethics sees that care without rights leaves the vulnerable dependent on the goodwill of the powerful — which can be withdrawn at any time.

### Evidence-Maximizing Good
*Operative paradigm:* **Effective Altruism** (#95) · 6 rivals in corpus, sharpest below.  
*Reveals in framing like:* "do the most measurable good", impartial, EA

- **Care Ethics (Gilligan/Noddings)** — *fault line:* EA demands impartial maximization across all beings; care ethics insists morality begins in concrete relationships and particular attachments.  
  *Sees what you miss:* Care ethics sees that abstract maximization can rationalize neglecting the people right in front of you, eroding the relational fabric that makes moral life possible.
- **Postcolonial Theory (Said/Spivak/Bhabha)** — *fault line:* EA assumes a universal framework for measuring and alleviating suffering; postcolonial theory asks who designed the framework and whose knowledge coun…  
  *Sees what you miss:* Postcolonial theory sees that EA's 'neutral' metrics reproduce colonial logics — the global North deciding what the global South needs, again.
- **Longtermism** — *fault line:* Both emerged from the same intellectual ecosystem, but longtermism's focus on existential risk and far-future populations can conflict with EA's empha…  
  *Sees what you miss:* Longtermism sees that EA's insistence on evidence-based interventions biases it toward the present — the highest expected-value interventions may be unverifiable for cent…

### Moral-Intuitions
*Operative paradigm:* **Moral Foundations Theory (Haidt)** (#156) · 5 rivals in corpus, sharpest below.  
*Reveals in framing like:* "the other side's values", left/right morality, gut-level right/wrong

- **Contractualism (Scanlon)** — *fault line:* Scanlon asks what principles no one could reasonably reject; Haidt shows that actual moral psychology operates through six foundations that often conf…  
  *Sees what you miss:* Contractualism sees that descriptive moral psychology without normative standards cannot distinguish moral progress from moral regression.
- **Kantian Deontology** — *fault line:* Haidt shows morality is built from multiple intuitive foundations (care, fairness, loyalty, authority, purity, liberty); Kant insists morality is unif…  
  *Sees what you miss:* Kantian deontology sees that cataloging moral intuitions provides no way to adjudicate between them — when foundations conflict, you need a higher-order principle.
- **Critical Race Theory** — *fault line:* Are moral-political divisions rooted in universal psychological foundations (care, fairness, loyalty, authority, purity), or in historically construct…  
  *Sees what you miss:* Critical Race Theory sees that framing racism as just one moral dimension among many normalizes it — racial hierarchy is not a difference in moral taste but a system of d…


## Meaning / growth

### Experimentalist / Pragmatist
*Operative paradigm:* **Classical Pragmatism (Peirce/James/Dewey)** (#121) · 4 rivals in corpus, sharpest below.  
*Reveals in framing like:* "build-measure-learn", "Lean Startup", "MVP", "ship and iterate", "what works"

- **Kantian Deontology** — *fault line:* Pragmatism judges ideas by their practical consequences in experience; Kant insists on a priori moral principles independent of consequences.  
  *Sees what you miss:* Kantian deontology sees that judging everything by 'what works' provides no basis for moral principles that should hold even when violating them would be expedient.
- **Structural Functionalism (Durkheim/Parsons)** — *fault line:* Pragmatism sees social institutions as experimental and revisable; functionalism sees them as fulfilling necessary functions for social stability.  
  *Sees what you miss:* Structural functionalism sees that pragmatist experimentalism underestimates the systemic interdependencies that make social order possible — you can't just tinker with e…
- **Decolonial Theory (Mignolo/Quijano)** — *fault line:* Decolonial theory sees pragmatism as a product of the colonial modern world-system that cannot theorize beyond its own epistemic horizon; pragmatism s…  
  *Sees what you miss:* Decolonial theory sees that pragmatism's 'what works' criterion smuggles in colonial definitions of success — working for whom, by whose standards?

### Existentialist
*Operative paradigm:* **Existentialism (Sartre/de Beauvoir)** (#112) · 8 rivals in corpus, sharpest below.  
*Reveals in framing like:* "find meaning", "authentic", "my choice defines me", radical freedom

- **Kantian Deontology** — *fault line:* Kant grounds morality in universal rational law; existentialism insists there is no pre-given moral framework and individuals must create values throu…  
  *Sees what you miss:* Kantian deontology sees that without universal principles, existential freedom degenerates into arbitrary willfulness with no basis for criticizing anyone else's choices.
- **Social Identity Theory (Tajfel)** — *fault line:* Existentialism insists on radical individual freedom and responsibility; social identity theory shows that group membership fundamentally shapes perce…  
  *Sees what you miss:* Social identity theory sees that existential freedom is an empirical fiction — in-group/out-group dynamics operate automatically and powerfully, constraining choice befor…
- **Terror Management Theory** — *fault line:* Both address death's role in human life, but TMT says mortality salience triggers defensive cultural worldview-bolstering, while existentialism says c…  
  *Sees what you miss:* TMT sees that existentialism romanticizes death-confrontation — the empirical evidence shows most people respond to mortality salience with rigid, defensive, often aggres…

### Lived-Experience
*Operative paradigm:* **Phenomenology (Husserl/Heidegger/Merleau-Ponty)** (#113) · 5 rivals in corpus, sharpest below.  
*Reveals in framing like:* "how it's actually experienced", first-person, embodied

- **Dual Process Theory (System 1/2)** — *fault line:* Phenomenology seeks to describe the structure of lived experience as it appears; dual process theory models cognition as two systems that explain why…  
  *Sees what you miss:* Dual process theory sees that phenomenological introspection cannot access the automatic processes that generate most of what consciousness then rationalizes.
- **Embodied Cognition** — *fault line:* Phenomenology describes the lived body's role in constituting experience philosophically; embodied cognition models it empirically through computation…  
  *Sees what you miss:* Embodied cognition sees that phenomenological description, however rich, cannot generate testable predictions about how body-mind coupling actually works in specific cont…
- **Computationalism / GOFAI** — *fault line:* Is human understanding grounded in embodied, lived experience that computation cannot replicate, or is cognition fundamentally information processing…  
  *Sees what you miss:* Computationalism sees that subjective experience is either epiphenomenal or itself computational — the appearance of irreducible qualia does not mean computation cannot p…


## Systems / complexity

### Complex-Adaptive-Systems
*Operative paradigm:* **Complex Adaptive Systems (Holland/Kauffman)** (#220) · 6 rivals in corpus, sharpest below.  
*Reveals in framing like:* "systems thinking", "emergence", "it's all connected", "can't control it"

- **System Dynamics (Forrester)** — *fault line:* System Dynamics models systems as stocks and flows with knowable feedback structures; CAS sees systems as composed of diverse adaptive agents whose in…  
  *Sees what you miss:* System Dynamics sees the persistent structures — delays, accumulations, feedback loops — that constrain even adaptive systems.
- **Normal Accidents (Perrow)** — *fault line:* CAS sees complex systems as adaptive and capable of self-organization; Normal Accidents sees complex systems as inevitably accident-producing. The ten…  
  *Sees what you miss:* Normal Accidents sees that complexity and tight coupling create failure modes that no amount of adaptation can eliminate — accidents are normal, not exceptional.
- **Game Theory (strategic interaction)** — *fault line:* Game Theory assumes rational strategic agents with defined payoffs; CAS sees agents as diverse, adaptive, and operating with local information. The te…  
  *Sees what you miss:* Game Theory sees the structural logic of strategic situations — some games have equilibria that hold regardless of agent complexity.

### Network / Contagion
*Operative paradigm:* **Network Science (Barabasi)** (#222) · 8 rivals in corpus, sharpest below.  
*Reveals in framing like:* "hubs", "goes viral", "network effects", "spread", "tipping point"

- **Chaos Theory (Lorenz)** — *fault line:* Chaos Theory focuses on sensitivity to initial conditions in deterministic systems; Network Science focuses on how connection topology determines syst…  
  *Sees what you miss:* Chaos Theory sees how tiny perturbations cascade unpredictably, regardless of network structure.
- **Epidemiological Lens** — *fault line:* Epidemiology models contagion dynamics (R-values, herd immunity); Network Science models the topology through which contagion spreads. The tension: is…  
  *Sees what you miss:* The Epidemiological Lens sees pathogen properties — transmissibility, virulence, incubation period — as the primary determinants of spread.
- **Neoclassical Economics** — *fault line:* Network Science sees hub-dominated topologies and preferential attachment; Neoclassical Economics assumes atomistic agents in competitive markets. The…  
  *Sees what you miss:* Neoclassical Economics sees the equilibrium-seeking properties of competitive markets that network models, focused on topology, tend to ignore.


## Psychology / social

### Evolutionary
*Operative paradigm:* **Evolutionary Psychology** (#145) · 5 rivals in corpus, sharpest below.  
*Reveals in framing like:* "we're wired to…", "evolved for", human-nature explanations

- **Feminist Theory (liberal/radical/intersectional)** — *fault line:* Evolutionary psychology sees behavioral sex differences as reflecting ancestral selection pressures; feminist theory sees them as socially constructed…  
  *Sees what you miss:* Feminist theory sees that 'evolved' explanations for gender differences have been systematically used to naturalize inequality and foreclose change.
- **Queer Theory** — *fault line:* Queer theory deconstructs the naturalness of sexual and gender categories; evolutionary psychology explains them through reproductive fitness and ance…  
  *Sees what you miss:* Queer theory sees that evolutionary psychology naturalizes contingent social categories by projecting them onto an imagined ancestral past — 'natural' is a political clai…
- **Psychoanalytic Theory (Freud/Klein/Winnicott)** — *fault line:* Psychoanalysis explains behavior through unconscious drives, early relationships, and defense mechanisms; evolutionary psychology explains it through…  
  *Sees what you miss:* Psychoanalysis sees that evolutionary psychology's focus on species-typical adaptations cannot explain individual variation in neurosis, fantasy, and symptom formation —…

### Group-Identity
*Operative paradigm:* **Social Identity Theory (Tajfel)** (#151) · 5 rivals in corpus, sharpest below.  
*Reveals in framing like:* "in-group/out-group", "tribal", belonging, status

- **Existentialism (Sartre/de Beauvoir)** — *fault line:* Existentialism insists on radical individual freedom and responsibility; social identity theory shows that group membership fundamentally shapes perce…  
  *Sees what you miss:* Existentialism sees that reducing people to their group memberships denies the freedom that makes moral agency possible.
- **Intersectionality (Crenshaw)** — *fault line:* Intersectionality insists that identities are co-constituting — you cannot separate race from gender from class; SIT studies group identities one at a…  
  *Sees what you miss:* Intersectionality sees that studying identities in isolation produces fundamentally misleading conclusions — Black women's experience is not 'Black' plus 'woman.'
- **System Justification Theory** — *fault line:* SIT predicts that group members will favor their in-group; system justification theory shows that disadvantaged group members often favor the out-grou…  
  *Sees what you miss:* System justification theory sees that SIT's prediction of universal in-group favoritism is empirically falsified — the systematic out-group favoritism of low-status group…


## Strategy / tech

### Strategic-Rational
*Operative paradigm:* **Game Theory (strategic interaction)** (#295) · 3 rivals in corpus, sharpest below.  
*Reveals in framing like:* "what's their move", equilibria, "rational players", incentives-to-defect

- **Red Queen Dynamics** — *fault line:* Red Queen dynamics describe arms races where you must keep running to stay in place; Evolutionary Game Theory models strategic frequency-dependent sel…  
  *Sees what you miss:* Red Queen thinking sees the relentless escalation dynamic — you must innovate just to maintain your current position.
- **OODA Loop (Boyd)** — *fault line:* Boyd's OODA Loop emphasizes decision speed and cognitive agility in ambiguous situations; Game Theory formalizes strategic interaction between rationa…  
  *Sees what you miss:* OODA sees that decision speed and the ability to reorient trump optimal calculation — the side that cycles faster creates confusion the other side cannot resolve.
- **Complex Adaptive Systems (Holland/Kauffman)** — *fault line:* Game Theory assumes rational strategic agents with defined payoffs; CAS sees agents as diverse, adaptive, and operating with local information. The te…  
  *Sees what you miss:* CAS sees that real agents learn, imitate, and mutate strategies in ways that prevent equilibrium — the game itself evolves.

### Alignment / Control-the-risk
*Operative paradigm:* **AI Safety / Alignment (Bostrom/Russell)** (#264) · 2 rivals in corpus, sharpest below.  
*Reveals in framing like:* "align the system", "control the downside", x-risk, safety-first

- **Innovation Economics (Schumpeter)** — *fault line:* Should we slow down to ensure AI systems are safe and aligned with human values, or does the creative destruction of rapid innovation solve more probl…  
  *Sees what you miss:* Innovation Economics sees that precautionary delay has real costs measured in lives, poverty, and suffering — every month of foregone AI medical research, climate solutio…
- **Existentialism (Sartre/de Beauvoir)** — *fault line:* Is the meaning of AI determined by human freedom and choice, or is there an objective alignment problem that constrains how AI must be built regardles…  
  *Sees what you miss:* Existentialism sees that AI Safety treats human values as something to be discovered and encoded, when values are actually created through free choice — alignment to fixe…

