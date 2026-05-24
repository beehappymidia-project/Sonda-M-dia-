import { prisma } from '@/lib/db'
import ArticleCard from '@/components/ArticleCard'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Opinião',
  description: 'Análises, colunas e perspectivas dos colunistas do SONDA MÍDIA.',
}

export const revalidate = 60

export default async function OpiniaoPage() {
  const articles = await prisma.article.findMany({
    where: { isOpinion: true },
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
            <span className="section-head__title">Colunistas & Análise</span>
          </div>
          <h1 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', fontWeight: 900, color: 'var(--branco)', marginTop: '8px', marginBottom: '8px' }}>
            Opinião
          </h1>
          <p style={{ fontSize: '0.95rem', color: 'var(--cinza)', maxWidth: '540px' }}>
            Análises críticas, colunas e perspectivas editoriais sobre os temas que moldam o debate público.
          </p>
        </div>
      </div>

      <div className="container" style={{ padding: '48px 24px' }}>
        {articles.length === 0 ? (
          <p style={{ color: 'var(--cinza)', textAlign: 'center', padding: '80px 0', fontSize: '1rem' }}>
            Nenhuma coluna publicada ainda.
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
                  <div key={a.id} style={{ borderTop: '3px solid var(--ouro)', paddingTop: '20px' }}>
                    <ArticleCard article={a as any} size="small" />
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
