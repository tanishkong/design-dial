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

export function computeTokens(dialState) {
  const { playful, expressive, warm, energetic } = dialState;
  const technical = 100 - warm;
  const serious = 100 - playful;
  const calm = 100 - energetic;

  // Radius
  const radius = lerp(1, 20, playful / 100) + lerp(0, 4, warm / 100);

  // Spacing
  const spaceUnit = Math.round(lerp(12, 24, expressive / 100));

  // Font family — 5-zone priority order
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

  // Typography
  const fontWeight = Math.round(lerp(300, 700, energetic / 100));
  const letterSpacing = lerp(0, 0.12, technical / 100);
  const lineHeight = lerp(1.3, 1.8, warm / 100);

  // Motion
  const duration = Math.round(lerp(400, 100, energetic / 100));

  let easing;
  if (playful > 60 && energetic > 60) {
    easing = 'cubic-bezier(0.34, 1.56, 0.64, 1)';  // spring
  } else if (serious > 60 && energetic > 60) {
    easing = 'cubic-bezier(0.4, 0, 0.6, 1)';        // snappy
  } else if (playful > 60 && calm > 60) {
    easing = 'cubic-bezier(0.34, 1.2, 0.64, 1)';    // gentle bounce
  } else {
    easing = 'cubic-bezier(0.4, 0, 0.2, 1)';         // material standard
  }

  // Color — hue blends from blue (technical) through amber (neutral) to terracotta (warm)
  let accentHue;
  if (warm >= 50) {
    accentHue = lerp(35, 20, (warm - 50) / 50);  // amber → terracotta
  } else {
    accentHue = lerp(215, 35, warm / 50);          // blue → amber
  }
  const accentSat = lerp(15, 90, expressive / 100);
  const accentLight = lerp(60, 48, technical / 100);
  const accentHex = hslToHex(accentHue, accentSat, accentLight);

  // Background: tinted surface when expressive > 60, else neutral
  let bgHex;
  if (expressive > 60) {
    bgHex = hslToHex(accentHue, Math.min(accentSat * 0.25, 20), 97);
  } else {
    bgHex = '#FAFAF9';
  }
  const surfaceHex = '#FFFFFF';

  // Text: near-black with slight hue tint, darker at high technical
  const textLight = lerp(22, 8, technical / 100);
  const textSat = lerp(6, 2, expressive / 100);
  const textHex = hslToHex(accentHue, textSat, textLight);

  return {
    radius,
    spaceUnit,
    fontFamily,
    fontWeight,
    letterSpacing,
    lineHeight,
    accentHex,
    bgHex,
    surfaceHex,
    textHex,
    duration,
    easing,
  };
}

function writeAllTokens(el, tokenSet) {
  const { radius, spaceUnit, fontFamily, fontWeight, letterSpacing,
          lineHeight, accentHex, bgHex, surfaceHex, textHex, duration, easing } = tokenSet;

  el.style.setProperty('--arc-radius', `${Math.round(radius)}px`);
  el.style.setProperty('--arc-space-unit', `${spaceUnit}px`);
  el.style.setProperty('--arc-font-family', fontFamily);
  el.style.setProperty('--arc-font-weight', fontWeight);
  el.style.setProperty('--arc-letter-spacing', `${letterSpacing.toFixed(3)}em`);
  el.style.setProperty('--arc-line-height', lineHeight.toFixed(2));
  el.style.setProperty('--arc-color-accent', accentHex);
  el.style.setProperty('--arc-color-bg', bgHex);
  el.style.setProperty('--arc-color-surface', surfaceHex);
  el.style.setProperty('--arc-color-text', textHex);
  el.style.setProperty('--arc-duration', `${duration}ms`);
  el.style.setProperty('--arc-easing', easing);
}

// Tracks the font currently rendered — null until first applyTokensToDOM call
let displayedFont = null;
let fontTimer = null;

export function applyTokensToDOM(tokenSet) {
  const el = document.getElementById('arc-canvas');
  if (!el) return;

  const fontChanging = displayedFont !== null && tokenSet.fontFamily !== displayedFont;

  if (fontChanging) {
    // Cancel any in-flight crossfade and restart
    if (fontTimer) clearTimeout(fontTimer);
    el.style.opacity = '0';
    fontTimer = setTimeout(() => {
      writeAllTokens(el, tokenSet);
      displayedFont = tokenSet.fontFamily;
      el.style.opacity = '1';
      fontTimer = null;
    }, 70);
  } else {
    writeAllTokens(el, tokenSet);
    displayedFont = tokenSet.fontFamily;
  }
}
