import { prisma } from '@/lib/db'
import Link from 'next/link'
import AdZone from '@/components/AdZone'
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
      <div style={{ background: 'var(--carvao)', borderBottom: '1px solid var(--cinza-3)', padding: '40px 0' }}>
        <div className="container">
          <div className="section-head">
            <div className="section-head__line" />
            <span className="section-head__title">Redacção</span>
          </div>
          <h1 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', fontWeight: 900, color: 'var(--branco)', marginTop: '8px' }}>
            Os Nossos Jornalistas
          </h1>
        </div>
      </div>

      <div className="container" style={{ padding: '48px 24px' }}>
        <div className="grid-3">
          {authors.map(author => (
            <Link key={author.id} href={`/autor/${author.slug}`} style={{
              display: 'block', textDecoration: 'none',
            }}>
              <div style={{
                padding: '28px', background: 'var(--carvao)',
                border: '1px solid var(--cinza-3)', borderRadius: '6px',
                transition: 'border-color 0.2s',
              }}>
                <div style={{
                  width: '64px', height: '64px', borderRadius: '50%',
                  background: 'var(--ouro)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '1.5rem', fontWeight: 900, color: 'var(--preto)',
                  marginBottom: '16px',
                }}>
                  {author.name.charAt(0)}
                </div>
                <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--branco)', marginBottom: '4px' }}>
                  {author.name}
                </h3>
                <p style={{ fontSize: '0.78rem', color: 'var(--ouro)', marginBottom: '12px' }}>{author.role}</p>
                <p style={{ fontSize: '0.82rem', color: 'var(--cinza)', lineHeight: 1.6, marginBottom: '16px' }}>
                  {author.bio.substring(0, 120)}...
                </p>
                <span style={{ fontSize: '0.72rem', color: 'var(--cinza-2)' }}>
                  {author._count.articles} artigos publicados
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <AdZone />
    </div>
  )
}
