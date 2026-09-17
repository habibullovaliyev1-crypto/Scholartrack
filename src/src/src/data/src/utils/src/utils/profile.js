const KEY = 'scholartrack-profile'

export const emptyProfile = {
  firstName: '',
  country: '',
  educationLevel: '',
  gradYear: '',
  major: '',
  preferredCountries: [],
  gpa: '',
  ielts: '',
  toefl: '',
  sat: '',
  budget: '',
  needsFullFunding: false,
  extracurriculars: '',
  awards: '',
  experience: '',
  onboarded: false,
}

export function loadProfile() {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return { ...emptyProfile }
    return { ...emptyProfile, ...JSON.parse(raw) }
  } catch {
    return { ...emptyProfile }
  }
}

export function saveProfile(profile) {
  localStorage.setItem(KEY, JSON.stringify(profile))
}

const FIELD_WEIGHTS = {
  firstName: 5,
  country: 5,
  educationLevel: 10,
  gradYear: 5,
  major: 10,
  preferredCountries: 10,
  gpa: 15,
  ielts: 10,
  toefl: 5,
  sat: 10,
  budget: 10,
  extracurriculars: 5,
  awards: 5,
  experience: 5,
}

export function completionPercent(profile) {
  let total = 0
  let earned = 0
  for (const [key, weight] of Object.entries(FIELD_WEIGHTS)) {
    total += weight
    const val = profile[key]
    if (Array.isArray(val) ? val.length > 0 : val !== '' && val != null) {
      earned += weight
    }
  }
  return Math.round((earned / total) * 100)
  }
