import styles from './ArcCanvas.module.css'
import ArcNav from './ArcNav/ArcNav'
import ArcMetrics from './ArcMetrics/ArcMetrics'
import { resolveCopy } from '../../engines/copyEngine'

export default function ArcCanvas({ dialState }) {
  const copy = resolveCopy(dialState)

  return (
    <main id="arc-canvas" className={styles.canvas}>
      <ArcNav copy={copy} />
      <ArcMetrics copy={copy} />
    </main>
  )
}
