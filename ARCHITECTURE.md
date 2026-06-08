# Design Dial — ARCHITECTURE.md

---

## Component Tree

```
App
├── Header
│   ├── Wordmark
│   └── ExportButton
│
├── Main  (flex row, full viewport height)
│   │
│   ├── PersonalityPanel  (320px, sticky, overflow-y: auto)
│   │   ├── PersonalityDescription
│   │   │   ├── SectionLabel ("CURRENT DESIGN LANGUAGE")
│   │   │   ├── Divider
│   │   │   └── DescriptorList
│   │   │       └── DescriptorWord × 4  (each animates independently)
│   │   │
│   │   ├── DialGroup
│   │   │   ├── SectionLabel ("DIALS")
│   │   │   └── Dial × 4
│   │   │       ├── DialLabel  (axis name + current value)
│   │   │       └── DialTrack  (custom range input)
│   │   │
│   │   └── PresetGrid
│   │       ├── SectionLabel ("PRESETS")
│   │       └── PresetChip × 7
│   │
│   └── ArcCanvas  (flex-1, overflow-y: scroll)
│       ├── ArcNav
│       │   ├── ArcWordmark
│       │   ├── ArcNavLinks
│       │   └── ArcNavCTA
│       │
│       ├── ArcMetrics
│       │   └── MetricCard × 4
│       │       ├── MetricLabel
│       │       └── MetricValue
│       │
│       ├── ArcChart
│       │   ├── ChartLabel
│       │   └── BarGroup (7 bars, Mon–Sun)
│       │
│       ├── ArcProjectList
│       │   ├── SectionHeader
│       │   └── ProjectRow × 4
│       │       ├── ProjectName
│       │       ├── ProjectTag
│       │       └── ProgressBar
│       │
│       ├── ArcInput
│       │   ├── InputField
│       │   └── AddButton
│       │
│       └── ArcEmptyState
│           ├── EmptyIcon
│           ├── EmptyHeadline
│           ├── EmptySubtext
│           └── EmptyStateCTA
│
└── ExportDrawer  (position: fixed, right, conditional)
    ├── DrawerHeader
    │   ├── DrawerTitle
    │   └── CloseButton
    ├── ExportTabs  (Tokens · Colors · Typography · CSS)
    └── ExportContent
        ├── CodeBlock  (syntax-highlighted output)
        ├── CopyButton
        └── DownloadButton
```

---

## State Structure

All state lives in `App`. Passed down as props or via context.

```ts
// Primary state — source of truth
interface DialState {
  playful:    number  // 0–100
  expressive: number  // 0–100
  warm:       number  // 0–100
  energetic:  number  // 0–100
}

// UI state
interface UIState {
  activePreset:  string | null   // preset name or null if custom
  exportOpen:    boolean
  exportTab:     'tokens' | 'colors' | 'typography' | 'css'
  isAnimating:   boolean         // true during preset transition, blocks input
}
```

### Derived state — computed synchronously from DialState

Never stored in state. Always computed on read.

```ts
// Resolved by tokenEngine.js
tokens: TokenSet

// Resolved by personalityEngine.js
personalityWords: [string, string, string, string]  // one per dial
fontFamily: FontArchetype

// Resolved by copyEngine.js
copy: CopyMap

// Resolved by exportEngine.js (only when drawer open)
exportOutput: Record<ExportTab, string>
```

**Rule:** No derived value touches `useState`. Derived values are functions of `dialState`. Components call the engine functions directly or receive results as props.

---

## File Structure

```
src/
├── main.jsx
├── App.jsx
│
├── engines/
│   ├── tokenEngine.js        # dialState → TokenSet (CSS var values)
│   ├── personalityEngine.js  # dialState → words + font archetype
│   ├── copyEngine.js         # dialState → CopyMap (UI strings)
│   └── exportEngine.js       # TokenSet → formatted export strings per tab
│
├── data/
│   ├── presets.js            # preset definitions (name + dial values)
│   ├── wordBank.js           # descriptor word thresholds per dial
│   └── copyBank.js           # copy variants per personality zone
│
├── hooks/
│   ├── useDialState.js       # manages dialState + CSS var sync
│   └── usePresetTransition.js # choreographs preset animation sequence
│
├── components/
│   ├── Header/
│   ├── PersonalityPanel/
│   │   ├── PersonalityDescription/
│   │   ├── DialGroup/
│   │   │   └── Dial/
│   │   └── PresetGrid/
│   │       └── PresetChip/
│   ├── ArcCanvas/
│   │   ├── ArcNav/
│   │   ├── ArcMetrics/
│   │   │   └── MetricCard/
│   │   ├── ArcChart/
│   │   ├── ArcProjectList/
│   │   │   └── ProjectRow/
│   │   ├── ArcInput/
│   │   └── ArcEmptyState/
│   └── ExportDrawer/
│       └── ExportTabs/
│
└── styles/
    ├── global.css            # resets, body, tool chrome vars
    ├── arc-tokens.css        # all --arc-* CSS variable declarations + transitions
    └── [Component].module.css per component
```

