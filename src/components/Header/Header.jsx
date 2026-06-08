import styles from './Header.module.css'

export default function Header() {
  return (
    <header className={styles.header}>
      <span className={styles.wordmark}>Design Dial</span>
      <button className={styles.exportButton}>Export</button>
    </header>
  )
}
