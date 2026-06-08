# CLAUDE.md — Design Dial

## What this project is
Design Dial is a personality dial tool that transforms a fixed demo interface (Arc, a creative project tracker) in real time as the user adjusts four design personality axes. The core value is educational: designers watch a complete interface system shift and understand how abstract personality traits become concrete design decisions.

This is a frontend-only project. No backend. No API. No accounts.

---

## Stack
- React 18 + Vite
- CSS Modules (no Tailwind)
- Vercel (deploy at task 2–3)
- No external animation libraries

---

## Critical architecture rules

**Read these before writing any code.**

### 1. CSS variables are the single source of truth for Arc visuals
All Arc design properties live as CSS custom properties on `#arc-canvas`. When dials change, update variables via `element.style.setProperty()` — not React state, not inline styles. The browser handles transitions. This is what makes real-time feel instant.

### 2. Engines are pure functions
`tokenEngine`, `personalityEngine`, `copyEngine`, `exportEngine` live in `src/engines/`. They take dial values and return computed output. No React imports. No side effects. No DOM access. They are plain JS functions.

### 3. Arc components never contain hardcoded values
No hardcoded colors, spacing, radius, or font values in any Arc component or CSS module. Every visual property reads from a `--arc-*` CSS variable. If you catch yourself writing `border-radius: 8px` inside an Arc component, stop and use `border-radius: var(--arc-radius)` instead.

### 4. The personality description is first-class
`PersonalityDescription` is not a tooltip or sidebar detail. It is a primary UI element. It updates on every dial change. Its four words are the educational layer of the product.

### 5. Preset transitions are choreographed
When a preset is clicked, three things happen simultaneously:
- Dial thumbs animate to new positions (300ms spring)
- Personality words crossfade with stagger (40ms between words)
- Arc transitions via CSS variables (200ms)

This is a designed moment. Do not simplify it to a state swap.

---

## Reference documents
- `SPEC.md` — product scope and success criteria
- `DESIGN.md` — visual direction, token mapping, copy system, preset definitions
- `ARCHITECTURE.md` — component tree, state structure, all pipelines

Read all three before starting a build session. If a decision isn't in CLAUDE.md, ARCHITECTURE.md has the answer.

---

## File structure

```
src/
├── engines/          pure functions — no React
├── data/             static data — presets, wordBank, copyBank
├── hooks/            useDialState, usePresetTransition
├── components/       one folder per component, with CSS module
└── styles/           global.css, arc-tokens.css
```

---

## Design tokens (tool chrome)

```
Background:  #0E0C0A
Panel:       #111110
Border:      #2A2620
Text:        #F0EAD6
Muted:       #6B6560
Accent:      #F5A623
Font:        Geist Mono (labels), Outfit (values)
Radius:      4px
```

Arc visuals are fully dynamic. Tool chrome is fully static.

---

## Fonts (preloaded in index.html)
```
Fredoka           — playful zone
Plus Jakarta Sans — warm zone
Geist             — geometric / default
IBM Plex Mono     — technical zone
Space Grotesk     — expressive zone
```

All five loaded upfront. Font switching is instant — no FOUT.

---

## Do not
- Reach for a third-party animation library. CSS transitions + JS class toggling only.
- Debounce dial drag events. Updates must be real-time.
- Store derived values in React state. Compute them from `dialState` on every render.
- Use inline styles on Arc components. CSS variables only.
- Hardcode any visual value inside an Arc component.
- Add a backend, database, or auth of any kind.
- Add features outside SPEC.md scope without flagging first.

---

## Definition of done (per task)
- Feature works as specified in ARCHITECTURE.md
- No hardcoded visual values in Arc components
- CSS variable updates are DOM-direct, not React state
- Personality description updates correctly on dial change
- No console errors
- Committed and pushed
