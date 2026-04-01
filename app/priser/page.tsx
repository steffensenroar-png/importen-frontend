import { Check, X } from 'lucide-react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'

const PLANS = [
  {
    name: 'Gratis',
    price: '0',
    period: 'for alltid',
    description: 'Perfekt for å prøve ut',
    cta: 'Start gratis',
    href: '/kalkulator',
    featured: false,
    features: [
      { text: '3 beregninger per måned', ok: true },
      { text: 'URL-import (Finn, Blocket, Mobile.de)', ok: true },
      { text: 'Importguide', ok: true },
      { text: 'Lagre beregninger', ok: false },
      { text: 'Prisvarsler', ok: false },
      { text: 'Prishistorikk', ok: false },
      { text: 'PDF-eksport', ok: false },
    ],
  },
  {
    name: 'Pro',
    price: '99',
    period: 'per måned',
    description: 'For den seriøse bilkjøperen',
    cta: 'Start Pro',
    href: '/login?plan=pro',
    featured: true,
    features: [
      { text: 'Ubegrensede beregninger', ok: true },
      { text: 'URL-import (Finn, Blocket, Mobile.de)', ok: true },
      { text: 'Lagre ubegrenset', ok: true },
      { text: 'Prisvarsler (20 aktive)', ok: true },
      { text: 'Prishistorikk', ok: true },
      { text: 'PDF-eksport', ok: true },
      { text: 'Norges-prissammenligning', ok: true },
    ],
  },
  {
    name: 'Forhandler',
    price: '499',
    period: 'per måned',
    description: 'For profesjonelle importører',
    cta: 'Kontakt oss',
    href: 'mailto:hei@importen.no',
    featured: false,
    features: [
      { text: 'Alt i Pro', ok: true },
      { text: 'Bulk-beregninger (API)', ok: true },
      { text: 'Team-kontoer (5 brukere)', ok: true },
      { text: '100 prisvarsler', ok: true },
      { text: 'Prioritert støtte', ok: true },
      { text: 'Hvit-merking (white label)', ok: true },
      { text: 'Dedikert onboarding', ok: true },
    ],
  },
]

export default function PriserPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="bg-navy-900 text-white py-16 px-4 sm:px-6 text-center">
        <h1 className="font-display text-4xl md:text-5xl font-semibold mb-4">Enkle priser</h1>
        <p className="text-white/60 text-lg">Start gratis. Oppgrader når du er klar.</p>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid md:grid-cols-3 gap-6 items-start">
          {PLANS.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-2xl p-6 ${
                plan.featured
                  ? 'bg-navy-900 text-white border-2 border-amber-500 relative'
                  : 'bg-white border border-slate-200'
              }`}
            >
              {plan.featured && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-amber-500 text-navy-950 text-xs font-bold px-4 py-1 rounded-full">
                  Mest populær
                </div>
              )}

              <div className="mb-6">
                <p className={`text-sm font-semibold mb-2 ${plan.featured ? 'text-amber-400' : 'text-slate-500'}`}>
                  {plan.name}
                </p>
                <div className="flex items-baseline gap-1 mb-1">
                  <span className={`text-4xl font-bold ${plan.featured ? 'text-white' : 'text-navy-900'}`}>
                    {plan.price} kr
                  </span>
                </div>
                <p className={`text-sm ${plan.featured ? 'text-white/50' : 'text-slate-400'}`}>{plan.period}</p>
                <p className={`text-sm mt-2 ${plan.featured ? 'text-white/70' : 'text-slate-500'}`}>
                  {plan.description}
                </p>
              </div>

              <ul className="space-y-3 mb-6">
                {plan.features.map((f) => (
                  <li key={f.text} className="flex items-start gap-2.5 text-sm">
                    {f.ok ? (
                      <Check size={16} className={`shrink-0 mt-0.5 ${plan.featured ? 'text-amber-400' : 'text-green-600'}`} />
                    ) : (
                      <X size={16} className="shrink-0 mt-0.5 text-slate-300" />
                    )}
                    <span className={f.ok ? (plan.featured ? 'text-white/80' : 'text-slate-700') : 'text-slate-400'}>
                      {f.text}
                    </span>
                  </li>
                ))}
              </ul>

              <Link
                href={plan.href}
                className={`block text-center py-3 rounded-xl font-semibold text-sm transition-all ${
                  plan.featured
                    ? 'bg-amber-500 hover:bg-amber-400 text-navy-950'
                    : 'border border-slate-200 hover:border-navy-700 hover:bg-slate-50 text-navy-900'
                }`}
              >
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>

        {/* FAQ */}
        <div className="mt-16 max-w-2xl mx-auto">
          <h2 className="font-display text-3xl font-semibold text-navy-900 text-center mb-8">Vanlige spørsmål</h2>
          <div className="space-y-4">
            {[
              ['Er beregningene nøyaktige?', 'Avgiftssatsene hentes direkte fra Skatteetaten og oppdateres løpende. Valutakurser oppdateres daglig fra Norges Bank. Fraktkostnader er estimater.'],
              ['Hva skjer etter 3 gratis beregninger?', 'Du kan fortsatt bruke kalkulatoren med manuell innlegging, men URL-import krever Pro-abonnement.'],
              ['Kan jeg avbestille når som helst?', 'Ja, du kan avbestille fra kontoinnstillingene når som helst. Du beholder Pro-tilgang ut perioden du har betalt for.'],
              ['Støtter dere andre land enn Sverige og Tyskland?', 'Vi støtter alle biler med europeisk prisformat. Valutakonvertering støtter 5+ valutaer.'],
            ].map(([q, a]) => (
              <details key={q} className="group bg-white rounded-xl border border-slate-200 px-5 py-4">
                <summary className="font-semibold text-navy-900 text-sm cursor-pointer list-none flex justify-between items-center">
                  {q}
                  <span className="text-slate-400 group-open:rotate-180 transition-transform ml-4">↓</span>
                </summary>
                <p className="text-slate-500 text-sm mt-3 leading-relaxed">{a}</p>
              </details>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
