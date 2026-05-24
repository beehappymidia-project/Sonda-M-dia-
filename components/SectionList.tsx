import ArticleCard from '@/components/ArticleCard'
import Link from 'next/link'

interface Article {
  id: number
  slug: string
  title: string
  lead: string
  section: string
  format: string
  readTime: number
  photoStyle: string
  publishedAt: Date
  featured: boolean
  isLongForm: boolean
  isVideo: boolean
  isPodcast: boolean
  isGallery: boolean
  isOpinion: boolean
  author: { name: string; slug: string }
}

interface Props {
  title: string
  subtitle: string
  sectionLabel: string
  articles: Article[]
  emptyMessage?: string
}

export default function SectionList({ title, subtitle, sectionLabel, articles, emptyMessage }: Props) {
  const hero = articles[0]
  const rest = articles.slice(1)

  return (
    <div>
      {/* Section Header */}
      <div style={{ background: '#0d0d0d', borderBottom: '1px solid #1a1a1a', padding: '40px 0' }}>
        <div className="container">
          <span className="section-label" style={{ fontSize: '12px' }}>{sectionLabel}</span>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '36px', fontWeight: 900, color: '#e8e8e8', marginTop: '8px', marginBottom: '8px' }}>
            {title}
          </h1>
          <p style={{ fontSize: '15px', color: '#666', maxWidth: '540px' }}>{subtitle}</p>
        </div>
      </div>

      <div className="container" style={{ padding: '48px 24px' }}>
        {articles.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '80px 0', color: '#555' }}>
            <p style={{ fontSize: '18px' }}>{emptyMessage || 'Nenhum artigo encontrado.'}</p>
          </div>
        ) : (
          <>
            {/* Hero article */}
            {hero && (
              <div style={{ marginBottom: '48px' }}>
                <ArticleCard article={hero as any} size="large" />
              </div>
            )}

            {/* Grid */}
            {rest.length > 0 && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '32px' }}>
                {rest.map(a => (
                  <ArticleCard key={a.id} article={a as any} size="medium" />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
