import styles from './ArcNav.module.css'

export default function ArcNav({ copy }) {
  return (
    <nav className={styles.nav}>
      <div className={styles.wordmark}>{copy.wordmark}</div>
      <div className={styles.links}>
        <span className={styles.link} title="Mockup UI">{copy.navMain}</span>
        <span className={styles.link} title="Mockup UI">{copy.navLinks[0]}</span>
        <span className={styles.link} title="Mockup UI">{copy.navLinks[1]}</span>
      </div>
      <button className={styles.cta}>{copy.cta}</button>
    </nav>
  )
}
