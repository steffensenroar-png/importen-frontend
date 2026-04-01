'use client'
import { useState, useRef } from 'react'
import { ArrowRight, Search, ExternalLink, BookmarkPlus, Check } from 'lucide-react'
import Navbar from '@/components/layout/Navbar'
import CostBreakdown from '@/components/calculator/CostBreakdown'
import CarCard from '@/components/calculator/CarCard'
import ImportGuide from '@/components/calculator/ImportGuide'
import { scrapeListing, detectPlatform, formatNOK } from '@/lib/api'
import type { CarListing, ImportCosts } from '@/types'
import toast from 'react-hot-toast'

type Result = {
  listing: CarListing
  costs: ImportCosts
  rates: Record<string, number>
}

const DEMOS = [
  { label: 'Blocket.se', url: 'https://www.blocket.se/14097182', color: '#E8252D' },
  { label: 'Mobile.de', url: 'https://www.mobile.de/auto/porsche-911/8832774.html', color: '#0068d2' },
  { label: 'Finn.no', url: 'https://www.finn.no/car/used/ad.html?finnkode=375482891', color: '#06357a' },
]

export default function KalkulatorPage() {
  const [url, setUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<Result | null>(null)
  const [saved, setSaved] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const resultsRef = useRef<HTMLDivElement>(null)

  const platform = detectPlatform(url)

  async function handleScrape(targetUrl?: string) {
    const fetchUrl = targetUrl || url
    if (!fetchUrl.trim()) {
      inputRef.current?.focus()
      return
    }
    const p = detectPlatform(fetchUrl)
    if (!p) {
      toast.error('Lim inn en gyldig URL fra Finn.no, Blocket.se eller Mobile.de')
      return
    }

    setLoading(true)
    setResult(null)
    setSaved(false)

    try {
      const data = await scrapeListing(fetchUrl)
      setResult(data)
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }, 100)
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Kunne ikke hente annonsen'
      toast.error(msg)
    } finally {
      setLoading(false)
    }
  }

  function handleDemoLoad(demoUrl: string) {
    setUrl(demoUrl)
    handleScrape(demoUrl)
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />

      {/* Header */}
      <div className="bg-navy-900 text-white py-12 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="font-display text-4xl md:text-5xl font-semibold mb-4">
            Importkalkulator
          </h1>
          <p className="text-white/60 text-lg">
            Lim inn URL fra Finn.no, Blocket.se eller Mobile.de
          </p>
        </div>
      </div>

      {/* URL Input */}
      <div className="sticky top-16 z-30 bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input
                ref={inputRef}
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleScrape()}
                placeholder="https://www.blocket.se/14097182"
                className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-navy-900/20 focus:border-navy-700 text-navy-900 placeholder-slate-400 text-sm transition-all"
              />
              {/* Platform indicator */}
              {platform && (
                <div className={`absolute right-4 top-1/2 -translate-y-1/2 platform-badge ${
                  platform === 'finn' ? 'pill-finn' :
                  platform === 'blocket' ? 'pill-blocket' : 'pill-mobilede'
                }`}>
                  {platform === 'finn' ? 'Finn.no' : platform === 'blocket' ? 'Blocket.se' : 'Mobile.de'}
                </div>
              )}
            </div>
            <button
              onClick={() => handleScrape()}
              disabled={loading}
              className="bg-navy-900 hover:bg-navy-800 disabled:opacity-50 text-white font-semibold px-6 py-3 rounded-xl transition-colors flex items-center gap-2 text-sm whitespace-nowrap"
            >
              {loading ? (
                <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Henter...</>
              ) : (
                <>Beregn <ArrowRight size={16} /></>
              )}
            </button>
          </div>

          {/* Demo buttons */}
          <div className="flex items-center gap-2 mt-3">
            <span className="text-xs text-slate-400">Demo:</span>
            {DEMOS.map((d) => (
              <button
                key={d.url}
                onClick={() => handleDemoLoad(d.url)}
                disabled={loading}
                className="text-xs px-3 py-1 rounded-full border transition-colors disabled:opacity-50"
                style={{ borderColor: d.color + '40', color: d.color, backgroundColor: d.color + '10' }}
              >
                {d.label} →
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Loading state */}
      {loading && (
        <div className="max-w-3xl mx-auto w-full px-4 sm:px-6 py-8">
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
            <div className="h-48 skeleton" />
            <div className="p-6 space-y-4">
              <div className="h-6 skeleton w-2/3" />
              <div className="h-4 skeleton w-1/2" />
              <div className="grid grid-cols-2 gap-4 mt-6">
                <div className="h-20 skeleton rounded-xl" />
                <div className="h-20 skeleton rounded-xl" />
                <div className="h-20 skeleton rounded-xl" />
                <div className="h-20 skeleton rounded-xl" />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Results */}
      {result && !loading && (
        <div ref={resultsRef} className="max-w-3xl mx-auto w-full px-4 sm:px-6 py-8 space-y-5 stagger-children">

          {/* Car card */}
          <CarCard listing={result.listing} />

          {/* Cost metrics */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white rounded-2xl border border-slate-200 p-5">
              <p className="text-xs text-slate-500 mb-1">Kjøpspris (NOK)</p>
              <p className="text-2xl font-semibold text-navy-900">
                {formatNOK(result.costs.priceNOK)}
              </p>
              <p className="text-xs text-slate-400 mt-1">
                {result.listing.priceForeign.toLocaleString('nb-NO')} {result.listing.currency}
              </p>
            </div>
            <div className="bg-navy-900 rounded-2xl p-5">
              <p className="text-xs text-white/60 mb-1">Total ferdig i Norge</p>
              <p className="text-2xl font-semibold text-amber-400">
                {formatNOK(result.costs.total)}
              </p>
              <p className="text-xs text-white/40 mt-1">
                +{result.costs.importCostPct}% over kjøpspris
              </p>
            </div>
            <div className={`rounded-2xl border p-5 ${result.costs.isExempt ? 'bg-green-50 border-green-200' : 'bg-white border-slate-200'}`}>
              <p className="text-xs text-slate-500 mb-1">Engangsavgift</p>
              <p className={`text-2xl font-semibold ${result.costs.isExempt ? 'text-green-700' : 'text-navy-900'}`}>
                {result.costs.isExempt ? 'Fritatt ✓' : formatNOK(result.costs.ea.afterDeduction)}
              </p>
              <p className="text-xs text-slate-400 mt-1">
                {result.costs.ageYears} år · {result.costs.ea.deductionPct}% bruksfradrag
              </p>
            </div>
            <div className="bg-white rounded-2xl border border-slate-200 p-5">
              <p className="text-xs text-slate-500 mb-1">MVA (25%)</p>
              <p className="text-2xl font-semibold text-navy-900">
                {formatNOK(result.costs.mva)}
              </p>
              <p className="text-xs text-slate-400 mt-1">
                Av tollverdi {formatNOK(result.costs.tollverdi)}
              </p>
            </div>
          </div>

          {/* Detailed breakdown */}
          <CostBreakdown costs={result.costs} />

          {/* Actions */}
          <div className="flex gap-3">
            <button
              onClick={() => { setSaved(true); toast.success('Beregning lagret!') }}
              disabled={saved}
              className="flex-1 flex items-center justify-center gap-2 border border-slate-200 hover:border-navy-700 bg-white hover:bg-slate-50 text-navy-900 font-semibold py-3 rounded-xl transition-all text-sm disabled:opacity-60"
            >
              {saved ? <><Check size={16} className="text-green-600" /> Lagret</> : <><BookmarkPlus size={16} /> Lagre beregning</>}
            </button>
            {result.listing.sourceUrl && (
              <a
                href={result.listing.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 border border-slate-200 hover:border-navy-700 bg-white hover:bg-slate-50 text-navy-900 font-semibold py-3 px-5 rounded-xl transition-all text-sm"
              >
                <ExternalLink size={16} /> Se annonsen
              </a>
            )}
          </div>
        </div>
      )}

      {/* Import guide (always visible at bottom) */}
      <div className="max-w-3xl mx-auto w-full px-4 sm:px-6 pb-12 mt-4">
        <ImportGuide />
      </div>
    </div>
  )
}
