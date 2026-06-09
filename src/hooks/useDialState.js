import { useState, useEffect } from 'react'
import { computeTokens, applyTokensToDOM } from '../engines/tokenEngine'

const INITIAL_STATE = { playful: 50, expressive: 50, warm: 50, energetic: 50 }

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
