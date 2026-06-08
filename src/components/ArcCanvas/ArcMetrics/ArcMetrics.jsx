import styles from './ArcMetrics.module.css'
import MetricCard from './MetricCard/MetricCard'

export default function ArcMetrics({ copy }) {
  return (
    <div className={styles.grid}>
      <MetricCard label={copy.metricActivity} value="4" />
      <MetricCard label={copy.metricProgress} value="12" />
      <MetricCard label={copy.metricHours} value="23.5" />
      <MetricCard label={copy.metricShipped} value="1" />
    </div>
  )
}
