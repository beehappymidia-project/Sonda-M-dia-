import { prisma } from '@/lib/db'
import ArticleCard from '@/components/ArticleCard'
import AdZone from '@/components/AdZone'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

interface Props { params: { slug: string } }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const author = await prisma.author.findUnique({ where: { slug: params.slug } })
  if (!author) return { title: 'Autor não encontrado' }
  return { title: author.name, description: author.bio.substring(0, 160) }
}

export async function generateStaticParams() {
  const authors = await prisma.author.findMany({ select: { slug: true } })
  return authors.map(a => ({ slug: a.slug }))
}

export const revalidate = 60

export default async function AutorPage({ params }: Props) {
  const author = await prisma.author.findUnique({
    where: { slug: params.slug },
    include: {
      articles: {
        include: { author: true },
        orderBy: { publishedAt: 'desc' },
      },
    },
  })
  if (!author) notFound()

  const investigations = author.articles.filter(a => a.isLongForm || a.section === 'Investigação').length
  const podcasts = author.articles.filter(a => a.isPodcast).length
  const galleries = author.articles.filter(a => a.isGallery).length

  return (
    <div>
      {/* Author Hero */}
      <div style={{ background: 'var(--carvao)', borderBottom: '1px solid var(--cinza-3)', padding: '64px 0' }}>
        <div className="container">
          <div style={{ display: 'flex', gap: '36px', alignItems: 'flex-start', flexWrap: 'wrap' }}>
            {/* Portrait */}
            <div style={{ width: '120px', height: '120px', borderRadius: '50%', flexShrink: 0, background: 'var(--ouro)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2.8rem', fontWeight: 900, color: 'var(--preto)' }}>
              {author.name.charAt(0)}
            </div>
            <div style={{ flex: 1, minWidth: '280px' }}>
              <div className="section-head" style={{ marginBottom: '12px' }}>
                <div className="section-head__line" />
                <span className="section-head__title">Jornalista</span>
              </div>
              <h1 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', fontWeight: 900, color: 'var(--branco)', marginBottom: '6px' }}>
                {author.name}
              </h1>
              <p style={{ fontSize: '0.95rem', color: 'var(--ouro)', marginBottom: '16px', fontWeight: 700 }}>{author.role}</p>
              <p style={{ fontSize: '0.9rem', color: 'var(--cinza)', lineHeight: 1.75, maxWidth: '600px', marginBottom: '20px' }}>{author.bio}</p>
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                {author.twitter && (
                  <a href={`https://twitter.com/${author.twitter.replace('@', '')}`} target="_blank" rel="noopener" className="btn btn--outline" style={{ fontSize: '0.68rem' }}>
                    {author.twitter}
                  </a>
                )}
                {author.email && (
                  <a href={`mailto:${author.email}`} className="btn btn--outline" style={{ fontSize: '0.68rem' }}>
                    {author.email}
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      <div style={{ background: 'var(--preto)', borderBottom: '1px solid var(--cinza-3)' }}>
        <div className="container">
          <div className="stats-bar">
            <div className="stats-bar__item">
              <span className="stats-bar__num">{new Date().getFullYear() - 2010}+</span>
              <span className="stats-bar__label">anos de carreira</span>
            </div>
            <div className="stats-bar__item">
              <span className="stats-bar__num">{author.articles.length}</span>
              <span className="stats-bar__label">peças publicadas</span>
            </div>
            <div className="stats-bar__item">
              <span className="stats-bar__num">{investigations}</span>
              <span className="stats-bar__label">dossiês</span>
            </div>
            <div className="stats-bar__item">
              <span className="stats-bar__num">{podcasts}</span>
              <span className="stats-bar__label">episódios</span>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <div style={{ background: 'var(--carvao-2)', borderBottom: '1px solid var(--cinza-3)' }}>
        <div className="container">
          <div className="filter-bar">
            <button className="filter-bar__btn active">Tudo</button>
            <button className="filter-bar__btn">Reportagens</button>
            <button className="filter-bar__btn">Investigação</button>
            <button className="filter-bar__btn">Opinião</button>
            <button className="filter-bar__btn">Multimédia</button>
          </div>
        </div>
      </div>

      {/* Article Archive */}
      <section style={{ padding: '40px 0', background: 'var(--preto)' }}>
        <div className="container">
          {author.articles.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '80px 0', color: 'var(--cinza)' }}>
              <p>Nenhum artigo publicado ainda.</p>
            </div>
          ) : (
            <>
              <p style={{ fontSize: '0.78rem', color: 'var(--cinza)', marginBottom: '24px' }}>
                {author.articles.length} {author.articles.length === 1 ? 'artigo publicado' : 'artigos publicados'}
              </p>
              <div className="grid-3">
                {author.articles.map(a => (
                  <ArticleCard key={a.id} article={a as any} size="medium" />
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      <AdZone />
    </div>
  )
}
