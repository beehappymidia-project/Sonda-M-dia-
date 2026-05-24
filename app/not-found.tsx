import Link from 'next/link'
import AdZone from '@/components/AdZone'

export default function NotFound() {
  return (
    <div>
      {/* 404 Hero */}
      <div style={{ background: 'var(--carvao)', borderBottom: '1px solid var(--cinza-3)', padding: '80px 0', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        {/* Radar Watermark */}
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', opacity: 0.05, pointerEvents: 'none' }}>
          <svg width="480" height="480" viewBox="0 0 32 32" fill="none">
            <circle cx="16" cy="16" r="14" stroke="#FFB703" strokeWidth="0.5" />
            <circle cx="16" cy="16" r="9" stroke="#FFB703" strokeWidth="0.5" />
            <circle cx="16" cy="16" r="4" stroke="#FFB703" strokeWidth="0.5" />
            <circle cx="16" cy="16" r="1.5" fill="#FFB703" />
            <path d="M16 16 L25.9 10.5" stroke="#FFB703" strokeWidth="0.5" />
          </svg>
        </div>
        <div className="container" style={{ maxWidth: '640px', position: 'relative', zIndex: 1 }}>
          <div style={{ fontSize: '6rem', fontWeight: 900, color: 'var(--cinza-3)', lineHeight: 1, marginBottom: '16px' }}>
            404
          </div>
          <span style={{ fontSize: '0.62rem', fontWeight: 900, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--ouro)', display: 'block', marginBottom: '12px' }}>
            Página não encontrada
          </span>
          <h1 style={{ fontSize: 'clamp(1.4rem, 3vw, 2rem)', fontWeight: 900, color: 'var(--branco)', marginBottom: '16px' }}>
            O sinal perdeu-se algures
          </h1>
          <p style={{ fontSize: '0.95rem', color: 'var(--cinza)', lineHeight: 1.65, marginBottom: '32px' }}>
            O conteúdo que procura não existe, foi movido ou o URL está incorreto.
          </p>

          {/* Search Box */}
          <form action="/pesquisa" method="GET" className="search-bar" style={{ maxWidth: '480px', margin: '0 auto 28px' }}>
            <input type="text" name="q" placeholder="Pesquisar no arquivo..." className="search-bar__input" />
            <button type="submit" className="search-bar__btn">Pesquisar</button>
          </form>

          {/* Action Links */}
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/" className="btn btn--gold">Página Inicial</Link>
            <Link href="/investigacao" className="btn btn--outline">Investigação</Link>
            <Link href="/pesquisa" className="btn btn--outline">Arquivo</Link>
          </div>
        </div>
      </div>

      {/* Suggested Articles */}
      <div style={{ padding: '48px 0', background: 'var(--preto)' }}>
        <div className="container">
          <div className="section-head" style={{ marginBottom: '24px' }}>
            <div className="section-head__line" />
            <span className="section-head__title">Sugerimos</span>
          </div>
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            {[
              { label: 'Política', href: '/politica' },
              { label: 'Economia', href: '/economia' },
              { label: 'Investigação', href: '/investigacao' },
              { label: 'Internacional', href: '/internacional' },
              { label: 'Sociedade', href: '/sociedade' },
              { label: 'Opinião', href: '/opiniao' },
            ].map(l => (
              <Link key={l.href} href={l.href} style={{ padding: '10px 20px', background: 'var(--carvao)', border: '1px solid var(--cinza-3)', borderRadius: '4px', fontWeight: 700, color: 'var(--branco)', fontSize: '0.85rem', transition: 'border-color 0.2s' }}>
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <AdZone />
    </div>
  )
}
