import styles from './DialGroup.module.css'
import Dial from './Dial/Dial'

const DIALS = [
  { axisKey: 'playful',    leftLabel: 'Serious',    rightLabel: 'Playful'    },
  { axisKey: 'expressive', leftLabel: 'Minimal',    rightLabel: 'Expressive' },
  { axisKey: 'warm',       leftLabel: 'Technical',  rightLabel: 'Warm'       },
  { axisKey: 'energetic',  leftLabel: 'Calm',       rightLabel: 'Energetic'  },
]

export default function DialGroup({ dialState, setDial, isAnimating }) {
  return (
    <div className={styles.group}>
      {DIALS.map(({ axisKey, leftLabel, rightLabel }) => (
        <Dial
          key={axisKey}
          axisKey={axisKey}
          leftLabel={leftLabel}
          rightLabel={rightLabel}
          value={dialState[axisKey]}
          onChange={setDial}
          disabled={isAnimating}
        />
      ))}
    </div>
  )
}
