import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Landing() {
  const navigate = useNavigate()

  return (
    <div>
      <section style={{ borderBottom: '1px solid var(--line)' }}>
        <div className="container" style={{
          padding: '96px 20px 80px',
          maxWidth: 720,
          margin: '0 auto',
          textAlign: 'center',
        }}>
          <div style={{
            fontFamily: 'var(--serif)',
            fontStyle: 'italic',
            fontSize: 16,
            color: 'var(--ink-soft)',
            marginBottom: 20,
          }}>
            For students building a path abroad
          </div>
          <h1 style={{ fontSize: 44, marginBottom: 24 }}>
            Know exactly where you stand — and where you fit.
          </h1>
          <p style={{
            fontSize: 18,
            color: 'var(--ink-soft)',
            lineHeight: 1.6,
            marginBottom: 40,
          }}>
            Enter your grades, test scores, and experience once. ScholarTrack
            compares your profile against real admission requirements and
            shows you which universities and scholarships are genuinely
            within reach.
          </p>
          <button
