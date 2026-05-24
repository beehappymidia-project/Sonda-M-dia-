import { prisma } from '@/lib/db'
import ArticleCard from '@/components/ArticleCard'
import AdZone from '@/components/AdZone'
import Link from 'next/link'

export const revalidate = 60

async function getData() {
  const articles = await prisma.article.findMany({
    include: { author: true },
    orderBy: { publishedAt: 'desc' },
    take: 40,
  })
  return articles
}

export default async function HomePage() {
  const articles = await getData()
  const featured = articles.find(a => a.featured && !a.isVideo && !a.isPodcast) || articles[0]
  const featuredSecondary = articles.filter(a => a.featured && a.id !== featured?.id).slice(0, 2)
  const top3 = articles.filter(a => !a.featured && a.id !== featured?.id).slice(0, 3)
  const investigations = articles.filter(a => a.section === 'Investigação').slice(0, 3)
  const podcasts = articles.filter(a => a.isPodcast).slice(0, 2)
  const opinions = articles.filter(a => a.isOpinion).slice(0, 3)
  const latest = articles.filter(a => !investigations.find(i => i.id === a.id) && !opinions.find(o => o.id === a.id) && a.id !== featured?.id).slice(0, 6)
  const ticker = articles.slice(0, 5)

  return (
    <>
      {/* Breaking Ticker */}
      <div className="ticker">
        <div className="ticker__inner">
          <span className="ticker__label">Última Hora</span>
          <div className="ticker__track">
            {ticker.map(a => (
              <Link key={a.id} href={`/artigo/${a.slug}`} className="ticker__item">{a.title}</Link>
            ))}
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section style={{ padding: '32px 0 0', background: 'var(--preto)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px', marginBottom: '32px' }}>
            {/* Main featured */}
            <div>
              {featured && <ArticleCard article={featured as any} size="large" />}
            </div>
            {/* Secondary stack */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0', borderLeft: '1px solid var(--cinza-3)', paddingLeft: '24px' }}>
              <div style={{ paddingBottom: '12px', marginBottom: '16px', borderBottom: '1px solid var(--cinza-3)' }}>
                <div className="section-head">
                  <div className="section-head__line" />
                  <span className="section-head__title">Destaques</span>
                </div>
              </div>
              {featuredSecondary.map(a => (
                <div key={a.id} style={{ paddingBottom: '16px', marginBottom: '16px', borderBottom: '1px solid var(--cinza-3)' }}>
                  <ArticleCard article={a as any} size="horizontal" />
                </div>
              ))}
              {top3.map(a => (
                <div key={a.id} style={{ paddingBottom: '16px', marginBottom: '16px', borderBottom: '1px solid var(--cinza-3)' }}>
                  <ArticleCard article={a as any} size="horizontal" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Top Stories Grid */}
      <section style={{ padding: '40px 0', background: 'var(--carvao-2)', borderTop: '1px solid var(--cinza-3)', borderBottom: '1px solid var(--cinza-3)' }}>
        <div className="container">
          <div className="section-head">
            <div className="section-head__line" />
            <span className="section-head__title">Últimas Reportagens</span>
            <Link href="/pesquisa" className="section-head__more">Ver todas →</Link>
          </div>
          <div className="grid-3">
            {latest.map(a => (
              <ArticleCard key={a.id} article={a as any} size="medium" />
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA Strip */}
      <div className="nl-strip">
        <div className="nl-strip__inner">
          <div className="nl-strip__text">
            <h2>O Pulso de Moçambique</h2>
            <p>As histórias mais importantes, direto na sua caixa de entrada. Grátis.</p>
          </div>
          <form action="/api/newsletter" method="POST" className="nl-strip__form">
            <input type="email" name="email" placeholder="O seu email" className="nl-strip__input" required />
            <button type="submit" className="nl-strip__btn">Subscrever</button>
          </form>
        </div>
      </div>

      {/* Investigação + Podcasts */}
      <section style={{ padding: '48px 0', background: 'var(--preto)', borderBottom: '1px solid var(--cinza-3)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '3fr 2fr', gap: '48px', alignItems: 'start' }}>
            {/* Investigação */}
            <div>
              <div className="section-head" style={{ marginBottom: '24px' }}>
                <div className="section-head__line" />
                <span className="section-head__title">Investigação</span>
                <Link href="/investigacao" className="section-head__more">Ver todas →</Link>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
                {investigations.map((a, i) => (
                  <div key={a.id} style={{ paddingBottom: '24px', marginBottom: i < investigations.length - 1 ? '24px' : 0, borderBottom: i < investigations.length - 1 ? '1px solid var(--cinza-3)' : 'none' }}>
                    <ArticleCard article={a as any} size="horizontal" />
                  </div>
                ))}
              </div>
            </div>

            {/* Podcasts */}
            <div style={{ borderLeft: '1px solid var(--cinza-3)', paddingLeft: '48px' }}>
              <div className="section-head" style={{ marginBottom: '24px' }}>
                <div className="section-head__line" />
                <span className="section-head__title">Podcast</span>
                <Link href="/podcast" className="section-head__more">Ouvir →</Link>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {podcasts.map(a => (
                  <Link key={a.id} href={`/artigo/${a.slug}`} style={{ display: 'flex', gap: '14px', alignItems: 'center', padding: '14px', background: 'var(--carvao)', borderRadius: '6px', border: '1px solid var(--cinza-3)', transition: 'border-color 0.2s' }}>
                    <div style={{ width: '52px', height: '52px', borderRadius: '8px', overflow: 'hidden', position: 'relative', flexShrink: 0 }}>
                      <div className={`photo ${a.photoStyle} grain`} style={{ position: 'absolute', inset: 0 }} />
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--branco)', lineHeight: 1.35, marginBottom: '4px', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                        {a.title}
                      </p>
                      <span style={{ fontSize: '0.68rem', color: 'var(--cinza)' }}>{a.readTime} min · Podcast</span>
                    </div>
                    <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--ouro)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                        <path d="M3.5 2l6 4-6 4V2z" fill="#0B0B0B" />
                      </svg>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Opinião */}
      {opinions.length > 0 && (
        <section style={{ padding: '48px 0', background: 'var(--carvao)', borderBottom: '1px solid var(--cinza-3)' }}>
          <div className="container">
            <div className="section-head">
              <div className="section-head__line" />
              <span className="section-head__title">Opinião</span>
              <Link href="/opiniao" className="section-head__more">Ver todas →</Link>
            </div>
            <div className="grid-3">
              {opinions.map(a => (
                <div key={a.id} style={{ borderTop: '3px solid var(--ouro)', paddingTop: '20px' }}>
                  <ArticleCard article={a as any} size="small" />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <AdZone />
    </>
  )
}
