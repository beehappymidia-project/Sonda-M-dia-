import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: {
    default: 'SONDA MÍDIA — Jornalismo de Profundidade',
    template: '%s | SONDA MÍDIA',
  },
  description:
    'Jornalismo investigativo, documentários, podcasts e análises aprofundadas sobre Moçambique e o mundo.',
  openGraph: {
    siteName: 'SONDA MÍDIA',
    locale: 'pt_MZ',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt">
      <body>
        <Header />
        <main style={{ minHeight: '60vh' }}>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
