import styles from './ArcChart.module.css'

const DATA = [
  { day: 'Mon', value: 2 },
  { day: 'Tue', value: 4 },
  { day: 'Wed', value: 3 },
  { day: 'Thu', value: 6 },
  { day: 'Fri', value: 5 },
  { day: 'Sat', value: 1 },
  { day: 'Sun', value: 0 },
]

const MAX = 6

export default function ArcChart({ copy }) {
  return (
    <section className={styles.section}>
      <p className={styles.label}>{copy.chartLabel}</p>
      <div className={styles.chart}>
        {DATA.map(({ day, value }) => (
          <div key={day} className={styles.barWrapper}>
            <div
              className={`${styles.bar} ${value === 0 ? styles.empty : ''}`}
              style={{ '--bar-height': `${(value / MAX) * 100}%` }}
            />
            <span className={styles.dayLabel}>{day}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
