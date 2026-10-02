# Ablation Protocol

Test whether each V3 layer earns its place.

For the same benchmark case, run:

1. Baseline model answer.
2. Cognitive Stack engine only.
3. V3 without evidence gate.
4. V3 without rival worldview/adversarial evaluator.
5. V3 without domain pack.
6. Full V3.

Ask not only whether the final answer is “better,” but what changed because of each layer:

- Did the decision frame change?
- Did unsupported claims decrease?
- Did mechanism diversity increase?
- Did the recommended action change?
- Did testability improve?
- Did domain usefulness improve?
- Did the extra complexity justify itself?

Remove or gate any layer that repeatedly fails to create decision-relevant value.
