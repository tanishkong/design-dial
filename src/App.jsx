import { useState, useEffect } from 'react'
import styles from './App.module.css'
import Header from './components/Header/Header'
import PersonalityPanel from './components/PersonalityPanel/PersonalityPanel'
import ArcCanvas from './components/ArcCanvas/ArcCanvas'
import { useDialState } from './hooks/useDialState'
import { usePresetTransition } from './hooks/usePresetTransition'
import { computeTokens, applyTokensToDOM } from './engines/tokenEngine'

export default function App() {
  const { dialState, setDialState, setDial: setDialRaw, isAnimating, setIsAnimating } = useDialState()
  const [activePreset, setActivePreset] = useState(null)

  // Clear active preset when user manually drags a dial
  function setDial(key, value) {
    setActivePreset(null)
    setDialRaw(key, value)
  }

  const { triggerPreset } = usePresetTransition(setDialState, setIsAnimating, setActivePreset)

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
          activePreset={activePreset}
          onPresetClick={triggerPreset}
        />
        <ArcCanvas dialState={dialState} />
      </div>
    </div>
  )
}
