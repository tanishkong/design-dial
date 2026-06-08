import styles from './ArcNav.module.css'

export default function ArcNav({ copy }) {
  return (
    <nav className={styles.nav}>
      <div className={styles.wordmark}>Arc</div>
      <div className={styles.links}>
        <a className={styles.link}>{copy.navMain}</a>
        <a className={styles.link}>{copy.navLinks[0]}</a>
        <a className={styles.link}>{copy.navLinks[1]}</a>
      </div>
      <button className={styles.cta}>{copy.cta}</button>
    </nav>
  )
}
