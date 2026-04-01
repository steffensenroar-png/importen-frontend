'use client'
import Link from 'next/link'
import { useState } from 'react'
import { Menu, X, Car } from 'lucide-react'

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 bg-navy-950/90 backdrop-blur-md border-b border-white/10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 text-white">
          <div className="w-8 h-8 bg-amber-500 rounded-lg flex items-center justify-center">
            <Car size={16} className="text-navy-950" />
          </div>
          <span className="font-display text-lg font-semibold">Importen</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="/kalkulator" className="text-white/70 hover:text-white text-sm transition-colors">
            Kalkulator
          </Link>
          <Link href="/priser" className="text-white/70 hover:text-white text-sm transition-colors">
            Priser
          </Link>
          <Link href="/login" className="text-white/70 hover:text-white text-sm transition-colors">
            Logg inn
          </Link>
          <Link
            href="/kalkulator"
            className="bg-amber-500 hover:bg-amber-400 text-navy-950 font-semibold text-sm px-5 py-2 rounded-lg transition-colors"
          >
            Prøv gratis
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-white/70 hover:text-white"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-navy-950 border-t border-white/10 px-4 py-4 flex flex-col gap-4">
          <Link href="/kalkulator" className="text-white/80 hover:text-white text-sm" onClick={() => setOpen(false)}>
            Kalkulator
          </Link>
          <Link href="/priser" className="text-white/80 hover:text-white text-sm" onClick={() => setOpen(false)}>
            Priser
          </Link>
          <Link href="/login" className="text-white/80 hover:text-white text-sm" onClick={() => setOpen(false)}>
            Logg inn
          </Link>
          <Link
            href="/kalkulator"
            className="bg-amber-500 text-navy-950 font-semibold text-sm px-5 py-2.5 rounded-lg text-center"
            onClick={() => setOpen(false)}
          >
            Prøv gratis
          </Link>
        </div>
      )}
    </nav>
  )
}
