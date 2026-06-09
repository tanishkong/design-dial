import { computeTokens } from '../../../../engines/tokenEngine'
import { resolveWords } from '../../../../engines/personalityEngine'
import styles from './PresetChip.module.css'

export default function PresetChip({ preset, isActive, onClick, onMouseEnter }) {
  const { accentHex } = computeTokens(preset.dials)
  const descriptor = resolveWords(preset.dials)[0]

  return (
    <button
      className={`${styles.chip} ${isActive ? styles.active : ''}`}
      data-preset-id={preset.id}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      type="button"
    >
      <span className={styles.dot} style={{ '--preset-accent': accentHex }} />
      <span className={styles.name}>{preset.label}</span>
      <span className={styles.descriptor}>{descriptor}</span>
    </button>
  )
}
