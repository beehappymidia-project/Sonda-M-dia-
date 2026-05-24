import { prisma } from '@/lib/db'
import ArticleCard from '@/components/ArticleCard'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

interface Props {
  params: { slug: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const author = await prisma.author.findUnique({ where: { slug: params.slug } })
  if (!author) return { title: 'Autor não encontrado' }
  return { title: author.name, description: author.bio }
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

  return (
    <div>
      {/* Author header */}
      <div style={{ background: '#0d0d0d', borderBottom: '1px solid #1a1a1a', padding: '56px 0' }}>
        <div className="container">
          <div style={{ display: 'flex', gap: '32px', alignItems: 'flex-start' }}>
            <div style={{
              width: '100px', height: '100px', borderRadius: '50%', flexShrink: 0,
              background: 'linear-gradient(135deg, #c9a84c, #6b4a10)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '36px', fontWeight: 700, color: '#fff',
            }}>
              {author.name.charAt(0)}
            </div>
            <div>
              <span className="section-label" style={{ fontSize: '11px' }}>Jornalista</span>
              <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '36px', fontWeight: 900, color: '#e8e8e8', marginTop: '8px', marginBottom: '8px' }}>
                {author.name}
              </h1>
              <p style={{ fontSize: '15px', color: '#c9a84c', marginBottom: '16px' }}>{author.role}</p>
              <p style={{ fontSize: '15px', color: '#777', lineHeight: '1.7', maxWidth: '560px' }}>{author.bio}</p>
              <div style={{ marginTop: '20px', display: 'flex', gap: '16px' }}>
                {author.twitter && (
                  <a href={`https://twitter.com/${author.twitter}`} target="_blank" rel="noopener" style={{ fontSize: '13px', color: '#666' }}>
                    Twitter @{author.twitter}
                  </a>
                )}
                {author.email && (
                  <a href={`mailto:${author.email}`} style={{ fontSize: '13px', color: '#666' }}>
                    {author.email}
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Articles */}
      <div className="container" style={{ padding: '48px 24px' }}>
        <div style={{ marginBottom: '32px' }}>
          <p style={{ fontSize: '13px', color: '#666' }}>
            {author.articles.length} artigos publicados
          </p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '28px' }}>
          {author.articles.map(a => (
            <ArticleCard key={a.id} article={a as any} size="medium" />
          ))}
        </div>
      </div>
    </div>
  )
}
