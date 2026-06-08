import { useEffect } from 'react'
import styles from './App.module.css'
import Header from './components/Header/Header'
import PersonalityPanel from './components/PersonalityPanel/PersonalityPanel'
import ArcCanvas from './components/ArcCanvas/ArcCanvas'
import { computeTokens, applyTokensToDOM } from './engines/tokenEngine'

const DEFAULT_DIAL_STATE = { playful: 50, expressive: 50, warm: 50, energetic: 50 }

export default function App() {
  useEffect(() => {
    applyTokensToDOM(computeTokens(DEFAULT_DIAL_STATE))
  }, [])

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
