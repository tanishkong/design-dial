import styles from './Dial.module.css'

export default function Dial({ axisKey, leftLabel, rightLabel, value, onChange, disabled }) {
  function handleChange(e) {
    onChange(axisKey, Number(e.target.value))
  }

  return (
    <div className={styles.dial}>
      <div className={styles.header}>
        <span className={styles.axisLabels}>
          <span className={styles.labelLeft}>{leftLabel}</span>
          <span className={styles.separator}>↔</span>
          <span className={styles.labelRight}>{rightLabel}</span>
        </span>
        <span className={styles.value}>{value}</span>
      </div>
      <input
        type="range"
        min="0"
        max="100"
        value={value}
        onChange={handleChange}
        disabled={disabled}
        className={styles.track}
      />
    </div>
  )
}
