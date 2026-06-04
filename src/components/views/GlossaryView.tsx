import { useEffect, useMemo, useState } from 'react'
import { GLOSSARY, GLOSSARY_BY_TERM, GLOSSARY_CATEGORIES } from '../../data/glossary'
import type { GlossaryCategory } from '../../data/glossary'
import { fuzzyMatch } from '../../lib/fuzzy'

interface Props {
  focusTerm?: string
  onFocusTerm: (term?: string) => void
}

const cardId = (term: string) => `gloss-${term.replace(/\W+/g, '-')}`

export function GlossaryView({ focusTerm, onFocusTerm }: Props) {
  const [query, setQuery] = useState('')
  const [cat, setCat] = useState<GlossaryCategory | 'all'>('all')

  // When jumping to a term, ignore active filters so the card is visible.
  const filterQuery = focusTerm ? '' : query
  const filterCat = focusTerm ? ('all' as const) : cat

  // Scroll the focused card into view — looked up by id so it works in a list.
  useEffect(() => {
    if (!focusTerm) return
    const id = requestAnimationFrame(() =>
      document.getElementById(cardId(focusTerm))?.scrollIntoView({ block: 'center', behavior: 'smooth' }),
    )
    return () => cancelAnimationFrame(id)
  }, [focusTerm])

  const results = useMemo(() => {
    const q = filterQuery.trim()
    let list = GLOSSARY
    if (filterCat !== 'all') list = list.filter((t) => t.category === filterCat)
    if (q) {
      list = list
        .map((t) => {
          const m = fuzzyMatch(q, t.term) ?? fuzzyMatch(q, `${t.short} ${t.full}`)
          return m ? { t, score: m.score } : null
        })
        .filter((x): x is { t: (typeof GLOSSARY)[number]; score: number } => !!x)
        .sort((a, b) => b.score - a.score)
        .map((x) => x.t)
    }
    return list
  }, [filterQuery, filterCat])

  return (
    <section className="view" id="view-panel" role="tabpanel" aria-labelledby="tab-glossary" tabIndex={-1}>
      <div className="panel-scroll">
        <h2 className="section-title">Glossary</h2>
        <p className="section-intro" style={{ marginTop: '-0.5rem' }}>
          {GLOSSARY.length} Diablo IV terms a new player meets while leveling — what they mean and
          why they matter. Search, filter by category, or follow the links.
        </p>

        <div className="build-toolbar" style={{ marginTop: '1rem' }}>
          <input
            className="search-input"
            type="search"
            placeholder="Search terms…"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value)
              if (focusTerm) onFocusTerm(undefined)
            }}
            aria-label="Search glossary"
          />
          <div className="chip-row" role="group" aria-label="Filter by category">
            <button
              type="button"
              className={`filter-chip ${cat === 'all' ? 'on' : ''}`}
              onClick={() => {
                setCat('all')
                if (focusTerm) onFocusTerm(undefined)
              }}
            >
              All
            </button>
            {GLOSSARY_CATEGORIES.map((c) => (
              <button
                key={c}
                type="button"
                className={`filter-chip ${cat === c ? 'on' : ''}`}
                onClick={() => {
                  setCat(c)
                  if (focusTerm) onFocusTerm(undefined)
                }}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {results.length === 0 ? (
          <p className="empty-note">No terms match “{query}”.</p>
        ) : (
          <div className="glossary-grid">
            {results.map((t) => {
              const focused = focusTerm?.toLowerCase() === t.term.toLowerCase()
              return (
                <div
                  key={t.term}
                  className={`glossary-card ${focused ? 'focused' : ''}`}
                  id={cardId(t.term)}
                >
                  <div className="glossary-head">
                    <h3>{t.term}</h3>
                    <span className={`gcat gcat-${t.category.toLowerCase()}`}>{t.category}</span>
                  </div>
                  <p className="glossary-short">{t.short}</p>
                  <p className="glossary-full">{t.full}</p>
                  {t.seeAlso && t.seeAlso.length > 0 && (
                    <div className="see-also">
                      <span className="see-also-label">See also</span>
                      {t.seeAlso.map((s) => {
                        const exists = GLOSSARY_BY_TERM[s.toLowerCase()]
                        return exists ? (
                          <button
                            key={s}
                            type="button"
                            className="see-also-chip"
                            onClick={() => onFocusTerm(exists.term)}
                          >
                            {s}
                          </button>
                        ) : (
                          <span key={s} className="see-also-chip muted">
                            {s}
                          </span>
                        )
                      })}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        )}
      </div>
    </section>
  )
}
