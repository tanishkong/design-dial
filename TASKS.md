# Design Dial — Implementation Task List

One Claude Code session per task. 30–90 minutes each.
Foundation → Features → Polish. No task depends on an unfinished future task.

---

## Task 1 — Project Scaffold
**Goal:** Vite + React project initialised, folder structure in place, all five fonts preloaded, tool chrome CSS variables declared, static layout shell rendered.

**Why it exists:** Every downstream task depends on the folder structure, CSS variable system, and layout skeleton being correct from the start. Getting this wrong late is expensive.

**Definition of Done:**
- `npm create vite@latest` with React template, runs without errors
- Folder structure matches ARCHITECTURE.md exactly (`engines/`, `data/`, `hooks/`, `components/`, `styles/`)
- `index.html` preloads all five Google Fonts (Fredoka, Plus Jakarta Sans, Geist, IBM Plex Mono, Space Grotesk)
- `global.css` declares all `--tool-*` CSS variables from CLAUDE.md
- `arc-tokens.css` declares all `--arc-*` CSS variables at their default values (Geist font, neutral palette, 12px radius, 250ms duration)
- Static layout shell renders: `Header` (wordmark left, Export button right), `PersonalityPanel` (320px, dark, sticky), `ArcCanvas` (flex-1, scrollable) — all empty inside, no content yet
- `#arc-canvas` ID is applied to the ArcCanvas root element
- No console errors
- Committed

---

## Task 2 — Token Engine
**Goal:** `tokenEngine.js` implemented as a pure function. `applyTokensToDOM` wired. Default token values applied to `#arc-canvas` on mount.

**Why it exists:** This is the nervous system of the entire product. Every Arc component reads from CSS variables that this engine produces. Nothing visual works without it.

**Definition of Done:**
- `src/engines/tokenEngine.js` exports `computeTokens(dialState)` — pure function, no React imports, no side effects
- All token computations from ARCHITECTURE.md implemented: `radius`, `spaceUnit`, `fontFamily`, `fontWeight`, `letterSpacing`, `lineHeight`, `accentHex`, `bgHex`, `surfaceHex`, `textHex`, `duration`, `easing`
- All lerp calculations use correct dial weights from DESIGN.md
- Font archetype selection logic (5-zone priority order) implemented correctly
- `applyTokensToDOM(tokenSet)` writes all `--arc-*` variables to `#arc-canvas` via `style.setProperty` — no React state involved
- `App.jsx` calls `applyTokensToDOM` on mount with default dial values (`playful: 50, expressive: 50, warm: 50, energetic: 50`)
- Manually verify in browser devtools: `#arc-canvas` shows all `--arc-*` variables at expected default values
- No console errors
- Committed

---

## Task 3 — Deploy to Vercel
**Goal:** GitHub repo created, Vercel project connected, live deployment URL confirmed.

**Why it exists:** Deploying early catches environment issues before the codebase is large. All subsequent tasks ship to the same URL.

**Definition of Done:**
- GitHub repo created with all spec documents committed (`SPEC.md`, `DESIGN.md`, `ARCHITECTURE.md`, `CLAUDE.md`, `TASKS.md`)
- Vercel project connected to repo, auto-deploy on push enabled
- Live URL resolves and renders the layout shell without errors
- No build warnings in Vercel deployment log
- Committed

---

## Task 4 — Dial Components + useDialState
**Goal:** Four working personality dials rendered in `PersonalityPanel`. Dragging any dial updates `dialState`, calls `tokenEngine`, and applies CSS variables to `#arc-canvas` in real time.

**Why it exists:** This is the primary interaction. Without live dial → token → DOM update working end-to-end, nothing else can be validated.

**Definition of Done:**
- `useDialState` hook manages `{ playful, expressive, warm, energetic }` state (all initialised to 50)
- `Dial` component renders: axis label, current value readout, custom-styled range input (0–100)
- On drag: `tokenEngine.computeTokens(dialState)` called, `applyTokensToDOM(tokenSet)` called synchronously — no debounce
- All four dials rendered in `PersonalityPanel` with correct axis labels from DESIGN.md
- Dragging `warm` dial visibly shifts `--arc-color-accent` in browser devtools
- Dragging `playful` dial visibly shifts `--arc-radius`
- Dragging `energetic` dial visibly shifts `--arc-duration`
- `isAnimating` state exists on `useDialState` (false by default, used by preset system later)
- No console errors
- Committed and deployed

