# Design Dial — Polish Phase 2

Goal: Make personalities feel like radically different design languages, not reskins.
The Taste review identified three missing dimensions. This document plans all three,
ranked by visual impact, with precise technical specifications for each.

Do not implement multiple phases at once. Verify each phase before proceeding.

---

## Visual Impact Ranking

| Rank | Phase | What it fixes | Presets affected |
|---|---|---|---|
| 1 | 2A — Dark canvas | The canvas is always light. Developer Tool and Gaming need dark mode. | Developer Tool, Gaming |
| 2 | 2B — Surface material modes | Cards always look the same. Terminal needs glass panels, Gaming needs neon glow, Editorial needs no borders. | All four |
| 3 | 2C — Type scale multiplier | Metric values are always 2rem. Kids App needs display-scale numbers, Developer Tool needs dense small type. | All four |

Phase 2B depends on the isDark flag from Phase 2A.
Phase 2C is independent and can be verified standalone.
Implement in order: 2A → 2B → 2C.

---

## Phase 2A — Dark Canvas Branch

### What it fixes

Currently `bgHex` always computes to a light color (starts from `#FAFAF9`, tints
slightly when expressive > 60). `surfaceHex` is hardcoded to `'#FFFFFF'` — literally
never changes. `textHex` is always near-black (lightness 8–22%).

`--arc-color-muted` and `--arc-color-border` are static in `arc-tokens.css` and
never computed by the token engine at all. They do not respond to any dial.

When Developer Tool or Gaming activates, the canvas is still cream-white with
dark gray text. The font changes. The color tints slightly. But the page is light.
This is the root cause of the "reskin" feeling.

### Detection logic

```js
const isDark = technical > 75 || (expressive >= 85 && energetic >= 85)
```

Verification against all 7 presets:

| Preset | technical | expressive | energetic | isDark |
|---|---|---|---|---|
| Corporate SaaS | 75 | 30 | 35 | false (75 is not > 75) |
| Developer Tool | 85 | 25 | 55 | true (85 > 75) |
| Creative Studio | 40 | 85 | 70 | false (energetic 70 < 85) |
| Health & Wellness | 20 | 40 | 20 | false |
| Luxury Editorial | 65 | 65 | 15 | false |
| Gaming | 60 | 90 | 95 | true (90 >= 85 and 95 >= 85) |
| Kids App | 15 | 80 | 80 | false (expressive 80 < 85) |

Also correct for manual dial dragging: reaching `technical > 75` feels like "highly
technical" territory; reaching `expressive >= 85 && energetic >= 85` simultaneously
feels like "maximum intensity" — both are appropriate dark-mode triggers.

### New token computations

**When isDark is false (current behavior, unchanged):**
- `bgHex` = tinted or neutral light color (existing formula)
- `surfaceHex` = `'#FFFFFF'`
- `textHex` = near-black (lightness 8–22%, existing formula)
- `mutedHex` = `hsl(accentHue, 4%, 45%)` — warm-shifted muted gray
- `borderColor` = `hsl(accentHue, 8%, 88%)` — very light border tint

**When isDark is true:**
- `bgHex` = `hsl(accentHue, 14%, 10%)` — dark with subtle hue signature
  - Developer Tool (blue accent): `hsl(~180, 14%, 10%)` — deep teal-gray
  - Gaming (saturated warm accent): `hsl(~28, 14%, 10%)` — deep warm-black
- `surfaceHex` = computed as rgba string: `rgba(r, g, b, 0.07)` from accentRGB
  - Near-transparent panel over the dark background
- `textHex` = `hsl(accentHue, 8%, 88%)` — near-white with slight hue echo
- `mutedHex` = `hsl(accentHue, 6%, 52%)` — mid-range on dark background
- `borderColor` = `rgba(255, 255, 255, 0.12)` — subtle light border on dark
- `accentHex` lightness in dark mode: increase from the current `lerp(60, 48, technical/100)`
  to `lerp(62, 72, technical/100)` when isDark — accents need to be brighter to pop on dark

The accent lightness shift means Developer Tool (technical=85) goes from ~48% to ~70%
lightness — the cool blue accent becomes vivid and legible on the dark canvas.

### Files that change

