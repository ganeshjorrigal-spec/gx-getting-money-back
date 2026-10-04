# 02 Design: taste, direction, tokens, components

Owner: Claude HQ. Status: DRAFT v1, 4 Oct 2026. Codex reads, never edits.

This file follows the design-system-first method: no external library to adopt (Gate 0), a taste-lock with real users before anything is locked (Gate 1), one small token file as ground truth (Gate 2), a short regression net (Gate 3), and polish aimed at what this product needs (Gate 4).

---

## 1. What the design must do (Gate 4)

Our user is stressed, on a phone, often in a crowd or on the move, worried about real money. The design has one job: **turn worry into calm certainty in three seconds.**

So the polish serves:
- **One amount, one date, one next step**, readable at a glance.
- **The source behind every date**, so certainty feels earned, not claimed.
- **Visible control**: every send button says it opens the user's own app.
- **Progress you can see**: a timeline that proves the case is alive.

What we borrow from premium finance apps: restraint, number clarity, quiet confidence. What we don't borrow: dark luxury looks, gamification, dense dashboards. This is not a fintech app. It is a calm helper on your side.

---

## 2. UD's taste rules, applied here

| UD's rule | What it means for Tickback |
|---|---|
| **Care: notice small things** | The rupee sign renders in our font (most fonts only carry it in the extended subset; two popular fonts don't have it at all). Amounts use tabular figures so they don't jiggle. Dates say "Fri, 23 Oct", not "23/10". Inputs are 16 px so iPhone doesn't zoom. |
| **Label: name it exactly** | Copy is design. "Your Rs 3,500 should land by Fri, 23 Oct" beats "Status: Pending". Buttons say what happens: "Open in my email", not "Submit". |
| **Teardown** | Before the taste test, Ganesh spends 15 minutes on one high-craft page (UD used Shopify's Renaissance edition) and writes five labels for what makes it good. Those labels go in section 9. |
| **Fonts are how you say it** | Each direction below is a different voice: a calm receipt, a friendly helper, an official case file. |
| **Teach your AI: image, words** | Tokens in one file, a do and don't word list (section 9), and reference screenshots in `design/refs/`. |

---

## 3. Design principles

1. **One number, one date, one step.** Every case screen leads with them, in that order.
2. **Show your working.** Each date carries a one-line source: "BookMyShow said '7 to 10 working days' on 9 Oct."
3. **The user's hands, not ours.** Send actions always say whose app opens. Nothing looks like we act alone.
4. **Calm, not alarm.** Red only when something is due today. No countdown timers. No flashing.
5. **Earn the next tap.** One primary action per state. No dead buttons, ever: if a feature isn't built, it isn't on screen.

---

## 4. Three directions for the taste test (Gate 1)

Same copy, same layout. Only the taste changes. Direction A is the build default until the test picks one.

### Direction A: Calm Ledger (default)
- **Voice:** a well-made receipt. Quiet, exact, trustworthy.
- **Type:** Newsreader (serif) for the amount, date and headlines; Geist for everything else. Both have the rupee sign and tabular figures.
- **Colour:** warm paper background, near-black ink, one deep money-green accent.
- **Shape:** soft 10 to 14 px corners, hairline borders, almost no shadows.
- **Signature moment:** the due-date block. A big serif date with a small source line under it, like a line on a statement.
- **Risk:** can feel too plain to some. The test will tell us.

### Direction B: Friendly Helper
- **Voice:** a capable friend who has done this before. Warm, upbeat, still serious about money.
- **Type:** Bricolage Grotesque for display, Manrope for the interface. Both have the rupee sign and tabular figures.
- **Colour:** cream background, deep teal accent, a marigold highlight used only for decoration behind ink text.
- **Shape:** rounder 14 to 20 px corners, chunkier chips.
- **Signature moment:** the next-step card with a marigold underline on the action verb.
- **Risk:** can read as less official, which matters for money.

### Direction C: Case File
- **Voice:** a sharp clerk on your side. Official, organised, a bit of theatre.
- **Type:** Source Serif 4 for text, IBM Plex Mono for case codes, dates and stamps. Both have the rupee sign.
- **Colour:** manila paper, ink, a rubber-stamp red-orange for status stamps, green for "Refunded".
- **Shape:** tight 4 to 6 px corners, a docket header with the case code.
- **Signature moment:** status stamps: OPEN, CHASED, REFUNDED. The "REFUNDED" stamp lands when money arrives. Highly shareable.
- **Risk:** the stamp theatre must not feel like a toy.

**Ruled out:** Instrument Serif and Instrument Sans (no rupee sign), DM Sans and Fraunces (no tabular figures). Checked with fontTools on 4 Oct 2026; see `docs/archive/2026-10-04_research-tech-facts.md`.

---

## 5. The taste-lock protocol

**What to show:** two screens in all three directions, six images in total.
1. The landing hero on a phone.
2. The case page for the US-1 example (route, date, next step).

**How to make them:** Codex builds a temporary `/taste` page that renders both screens with each token set. Tokens are CSS variables, so this costs little. Take screenshots on a real phone. Delete `/taste` after the lock.

**Who to ask:** 5 to 10 people who bought event tickets online in the last 12 months. Not GrowthX builders, not designers. The T1 DM list is ideal.

**What to ask** (show directions in a shuffled order):
1. "If your concert refund was stuck, which one would you trust with it?"
2. "Which one looks most likely to actually get your money back?"
3. "Which would you share with a friend?"
4. "One word for each."

**Decide:**
- The direction that wins question 1 wins.
- If there's a tie, Ganesh decides.
- Record the result as a decision in `DECISIONS.md`, with the votes and the one-word answers.

**Time box:** finish by Monday 5 Oct, 12:00. Until then Codex builds with Direction A. Switching later is a one-file change.

---

## 6. Tokens (Gate 2: the ground truth)

One file: `app/styles/tokens.css` (CSS variables), read by Tailwind. No colour or size values anywhere else in the code.

### 6.1 Colour (all text pairs pass WCAG AA; checked 4 Oct 2026)

| Token | A: Calm Ledger | B: Friendly Helper | C: Case File | Use |
|---|---|---|---|---|
| `--bg` | `#FAF8F3` | `#FFF8EE` | `#F5F0E3` | Page background (never dark) |
| `--surface` | `#FFFFFF` | `#FFFFFF` | `#FFFDF7` | Cards, sheets |
| `--ink` | `#1C1B19` | `#22201C` | `#1F2328` | Main text |
| `--muted` | `#5F5B53` | `#5E584E` | `#565B63` | Secondary text, source lines |
| `--line` | `#E4DFD3` | `#EFE3CF` | `#DDD3BC` | Borders, dividers |
| `--accent` | `#1E6B47` | `#0F5F63` | `#1D5E3B` | Primary buttons, money-back states |
| `--accent-soft` | `#E4F1E9` | `#DDF0EF` | `#DFEDE3` | Route chip background (good states) |
| `--on-accent` | `#FFFFFF` | `#FFFFFF` | `#FFFFFF` | Text on accent |
| `--caution` | `#8A5300` | `#8F4B00` | `#8C4A0B` | Overdue, act-by text |
| `--caution-soft` | `#FDF1DC` | `#FFE9C7` | `#F8E5CC` | Overdue chip background |
| `--danger` | `#A8231A` | `#A3271B` | `#A4301F` | Due today, destructive actions only |
| `--highlight` | n/a | `#F2B33D` | n/a | B only: decorative underline, ink text on top |
| `--stamp` | n/a | n/a | `#B4381F` | C only: status stamps |

Contrast results (selected): ink on bg 16.2 / 15.4 / 13.9; muted on bg 6.4 / 6.7 / 6.0; accent on bg 6.1 / 7.0 / 6.8; white on accent 6.5 / 7.4 / 7.7; caution on caution-soft 5.7 / 5.6 / 5.5.

### 6.2 Type

| Direction | Display font | Interface font |
|---|---|---|
| A | Newsreader 500/600 | Geist 400/500/600 |
| B | Bricolage Grotesque 600/700 | Manrope 400/500/600 |
| C | Source Serif 4 600 | Source Serif 4 400 for body; IBM Plex Mono 500 for codes, dates and stamps |

- Load with `next/font/google` and **`subsets: ['latin', 'latin-ext']`**. The rupee sign lives in `latin-ext`. Without it, the rupee sign silently falls back to another font.
- Amounts and dates use `font-variant-numeric: tabular-nums lining-nums`.
- Two font families at most per direction. Preload only the display font, and only on the landing page.

**Scale for mobile** (size and line height in px):

| Token | Size / line | Use |
|---|---|---|
| `amount` | 40 / 44 | The rupee amount on the case page |
| `hero` | 34 / 40 | Landing H1 (48 / 54 at 1024 px and up) |
| `title` | 22 / 28 | Card titles |
| `heading` | 18 / 24 | Section heads |
| `body` | 16 / 24 | Body text and inputs (never below 16 px in inputs) |
| `small` | 14 / 20 | Source lines, helper text |
| `micro` | 12 / 16 | Legal footers only, never important info |

### 6.3 Space, shape, depth, motion

- **Spacing:** 4 px base. Steps: 4, 8, 12, 16, 20, 24, 32, 40, 56, 72.
- **Layout widths:** page gutter 16 px on phones. App screens max 560 px wide. Landing sections max 1040 px.
- **Radius:**

  | Direction | Inputs and buttons | Cards | Chips |
  |---|---|---|---|
  | A | 10 | 14 | 999 |
  | B | 14 | 20 | 999 |
  | C | 4 | 6 | 4 |

- **Borders:** 1 px `--line`.
- **Shadows:** none on cards. Bottom sheets only: `0 -8px 24px rgba(28,27,25,0.08)`.
- **Motion:**
  - Taps take 150 ms ease-out. Sheets take 220 ms. Progress ticks take 180 ms. Nothing runs longer than 300 ms.
  - Respect `prefers-reduced-motion`: no motion beyond opacity.
- **Touch:** targets at least 44 px. Buttons 48 px tall.
- **Icons:** Lucide at 20 px, stroke 1.75. Never as the only label.

---

## 7. Components (the primitives the taste-lock validates)

| Component | Variants | States |
|---|---|---|
| Button | primary, secondary, ghost, destructive | default, pressed, loading (label stays, spinner on left), disabled (with a reason shown nearby) |
| Textarea | intake, reply | empty, focused, filled, error, paste-success |
| Chip | situation chip (selectable), route chip (status) | default, selected; route chips use accent-soft, caution-soft or neutral |
| Card | case header, due-date block, next-step, save, pay, timeline, proof | default, highlighted (needs action) |
| Due-date block | WAIT, OVERDUE, FAILED_PAYMENT | with source line; with "estimate" tag when the date is a guess |
| Progress steps | 4 agent steps | waiting, running, done, failed |
| Timeline item | user input, agent read, step sent, reply, check-in, payment, landed | icon + date + one line |
| Bottom sheet | send, reply, pay, delete | open, closing |
| Banner | check-in, offline, error | info, caution |
| Toast | copied, saved | appears 2 s, accessible via `aria-live` |
| Stamp (C only) | OPEN, CHASED, REFUNDED | static, land animation (respect reduced motion) |

---

## 8. States every screen must design

- **Loading:** skeletons shaped like the real content. Agent work shows the 4 named progress steps, never a lone spinner.
- **Empty:** says what to do next, with one button.
- **Error:** says what happened in plain words, that nothing is lost, and gives one recovery action.
- **Offline:** banner, "You're offline. Your case is saved."
- **Low confidence:** "We think this is [route]. Is that right?", with Yes / Not quite.

---

## 9. Teaching Codex the taste

**Words to aim for:** calm, clear, plain, receipt-like, one big number, quiet confidence, on your side, shows its source.

**Words to avoid:** gradients, glassmorphism, neon, dark mode, emoji in the interface, stock illustrations, "AI sparkle" icons, countdown timers, confetti, red unless due today.

**Ganesh's teardown labels** (fill in after the 15-minute teardown):
1. ...
2. ...
3. ...
4. ...
5. ...

**Reference images:** Ganesh drops 3 to 5 screenshots in `design/refs/` with a one-line label each (what to borrow, in plain words).

---

## 10. Accessibility

- WCAG AA contrast for all text (done for all three palettes).
- Tap targets of at least 44 px. Inputs at 16 px.
- Every icon button has a text label or `aria-label`.
- Agent progress is announced with `aria-live="polite"`.
- Focus is visible: a 2 px `--accent` ring with a 2 px offset.
- Works at 200% zoom and at 320 px width.
- Language set to `en-IN`.

---

## 11. Regression net (Gate 3)

After any token or component change, check these six screens at 360 px and 390 px width before merging:
1. Landing hero.
2. Intake.
3. Case page in the `WAIT` state.
4. Case page in the `OVERDUE` state with the next step.
5. Send sheet (email).
6. Money landed.

Codex stores screenshots in `docs/qa/screens/` with the date, and notes any visual change in the daily log.
