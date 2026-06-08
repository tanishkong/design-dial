import styles from './PersonalityPanel.module.css'
import PersonalityDescription from './PersonalityDescription/PersonalityDescription'
import DialGroup from './DialGroup/DialGroup'

export default function PersonalityPanel({ dialState, setDial, isAnimating }) {
  return (
    <aside className={styles.panel}>
      <PersonalityDescription dialState={dialState} />
      <DialGroup dialState={dialState} setDial={setDial} isAnimating={isAnimating} />
      {/* PresetGrid — Task 10 */}
    </aside>
  )
}
