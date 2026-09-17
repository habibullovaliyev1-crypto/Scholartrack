import React, { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { universities, countries, allPrograms } from '../data/universities.js'
import { computeMatch, tierBadgeClass } from '../utils/matching.js'

export default function Explorer({ profile }) {
  const navigate = useNavigate()
  const [country, setCountry] = useState('')
  const [program, setProgram] = useState('')
  const [maxTuition, setMaxTuition] = useState('')
  const [scholarshipOnly, setScholarshipOnly] = useState(false)
  const [fullScholarshipOnly, setFullScholarshipOnly] = useState(false)
  const [sortBy, setSortBy] = useState('match')

  const results = useMemo(() => {
    let list = universities.filter(u => {
      if (country && u.country !== country) return false
      if (program && !u.programs.includes(program)) return false
      if (maxTuition && u.tuitionUSD.min > Number(maxTuition)) return false
      if (scholarshipOnly && !u.scholarships.available) return false
      if (fullScholarshipOnly && !u.scholarships.fullScholarship) return false
      return true
    })

    const withMatch = list.map(u => ({ uni: u, match: computeMatch(profile, u) }))

    withMatch.sort((a, b) => {
      if (sortBy === 'match') return b.match.overall - a.match.overall
      if (sortBy === 'tuition') return a.uni.tuitionUSD.min - b.uni.tuitionUSD.min
      if (sortBy === 'acceptance') return b.uni.acceptanceRate - a.uni.acceptanceRate
      return 0
    })

    return withMatch
  }, [profile, country, program, maxTuition, scholarshipOnly, fullScholarshipOnly, sortBy])

  return (
    <div className="container" style={{ padding: '40px 20px 80px' }}>
      <h1 style={{ fontSize: 26, marginBottom: 6 }}>Explore universities</h1>
      <p style={{ color: 'var(--ink-soft)', marginBottom: 28 }}>
        {results.length} universities match your filters, sorted by {sortBy === 'match' ? 'compatibility' : sortBy}.
      </p>

      <div className="card" style={{ padding: 20, marginBottom: 28 }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
          gap: 14,
        }}>
          <div className="field" style={{ marginBottom: 0 }}>
            <label>Country</label>
            <select value={country} onChange={e => setCountry(e.target.value)}>
              <option value="">All countries</option>
              {countries.map(c => <option key={c}>{c}</option>)}
            </select>
          </div>
          <div className="field" style={{ marginBottom: 0 }}>
            <label>Program</label>
            <select value={program} onChange={e => setProgram(e.target.value)}>
              <option value="">All programs</option>
              {allPrograms.map(p => <option key={p}>{p}</option>)}
            </select>
          </div>
          <div className="field" style={{ marginBottom: 0 }}>
            <label>Max annual tuition (USD)</label>
            <input type="number" value={maxTuition} onChange={e => setMaxTuition(e.target.value)} placeholder="e.g. 20000" />
          </div>
          <div className="field" style={{ marginBottom: 0 }}>
            <label>Sort by</label>
            <select value={sortBy} onChange={e => setSortBy(e.target.value)}>
              <option value="match">Best match</option>
              <option value="tuition">Lowest tuition</option>
              <option value="acceptance">Highest acceptance rate</option>
            </select>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 20, marginTop: 16 }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13.5, cursor: 'pointer' }}>
            <input type="checkbox" checked={scholarshipOnly} onChange={e => setScholarshipOnly(e.target.checked)} />
            Scholarships available
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13.5, cursor: 'pointer' }}>
            <input type="checkbox" checked={fullScholarshipOnly} onChange={e => setFullScholarshipOnly(e.target.checked)} />
            Only show full-scholarship opportunities
          </label>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {results.map(({ uni, match }) => (
          <div
            key={uni.id}
            className="card"
            style={{ padding: 20, cursor: 'pointer' }}
            onClick={() => navigate(`/university/${uni.id}`)}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>
              <div>
                <div style={{ fontWeight: 600, fontSize: 16 }}>{uni.name}</div>
                <div style={{ fontSize: 13, color: 'var(--ink-soft)', marginBottom: 8 }}>
                  {uni.city}, {uni.country} · {uni.programs.slice(0, 2).join(', ')}
                </div>
                <div style={{ fontSize: 13, color: 'var(--ink-soft)' }}>
                  Est. tuition ${uni.tuitionUSD.min.toLocaleString()}–${uni.tuitionUSD.max.toLocaleString()}/yr
                  {uni.scholarships.fullScholarship && ' · Full scholarships available'}
                </div>
              </div>
              <span className={`badge ${tierBadgeClass(match.tier)}`} style={{ flexShrink: 0, height: 'fit-content' }}>
                {match.tier} · {match.overall}
              </span>
            </div>
          </div>
        ))}
        {results.length === 0 && (
          <div className="card" style={{ padding: 32, textAlign: 'center', color: 'var(--ink-soft)' }}>
            No universities match these filters. Try widening your budget or removing a filter.
          </div>
        )}
      </div>
    </div>
  )
        }
