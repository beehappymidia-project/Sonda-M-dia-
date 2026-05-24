import Link from 'next/link'

interface ArticleCardProps {
  article: {
    id: number
    slug: string
    title: string
    lead: string
    section: string
    format: string
    readTime: number
    photoStyle: string
    publishedAt: string | Date
    author: { name: string; slug: string }
    featured?: boolean
    isLongForm?: boolean
    isVideo?: boolean
    isPodcast?: boolean
    isGallery?: boolean
    isOpinion?: boolean
  }
  size?: 'large' | 'medium' | 'small' | 'horizontal'
}

function formatDate(d: string | Date) {
  const date = new Date(d)
  return date.toLocaleDateString('pt', { day: '2-digit', month: 'long', year: 'numeric' })
}

function formatLabel(a: ArticleCardProps['article']) {
  if (a.isVideo) return 'Vídeo'
  if (a.isPodcast) return 'Podcast'
  if (a.isGallery) return 'Galeria'
  if (a.isOpinion) return 'Opinião'
  if (a.isLongForm) return 'Especial'
  return a.format.charAt(0) + a.format.slice(1).toLowerCase()
}

function PhotoDiv({ style, className = '' }: { style: string; className?: string }) {
  return <div className={`photo ${style} grain ${className}`} />
}

export default function ArticleCard({ article: a, size = 'medium' }: ArticleCardProps) {
  const sectionSlug = a.section.toLowerCase()
    .replace(/ç/g, 'c').replace(/ã/g, 'a').replace(/á/g, 'a').replace(/â/g, 'a')
    .replace(/é/g, 'e').replace(/ê/g, 'e').replace(/í/g, 'i')
    .replace(/ó/g, 'o').replace(/ô/g, 'o').replace(/ú/g, 'u')
    .replace(/ü/g, 'u').replace(/\s/g, '-')

  if (size === 'horizontal') {
    return (
      <Link href={`/artigo/${a.slug}`} style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
        <div style={{ width: '100px', height: '70px', flexShrink: 0, borderRadius: '4px', overflow: 'hidden', position: 'relative' }}>
          <PhotoDiv style={a.photoStyle} />
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <span className="tag tag--section" style={{ marginBottom: '6px', display: 'inline-block' }}>{a.section}</span>
          <h4 style={{ fontSize: '0.85rem', fontWeight: 700, lineHeight: 1.35, color: 'var(--branco)', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
            {a.title}
          </h4>
          <span style={{ fontSize: '0.68rem', color: 'var(--cinza)', marginTop: '4px', display: 'block' }}>{a.readTime} min</span>
        </div>
      </Link>
    )
  }

  if (size === 'large') {
    return (
      <Link href={`/artigo/${a.slug}`} className="manchete" style={{ display: 'block', minHeight: '480px' }}>
        <div className="manchete__photo">
          <PhotoDiv style={a.photoStyle} />
        </div>
        <div className="manchete__overlay" />
        <div className="manchete__content">
          <div className="manchete__tags">
            <span className="tag">{a.section}</span>
            <span className="tag tag--outline">{formatLabel(a)}</span>
          </div>
          <h2 className="manchete__title">{a.title}</h2>
          <p className="manchete__lead">{a.lead}</p>
          <div className="manchete__meta">
            <span className="manchete__author">{a.author.name}</span>
            <span className="manchete__time">— {a.readTime} min de leitura</span>
          </div>
        </div>
      </Link>
    )
  }

  if (size === 'small') {
    return (
      <Link href={`/artigo/${a.slug}`} style={{ display: 'block' }}>
        <div style={{ height: '150px', borderRadius: '4px', overflow: 'hidden', position: 'relative', marginBottom: '12px' }}>
          <PhotoDiv style={a.photoStyle} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.65) 0%, transparent 60%)' }} />
        </div>
        <span className="tag tag--section" style={{ marginBottom: '6px' }}>{a.section}</span>
        <h4 style={{ fontSize: '0.9rem', fontWeight: 700, lineHeight: 1.35, color: 'var(--branco)', marginTop: '6px' }}>{a.title}</h4>
        <div style={{ marginTop: '8px', display: 'flex', gap: '8px', alignItems: 'center' }}>
          <span style={{ fontSize: '0.68rem', color: 'var(--cinza)' }}>{formatDate(a.publishedAt)}</span>
        </div>
      </Link>
    )
  }

  // medium (default)
  return (
    <article className="card">
      <div className="card__thumb">
        <PhotoDiv style={a.photoStyle} />
        {(a.isVideo || a.isPodcast) && (
          <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2 }}>
            <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: 'rgba(255,183,3,0.9)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M5 3l9 5-9 5V3z" fill="#0B0B0B" />
              </svg>
            </div>
          </div>
        )}
      </div>
      <div className="card__body">
        <div className="card__meta">
          <span className="tag tag--section">{a.section}</span>
          {a.isLongForm && <span className="tag tag--format">Especial</span>}
        </div>
        <div className="card__title">
          <Link href={`/artigo/${a.slug}`}>{a.title}</Link>
        </div>
        <p className="card__lead">{a.lead}</p>
        <div className="card__footer">
          <Link href={`/autor/${a.author.slug}`} className="card__author">{a.author.name}</Link>
          <span className="card__time">{a.readTime} min</span>
        </div>
      </div>
    </article>
  )
}
