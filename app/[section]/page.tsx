import { prisma } from '@/lib/db'
import ArticleCard from '@/components/ArticleCard'
import AdZone from '@/components/AdZone'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'

const SECTION_MAP: Record<string, { title: string; subtitle: string; dbSection: string }> = {
  politica: { title: 'Política', subtitle: 'Cobertura política nacional e regional. O poder, as instituições e os cidadãos.', dbSection: 'Política' },
  economia: { title: 'Economia', subtitle: 'Análises económicas, mercados, recursos e desenvolvimento em Moçambique.', dbSection: 'Economia' },
  sociedade: { title: 'Sociedade', subtitle: 'Questões sociais, saúde, educação, direitos e comunidades moçambicanas.', dbSection: 'Sociedade' },
  internacional: { title: 'Internacional', subtitle: 'Geopolítica africana, diplomacia, conflitos e relações internacionais.', dbSection: 'Internacional' },
  investigacao: { title: 'Investigação', subtitle: 'Jornalismo de profundidade. Dossiês, investigações e reportagens especiais.', dbSection: 'Investigação' },
  'multim%C3%A9dia': { title: 'Multimédia', subtitle: 'Documentários, galerias, podcasts e conteúdo audiovisual.', dbSection: 'Multimédia' },
  multimidia: { title: 'Multimédia', subtitle: 'Documentários, galerias, podcasts e conteúdo audiovisual.', dbSection: 'Multimédia' },
  opiniao: { title: 'Opinião', subtitle: 'Colunas, análises e perspectivas dos nossos colaboradores.', dbSection: 'Opinião' },
}

interface Props {
  params: { section: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const s = SECTION_MAP[params.section.toLowerCase()]
  if (!s) return { title: 'Secção' }
  return { title: s.title, description: s.subtitle }
}

export const revalidate = 60

export default async function SectionPage({ params }: Props) {
  const key = decodeURIComponent(params.section).toLowerCase()
  const s = SECTION_MAP[key] || SECTION_MAP[params.section.toLowerCase()]
  if (!s) notFound()

  const articles = await prisma.article.findMany({
    where: { section: s.dbSection },
    include: { author: true },
    orderBy: { publishedAt: 'desc' },
  })

  const hero = articles[0]
  const sidebar = articles.slice(1, 4)
  const rest = articles.slice(4)

  const mostRead = [...articles].sort(() => Math.random() - 0.5).slice(0, 5)

  return (
    <div>
      {/* Section Header */}
      <div style={{ background: 'var(--carvao)', borderBottom: '1px solid var(--cinza-3)', padding: '48px 0' }}>
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
            <div style={{ height: '2px', width: '32px', background: 'var(--ouro)' }} />
            <span style={{ fontSize: '0.68rem', fontWeight: 900, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--ouro)' }}>Secção</span>
          </div>
          <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 900, color: 'var(--branco)', marginBottom: '10px' }}>
            {s.title}
          </h1>
          <p style={{ fontSize: '1rem', color: 'var(--cinza)', maxWidth: '560px', lineHeight: 1.6 }}>{s.subtitle}</p>
        </div>
      </div>

      {/* Hero Article */}
      {hero && (
        <section style={{ padding: '32px 0', background: 'var(--preto)' }}>
          <div className="container">
            <ArticleCard article={hero as any} size="large" />
          </div>
        </section>
      )}

      {/* Filter Bar */}
      <div style={{ background: 'var(--carvao-2)', borderTop: '1px solid var(--cinza-3)', borderBottom: '1px solid var(--cinza-3)', padding: '0' }}>
        <div className="container">
          <div className="filter-bar">
            <button className="filter-bar__btn active">Mais Recentes</button>
            <button className="filter-bar__btn">Mais Lidas</button>
            <button className="filter-bar__btn">Investigação</button>
            <button className="filter-bar__btn">Análise</button>
            <button className="filter-bar__btn">Opinião</button>
          </div>
        </div>
      </div>

      {/* Content + Sidebar */}
      <section style={{ padding: '40px 0', background: 'var(--preto)', borderBottom: '1px solid var(--cinza-3)' }}>
        <div className="container">
          {articles.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '80px 0', color: 'var(--cinza)' }}>
              <p style={{ fontSize: '1.1rem' }}>Nenhum artigo publicado em {s.title} ainda.</p>
            </div>
          ) : (
            <div className="grid-main">
              {/* Articles */}
              <div>
                <div className="grid-2" style={{ marginBottom: '32px' }}>
                  {(rest.length > 0 ? rest : sidebar).map(a => (
                    <ArticleCard key={a.id} article={a as any} size="medium" />
                  ))}
                </div>
              </div>

              {/* Sidebar */}
              <aside className="sidebar">
                <div className="sidebar__widget">
                  <div className="sidebar__widget-head">Mais Lidas</div>
                  <div className="sidebar__widget-body">
                    <ol className="sidebar__list">
                      {mostRead.map((a, i) => (
                        <li key={a.id}>
                          <span className="sidebar__num">{String(i + 1).padStart(2, '0')}</span>
                          <Link href={`/artigo/${a.slug}`}>{a.title}</Link>
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>

                <div className="sidebar__widget">
                  <div className="sidebar__widget-head">Newsletter</div>
                  <div className="sidebar__widget-body">
                    <p style={{ fontSize: '0.82rem', color: 'var(--cinza)', marginBottom: '14px', lineHeight: 1.6 }}>
                      Receba os melhores artigos de {s.title} na sua caixa de entrada.
                    </p>
                    <Link href="/newsletter" className="btn btn--gold" style={{ width: '100%', display: 'block', textAlign: 'center' }}>
                      Subscrever
                    </Link>
                  </div>
                </div>

                <div className="sidebar__widget">
                  <div className="sidebar__widget-head">Séries</div>
                  <div className="sidebar__widget-body">
                    <ul className="sidebar__list">
                      <li><Link href="/investigacao">Dossiê Cabo Delgado</Link></li>
                      <li><Link href="/economia">Economia do Gás</Link></li>
                      <li><Link href="/sociedade">Saúde Pública em Crise</Link></li>
                    </ul>
                  </div>
                </div>
              </aside>
            </div>
          )}
        </div>
      </section>

      <AdZone />
    </div>
  )
}
