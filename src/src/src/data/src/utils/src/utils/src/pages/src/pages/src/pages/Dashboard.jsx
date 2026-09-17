import React, { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { universities } from '../data/universities.js'
import { computeMatch, tierBadgeClass } from '../utils/matching.js'
import { completionPercent } from '../utils/profile.js'

export default function Dashboard({ profile }) {
  const navigate = useNavigate()
  const completion = completionPercent(profile)

  const matches = useMemo(() => {
    return universities
      .map(u => ({ uni: u, match: computeMatch(profile, u) }))
      .sort((a, b) => b.match.overall - a.match.overall)
  }, [profile])

  const strongCount = matches.filter(m => m.match.tier === 'Strong Fit' || m.match.tier === 'Good Fit').length
  const scholarshipCount = universities.filter(u => u.scholarships.available).length
  const topMatches = matches.slice(0, 3)

  const priorities = buildPriorities(profile, completion)

  return (
    <div className="container" style={{ padding: '40px 20px 80px' }}>
      <h1 style={{ fontSize: 28, marginBottom: 6 }}>
        Welcome back{profile.firstName ? `, ${profile.firstName}` : ''}
      </h1>
      <p style={{ color: 'var(--ink-soft)', marginBottom: 36 }}>
        Here's where your application journey stands today.
      </p>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
        gap: 16,
        marginBottom: 40,
      }}>
        <StatCard label="Profile completion" value={`${completion}%`} />
        <StatCard label="Matched universities" value={strongCount} sub="Strong or Good fit" />
        <StatCard label="Scholarship opportunities" value={scholarshipCount} sub="Across your matches" />
        <StatCard label="Upcoming deadlines" value="—" sub="Coming in Phase 2" />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 24 }}>
        <div>
          <SectionHeader title="Today's priorities" />
          <div className="card" style={{ padding: 20 }}>
            {priorities.map((p, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  gap: 12,
                  padding: '12px 0',
                  borderBottom: i < priorities.length - 1 ? '1px solid var(--line)' : 'none',
                }}
              >
                <div style={{
                  width: 6, height: 6, borderRadius: '50%',
                  background: 'var(--accent)', marginTop: 7, flexShrink: 0,
                }} />
                <div>
                  <div style={{ fontSize: 14.5, fontWeight: 600 }}>{p.title}</div>
                  <div style={{ fontSize: 13, color: 'var(--ink-soft)' }}>{p.body}</div>
                </div>
              </div>
            ))}
          </div>

          <SectionHeader title="Your top matches" style={{ marginTop: 32 }} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {topMatches.map(({ uni, match }) => (
              <div
                key={uni.id}
                className="card"
                style={{ padding: 18, cursor: 'pointer' }}
                onClick={() => navigate(`/university/${uni.id}`)}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 15.5 }}>{uni.name}</div>
                    <div style={{ fontSize: 13, color: 'var(--ink-soft)' }}>{uni.city}, {uni.country}</div>
                  </div>
                  <span className={`badge ${tierBadgeClass(match.tier)}`}>{match.tier} · {match.overall}</span>
                </div>
              </div>
            ))}
          </div>
          <button
            className="btn btn-secondary"
            style={{ marginTop: 16, width: '100%' }}
            onClick={() => navigate('/explore')}
          >
            Explore all universities
          </button>
        </div>

        <div>
          <SectionHeader title="Missing documents" />
          <div className="card" style={{ padding: 18 }}>
            <p style={{ fontSize: 13.5, color: 'var(--ink-soft)', lineHeight: 1.6 }}>
              Document tracking arrives in a later phase. For now, keep your
              transcript, IELTS/TOEFL certificate, and passport copy ready —
              nearly every university on your list requires them.
            </p>
          </div>

          <SectionHeader title="Applications in progress" style={{ marginTop: 32 }} />
          <div className="card" style={{ padding: 18 }}>
            <p style={{ fontSize: 13.5, color: 'var(--ink-soft)', lineHeight: 1.6 }}>
              You haven't started an application yet. Application tracking
              arrives in Phase 2 — for now, use Explore to shortlist schools.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

function buildPriorities(profile, completion) {
  const items = []
  if (completion < 100) {
    items.push({
      title: 'Finish your profile',
      body: `Your profile is ${completion}% complete. Adding your test scores and budget sharpens every match score.`,
    })
  }
  if (!profile.gpa) {
    items.push({ title: 'Add your GPA', body: 'Academic fit is the single biggest factor in your match score.' })
  }
  if (!profile.ielts && !profile.toefl) {
    items.push({ title: 'Add an English test score', body: 'Most universities on your list require IELTS or TOEFL.' })
  }
  if (items.length === 0) {
    items.push({ title: 'Explore your matches', body: 'Your profile looks solid — head to Explore to review universities in detail.' })
  }
  return items
}

function StatCard({ label, value, sub }) {
  return (
    <div className="card" style={{ padding: '18px 20px' }}>
      <div style={{ fontSize: 12.5, color: 'var(--ink-soft)', fontWeight: 600, marginBottom: 6 }}>{label}</div>
      <div style={{ fontFamily: 'var(--serif)', fontSize: 28, fontWeight: 600 }}>{value}</div>
      {sub && <div style={{ fontSize: 12, color: 'var(--ink-soft)', marginTop: 2 }}>{sub}</div>}
    </div>
  )
}

function SectionHeader({ title, style }) {
  return (
    <h2 style={{ fontSize: 16, marginBottom: 14, ...style }}>{title}</h2>
  )
           }
