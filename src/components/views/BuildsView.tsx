import { useMemo, useState, type CSSProperties } from 'react'
import { BUILDS } from '../../data/builds'
import { CLASSES, CLASS_ORDER } from '../../data/classes'
import { byTier } from '../../data/tierList'
import { ClassPortrait, TierBadge } from '../shared'

interface Props {
  onPickBuild: (id: string) => void
}

export function BuildsView({ onPickBuild }: Props) {
  const [query, setQuery] = useState('')
  const [classFilter, setClassFilter] = useState<'all' | string>('all')

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return BUILDS.filter((b) => {
      if (classFilter !== 'all' && b.className !== classFilter) return false
      if (!q) return true
      const hay = `${b.className} ${b.name} ${b.playstyle} ${b.feelsLike} ${b.tierLabel} ${
        b.selection ?? ''
      } ${b.skillPriority.join(' ')}`.toLowerCase()
      return hay.includes(q)
    }).sort(byTier)
  }, [query, classFilter])

  return (
    <section className="view" id="view-panel" role="tabpanel" aria-labelledby="tab-builds" tabIndex={-1}>
      <div className="panel-scroll">
        <h2 className="section-title">Leveling Builds</h2>
        <p className="section-intro" style={{ margin: '-0.5rem 0 1rem' }}>
          {BUILDS.length} builds across all 8 classes. Click any card for the full point-by-point guide.
        </p>

        <div className="build-toolbar">
          <input
            className="search-input"
            type="search"
            placeholder="Search builds, skills, playstyle…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Search builds"
          />
          <label className="sr-only" htmlFor="class-filter">
            Filter by class
          </label>
          <select id="class-filter" value={classFilter} onChange={(e) => setClassFilter(e.target.value)}>
            <option value="all">All Classes</option>
            {CLASS_ORDER.map((cn) => (
              <option key={cn} value={cn}>
                {cn}
              </option>
            ))}
          </select>
        </div>

        {filtered.length === 0 ? (
          <div className="empty-note">
            <p>
              No builds match
              {query ? ` “${query}”` : ''}
              {classFilter !== 'all' ? ` in ${classFilter}` : ''}.
            </p>
            <button
              type="button"
              className="ctrl-btn"
              onClick={() => {
                setQuery('')
                setClassFilter('all')
              }}
            >
              Clear search &amp; filters
            </button>
          </div>
        ) : (
          <div className="class-grid">
            {filtered.map((b) => {
              const c = CLASSES[b.className]
              return (
                <button
                  key={b.id}
                  type="button"
                  className="class-card btn-reset"
                  style={{ '--accent': c.accent } as CSSProperties}
                  onClick={() => onPickBuild(b.id)}
                >
                  <TierBadge tier={b.tier} />
                  <ClassPortrait cls={c} height={56} className="thumb" />
                  <h3>{b.className}</h3>
                  <div className="build-title">{b.name}</div>
                  <p>{b.tierLabel}</p>
                  <p>
                    <em>{b.feelsLike}</em>
                  </p>
                  {b.selection && (
                    <p style={{ color: 'var(--gold)' }}>{b.selection}</p>
                  )}
                </button>
              )
            })}
          </div>
        )}
      </div>
      <p className="disclaimer">Fan-made strategium · Not affiliated with Blizzard Entertainment</p>
    </section>
  )
}