**`src/engines/tokenEngine.js`:**
- Add `isDark` detection after the dial destructure
- Add `mutedHex` and `borderColor` computation (separate light and dark branches)
- Move `surfaceHex` from hardcoded `'#FFFFFF'` to computed value (both branches)
- Modify `accentHex` lightness formula to branch on `isDark`
- Add `mutedHex`, `borderColor` to the return value of `computeTokens`
- In `writeAllTokens`: add `el.style.setProperty('--arc-color-muted', mutedHex)`
  and `el.style.setProperty('--arc-color-border', borderColor)`
- In `applyTokensToDOM`: extend the crossfade trigger to also fire when
  `isDark` changes (not only when fontFamily changes). Track `displayedIsDark`
  alongside `displayedFont`. Condition: `requiresFade = fontChanging || darkModeChanging`

**`src/styles/arc-tokens.css`:**
- Remove the static `--arc-color-muted` and `--arc-color-border` values from
  the `#arc-canvas` block. These are now owned by the token engine.
  Keep them as fallback values only if needed (the engine writes on every dial change).
- `--arc-color-accent-subtle`: currently a static rgba. Move to the engine.
  When isDark: `rgba(r, g, b, 0.15)` (more visible on dark).
  When isLight: `rgba(r, g, b, 0.08)` (current behavior, but computed).

### Button text color edge case

`ArcInput.module.css` and `ArcEmptyState.module.css` use `color: var(--arc-color-bg)`
for button text. In light mode this produces near-white text on accent background (correct).
In dark mode `--arc-color-bg` becomes near-black — dark text on a bright accent.

This is actually fine for light accents on dark canvas (high contrast both ways). But
verify that the Developer Tool blue accent at lightness ~70% has sufficient contrast
against the dark bg color. If contrast fails, the fix is adding a dedicated
`--arc-color-on-accent` token that is always the correct foreground for the accent.
Flag this during Phase 2A verification before proceeding.

### What to verify after Phase 2A

1. Click Developer Tool preset: canvas goes dark, text inverts, accent is a vivid blue
2. Click Gaming preset: canvas goes dark, text inverts, accent is vivid warm/saturated
3. Click all other presets: canvas stays light, no regression
4. Drag technical dial manually past 75: canvas transitions to dark
5. Drag technical dial back below 75: canvas transitions to light
6. Font crossfade still works (dragging through a font zone change on dark background)
7. Button text contrast is readable on dark canvas

---

## Phase 2B — Surface Material Modes

### What it fixes

Even after Phase 2A, all cards have the same structure: `background-color: white surface`,
`border: 1px solid border-color`. A terminal panel should look like frosted glass
over a dark background. A gaming HUD card should have a neon-accent glow border.
A luxury editorial metric should have no visible border at all — pure whitespace.

### Four surface modes

These are derived from dial state in `computeTokens`, not set manually.

**Consumer (default)**
- Trigger: `!isDark && expressive < 70`
- `surfaceHex` = `#FFFFFF`
- `borderColor` = `hsl(accentHue, 8%, 88%)` (standard light border)
- `cardGlow` = `none`
- Result: clean, neutral app surface

**Editorial**
- Trigger: `!isDark && expressive >= 60 && energetic < 35`
  - Covers Luxury Editorial (expressive=65, energetic=15) ✓
  - Does not cover Creative Studio (energetic=70) or Kids App (energetic=80) ✓
- `surfaceHex` = `#FFFFFF` (surface itself stays white)
- `borderColor` = `rgba(0, 0, 0, 0.04)` — nearly invisible border
- `cardGlow` = `none`
- Result: cards float in whitespace with no visible container

**Terminal**
- Trigger: `isDark && technical > 75`
  - Covers Developer Tool (technical=85) ✓
  - Does not cover Gaming (technical=60, but Gaming triggers via expressive+energetic) ✓
- `surfaceHex` = `rgba(accentR, accentG, accentB, 0.06)` — nearly transparent
- `borderColor` = `rgba(255, 255, 255, 0.10)` — dim white hairline on dark
- `cardGlow` = `none` (terminals are matte, not glowing)
- Result: dark environment with translucent panel surfaces, hard hairlines