---

## CSS Variable System

All Arc visual properties are CSS custom properties declared on `#arc-canvas`.
The tool chrome (panel, header) uses a separate fixed variable set declared on `:root`.

### Arc variables (dynamic — updated by tokenEngine)

```css
#arc-canvas {
  /* Geometry */
  --arc-radius:         12px;
  --arc-radius-sm:      calc(var(--arc-radius) * 0.5);
  --arc-radius-lg:      calc(var(--arc-radius) * 1.5);

  /* Spacing */
  --arc-space-unit:     16px;
  --arc-space-xs:       calc(var(--arc-space-unit) * 0.5);
  --arc-space-sm:       calc(var(--arc-space-unit) * 0.75);
  --arc-space-md:       var(--arc-space-unit);
  --arc-space-lg:       calc(var(--arc-space-unit) * 1.5);
  --arc-space-xl:       calc(var(--arc-space-unit) * 2.5);

  /* Color */
  --arc-color-accent:   #F5A623;
  --arc-color-bg:       #FAFAF9;
  --arc-color-surface:  #FFFFFF;
  --arc-color-text:     #1A1A18;
  --arc-color-muted:    #6B6560;
  --arc-color-border:   #E5E2DC;
  --arc-color-accent-subtle: rgba(245, 166, 35, 0.08);

  /* Typography */
  --arc-font-family:    'Geist', sans-serif;
  --arc-font-weight:    400;
  --arc-letter-spacing: 0em;
  --arc-line-height:    1.55;

  /* Motion */
  --arc-duration:       250ms;
  --arc-easing:         cubic-bezier(0.4, 0, 0.2, 1);

  /* Transitions — applied to all Arc children */
  transition:
    background-color var(--arc-duration) var(--arc-easing),
    color            var(--arc-duration) var(--arc-easing),
    border-color     var(--arc-duration) var(--arc-easing),
    border-radius    var(--arc-duration) var(--arc-easing),
    padding          var(--arc-duration) var(--arc-easing),
    font-family      var(--arc-duration) var(--arc-easing);
}
```

### Tool chrome variables (static — declared on :root)

```css
:root {
  --tool-bg:           #0E0C0A;
  --tool-panel:        #111110;
  --tool-border:       #2A2620;
  --tool-text:         #F0EAD6;
  --tool-muted:        #6B6560;
  --tool-accent:       #F5A623;
  --tool-font:         'Geist Mono', monospace;
  --tool-radius:       4px;
}
```

### Transition strategy
Arc components use `transition: all var(--arc-duration) var(--arc-easing)` sparingly — only on properties that actually change. Over-transitioning causes visual glitches. Each component's CSS module declares only the properties it animates.

---

## Token Pipeline

```
User moves dial
      │
      ▼
useDialState.js (onChange handler)
      │
      ├──▶ setDialState(newValues)            [React state]
      │
      └──▶ tokenEngine.compute(newDialState)
                  │
                  ▼
            TokenSet object
            {
              radius, spaceUnit, accentHex,
              bgHex, surfaceHex, textHex,
              fontFamily, fontWeight,
              letterSpacing, lineHeight,
              duration, easing
            }
                  │
                  ▼
            applyTokensToDOM(tokenSet)         [direct DOM write]
            document
              .getElementById('arc-canvas')
              .style.setProperty('--arc-radius', `${tokenSet.radius}px`)
              // ... (one call per variable)
```

**Critical:** CSS variable updates are written directly to the DOM via `style.setProperty`. This bypasses React's reconciliation entirely. Arc updates in the same frame as the dial drag event. No debounce. No batching delay.

