import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { countries as uniCountries } from '../data/universities.js'

const STEPS = ['Basics', 'Academics', 'Test scores', 'Budget', 'Experience']

export default function Onboarding({ profile, setProfile }) {
  const [step, setStep] = useState(0)
  const [form, setForm] = useState(profile)
  const navigate = useNavigate()

  function update(key, value) {
    setForm(f => ({ ...f, [key]: value }))
  }

  function next() {
    if (step < STEPS.length - 1) {
      setStep(step + 1)
    } else {
      setProfile({ ...form, onboarded: true })
      navigate('/dashboard')
    }
  }

  function back() {
    if (step > 0) setStep(step - 1)
  }

  return (
    <div className="container" style={{ maxWidth: 560, padding: '56px 20px 80px' }}>
      <div style={{ marginBottom: 32 }}>
        <div style={{ display: 'flex', gap: 6, marginBottom: 12 }}>
          {STEPS.map((s, i) => (
            <div
              key={s}
              style={{
                flex: 1,
                height: 3,
                borderRadius: 2,
                background: i <= step ? 'var(--accent)' : 'var(--line)',
              }}
            />
          ))}
        </div>
        <div style={{ fontSize: 13, color: 'var(--ink-soft)', fontWeight: 600 }}>
          Step {step + 1} of {STEPS.length} — {STEPS[step]}
        </div>
      </div>

      {step === 0 && <BasicsStep form={form} update={update} />}
      {step === 1 && <AcademicsStep form={form} update={update} />}
      {step === 2 && <TestScoresStep form={form} update={update} />}
      {step === 3 && <BudgetStep form={form} update={update} />}
      {step === 4 && <ExperienceStep form={form} update={update} />}

      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 32 }}>
        {step > 0 ? (
          <button className="btn btn-text" onClick={back}>Back</button>
        ) : <span />}
        <button className="btn btn-primary" onClick={next}>
          {step === STEPS.length - 1 ? 'Finish setup' : 'Continue'}
        </button>
      </div>
    </div>
  )
}

function BasicsStep({ form, update }) {
  return (
    <div>
      <div className="field">
        <label>First name</label>
        <input value={form.firstName} onChange={e => update('firstName', e.target.value)} placeholder="e.g. Aziz" />
      </div>
      <div className="field">
        <label>Country of residence</label>
        <input value={form.country} onChange={e => update('country', e.target.value)} placeholder="e.g. Uzbekistan" />
      </div>
      <div className="field">
        <label>Current education level</label>
        <select value={form.educationLevel} onChange={e => update('educationLevel', e.target.value)}>
          <option value="">Select one</option>
          <option>High school</option>
          <option>Undergraduate</option>
          <option>Graduate</option>
        </select>
      </div>
      <div className="field">
        <label>Graduation year</label>
        <input value={form.gradYear} onChange={e => update('gradYear', e.target.value)} placeholder="e.g. 2027" />
      </div>
    </div>
  )
}

function AcademicsStep({ form, update }) {
  const selected = form.preferredCountries || []
  function toggleCountry(c) {
    update('preferredCountries', selected.includes(c) ? selected.filter(x => x !== c) : [...selected, c])
  }
  return (
    <div>
      <div className="field">
        <label>Intended major (optional)</label>
        <input value={form.major} onChange={e => update('major', e.target.value)} placeholder="e.g. Computer Science" />
      </div>
      <div className="field">
        <label>GPA (4.0 scale — optional)</label>
        <input type="number" step="0.1" min="0" max="4" value={form.gpa} onChange={e => update('gpa', e.target.value)} placeholder="e.g. 3.6" />
      </div>
      <div className="field">
        <label>Preferred countries (optional — pick any)</label>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {uniCountries.map(c => (
            <button
              key={c}
              type="button"
              onClick={() => toggleCountry(c)}
              className="btn btn-secondary"
              style={{
                padding: '8px 14px',
                fontSize: 13,
                background: selected.includes(c) ? 'var(--parchment-deep)' : 'transparent',
                borderColor: selected.includes(c) ? 'var(--ink)' : 'var(--line)',
              }}
            >
              {c}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

function TestScoresStep({ form, update }) {
  return (
    <div>
      <div className="field">
        <label>IELTS score (optional)</label>
        <input type="number" step="0.5" min="0" max="9" value={form.ielts} onChange={e => update('ielts', e.target.value)} placeholder="e.g. 7.0" />
      </div>
      <div className="field">
        <label>TOEFL score (optional — skip if you used IELTS)</label>
        <input type="number" min="0" max="120" value={form.toefl} onChange={e => update('toefl', e.target.value)} placeholder="e.g. 95" />
      </div>
      <div className="field">
        <label>SAT score (optional)</label>
        <input type="number" min="400" max="1600" value={form.sat} onChange={e => update('sat', e.target.value)} placeholder="e.g. 1350" />
      </div>
    </div>
  )
}

function BudgetStep({ form, update }) {
  return (
    <div>
      <div className="field">
        <label>Annual budget in USD (optional)</label>
        <input type="number" min="0" value={form.budget} onChange={e => update('budget', e.target.value)} placeholder="e.g. 15000" />
      </div>
      <div className="field">
        <label style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }}>
          <input
            type="checkbox"
            checked={form.needsFullFunding}
            onChange={e => update('needsFullFunding', e.target.checked)}
            style={{ width: 16, height: 16 }}
          />
          I need a full or significant scholarship to attend
        </label>
      </div>
    </div>
  )
}

function ExperienceStep({ form, update }) {
  return (
    <div>
      <div className="field">
        <label>Extracurricular activities (optional)</label>
        <input value={form.extracurriculars} onChange={e => update('extracurriculars', e.target.value)} placeholder="e.g. Robotics club, student council" />
      </div>
      <div className="field">
        <label>Awards (optional)</label>
        <input value={form.awards} onChange={e => update('awards', e.target.value)} placeholder="e.g. National Olympiad, 2nd place" />
      </div>
      <div className="field">
        <label>Work / volunteer / project experience (optional)</label>
        <input value={form.experience} onChange={e => update('experience', e.target.value)} placeholder="e.g. Built a startup app, volunteered at..." />
      </div>
    </div>
  )
    }
