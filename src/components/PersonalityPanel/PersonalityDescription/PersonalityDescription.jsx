import { useState, useEffect, useRef } from 'react'
import { resolveWords } from '../../../engines/personalityEngine'
import { computeTokens } from '../../../engines/tokenEngine'
import styles from './PersonalityDescription.module.css'

function DescriptorWord({ word, delay, isAnimating, accentHex, fontFamily }) {
  const [displayWord, setDisplayWord] = useState(word)
  const [phase, setPhase] = useState('visible') // 'visible' | 'out' | 'enter'
  const wasAnimatingRef = useRef(false)
  const timersRef = useRef([])

  function clearTimers() {
    timersRef.current.forEach(clearTimeout)
    timersRef.current = []
  }

  useEffect(() => {
    if (word === displayWord) return

    clearTimers()
    // Capture whether this change was triggered by a preset (not dial drag)
    wasAnimatingRef.current = isAnimating

    const t1 = setTimeout(() => {
      setPhase('out')
      const t2 = setTimeout(() => {
        setDisplayWord(word)
        setPhase('enter')
        // One frame: let browser paint enter state before transitioning to visible
        const t3 = setTimeout(() => setPhase('visible'), 20)
        timersRef.current.push(t3)
      }, 100)
      timersRef.current.push(t2)
    }, delay)

    timersRef.current.push(t1)
  }, [word]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => () => clearTimers(), [])

  const slide = wasAnimatingRef.current
  const style = {
    opacity: phase === 'visible' ? 1 : 0,
    transform:
      !slide        ? 'none'
      : phase === 'out'   ? 'translateY(-6px)'
      : phase === 'enter' ? 'translateY(6px)'
      : 'none',
  }

  return (
    <span className={styles.word} style={{ ...style, color: accentHex, fontFamily }}>
      {displayWord}
    </span>
  )
}

export default function PersonalityDescription({ dialState, isAnimating }) {
  const words = resolveWords(dialState)
  const { accentHex, fontFamily } = computeTokens(dialState)

  return (
    <div className={styles.root}>
      <span className={styles.label}>Current Design Language</span>
      <div className={styles.divider} />
      <div className={styles.wordList}>
        {words.map((word, i) => (
          <DescriptorWord key={i} word={word} delay={i * 40} isAnimating={isAnimating} accentHex={accentHex} fontFamily={fontFamily} />
        ))}
      </div>
    </div>
  )
}
