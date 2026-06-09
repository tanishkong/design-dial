import { resolveWord } from '../data/wordBank.js'

export function resolveWords(dialState) {
  const { playful, expressive, warm, energetic } = dialState
  return [
    resolveWord('playful',    playful),
    resolveWord('expressive', expressive),
    resolveWord('warm',       warm),
    resolveWord('energetic',  energetic),
  ]
}

export function resolveFont(dialState) {
  const { playful, expressive, warm } = dialState
  const technical = 100 - warm

  if (technical > 70)                                      return "'IBM Plex Mono', monospace"
  if (playful > 65 && energetic > 75 && warm < 50)        return "'Syne', sans-serif"
  if (playful > 65)                                        return "'Fredoka', sans-serif"
  if (expressive > 70)   return "'Space Grotesk', sans-serif"
  if (warm > 50)         return "'Plus Jakarta Sans', sans-serif"
  return "'Geist', sans-serif"
}
