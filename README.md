# Design Dial

**Most design systems start with components. This one starts with personality.**

Design Dial is a live design-system playground where four personality axes — Playful, Expressive, Warm, and Energetic — compute a complete set of design tokens in real time. Move a dial and watch the typography, color, geometry, motion, and surface mode of the entire UI update instantly.

→ **[Live demo](https://design-dial.vercel.app)**

---

## What it does

Four dials map to 14+ computed tokens via a deterministic token engine. The canvas re-renders on every change — no manual theme switching, no hardcoded presets driving the visuals.

The engine detects seven distinct design archetypes from the dial state and applies the appropriate visual language to each one:

| Archetype | Surface | Font | Mode |
|---|---|---|---|
| Corporate SaaS | Consumer light | Geist | Light |
| Developer Tool | Terminal | IBM Plex Mono | Dark |
| Gaming | Frosted glass | Syne | Dark |
| Kids App | Consumer light | Fredoka | Light |
| Health & Wellness | Consumer light | Plus Jakarta Sans | Light |
| Luxury Editorial | Editorial | Cormorant Garamond | Light |
| Creative Studio | Consumer light | Space Grotesk | Light |

---

## Token engine

Each dial position feeds into a set of interpolation functions that output:

- **Color** — accent hue, background, surface, text, muted, border
- **Typography** — font family, weight, type scale, letter spacing, line height
- **Geometry** — border radius, space unit
- **Motion** — duration, easing curve
- **Surface mode** — consumer / editorial / terminal / frosted glass

Dark mode is computed, not toggled. It activates when `technical > 75` (Developer Tool) or `expressive ≥ 85 && energetic ≥ 85` (Gaming). The frosted glass material only appears in that second branch.

---

## Features

- **Live token readout** — toggle "Live tokens" in the header to see every computed token update in real time as you move the dials
- **Compare mode** — split-screen any two personality states side by side
- **URL persistence** — dial state is encoded in the URL; every configuration is shareable
- **Export** — copy current tokens as CSS custom properties or W3C Design Tokens JSON (Figma-compatible)
- **Presets** — seven named archetypes with animated dial transitions
- **Randomize** — generates a random dial state with choreographed animation

---

## Stack

- React + Vite
- CSS Modules — no CSS-in-JS, no utility framework
- No animation library — all motion via CSS transitions and `cubic-bezier` curves
- No design token library — token engine written from scratch

---

## Running locally

```bash
npm install
npm run dev
```

---

## Project structure

```
src/
  engines/
    tokenEngine.js       # Dial state → computed tokens
    copyEngine.js        # Archetype detection → UI copy
    personalityEngine.js # Personality description words
  components/
    ArcCanvas/           # Live canvas — all 7 archetype layouts
    PersonalityPanel/    # Dials, presets, description
    Header/              # Export, compare, token toggle
    TokenReadout/        # Live token inspector panel
    IntroSplash/         # Entry screen
  hooks/
    useDialState.js      # Dial state + URL sync
    usePresetTransition.js # Animated preset switching
  data/
    presets.js           # Seven named dial configurations
    copyBank.js          # Per-archetype UI content
```

---

Built by [Tanishk](https://github.com/tanishkong) · 2025
