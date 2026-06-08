import styles from './ArcProjectList.module.css'
import ProjectRow from './ProjectRow/ProjectRow'

const PROJECTS = [
  { name: 'Design Dial',    progress: 80, tag: 'UI Design'  },
  { name: 'Brand System',   progress: 60, tag: 'Branding'   },
  { name: 'Misread',        progress: 30, tag: 'Product'    },
  { name: 'Steam Memories', progress: 10, tag: 'Case Study' },
]

export default function ArcProjectList() {
  return (
    <section className={styles.section}>
      <p className={styles.label}>PROJECTS</p>
      <div className={styles.list}>
        {PROJECTS.map((project) => (
          <ProjectRow key={project.name} {...project} />
        ))}
      </div>
    </section>
  )
}
