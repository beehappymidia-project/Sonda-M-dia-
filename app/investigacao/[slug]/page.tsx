import { prisma } from '@/lib/db'
import AdZone from '@/components/AdZone'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'

interface Props { params: { slug: string } }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const a = await prisma.article.findUnique({ where: { slug: params.slug } })
  if (!a) return { title: 'Investigação não encontrada' }
  return { title: a.title, description: a.lead }
}

export async function generateStaticParams() {
  const articles = await prisma.article.findMany({
    where: { OR: [{ isLongForm: true }, { section: 'Investigação' }] },
    select: { slug: true },
  })
  return articles.map(a => ({ slug: a.slug }))
}

function parseChapters(body: string) {
  return body.split('\n\n').reduce<{ heading: string; paras: string[] }[]>((acc, para) => {
    if (para.startsWith('## ')) {
      acc.push({ heading: para.replace('## ', ''), paras: [] })
    } else if (acc.length === 0) {
      acc.push({ heading: 'Introdução', paras: [para] })
    } else {
      acc[acc.length - 1].paras.push(para)
    }
    return acc
  }, [])
}

export default async function InvestigacaoSlugPage({ params }: Props) {
  const article = await prisma.article.findUnique({
    where: { slug: params.slug },
    include: { author: true },
  })
  if (!article) notFound()

  const related = await prisma.article.findMany({
    where: { OR: [{ isLongForm: true }, { section: 'Investigação' }], NOT: { id: article.id } },
    include: { author: true },
    take: 3,
    orderBy: { publishedAt: 'desc' },
  })

  const chapters = parseChapters(article.body)
  const tags = article.tags ? article.tags.split(',').filter(Boolean).map(t => t.trim()) : []

  return (
    <article>
      {/* Large Hero */}
      <div style={{ position: 'relative', height: '560px', overflow: 'hidden' }}>
        <div className={`photo ${article.photoStyle} grain`} style={{ position: 'absolute', inset: 0 }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.98) 0%, rgba(0,0,0,0.6) 50%, rgba(0,0,0,0.15) 100%)' }} />
        <div className="container" style={{ position: 'relative', zIndex: 1, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', paddingBottom: '56px' }}>
          <div style={{ maxWidth: '880px' }}>
            <div style={{ display: 'flex', gap: '8px', marginBottom: '16px', flexWrap: 'wrap' }}>
              <span className="tag">Investigação</span>
              {article.isLongForm && <span className="tag tag--outline">Dossiê</span>}
              <span className="tag tag--format">{article.readTime} min de leitura</span>
            </div>
            <h1 style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)', fontWeight: 900, lineHeight: 1.1, color: 'var(--branco)', marginBottom: '16px' }}>
              {article.title}
            </h1>
            <p style={{ fontSize: '1.1rem', color: 'rgba(255,255,255,0.78)', lineHeight: 1.6, marginBottom: '24px', maxWidth: '680px' }}>
              {article.lead}
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <Link href={`/autor/${article.author.slug}`} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'var(--ouro)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, color: 'var(--preto)' }}>
                  {article.author.name.charAt(0)}
                </div>
                <div>
                  <p style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--ouro)' }}>{article.author.name}</p>
                  <p style={{ fontSize: '0.68rem', color: 'rgba(255,255,255,0.5)' }}>{article.author.role}</p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Sponsor Bar */}
      <div style={{ background: 'var(--carvao)', borderBottom: '1px solid var(--cinza-3)' }}>
        <div className="container" style={{ padding: '0 24px' }}>
          <div className="sponsor-bar">
            <span className="sponsor-bar__label">Apoio à investigação</span>
            <span className="sponsor-bar__name">Fundação para o Jornalismo de Profundidade</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: '48px 0 0', background: 'var(--preto)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr', gap: '48px', alignItems: 'start' }}>
            {/* Chapter Sidebar */}
            <aside>
              <div className="chapter-nav">
                <div className="chapter-nav__head">Capítulos</div>
                <ul className="chapter-nav__list">
                  {chapters.map((ch, i) => (
                    <li key={i}>
                      <a href={`#cap-${i}`}>
                        <span className="chapter-nav__num">{String(i + 1).padStart(2, '0')}</span>
                        {ch.heading}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              {related.length > 0 && (
                <div className="sidebar__widget" style={{ marginTop: '24px' }}>
                  <div className="sidebar__widget-head">Mais Investigações</div>
                  <div className="sidebar__widget-body">
                    <ul className="sidebar__list">
                      {related.map(r => (
                        <li key={r.id}><Link href={`/investigacao/${r.slug}`}>{r.title}</Link></li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </aside>

            {/* Main Content */}
            <div>
              <div className="pullquote" style={{ marginBottom: '36px' }}>
                <p className="pullquote__text">&ldquo;{article.lead}&rdquo;</p>
                <span className="pullquote__cite">— {article.author.name}, {article.author.role}</span>
              </div>

              {chapters.map((ch, i) => (
                <section key={i} id={`cap-${i}`} style={{ marginBottom: '48px', paddingBottom: '48px', borderBottom: i < chapters.length - 1 ? '1px solid var(--cinza-3)' : 'none' }}>
                  {ch.heading !== 'Introdução' && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '20px' }}>
                      <span style={{ fontSize: '2rem', fontWeight: 900, color: 'var(--cinza-3)' }}>{String(i + 1).padStart(2, '0')}</span>
                      <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--branco)' }}>{ch.heading}</h2>
                    </div>
                  )}
                  <div className="article-body">
                    {ch.paras.map((para, j) => {
                      if (para.startsWith('### ')) return <h3 key={j}>{para.replace('### ', '')}</h3>
                      return <p key={j}>{para}</p>
                    })}
                  </div>
                </section>
              ))}

              {tags.length > 0 && (
                <div style={{ paddingTop: '20px', borderTop: '1px solid var(--cinza-3)', display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '40px' }}>
                  {tags.map(tag => <span key={tag} className="tag tag--section">{tag}</span>)}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <AdZone />
    </article>
  )
}
