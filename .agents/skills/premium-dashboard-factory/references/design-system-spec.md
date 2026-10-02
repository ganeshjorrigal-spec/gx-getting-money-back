# Design System Spec — the premium tokens, reverse-engineered into a system

This is the concrete, reusable design knowledge: the tokens and patterns that make a dashboard
read as premium, organized so a builder can apply them and a critic can check them. It is the
content of the **design-system skill** every module imports.

The single most important idea: **split every token into semantic or cosmetic.** Cosmetic
tokens are free to change globally; semantic tokens are locked because the value *is*
information. Getting this split wrong is what breaks a multi-module portal.

---

## Table of contents
1. The semantic / cosmetic split (the load-bearing idea)
2. Surfaces — canvas, tiers, shadows
3. Type — scale, tabular numbers, tracking
4. Motion — springs and curves
5. Color — accent restraint, deltas, states
6. Information architecture patterns
7. The starter token layer

---

## 1. The semantic / cosmetic split

**Cosmetic tokens** exist to look good and consistent. Canvas color, shadow recipe, border
radius, body-text color, spacing scale. Changing one shifts *appearance*, not *meaning*. These
should be **identical across every module** and **free to change globally** — change the value
once, every module updates.

**Semantic tokens** carry meaning; the color *is* the data. Channel colors (e.g. one hue per
acquisition/retention channel), state colors (good / bad / watch), the delta pos/neg pair.
These are **locked and documented** — they cannot be casually changed, because changing them
silently changes what the data says. A channel that is green in one module must be green in
every module, forever.

**The collision to catch:** the brand accent is mostly cosmetic, but it is *also* semantically
"primary action." It must not collide with the "bad/negative" state color. If brand red and
error red are near-identical hues, a tired or color-impaired user confuses "this is the brand"
with "this is a problem." Keep a visible hue/lightness gap between them, and document it.

When building the token layer, label every token in a comment: `/* SEMANTIC — locked */` or
`/* cosmetic — global */`. The critic checks that no semantic token was recolored for looks.

---

## 2. Surfaces

**Canvas — warm and never flat.** Avoid pure `#ffffff` / flat `#f5f5f5`. Use a warm,
brand-derived off-white, and lay a **fixed, very-low-opacity ambient gradient** behind
everything (a few large radial washes, each ~6–12% alpha, in brand-adjacent tones). This sits
at the lowest z-index; cards, tables, and charts are untouched. It is the single change that
most reads as premium, and it costs no density.

Derive the ambient tones from the *real brand*, not a generic warm default. A red brand →
warm peach/amber washes; a blue brand → cool slate/periwinkle washes. Do not reach for the
AI-default cream-and-terracotta unless the brand actually is that.

**Tiered surfaces.** Do not give every container one card style. Establish a small elevation
ladder — chrome/nav, base panel, elevated pop (modal/dropdown) — distinguished by background
opacity and (optionally) backdrop blur. If using glass (backdrop-filter), pair blur with
`saturate(140–160%)` so color behind it pops rather than washes, and add a hairline light
border for the lit edge. **Always provide a `prefers-reduced-transparency` fallback to solid.**

Use glass on chrome (sticky bars, headers), not on dense data tables — blur behind 9–11px text
hurts legibility.

**Shadows — soft and diffuse.** Low opacity, wide blur, slight tint toward the ink color, not
pure black. A panel: `0 4px 16px rgba(17,17,26,0.06)`. An elevated pop: `0 12px 36px
rgba(17,17,26,0.11)`. Never `0 2px 4px rgba(0,0,0,0.3)`.

---

## 3. Type

**Tabular numbers, everywhere.** `font-variant-numeric: tabular-nums` on every figure that
changes or sits in a column. This is the highest-leverage credibility fix in any data UI.

**A documented type scale.** Intentional steps, with extra resolution at the small end where
labels and data live (e.g. 10 / 11 / 12 / 13 / 14 / 16 / 18 / 22 / 28 / 34). Density of small
steps is what lets a dense surface feel deliberate rather than cramped.

**Tracking + smoothing.** Tighten body slightly (≈ `-0.01em`); turn on `-webkit-font-smoothing:
antialiased` and `-moz-osx-font-smoothing: grayscale`. Keep *positive* tracking on uppercase
micro-labels (that is correct and intentional — do not strip it).

**Weight encodes hierarchy.** Pick weights per level and apply consistently: the same weight
means the same level. Avoid using weight decoratively.

---

## 4. Motion

**Spring physics over timed tweens.** Prefer spring (well-damped: high damping relative to
stiffness, so it settles without childish overshoot). Representative configs:
`stiffness 320–520, damping 30–38` for snappy UI; lower stiffness for gentle entrances.

**Curated easing for the few duration-based cases.** Use deliberate curves, not default linear
or `ease`. Workhorse: `cubic-bezier(.2,.8,.2,1)`. Keep durations short (0.1–0.45s).

**Micro-interactions.** Hover lift of a few px (`translateY(-2px)`) and/or slight scale
(`1.02–1.05`); entrances may stagger. Subtle, not jumpy.

**Respect `prefers-reduced-motion`** — reduce or disable. A critic failure if absent.

---

## 5. Color

**Accent restraint.** The brand accent is for emphasis — a key number, an active state, a
primary action — never a large background flood. Premium uses the accent sparingly.

**Deltas as direction + magnitude.** A change is shown as: arrow glyph (▲/▼ or ↑/↓) + the
signed value in tabular figures + a tinted pill (a positive-delta background/ink pair and a
negative pair). **Never tick/cross** — that connotes pass/fail, not movement. Keep the delta
pos/neg pair as *semantic* tokens.

**State colors are semantic and locked.** good / bad / watch / neutral each map to one hue,
documented, never bent to the brand. Provide tinted background + readable ink for each so they
work as pills, not just text colors.

---

## 6. Information architecture patterns

- **Match density to audience.** Name the reader (analyst vs exec) and set the type scale and
  whitespace to fit. Do not default to one density for all surfaces.
- **One dominant number per view.** The decision the surface exists for gets the largest,
  highest-contrast figure; supporting metrics recede in size and weight.
- **Sticky chrome must be opaque or backdrop-blurred** so content reads under it, never through
  it. A transparent sticky header that collides with scrolling rows is a classic failure.
- **Scannable tables.** Tabular numerals; right-align numeric columns; muted column headers;
  zebra or hairline row separation at low contrast; a clear, non-overlapping frozen header.
- **Empty/loading/error states are part of the IA**, not an afterthought — design them with the
  same care as the data-present state (this links to rubric dimension 5).

---

## 7. The starter token layer

`assets/design-tokens.css` ships a CSS-variable token layer with the semantic/cosmetic split
already labeled, a light and dark set, the ambient-canvas recipe, the shadow ladder, the type
scale, and the delta/state pairs. Prefer CSS variables (or a shared JS token module) over
per-component inline styles: a portal-wide token layer means one edit propagates to every
module, which is the structural reason a set of dashboards feels like one product. Import it in
every module; extend it rather than redefining tokens locally.
