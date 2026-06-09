import { useState, useEffect } from 'react'
import styles from './App.module.css'
import Header from './components/Header/Header'
import PersonalityPanel from './components/PersonalityPanel/PersonalityPanel'
import ArcCanvas from './components/ArcCanvas/ArcCanvas'
import IntroSplash from './components/IntroSplash/IntroSplash'
import { useDialState } from './hooks/useDialState'
import { usePresetTransition } from './hooks/usePresetTransition'
import { computeTokens, applyTokensToDOM } from './engines/tokenEngine'
import { presets } from './data/presets'

const DEFAULT_COMPARE_PRESET = presets.find(p => p.id === 'gaming')

// Show intro only on fresh visits (no URL dial params)
function hasUrlDialState() {
  const params = new URLSearchParams(window.location.search)
  return ['playful', 'expressive', 'warm', 'energetic'].every(k => params.has(k))
}

function shortFontName(fontFamily) {
  return fontFamily.replace(/'/g, '').split(',')[0].trim()
}

export default function App() {
  const { dialState, setDialState, setDial: setDialRaw, isAnimating, setIsAnimating } = useDialState()
  const [activePreset, setActivePreset] = useState(null)
  const [showCompare, setShowCompare] = useState(false)
  const [comparePreset, setComparePreset] = useState(DEFAULT_COMPARE_PRESET)
  const [showIntro, setShowIntro] = useState(() => !hasUrlDialState())
  const [appEntered, setAppEntered] = useState(() => hasUrlDialState())

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

  function handleIntroDismiss() {
    setShowIntro(false)
    setAppEntered(true)
  }

  useEffect(() => {
    applyTokensToDOM(computeTokens(dialState))
  }, [])

  // Sync compare canvas whenever compare mode or compare preset changes
  useEffect(() => {
    if (!showCompare || !comparePreset) return
    applyTokensToDOM(computeTokens(comparePreset.dials), false, 'arc-canvas-b')
  }, [showCompare, comparePreset])

  // Build compare diff label — shows 3 key token differences
  function compareLabel(tokenSet, fallback) {
    if (!tokenSet) return fallback
    const font = shortFontName(tokenSet.fontFamily)
    const mode = tokenSet.isDark ? 'Dark' : 'Light'
    const radius = `r=${Math.round(tokenSet.radius)}px`
    return `${font} · ${mode} · ${radius}`
  }

  const liveTokens  = showCompare ? computeTokens(dialState) : null
  const cmpTokens   = showCompare && comparePreset ? computeTokens(comparePreset.dials) : null

  return (
    <>
      {showIntro && <IntroSplash onDismiss={handleIntroDismiss} />}
      <div className={`${styles.app} ${appEntered ? styles.appEntered : ''}`}>
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
                <div className={styles.canvasLabel}>● Live · {compareLabel(liveTokens, 'Live')}</div>
                <ArcCanvas dialState={dialState} canvasId="arc-canvas" />
              </div>
              <div className={styles.canvasWrapper}>
                <div className={styles.canvasLabel}>● {comparePreset?.label ?? 'Compare'} · {compareLabel(cmpTokens, comparePreset?.label)}</div>
                <ArcCanvas dialState={comparePreset.dials} canvasId="arc-canvas-b" isCompare={true} />
              </div>
            </>
          ) : (
            <ArcCanvas dialState={dialState} canvasId="arc-canvas" />
          )}
        </div>
      </div>
    </>
  )
}
