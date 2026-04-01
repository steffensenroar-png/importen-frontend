'use client'
import Image from 'next/image'
import { useState } from 'react'
import { MapPin, Gauge, Fuel, Calendar, ImageOff } from 'lucide-react'
import type { CarListing } from '@/types'

export default function CarCard({ listing }: { listing: CarListing }) {
  const [imgError, setImgError] = useState(false)
  const mainImage = listing.images?.[0]

  const platformColor = {
    finn: { bg: '#eef2ff', color: '#06357a', border: '#c7d2fe' },
    blocket: { bg: '#fff1f2', color: '#be123c', border: '#fecdd3' },
    mobilede: { bg: '#eff6ff', color: '#1d4ed8', border: '#bfdbfe' },
    manual: { bg: '#f8fafc', color: '#475569', border: '#e2e8f0' },
  }[listing.platform] || { bg: '#f8fafc', color: '#475569', border: '#e2e8f0' }

  return (
    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
      {/* Image */}
      <div className="relative h-52 sm:h-64 bg-slate-100">
        {mainImage && !imgError ? (
          <Image
            src={mainImage}
            alt={`${listing.make} ${listing.model}`}
            fill
            className="object-cover"
            onError={() => setImgError(true)}
            unoptimized
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <ImageOff size={32} className="text-slate-300" />
          </div>
        )}
        {/* Platform badge */}
        <div className="absolute top-3 left-3">
          <span
            className="platform-badge text-xs"
            style={{ background: platformColor.bg, color: platformColor.color, borderColor: platformColor.border }}
          >
            {listing.platformName}
          </span>
        </div>
        {/* Image count */}
        {listing.imageCount > 1 && (
          <div className="absolute bottom-3 right-3 bg-black/50 text-white text-xs px-2.5 py-1 rounded-full backdrop-blur-sm">
            {listing.imageCount} bilder
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-5">
        <div className="flex items-start justify-between gap-4 mb-3">
          <div>
            <h2 className="text-xl font-semibold text-navy-900">
              {listing.make} {listing.model}
            </h2>
            <p className="text-sm text-slate-500 mt-0.5">
              {listing.year}
              {listing.fuelType && ` · ${listing.fuelType}`}
              {listing.transmission && ` · ${listing.transmission}`}
            </p>
          </div>
          <div className="text-right shrink-0">
            <p className="text-lg font-semibold text-navy-900">
              {listing.priceForeign.toLocaleString('nb-NO')} {listing.currency}
            </p>
          </div>
        </div>

        {/* Specs row */}
        <div className="flex flex-wrap gap-4 text-sm text-slate-600">
          {listing.mileageKm && (
            <span className="flex items-center gap-1.5">
              <Gauge size={14} className="text-slate-400" />
              {listing.mileageKm.toLocaleString('nb-NO')} km
            </span>
          )}
          {listing.co2Gkm && (
            <span className="flex items-center gap-1.5">
              <Fuel size={14} className="text-slate-400" />
              {listing.co2Gkm} g/km CO₂
            </span>
          )}
          {listing.year && (
            <span className="flex items-center gap-1.5">
              <Calendar size={14} className="text-slate-400" />
              {listing.year}
            </span>
          )}
          {listing.location && (
            <span className="flex items-center gap-1.5">
              <MapPin size={14} className="text-slate-400" />
              {listing.location}
            </span>
          )}
        </div>
      </div>
    </div>
  )
}
