import { useState } from 'react'
import styles from './Header.module.css'
import HowItWorks from './HowItWorks/HowItWorks'
import { computeTokens } from '../../engines/tokenEngine'
import { presets } from '../../data/presets'

function buildCssExport(t) {
  const lines = [
    `--arc-radius: ${Math.round(t.radius)}px`,
    `--arc-font-family: ${t.fontFamily}`,
    `--arc-font-weight: ${t.fontWeight}`,
    `--arc-letter-spacing: ${t.letterSpacing.toFixed(3)}em`,
    `--arc-line-height: ${t.lineHeight.toFixed(2)}`,
    `--arc-type-scale: ${t.typeScale.toFixed(3)}`,
    `--arc-color-accent: ${t.accentHex}`,
    `--arc-color-bg: ${t.bgHex}`,
    `--arc-color-surface: ${t.surfaceHex}`,
    `--arc-color-text: ${t.textHex}`,
    `--arc-color-muted: ${t.mutedHex}`,
    `--arc-color-border: ${t.borderColor}`,
    `--arc-duration: ${t.duration}ms`,
    `--arc-easing: ${t.easing}`,
  ].map(l => `  ${l};`).join('\n')
  return `:root {\n${lines}\n}`
}

function hexToRgbObj(hex) {
  return {
    r: parseInt(hex.slice(1, 3), 16) / 255,
    g: parseInt(hex.slice(3, 5), 16) / 255,
    b: parseInt(hex.slice(5, 7), 16) / 255,
    a: 1,
  }
}

function buildFigmaExport(t) {
  const tokens = {
    color: {
      accent:        { $value: t.accentHex,  $type: 'color' },
      bg:            { $value: t.bgHex,      $type: 'color' },
      surface:       { $value: t.surfaceHex, $type: 'color' },
      text:          { $value: t.textHex,    $type: 'color' },
      muted:         { $value: t.mutedHex,   $type: 'color' },
    },
    dimension: {
      radius:        { $value: `${Math.round(t.radius)}px`,     $type: 'dimension' },
      spaceUnit:     { $value: `${t.spaceUnit}px`,              $type: 'dimension' },
    },
    fontFamily: {
      base:          { $value: t.fontFamily,                    $type: 'fontFamily' },
    },
    fontWeight: {
      base:          { $value: String(t.fontWeight),            $type: 'fontWeight' },
    },
    duration: {
      base:          { $value: `${t.duration}ms`,               $type: 'duration' },
    },
  }
  return JSON.stringify(tokens, null, 2)
}

export default function Header({ dialState, activePreset, showCompare, onToggleCompare, comparePreset, onComparePresetChange }) {
  const [copiedCss, setCopiedCss] = useState(false)
  const [copiedFigma, setCopiedFigma] = useState(false)
  const [showInfo, setShowInfo] = useState(false)

  const t = dialState ? computeTokens(dialState) : null
  const accentHex = t ? t.accentHex : 'var(--tool-accent)'

  const activePresetLabel = activePreset
    ? presets.find(p => p.id === activePreset)?.label ?? 'Custom'
    : 'Custom'

  function handleExportCss() {
    if (!t) return
    navigator.clipboard.writeText(buildCssExport(t))
    setCopiedCss(true)
    setTimeout(() => setCopiedCss(false), 2000)
  }

  function handleExportFigma() {
    if (!t) return
    navigator.clipboard.writeText(buildFigmaExport(t))
    setCopiedFigma(true)
    setTimeout(() => setCopiedFigma(false), 2000)
  }

  return (
    <>
      <header className={styles.header}>
        <div className={styles.left}>
          <span className={styles.wordmark}>Design Dial</span>
          <span className={styles.divider} aria-hidden="true" />
          <span className={styles.presetLabel} style={{ '--header-accent': accentHex }}>
            {activePresetLabel}
          </span>
          <button
            className={styles.infoButton}
            onClick={() => setShowInfo(v => !v)}
            type="button"
            title="How it works"
          >
            ?
          </button>
        </div>
        <div className={styles.right}>
          <button
            className={`${styles.compareButton} ${showCompare ? styles.compareActive : ''}`}
            onClick={onToggleCompare}
            type="button"
            style={{ '--header-accent': accentHex }}
          >
            {showCompare ? 'Exit compare' : 'Compare'}
          </button>
          {showCompare && (
            <div className={styles.compareChips}>
              {presets.map(p => (
                <button
                  key={p.id}
                  className={`${styles.compareChip} ${comparePreset?.id === p.id ? styles.compareChipActive : ''}`}
                  onClick={() => onComparePresetChange(p)}
                  type="button"
                  style={{ '--header-accent': accentHex }}
                >
                  {p.label}
                </button>
              ))}
            </div>
          )}
          <button
            className={styles.exportButton}
            onClick={handleExportCss}
            type="button"
            style={{ '--header-accent': accentHex }}
          >
            {copiedCss ? 'Copied!' : 'CSS tokens'}
          </button>
          <button
            className={styles.exportButton}
            onClick={handleExportFigma}
            type="button"
            style={{ '--header-accent': accentHex }}
          >
            {copiedFigma ? 'Copied!' : 'Figma tokens'}
          </button>
        </div>
      </header>
      {showInfo && <HowItWorks onClose={() => setShowInfo(false)} />}
    </>
  )
}
