import styles from './ArcMetrics.module.css'
import MetricCard from './MetricCard/MetricCard'

export default function ArcMetrics({ copy }) {
  return (
    <div className={styles.grid}>
      <MetricCard label={copy.metricActivity} value={copy.metricValues[0]} />
      <MetricCard label={copy.metricProgress} value={copy.metricValues[1]} />
      <MetricCard label={copy.metricHours}    value={copy.metricValues[2]} />
      <MetricCard label={copy.metricShipped}  value={copy.metricValues[3]} />
    </div>
  )
}
