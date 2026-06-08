function lerp(a, b, t) {
  return a + (b - a) * Math.max(0, Math.min(1, t));
}

function hslToHex(h, s, l) {
  s /= 100;
  l /= 100;
  const a = s * Math.min(l, 1 - l);
  const f = (n) => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color).toString(16).padStart(2, '0');
  };
  return `#${f(0)}${f(8)}${f(4)}`;
}

function hexToRgb(hex) {
  return {
    r: parseInt(hex.slice(1, 3), 16),
    g: parseInt(hex.slice(3, 5), 16),
    b: parseInt(hex.slice(5, 7), 16),
  };
}

export function computeTokens(dialState) {
  const { playful, expressive, warm, energetic } = dialState;
  const technical = 100 - warm;
  const serious = 100 - playful;
  const calm = 100 - energetic;

  // ── Dark mode detection ──────────────────────────────────────────────────
  // Developer Tool: technical > 75 (warm=15 → technical=85)
  // Gaming:         expressive >= 85 && energetic >= 85 (expressive=90, energetic=95)
  const isDark = technical > 75 || (expressive >= 85 && energetic >= 85);

  // ── Surface mode detection ────────────────────────────────────────────────
  // Four mutually exclusive modes derived from dial state.
  // Terminal and Frosted are sub-branches of isDark — they never overlap.
  // Editorial is a sub-branch of !isDark — also never overlaps Consumer.
  const isTerminal = isDark && technical > 75;
  const isFrosted  = isDark && expressive >= 85 && energetic >= 85;
  const isEditorial = !isDark && expressive >= 60 && energetic < 35;
  // Consumer = !isDark && !isEditorial (the default light branch)

  // ── Geometry ─────────────────────────────────────────────────────────────
  const radius = lerp(1, 20, playful / 100) + lerp(0, 4, warm / 100);

  // ── Spacing ──────────────────────────────────────────────────────────────
  const spaceUnit = Math.round(lerp(12, 24, expressive / 100));

  // ── Font ─────────────────────────────────────────────────────────────────
  let fontFamily;
  if (technical > 70) {
    fontFamily = "'IBM Plex Mono', monospace";
  } else if (playful > 65) {
    fontFamily = "'Fredoka', sans-serif";
  } else if (expressive > 70) {
    fontFamily = "'Space Grotesk', sans-serif";
  } else if (warm > 50) {
    fontFamily = "'Plus Jakarta Sans', sans-serif";
  } else {
    fontFamily = "'Geist', sans-serif";
  }

  // ── Typography ───────────────────────────────────────────────────────────
  const fontWeight    = Math.round(lerp(300, 700, energetic / 100));
  const letterSpacing = lerp(0, 0.12, technical / 100);
  const lineHeight    = lerp(1.3, 1.8, warm / 100);

  // ── Type scale ────────────────────────────────────────────────────────────
  // scaleUp:   playful > 50 → larger, more expressive type (max +0.75 at playful=100)
  // scaleDown: technical > 60 → denser, more compact type (max -0.35 at technical=100)
  // Range clamped to [0.65, 1.75] per spec.
  const scaleUp   = lerp(0, 0.75, Math.max(0, playful - 50) / 50);
  const scaleDown = lerp(0, 0.35, Math.max(0, technical - 60) / 40);
  const typeScale = Math.max(0.65, Math.min(1.75, 1.0 + scaleUp - scaleDown));

  // ── Motion ───────────────────────────────────────────────────────────────
  const duration = Math.round(lerp(400, 100, energetic / 100));

  let easing;
  if (playful > 60 && energetic > 60) {
    easing = 'cubic-bezier(0.34, 1.56, 0.64, 1)'; // spring
  } else if (serious > 60 && energetic > 60) {
    easing = 'cubic-bezier(0.4, 0, 0.6, 1)';       // snappy
  } else if (playful > 60 && calm > 60) {
    easing = 'cubic-bezier(0.34, 1.2, 0.64, 1)';   // gentle bounce
  } else {
    easing = 'cubic-bezier(0.4, 0, 0.2, 1)';        // material standard
  }

  // ── Color ────────────────────────────────────────────────────────────────
  // Hue: blue (technical=100) → amber (neutral) → terracotta (warm=100)
  let accentHue;
  if (warm >= 50) {
    accentHue = lerp(35, 20, (warm - 50) / 50); // amber → terracotta
  } else {
    accentHue = lerp(215, 35, warm / 50);         // blue → amber
  }

  // Editorial accent override: warm stone neutral instead of yellow-green.
  // The standard hue formula lands on ~89° (yellow-green) for Luxury Editorial
  // (warm=35). That reads as "tech startup." Editorial needs desaturated warm stone.
  const accentSat = isEditorial
    ? lerp(8, 18, expressive / 100)      // ~13.7% at expressive=65 — muted stone
    : lerp(15, 90, expressive / 100);

  if (isEditorial) {
    accentHue = 35; // warm amber/stone pole — overrides the lerp(215,35) result above
  }

  // Dark branch: brighter accent to pop on dark canvas.
  // Light branch: existing formula (60% → 48% as technical rises).
  const accentLight = isDark
    ? lerp(65, 70, technical / 100)
    : lerp(60, 48, technical / 100);

  const accentHex = hslToHex(accentHue, accentSat, accentLight);
  const { r: aR, g: aG, b: aB } = hexToRgb(accentHex);

  // ── Canvas background ─────────────────────────────────────────────────────
  let bgHex;
  if (isDark) {
    bgHex = hslToHex(accentHue, 14, 10);
  } else if (expressive > 60) {
    bgHex = hslToHex(accentHue, Math.min(accentSat * 0.25, 20), 97);
  } else {
    bgHex = '#FAFAF9';
  }

  // ── Card / panel surface ──────────────────────────────────────────────────
  // Terminal:  near-transparent dark glass (matte — less opaque than Frosted)
  // Frosted:   accent-tinted glass (more opaque — color reads through)
  // Consumer / Editorial: pure white
  let surfaceHex;
  if (isTerminal) {
    surfaceHex = `rgba(${aR}, ${aG}, ${aB}, 0.06)`;
  } else if (isFrosted) {
    surfaceHex = `rgba(${aR}, ${aG}, ${aB}, 0.12)`;
  } else {
    surfaceHex = '#FFFFFF';
  }

  // ── Primary text ──────────────────────────────────────────────────────────
  let textHex;
  if (isDark) {
    textHex = hslToHex(accentHue, lerp(3, 7, expressive / 100), 90);
  } else {
    const textLight = lerp(22, 8, technical / 100);
    const textSat   = lerp(6, 2, expressive / 100);
    textHex = hslToHex(accentHue, textSat, textLight);
  }

  // ── Muted text ────────────────────────────────────────────────────────────
  const mutedHex = isDark
    ? hslToHex(accentHue, 6, 52)
    : hslToHex(accentHue, 4, 45);

  // ── Border / divider ──────────────────────────────────────────────────────
  // Terminal:  dim white hairline — structure without glow
  // Frosted:   accent-colored border — neon frame effect
  // Editorial: near-invisible — cards float in whitespace
  // Consumer:  standard light hue-tinted line
  let borderColor;
  if (isTerminal) {
    borderColor = 'rgba(255, 255, 255, 0.10)';
  } else if (isFrosted) {
    borderColor = `rgba(${aR}, ${aG}, ${aB}, 0.45)`;
  } else if (isEditorial) {
    borderColor = 'transparent';
  } else {
    borderColor = hslToHex(accentHue, 8, 88);
  }

  // ── Card glow (box-shadow) ────────────────────────────────────────────────
  // Only Frosted/HUD gets a glow.
  // 30px spread: wide enough to read as intentional neon on dark bg,
  // tight enough that adjacent cards stay distinct.
  // Terminal, Editorial, Consumer: none — matte surfaces.
  let cardGlow;
  if (isFrosted) {
    cardGlow = `0 0 30px rgba(${aR}, ${aG}, ${aB}, 0.25)`;
  } else if (isEditorial) {
    cardGlow = '0 1px 3px rgba(0, 0, 0, 0.06)';
  } else {
    cardGlow = 'none';
  }

  // ── Accent subtle ─────────────────────────────────────────────────────────
  // Dark: more visible on dark canvas.
  // Light: subtle tint for hover states and accent-bg areas.
  const accentSubtle = isDark
    ? `rgba(${aR}, ${aG}, ${aB}, 0.15)`
    : `rgba(${aR}, ${aG}, ${aB}, 0.08)`;

  return {
    isDark,
    radius,
    spaceUnit,
    fontFamily,
    fontWeight,
    letterSpacing,
    lineHeight,
    typeScale,
    accentHex,
    bgHex,
    surfaceHex,
    textHex,
    mutedHex,
    borderColor,
    cardGlow,
    accentSubtle,
    duration,
    easing,
  };
}

