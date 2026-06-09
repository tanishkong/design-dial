import styles from './ArcEditorialHero.module.css'

export default function ArcEditorialHero({ copy }) {
  return (
    <section className={styles.hero}>
      <div className={styles.rule} />
      <h1 className={styles.title}>{copy.wordmark}</h1>
      <div className={styles.meta}>
        <span className={styles.metaLabel}>{copy.projectsLabel}</span>
        <span className={styles.metaDivider} aria-hidden="true" />
        <span className={styles.metaValue}>{copy.metricValues[0]} {copy.metricActivity}</span>
      </div>
    </section>
  )
}
