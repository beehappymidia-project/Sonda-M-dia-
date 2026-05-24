import { prisma } from '@/lib/db'
import { getPhotoUrl } from '@/lib/photos'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Podcast',
  description: 'Sonda Cast — conversas aprofundadas com jornalistas, especialistas e protagonistas.',
}

export const revalidate = 60

function formatDate(d: Date) {
  return new Date(d).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })
}

export default async function PodcastPage() {
  const episodes = await prisma.article.findMany({
    where: { isPodcast: true },
    include: { author: true },
    orderBy: { publishedAt: 'desc' },
  })

  return (
    <div>
      {/* Header */}
      <div style={{ background: '#0d0d0d', borderBottom: '1px solid #1a1a1a', padding: '40px 0' }}>
        <div className="container">
          <span className="section-label" style={{ fontSize: '12px' }}>Áudio</span>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '36px', fontWeight: 900, color: '#e8e8e8', marginTop: '8px', marginBottom: '8px' }}>
            Sonda Cast
          </h1>
          <p style={{ fontSize: '15px', color: '#666', maxWidth: '540px' }}>
            Conversas aprofundadas com jornalistas, especialistas e protagonistas das histórias que importam.
          </p>
          <div style={{ marginTop: '20px', display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            {['Spotify', 'Apple Podcasts', 'Google Podcasts', 'RSS'].map(platform => (
              <a key={platform} href="#" style={{
                fontSize: '12px', fontWeight: 600, letterSpacing: '0.05em',
                color: '#888', background: '#111', border: '1px solid #222',
                padding: '6px 14px', borderRadius: '20px',
              }}>
                {platform}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="container" style={{ padding: '48px 24px' }}>
        {episodes.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '80px 0', color: '#555' }}>
            <p style={{ fontSize: '18px' }}>Nenhum episódio publicado ainda.</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
            {episodes.map((ep, i) => {
              const img = getPhotoUrl(ep.photoStyle, 'md')
              return (
                <Link key={ep.id} href={`/artigo/${ep.slug}`} style={{
                  display: 'grid',
                  gridTemplateColumns: '80px 1fr auto',
                  gap: '24px',
                  alignItems: 'center',
                  padding: '28px 0',
                  borderBottom: '1px solid #1a1a1a',
                }}>
                  {/* Episode number / thumbnail */}
                  <div style={{
                    width: '80px', height: '80px', borderRadius: '4px',
                    backgroundImage: `url(${img})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    position: 'relative',
                    flexShrink: 0,
                  }}>
                    <div style={{
                      position: 'absolute', inset: 0, borderRadius: '4px',
                      background: 'rgba(0,0,0,0.5)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      <div style={{
                        width: '32px', height: '32px', borderRadius: '50%',
                        background: '#c9a84c',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                      }}>
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                          <path d="M3 2l7 4-7 4V2z" fill="#0a0a0a" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Info */}
                  <div>
                    <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '8px' }}>
                      <span style={{ fontSize: '11px', color: '#c9a84c', fontWeight: 700, letterSpacing: '0.1em' }}>
                        EP {String(episodes.length - i).padStart(2, '0')}
                      </span>
                      <span style={{ fontSize: '11px', color: '#555' }}>{formatDate(ep.publishedAt)}</span>
                    </div>
                    <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '18px', fontWeight: 700, color: '#e0e0e0', lineHeight: '1.3', marginBottom: '8px' }}>
                      {ep.title}
                    </h3>
                    <p style={{ fontSize: '13px', color: '#777', lineHeight: '1.5' }}>
                      {ep.lead.substring(0, 140)}...
                    </p>
                  </div>

                  {/* Duration */}
                  <div style={{ textAlign: 'right', flexShrink: 0 }}>
                    <span style={{ fontSize: '13px', color: '#666' }}>{ep.readTime} min</span>
                  </div>
                </Link>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