function writeAllTokens(el, tokenSet) {
  const {
    radius, spaceUnit, fontFamily, fontWeight, letterSpacing,
    lineHeight, typeScale, accentHex, bgHex, surfaceHex, textHex,
    mutedHex, borderColor, cardGlow, accentSubtle, duration, easing,
  } = tokenSet;

  el.style.setProperty('--arc-radius',              `${Math.round(radius)}px`);
  el.style.setProperty('--arc-space-unit',           `${spaceUnit}px`);
  el.style.setProperty('--arc-font-family',          fontFamily);
  el.style.setProperty('--arc-font-weight',          fontWeight);
  el.style.setProperty('--arc-letter-spacing',       `${letterSpacing.toFixed(3)}em`);
  el.style.setProperty('--arc-line-height',          lineHeight.toFixed(2));
  el.style.setProperty('--arc-type-scale',             typeScale.toFixed(3));
  el.style.setProperty('--arc-color-accent',          accentHex);
  el.style.setProperty('--arc-color-bg',             bgHex);
  el.style.setProperty('--arc-color-surface',        surfaceHex);
  el.style.setProperty('--arc-color-text',           textHex);
  el.style.setProperty('--arc-color-muted',          mutedHex);
  el.style.setProperty('--arc-color-border',         borderColor);
  el.style.setProperty('--arc-card-shadow',          cardGlow);
  el.style.setProperty('--arc-color-accent-subtle',  accentSubtle);
  el.style.setProperty('--arc-duration',             `${duration}ms`);
  el.style.setProperty('--arc-easing',               easing);
}

// Module-level state for crossfade tracking.
// null = first render, no fade needed.
let displayedFont   = null;
let displayedIsDark = null;
let fontTimer       = null;

export function applyTokensToDOM(tokenSet) {
  const el = document.getElementById('arc-canvas');
  if (!el) return;

  const fontChanging     = displayedFont   !== null && tokenSet.fontFamily !== displayedFont;
  const darkModeChanging = displayedIsDark !== null && tokenSet.isDark     !== displayedIsDark;
  const requiresFade     = fontChanging || darkModeChanging;

  if (requiresFade) {
    if (fontTimer) clearTimeout(fontTimer);
    el.style.opacity = '0';
    fontTimer = setTimeout(() => {
      writeAllTokens(el, tokenSet);
      displayedFont   = tokenSet.fontFamily;
      displayedIsDark = tokenSet.isDark;
      el.style.opacity = '1';
      fontTimer = null;
    }, 70);
  } else {
    writeAllTokens(el, tokenSet);
    displayedFont   = tokenSet.fontFamily;
    displayedIsDark = tokenSet.isDark;
  }
}
