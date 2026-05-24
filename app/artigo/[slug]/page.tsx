import { prisma } from '@/lib/db'
import AdZone from '@/components/AdZone'
import ArticleCard from '@/components/ArticleCard'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'

interface Props {
  params: { slug: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const article = await prisma.article.findUnique({
    where: { slug: params.slug },
    include: { author: true },
  })
  if (!article) return { title: 'Artigo não encontrado' }
  return {
    title: article.title,
    description: article.lead,
  }
}

export async function generateStaticParams() {
  const articles = await prisma.article.findMany({ select: { slug: true } })
  return articles.map(a => ({ slug: a.slug }))
}

function formatDate(d: Date) {
  return new Date(d).toLocaleDateString('pt', { day: '2-digit', month: 'long', year: 'numeric' })
}

function parseBody(body: string) {
  return body.split('\n\n').map((para, i) => {
    if (para.startsWith('## ')) {
      return <h2 key={i}>{para.replace('## ', '')}</h2>
    }
    if (para.startsWith('### ')) {
      return <h3 key={i}>{para.replace('### ', '')}</h3>
    }
    return <p key={i}>{para}</p>
  })
}

function getArticleHref(a: { isLongForm: boolean; isVideo: boolean; isPodcast: boolean; isGallery: boolean; isOpinion: boolean; slug: string }) {
  if (a.isVideo) return `/documentario/${a.slug}`
  if (a.isPodcast) return `/podcast/${a.slug}`
  if (a.isGallery) return `/galeria/${a.slug}`
  if (a.isOpinion) return `/opiniao/${a.slug}`
  if (a.isLongForm) return `/investigacao/${a.slug}`
  return `/artigo/${a.slug}`
}

export default async function ArticlePage({ params }: Props) {
  const article = await prisma.article.findUnique({
    where: { slug: params.slug },
    include: { author: true },
  })
  if (!article) notFound()

  const related = await prisma.article.findMany({
    where: { section: article.section, NOT: { id: article.id } },
    include: { author: true },
    take: 3,
    orderBy: { publishedAt: 'desc' },
  })

  const tags = article.tags ? article.tags.split(',').filter(Boolean).map(t => t.trim()) : []

  return (
    <article>
      {/* Hero */}
      <div style={{ position: 'relative', height: '520px', overflow: 'hidden' }}>
        <div className={`photo ${article.photoStyle} grain`} style={{ position: 'absolute', inset: 0 }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.97) 0%, rgba(0,0,0,0.55) 55%, rgba(0,0,0,0.15) 100%)' }} />
        <div className="container" style={{ position: 'relative', zIndex: 1, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', paddingBottom: '48px' }}>
          <div style={{ maxWidth: '800px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px', flexWrap: 'wrap' }}>
              <span className="tag">{article.section}</span>
              <span className="tag tag--format">{article.format}</span>
              <span style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.5)' }}>{article.readTime} min de leitura</span>
            </div>
            <h1 style={{ fontSize: 'clamp(1.5rem, 3vw, 2.6rem)', fontWeight: 900, lineHeight: 1.15, color: 'var(--branco)', marginBottom: '14px' }}>
              {article.title}
            </h1>
            <p style={{ fontSize: '1.05rem', color: 'rgba(255,255,255,0.8)', lineHeight: 1.6, marginBottom: '24px' }}>
              {article.lead}
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <Link href={`/autor/${article.author.slug}`} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'var(--ouro)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.85rem', fontWeight: 900, color: 'var(--preto)' }}>
                  {article.author.name.charAt(0)}
                </div>
                <div>
                  <p style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--ouro)' }}>{article.author.name}</p>
                  <p style={{ fontSize: '0.68rem', color: 'rgba(255,255,255,0.55)' }}>{article.author.role}</p>
                </div>
              </Link>
              <span style={{ color: 'var(--cinza-2)' }}>·</span>
              <span style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.5)' }}>{formatDate(article.publishedAt)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: '56px 0 0' }}>
        <div className="container">
          <div className="grid-article">
            {/* TOC Sidebar */}
            <aside>
              <div className="chapter-nav" style={{ position: 'sticky', top: '80px' }}>
                <div className="chapter-nav__head">Neste artigo</div>
                <ul className="chapter-nav__list">
                  <li><a href="#introducao"><span className="chapter-nav__num">01</span> Introdução</a></li>
                  {tags.slice(0, 4).map((tag, i) => (
                    <li key={tag}><a href={`#${tag.replace(/\s/g, '-')}`}><span className="chapter-nav__num">{String(i + 2).padStart(2, '0')}</span> {tag}</a></li>
                  ))}
                </ul>
              </div>
            </aside>

            {/* Main Content */}
            <div>
              {/* Pullquote */}
              <div className="pullquote" style={{ marginBottom: '32px' }}>
                <p className="pullquote__text">&ldquo;{article.lead}&rdquo;</p>
                <span className="pullquote__cite">— {article.author.name}, {article.author.role}</span>
              </div>

              <div className="article-body" id="introducao">
                {parseBody(article.body)}
              </div>

              {/* Tags */}
              {tags.length > 0 && (
                <div style={{ marginTop: '48px', paddingTop: '20px', borderTop: '1px solid var(--cinza-3)', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {tags.map(tag => (
                    <span key={tag} className="tag tag--section">{tag}</span>
                  ))}
                </div>
              )}

              {/* Author Box */}
              <div style={{ marginTop: '40px', padding: '24px', background: 'var(--carvao)', borderRadius: '6px', border: '1px solid var(--cinza-3)' }}>
                <p style={{ fontSize: '0.62rem', fontWeight: 900, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--ouro)', marginBottom: '14px' }}>
                  Sobre o Autor
                </p>
                <div style={{ display: 'flex', gap: '18px', alignItems: 'flex-start' }}>
                  <div style={{ width: '52px', height: '52px', borderRadius: '50%', flexShrink: 0, background: 'var(--ouro)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', fontWeight: 900, color: 'var(--preto)' }}>
                    {article.author.name.charAt(0)}
                  </div>
                  <div>
                    <p style={{ fontWeight: 700, color: 'var(--branco)', marginBottom: '2px' }}>{article.author.name}</p>
                    <p style={{ fontSize: '0.78rem', color: 'var(--ouro)', marginBottom: '10px' }}>{article.author.role}</p>
                    <p style={{ fontSize: '0.82rem', color: 'var(--cinza)', lineHeight: 1.6 }}>{article.author.bio.substring(0, 200)}...</p>
                    <Link href={`/autor/${article.author.slug}`} style={{ display: 'inline-block', marginTop: '10px', fontSize: '0.72rem', fontWeight: 700, color: 'var(--ouro)', borderBottom: '1px solid var(--ouro)', paddingBottom: '1px' }}>
                      Ver todos os artigos
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Sidebar */}
            <aside className="sidebar">
              <div className="sidebar__widget">
                <div className="sidebar__widget-head">Leia também</div>
                <div className="sidebar__widget-body">
                  <ul className="sidebar__list">
                    {related.map(r => (
                      <li key={r.id}>
                        <Link href={getArticleHref(r)}>{r.title}</Link>
                        <span style={{ display: 'block', fontSize: '0.68rem', color: 'var(--cinza)', marginTop: '2px' }}>{r.readTime} min · {r.section}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="ad ad--mpu" style={{ alignSelf: 'start' }}>
                <span className="ad__label">MPU</span>
                <span className="ad__size">300×250</span>
              </div>
            </aside>
          </div>
        </div>
      </div>

      <AdZone />
    </article>
  )
}
