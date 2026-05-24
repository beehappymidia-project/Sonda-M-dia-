import { prisma } from '@/lib/db'
import AdZone from '@/components/AdZone'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'

interface Props { params: { slug: string } }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const a = await prisma.article.findUnique({ where: { slug: params.slug } })
  if (!a) return { title: 'Galeria não encontrada' }
  return { title: a.title, description: a.lead }
}

export async function generateStaticParams() {
  const articles = await prisma.article.findMany({ where: { isGallery: true }, select: { slug: true } })
  return articles.map(a => ({ slug: a.slug }))
}

const GALLERY_PHOTOS = ['protest', 'warm', 'city', 'green', 'market', 'dark', 'protest', 'city']

export default async function GaleriaSlugPage({ params }: Props) {
  const article = await prisma.article.findUnique({
    where: { slug: params.slug },
    include: { author: true },
  })
  if (!article) notFound()

  const related = await prisma.article.findMany({
    where: { isGallery: true, NOT: { id: article.id } },
    include: { author: true },
    take: 3,
    orderBy: { publishedAt: 'desc' },
  })

  const bodyParts = article.body.split('\n\n')

  return (
    <article>
      {/* Hero */}
      <div style={{ position: 'relative', height: '480px', overflow: 'hidden' }}>
        <div className={`photo ${article.photoStyle} grain`} style={{ position: 'absolute', inset: 0 }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.4) 60%, transparent 100%)' }} />
        <div className="container" style={{ position: 'relative', zIndex: 1, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', paddingBottom: '48px' }}>
          <span className="tag" style={{ marginBottom: '12px', display: 'inline-block', width: 'fit-content' }}>Galeria</span>
          <h1 style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.8rem)', fontWeight: 900, color: 'var(--branco)', marginBottom: '12px', maxWidth: '800px', lineHeight: 1.15 }}>
            {article.title}
          </h1>
          <p style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.75)', lineHeight: 1.6, maxWidth: '640px', marginBottom: '20px' }}>
            {article.lead}
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--ouro)' }}>
              Fotografia: {article.author.name}
            </span>
            <span style={{ color: 'var(--cinza-2)' }}>·</span>
            <span style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.5)' }}>{GALLERY_PHOTOS.length} fotografias</span>
          </div>
        </div>
      </div>

      {/* Intro */}
      <div style={{ background: 'var(--carvao)', borderBottom: '1px solid var(--cinza-3)', padding: '32px 0' }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <div className="article-body">
            {bodyParts.slice(0, 2).map((para, i) => {
              if (para.startsWith('## ')) return <h2 key={i}>{para.replace('## ', '')}</h2>
              return <p key={i}>{para}</p>
            })}
          </div>
        </div>
      </div>

      {/* Gallery Stack */}
      <div style={{ background: 'var(--preto)', padding: '40px 0 0' }}>
        <div className="container" style={{ maxWidth: '960px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {GALLERY_PHOTOS.map((style, i) => (
              <div key={i} style={{ position: 'relative', overflow: 'hidden', borderRadius: i === 0 ? '6px 6px 0 0' : i === GALLERY_PHOTOS.length - 1 ? '0 0 6px 6px' : '0' }}>
                <div className={`photo ${style} grain`} style={{ height: i === 0 || i === 3 ? '520px' : '360px' }} />
                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 100%)', padding: '24px 24px 20px' }}>
                  <span style={{ fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.1em', color: 'var(--ouro)', textTransform: 'uppercase' }}>
                    {String(i + 1).padStart(2, '0')} / {String(GALLERY_PHOTOS.length).padStart(2, '0')}
                  </span>
                  <p style={{ fontSize: '0.88rem', color: 'rgba(255,255,255,0.85)', marginTop: '4px' }}>
                    {bodyParts[i + 2] ? bodyParts[i + 2].substring(0, 120) + '...' : `${article.title} — imagem ${i + 1}`}
                  </p>
                  <p style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.5)', marginTop: '4px' }}>© {article.author.name} / SONDA MÍDIA</p>
                </div>
              </div>
            ))}
          </div>

          {/* Author + Related */}
          <div style={{ padding: '40px 0', borderTop: '1px solid var(--cinza-3)', marginTop: '32px', display: 'flex', gap: '40px', flexWrap: 'wrap', alignItems: 'flex-start' }}>
            <div style={{ flex: 1, minWidth: '280px' }}>
              <p style={{ fontSize: '0.62rem', fontWeight: 900, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--ouro)', marginBottom: '12px' }}>
                Fotógrafo
              </p>
              <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'var(--ouro)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, color: 'var(--preto)', flexShrink: 0 }}>
                  {article.author.name.charAt(0)}
                </div>
                <div>
                  <p style={{ fontWeight: 700, color: 'var(--branco)', marginBottom: '2px' }}>{article.author.name}</p>
                  <p style={{ fontSize: '0.78rem', color: 'var(--ouro)', marginBottom: '8px' }}>{article.author.role}</p>
                  <Link href={`/autor/${article.author.slug}`} style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--ouro)', borderBottom: '1px solid var(--ouro)', paddingBottom: '1px' }}>
                    Ver portfólio
                  </Link>
                </div>
              </div>
            </div>

            {related.length > 0 && (
              <div style={{ flex: 1, minWidth: '280px' }}>
                <p style={{ fontSize: '0.62rem', fontWeight: 900, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--ouro)', marginBottom: '12px' }}>
                  Mais Galerias
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {related.map(r => (
                    <Link key={r.id} href={`/galeria/${r.slug}`} style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--branco)' }}>
                      {r.title}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <AdZone />
    </article>
  )
}
