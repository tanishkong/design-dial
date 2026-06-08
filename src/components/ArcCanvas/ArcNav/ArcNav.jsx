import styles from './ArcNav.module.css'

export default function ArcNav({ copy }) {
  return (
    <nav className={styles.nav}>
      <div className={styles.wordmark}>Arc</div>
      <div className={styles.links}>
        <a className={styles.link}>{copy.navMain}</a>
        <a className={styles.link}>Activity</a>
        <a className={styles.link}>Settings</a>
      </div>
      <button className={styles.cta}>{copy.cta}</button>
    </nav>
  )
}
