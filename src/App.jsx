import styles from './App.module.css'
import Header from './components/Header/Header'
import PersonalityPanel from './components/PersonalityPanel/PersonalityPanel'
import ArcCanvas from './components/ArcCanvas/ArcCanvas'

export default function App() {
  return (
    <div className={styles.app}>
      <Header />
      <div className={styles.main}>
        <PersonalityPanel />
        <ArcCanvas />
      </div>
    </div>
  )
}
