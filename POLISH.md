# Design Dial — Polish Backlog

Goal: "Make Design Dial feel like a design-language playground rather than a dashboard."

Root cause: the inspector-panel + preview-pane layout pattern, combined with
educational content rendered at the visual weight of settings labels, creates a
tool-operator frame instead of a playground frame.

---

## P0 — Core Identity Fixes

These are blocking. Until these ship, the product reads as a devtool.

### P0-1 — Personality words at display scale
**Current:** 18px / weight 500 / Outfit — reads as a status indicator
**Fix:** 36px / weight 600 / Outfit / letter-spacing -0.01em / height 42px
**Why:** These four words are the educational payoff of the entire product.
They need to stop the eye when they change. At 18px they're metadata.
At 36px they become the visual center of the panel.

### P0-2 — Preset chips preview personality before click
**Current:** Plain monospace text list, seven identical-looking entries
**Fix:** Each chip shows a colored accent dot (derived from the preset's token
output) and the first descriptor word right-aligned in muted text.
"Corporate SaaS" shows a steel-blue dot and "Focused" on the right.
"Kids App" shows a warm amber dot and "Playful" on the right.
The transformation preview starts before you click.
**Why:** The signature moment is clicking a preset. Right now there's no
invitation to that moment, no hint of what's on the other side.

### P0-3 — Header wordmark typography
**Current:** "DESIGN DIAL" in Geist Mono 13px uppercase — anonymous terminal label
**Fix:** "Design Dial" in Outfit 15px weight 600 sentence-case, letter-spacing -0.01em
**Why:** The wordmark is the only brand moment allowed in the tool chrome.
It should have a distinct voice. Using Outfit creates a deliberate visual
link between the product name and the personality descriptor words below.

### P0-4 — Panel section hierarchy
**Current:** Personality description, dials, and presets share identical visual
weight — same label size, same divider, same padding rhythm.
**Fix:** PersonalityDescription gets increased top padding (28px) and a clear
border-bottom that separates it as the "output" from the "controls" below.
DialGroup keeps its functional density. The section label "Dials" is dropped
(labels in the tracks are sufficient). The visual hierarchy becomes:
output (big words) → controls (dials) → shortcuts (presets).

### P0-5 — Personality description breathing room
**Current:** padding: 20px 20px 0 — cramped at every edge
**Fix:** padding: 28px 24px 0, wordList padding-bottom: 32px
**Why:** The words need white space to feel first-class. Currently they're
pushed against the panel edges at the same density as the controls below.

---

## P1 — Visual Differentiation

Strong improvements, implement after P0 is verified.

### P1-1 — Live accent swatch in the panel
A small live color circle (14px) next to "Current Design Language" that shows
`var(--arc-color-accent)` — updated whenever the token changes. Gives ambient
visual feedback about the color dimension without looking at Arc.
Requires reading `--arc-color-accent` from the DOM or passing accentHex prop.

### P1-2 — Dial track encodes axis semantics
Playful end of the track: slightly rounded track cap, warm tint.
Serious end: sharp cap, cool tint.
CSS-only change per track. Turns the dials from generic sliders into
teaching objects — you feel the axis through the visual, not just the label.

### P1-3 — Soften the panel/canvas border
Replace the hard 1px `#2A2620` divider with a box-shadow on the panel:
`box-shadow: 4px 0 20px rgba(0,0,0,0.45)`. Shifts the relationship from
"two panes side by side" to "overlay floating above environment."

### P1-4 — Export button more present
Current: muted text, muted border, almost invisible.
Fix: `color: rgba(240,234,214,0.7)`, `border-color: rgba(255,255,255,0.12)`.
Not prominent, but findable without hunting.

### P1-5 — Preset chip active state
When a preset is active, the chip name shifts to full `--tool-text` brightness
and the descriptor word shifts to the preset's accent color (not just brighter).
Creates a stronger feedback loop between the chip and Arc's current state.

---

## P2 — Depth and Environment

Implement after P1. These push from "polished tool" to "memorable playground."

### P2-1 — Personality description without a section label
Drop "CURRENT DESIGN LANGUAGE" entirely. The four large words speak for
themselves. The space freed strengthens the words further.
Risk: discoverability. Mitigate with a tooltip on the section if needed.

### P2-2 — Arc canvas bleeds edge-to-edge
Remove `padding: 48px` from ArcCanvas (or reduce to 24px) so Arc fills
more of its space. The current padded-white-box feel distances the demo.

### P2-3 — Dial thumb pulse on active preset transition
During the 300ms preset animation, the moving dial thumbs briefly glow
the preset's accent color before fading back to `--tool-text`.
Communicates "these dials are moving because of that preset."

### P2-4 — Personality section background differentiation
Very subtle: PersonalityDescription background at #131211 vs panel #111110.
2% brightness difference makes it read as a distinct zone without being noisy.

---

## P3 — Signature Moments

Implement last. These are the portfolio-showcase details.

### P3-1 — Preset names carry their personality in typography
"Playful" preset label renders in a slightly rounded weight.
"Serious" preset label renders in a tighter tracking.
The chip text participates in the personality system it represents.
This is a micro-interaction, not a feature.

### P3-2 — Empty state for "no preset selected"
When dials are at a custom position (no active preset), the personality
description shows a subtle "Custom" indicator — maybe a dim dot before the
first word. Visual signal that you're in freeform territory.

### P3-3 — Panel width responsiveness
On narrower viewports (1280px and below), panel narrows from 320px to 280px.
Below 1024px: panel becomes a bottom drawer or collapsible sidebar.

---

## Implementation Notes

- All P0 items are CSS or single-component changes. No new files.
- P1-1 requires passing `accentHex` prop down from App → PersonalityPanel → PersonalityDescription.
- P2-3 requires a change to `usePresetTransition`.
- P3-1 requires passing `dialState` into PresetGrid (it currently receives no state).
- Architecture is not touched at any priority level.