---

## Task 5 — Personality Engine + Copy Engine
**Goal:** `personalityEngine.js` and `copyEngine.js` implemented as pure functions. `wordBank.js` and `copyBank.js` data files complete.

**Why it exists:** `PersonalityDescription` (Task 6) and all Arc copy-bearing components (Task 8 onward) depend on these engines. They must be correct before any UI consumes them.

**Definition of Done:**
- `src/engines/personalityEngine.js` exports `resolveWords(dialState)` → `[string, string, string, string]` (one word per dial)
- `src/engines/personalityEngine.js` exports `resolveFont(dialState)` → font archetype string
- `src/data/wordBank.js` complete — all four axes, all five threshold ranges, matching DESIGN.md word bank exactly
- `src/engines/copyEngine.js` exports `resolveCopy(dialState)` → `CopyMap` object with all keys from DESIGN.md copy system: `cta`, `emptyHeadline`, `emptySubtext`, `addButton`, `navMain`, `metricActivity`, `metricProgress`
- `src/data/copyBank.js` complete — all copy variants from DESIGN.md
- Unit-test mentally: call `resolveWords({ playful: 15, expressive: 75, warm: 20, energetic: 65 })` → should return `['Playful', 'Expressive', 'Human', 'Dynamic']`
- Unit-test mentally: call `resolveWords({ playful: 50, expressive: 50, warm: 50, energetic: 50 })` → should return `['Balanced', 'Composed', 'Neutral', 'Balanced']`
- No React imports in any engine or data file
- No console errors
- Committed

---

## Task 6 — PersonalityDescription
**Goal:** `PersonalityDescription` component rendered at the top of `PersonalityPanel`, displaying four live descriptor words that crossfade when dial values change.

**Why it exists:** This is the educational layer — a first-class feature per the spec. It must exist and animate correctly before the preset system (Task 10) is built, because presets trigger the most prominent version of this animation.

**Definition of Done:**
- `PersonalityDescription` renders section label, divider, and four `DescriptorWord` components
- Words sourced from `personalityEngine.resolveWords(dialState)` on every dial change
- Each `DescriptorWord` crossfades (opacity 1→0→1) when its word changes: 100ms fade out, 100ms fade in
- Stagger: word 1 at 0ms, word 2 at 40ms, word 3 at 80ms, word 4 at 120ms
- Words styled per DESIGN.md: Outfit 18px weight 500, #F0EAD6
- Dragging any dial updates the correct word(s) within one frame of the drag event
- Visually verify: drag `playful` from 15 → 75, word 1 crossfades from 'Playful' → 'Friendly' → 'Balanced' → 'Focused'
- No layout shift during word crossfade (words have fixed height)
- No console errors
- Committed and deployed

---

## Task 7 — Arc Nav + Metric Cards
**Goal:** `ArcNav` and `ArcMetrics` (four `MetricCard` components) rendered on the Arc canvas, fully reading from CSS variables and copy engine.

**Why it exists:** First meaningful Arc content on screen. Validates that Arc components correctly consume `--arc-*` variables and that the token engine is producing visible output across multiple component types.

**Definition of Done:**
- `ArcNav` renders: Arc wordmark, three nav links, one CTA button
- ArcNav CTA text sourced from `copyEngine.resolveCopy(dialState).cta`
- Four `MetricCard` components render with fixed demo data: Active Projects (4), Ideas This Week (12), Hours Focused (23.5), Shipped (1)
- Metric labels sourced from `copyEngine.resolveCopy(dialState).metricActivity` and `.metricProgress` where applicable
- All Arc components use only `var(--arc-*)` for color, spacing, radius, font — zero hardcoded values in CSS modules
- `transition` declared explicitly per property in Arc component CSS modules (not `transition: all`)
- Dragging `warm` dial visibly changes Arc background and accent colour
- Dragging `playful` dial visibly changes card border-radius
- Dragging `expressive` dial visibly changes card padding density
- No console errors
- Committed and deployed

