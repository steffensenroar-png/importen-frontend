const STEPS = [
  {
    num: '01',
    title: 'Finn bilen',
    desc: 'Søk på Finn.no, Blocket.se eller Mobile.de. Lim inn URL-en i kalkulatoren for å se totalkostnad.',
  },
  {
    num: '02',
    title: 'Sjekk historikk',
    desc: 'Bestill historikkrapport (DEKRA, Autovista). Sjekk chassisnummer hos Transportstyrelsen.',
  },
  {
    num: '03',
    title: 'Kjøp og forsikring',
    desc: 'Signer kjøpekontrakt. Tegn grenseforsikring (ansvar) før du kjører til Norge.',
  },
  {
    num: '04',
    title: 'Kryss grensen',
    desc: 'Kjør til bemannet grenseovergang. Meld deg i rød sone og deklarer bilen. Betal 25% MVA til Tolletaten.',
  },
  {
    num: '05',
    title: 'Statens vegvesen',
    desc: 'Book EU-kontroll. Ta med kjøpekontrakt, fortollingsdokument (NA-0221) og utenlandsk vognkort.',
  },
  {
    num: '06',
    title: 'Registrert i Norge',
    desc: 'Betal engangsavgift digitalt. Bilen registreres og du får norske skilter i posten.',
  },
]

export default function ImportGuide() {
  return (
    <details className="group bg-white rounded-2xl border border-slate-200 overflow-hidden">
      <summary className="flex items-center justify-between p-5 cursor-pointer hover:bg-slate-50 transition-colors list-none">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-navy-900 rounded-lg flex items-center justify-center text-amber-400 text-xs font-bold">
            6
          </div>
          <span className="font-semibold text-navy-900 text-sm">Importguide — steg for steg</span>
        </div>
        <span className="text-slate-400 group-open:rotate-180 transition-transform">↓</span>
      </summary>

      <div className="px-5 pb-5 border-t border-slate-100">
        <div className="space-y-0 mt-4">
          {STEPS.map((step, i) => (
            <div key={step.num} className="flex gap-4 relative">
              {/* Line */}
              {i < STEPS.length - 1 && (
                <div className="absolute left-5 top-10 bottom-0 w-px bg-slate-200" />
              )}
              <div className="w-10 h-10 bg-navy-900 rounded-xl flex items-center justify-center text-xs font-bold text-amber-400 shrink-0 z-10">
                {step.num}
              </div>
              <div className="pb-6">
                <p className="font-semibold text-navy-900 text-sm mb-1">{step.title}</p>
                <p className="text-sm text-slate-500 leading-relaxed">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </details>
  )
}
