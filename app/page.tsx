import Link from 'next/link'
import { ArrowRight, Calculator, Bell, Shield, Zap, TrendingDown } from 'lucide-react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero */}
      <section className="hero-gradient text-white relative overflow-hidden">
        {/* Decorative grid */}
        <div className="absolute inset-0 opacity-5"
          style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-24 md:py-36 relative z-10">
          <div className="max-w-3xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-sm mb-8 backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse-slow" />
              Støtter Finn.no · Blocket.se · Mobile.de
            </div>

            <h1 className="font-display text-5xl md:text-7xl font-semibold leading-tight mb-6">
              Vet du egentlig hva
              <br />
              bilen koster <em>hjemme</em>?
            </h1>

            <p className="text-lg md:text-xl text-white/70 max-w-xl mb-10 leading-relaxed">
              Beregn MVA, engangsavgift og frakt for bil importert fra Sverige, 
              Tyskland og andre land — direkte fra annonsen.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/kalkulator"
                className="inline-flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-400 text-navy-950 font-semibold px-8 py-4 rounded-xl transition-all duration-200 hover:scale-[1.02] shadow-lg shadow-amber-500/25"
              >
                Start kalkulator
                <ArrowRight size={18} />
              </Link>
              <Link
                href="/priser"
                className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white px-8 py-4 rounded-xl transition-all duration-200 backdrop-blur-sm"
              >
                Se priser
              </Link>
            </div>
          </div>
        </div>

        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 48h1440V24C1200 8 960 0 720 0S240 8 0 24v24z" fill="#f8fafc" />
          </svg>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 px-4 sm:px-6 max-w-6xl mx-auto w-full">
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl md:text-5xl font-semibold text-navy-900 mb-4">
            Alt du trenger å vite
          </h2>
          <p className="text-slate-500 text-lg max-w-xl mx-auto">
            Én lenke er alt du trenger. Vi beregner alt automatisk.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 stagger-children">
          {[
            {
              icon: <Zap size={22} />,
              title: 'Lim inn URL',
              desc: 'Kopier lenken fra Blocket.se, Finn.no eller Mobile.de — vi henter all informasjon automatisk.',
            },
            {
              icon: <Calculator size={22} />,
              title: 'Nøyaktig kalkulator',
              desc: 'MVA, engangsavgift med bruksfradrag, frakt og registrering. Biler over 20 år er fritatt engangsavgift.',
            },
            {
              icon: <Bell size={22} />,
              title: 'Prisvarsler',
              desc: 'Lagre interessante biler og få varsel når prisen faller eller annonsen forsvinner.',
            },
            {
              icon: <TrendingDown size={22} />,
              title: 'Prishistorikk',
              desc: 'Se hvordan prisen har utviklet seg over tid for lagrede biler.',
            },
            {
              icon: <Shield size={22} />,
              title: 'Alltid oppdatert',
              desc: 'Engangsavgiftsatser og valutakurser fra Norges Bank oppdateres automatisk.',
            },
            {
              icon: <ArrowRight size={22} />,
              title: 'Steg-for-steg guide',
              desc: 'Fra annonse til norsk skilt — komplett importguide inkludert.',
            },
          ].map((f, i) => (
            <div key={i} className="bg-white rounded-2xl p-6 border border-slate-200 card-hover">
              <div className="w-10 h-10 bg-navy-900 rounded-xl flex items-center justify-center text-amber-400 mb-4">
                {f.icon}
              </div>
              <h3 className="font-semibold text-navy-900 mb-2">{f.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto bg-navy-900 rounded-3xl p-10 md:p-16 text-white text-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-10"
            style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, #f5a623 0%, transparent 50%), radial-gradient(circle at 80% 50%, #1e3a6e 0%, transparent 50%)' }} />
          <div className="relative z-10">
            <h2 className="font-display text-4xl md:text-5xl font-semibold mb-4">
              Klar til å beregne?
            </h2>
            <p className="text-white/70 text-lg mb-8">
              Gratis for 3 beregninger. Pro fra 99 kr/mnd.
            </p>
            <Link
              href="/kalkulator"
              className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-navy-950 font-semibold px-8 py-4 rounded-xl transition-all hover:scale-[1.02]"
            >
              Start gratis <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
