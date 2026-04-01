'use client'
import { useEffect, useState } from 'react'
import { BookmarkX, TrendingDown, Bell, ExternalLink, Plus, LogOut } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { createClient } from '@/lib/supabase'
import { getSavedListings, deleteListing, formatNOK } from '@/lib/api'
import type { SavedListing } from '@/types'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'

export default function DashboardPage() {
  const [listings, setListings] = useState<SavedListing[]>([])
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<{ email?: string } | null>(null)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) { router.push('/login'); return }
      setUser(data.user)
      fetchListings(data.user.id)
    })
  }, [])

  async function fetchListings(userId: string) {
    try {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) return
      const data = await getSavedListings(session.access_token)
      setListings(data.listings || [])
    } catch {
      toast.error('Kunne ikke laste lagrede biler')
    } finally {
      setLoading(false)
    }
  }

  async function handleDelete(id: string) {
    try {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) return
      await deleteListing(id, session.access_token)
      setListings(l => l.filter(x => x.id !== id))
      toast.success('Slettet')
    } catch {
      toast.error('Kunne ikke slette')
    }
  }

  async function handleLogout() {
    await supabase.auth.signOut()
    router.push('/')
  }

  const totalSaved = listings.reduce((sum, l) => sum + l.calcTotal, 0)

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-navy-900 text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 flex items-center justify-between">
          <div>
            <Link href="/" className="text-white/50 text-sm hover:text-white/80 transition-colors">← Tilbake</Link>
            <h1 className="font-display text-2xl font-semibold mt-1">Mine lagrede biler</h1>
            <p className="text-white/50 text-sm mt-0.5">{user?.email}</p>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/kalkulator" className="flex items-center gap-1.5 bg-amber-500 hover:bg-amber-400 text-navy-950 font-semibold px-4 py-2 rounded-xl text-sm transition-colors">
              <Plus size={15} /> Ny beregning
            </Link>
            <button onClick={handleLogout} className="p-2 text-white/50 hover:text-white transition-colors">
              <LogOut size={18} />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        {/* Summary cards */}
        {listings.length > 0 && (
          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="bg-white rounded-2xl border border-slate-200 p-5">
              <p className="text-xs text-slate-500 mb-1">Lagrede biler</p>
              <p className="text-3xl font-bold text-navy-900">{listings.length}</p>
            </div>
            <div className="bg-white rounded-2xl border border-slate-200 p-5">
              <p className="text-xs text-slate-500 mb-1">Aktive annonser</p>
              <p className="text-3xl font-bold text-navy-900">{listings.filter(l => l.isActive).length}</p>
            </div>
            <div className="bg-navy-900 rounded-2xl p-5">
              <p className="text-xs text-white/60 mb-1">Total verdi (NOK)</p>
              <p className="text-2xl font-bold text-amber-400">{formatNOK(totalSaved)}</p>
            </div>
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div className="grid sm:grid-cols-2 gap-4">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
                <div className="h-36 skeleton" />
                <div className="p-4 space-y-3">
                  <div className="h-5 skeleton w-2/3" />
                  <div className="h-4 skeleton w-1/2" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty state */}
        {!loading && listings.length === 0 && (
          <div className="text-center py-20">
            <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <BookmarkX size={28} className="text-slate-400" />
            </div>
            <h3 className="font-semibold text-navy-900 mb-2">Ingen lagrede biler ennå</h3>
            <p className="text-slate-500 text-sm mb-6">Beregn importkostnad og lagre interessante biler her.</p>
            <Link href="/kalkulator" className="inline-flex items-center gap-2 bg-navy-900 text-white font-semibold px-6 py-3 rounded-xl text-sm hover:bg-navy-800 transition-colors">
              <Plus size={16} /> Start kalkulator
            </Link>
          </div>
        )}

        {/* Listings grid */}
        {!loading && listings.length > 0 && (
          <div className="grid sm:grid-cols-2 gap-4">
            {listings.map((listing) => (
              <div key={listing.id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden card-hover group">
                {/* Image */}
                <div className="relative h-36 bg-slate-100">
                  {listing.images?.[0] ? (
                    <Image src={listing.images[0]} alt={`${listing.make} ${listing.model}`} fill className="object-cover" unoptimized />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-slate-300 text-xs">Ingen bilde</div>
                  )}
                  {/* Status badge */}
                  <div className={`absolute top-2 left-2 text-xs px-2 py-0.5 rounded-full ${listing.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-700'}`}>
                    {listing.isActive ? 'Aktiv' : 'Fjernet'}
                  </div>
                  {/* Actions overlay */}
                  <div className="absolute top-2 right-2 flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                    {listing.sourceUrl && (
                      <a href={listing.sourceUrl} target="_blank" rel="noopener"
                        className="w-7 h-7 bg-white/90 backdrop-blur-sm rounded-lg flex items-center justify-center text-navy-900 hover:bg-white">
                        <ExternalLink size={13} />
                      </a>
                    )}
                    <button onClick={() => handleDelete(listing.id)}
                      className="w-7 h-7 bg-white/90 backdrop-blur-sm rounded-lg flex items-center justify-center text-red-500 hover:bg-white">
                      <BookmarkX size={13} />
                    </button>
                  </div>
                </div>

                {/* Info */}
                <div className="p-4">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div>
                      <p className="font-semibold text-navy-900 text-sm">{listing.make} {listing.model}</p>
                      <p className="text-xs text-slate-500">{listing.year}{listing.fuelType ? ` · ${listing.fuelType}` : ''}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="font-bold text-navy-900 text-sm">{formatNOK(listing.calcTotal)}</p>
                      <p className="text-xs text-slate-400">totalt</p>
                    </div>
                  </div>

                  {/* Cost breakdown mini */}
                  <div className="flex gap-3 text-xs text-slate-500 border-t border-slate-100 pt-2 mt-2">
                    <span>Kjøp: {formatNOK(listing.priceNok)}</span>
                    <span>MVA: {formatNOK(listing.calcMva)}</span>
                    {listing.calcEa === 0 ? (
                      <span className="text-green-600 font-medium">EA: Fritatt</span>
                    ) : (
                      <span>EA: {formatNOK(listing.calcEa)}</span>
                    )}
                  </div>

                  {/* Alert button */}
                  <button className="mt-3 w-full flex items-center justify-center gap-1.5 border border-slate-200 hover:border-navy-700 text-navy-700 text-xs font-semibold py-2 rounded-lg transition-colors">
                    <Bell size={12} /> Aktiver prisvarsel
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Upgrade banner for free users */}
        <div className="mt-8 bg-navy-900 rounded-2xl p-6 text-white flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <TrendingDown size={24} className="text-amber-400 shrink-0" />
            <div>
              <p className="font-semibold text-sm">Få prisvarsler på lagrede biler</p>
              <p className="text-white/60 text-xs mt-0.5">Oppgrader til Pro og bli varslet når prisen faller.</p>
            </div>
          </div>
          <Link href="/priser" className="shrink-0 bg-amber-500 hover:bg-amber-400 text-navy-950 font-semibold px-5 py-2 rounded-xl text-sm transition-colors">
            Oppgrader
          </Link>
        </div>
      </div>
    </div>
  )
}
