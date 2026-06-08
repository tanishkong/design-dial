import { useState } from 'react'
import { computeTokens, applyTokensToDOM } from '../engines/tokenEngine'

const INITIAL_STATE = { playful: 50, expressive: 50, warm: 50, energetic: 50 }

export function useDialState() {
  const [dialState, setDialState] = useState(INITIAL_STATE)
  const [isAnimating, setIsAnimating] = useState(false)

  function setDial(key, value) {
    const newDialState = { ...dialState, [key]: value }
    setDialState(newDialState)
    applyTokensToDOM(computeTokens(newDialState))
  }

  return { dialState, setDial, isAnimating, setIsAnimating }
}
