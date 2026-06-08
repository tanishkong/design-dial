import styles from './Dial.module.css'

export default function Dial({ axisKey, leftLabel, rightLabel, value, onChange, disabled }) {
  function handleChange(e) {
    onChange(axisKey, Number(e.target.value))
  }

  return (
    <div
      className={styles.dial}
      data-dial={axisKey}
      style={{ '--thumb-pos': value }}
    >
      <div className={styles.header}>
        <span className={styles.axisLabels}>
          <span className={styles.labelLeft}>{leftLabel}</span>
          <span className={styles.separator}>↔</span>
          <span className={styles.labelRight}>{rightLabel}</span>
        </span>
        <span className={styles.value}>{value}</span>
      </div>
      <div className={styles.trackWrapper}>
        {/* Native input is invisible but handles all drag interaction */}
        <input
          type="range"
          min="0"
          max="100"
          value={value}
          onChange={handleChange}
          disabled={disabled}
          className={styles.nativeInput}
        />
        <div className={styles.visualTrack} />
        <div className={styles.thumb} />
      </div>
    </div>
  )
}
