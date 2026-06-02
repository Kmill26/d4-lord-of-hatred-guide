import { useState, type CSSProperties } from 'react'
import { classPortrait } from '../data/classes'
import type { ClassInfo, Meters, Runeword, Tier } from '../data/types'

/** External class art that gracefully falls back to a class-initial badge. */
export function ClassPortrait({
  cls,
  height = 200,
  className = '',
}: {
  cls: ClassInfo
  height?: number
  className?: string
}) {
  const [failed, setFailed] = useState(false)
  const accentStyle = { '--accent': cls.accent } as CSSProperties

  if (failed) {
    return (
      <div
        className={`portrait portrait-fallback ${className}`}
        style={{ ...accentStyle, height, fontSize: `${Math.max(1.4, height / 90)}rem` }}
        aria-hidden="true"
      >
        {cls.name.slice(0, 2)}
      </div>
    )
  }
  return (
    <img
      className={`portrait ${className}`}
      style={{ height }}
      src={classPortrait(cls.slug)}
      alt=""
      loading="lazy"
      decoding="async"
      onError={() => setFailed(true)}
    />
  )
}

export function TierBadge({ tier }: { tier: Tier }) {
  return (
    <span className={`tier-badge ${tier}`}>
      <span className="sr-only">Tier </span>
      {tier}
    </span>
  )
}

const METER_LABELS: Array<[keyof Meters, string]> = [
  ['speed', 'Speed'],
  ['survival', 'Survival'],
  ['ease', 'Easy'],
  ['damage', 'Damage'],
  ['aoe', 'AoE'],
]

export function MetersBars({ meters }: { meters: Meters }) {
  return (
    <div>
      {METER_LABELS.map(([key, label]) => {
        const v = meters[key] || 0
        return (
          <div className="meter-row" key={key}>
            <span className="label">{label}</span>
            <span className="meter-bar" role="img" aria-label={`${label}: ${v} of 5`}>
              <span className="meter-fill" style={{ width: `${v * 20}%` }} />
            </span>
          </div>
        )
      })}
    </div>
  )
}

export function Disclaimer() {
  return (
    <p className="disclaimer">Fan-made strategium · Not affiliated with Blizzard Entertainment</p>
  )
}

export function RunewordList({ runes }: { runes: Runeword[] }) {
  if (!runes.length) return null
  return (
    <ul style={{ margin: '0.25rem 0 0', paddingLeft: '1rem' }}>
      {runes.map((r, i) => (
        <li key={i} style={{ marginBottom: '0.2rem' }}>
          <span className="runeword">
            <span className="rune ritual" title="Rune of Ritual (cause)">
              {r.ritual}
            </span>
            <span className="rune-plus" aria-hidden="true">
              +
            </span>
            <span className="rune invocation" title="Rune of Invocation (effect)">
              {r.invocation}
            </span>
          </span>{' '}
          — {r.effect}
        </li>
      ))}
    </ul>
  )
}
