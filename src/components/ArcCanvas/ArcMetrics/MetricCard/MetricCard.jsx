import styles from './MetricCard.module.css'

export default function MetricCard({ label, value }) {
  return (
    <div className={styles.card}>
      <span className={styles.value}>{value}</span>
      <span className={styles.label}>{label}</span>
    </div>
  )
}
