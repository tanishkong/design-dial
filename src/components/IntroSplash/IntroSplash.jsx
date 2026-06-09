import { useState } from 'react'
import styles from './IntroSplash.module.css'

export default function IntroSplash({ onDismiss }) {
  const [dismissing, setDismissing] = useState(false)

  function handleEnter() {
    setDismissing(true)
    setTimeout(onDismiss, 480)
  }

  return (
    <div className={`${styles.splash} ${dismissing ? styles.dismissing : ''}`}>
      <div className={styles.content}>
        <span className={styles.eyebrow}>Portfolio project · 2025</span>
        <h1 className={styles.title}>Design Dial</h1>
        <p className={styles.thesis}>
          Most design systems start with components.<br />
          This one starts with personality.
        </p>
        <div className={styles.axes}>
          <span>Playful</span>
          <span className={styles.dot} aria-hidden="true" />
          <span>Expressive</span>
          <span className={styles.dot} aria-hidden="true" />
          <span>Warm</span>
          <span className={styles.dot} aria-hidden="true" />
          <span>Energetic</span>
        </div>
        <button className={styles.enter} onClick={handleEnter} type="button">
          Enter the tool
          <span className={styles.arrow} aria-hidden="true">→</span>
        </button>
      </div>
    </div>
  )
}
