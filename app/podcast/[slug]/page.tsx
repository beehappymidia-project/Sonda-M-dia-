import { prisma } from '@/lib/db'
import AdZone from '@/components/AdZone'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'

interface Props { params: { slug: string } }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const a = await prisma.article.findUnique({ where: { slug: params.slug } })
  if (!a) return { title: 'Podcast não encontrado' }
  return { title: a.title, description: a.lead }
}

export async function generateStaticParams() {
  const articles = await prisma.article.findMany({ where: { isPodcast: true }, select: { slug: true } })
  return articles.map(a => ({ slug: a.slug }))
}

export default async function PodcastSlugPage({ params }: Props) {
  const article = await prisma.article.findUnique({
    where: { slug: params.slug },
    include: { author: true },
  })
  if (!article) notFound()

  const related = await prisma.article.findMany({
    where: { isPodcast: true, NOT: { id: article.id } },
    include: { author: true },
    take: 4,
    orderBy: { publishedAt: 'desc' },
  })

  const bodyParts = article.body.split('\n\n')
  const chapters = bodyParts.filter(p => p.startsWith('- ') && p.includes(':'))

  return (
    <article>
      <div style={{ background: 'var(--carvao)', borderBottom: '1px solid var(--cinza-3)', padding: '48px 0' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: '40px', alignItems: 'start' }}>
            {/* Podcast Cover */}
            <div className="podcast-cover" style={{ width: '280px', height: '280px' }}>
              <div className={`photo ${article.photoStyle} grain`} style={{ position: 'absolute', inset: 0 }} />
              <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2 }}>
                <div style={{ textAlign: 'center' }}>
                  <svg width="40" height="40" viewBox="0 0 32 32" fill="none" style={{ margin: '0 auto 8px' }}>
                    <circle cx="16" cy="16" r="14" stroke="#FFB703" strokeWidth="1.5" opacity="0.5" />
                    <circle cx="16" cy="16" r="4" fill="#FFB703" opacity="0.9" />
                    <path d="M16 16 L25.9 10.5" stroke="#FFB703" strokeWidth="1.5" strokeLinecap="round" opacity="0.9" />
                  </svg>
                  <p style={{ fontSize: '0.68rem', fontWeight: 900, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--ouro)' }}>SONDA CAST</p>
                </div>
              </div>
            </div>

            {/* Info */}
            <div>
              <span className="tag" style={{ marginBottom: '12px', display: 'inline-block' }}>Podcast</span>
              <h1 style={{ fontSize: 'clamp(1.4rem, 3vw, 2.2rem)', fontWeight: 900, color: 'var(--branco)', marginBottom: '12px', lineHeight: 1.2 }}>
                {article.title}
              </h1>
              <p style={{ fontSize: '0.95rem', color: 'var(--cinza)', lineHeight: 1.65, marginBottom: '24px' }}>
                {article.lead}
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
                <Link href={`/autor/${article.author.slug}`} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--ouro)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, color: 'var(--preto)', fontSize: '0.82rem' }}>
                    {article.author.name.charAt(0)}
                  </div>
                  <span style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--ouro)' }}>{article.author.name}</span>
                </Link>
                <span style={{ color: 'var(--cinza-2)' }}>·</span>
                <span style={{ fontSize: '0.75rem', color: 'var(--cinza)' }}>{article.readTime} min</span>
              </div>

              {/* Audio Player */}
              <div className="audio-player">
                <div className="audio-player__controls">
                  <button className="audio-player__play" aria-label="Reproduzir">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </button>
                  <div className="audio-player__timeline">
                    <div className="audio-player__bar">
                      <div className="audio-player__progress" />
                    </div>
                    <div className="audio-player__times">
                      <span>0:00</span>
                      <span>{article.readTime}:00</span>
                    </div>
                  </div>
                  <button style={{ fontFamily: 'inherit', fontSize: '0.68rem', fontWeight: 700, color: 'var(--cinza)', border: '1px solid var(--cinza-3)', borderRadius: '4px', padding: '4px 8px', background: 'none', cursor: 'pointer' }}>
                    1×
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: '40px 0 0', background: 'var(--preto)' }}>
        <div className="container">
          <div className="grid-main">
            {/* Main */}
            <div>
              {/* Chapters */}
              {chapters.length > 0 && (
                <div style={{ marginBottom: '32px' }}>
                  <h2 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--branco)', marginBottom: '16px' }}>Capítulos</h2>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
                    {chapters.map((ch, i) => {
                      const parts = ch.replace('- ', '').split(' - ')
                      const time = parts[0]
                      const title = parts.slice(1).join(' - ')
                      return (
                        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '12px 0', borderBottom: '1px solid var(--cinza-3)' }}>
                          <span style={{ fontFamily: 'monospace', fontSize: '0.82rem', color: 'var(--ouro)', fontWeight: 700, flexShrink: 0 }}>{time}</span>
                          <span style={{ fontSize: '0.85rem', color: 'var(--cinza)' }}>{title || ch.replace('- ', '')}</span>
                          <button style={{ marginLeft: 'auto', width: '28px', height: '28px', borderRadius: '50%', background: 'var(--cinza-3)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                            <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                              <path d="M3 2l7 4-7 4V2z" fill="#888" />
                            </svg>
                          </button>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )}

              <div className="article-body">
                {bodyParts.filter(p => !p.startsWith('- ')).map((para, i) => {
                  if (para.startsWith('## ')) return <h2 key={i}>{para.replace('## ', '')}</h2>
                  if (para.startsWith('**')) return <p key={i}><strong>{para.replace(/\*\*/g, '')}</strong></p>
                  return <p key={i}>{para}</p>
                })}
              </div>

              {article.tags && (
                <div style={{ marginTop: '32px', paddingTop: '16px', borderTop: '1px solid var(--cinza-3)', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {article.tags.split(',').filter(Boolean).map(t => (
                    <span key={t} className="tag tag--section">{t.trim()}</span>
                  ))}
                </div>
              )}
            </div>

            {/* Sidebar */}
            <aside className="sidebar">
              <div className="sidebar__widget">
                <div className="sidebar__widget-head">Ouvir Em</div>
                <div className="sidebar__widget-body">
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {['Spotify', 'Apple Podcasts', 'Google Podcasts', 'YouTube Music'].map(platform => (
                      <a key={platform} href="#" style={{ display: 'block', padding: '10px 12px', background: 'var(--cinza-3)', borderRadius: '4px', fontSize: '0.82rem', fontWeight: 700, color: 'var(--cinza)', transition: 'color 0.2s', border: '1px solid var(--cinza-2)' }}>
                        {platform} →
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              {related.length > 0 && (
                <div className="sidebar__widget">
                  <div className="sidebar__widget-head">Mais Episódios</div>
                  <div className="sidebar__widget-body">
                    <ul className="sidebar__list">
                      {related.map(r => (
                        <li key={r.id}>
                          <Link href={`/podcast/${r.slug}`}>{r.title}</Link>
                          <span style={{ display: 'block', fontSize: '0.68rem', color: 'var(--cinza)', marginTop: '2px' }}>{r.readTime} min</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </aside>
          </div>
        </div>
      </div>

      <AdZone />
    </article>
  )
}
