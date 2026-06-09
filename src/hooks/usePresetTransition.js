import { computeTokens, applyTokensToDOM } from '../engines/tokenEngine'

const DIAL_KEYS = ['playful', 'expressive', 'warm', 'energetic']

function animateDialThumbs(dials, easing) {
  DIAL_KEYS.forEach(key => {
    const el = document.querySelector(`[data-dial="${key}"]`)
    if (!el) return
    el.style.setProperty('--thumb-duration', '300ms')
    el.style.setProperty('--thumb-easing', easing)
    el.style.setProperty('--thumb-pos', dials[key])
  })
  // Reset duration after animation completes so drag is instant again
  setTimeout(() => {
    DIAL_KEYS.forEach(key => {
      const el = document.querySelector(`[data-dial="${key}"]`)
      if (el) el.style.removeProperty('--thumb-duration')
    })
  }, 320)
}

export function usePresetTransition(setDialState, setIsAnimating, setActivePreset) {
  function triggerPreset(preset) {
    setIsAnimating(true)

    const tokenSet = computeTokens(preset.dials)
    // Animate thumbs with destination-driven easing before React state syncs
    animateDialThumbs(preset.dials, tokenSet.easing)
    // Apply all CSS tokens to DOM — forceTransition=true for choreographed fade on every preset switch
    applyTokensToDOM(tokenSet, true)

    setTimeout(() => {
      setDialState(preset.dials)
      setActivePreset(preset.id)
      setTimeout(() => setIsAnimating(false), 50)
    }, 300)
  }

  return { triggerPreset }
}
