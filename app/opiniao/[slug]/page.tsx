import { prisma } from '@/lib/db'
import AdZone from '@/components/AdZone'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'

interface Props { params: { slug: string } }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const a = await prisma.article.findUnique({ where: { slug: params.slug } })
  if (!a) return { title: 'Opinião não encontrada' }
  return { title: a.title, description: a.lead }
}

export async function generateStaticParams() {
  const articles = await prisma.article.findMany({ where: { isOpinion: true }, select: { slug: true } })
  return articles.map(a => ({ slug: a.slug }))
}

export default async function OpiniaoSlugPage({ params }: Props) {
  const article = await prisma.article.findUnique({
    where: { slug: params.slug },
    include: { author: true },
  })
  if (!article) notFound()

  const authorOtherPieces = await prisma.article.findMany({
    where: { authorId: article.authorId, NOT: { id: article.id } },
    include: { author: true },
    take: 5,
    orderBy: { publishedAt: 'desc' },
  })

  const bodyParts = article.body.split('\n\n')

  return (
    <article>
      {/* Centered Hero */}
      <div style={{ background: 'var(--carvao)', borderBottom: '1px solid var(--cinza-3)', padding: '64px 0', textAlign: 'center' }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <span className="tag" style={{ marginBottom: '20px', display: 'inline-block' }}>Opinião</span>
          <h1 style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)', fontWeight: 900, color: 'var(--branco)', marginBottom: '20px', lineHeight: 1.15 }}>
            {article.title}
          </h1>
          <p style={{ fontSize: '1.1rem', color: 'var(--cinza)', lineHeight: 1.65, marginBottom: '32px' }}>
            {article.lead}
          </p>
          <Link href={`/autor/${article.author.slug}`} style={{ display: 'inline-flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'var(--ouro)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, color: 'var(--preto)', fontSize: '1.1rem' }}>
              {article.author.name.charAt(0)}
            </div>
            <div style={{ textAlign: 'left' }}>
              <p style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--ouro)' }}>{article.author.name}</p>
              <p style={{ fontSize: '0.72rem', color: 'var(--cinza)' }}>{article.author.role}</p>
            </div>
          </Link>
        </div>
      </div>

      {/* Audio Version Bar */}
      <div style={{ background: 'var(--cinza-3)', borderBottom: '1px solid var(--cinza-2)', padding: '10px 0' }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <button style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--cinza)', fontFamily: 'inherit', fontSize: '0.75rem', fontWeight: 700 }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke="#888" strokeWidth="1.5" />
              <path d="M10 8l6 4-6 4V8z" fill="#888" />
            </svg>
            Ouvir este artigo ({article.readTime} min)
          </button>
          <span style={{ color: 'var(--cinza-2)' }}>|</span>
          <span style={{ fontSize: '0.72rem', color: 'var(--cinza)' }}>{article.readTime} min de leitura</span>
        </div>
      </div>

      {/* 3-column Body */}
      <div style={{ padding: '48px 0 0', background: 'var(--preto)' }}>
        <div className="container">
          <div className="grid-article">
            {/* Left (empty decorative) */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: '8px' }}>
              <div style={{ width: '2px', height: '120px', background: 'linear-gradient(to bottom, var(--ouro), transparent)' }} />
            </div>

            {/* Article Text */}
            <div>
              <div className="article-body">
                {bodyParts.map((para, i) => {
                  if (para.startsWith('## ')) return <h2 key={i}>{para.replace('## ', '')}</h2>
                  if (para.startsWith('### ')) return <h3 key={i}>{para.replace('### ', '')}</h3>
                  return <p key={i}>{para}</p>
                })}
              </div>

              {/* Author Bio Block */}
              <div style={{ marginTop: '48px', padding: '28px', background: 'var(--carvao)', borderRadius: '6px', border: '1px solid var(--cinza-3)' }}>
                <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
                  <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'var(--ouro)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, color: 'var(--preto)', fontSize: '1.4rem', flexShrink: 0 }}>
                    {article.author.name.charAt(0)}
                  </div>
                  <div>
                    <p style={{ fontWeight: 800, color: 'var(--branco)', fontSize: '1.05rem', marginBottom: '2px' }}>{article.author.name}</p>
                    <p style={{ fontSize: '0.8rem', color: 'var(--ouro)', marginBottom: '12px' }}>{article.author.role}</p>
                    <p style={{ fontSize: '0.85rem', color: 'var(--cinza)', lineHeight: 1.65 }}>{article.author.bio}</p>
                    <Link href={`/autor/${article.author.slug}`} style={{ display: 'inline-block', marginTop: '12px', fontSize: '0.72rem', fontWeight: 700, color: 'var(--ouro)', borderBottom: '1px solid var(--ouro)', paddingBottom: '1px' }}>
                      Ver todos os artigos →
                    </Link>
                  </div>
                </div>
              </div>

              {/* Tags */}
              {article.tags && (
                <div style={{ marginTop: '24px', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {article.tags.split(',').filter(Boolean).map(t => (
                    <span key={t} className="tag tag--section">{t.trim()}</span>
                  ))}
                </div>
              )}
            </div>

            {/* Right Sidebar: Author's Other Pieces */}
            <aside className="sidebar">
              <div className="sidebar__widget">
                <div className="sidebar__widget-head">Mais de {article.author.name.split(' ')[0]}</div>
                <div className="sidebar__widget-body">
                  <ul className="sidebar__list">
                    {authorOtherPieces.map(r => (
                      <li key={r.id}>
                        <Link href={r.isOpinion ? `/opiniao/${r.slug}` : `/artigo/${r.slug}`}>{r.title}</Link>
                        <span style={{ display: 'block', fontSize: '0.68rem', color: 'var(--cinza)', marginTop: '2px' }}>{r.section}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="sidebar__widget">
                <div className="sidebar__widget-head">Newsletter de Opinião</div>
                <div className="sidebar__widget-body">
                  <p style={{ fontSize: '0.78rem', color: 'var(--cinza)', marginBottom: '14px', lineHeight: 1.55 }}>
                    Receba as colunas de opinião da SONDA MÍDIA por email.
                  </p>
                  <Link href="/newsletter" className="btn btn--gold" style={{ display: 'block', textAlign: 'center' }}>
                    Subscrever
                  </Link>
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
