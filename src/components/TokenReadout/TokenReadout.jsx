import styles from './TokenReadout.module.css'
import { computeTokens } from '../../engines/tokenEngine'

function shortFont(fontFamily) {
  return fontFamily.replace(/'/g, '').split(',')[0].trim()
}

function shortEasing(easing) {
  if (easing.includes('1.56')) return 'spring'
  if (easing.includes('1.2'))  return 'gentle bounce'
  if (easing.includes('0.6, 1')) return 'snappy'
  return 'standard'
}

export default function TokenReadout({ dialState, onClose }) {
  const t = computeTokens(dialState)

  const groups = [
    {
      label: 'Color',
      rows: [
        { name: '--arc-color-accent',  value: t.accentHex,  color: t.accentHex  },
        { name: '--arc-color-bg',      value: t.bgHex,      color: t.bgHex      },
        { name: '--arc-color-surface', value: t.surfaceHex, color: t.surfaceHex },
        { name: '--arc-color-text',    value: t.textHex,    color: t.textHex    },
        { name: '--arc-color-muted',   value: t.mutedHex,   color: t.mutedHex   },
      ],
    },
    {
      label: 'Typography',
      rows: [
        { name: '--arc-font-family',      value: shortFont(t.fontFamily)          },
        { name: '--arc-font-weight',      value: String(t.fontWeight)             },
        { name: '--arc-type-scale',       value: t.typeScale.toFixed(3)           },
        { name: '--arc-letter-spacing',   value: `${t.letterSpacing.toFixed(3)}em` },
        { name: '--arc-line-height',      value: t.lineHeight.toFixed(2)          },
      ],
    },
    {
      label: 'Geometry',
      rows: [
        { name: '--arc-radius',     value: `${Math.round(t.radius)}px` },
        { name: '--arc-space-unit', value: `${t.spaceUnit}px`          },
      ],
    },
    {
      label: 'Motion',
      rows: [
        { name: '--arc-duration', value: `${t.duration}ms`    },
        { name: '--arc-easing',   value: shortEasing(t.easing) },
      ],
    },
    {
      label: 'Surface',
      rows: [
        { name: 'mode',  value: t.surfaceMode            },
        { name: 'theme', value: t.isDark ? 'dark' : 'light' },
      ],
    },
  ]

  return (
    <aside className={styles.panel}>
      <div className={styles.header}>
        <span className={styles.title}>Live Tokens</span>
        <button className={styles.close} onClick={onClose} type="button" title="Close">×</button>
      </div>
      <div className={styles.body}>
        {groups.map(group => (
          <div key={group.label} className={styles.group}>
            <span className={styles.groupLabel}>{group.label}</span>
            {group.rows.map(row => (
              <div key={row.name} className={styles.row}>
                <span className={styles.tokenName}>{row.name}</span>
                <span className={styles.tokenValue}>
                  {row.color && (
                    <span className={styles.swatch} style={{ background: row.color }} />
                  )}
                  {row.value}
                </span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </aside>
  )
}
