import React, { useState, useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import NavBar from './components/NavBar.jsx'
import Landing from './pages/Landing.jsx'
import Onboarding from './pages/Onboarding.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Explorer from './pages/Explorer.jsx'
import UniversityDetail from './pages/UniversityDetail.jsx'
import { loadProfile, saveProfile } from './utils/profile.js'

export default function App() {
  const [profile, setProfile] = useState(loadProfile())

  useEffect(() => {
    saveProfile(profile)
  }, [profile])

  return (
    <>
      {profile.onboarded && <NavBar />}
      <Routes>
        <Route
          path="/"
          element={
            profile.onboarded
              ? <Navigate to="/dashboard" replace />
              : <Landing />
          }
        />
        <Route
          path="/onboarding"
          element={<Onboarding profile={profile} setProfile={setProfile} />}
        />
        <Route
          path="/dashboard"
          element={
            profile.onboarded
              ? <Dashboard profile={profile} />
              : <Navigate to="/onboarding" replace />
          }
        />
        <Route
          path="/explore"
          element={
            profile.onboarded
              ? <Explorer profile={profile} />
              : <Navigate to="/onboarding" replace />
          }
        />
        <Route
          path="/university/:id"
          element={
            profile.onboarded
              ? <UniversityDetail profile={profile} />
              : <Navigate to="/onboarding" replace />
          }
        />
      </Routes>
    </>
  )
          }