**Frosted/HUD**
- Trigger: `isDark && expressive >= 85 && energetic >= 85`
  - Covers Gaming ✓
  - Does not cover Developer Tool (expressive=25) ✓
- `surfaceHex` = `rgba(accentR, accentG, accentB, 0.12)` — accent-tinted glass
- `borderColor` = `rgba(accentR, accentG, accentB, 0.45)` — visible accent border
- `cardGlow` = `0 0 20px rgba(accentR, accentG, accentB, 0.25)` — neon ambient glow
- Result: gaming HUD with glowing accent-colored card frames

### New token: `--arc-card-shadow`

Write this as a box-shadow value. Components already have `transition` blocks —
add `box-shadow var(--arc-duration) var(--arc-easing)` to the transition list.

### Files that change

**`src/engines/tokenEngine.js`:**
- Add surface mode detection (derives from isDark + existing dial values)
- Add `cardGlow` computation (string: `'none'` or the glow value)
- `surfaceHex` computation already moved in Phase 2A — extend here with Editorial/Frosted branches
- Add `cardGlow` to computeTokens return value and writeAllTokens
  (`el.style.setProperty('--arc-card-shadow', cardGlow)`)

**`src/components/ArcCanvas/ArcMetrics/MetricCard/MetricCard.module.css`:**
- `.card`: add `box-shadow: var(--arc-card-shadow, none)` and add
  `box-shadow var(--arc-duration) var(--arc-easing)` to transition

**`src/components/ArcCanvas/ArcNav/ArcNav.module.css`:**
- `.nav`: add `box-shadow: var(--arc-card-shadow, none)` and transition

**`src/components/ArcCanvas/ArcChart/ArcChart.module.css`:**
- `.chart`: add `box-shadow: var(--arc-card-shadow, none)` and transition

**`src/components/ArcCanvas/ArcEmptyState/ArcEmptyState.module.css`:**
- `.card`: add `box-shadow: var(--arc-card-shadow, none)` and transition

**`src/styles/arc-tokens.css`:**
- Add `--arc-card-shadow: none` as default fallback in the `#arc-canvas` block

### Helper needed in tokenEngine.js

Converting accentHex to RGB components (needed for rgba() surface and border strings).
Add a small `hexToRgb(hex)` utility that returns `{ r, g, b }`. Use it in the surface
and border computations. This utility already exists implicitly in the `hslToHex` path —
add the inverse.

### What to verify after Phase 2B

1. Developer Tool: cards appear as near-transparent dark panels with hairline borders
2. Gaming: cards appear with tinted-accent surfaces and faint neon glow halos
3. Luxury Editorial: metric cards have no visible borders — content sits in whitespace
4. Corporate SaaS / Health / Creative: consumer surface, no regression
5. Drag expressive + energetic simultaneously to 90+: Gaming surface mode activates
6. All box-shadow transitions are smooth, no layout shift

---

## Phase 2C — Type Scale Multiplier

### What it fixes

Metric card values are hardcoded at `font-size: 2rem` in `MetricCard.module.css`.
Every preset shows the same-sized numbers. Kids App at 2rem is an adult dashboard.
Luxury Editorial at 2rem is too conservative. Developer Tool at 2rem wastes density.

### New token: `--arc-type-scale`

A multiplier. Default 1.0. Range 0.65 to 1.75.

### Formula

```js
const scaleUp   = lerp(0, 0.75, Math.max(0, playful - 50) / 50)
                  // 0 at playful=50, 0.75 at playful=100
                  // Playful=50 is the inflection: above it, type grows
const scaleDown  = lerp(0, 0.35, Math.max(0, technical - 60) / 40)
                  // 0 at technical=60, 0.35 at technical=100
                  // Technical > 60 triggers density compression

const typeScale = Math.max(0.65, Math.min(1.75, 1.0 + scaleUp - scaleDown))
```

### What this produces for the four key presets

| Preset | playful | technical | scaleUp | scaleDown | typeScale | metric value at 2rem |
|---|---|---|---|---|---|---|
| Kids App | 95 | 15 | 0.675 | 0 | 1.675 | 3.35rem (~54px) |
| Luxury Editorial | 10 | 65 | 0 | 0.044 | 0.956 | 1.91rem (~31px) |
| Developer Tool | 15 | 85 | 0 | 0.219 | 0.781 | 1.56rem (~25px) |
| Gaming | 85 | 60 | 0.525 | 0 | 1.525 | 3.05rem (~49px) |

