import styles from './ArcProjectList.module.css'
import ProjectRow from './ProjectRow/ProjectRow'

export default function ArcProjectList({ copy }) {
  return (
    <section className={styles.section}>
      <p className={styles.label}>{copy.projectsLabel}</p>
      <div className={styles.list}>
        {copy.projects.map((project) => (
          <ProjectRow key={project.name} {...project} />
        ))}
      </div>
    </section>
  )
}
