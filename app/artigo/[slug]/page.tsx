import { prisma } from '@/lib/db'
import { getPhotoUrl } from '@/lib/photos'
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
    openGraph: {
      title: article.title,
      description: article.lead,
      images: [getPhotoUrl(article.photoStyle, 'lg')],
    },
  }
}

export async function generateStaticParams() {
  const articles = await prisma.article.findMany({ select: { slug: true } })
  return articles.map(a => ({ slug: a.slug }))
}

function formatDate(d: Date) {
  return new Date(d).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })
}

function formatType(a: { isVideo: boolean; isPodcast: boolean; isGallery: boolean; isOpinion: boolean; isLongForm: boolean; format: string }) {
  if (a.isVideo) return 'Vídeo'
  if (a.isPodcast) return 'Podcast'
  if (a.isGallery) return 'Galeria'
  if (a.isOpinion) return 'Opinião'
  if (a.isLongForm) return 'Especial'
  return a.format.charAt(0) + a.format.slice(1).toLowerCase()
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

  const heroImg = getPhotoUrl(article.photoStyle, 'lg')

  return (
    <article>
      {/* Hero */}
      <div style={{
        height: '520px',
        backgroundImage: `url(${heroImg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'relative',
      }}>
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.5) 60%, rgba(0,0,0,0.2) 100%)',
        }} />
        <div className="container" style={{ position: 'relative', zIndex: 1, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', paddingBottom: '48px' }}>
          <div style={{ maxWidth: '800px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
              <Link href={`/${article.section.toLowerCase().replace('ã', 'a').replace('á', 'a').replace('é', 'e').replace('í', 'i').replace('ó', 'o').replace('ú', 'u')}`}>
                <span className="section-label" style={{ fontSize: '12px' }}>{article.section.toUpperCase()}</span>
              </Link>
              <span style={{ color: '#555' }}>•</span>
              <span style={{ fontSize: '12px', color: '#888' }}>{formatType(article)}</span>
              <span style={{ color: '#555' }}>•</span>
              <span style={{ fontSize: '12px', color: '#888' }}>{article.readTime} min de leitura</span>
            </div>
            <h1 style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '36px',
              fontWeight: 900,
              lineHeight: '1.2',
              color: '#fff',
              marginBottom: '16px',
            }}>
              {article.title}
            </h1>
            <p style={{ fontSize: '18px', color: '#ccc', lineHeight: '1.6', marginBottom: '24px' }}>
              {article.lead}
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <Link href={`/autor/${article.author.slug}`} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{
                  width: '36px', height: '36px', borderRadius: '50%',
                  background: 'linear-gradient(135deg, #c9a84c, #6b4a10)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '14px', fontWeight: 700, color: '#fff',
                }}>
                  {article.author.name.charAt(0)}
                </div>
                <div>
                  <p style={{ fontSize: '13px', fontWeight: 600, color: '#ddd' }}>{article.author.name}</p>
                  <p style={{ fontSize: '11px', color: '#888' }}>{article.author.role}</p>
                </div>
              </Link>
              <span style={{ color: '#444' }}>•</span>
              <span style={{ fontSize: '12px', color: '#888' }}>{formatDate(article.publishedAt)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: '56px 0' }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: '1fr 280px', gap: '64px' }}>
          {/* Main content */}
          <div style={{ maxWidth: '700px' }}>
            <div style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '18px',
              lineHeight: '1.85',
              color: '#d0d0d0',
            }}>
              {article.body.split('\n\n').map((para, i) => (
                <p key={i} style={{ marginBottom: '28px' }}>{para}</p>
              ))}
            </div>

            {/* Tags */}
            {article.tags && (
              <div style={{ marginTop: '48px', paddingTop: '24px', borderTop: '1px solid #1a1a1a', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {article.tags.split(',').filter(Boolean).map(tag => (
                  <span key={tag} style={{
                    fontSize: '11px', fontWeight: 600, letterSpacing: '0.08em',
                    textTransform: 'uppercase', color: '#666',
                    background: '#111', border: '1px solid #222',
                    padding: '4px 10px', borderRadius: '2px',
                  }}>
                    {tag.trim()}
                  </span>
                ))}
              </div>
            )}

            {/* Author box */}
            <div style={{
              marginTop: '48px', padding: '28px', background: '#111', borderRadius: '4px',
              border: '1px solid #1a1a1a',
            }}>
              <p style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#c9a84c', marginBottom: '16px' }}>
                Sobre o autor
              </p>
              <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
                <div style={{
                  width: '56px', height: '56px', borderRadius: '50%', flexShrink: 0,
                  background: 'linear-gradient(135deg, #c9a84c, #6b4a10)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '20px', fontWeight: 700, color: '#fff',
                }}>
                  {article.author.name.charAt(0)}
                </div>
                <div>
                  <p style={{ fontWeight: 700, color: '#e0e0e0', marginBottom: '4px' }}>{article.author.name}</p>
                  <p style={{ fontSize: '13px', color: '#c9a84c', marginBottom: '12px' }}>{article.author.role}</p>
                  <p style={{ fontSize: '14px', color: '#777', lineHeight: '1.6' }}>{article.author.bio}</p>
                  <Link href={`/autor/${article.author.slug}`} style={{
                    display: 'inline-block', marginTop: '12px',
                    fontSize: '12px', fontWeight: 600, color: '#c9a84c',
                    borderBottom: '1px solid #c9a84c', paddingBottom: '1px',
                  }}>
                    Ver todos os artigos
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <aside>
            {related.length > 0 && (
              <div style={{ position: 'sticky', top: '80px' }}>
                <p style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#c9a84c', marginBottom: '20px' }}>
                  Leia também
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  {related.map(r => (
                    <Link key={r.id} href={`/artigo/${r.slug}`} style={{ display: 'block', padding: '0 0 20px', borderBottom: '1px solid #1a1a1a' }}>
                      <span className="section-label" style={{ fontSize: '10px' }}>{r.section}</span>
                      <h4 style={{
                        fontFamily: 'var(--font-serif)',
                        fontSize: '15px', fontWeight: 700, lineHeight: '1.35',
                        color: '#ddd', marginTop: '6px',
                      }}>{r.title}</h4>
                      <span style={{ fontSize: '11px', color: '#666', marginTop: '6px', display: 'block' }}>{r.readTime} min</span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </aside>
        </div>
      </div>
    </article>
  )
}
