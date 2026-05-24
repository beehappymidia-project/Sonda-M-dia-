import { prisma } from '@/lib/db'
import ArticleCard from '@/components/ArticleCard'
import AdZone from '@/components/AdZone'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Investigação',
  description: 'Reportagens investigativas de profundidade — corrupção, poder e sociedade.',
}

export const revalidate = 60

export default async function InvestigacaoPage() {
  const articles = await prisma.article.findMany({
    where: { section: 'Investigação' },
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
            <span className="section-head__title">Jornalismo de Profundidade</span>
          </div>
          <h1 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', fontWeight: 900, color: 'var(--branco)', marginTop: '8px', marginBottom: '8px' }}>
            Investigação
          </h1>
          <p style={{ fontSize: '0.95rem', color: 'var(--cinza)', maxWidth: '540px' }}>
            Reportagens de fôlego, baseadas em documentos, fontes e dados. Jornalismo que cobra tempo e rigor.
          </p>
        </div>
      </div>

      <div className="container" style={{ padding: '48px 24px' }}>
        {articles.length === 0 ? (
          <p style={{ color: 'var(--cinza)', textAlign: 'center', padding: '80px 0', fontSize: '1rem' }}>
            Nenhuma investigação publicada ainda.
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
      <AdZone />
    </div>
  )
}
