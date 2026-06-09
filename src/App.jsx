import { useState, useEffect } from 'react'
import styles from './App.module.css'
import Header from './components/Header/Header'
import PersonalityPanel from './components/PersonalityPanel/PersonalityPanel'
import ArcCanvas from './components/ArcCanvas/ArcCanvas'
import IntroSplash from './components/IntroSplash/IntroSplash'
import TokenReadout from './components/TokenReadout/TokenReadout'
import { useDialState } from './hooks/useDialState'
import { usePresetTransition } from './hooks/usePresetTransition'
import { computeTokens, applyTokensToDOM } from './engines/tokenEngine'
import { presets } from './data/presets'

const DEFAULT_COMPARE_PRESET = presets.find(p => p.id === 'gaming')

// Dark-mode archetypes to cycle through during the intro splash
const INTRO_CYCLE = ['gaming', 'developer-tool', 'creative-studio'].map(id =>
  presets.find(p => p.id === id)
).filter(Boolean)

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
  const [showTokens, setShowTokens] = useState(false)

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
    // Re-sync canvas to current dialState after intro cycling
    applyTokensToDOM(computeTokens(dialState), true)
  }

  // Initial token apply
  useEffect(() => {
    applyTokensToDOM(computeTokens(dialState))
  }, [])

  // Cycle through dark archetypes behind the splash to show the tool in motion
  useEffect(() => {
    if (!showIntro) return
    let i = 0
    const id = setInterval(() => {
      i = (i + 1) % INTRO_CYCLE.length
      applyTokensToDOM(computeTokens(INTRO_CYCLE[i].dials), true)
    }, 2200)
    return () => clearInterval(id)
  }, [showIntro])

  // Sync compare canvas whenever compare mode or compare preset changes
  useEffect(() => {
    if (!showCompare || !comparePreset) return
    applyTokensToDOM(computeTokens(comparePreset.dials), false, 'arc-canvas-b')
  }, [showCompare, comparePreset])

  function compareLabel(tokenSet, fallback) {
    if (!tokenSet) return fallback
    const font = shortFontName(tokenSet.fontFamily)
    const mode = tokenSet.isDark ? 'Dark' : 'Light'
    const radius = `r=${Math.round(tokenSet.radius)}px`
    return `${font} · ${mode} · ${radius}`
  }

  const liveTokens = showCompare ? computeTokens(dialState) : null
  const cmpTokens  = showCompare && comparePreset ? computeTokens(comparePreset.dials) : null

  return (
    <>
      {showIntro && <IntroSplash onDismiss={handleIntroDismiss} />}

      {/* Mobile fallback — hidden on desktop via CSS */}
      <div className={styles.mobileBlock}>
        <h1 className={styles.mobileTitle}>Design Dial</h1>
        <p className={styles.mobileThesis}>Personality as a function, not a style choice.</p>
        <p className={styles.mobileNote}>This tool is built for desktop. Open it on a larger screen for the full experience.</p>
        <a
          href="https://github.com/tanishkong/design-dial"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.mobileLink}
        >
          View source on GitHub →
        </a>
      </div>

      <div className={`${styles.app} ${appEntered ? styles.appEntered : ''}`}>
        <Header
          dialState={dialState}
          activePreset={activePreset}
          showCompare={showCompare}
          onToggleCompare={() => setShowCompare(v => !v)}
          comparePreset={comparePreset}
          onComparePresetChange={setComparePreset}
          onRandomize={handleRandomize}
          showTokens={showTokens}
          onToggleTokens={() => setShowTokens(v => !v)}
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
            <div className={styles.canvasSingle}>
              <ArcCanvas dialState={dialState} canvasId="arc-canvas" />
              {showTokens && (
                <TokenReadout dialState={dialState} onClose={() => setShowTokens(false)} />
              )}
            </div>
          )}
        </div>
      </div>
    </>
  )
}
