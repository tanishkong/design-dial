import { useState, useEffect } from 'react'
import styles from './App.module.css'
import Header from './components/Header/Header'
import PersonalityPanel from './components/PersonalityPanel/PersonalityPanel'
import ArcCanvas from './components/ArcCanvas/ArcCanvas'
import { useDialState } from './hooks/useDialState'
import { usePresetTransition } from './hooks/usePresetTransition'
import { computeTokens, applyTokensToDOM } from './engines/tokenEngine'
import { presets } from './data/presets'

const DEFAULT_COMPARE_PRESET = presets.find(p => p.id === 'gaming')

export default function App() {
  const { dialState, setDialState, setDial: setDialRaw, isAnimating, setIsAnimating } = useDialState()
  const [activePreset, setActivePreset] = useState(null)
  const [showCompare, setShowCompare] = useState(false)
  const [comparePreset, setComparePreset] = useState(DEFAULT_COMPARE_PRESET)

  function setDial(key, value) {
    setActivePreset(null)
    setDialRaw(key, value)
  }

  const { triggerPreset } = usePresetTransition(setDialState, setIsAnimating, setActivePreset)

  function handleRandomize() {
    const randomDials = {
      playful:    Math.round(Math.random() * 100),
      expressive: Math.round(Math.random() * 100),
      warm:       Math.round(Math.random() * 100),
      energetic:  Math.round(Math.random() * 100),
    }
    triggerPreset({ id: null, dials: randomDials })
  }

  useEffect(() => {
    applyTokensToDOM(computeTokens(dialState))
  }, [])

  // Sync compare canvas whenever compare mode or compare preset changes
  useEffect(() => {
    if (!showCompare || !comparePreset) return
    applyTokensToDOM(computeTokens(comparePreset.dials), false, 'arc-canvas-b')
  }, [showCompare, comparePreset])

  return (
    <div className={styles.app}>
      <Header
        dialState={dialState}
        activePreset={activePreset}
        showCompare={showCompare}
        onToggleCompare={() => setShowCompare(v => !v)}
        comparePreset={comparePreset}
        onComparePresetChange={setComparePreset}
        onRandomize={handleRandomize}
      />
      <div className={styles.main}>
        <PersonalityPanel
          dialState={dialState}
          setDial={setDial}
          isAnimating={isAnimating}
          activePreset={activePreset}
          onPresetClick={triggerPreset}
        />
        {showCompare ? (
          <>
            <div className={styles.canvasWrapper}>
              <div className={styles.canvasLabel}>● Live</div>
              <ArcCanvas dialState={dialState} canvasId="arc-canvas" />
            </div>
            <div className={styles.canvasWrapper}>
              <div className={styles.canvasLabel}>● {comparePreset?.label ?? 'Compare'}</div>
              <ArcCanvas dialState={comparePreset.dials} canvasId="arc-canvas-b" isCompare={true} />
            </div>
          </>
        ) : (
          <ArcCanvas dialState={dialState} canvasId="arc-canvas" />
        )}
      </div>
    </div>
  )
}
