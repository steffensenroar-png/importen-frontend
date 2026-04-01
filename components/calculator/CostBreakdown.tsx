'use client'
import { useEffect, useState } from 'react'
import { formatNOK } from '@/lib/api'
import type { ImportCosts } from '@/types'

const BARS = [
  { key: 'priceNOK', label: 'Kjøpspris', color: '#162b56', getValue: (c: ImportCosts) => c.priceNOK },
  { key: 'mva', label: 'MVA (25%)', color: '#1e3a6e', getValue: (c: ImportCosts) => c.mva },
  { key: 'ea', label: 'Engangsavgift', color: '#d85a30', getValue: (c: ImportCosts) => c.ea.afterDeduction },
  { key: 'shipping', label: 'Frakt & toll', color: '#c8890a', getValue: (c: ImportCosts) => c.shipping },
  { key: 'reg', label: 'Registrering + EU-kontroll', color: '#64748b', getValue: (c: ImportCosts) => c.registrationFee + c.euKontroll },
]

export default function CostBreakdown({ costs }: { costs: ImportCosts }) {
  const [animated, setAnimated] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setAnimated(true), 100)
    return () => clearTimeout(t)
  }, [costs])

  const maxVal = Math.max(...BARS.map(b => b.getValue(costs)))

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5">
      <h3 className="font-semibold text-navy-900 mb-5 text-sm">Kostnadsfordeling</h3>

      <div className="space-y-4">
        {BARS.filter(b => b.getValue(costs) > 0).map((bar) => {
          const val = bar.getValue(costs)
          const pct = (val / maxVal) * 100
          return (
            <div key={bar.key}>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-sm text-slate-600">{bar.label}</span>
                <span className="text-sm font-semibold text-navy-900">{formatNOK(val)}</span>
              </div>
              <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full cost-bar"
                  style={{
                    width: animated ? `${pct}%` : '0%',
                    backgroundColor: bar.color,
                  }}
                />
              </div>
            </div>
          )
        })}
      </div>

      {/* Total */}
      <div className="mt-5 pt-5 border-t border-slate-100 flex items-center justify-between">
        <span className="font-semibold text-navy-900">Total</span>
        <span className="text-xl font-bold text-navy-900">{formatNOK(costs.total)}</span>
      </div>

      {/* Bruksfradrag note */}
      {costs.isExempt && (
        <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-xl text-sm text-green-800">
          ✓ Bilen er over 20 år — <strong>fritatt engangsavgift</strong>. Du sparer typisk 30–100 000 kr.
        </div>
      )}
      {!costs.isExempt && costs.ea.deductionPct > 0 && (
        <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-xl text-sm text-blue-800">
          Bruksfradrag: {costs.ea.deductionPct}% rabatt på engangsavgiften
          (original: {formatNOK(costs.ea.base)} → betaler: {formatNOK(costs.ea.afterDeduction)})
        </div>
      )}
    </div>
  )
}
