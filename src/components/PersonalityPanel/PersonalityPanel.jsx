import styles from './PersonalityPanel.module.css'
import DialGroup from './DialGroup/DialGroup'

export default function PersonalityPanel({ dialState, setDial, isAnimating }) {
  return (
    <aside className={styles.panel}>
      {/* PersonalityDescription — Task 6 */}
      <DialGroup dialState={dialState} setDial={setDial} isAnimating={isAnimating} />
      {/* PresetGrid — Task 10 */}
    </aside>
  )
}
