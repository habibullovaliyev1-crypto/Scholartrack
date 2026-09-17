import React from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { universities } from '../data/universities.js'
import { computeMatch, tierBadgeClass } from '../utils/matching.js'

export default function UniversityDetail({ profile }) {
  const { id } = useParams()
  const navigate = useNavigate()
  const uni = universities.find(u => u.id === id)

  if (!uni) {
    return (
      <div className="container" style={{ padding: 60 }}>
        <p>University not found.</p>
        <Link to="/explore" className="btn btn-secondary" style={{ marginTop: 16 }}>Back to Explore</Link>
      </div>
    )
  }

  const match = computeMatch(profile, uni)

  return (
    <div className="container" style={{ padding: '40px 20px 80px', maxWidth: 780 }}>
      <button className="btn btn-text" style={{ padding: '0 0 20px', fontSize: 13.5 }} onClick={() => navigate(-1)}>
        ← Back
      </button>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 20, marginBottom: 8 }}>
        <h1 style={{ fontSize: 28 }}>{uni.name}</h1>
        <span className={`badge ${tierBadgeClass(match.tier)}`} style={{ flexShrink: 0 }}>
          {match.tier} · {match.overall}
        </span>
      </div>
      <p style={{ color: 'var(--ink-soft)', marginBottom: 32 }}>{uni.city}, {uni.country}</p>

      <div className="card" style={{ padding: 20, marginBottom: 28, background: 'var(--parchment-deep)', border: 'none' }}>
        <p style={{ fontSize: 13, color: 'var(--ink-soft)', lineHeight: 1.6 }}>
          This match score reflects how closely your profile aligns with this
          university's published requirement ranges. It is <strong>not</strong> a
          prediction of your actual admission chances — real decisions depend on
          essays, recommendations, and factors this tool cannot see.
        </p>
      </div>

      <SectionTitle>Match breakdown</SectionTitle>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
        gap: 12,
        marginBottom: 32,
      }}>
        <MiniScore label="Academic" value={match.breakdown.academic} />
        <MiniScore label="English" value={match.breakdown.english} />
        <MiniScore label="Test score" value={match.breakdown.test} />
        <MiniScore label="Financial" value={match.breakdown.financial} />
        <MiniScore label="Program" value={match.breakdown.program} />
        <MiniScore label="Scholarship" value={match.breakdown.scholarship} />
      </div>

      <SectionTitle>Programs</SectionTitle>
      <p style={{ marginBottom: 28, fontSize: 14.5 }}>{uni.programs.join(', ')}</p>

      <SectionTitle>Estimated requirements</SectionTitle>
      <div className="card" style={{ padding: 20, marginBottom: 8 }}>
        <Row label="Estimated tuition" value={`$${uni.tuitionUSD.min.toLocaleString()}–$${uni.tuitionUSD.max.toLocaleString()} / year`} />
        <Row label="Approximate acceptance rate" value={`${uni.acceptanceRate}%`} />
        <Row label="Typical GPA (4.0 scale)" value={uni.requirements.gpaMin ? `${uni.requirements.gpaMin}+` : 'Not typically required'} />
        <Row label="Typical IELTS" value={uni.requirements.ieltsMin ? `${uni.requirements.ieltsMin}+` : '—'} />
        <Row label="Typical TOEFL" value={uni.requirements.toeflMin ? `${uni.requirements.toeflMin}+` : '—'} />
        <Row label="Typical SAT" value={uni.requirements.satMin ? `${uni.requirements.satMin}+` : 'Not typically required'} />
        <Row label="Application deadline" value={uni.deadline} last />
      </div>
      <p style={{ fontSize: 12.5, color: 'var(--ink-soft)', marginBottom: 32, fontStyle: 'italic' }}>
        All figures above are estimates. Confirm exact requirements on the university's official website before applying.
      </p>

      <SectionTitle>Scholarships</SectionTitle>
      <p style={{ marginBottom: 28, fontSize: 14.5 }}>
        {uni.scholarships.fullScholarship
          ? 'Full scholarships have been reported as available for qualified international students.'
          : uni.scholarships.available
          ? 'Partial scholarships or need-based aid have been reported as available.'
          : 'No significant scholarship programs are commonly reported for international students at this institution.'}
        {' '}Confirm current offerings on the official site.
      </p>

      <SectionTitle>Typically required documents</SectionTitle>
      <ul style={{ marginBottom: 32, paddingLeft: 20, fontSize: 14.5, lineHeight: 1.8 }}>
        {uni.documents.map(d => <li key={d}>{d}</li>)}
      </ul>

      <a href={uni.website} target="_blank" rel="noreferrer" className="btn btn-primary">
        Visit official website
      </a>
    </div>
  )
}

function SectionTitle({ children }) {
  return <h2 style={{ fontSize: 16, marginBottom: 14 }}>{children}</h2>
}

function Row({ label, value, last }) {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      padding: '10px 0',
      borderBottom: last ? 'none' : '1px solid var(--line)',
      fontSize: 14,
    }}>
      <span style={{ color: 'var(--ink-soft)' }}>{label}</span>
      <span style={{ fontWeight: 600 }}>{value}</span>
    </div>
  )
}

function MiniScore({ label, value }) {
  return (
    <div className="card" style={{ padding: '12px 14px' }}>
      <div style={{ fontSize: 11.5, color: 'var(--ink-soft)', fontWeight: 600, marginBottom: 4 }}>{label}</div>
      <div style={{ fontFamily: 'var(--serif)', fontSize: 22, fontWeight: 600 }}>{value}</div>
    </div>
  )
          }
