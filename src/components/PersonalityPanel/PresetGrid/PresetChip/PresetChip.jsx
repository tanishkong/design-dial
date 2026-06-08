import styles from './PresetChip.module.css'

export default function PresetChip({ preset, isActive, onClick }) {
  return (
    <button
      className={`${styles.chip} ${isActive ? styles.active : ''}`}
      data-preset-id={preset.id}
      onClick={onClick}
      type="button"
    >
      {preset.label}
    </button>
  )
}
