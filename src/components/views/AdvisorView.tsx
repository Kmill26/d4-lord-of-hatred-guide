import { BUILD_BY_ID } from '../../data/builds'
import { RESPEC_ADVICE } from '../../data/strategy'
import type { Build } from '../../data/types'
import { TierBadge } from '../shared'

interface Props {
  build: Build
  onPickBuild: (id: string) => void
}

const FAST_ALTERNATIVES = [
  'rogue-dance-of-knives',
  'necro-minion',
  'barb-frenzy-throw',
  'sorc-static-blizzard',
  'paladin-shield-retribution',
  'spiritborn-quill-volley',
]

const genericStay = (tier: Build['tier']): string =>
  tier === 'S'
    ? 'A top-tier leveler — there is no reason to respec for speed. Ride it to 70.'
    : tier === 'A'
      ? 'A strong, well-rounded leveler. No urgent respec needed; switch only if you want a different feel.'
      : 'Solid and fun, just a little slower than the S/A options. Totally fine for the campaign.'

export function AdvisorView({ build, onPickBuild }: Props) {
  const advice = RESPEC_ADVICE[build.id]
  const alts = FAST_ALTERNATIVES.filter((id) => id !== build.id)
    .map((id) => BUILD_BY_ID[id])
    .filter(Boolean)
    .slice(0, 4)

  return (
    <section className="view" id="view-panel" role="tabpanel" aria-labelledby="tab-advisor" tabIndex={-1}>
      <div className="panel-scroll">
        <h2 className="section-title">Should You Respec?</h2>
        <div className="advisor-box">
          <h3>
            Your build: {build.className} — {build.name}{' '}
            <TierBadge tier={build.tier} />
          </h3>
          <p>
            <strong>Verdict:</strong> {advice?.stay ?? genericStay(build.tier)}
          </p>
          <p>
            <strong>When to switch:</strong>{' '}
            {advice?.switch ?? 'Try a higher-tier leveler from the list below if you want more speed.'}
          </p>
          {build.respecNote && (
            <p>
              <strong>In-build respecs:</strong> {build.respecNote}
            </p>
          )}
        </div>

        <h3 className="section-title" style={{ fontSize: '1rem' }}>
          Faster alternatives
        </h3>
        <div className="advisor-alts">
          {alts.map((b) => (
            <button
              key={b.id}
              type="button"
              className="strategy-phase btn-reset"
              style={{ cursor: 'pointer' }}
              onClick={() => onPickBuild(b.id)}
            >
              <h3 style={{ marginBottom: '0.25rem' }}>
                {b.className} — {b.name} <TierBadge tier={b.tier} />
              </h3>
              <p style={{ margin: 0, color: 'var(--muted)', fontSize: '0.88rem' }}>{b.playstyle}</p>
            </button>
          ))}
        </div>
      </div>
      <p className="disclaimer">Fan-made strategium · Not affiliated with Blizzard Entertainment</p>
    </section>
  )
}
