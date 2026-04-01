import Link from 'next/link'
import { Car } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-navy-950 text-white/60 mt-auto">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 text-white mb-4">
              <div className="w-8 h-8 bg-amber-500 rounded-lg flex items-center justify-center">
                <Car size={16} className="text-navy-950" />
              </div>
              <span className="font-display text-lg font-semibold">Importen</span>
            </Link>
            <p className="text-sm leading-relaxed">
              Norges enkleste verktøy for å beregne importkostnad på bil.
            </p>
          </div>
          <div>
            <p className="text-white text-sm font-semibold mb-4">Produkt</p>
            <div className="flex flex-col gap-3 text-sm">
              <Link href="/kalkulator" className="hover:text-white transition-colors">Kalkulator</Link>
              <Link href="/priser" className="hover:text-white transition-colors">Priser</Link>
              <Link href="/dashboard" className="hover:text-white transition-colors">Dashboard</Link>
            </div>
          </div>
          <div>
            <p className="text-white text-sm font-semibold mb-4">Ressurser</p>
            <div className="flex flex-col gap-3 text-sm">
              <a href="https://www.toll.no" target="_blank" rel="noopener" className="hover:text-white transition-colors">Tolletaten</a>
              <a href="https://www.skatteetaten.no" target="_blank" rel="noopener" className="hover:text-white transition-colors">Skatteetaten</a>
              <a href="https://www.vegvesen.no" target="_blank" rel="noopener" className="hover:text-white transition-colors">Statens vegvesen</a>
            </div>
          </div>
          <div>
            <p className="text-white text-sm font-semibold mb-4">Selskap</p>
            <div className="flex flex-col gap-3 text-sm">
              <Link href="/om" className="hover:text-white transition-colors">Om oss</Link>
              <Link href="/personvern" className="hover:text-white transition-colors">Personvern</Link>
              <Link href="/vilkar" className="hover:text-white transition-colors">Vilkår</Link>
            </div>
          </div>
        </div>
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
          <p>© {new Date().getFullYear()} Importen. Alle rettigheter reservert.</p>
          <p>Avgiftssatser fra Skatteetaten · Valutakurser fra Norges Bank</p>
        </div>
      </div>
    </footer>
  )
}
