import styles from './ArcEmptyState.module.css'

export default function ArcEmptyState({ copy }) {
  return (
    <section className={styles.section}>
      <p className={styles.label}>{copy.sectionTeam}</p>
      <div className={styles.card}>
        <div className={styles.icon} aria-hidden="true">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="1.5" />
            <path d="M2 21c0-4 3-7 7-7h4c4 0 7 3 7 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M19 8v6M16 11h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </div>
        <p className={styles.headline}>{copy.emptyHeadline}</p>
        <p className={styles.subtext}>{copy.emptySubtext}</p>
        <button className={styles.cta} type="button">{copy.cta}</button>
      </div>
    </section>
  )
}
