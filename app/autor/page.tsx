import { prisma } from '@/lib/db'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Autores',
  description: 'Conheça os jornalistas e colaboradores do SONDA MÍDIA.',
}

export const revalidate = 60

export default async function AutoresPage() {
  const authors = await prisma.author.findMany({
    include: { _count: { select: { articles: true } } },
    orderBy: { name: 'asc' },
  })

  return (
    <div>
      <div style={{ background: '#0d0d0d', borderBottom: '1px solid #1a1a1a', padding: '40px 0' }}>
        <div className="container">
          <span className="section-label" style={{ fontSize: '12px' }}>Redação</span>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '36px', fontWeight: 900, color: '#e8e8e8', marginTop: '8px' }}>
            Nossos Jornalistas
          </h1>
        </div>
      </div>

      <div className="container" style={{ padding: '48px 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '28px' }}>
          {authors.map(author => (
            <Link key={author.id} href={`/autor/${author.slug}`} style={{
              display: 'block',
              padding: '28px',
              background: '#111',
              border: '1px solid #1a1a1a',
              borderRadius: '4px',
              transition: 'border-color 0.2s',
            }}>
              <div style={{
                width: '64px', height: '64px', borderRadius: '50%',
                background: 'linear-gradient(135deg, #c9a84c, #6b4a10)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '24px', fontWeight: 700, color: '#fff',
                marginBottom: '16px',
              }}>
                {author.name.charAt(0)}
              </div>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '18px', fontWeight: 700, color: '#e0e0e0', marginBottom: '4px' }}>
                {author.name}
              </h3>
              <p style={{ fontSize: '13px', color: '#c9a84c', marginBottom: '12px' }}>{author.role}</p>
              <p style={{ fontSize: '13px', color: '#666', lineHeight: '1.6', marginBottom: '16px' }}>
                {author.bio.substring(0, 120)}...
              </p>
              <span style={{ fontSize: '12px', color: '#555' }}>
                {author._count.articles} artigos publicados
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
