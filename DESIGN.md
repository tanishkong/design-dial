# Design Dial — DESIGN.md

## Design Intent

Design Dial is a tool that teaches. Its own UI should feel like a precision instrument — dark, restrained, confident. The chrome disappears. Arc is what lives.

The visual hierarchy is:
1. Arc (the transforming demo product) — dominant, centre stage
2. Personality description — first-class, always visible, updates live
3. Dials — secondary chrome, functional not decorative
4. Export — tertiary, discoverable

---

## Layout

```
┌─────────────────────────────────────────────────────────┐
│  Design Dial                               Export ↗      │ ← Header (48px, fixed)
├──────────────────────────┬──────────────────────────────┤
│                          │                              │
│   PERSONALITY PANEL      │     ARC DEMO CANVAS          │
│   (320px, sticky)        │     (scrollable)             │
│                          │                              │
│   ── Current Language ── │   [ Nav ]                    │
│                          │                              │
│   Friendly               │   [ Metric Cards × 3 ]       │
│   Expressive             │                              │
│   Energetic              │   [ Chart ]                  │
│   Human                  │                              │
│                          │   [ Project List ]           │
│   ── Dials ──            │                              │
│                          │   [ Input ]                  │
│   Playful ──●────── Serious│                              │
│   Minimal ──────●── Expressive│   [ Empty State ]            │
│   Warm ●──────── Technical│                              │
│   Calm ──────●── Energetic│                              │
│                          │                              │
│   ── Presets ──          │                              │
│                          │                              │
│   [ Corporate SaaS ]     │                              │
│   [ Developer Tool ]     │                              │
│   [ Creative Studio ]    │                              │
│   [ Health & Wellness ]  │                              │
│   [ Luxury Editorial ]   │                              │
│   [ Gaming ]             │                              │
│   [ Kids App ]           │                              │
│                          │                              │
└──────────────────────────┴──────────────────────────────┘
```

