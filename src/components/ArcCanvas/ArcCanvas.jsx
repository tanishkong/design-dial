import { useEffect } from 'react'
import styles from './ArcCanvas.module.css'
import ArcNav from './ArcNav/ArcNav'
import ArcMetrics from './ArcMetrics/ArcMetrics'
import ArcEditorialHero from './ArcEditorialHero/ArcEditorialHero'
import ArcChart from './ArcChart/ArcChart'
import ArcProjectList from './ArcProjectList/ArcProjectList'
import ArcInput from './ArcInput/ArcInput'
import ArcEmptyState from './ArcEmptyState/ArcEmptyState'
import { resolveCopy, getArchetype } from '../../engines/copyEngine'
import { computeTokens, applyTokensToDOM } from '../../engines/tokenEngine'

export default function ArcCanvas({ dialState, canvasId = 'arc-canvas', isCompare = false }) {
  const copy = resolveCopy(dialState)
  const archetype = getArchetype(dialState)

  // Compare canvas manages its own tokens — primary canvas is managed externally
  useEffect(() => {
    if (isCompare) {
      applyTokensToDOM(computeTokens(dialState), false, canvasId)
    }
  }, [dialState, canvasId, isCompare])

  const showChart = archetype !== 'editorial'
  const showInput = archetype !== 'editorial'
  const showEmpty = archetype === 'saas' || archetype === 'dev' || archetype === 'gaming'

  return (
    <main id={canvasId} className={styles.canvas}>
      <ArcNav copy={copy} />
      {archetype === 'editorial'
        ? <ArcEditorialHero copy={copy} />
        : <ArcMetrics copy={copy} />
      }
      {showChart && <ArcChart copy={copy} />}
      <ArcProjectList copy={copy} />
      {showInput && <ArcInput copy={copy} />}
      {showEmpty && <ArcEmptyState copy={copy} />}
    </main>
  )
}
