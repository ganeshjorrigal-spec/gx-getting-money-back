from pathlib import Path
import sys

ROOT = Path(__file__).resolve().parents[1]
REQUIRED = [
    'SKILL.md', 'README.md',
    'engine/cognitive-stack-v2/ENGINE.md',
    'engine/cognitive-stack-v2/references/library-index.md',
    'router/mode-router.md', 'router/mission-contract.md',
    'router/work-stage-router.md', 'router/evidence-gate.md',
    'loops/loop-controller.md', 'loops/innovation-loop.md',
    'domain-packs/management-consulting.md',
    'domain-packs/product-innovation.md',
    'domain-packs/marketing-strategy.md',
    'domain-packs/campaign-planning.md',
    'domain-packs/consumer-behavior.md',
    'evaluators/completion-judge.md',
    'templates/project-state.md',
    'evaluation/scoring-rubric.md',
]

missing = [p for p in REQUIRED if not (ROOT / p).exists()]
if missing:
    print('Missing required files:')
    for p in missing:
        print('-', p)
    sys.exit(1)

skill = (ROOT / 'SKILL.md').read_text(encoding='utf-8')
if not skill.startswith('---\n') or 'name: cognitive-innovation-os-v3' not in skill:
    print('Invalid SKILL.md frontmatter')
    sys.exit(1)

recipe_files = list((ROOT / 'engine/cognitive-stack-v2/references').glob('recipes-part*.md'))
if len(recipe_files) != 8:
    print(f'Expected 8 recipe part files, found {len(recipe_files)}')
    sys.exit(1)

print('Package validation passed.')
print(f'Files: {sum(1 for p in ROOT.rglob("*") if p.is_file())}')
print(f'Recipe files: {len(recipe_files)}')
