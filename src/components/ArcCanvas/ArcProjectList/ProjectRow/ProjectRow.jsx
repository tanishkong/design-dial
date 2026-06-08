import styles from './ProjectRow.module.css'

export default function ProjectRow({ name, progress, tag }) {
  return (
    <div className={styles.row}>
      <div className={styles.meta}>
        <span className={styles.name}>{name}</span>
        <span className={styles.tag}>{tag}</span>
      </div>
      <div className={styles.track}>
        <div
          className={styles.fill}
          style={{ '--fill-width': `${progress}%` }}
        />
      </div>
      <span className={styles.percent}>{progress}%</span>
    </div>
  )
}
