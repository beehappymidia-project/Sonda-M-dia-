'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import RadarSvg from './RadarSvg'

const NAV = [
  { label: 'Home', href: '/' },
  { label: 'Política', href: '/politica' },
  { label: 'Economia', href: '/economia' },
  { label: 'Sociedade', href: '/sociedade' },
  { label: 'Internacional', href: '/internacional' },
  { label: 'Investigação', href: '/investigacao' },
  { label: 'Multimédia', href: '/multimédia' },
  { label: 'Opinião', href: '/opiniao' },
]

export default function Header() {
  const pathname = usePathname()

  return (
    <header className="hdr">
      <div className="hdr__inner">
        <Link href="/" className="hdr__logo" aria-label="SONDA MÍDIA">
          <RadarSvg size={28} />
          <span className="hdr__logo-text">
            S<span className="gold">◉</span>NDA MÍDIA
          </span>
        </Link>

        <nav className="hdr__nav">
          {NAV.map(item => {
            const isActive =
              item.href === '/'
                ? pathname === '/'
                : pathname.startsWith(item.href)
            return (
              <Link
                key={item.href}
                href={item.href}
                className={isActive ? 'active' : ''}
              >
                {item.label}
              </Link>
            )
          })}
        </nav>

        <div className="hdr__actions">
          <Link href="/pesquisa" className="hdr__search-btn" aria-label="Pesquisar">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </Link>
          <Link href="/newsletter" className="hdr__assinar">
            Assinar
          </Link>
        </div>
      </div>
    </header>
  )
}
