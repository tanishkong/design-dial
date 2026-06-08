# Design Dial — SPEC.md

## One-line definition
A personality dial tool that shows designers how abstract brand traits translate into a complete, living interface system — in real time.

## The signature moment
A designer adjusts a personality dial and watches typography, color, spacing, motion, and visual density all shift together. Not a color picker. Not a theme switcher. A design education moment: *"Oh. That's what personality means in UI."*

---

## Problem
Design students and junior designers understand abstract brand traits ("playful", "warm", "technical") in isolation. They struggle to connect those traits to concrete design decisions — the right typeface, the right spacing rhythm, the right motion speed, the right visual density. There's no tool that makes that relationship visible.

## Solution
A live interface with four personality dials. As you move a dial, the entire interface system updates simultaneously across every dimension: type, color, spacing, radius, motion, density. The insight comes from watching them all move together.

---

## Personality Dials

| Dial | Axis |
|------|------|
| 1 | Playful ↔ Serious |
| 2 | Minimal ↔ Expressive |
| 3 | Warm ↔ Technical |
| 4 | Calm ↔ Energetic |

Each dial is a value from 0–100. All four combine to produce a unified design token set.

### What each dial affects
- **Typography** — typeface choice, weight, letter-spacing, line-height
- **Color** — palette hue, saturation, contrast, accent selection
- **Spacing** — padding, gap, component density
- **Border radius** — from sharp/0 to pill-shaped/24px+
- **Motion** — transition duration, easing curve, entrance animation style
- **Visual density** — information per screen, element sizing, whitespace ratio

---

## Demo Interface

Fixed. No user uploads. Desktop-first, responsive support.

### Components
- Navigation bar (logo, links, CTA)
- Dashboard cards (metric cards × 3)
- Primary and secondary buttons
- Text input + dropdown
- Simple bar/line chart
- Empty state (illustration + CTA)

All six sections are visible simultaneously so the user can see the personality ripple across the entire system at once.

---

## Export
After dialing in a personality, the user can export:

- **Design tokens** (JSON)
- **CSS variables** (custom properties file)
- **Color palette** (named swatches + hex values)
- **Typography settings** (font stack, scale, weights)

Export is one-click. No account required.

---

## Audience
- Design students exploring visual systems
- Junior designers building taste
- Designers who can name a brand trait but struggle to translate it to concrete UI decisions

---

## What this demonstrates (portfolio read)
- **Product thinking** — a tool with a clear educational insight at its core
- **Design systems thinking** — four independent axes combining into a coherent token system
- **Visual design** — a demo interface that itself looks worth studying
- **Interaction design** — live-updating, zero-lag, satisfying to manipulate
- **Creative development** — frontend craft, not a generator

The person should leave thinking: *"That's a clever way to teach design language."*
Not: *"That's a nice slider tool."*

---

## Scope (hard limits)

### In
- 4 personality dials
- 1 fixed demo interface (6 component types)
- Live token recalculation
- Export (JSON tokens, CSS variables, type + color summary)
- Desktop-first, responsive

### Out
- User-uploaded interfaces
- AI generation
- Accounts / saved projects
- Backend / database
- Collaboration
- Mobile-first
- More than 4 dials at launch

---

## Stack
- React + Vite
- CSS modules (token-driven, no Tailwind for this project — too much inline token override complexity)
- Vercel (deploy at task 2–3)
- No external APIs

---

## Success criteria
- Adjusting any dial produces a visible, satisfying interface update within 100ms
- All six demo components respond to all four dials
- Export produces valid, copy-pasteable output
- A designer unfamiliar with the tool understands what it does within 10 seconds of landing
- No loading states, no empty states, no auth friction

---

## What this is NOT
- A theme generator
- A color palette tool
- A Figma plugin
- A mood board
- A design system builder

It is a **design education tool** that uses live interface transformation to teach the relationship between personality and design decisions.
