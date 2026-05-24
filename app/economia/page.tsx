import { prisma } from '@/lib/db'
import ArticleCard from '@/components/ArticleCard'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Economia',
  description: 'Análise económica de Moçambique — gás, inflação, investimento e mercados.',
}

export const revalidate = 60

export default async function EconomiaPage() {
  const articles = await prisma.article.findMany({
    where: { section: 'Economia' },
    include: { author: true },
    orderBy: { publishedAt: 'desc' },
  })

  const hero = articles[0]
  const rest = articles.slice(1)

  return (
    <div>
      <div style={{ background: 'var(--carvao)', borderBottom: '1px solid var(--cinza-3)', padding: '40px 0' }}>
        <div className="container">
          <div className="section-head">
            <div className="section-head__line" />
            <span className="section-head__title">Economia</span>
          </div>
          <h1 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', fontWeight: 900, color: 'var(--branco)', marginTop: '8px', marginBottom: '8px' }}>
            Economia & Finanças
          </h1>
          <p style={{ fontSize: '0.95rem', color: 'var(--cinza)', maxWidth: '540px' }}>
            Gás natural, inflação, mercados, investimento e o desenvolvimento económico de Moçambique.
          </p>
        </div>
      </div>

      <div className="container" style={{ padding: '48px 24px' }}>
        {articles.length === 0 ? (
          <p style={{ color: 'var(--cinza)', textAlign: 'center', padding: '80px 0', fontSize: '1rem' }}>
            Nenhum artigo publicado nesta secção ainda.
          </p>
        ) : (
          <>
            {hero && (
              <div style={{ marginBottom: '48px' }}>
                <ArticleCard article={hero as any} size="large" />
              </div>
            )}
            {rest.length > 0 && (
              <div className="grid-3">
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