**Panel:** 320px fixed, sticky, dark surface (#111110), right border 1px #2A2620
**Canvas:** flex-1, scrollable, padded 48px, background shifts with Arc's personality
**Header:** 48px, #0E0C0A, Design Dial wordmark left, Export CTA right

---

## Design Dial — Tool Chrome Aesthetic

The tool's own UI is not the story. It should be:

- **Dark mode only.** Background: #0E0C0A. Panel: #111110.
- **Typographically quiet.** Labels in Geist Mono, 11px, #6B6560, uppercase, tracked.
- **Zero decoration.** No gradients, no shadows, no borders on the panel interior.
- **Functional controls only.** Dials are custom range inputs, minimal thumb, no flashy design.

The only brand moment allowed in the tool chrome is the wordmark. Everything else recedes.

---

## Personality Description System

**This is a first-class feature. It lives at the top of the personality panel, above the dials.**

### Structure
```
CURRENT DESIGN LANGUAGE
─────────────────────────
Friendly
Expressive
Energetic
Human
```

- Section label: Geist Mono, 10px, #6B6560, uppercase, letter-spacing 0.1em
- Divider: 1px #2A2620, full panel width
- Descriptors: 4 active words, one per line
- Word style: 18px, weight 500, #F0EAD6, Outfit
- Transition: each word fades and crossfades to new descriptor on dial change (200ms opacity)

### Word Bank
Each dial position resolves to a descriptor word. Four dials = four words displayed simultaneously.

**Playful ↔ Serious**
```
0–20:  Playful
20–40: Friendly
40–60: Balanced
60–80: Focused
80–100: Serious
```

**Minimal ↔ Expressive**
```
0–20:  Restrained
20–40: Considered
40–60: Composed
60–80: Expressive
80–100: Bold
```

**Warm ↔ Technical**
```
0–20:  Human
20–40: Warm
40–60: Neutral
60–80: Precise
80–100: Technical
```

**Calm ↔ Energetic**
```
0–20:  Calm
20–40: Steady
40–60: Balanced
60–80: Dynamic
80–100: Energetic
```

So a dial state of Playful:15, Expressive:75, Warm:20, Energetic:65 reads:
```
CURRENT DESIGN LANGUAGE
─────────────────────────
Playful
Expressive
Human
Dynamic
```

**Interaction note:** When a preset is clicked, the four words animate out (stagger 40ms each, slide up + fade) then the new words animate in (slide down + fade). This moment is the educational payoff. It should feel ceremonial.

---

## Font Stack

Five font families loaded via Google Fonts. Zone-based selection — not interpolated.

| Zone trigger | Font | Fallback |
|---|---|---|
| Playful > 65 | Fredoka | sans-serif |
| Warm > 50, Playful ≤ 65 | Plus Jakarta Sans | sans-serif |
| Default / Geometric | Geist | sans-serif |
| Technical > 70 | IBM Plex Mono | monospace |
| Expressive > 70, Playful ≤ 65 | Space Grotesk | sans-serif |

**Selection logic (priority order):**
1. If Technical > 70 → IBM Plex Mono
2. Else if Playful > 65 → Fredoka
3. Else if Expressive > 70 → Space Grotesk
4. Else if Warm > 50 → Plus Jakarta Sans
5. Default → Geist

Font transitions: apply new font-family on body with a 150ms opacity crossfade to avoid FOUT jank.

---

## Token Mapping (Implementation Reference)

### Border Radius
```js
radius.base = lerp(1, 20, playful/100) + lerp(0, 4, warm/100)
// 1px (cold/serious) → 24px (playful/warm)
```

### Spacing Scale
```js
space.unit = lerp(12, 24, expressive/100)   // base unit in px
space.density = lerp(1, 0.65, energetic/100) // multiplier
// Applied: padding = space.unit * space.density
```

### Motion
```js
motion.duration = lerp(400, 100, energetic/100)   // ms
motion.easing:
  playful > 60 && energetic > 60 → cubic-bezier(0.34, 1.56, 0.64, 1)  // spring
  serious > 60 && energetic > 60 → cubic-bezier(0.4, 0, 0.6, 1)       // snappy
  playful > 60 && calm > 60      → cubic-bezier(0.34, 1.2, 0.64, 1)   // gentle bounce
  default                        → cubic-bezier(0.4, 0, 0.2, 1)        // material standard
```

### Color
```js
color.saturation = lerp(15, 90, expressive/100)
color.contrast   = lerp(4.5, 9, technical/100)

// Hue direction:
// warm > 50 → amber/coral/terracotta family
// technical > 50 → blue/slate/cyan family
// neutral zone → stone/grey

// Background:
// expressive > 60 → tinted surface (hsl of accent at 8% opacity)
// default → neutral (#FAFAF9 light / #0E0C0A dark)
```

### Typography Scale
```js
type.weight.body    = lerp(300, 700, energetic/100)
type.letterSpacing  = lerp(0, 0.12, technical/100)  // em, applied to labels/caps
type.lineHeight     = lerp(1.3, 1.8, warm/100)
```

---

## Arc — Demo Product Design

### Product identity
Arc is a creative project tracker. It tracks what someone is making: active projects, ideas logged, hours focused, things shipped.

The product name "Arc" is displayed in Arc's own navigation. As personality shifts, the wordmark's typeface, weight, and colour shift with the system.

### Demo data (fixed, realistic)
```
Metric cards:
  Active Projects: 4
  Ideas This Week: 12
  Hours Focused: 23.5
  Shipped: 1

Chart: Weekly creative output (Mon–Sun)
  Bar heights: 2, 4, 3, 6, 5, 1, 0

Project list:
  Design Dial        ████████░░  80%   UI Design
  Brand System       ██████░░░░  60%   Branding
  Misread            ███░░░░░░░  30%   Product
  Steam Memories     █░░░░░░░░░  10%   Case Study

Empty state:
  Section: "Collaborators"
  State: No collaborators added yet
```

### Copy adaptation
Key UI strings resolve from dial state:

```js
copy.cta = {
  playful_warm:    "Ready to jump in?",
  playful_tech:    "Start building",
  serious_warm:    "Let's get started",
  serious_tech:    "Initialize workspace",
  default:         "Create project"
}

copy.emptyHeadline = {
  playful:   "Nothing here yet!",
  serious:   "No collaborators found",
  warm:      "You're flying solo right now",
  technical: "0 collaborators"
}

copy.addButton = {
  calm:      "Add",
  energetic: "+ New",
  playful:   "Let's go",
  serious:   "Create"
}
```

---

## Preset Definitions

| Preset | Playful | Expressive | Warm | Energetic | Personality reads as |
|---|---|---|---|---|---|
| Corporate SaaS | 20 | 30 | 25 | 35 | Focused · Considered · Precise · Steady |
| Developer Tool | 15 | 25 | 15 | 55 | Serious · Restrained · Technical · Dynamic |
| Creative Studio | 65 | 85 | 60 | 70 | Playful · Bold · Warm · Dynamic |
| Health & Wellness | 45 | 40 | 80 | 20 | Friendly · Considered · Human · Calm |
| Luxury Editorial | 10 | 65 | 35 | 15 | Serious · Expressive · Neutral · Calm |
| Gaming | 85 | 90 | 40 | 95 | Playful · Bold · Neutral · Energetic |
| Kids App | 95 | 80 | 85 | 80 | Playful · Bold · Human · Energetic |

Preset chips live below the dials in the personality panel. On click:
1. Dial thumbs animate to new positions (300ms, spring easing)
2. Personality words crossfade (staggered 40ms)
3. Arc transitions (CSS variable update, 200ms)

All three happen simultaneously. This is the signature moment.

---

## Motion Principles

**Rule 1: Arc transitions on CSS variable change, not component remount.**
Every visual property is a CSS variable. When dials move, variables update. The browser handles the transition. No React re-renders for visual changes.

**Rule 2: Dials are real-time. No debounce.**
The update loop is: drag → update CSS vars → browser repaints. Under 16ms.

**Rule 3: The preset moment is choreographed.**
Dial animation → personality word swap → Arc transition, all within 300ms, all coordinated. This is not accidental — it's designed.

**Rule 4: Motion adapts to the Calm↔Energetic dial.**
Arc's own transition duration is driven by the `motion.duration` token. A Calm preset transforms slowly and gracefully. A Gaming preset snaps.

---

## Export Design

Export panel opens as a right-side drawer (not a modal — modals interrupt, drawers extend).

Four tabs: Tokens · Colors · Typography · CSS

```
EXPORT  ×
────────────────────────
[ Tokens ] [ Colors ] [ Typography ] [ CSS ]

{
  "radius.base": "18px",
  "space.unit": "20px",
  "color.accent": "#F5A623",
  ...
}

[ Copy JSON ]  [ Download .json ]
```

- Drawer width: 400px
- Syntax highlighted using a monospace font (IBM Plex Mono regardless of dial state)
- One-click copy per tab
- Download generates a named file: `arc-tokens-creative-studio.json`

---

## What Good Looks Like

A designer who lands on Design Dial should:

1. See Arc immediately — a real interface, not a placeholder
2. Notice the personality description before they touch anything
3. Click a preset and feel the transformation physically — type, color, spacing, motion, copy, all at once
4. Read the personality words and think *"yes, that's exactly what that feels like"*
5. Start moving dials manually to explore
6. Export something and feel like they learned something they'll use

The measure of success is not "did the sliders work."
It's "did the designer leave with a new mental model."
