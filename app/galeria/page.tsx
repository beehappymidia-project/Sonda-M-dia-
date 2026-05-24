import { prisma } from '@/lib/db'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Galeria',
  description: 'Fotoensaios e galerias de imagens do SONDA MÍDIA.',
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
      <div style={{ background: 'var(--carvao)', borderBottom: '1px solid var(--cinza-3)', padding: '40px 0' }}>
        <div className="container">
          <div className="section-head">
            <div className="section-head__line" />
            <span className="section-head__title">Visual</span>
          </div>
          <h1 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', fontWeight: 900, color: 'var(--branco)', marginTop: '8px', marginBottom: '8px' }}>
            Galeria
          </h1>
          <p style={{ fontSize: '0.95rem', color: 'var(--cinza)', maxWidth: '540px' }}>
            Fotoensaios e narrativas visuais que ampliam o olhar sobre a realidade.
          </p>
        </div>
      </div>

      <div className="container" style={{ padding: '48px 24px' }}>
        {galleries.length === 0 ? (
          <p style={{ color: 'var(--cinza)', textAlign: 'center', padding: '80px 0', fontSize: '1rem' }}>
            Nenhuma galeria publicada ainda.
          </p>
        ) : (
          <div className="grid-3">
            {galleries.map(g => (
              <Link key={g.id} href={`/artigo/${g.slug}`} style={{
                display: 'block', position: 'relative', overflow: 'hidden',
                borderRadius: '6px', border: '1px solid var(--cinza-3)',
                background: 'var(--carvao)',
              }}>
                <div style={{ aspectRatio: '4/3', position: 'relative', overflow: 'hidden' }}>
                  <div className={`photo ${g.photoStyle} grain`} style={{ position: 'absolute', inset: 0 }} />
                  <div style={{
                    position: 'absolute', bottom: 0, left: 0, right: 0,
                    background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, transparent 100%)',
                    padding: '24px 16px 16px',
                  }}>
                    <p style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--branco)', lineHeight: 1.3 }}>
                      {g.title}
                    </p>
                    <p style={{ fontSize: '0.72rem', color: 'var(--ouro)', marginTop: '4px' }}>
                      Por {g.author.name}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
