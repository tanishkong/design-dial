import { copyBank } from '../data/copyBank.js'

// Derive a content archetype from dial state.
// Priority order is load-bearing — do not reorder without re-verifying all 7 presets.
// Verification table:
//   Corporate SaaS  (p=20, e=30, w=25, en=35, t=75): t=75 not >75 → saas      ✓
//   Developer Tool  (p=15, e=25, w=15, en=55, t=85): t=85 > 75   → dev       ✓
//   Creative Studio (p=65, e=85, w=60, en=70, t=40): e≥70 && p≥50 → creative  ✓
//   Health&Wellness (p=45, e=40, w=80, en=20, t=20): w≥70 && en<40 → wellness  ✓
//   Luxury Editorial(p=10, e=65, w=35, en=15, t=65): isEditorial   → editorial ✓
//   Gaming          (p=85, e=90, w=40, en=95, t=60): e≥85 && en≥85 → gaming   ✓
//   Kids App        (p=95, e=80, w=85, en=80, t=15): p≥80 && w≥70  → kids     ✓
export function getArchetype(dialState) {
  const { playful, expressive, warm, energetic } = dialState
  const technical = 100 - warm
  const isDark = technical > 75 || (expressive >= 85 && energetic >= 85)
  const isEditorial = !isDark && expressive >= 60 && energetic < 35

  if (technical > 75)                              return 'dev'
  if (expressive >= 85 && energetic >= 85)         return 'gaming'
  if (playful >= 80 && warm >= 70)                 return 'kids'
  if (warm >= 70 && energetic < 40)                return 'wellness'
  if (isEditorial)                                 return 'editorial'
  if (expressive >= 70 && playful >= 50)           return 'creative'
  return 'saas'
}

export function resolveCopy(dialState) {
  const archetype = getArchetype(dialState)
  const bank = (key) => copyBank[key][archetype]

  return {
    // Existing fields — now archetype-driven
    cta:              bank('cta'),
    emptyHeadline:    bank('emptyHeadline'),
    emptySubtext:     bank('emptySubtext'),
    addButton:        bank('addButton'),
    navMain:          bank('navMain'),
    metricActivity:   bank('metricActivity'),
    metricProgress:   bank('metricProgress'),
    inputPlaceholder: bank('inputPlaceholder'),

    // New fields — expose previously hardcoded strings
    wordmark:         bank('wordmark'),
    progressStyle:    bank('progressStyle'),
    navLinks:         bank('navLinks'),
    metricHours:      bank('metricHours'),
    metricShipped:    bank('metricShipped'),
    chartLabel:       bank('chartLabel'),
    projectsLabel:    bank('projectsLabel'),
    projects:         bank('projects'),
    chartData:        bank('chartData'),
    metricValues:     bank('metricValues'),
    progressUnit:     bank('progressUnit'),
    sectionTeam:      bank('sectionTeam'),
  }
}
