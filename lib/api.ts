const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://importen-backend-production.up.railway.app'

async function apiFetch(path: string, options: RequestInit = {}, token?: string) {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  }
  if (token) headers['Authorization'] = `Bearer ${token}`

  const res = await fetch(`${API_URL}${path}`, { ...options, headers })

  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: 'Noe gikk galt' }))
    throw new Error(err.error || `HTTP ${res.status}`)
  }
  return res.json()
}

// Scrape a listing URL and get import costs
export async function scrapeListing(url: string, token?: string) {
  return apiFetch('/api/scrape', {
    method: 'POST',
    body: JSON.stringify({ url }),
  }, token)
}

// Manual calculation
export async function calculateImport(params: {
  price: number
  currency: string
  year: number
  co2Gkm?: number
  weightKg?: number
  fuelType?: string
}) {
  return apiFetch('/api/calc', {
    method: 'POST',
    body: JSON.stringify(params),
  })
}

// Get exchange rates
export async function getExchangeRates() {
  return apiFetch('/api/currency/rates')
}

// Save a listing
export async function saveListing(data: Record<string, unknown>, token: string) {
  return apiFetch('/api/listings', {
    method: 'POST',
    body: JSON.stringify(data),
  }, token)
}

// Get saved listings
export async function getSavedListings(token: string) {
  return apiFetch('/api/listings', {}, token)
}

// Delete saved listing
export async function deleteListing(id: string, token: string) {
  return apiFetch(`/api/listings/${id}`, { method: 'DELETE' }, token)
}

// Get user profile
export async function getProfile(token: string) {
  return apiFetch('/api/profile', {}, token)
}

// Create Stripe checkout
export async function createCheckout(plan: string, token: string) {
  return apiFetch('/api/stripe/create-checkout', {
    method: 'POST',
    body: JSON.stringify({ plan }),
  }, token)
}

// Health check
export async function healthCheck() {
  return apiFetch('/health')
}

// Detect platform from URL
export function detectPlatform(url: string): string | null {
  if (url.includes('finn.no')) return 'finn'
  if (url.includes('blocket.se')) return 'blocket'
  if (url.includes('mobile.de')) return 'mobilede'
  return null
}

// Format NOK
export function formatNOK(amount: number): string {
  return new Intl.NumberFormat('nb-NO', {
    style: 'currency',
    currency: 'NOK',
    maximumFractionDigits: 0,
  }).format(Math.round(amount))
}

// Format number
export function formatNumber(n: number): string {
  return new Intl.NumberFormat('nb-NO').format(Math.round(n))
}
