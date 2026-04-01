import type { Metadata } from 'next'
import { Fraunces, Inter } from 'next/font/google'
import { Toaster } from 'react-hot-toast'
import './globals.css'

const fraunces = Fraunces({
    subsets: ['latin'],
    variable: '--font-fraunces',
    display: 'swap',
})

const inter = Inter({
    subsets: ['latin'],
    variable: '--font-geist-sans',
    display: 'swap',
})

export const metadata: Metadata = {
    title: 'Importen — Beregn importkostnad for bil',
    description: 'Beregn noyaktig hva det koster a importere bil til Norge fra Sverige, Tyskland og andre land.',
    openGraph: {
          title: 'Importen — Bilimport kalkulator',
          description: 'Beregn total importkostnad for bil fra Blocket.se, Finn.no og Mobile.de',
          type: 'website',
    },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
          <html lang="nb" className={`${fraunces.variable} ${inter.variable}`}>
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
                  </body>body>
          </html>html>
        )
}</body>
