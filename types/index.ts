// Car listing from scraper
export interface CarListing {
  platform: 'finn' | 'blocket' | 'mobilede' | 'manual'
  platformName: string
  sourceUrl?: string
  sourceId?: string
  make: string
  model: string
  year: number
  fuelType?: string
  transmission?: string
  mileageKm?: number
  co2Gkm?: number
  weightKg?: number
  powerKw?: number
  engineCc?: number
  color?: string
  priceForeign: number
  currency: string
  title?: string
  images: string[]
  imageCount: number
  location?: string
  isDealer?: boolean
}

// Import cost breakdown
export interface ImportCosts {
  priceNOK: number
  ageMonths: number
  ageYears: number
  isExempt: boolean
  tollverdi: number
  mva: number
  ea: {
    base: number
    deductionPct: number
    afterDeduction: number
    breakdown: {
      co2: number | null
      weight: number
      nox: number
      cc: number | null
    }
  }
  shipping: number
  registrationFee: number
  euKontroll: number
  total: number
  importCostNOK: number
  importCostPct: number
}

// Saved listing in DB
export interface SavedListing {
  id: string
  userId: string
  platform: string
  sourceUrl?: string
  make: string
  model: string
  year: number
  fuelType?: string
  mileageKm?: number
  priceForeign: number
  currency: string
  priceNok: number
  images: string[]
  calcMva: number
  calcEa: number
  calcShipping: number
  calcReg: number
  calcTotal: number
  bruksfradragPct: number
  isActive: boolean
  notes?: string
  createdAt: string
}

// Exchange rates
export interface ExchangeRates {
  NOK: number
  SEK: number
  EUR: number
  DKK: number
  GBP: number
  USD: number
}

// User profile
export interface UserProfile {
  id: string
  email: string
  fullName?: string
  plan: 'free' | 'pro' | 'dealer'
  planExpiresAt?: string
}

export interface UserUsage {
  calcsThisMonth: number
  calcsLimit: number | null
  savedListings: number
  savedLimit: number | null
  activeAlerts: number
  alertsLimit: number | null
}

// Supported platforms
export interface Platform {
  id: string
  name: string
  url: string
  color: string
  currency: string
}

export const PLATFORMS: Platform[] = [
  { id: 'finn', name: 'Finn.no', url: 'finn.no', color: '#06357a', currency: 'NOK' },
  { id: 'blocket', name: 'Blocket.se', url: 'blocket.se', color: '#E8252D', currency: 'SEK' },
  { id: 'mobilede', name: 'Mobile.de', url: 'mobile.de', color: '#0068d2', currency: 'EUR' },
]
