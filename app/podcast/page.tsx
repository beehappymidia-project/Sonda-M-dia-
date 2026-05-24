import { prisma } from '@/lib/db'
import Link from 'next/link'
import AdZone from '@/components/AdZone'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Podcast',
  description: 'Podcasts do SONDA MÍDIA — conversas aprofundadas com jornalistas e especialistas.',
}

export const revalidate = 60

function formatDate(d: Date) {
  return new Date(d).toLocaleDateString('pt', { day: '2-digit', month: 'long', year: 'numeric' })
}

export default async function PodcastPage() {
  const episodes = await prisma.article.findMany({
    where: { isPodcast: true },
    include: { author: true },
    orderBy: { publishedAt: 'desc' },
  })

  return (
    <div>
      <div style={{ background: 'var(--carvao)', borderBottom: '1px solid var(--cinza-3)', padding: '40px 0' }}>
        <div className="container">
          <div className="section-head">
            <div className="section-head__line" />
            <span className="section-head__title">Áudio</span>
          </div>
          <h1 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', fontWeight: 900, color: 'var(--branco)', marginTop: '8px', marginBottom: '8px' }}>
            Podcast SONDA MÍDIA
          </h1>
          <p style={{ fontSize: '0.95rem', color: 'var(--cinza)', maxWidth: '540px', marginBottom: '20px' }}>
            Conversas aprofundadas com jornalistas, especialistas e protagonistas das histórias que importam.
          </p>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            {['Spotify', 'Apple Podcasts', 'Google Podcasts', 'RSS'].map(platform => (
              <a key={platform} href="#" style={{
                fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: 'var(--cinza)', background: 'var(--cinza-3)', border: '1px solid var(--cinza-2)',
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
          <p style={{ color: 'var(--cinza)', textAlign: 'center', padding: '80px 0', fontSize: '1rem' }}>
            Nenhum episódio publicado ainda.
          </p>
        ) : (
          <div>
            {episodes.map((ep, i) => (
              <Link key={ep.id} href={`/artigo/${ep.slug}`} style={{
                display: 'grid',
                gridTemplateColumns: '80px 1fr auto',
                gap: '24px',
                alignItems: 'center',
                padding: '24px 0',
                borderBottom: '1px solid var(--cinza-3)',
                textDecoration: 'none',
              }}>
                {/* Thumbnail */}
                <div style={{
                  width: '80px', height: '80px', borderRadius: '6px',
                  overflow: 'hidden', position: 'relative', flexShrink: 0,
                }}>
                  <div className={`photo ${ep.photoStyle} grain`} style={{ position: 'absolute', inset: 0 }} />
                  <div style={{
                    position: 'absolute', inset: 0,
                    background: 'rgba(0,0,0,0.4)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <div style={{
                      width: '32px', height: '32px', borderRadius: '50%',
                      background: 'var(--ouro)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                        <path d="M3 2l7 4-7 4V2z" fill="#0B0B0B" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Info */}
                <div>
                  <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '8px' }}>
                    <span style={{ fontSize: '0.62rem', color: 'var(--ouro)', fontWeight: 900, letterSpacing: '0.12em' }}>
                      EP {String(episodes.length - i).padStart(2, '0')}
                    </span>
                    <span style={{ fontSize: '0.68rem', color: 'var(--cinza)' }}>{formatDate(ep.publishedAt)}</span>
                  </div>
                  <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--branco)', lineHeight: 1.3, marginBottom: '6px' }}>
                    {ep.title}
                  </h3>
                  <p style={{ fontSize: '0.82rem', color: 'var(--cinza)', lineHeight: 1.5 }}>
                    {ep.lead.substring(0, 130)}...
                  </p>
                </div>

                {/* Duration */}
                <div style={{ textAlign: 'right', flexShrink: 0 }}>
                  <span style={{ fontSize: '0.82rem', color: 'var(--cinza)' }}>{ep.readTime} min</span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
      <AdZone />
    </div>
  )
}
