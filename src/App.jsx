import { useEffect } from 'react'
import styles from './App.module.css'
import Header from './components/Header/Header'
import PersonalityPanel from './components/PersonalityPanel/PersonalityPanel'
import ArcCanvas from './components/ArcCanvas/ArcCanvas'
import { useDialState } from './hooks/useDialState'
import { computeTokens, applyTokensToDOM } from './engines/tokenEngine'

export default function App() {
  const { dialState, setDial, isAnimating, setIsAnimating } = useDialState()

  useEffect(() => {
    applyTokensToDOM(computeTokens(dialState))
  }, [])

  return (
    <div className={styles.app}>
      <Header />
      <div className={styles.main}>
        <PersonalityPanel
          dialState={dialState}
          setDial={setDial}
          isAnimating={isAnimating}
        />
        <ArcCanvas dialState={dialState} />
      </div>
    </div>
  )
}
