import { useState, useEffect, useRef } from 'react'
import { resolveWords } from '../../../engines/personalityEngine'
import styles from './PersonalityDescription.module.css'

function DescriptorWord({ word, delay }) {
  const [displayWord, setDisplayWord] = useState(word)
  const [visible, setVisible] = useState(true)
  const timeoutsRef = useRef([])

  useEffect(() => {
    if (word === displayWord) return

    timeoutsRef.current.forEach(clearTimeout)
    timeoutsRef.current = []

    const t1 = setTimeout(() => {
      setVisible(false)
      const t2 = setTimeout(() => {
        setDisplayWord(word)
        setVisible(true)
      }, 100)
      timeoutsRef.current.push(t2)
    }, delay)

    timeoutsRef.current.push(t1)
  }, [word])

  useEffect(() => () => timeoutsRef.current.forEach(clearTimeout), [])

  return (
    <span
      className={styles.word}
      style={{ opacity: visible ? 1 : 0 }}
    >
      {displayWord}
    </span>
  )
}

export default function PersonalityDescription({ dialState }) {
  const words = resolveWords(dialState)

  return (
    <div className={styles.root}>
      <span className={styles.label}>Current Design Language</span>
      <div className={styles.divider} />
      <div className={styles.wordList}>
        {words.map((word, i) => (
          <DescriptorWord key={i} word={word} delay={i * 40} />
        ))}
      </div>
    </div>
  )
}
