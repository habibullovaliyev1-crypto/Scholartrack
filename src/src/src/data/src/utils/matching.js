function scoreAcademic(profile, uni) {
  const req = uni.requirements.gpaMin
  if (!profile.gpa || !req) return 70
  const diff = profile.gpa - req
  if (diff >= 0.3) return 100
  if (diff >= 0) return 88
  if (diff >= -0.2) return 68
  if (diff >= -0.4) return 45
  return 20
}

function scoreEnglish(profile, uni) {
  const hasIelts = profile.ielts && uni.requirements.ieltsMin
  const hasToefl = profile.toefl && uni.requirements.toeflMin
  if (!hasIelts && !hasToefl) return 65

  let best = null
  if (hasIelts) {
    const diff = profile.ielts - uni.requirements.ieltsMin
    best = diff >= 0.5 ? 100 : diff >= 0 ? 88 : diff >= -0.5 ? 65 : 35
  }
  if (hasToefl) {
    const diff = profile.toefl - uni.requirements.toeflMin
    const toeflScore = diff >= 8 ? 100 : diff >= 0 ? 88 : diff >= -8 ? 65 : 35
    best = best === null ? toeflScore : Math.max(best, toeflScore)
  }
  return best
}

function scoreTest(profile, uni) {
  if (!uni.requirements.satMin) return 75
  if (!profile.sat) return 55
  const diff = profile.sat - uni.requirements.satMin
  if (diff >= 100) return 100
  if (diff >= 0) return 85
  if (diff >= -80) return 60
  return 30
}

function scoreFinancial(profile, uni) {
  if (!profile.budget) return 65
  const avgTuition = (uni.tuitionUSD.min + uni.tuitionUSD.max) / 2
  if (profile.needsFullFunding && uni.scholarships.fullScholarship) return 95
  if (profile.needsFullFunding && !uni.scholarships.fullScholarship) return 40
  if (avgTuition <= profile.budget) return 95
  const overBy = (avgTuition - profile.budget) / profile.budget
  if (overBy <= 0.25) return 65
  if (overBy <= 0.6) return 40
  return 20
}

function scoreProgram(profile, uni) {
  if (!profile.major) return 70
  const match = uni.programs.some(
    p => p.toLowerCase().includes(profile.major.toLowerCase()) ||
         profile.major.toLowerCase().includes(p.toLowerCase())
  )
  return match ? 95 : 45
}

function scoreScholarship(profile, uni) {
  if (!profile.needsFullFunding) return 75
  if (uni.scholarships.fullScholarship) return 100
  if (uni.scholarships.available) return 55
  return 25
}

export function computeMatch(profile, uni) {
  const academic = scoreAcademic(profile, uni)
  const english = scoreEnglish(profile, uni)
  const test = scoreTest(profile, uni)
  const financial = scoreFinancial(profile, uni)
  const program = scoreProgram(profile, uni)
  const scholarship = scoreScholarship(profile, uni)

  const overall = Math.round(
    academic * 0.25 +
    english * 0.2 +
    test * 0.15 +
    financial * 0.2 +
    program * 0.1 +
    scholarship * 0.1
  )

  let tier
  if (overall >= 90) tier = 'Strong Fit'
  else if (overall >= 75) tier = 'Good Fit'
  else if (overall >= 60) tier = 'Competitive'
  else tier = 'Reach'

  return {
    overall,
    tier,
    breakdown: { academic, english, test, financial, program, scholarship },
  }
}

export function tierBadgeClass(tier) {
  if (tier === 'Strong Fit' || tier === 'Good Fit') return 'badge-good'
  if (tier === 'Competitive') return 'badge-warn'
  return 'badge-reach'
                      }
