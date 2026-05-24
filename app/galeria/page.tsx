import { prisma } from '@/lib/db'
import { getPhotoUrl } from '@/lib/photos'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Galeria',
  description: 'Fotoensaios e galerias de imagens do jornalismo visual do SONDA MÍDIA.',
}

export const revalidate = 60

export default async function GaleriaPage() {
  const galleries = await prisma.article.findMany({
    where: { isGallery: true },
    include: { author: true },
    orderBy: { publishedAt: 'desc' },
  })

  return (
    <div>
      {/* Header */}
      <div style={{ background: '#0d0d0d', borderBottom: '1px solid #1a1a1a', padding: '40px 0' }}>
        <div className="container">
          <span className="section-label" style={{ fontSize: '12px' }}>Visual</span>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '36px', fontWeight: 900, color: '#e8e8e8', marginTop: '8px', marginBottom: '8px' }}>
            Galeria
          </h1>
          <p style={{ fontSize: '15px', color: '#666', maxWidth: '540px' }}>
            Fotoensaios e narrativas visuais que ampliam o olhar sobre a realidade.
          </p>
        </div>
      </div>

      <div className="container" style={{ padding: '48px 24px' }}>
        {galleries.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '80px 0', color: '#555' }}>
            <p style={{ fontSize: '18px' }}>Nenhuma galeria publicada ainda.</p>
          </div>
        ) : (
          <div style={{ columns: '3', gap: '16px' }}>
            {galleries.map(g => {
              const img = getPhotoUrl(g.photoStyle, 'lg')
              return (
                <Link key={g.id} href={`/artigo/${g.slug}`} style={{
                  display: 'block',
                  marginBottom: '16px',
                  breakInside: 'avoid',
                  position: 'relative',
                  overflow: 'hidden',
                  borderRadius: '4px',
                }}>
                  <img
                    src={img}
                    alt={g.title}
                    style={{ width: '100%', display: 'block', borderRadius: '4px' }}
                  />
                  <div style={{
                    position: 'absolute',
                    bottom: 0, left: 0, right: 0,
                    background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, transparent 100%)',
                    padding: '24px 16px 16px',
                  }}>
                    <p style={{ fontSize: '14px', fontWeight: 700, color: '#fff', lineHeight: '1.3' }}>
                      {g.title}
                    </p>
                    <p style={{ fontSize: '12px', color: '#aaa', marginTop: '4px' }}>
                      Por {g.author.name}
                    </p>
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