---

## Task 8 — Arc Chart
**Goal:** `ArcChart` rendered on the Arc canvas with seven bars (Mon–Sun), fully driven by CSS variables for color, radius, and motion.

**Why it exists:** The chart is the most visually complex Arc component and the one most affected by the `warm↔technical` and `calm↔energetic` axes. Validating it early prevents discovering problems during polish.

**Definition of Done:**
- `ArcChart` renders a bar chart with fixed data: `[2, 4, 3, 6, 5, 1, 0]` for Mon–Sun
- Chart section label rendered above bars
- Bar height proportional to value (max bar = 100% of chart height)
- Bar fill colour uses `var(--arc-color-accent)`
- Bar border-radius uses `var(--arc-radius-sm)` on top corners only
- Empty bar (Sunday, value 0) renders visibly as a zero-height bar with subtle empty state treatment
- Dragging `energetic` dial visibly changes bar transition speed (bars animate on hover using `var(--arc-duration)`)
- Dragging `warm` vs `technical` changes bar colour family
- No external chart library — built with CSS/div
- No console errors
- Committed

---

## Task 9 — Arc Project List, Input, and Empty State
**Goal:** `ArcProjectList` (four `ProjectRow` components with progress bars), `ArcInput`, and `ArcEmptyState` rendered on the Arc canvas. Full copy system wired across all components.

**Why it exists:** Completes the Arc demo interface. After this task, all six component types from the spec are on screen and responding to dials. The copy system is fully exercised.

**Definition of Done:**
- Four `ProjectRow` components render with fixed data from ARCHITECTURE.md: Design Dial (80%, UI Design), Brand System (60%, Branding), Misread (30%, Product), Steam Memories (10%, Case Study)
- `ProgressBar` uses `var(--arc-color-accent)` for fill, `var(--arc-radius-sm)` for shape
- `ArcInput` renders: text field (placeholder from `copyEngine.resolveCopy(dialState).inputPlaceholder`) and add button (label from `copyEngine.resolveCopy(dialState).addButton`)
- `ArcEmptyState` renders: icon placeholder, headline from `copyEngine.resolveCopy(dialState).emptyHeadline`, subtext from `copyEngine.resolveCopy(dialState).emptySubtext`, CTA from `copyEngine.resolveCopy(dialState).cta`
- All copy updates live when dials change
- Dragging `playful` vs `serious` changes at least two copy strings visibly on screen simultaneously
- Dragging `warm` vs `technical` changes at least one copy string visibly
- All components use only `var(--arc-*)` — no hardcoded values
- No console errors
- Committed and deployed

---

## Task 10 — Preset System
**Goal:** `PresetGrid` with seven `PresetChip` components rendered in `PersonalityPanel`. Clicking a preset triggers the choreographed transition: dial thumbs animate, personality words crossfade, Arc transitions — all simultaneously.

**Why it exists:** Presets are the signature moment of the product. They are how most users will first understand what the tool does. The choreography is designed — not incidental.

**Definition of Done:**
- `src/data/presets.js` complete — all seven presets with correct dial values from DESIGN.md
- `PresetGrid` renders seven `PresetChip` components with correct archetype labels (no brand names)
- `usePresetTransition` hook implements the full choreography sequence from ARCHITECTURE.md:
  - Step 1 (0ms): Dial thumb CSS transitions to new position (300ms, spring easing)
  - Step 2 (0ms, simultaneous): Personality words stagger-crossfade out then in (40ms between words)
  - Step 3 (0ms, simultaneous): `tokenEngine` + `applyTokensToDOM` fires — Arc transitions via CSS
  - Step 4 (300ms): `setDialState` synced to React state, `activePreset` set
  - Step 5 (350ms): `isAnimating` set to false
