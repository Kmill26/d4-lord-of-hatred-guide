import { BUILDS } from '../../data/builds'
import { CLASSES, CLASS_ORDER } from '../../data/classes'
import type { Build, ClassName } from '../../data/types'
import { ClassPortrait, TierBadge } from '../shared'

const TIER_RANK = { S: 0, A: 1, B: 2 } as const

function bestBuildForClass(cn: ClassName): Build | undefined {
  return BUILDS.filter((b) => b.className === cn).sort(
    (a, b) => TIER_RANK[a.tier] - TIER_RANK[b.tier],
  )[0]
}

interface Props {
  onPickBuild: (id: string) => void
}

export function PathsView({ onPickBuild }: Props) {
  // One representative (best) build per class, for the compare table.
  const compareRows = CLASS_ORDER.map((cn) => bestBuildForClass(cn)).filter(
    (b): b is Build => !!b,
  )

  return (
    <section className="view" id="view-panel" role="tabpanel" aria-labelledby="tab-paths" tabIndex={-1}>
      <div className="panel-scroll">
        <h2 className="section-title">Choose Your Path</h2>
        <p className="section-intro" style={{ margin: '-0.5rem auto 1.25rem', textAlign: 'center' }}>
          New to Diablo IV? Start here. Each card shows{' '}
          <strong style={{ color: 'var(--gold)' }}>what you’ll actually see on screen</strong> — then pick a
          build to get every milestone to level 70.
        </p>

        <div className="class-hero-grid">
          {CLASS_ORDER.map((cn) => {
            const c = CLASSES[cn]
            const classBuilds = BUILDS.filter((b) => b.className === cn)
            const best = bestBuildForClass(cn)
            return (
              <article className="class-hero" key={cn}>
                <button
                  type="button"
                  className="btn-reset"
                  onClick={() => best && onPickBuild(best.id)}
                  aria-label={`Open the recommended ${cn} build${best ? `: ${best.name}` : ''}`}
                >
                  <ClassPortrait cls={c} height={200} />
                  <div className="body">
                    <h3>
                      {cn}
                      {c.isNewInLoH && <span className="loh-badge">Lord of Hatred</span>}
                    </h3>
                    <div className="tag">{c.tagline}</div>
                    <p>
                      <strong style={{ color: '#e8d9c8' }}>On screen:</strong> {c.onScreen}
                    </p>
                    <p>
                      <strong style={{ color: '#e8d9c8' }}>Role:</strong> {c.role}
                    </p>
                  </div>
                </button>
                <div className="build-pick-list" style={{ padding: '0 1rem 0.9rem' }}>
                  {classBuilds.map((b) => (
                    <button
                      key={b.id}
                      type="button"
                      className="build-pick"
                      title={b.feelsLike}
                      onClick={() => onPickBuild(b.id)}
                    >
                      {b.tier} · {b.name}
                    </button>
                  ))}
                </div>
              </article>
            )
          })}
        </div>

        <h3 className="section-title" style={{ fontSize: '1rem', marginTop: '2rem', textAlign: 'center' }}>
          Quick Compare
        </h3>
        <div className="compare-wrap">
          <table className="compare-table" aria-label="Top build per class">
            <thead>
              <tr>
                <th scope="col">Build</th>
                <th scope="col">Looks like</th>
                <th scope="col">Best for</th>
                <th scope="col">Tier</th>
              </tr>
            </thead>
            <tbody>
              {compareRows.map((b) => (
                <tr key={b.id}>
                  <td>
                    <button
                      type="button"
                      className="btn-reset"
                      style={{ color: 'var(--gold)' }}
                      onClick={() => onPickBuild(b.id)}
                    >
                      {b.className}
                      <br />
                      <span style={{ color: 'var(--gold-bright)' }}>{b.name}</span>
                    </button>
                  </td>
                  <td>{b.feelsLike}</td>
                  <td>{b.tier === 'S' ? 'Fastest / easiest' : b.tier === 'A' ? 'Strong pick' : 'Situational'}</td>
                  <td>
                    <TierBadge tier={b.tier} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <p className="disclaimer">Fan-made strategium · Not affiliated with Blizzard Entertainment</p>
    </section>
  )
}
