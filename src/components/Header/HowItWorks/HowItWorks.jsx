import { useEffect } from 'react'
import styles from './HowItWorks.module.css'

export default function HowItWorks({ onClose }) {
  useEffect(() => {
    function handleKey(e) {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [onClose])

  return (
    <div className={styles.backdrop} onClick={onClose}>
      <div className={styles.panel} onClick={e => e.stopPropagation()}>
        <div className={styles.header}>
          <span className={styles.title}>How Design Dial works</span>
          <button className={styles.close} onClick={onClose} type="button">ESC</button>
        </div>

        <p className={styles.thesis}>
          Most design systems start with components. Design Dial starts with personality.
          The thesis: the decisions that make a product feel right happen before you pick a font.
        </p>

        <div className={styles.section}>
          <span className={styles.sectionLabel}>The four axes</span>
          <div className={styles.axisList}>
            <div className={styles.axis}>
              <span className={styles.axisName}>Playful / Serious</span>
              <span className={styles.axisEffect}>corner radius, type scale, animation easing</span>
            </div>
            <div className={styles.axis}>
              <span className={styles.axisName}>Minimal / Expressive</span>
              <span className={styles.axisEffect}>spacing density, color saturation, surface tint</span>
            </div>
            <div className={styles.axis}>
              <span className={styles.axisName}>Warm / Technical</span>
              <span className={styles.axisEffect}>accent hue, font selection, dark mode trigger</span>
            </div>
            <div className={styles.axis}>
              <span className={styles.axisName}>Calm / Energetic</span>
              <span className={styles.axisEffect}>animation speed, font weight, transition curve</span>
            </div>
          </div>
        </div>

        <div className={styles.section}>
          <span className={styles.sectionLabel}>Archetype detection</span>
          <div className={styles.ruleList}>
            <div className={styles.rule}><code>technical &gt; 75</code><span>Developer Tool - Terminal mode, IBM Plex Mono</span></div>
            <div className={styles.rule}><code>expressive &ge; 85 &amp;&amp; energetic &ge; 85</code><span>Gaming - Frosted HUD, Syne</span></div>
            <div className={styles.rule}><code>playful &ge; 80 &amp;&amp; warm &ge; 70</code><span>Kids App - bright palette, Fredoka</span></div>
            <div className={styles.rule}><code>warm &ge; 70 &amp;&amp; energetic &lt; 40</code><span>Health &amp; Wellness - sage green, loose type</span></div>
            <div className={styles.rule}><code>expressive &ge; 60 &amp;&amp; energetic &lt; 35</code><span>Luxury Editorial - Cormorant Garamond, no metrics</span></div>
            <div className={styles.rule}><code>expressive &ge; 70 &amp;&amp; playful &ge; 50</code><span>Creative Studio - Space Grotesk</span></div>
            <div className={styles.rule}><code>else</code><span>Corporate SaaS - Geist, neutral palette</span></div>
          </div>
        </div>

        <p className={styles.footnote}>
          Every color, font, radius, spacing unit, and animation curve is computed — nothing is hardcoded per preset.
          Drag any dial off a preset position to explore the space between archetypes.
        </p>
      </div>
    </div>
  )
}