- Dial input is blocked (`isAnimating: true`) during preset transition — cannot drag while animating
- Active preset chip has a distinct active style
- Manually dialling after a preset click sets `activePreset` to `null`
- Visually verify: click 'Gaming' → click 'Luxury Editorial' — the contrast between the two transitions should feel dramatically different (Gaming: fast + bouncy, Luxury: slow + precise) because `--arc-duration` and `--arc-easing` drive the Arc transition speed
- No console errors
- Committed and deployed

---

## Task 11 — Export Engine + Export Drawer
**Goal:** `exportEngine.js` implemented. `ExportDrawer` renders with four tabs, formatted output for the current token set, copy-to-clipboard and file download working.

**Why it exists:** Export is a spec requirement and a key portfolio signal — it turns Design Dial from a toy into a tool. The engine is a pure function and straightforward; the drawer is the only UI complexity.

**Definition of Done:**
- `src/engines/exportEngine.js` exports four formatters: `formatTokens`, `formatColors`, `formatTypography`, `formatCSS` — all pure functions taking a `TokenSet`, returning a formatted string
- CSS formatter output matches the example in ARCHITECTURE.md (valid CSS custom properties block)
- JSON formatter output is valid, parseable JSON
- `ExportDrawer` opens as a right-side drawer (fixed position, 400px wide, slides in) when Export button in Header is clicked
- Four tabs render: Tokens · Colors · Typography · CSS
- Code block renders formatted output in IBM Plex Mono regardless of current dial state
- Export is a snapshot: output computed when drawer opens, not updated while drawer is open
- "Copy" button copies current tab output to clipboard via `navigator.clipboard.writeText`
- "Download" button triggers file download named `arc-tokens-{activePreset ?? 'custom'}.json`
- Drawer closes on click-outside or close button
- No console errors
- Committed and deployed

---

## Task 12 — Polish Sprint
**Goal:** Motion refinement, transition tuning, hover states, edge case handling, responsive pass, and final visual QA across all seven presets.

**Why it exists:** The gap between "working" and "portfolio-worthy" lives here. The preset choreography, personality word animation, and Arc transitions all need to feel considered, not mechanical.

**Definition of Done:**
- Walk through all seven presets in sequence — each transition feels meaningfully different from the last
- Gaming preset transition is noticeably faster and bouncier than Luxury Editorial — the dial values drive a perceptible difference in motion character
- Personality word crossfade has correct stagger (verify with slow-motion devtools animation inspector if needed)
- Arc Nav, Metric Cards, Chart, Project List, Input, and Empty State all respond visibly to every dial axis
- No Arc component has `transition: all` — only explicit property transitions
- Font switching produces no visible FOUT (opacity crossfade covers the switch)
- All copy strings update on dial change with no delay
- Export drawer slides in smoothly, does not cause layout shift
- Viewport at 1280px, 1440px, 1920px: layout holds, no overflow, no broken flex
- Viewport at 1024px: layout still usable (panel + canvas both visible)
- No console errors or warnings
- All `--arc-*` variables verified in devtools at each of the seven preset states — values are plausible and consistent
- Committed and deployed

---

## Task 13 — Final QA + Ship
**Goal:** Full product walkthrough against the SPEC.md success criteria. Any remaining issues fixed. Publicly shareable.

**Why it exists:** Shipping without a final pass against the original spec risks missing something that matters for the portfolio read.

**Definition of Done:**
- All five SPEC.md success criteria verified:
  - [ ] Adjusting any dial produces a visible Arc update within 100ms
  - [ ] All six demo component types respond to all four dials
  - [ ] Export produces valid, copy-pasteable output
  - [ ] A designer unfamiliar with the tool understands what it does within 10 seconds of landing
  - [ ] No loading states, no empty states (in the tool chrome), no auth friction
- Personality description is visible above the dials without scrolling on a 1080p display
- All seven preset chips are visible without scrolling in the panel
- Export drawer opens, all four tabs work, copy and download both function
- No hardcoded visual values anywhere in Arc component CSS modules (manual grep: `border-radius: [0-9]`, `color: #`, `padding: [0-9]` should return zero results in `components/Arc*`)
- Vercel deployment is production build (not dev server)
- URL is clean and shareable
- Committed, tagged v1.0, deployed
