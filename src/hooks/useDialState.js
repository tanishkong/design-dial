import { useState, useEffect } from 'react'
import { computeTokens, applyTokensToDOM } from '../engines/tokenEngine'

// Creative Studio — visually impressive first impression (dark frosted → expressive palette)
const INITIAL_STATE = { playful: 65, expressive: 85, warm: 60, energetic: 70 }

function readUrlState() {
  const params = new URLSearchParams(window.location.search)
  const keys = ['playful', 'expressive', 'warm', 'energetic']
  const result = {}
  for (const key of keys) {
    const v = Number(params.get(key))
    if (!Number.isFinite(v) || v < 0 || v > 100) return null
    result[key] = v
  }
  return result
}

export function useDialState() {
  const [dialState, setDialState] = useState(() => readUrlState() ?? INITIAL_STATE)
  const [isAnimating, setIsAnimating] = useState(false)

  function setDial(key, value) {
    const newDialState = { ...dialState, [key]: value }
    setDialState(newDialState)
    applyTokensToDOM(computeTokens(newDialState))
  }

  useEffect(() => {
    const { playful, expressive, warm, energetic } = dialState
    const params = new URLSearchParams({ playful, expressive, warm, energetic })
    history.replaceState(null, '', `?${params}`)
  }, [dialState])

  return { dialState, setDialState, setDial, isAnimating, setIsAnimating }
}
