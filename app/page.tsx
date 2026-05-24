import { prisma } from '@/lib/db'
import ArticleCard from '@/components/ArticleCard'
import Link from 'next/link'

export const revalidate = 60

async function getData() {
  const articles = await prisma.article.findMany({
    include: { author: true },
    orderBy: { publishedAt: 'desc' },
    take: 20,
  })
  return articles
}

export default async function HomePage() {
  const articles = await getData()
  const featured = articles.find(a => a.featured) || articles[0]
  const secondary = articles.filter(a => a.id !== featured?.id).slice(0, 3)
  const latest = articles.filter(a => a.id !== featured?.id && !secondary.find(s => s.id === a.id)).slice(0, 6)
  const investigations = articles.filter(a => a.section === 'Investigação').slice(0, 3)
  const podcasts = articles.filter(a => a.isPodcast).slice(0, 3)
  const opinions = articles.filter(a => a.isOpinion).slice(0, 3)

  return (
    <>
      {/* Hero Section */}
      <section style={{ background: '#0a0a0a', paddingTop: '40px', paddingBottom: '48px', borderBottom: '1px solid #1a1a1a' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '32px' }}>
            {/* Main featured */}
            <div>
              {featured && <ArticleCard article={featured as any} size="large" />}
            </div>
            {/* Secondary stack */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', borderLeft: '1px solid #1a1a1a', paddingLeft: '32px' }}>
              <div style={{ paddingBottom: '12px', borderBottom: '1px solid #1a1a1a' }}>
                <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.15em', color: '#c9a84c', textTransform: 'uppercase' }}>
                  Destaques
                </span>
              </div>
              {secondary.map(a => (
                <ArticleCard key={a.id} article={a as any} size="horizontal" />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Últimas Reportagens */}
      <section style={{ padding: '56px 0', borderBottom: '1px solid #1a1a1a' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
            <div>
              <span className="section-label">Últimas</span>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '24px', fontWeight: 700, color: '#e0e0e0', marginTop: '4px' }}>
                Reportagens Recentes
              </h2>
            </div>
            <Link href="/investigacao" style={{ fontSize: '12px', color: '#c9a84c', fontWeight: 600, letterSpacing: '0.05em' }}>
              Ver todas →
            </Link>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '28px' }}>
            {latest.map(a => (
              <ArticleCard key={a.id} article={a as any} size="medium" />
            ))}
          </div>
        </div>
      </section>

      {/* Investigação + Podcasts */}
      <section style={{ padding: '56px 0', background: '#0d0d0d', borderBottom: '1px solid #1a1a1a' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '3fr 2fr', gap: '48px' }}>
            {/* Investigação */}
            <div>
              <div style={{ marginBottom: '28px', paddingBottom: '16px', borderBottom: '1px solid #1a1a1a' }}>
                <span className="section-label">Investigação</span>
                <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '22px', fontWeight: 700, color: '#e0e0e0', marginTop: '4px' }}>
                  Jornalismo de Profundidade
                </h2>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                {investigations.map(a => (
                  <div key={a.id} style={{ paddingBottom: '24px', borderBottom: '1px solid #1a1a1a' }}>
                    <ArticleCard article={a as any} size="horizontal" />
                  </div>
                ))}
              </div>
              <div style={{ marginTop: '24px' }}>
                <Link href="/investigacao" style={{
                  fontSize: '12px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase',
                  color: '#c9a84c', borderBottom: '1px solid #c9a84c', paddingBottom: '2px',
                }}>
                  Todas as investigações
                </Link>
              </div>
            </div>

            {/* Podcast */}
            <div style={{ borderLeft: '1px solid #1a1a1a', paddingLeft: '48px' }}>
              <div style={{ marginBottom: '28px', paddingBottom: '16px', borderBottom: '1px solid #1a1a1a' }}>
                <span className="section-label">Podcast</span>
                <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '22px', fontWeight: 700, color: '#e0e0e0', marginTop: '4px' }}>
                  Ouça Sonda Cast
                </h2>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {podcasts.map(a => (
                  <Link key={a.id} href={`/artigo/${a.slug}`} style={{
                    display: 'flex', gap: '12px', alignItems: 'center',
                    padding: '16px', background: '#111', borderRadius: '4px', border: '1px solid #1a1a1a',
                  }}>
                    <div style={{
                      width: '48px', height: '48px', borderRadius: '50%',
                      background: 'linear-gradient(135deg, #c9a84c, #8b6914)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                    }}>
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M5 3l8 5-8 5V3z" fill="#0a0a0a" />
                      </svg>
                    </div>
                    <div>
                      <p style={{ fontSize: '13px', fontWeight: 600, color: '#ddd', lineHeight: '1.3', marginBottom: '4px' }}>
                        {a.title}
                      </p>
                      <span style={{ fontSize: '11px', color: '#666' }}>{a.readTime} min</span>
                    </div>
                  </Link>
                ))}
              </div>
              <div style={{ marginTop: '24px' }}>
                <Link href="/podcast" style={{
                  fontSize: '12px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase',
                  color: '#c9a84c', borderBottom: '1px solid #c9a84c', paddingBottom: '2px',
                }}>
                  Todos os episódios
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Opinião */}
      {opinions.length > 0 && (
        <section style={{ padding: '56px 0', borderBottom: '1px solid #1a1a1a' }}>
          <div className="container">
            <div style={{ marginBottom: '32px' }}>
              <span className="section-label">Opinião</span>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '24px', fontWeight: 700, color: '#e0e0e0', marginTop: '4px' }}>
                Análises e Colunas
              </h2>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '28px' }}>
              {opinions.map(a => (
                <div key={a.id} style={{ borderTop: '3px solid #c9a84c', paddingTop: '20px' }}>
                  <ArticleCard article={a as any} size="small" />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Newsletter CTA */}
      <section style={{ padding: '80px 0', background: '#0d0d0d' }}>
        <div className="container" style={{ maxWidth: '640px', textAlign: 'center' }}>
          <span className="section-label" style={{ marginBottom: '16px', display: 'block' }}>Newsletter</span>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '32px', fontWeight: 700, color: '#e0e0e0', marginBottom: '16px', lineHeight: '1.25' }}>
            Jornalismo investigativo na sua caixa de entrada
          </h2>
          <p style={{ fontSize: '15px', color: '#777', lineHeight: '1.7', marginBottom: '32px' }}>
            Receba as principais reportagens, análises e exclusivos do SONDA MÍDIA direto no seu e-mail.
          </p>
          <Link href="/newsletter" style={{
            display: 'inline-block',
            background: '#c9a84c',
            color: '#0a0a0a',
            fontSize: '14px',
            fontWeight: 700,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            padding: '14px 32px',
            borderRadius: '2px',
          }}>
            Assinar Gratuitamente
          </Link>
        </div>
      </section>
    </>
  )
}
