import React from 'react'
import { NavLink } from 'react-router-dom'

export default function NavBar() {
  return (
    <header style={{
      borderBottom: '1px solid var(--line)',
      background: 'var(--parchment)',
      position: 'sticky',
      top: 0,
      zIndex: 10,
    }}>
      <div className="container" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 64,
      }}>
        <div style={{ fontFamily: 'var(--serif)', fontWeight: 700, fontSize: 20 }}>
          ScholarTrack
        </div>
        <nav style={{ display: 'flex', gap: 4 }}>
          <NavLink to="/dashboard" style={navStyle}>Dashboard</NavLink>
          <NavLink to="/explore" style={navStyle}>Explore</NavLink>
        </nav>
      </div>
    </header>
  )
}

function navStyle({ isActive }) {
  return {
    padding: '8px 14px',
    borderRadius: 3,
    fontSize: 14,
    fontWeight: 600,
    color: isActive ? 'var(--ink)' : 'var(--ink-soft)',
    background: isActive ? 'var(--parchment-deep)' : 'transparent',
  }
      }
