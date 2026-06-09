import { useRef, useEffect } from 'react'
import styles from './PresetGrid.module.css'
import PresetChip from './PresetChip/PresetChip'
import { presets } from '../../../data/presets'
import { computeTokens, applyTokensToDOM } from '../../../engines/tokenEngine'

export default function PresetGrid({ activePreset, onPresetClick, dialState }) {
  const listRef = useRef(null)

  // Slide the indicator bar to the active chip's position
  useEffect(() => {
    const list = listRef.current
    if (!list) return

    if (!activePreset) {
      list.style.setProperty('--indicator-opacity', '0')
      return
    }

    const chip = list.querySelector(`[data-preset-id="${activePreset}"]`)
    if (!chip) return

    const listTop = list.getBoundingClientRect().top
    const chipRect = chip.getBoundingClientRect()
    list.style.setProperty('--indicator-top', `${chipRect.top - listTop}px`)
    list.style.setProperty('--indicator-height', `${chipRect.height}px`)
    list.style.setProperty('--indicator-opacity', '1')
  }, [activePreset])

  function handleHover(preset) {
    applyTokensToDOM(computeTokens(preset.dials))
  }

  function handleHoverEnd() {
    if (dialState) applyTokensToDOM(computeTokens(dialState))
  }

  return (
    <div className={styles.section}>
      <span className={styles.sectionLabel}>Presets</span>
      <div className={styles.divider} />
      <div className={styles.chipList} ref={listRef} onMouseLeave={handleHoverEnd}>
        <div className={styles.indicator} aria-hidden="true" />
        {presets.map((preset) => (
          <PresetChip
            key={preset.id}
            preset={preset}
            isActive={activePreset === preset.id}
            onClick={() => onPresetClick(preset)}
            onMouseEnter={() => handleHover(preset)}
          />
        ))}
      </div>
    </div>
  )
}
