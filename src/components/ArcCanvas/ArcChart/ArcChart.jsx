import { useState, useEffect, useRef } from 'react'
import styles from './ArcChart.module.css'

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

export default function ArcChart({ copy }) {
  const max = Math.max(...copy.chartData, 1)
  const prevDataRef = useRef(copy.chartData)
  const [animKey, setAnimKey] = useState(0)

  useEffect(() => {
    // Only trigger animation when the data actually changes (archetype switch)
    const prev = prevDataRef.current
    const changed = copy.chartData.some((v, i) => v !== prev[i])
    if (changed) {
      prevDataRef.current = copy.chartData
      setAnimKey(k => k + 1)
    }
  }, [copy.chartData])

  return (
    <section className={styles.section}>
      <p className={styles.label}>{copy.chartLabel}</p>
      <div className={styles.chart}>
        {copy.chartData.map((value, i) => (
          <div key={DAYS[i]} className={styles.barWrapper}>
            <div
              className={`${styles.bar} ${value === 0 ? styles.empty : ''}`}
              style={{
                '--bar-height': `${(value / max) * 100}%`,
                animationDelay: `${i * 40}ms`,
              }}
              key={`${animKey}-${i}`}
            />
            <span className={styles.dayLabel}>{DAYS[i]}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
