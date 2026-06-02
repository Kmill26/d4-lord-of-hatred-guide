import { BUILD_BY_ID } from '../../data/builds'
import { TIER_LIST, TIER_LIST_NOTE, TIER_ORDER } from '../../data/tierList'

interface Props {
  currentBuildId: string
  onPickBuild: (id: string) => void
}

export function TierListView({ currentBuildId, onPickBuild }: Props) {
  return (
    <section className="view" id="view-panel" role="tabpanel" aria-labelledby="tab-tiers" tabIndex={-1}>
      <div className="panel-scroll">
        <h2 className="section-title">Leveling Tier List</h2>
        <p className="section-intro" style={{ marginBottom: '1.25rem' }}>
          {TIER_LIST_NOTE}
        </p>
        <div className="tier-list-wrap">
          {TIER_ORDER.map((tier) => (
            <div className="tier-row" key={tier}>
              <div className={`tier-label ${tier}`} aria-hidden="true">
                {tier}
              </div>
              <div className="tier-items">
                <span className="sr-only">{tier} tier:</span>
                {TIER_LIST[tier].map(({ buildId, note }) => {
                  const b = BUILD_BY_ID[buildId]
                  if (!b) return null
                  const you = b.id === currentBuildId
                  return (
                    <button
                      key={buildId}
                      type="button"
                      className={`tier-chip ${you ? 'you' : ''}`}
                      title={note}
                      onClick={() => onPickBuild(buildId)}
                    >
                      <span className="chip-tier">{b.tier}</span>
                      {b.className} · {b.name}
                      {you && <span className="sr-only"> (your current build)</span>}
                    </button>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
      <p className="disclaimer">Fan-made strategium · Not affiliated with Blizzard Entertainment</p>
    </section>
  )
}
