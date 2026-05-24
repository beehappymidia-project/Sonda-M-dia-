import { prisma } from '@/lib/db'
import AdZone from '@/components/AdZone'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'

interface Props { params: { slug: string } }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const a = await prisma.article.findUnique({ where: { slug: params.slug } })
  if (!a) return { title: 'Documentário não encontrado' }
  return { title: a.title, description: a.lead }
}

export async function generateStaticParams() {
  const articles = await prisma.article.findMany({ where: { isVideo: true }, select: { slug: true } })
  return articles.map(a => ({ slug: a.slug }))
}

export default async function DocumentarioSlugPage({ params }: Props) {
  const article = await prisma.article.findUnique({
    where: { slug: params.slug },
    include: { author: true },
  })
  if (!article) notFound()

  const related = await prisma.article.findMany({
    where: { isVideo: true, NOT: { id: article.id } },
    include: { author: true },
    take: 4,
    orderBy: { publishedAt: 'desc' },
  })

  const bodyParts = article.body.split('\n\n')

  return (
    <article>
      {/* Video Player Area */}
      <div style={{ background: 'var(--preto)', padding: '40px 0 0' }}>
        <div className="container">
          <div className="video-player">
            <div className="video-player__poster">
              <div className={`photo ${article.photoStyle} grain`} style={{ position: 'absolute', inset: 0 }} />
            </div>
            <div className="video-player__overlay">
              <button className="video-player__btn" aria-label="Reproduzir">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Sponsor Bar */}
      <div style={{ background: 'var(--ouro)', padding: '10px 0' }}>
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <span style={{ fontSize: '0.62rem', fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(11,11,11,0.55)' }}>Apoio</span>
            <span style={{ fontSize: '0.88rem', fontWeight: 800, color: 'var(--preto)' }}>Produção SONDA MÍDIA Studios</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: '40px 0 0', background: 'var(--preto)' }}>
        <div className="container">
          <div className="grid-main">
            {/* Main */}
            <div>
              <div style={{ marginBottom: '8px', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                <span className="tag">Documentário</span>
                <span className="tag tag--format">{article.readTime} min</span>
              </div>
              <h1 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', fontWeight: 900, color: 'var(--branco)', marginBottom: '12px', marginTop: '12px', lineHeight: 1.15 }}>
                {article.title}
              </h1>
              <p style={{ fontSize: '1.05rem', color: 'var(--cinza)', lineHeight: 1.65, marginBottom: '24px' }}>
                {article.lead}
              </p>

              {/* Credits */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '16px 0', borderTop: '1px solid var(--cinza-3)', borderBottom: '1px solid var(--cinza-3)', marginBottom: '32px' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--ouro)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, color: 'var(--preto)' }}>
                  {article.author.name.charAt(0)}
                </div>
                <div>
                  <p style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--branco)' }}>{article.author.name}</p>
                  <p style={{ fontSize: '0.72rem', color: 'var(--cinza)' }}>{article.author.role} · Realização</p>
                </div>
              </div>

              <div className="article-body">
                {bodyParts.map((para, i) => {
                  if (para.startsWith('## ')) return <h2 key={i}>{para.replace('## ', '')}</h2>
                  if (para.startsWith('### ')) return <h3 key={i}>{para.replace('### ', '')}</h3>
                  return <p key={i}>{para}</p>
                })}
              </div>

              {/* Tags */}
              {article.tags && (
                <div style={{ marginTop: '32px', paddingTop: '16px', borderTop: '1px solid var(--cinza-3)', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {article.tags.split(',').filter(Boolean).map(t => (
                    <span key={t} className="tag tag--section">{t.trim()}</span>
                  ))}
                </div>
              )}
            </div>

            {/* Episode List Sidebar */}
            <aside className="sidebar">
              {related.length > 0 && (
                <div className="sidebar__widget">
                  <div className="sidebar__widget-head">Mais Documentários</div>
                  <div className="sidebar__widget-body">
                    <ul className="sidebar__list">
                      {related.map(r => (
                        <li key={r.id}>
                          <Link href={`/documentario/${r.slug}`}>{r.title}</Link>
                          <span style={{ display: 'block', fontSize: '0.68rem', color: 'var(--cinza)', marginTop: '2px' }}>{r.readTime} min</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              <div className="sidebar__widget">
                <div className="sidebar__widget-head">Partilhar</div>
                <div className="sidebar__widget-body">
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {['Twitter/X', 'Facebook', 'WhatsApp', 'Copiar link'].map(platform => (
                      <button key={platform} style={{ width: '100%', padding: '8px 12px', background: 'var(--cinza-3)', border: '1px solid var(--cinza-2)', borderRadius: '4px', color: 'var(--cinza)', fontSize: '0.78rem', fontWeight: 700, cursor: 'pointer', textAlign: 'left', fontFamily: 'inherit' }}>
                        {platform}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>

      <AdZone />
    </article>
  )
}