Kids App: "4" renders at ~54px. Reads as a children's app metric, not a SaaS KPI.
Developer Tool: "4" renders at ~25px. Compact, dense, terminal-appropriate.
Gaming: "4" at ~49px with a neon glow border = HUD readout.
Luxury Editorial: essentially unchanged at 31px — editorial restraint.

### Files that change

**`src/engines/tokenEngine.js`:**
- Add `typeScale` computation using the formula above
- Add `typeScale` to computeTokens return value
- In `writeAllTokens`: `el.style.setProperty('--arc-type-scale', typeScale.toFixed(3))`

**`src/components/ArcCanvas/ArcMetrics/MetricCard/MetricCard.module.css`:**
- `.value`: change `font-size: 2rem` to `font-size: calc(2rem * var(--arc-type-scale, 1))`
- `.card`: add `align-items: flex-start` — at large scale the number needs to anchor top-left,
  not stretch vertically
- Consider adding `transition: font-size var(--arc-duration) var(--arc-easing)` — but
  `font-size` transition is less reliable than `transform`. Leave for Phase 2C verification.
  If font-size transition is janky, use `transform: scale(var(--arc-type-scale))` instead
  with a fixed-height container.

**`src/styles/arc-tokens.css`:**
- Add `--arc-type-scale: 1` as default fallback in the `#arc-canvas` block

### Secondary scale opportunities (post-verification, not blocking)

After the metric value is confirmed, these can extend the effect:
- `ArcChart.module.css` bar height max: currently `120px`. Could scale with
  `calc(120px * var(--arc-type-scale, 1))` for dramatic Kids App bars.
- `ArcNav.module.css` wordmark font-size: currently `1.1rem`. At Gaming/Kids App,
  the wordmark could be larger as a personality signal.
- These are non-blocking — metric value alone is the high-impact change.

### What to verify after Phase 2C

1. Kids App: metric values visually large, card expands to contain them, no overflow
2. Developer Tool: metric values compact, denser feel in the metrics row
3. Gaming: large values with neon glow from Phase 2B — HUD appearance
4. Luxury Editorial: slightly smaller than default, refined
5. Drag playful dial from 0 to 100: metric value visibly grows in real time (live)
6. Drag technical dial from 0 to 100: metric value visibly shrinks in real time (live)
7. No layout breaking — project list, chart, input sections not affected

---

## What this does NOT touch

- Component count or layout structure (nav + metrics + chart + list + input + empty)
- The tool chrome (panel, header, dials)
- Existing token formula for radius, spacing, font family, font weight, letter spacing,
  line height, motion duration, motion easing
- The copy engine or personality engine
- The export engine

All three phases are token-engine changes + targeted CSS variable additions in
existing component files. No new components, no architecture changes.

---

## Implementation session structure

**Session A (Phase 2A):**
1. Add `hexToRgb` utility to tokenEngine
2. Add `isDark` detection
3. Add `mutedHex`, `borderColor`, `accentSubtle` computation
4. Move `surfaceHex` from hardcoded to computed (light branch only in this session)
5. Update `writeAllTokens` to write muted + border
6. Update `applyTokensToDOM` crossfade trigger
7. Remove static muted/border from arc-tokens.css
8. Verify all 7 presets, button contrast check

**Session B (Phase 2B, only after Session A verified):**
1. Add `hexToRgb` usage for surface rgba computation
2. Add surface mode detection
3. Add `cardGlow` computation
4. Update surfaceHex for Terminal and Frosted modes
5. Write `--arc-card-shadow` from engine
6. Add `box-shadow` + `box-shadow` transition to 4 component CSS files
7. Verify all 7 presets, glow transitions

**Session C (Phase 2C, only after Session B verified):**
1. Add `typeScale` computation to tokenEngine
2. Write `--arc-type-scale`
3. Update MetricCard `.value` font-size
4. Add arc-tokens.css fallback
5. Verify live dragging, no layout breaks, consider secondary scale targets