`tokenEngine.js` is a pure function: `(DialState) → TokenSet`. No side effects. Fully testable.

---

## Personality Pipeline

```
dialState
    │
    ▼
personalityEngine.js
    │
    ├── resolveWord(dial, value)  ×4   → string[]  (4 descriptor words)
    └── resolveFont(dialState)         → FontArchetype string

Words passed to PersonalityDescription as props.
On change: each DescriptorWord fades out (100ms) then fades in with new word (100ms).
Stagger: 40ms between words (word 1 starts at 0ms, word 4 starts at 120ms).
```

```js
// wordBank.js structure
export const wordBank = {
  playful: [
    { max: 20,  word: 'Playful'   },
    { max: 40,  word: 'Friendly'  },
    { max: 60,  word: 'Balanced'  },
    { max: 80,  word: 'Focused'   },
    { max: 100, word: 'Serious'   },
  ],
  expressive: [ ... ],
  warm:       [ ... ],
  energetic:  [ ... ],
}

export function resolveWord(axis, value) {
  return wordBank[axis].find(entry => value <= entry.max).word
}
```

---

## Preset Pipeline

```
User clicks PresetChip
      │
      ▼
usePresetTransition.js
      │
      ├── setIsAnimating(true)           [block dial input]
      │
      ├── Step 1 (0ms):
      │     animate dial thumbs to preset values
      │     duration: 300ms, easing: spring
      │
      ├── Step 2 (0ms, simultaneous):
      │     trigger personality word crossfade
      │     (stagger 40ms per word)
      │
      ├── Step 3 (0ms, simultaneous):
      │     call tokenEngine + applyTokensToDOM
      │     Arc transitions via CSS (200ms)
      │
      ├── Step 4 (300ms):
      │     setDialState(presetValues)   [sync React state]
      │     setActivePreset(presetName)
      │
      └── Step 5 (350ms):
            setIsAnimating(false)        [re-enable input]
```

Dial thumb animation is CSS-driven: apply `transition: left 300ms cubic-bezier(0.34, 1.56, 0.64, 1)` to the thumb, then update the CSS custom property controlling thumb position.

```js
// presets.js structure
export const presets = [
  {
    id: 'corporate-saas',
    label: 'Corporate SaaS',
    dials: { playful: 20, expressive: 30, warm: 25, energetic: 35 },
  },
  {
    id: 'developer-tool',
    label: 'Developer Tool',
    dials: { playful: 15, expressive: 25, warm: 15, energetic: 55 },
  },
  // ...
]
```

---

## Export Pipeline

```
User opens ExportDrawer
      │
      ▼
exportEngine.js receives current TokenSet
      │
      ├── formatTokens(tokenSet)     → JSON string
      ├── formatColors(tokenSet)     → JSON string
      ├── formatTypography(tokenSet) → JSON string
      └── formatCSS(tokenSet)        → CSS custom properties string

Output cached in component state while drawer is open.
Re-computed only when drawer reopens (not on dial drag — export is a snapshot).

Copy: navigator.clipboard.writeText(output)
Download: Blob + URL.createObjectURL → anchor click
  filename: `arc-tokens-${activePreset ?? 'custom'}.json`
```

```js
// exportEngine.js — formatCSS example output
`:root {
  --arc-radius: 18px;
  --arc-space-unit: 20px;
  --arc-color-accent: #F5A623;
  --arc-color-bg: #FAFAF9;
  --arc-font-family: 'Plus Jakarta Sans', sans-serif;
  --arc-font-weight: 400;
  --arc-duration: 280ms;
}`
```

---

## Key Constraints

1. **No CSS variable updates through React state.** Arc visuals update via direct DOM writes only.
2. **No external libraries for animation.** CSS transitions + JS-controlled class toggling only.
3. **No backend, no API calls, no localStorage.**
4. **tokenEngine, personalityEngine, copyEngine, exportEngine are pure functions.** No React imports. No side effects. Independently testable.
5. **All Arc components read from CSS variables only.** No inline styles on Arc components. No hardcoded color/spacing/radius values anywhere in Arc CSS modules.
6. **Font loading via Google Fonts link tag (all 5 fonts preloaded in index.html).** No dynamic font injection.
