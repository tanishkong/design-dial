import styles from './PersonalityPanel.module.css'
import PersonalityDescription from './PersonalityDescription/PersonalityDescription'
import DialGroup from './DialGroup/DialGroup'
import PresetGrid from './PresetGrid/PresetGrid'

export default function PersonalityPanel({ dialState, setDial, isAnimating, activePreset, onPresetClick }) {
  return (
    <aside className={styles.panel}>
      <PersonalityDescription dialState={dialState} isAnimating={isAnimating} />
      <DialGroup dialState={dialState} setDial={setDial} isAnimating={isAnimating} />
      <PresetGrid activePreset={activePreset} onPresetClick={onPresetClick} />
    </aside>
  )
}
