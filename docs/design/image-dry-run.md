# Image dry run, 13 Oct 2026

Command: `npx tsx scripts/design-images.mts --dry-run` (no key needed).

Model: gpt-image-2.5-flare. Drafts: 12 (8 logo marks + 4 illustrations), low, 816x816. Official minimum pixel/16-pixel rules make 816 the smallest square. Calculator: 171 output tokens/image, $0.00513 each; outputs $0.06156. Prompt estimate: $0.018935 (rough characters/4 token estimate at $5/million); combined about $0.080495 before retries/tax. Actual usage can differ. Worst-case retry room reserved: 24 attempts of the 40 cap. Images made and attempts: zero.

Later, ONLY after picks: one selected logo and four approved illustrations, high, 1024x1024. Calculator: 1,756 output tokens/image, $0.05268 each; five outputs about $0.2634 plus prompts. Do not run this stage before approval. No final-only dry run is claimed; it correctly rejects missing picks.

Sources opened and checked: [generation guide and interactive calculator](https://developers.openai.com/api/docs/guides/image-generation), [current Flare model](https://developers.openai.com/api/docs/models/gpt-image-2.5-flare). These estimates use the current model, not old DALL-E per-image pricing. Checked both calculator inputs through the browser; smallest draft and final settings explicitly selected.

The script is a separate manual build-time tool, absent from npm build/deploy/test hooks. Approval JSON remains false. It skips existing output or raw source, reserves durable attempt count before a call, retries at most once then stops, refuses CI/tests, keeps count/model/size/quality only, and locally compresses WebP below 120 KB. Source files survive conversion failures without another paid request. No API errors or raw payloads are printed. Generator transport is untested against the paid service tonight; only guards and mock retries were tested. Current review page has explicit pending states, no broken images and no generated ideas masquerading as finished logos. Alt text is saved separately.

For Ganesh: say go for the 12 drafts when ready; then pick one mark and approve the four illustrations before finals/SVG trace/favicon or placement. No key needs to be pasted or changed.
