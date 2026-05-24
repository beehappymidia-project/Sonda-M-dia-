import Link from 'next/link'
import { getPhotoUrl } from '@/lib/photos'

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
  return date.toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })
}

function formatLabel(a: ArticleCardProps['article']) {
  if (a.isVideo) return 'Vídeo'
  if (a.isPodcast) return 'Podcast'
  if (a.isGallery) return 'Galeria'
  if (a.isOpinion) return 'Opinião'
  if (a.isLongForm) return 'Especial'
  return a.format.charAt(0) + a.format.slice(1).toLowerCase()
}

export default function ArticleCard({ article: a, size = 'medium' }: ArticleCardProps) {
  const img = getPhotoUrl(a.photoStyle, size === 'large' ? 'lg' : 'md')

  if (size === 'horizontal') {
    return (
      <Link href={`/artigo/${a.slug}`} style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
        <div style={{
          width: '120px',
          height: '80px',
          flexShrink: 0,
          backgroundImage: `url(${img})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          borderRadius: '2px',
        }} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <span className="section-label" style={{ fontSize: '10px' }}>{a.section.toUpperCase()}</span>
          <h4 style={{
            fontFamily: 'var(--font-serif)',
            fontSize: '14px',
            fontWeight: 700,
            lineHeight: '1.4',
            color: '#e0e0e0',
            marginTop: '4px',
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}>{a.title}</h4>
        </div>
      </Link>
    )
  }

  if (size === 'large') {
    return (
      <Link href={`/artigo/${a.slug}`} style={{ display: 'block', position: 'relative' }}>
        <div style={{
          height: '480px',
          backgroundImage: `url(${img})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          borderRadius: '3px',
          position: 'relative',
          overflow: 'hidden',
        }}>
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.4) 60%, transparent 100%)',
          }} />
          <div style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            padding: '32px',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
              <span className="section-label">{a.section.toUpperCase()}</span>
              <span style={{ width: '3px', height: '3px', borderRadius: '50%', background: '#555' }} />
              <span style={{ fontSize: '11px', color: '#888' }}>{formatLabel(a)}</span>
            </div>
            <h2 style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '28px',
              fontWeight: 900,
              lineHeight: '1.2',
              color: '#fff',
              marginBottom: '12px',
            }}>{a.title}</h2>
            <p style={{ fontSize: '14px', color: '#bbb', lineHeight: '1.6', marginBottom: '16px' }}>{a.lead}</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ fontSize: '12px', color: '#888' }}>Por {a.author.name}</span>
              <span style={{ color: '#444' }}>•</span>
              <span style={{ fontSize: '12px', color: '#666' }}>{a.readTime} min de leitura</span>
            </div>
          </div>
        </div>
      </Link>
    )
  }

  if (size === 'small') {
    return (
      <Link href={`/artigo/${a.slug}`} style={{ display: 'block' }}>
        <div style={{
          height: '160px',
          backgroundImage: `url(${img})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          borderRadius: '2px',
          marginBottom: '12px',
          position: 'relative',
          overflow: 'hidden',
        }}>
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 60%)',
          }} />
        </div>
        <span className="section-label" style={{ fontSize: '10px' }}>{a.section.toUpperCase()}</span>
        <h4 style={{
          fontFamily: 'var(--font-serif)',
          fontSize: '15px',
          fontWeight: 700,
          lineHeight: '1.35',
          color: '#ddd',
          marginTop: '6px',
        }}>{a.title}</h4>
        <div style={{ marginTop: '8px', display: 'flex', gap: '8px', alignItems: 'center' }}>
          <span style={{ fontSize: '11px', color: '#666' }}>{formatDate(a.publishedAt)}</span>
        </div>
      </Link>
    )
  }

  // medium (default)
  return (
    <Link href={`/artigo/${a.slug}`} style={{ display: 'block' }}>
      <div style={{
        height: '220px',
        backgroundImage: `url(${img})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        borderRadius: '2px',
        marginBottom: '14px',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 70%)',
        }} />
        {(a.isVideo || a.isPodcast) && (
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '44px',
            height: '44px',
            borderRadius: '50%',
            background: 'rgba(201,168,76,0.9)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M5 3l10 5-10 5V3z" fill="#0a0a0a" />
            </svg>
          </div>
        )}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
        <span className="section-label" style={{ fontSize: '10px' }}>{a.section.toUpperCase()}</span>
        {a.isLongForm && (
          <span style={{ fontSize: '10px', color: '#666', background: '#1a1a1a', padding: '2px 6px', borderRadius: '2px' }}>ESPECIAL</span>
        )}
      </div>
      <h3 style={{
        fontFamily: 'var(--font-serif)',
        fontSize: '17px',
        fontWeight: 700,
        lineHeight: '1.35',
        color: '#e0e0e0',
        marginBottom: '8px',
      }}>{a.title}</h3>
      <p style={{ fontSize: '13px', color: '#777', lineHeight: '1.55', marginBottom: '12px' }}>{a.lead.substring(0, 120)}…</p>
      <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
        <Link href={`/autor/${a.author.slug}`} style={{ fontSize: '12px', color: '#888' }}>
          {a.author.name}
        </Link>
        <span style={{ color: '#333' }}>•</span>
        <span style={{ fontSize: '12px', color: '#555' }}>{a.readTime} min</span>
      </div>
    </Link>
  )
}
