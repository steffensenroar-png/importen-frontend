import type { Metadata } from 'next'
import { Fraunces } from 'next/font/google'
import localFont from 'next/font/local'
import { Toaster } from 'react-hot-toast'
import './globals.css'

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
  display: 'swap',
})

const geistSans = localFont({
  src: '../public/fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  fallback: ['system-ui', 'sans-serif'],
})

const geistMono = localFont({
  src: '../public/fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  fallback: ['monospace'],
})

export const metadata: Metadata = {
  title: 'Importen — Beregn importkostnad for bil',
  description: 'Beregn nøyaktig hva det koster å importere bil til Norge fra Sverige, Tyskland og andre land. MVA, engangsavgift, bruksfradrag og frakt — alt i én kalkulator.',
  keywords: ['importere bil', 'bilimport Norge', 'engangsavgift', 'MVA bil', 'kjøpe bil Sverige'],
  openGraph: {
    title: 'Importen — Bilimport kalkulator',
    description: 'Beregn total importkostnad for bil fra Blocket.se, Finn.no og Mobile.de',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="nb" className={`${fraunces.variable} ${geistSans.variable} ${geistMono.variable}`}>
      <body className="bg-slate-50 text-navy-900 antialiased">
        {children}
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              borderRadius: '10px',
              background: '#0a1628',
              color: '#fff',
              fontSize: '14px',
            },
          }}
        />
      </body>
    </html>
  )
}
