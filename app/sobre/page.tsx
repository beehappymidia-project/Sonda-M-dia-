import type { Metadata } from 'next'
import { prisma } from '@/lib/db'
import AdZone from '@/components/AdZone'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Sobre',
  description: 'Mais fundo que a notícia. Conheça a SONDA MÍDIA, plataforma de jornalismo investigativo de Moçambique.',
}

const VALUES = [
  { title: 'Independência', desc: 'Não somos afiliados a partidos, grupos empresariais ou governos. A nossa lealdade é com a verdade e com os cidadãos.' },
  { title: 'Rigor', desc: 'Múltiplas fontes, documentos verificados, dados cruzados. Publicamos quando temos a certeza.' },
  { title: 'Transparência', desc: 'Exibimos as nossas metodologias, corrigimos erros publicamente e identificamos todas as fontes que podem ser reveladas.' },
  { title: 'Impacto', desc: 'Procuramos histórias que provoquem mudança. Jornalismo que mobiliza, informa e serve a sociedade moçambicana.' },
]

const PRINCIPLES = [
  { num: '01', title: 'Profundidade antes da rapidez', desc: 'Não competimos com os feeds de notícias instantâneas. Somos o antídoto ao ruído — a análise que vale a pena esperar.' },
  { num: '02', title: 'Servir o público, não o poder', desc: 'As nossas histórias nunca são filtradas pelos interesses dos anunciantes, dos partidos ou dos governos.' },
  { num: '03', title: 'O campo como laboratório', desc: 'Os nossos jornalistas estão nas comunidades, nos arquivos, nas tribunas — não apenas nas caixas de email das assessorias.' },
  { num: '04', title: 'Sustentabilidade ética', desc: 'O nosso modelo de negócio baseia-se nos leitores e em parceiros que respeitam a nossa independência editorial.' },
]

export const revalidate = 3600

export default async function SobrePage() {
  const authors = await prisma.author.findMany({
    include: { _count: { select: { articles: true } } },
    orderBy: { name: 'asc' },
  })

  return (
    <div>
      {/* Hero */}
      <div style={{ background: 'var(--carvao)', borderBottom: '1px solid var(--cinza-3)', padding: '80px 0', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', opacity: 0.04, pointerEvents: 'none' }}>
          <svg width="500" height="500" viewBox="0 0 32 32" fill="none">
            <circle cx="16" cy="16" r="14" stroke="#FFB703" strokeWidth="0.5" />
            <circle cx="16" cy="16" r="9" stroke="#FFB703" strokeWidth="0.5" />
            <circle cx="16" cy="16" r="4" stroke="#FFB703" strokeWidth="0.5" />
            <path d="M16 16 L25.9 10.5" stroke="#FFB703" strokeWidth="0.5" />
          </svg>
        </div>
        <div className="container" style={{ maxWidth: '800px', position: 'relative', zIndex: 1 }}>
          <span style={{ fontSize: '0.62rem', fontWeight: 900, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--ouro)', display: 'block', marginBottom: '20px' }}>
            Sobre nós
          </span>
          <h1 style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', fontWeight: 900, color: 'var(--branco)', marginBottom: '20px', lineHeight: 1.1 }}>
            Mais fundo<br /><span style={{ color: 'var(--ouro)' }}>que a notícia.</span>
          </h1>
          <p style={{ fontSize: '1.1rem', color: 'var(--cinza)', lineHeight: 1.75, maxWidth: '600px', margin: '0 auto' }}>
            A SONDA MÍDIA é uma plataforma de jornalismo investigativo independente de Moçambique, dedicada a coberturas de profundidade sobre poder, sociedade, economia e cultura.
          </p>
        </div>
      </div>

      {/* Mission + Values */}
      <section style={{ padding: '72px 0', borderBottom: '1px solid var(--cinza-3)' }}>
        <div className="container">
          <div className="grid-2" style={{ gap: '64px', alignItems: 'start' }}>
            <div>
              <div className="section-head" style={{ marginBottom: '16px' }}>
                <div className="section-head__line" />
                <span className="section-head__title">Missão</span>
              </div>
              <div className="article-body">
                <p>Acreditamos que o jornalismo de qualidade é um serviço público essencial. Num ambiente de desinformação crescente, a SONDA MÍDIA aposta em reportagens documentadas, narrativas de fôlego e análises criteriosas que ajudam o cidadão moçambicano a compreender o mundo em que vive.</p>
                <p>O nosso trabalho cobre investigações sobre corrupção e poder, documentários sobre questões sociais urgentes, análises económicas e geopolíticas, e a cobertura das comunidades que raramente aparecem nas notícias de mainstream.</p>
                <p>Somos independentes editorialmente. Não aceitamos pressões de anunciantes ou grupos políticos. A nossa sustentabilidade vem do engajamento dos nossos leitores e de parceiros que respeitam essa independência.</p>
              </div>
            </div>
            <div>
              <div className="section-head" style={{ marginBottom: '16px' }}>
                <div className="section-head__line" />
                <span className="section-head__title">Valores</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {VALUES.map(v => (
                  <div key={v.title} style={{ padding: '18px 20px', background: 'var(--carvao)', borderRadius: '4px', border: '1px solid var(--cinza-3)', borderLeft: '3px solid var(--ouro)' }}>
                    <h3 style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--ouro)', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{v.title}</h3>
                    <p style={{ fontSize: '0.85rem', color: 'var(--cinza)', lineHeight: 1.65 }}>{v.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4 Principles */}
      <section style={{ padding: '72px 0', background: 'var(--carvao-2)', borderBottom: '1px solid var(--cinza-3)' }}>
        <div className="container">
          <div className="grid-4">
            {PRINCIPLES.map(p => (
              <div key={p.num} style={{ textAlign: 'center', padding: '24px' }}>
                <div style={{ fontSize: '2.5rem', fontWeight: 900, color: 'var(--cinza-3)', marginBottom: '12px' }}>{p.num}</div>
                <h3 style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--branco)', marginBottom: '12px', lineHeight: 1.3 }}>{p.title}</h3>
                <p style={{ fontSize: '0.82rem', color: 'var(--cinza)', lineHeight: 1.65 }}>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Grid */}
      <section style={{ padding: '72px 0', borderBottom: '1px solid var(--cinza-3)' }}>
        <div className="container">
          <div className="section-head" style={{ marginBottom: '40px' }}>
            <div className="section-head__line" />
            <span className="section-head__title">A Nossa Equipa</span>
          </div>
          <div className="grid-4">
            {authors.map(author => (
              <Link key={author.id} href={`/autor/${author.slug}`} style={{ display: 'block', textAlign: 'center' }}>
                <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'var(--ouro)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.8rem', fontWeight: 900, color: 'var(--preto)', margin: '0 auto 12px' }}>
                  {author.name.charAt(0)}
                </div>
                <h3 style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--branco)', marginBottom: '4px' }}>{author.name}</h3>
                <p style={{ fontSize: '0.72rem', color: 'var(--ouro)', marginBottom: '4px' }}>{author.role}</p>
                <p style={{ fontSize: '0.7rem', color: 'var(--cinza)' }}>{author._count.articles} artigos</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contato" style={{ padding: '72px 0', background: 'var(--carvao)', borderBottom: '1px solid var(--cinza-3)' }}>
        <div className="container container--narrow">
          <div className="section-head" style={{ marginBottom: '28px' }}>
            <div className="section-head__line" />
            <span className="section-head__title">Contacto</span>
          </div>
          <div className="grid-2">
            <div>
              <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--branco)', marginBottom: '20px' }}>Fale connosco</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {[
                  { label: 'Redação', email: 'redacao@sondamidia.co.mz' },
                  { label: 'Pauta e denúncias', email: 'pauta@sondamidia.co.mz' },
                  { label: 'Comercial', email: 'comercial@sondamidia.co.mz' },
                  { label: 'Ouvidoria', email: 'ouvidoria@sondamidia.co.mz' },
                ].map(c => (
                  <div key={c.label}>
                    <span style={{ fontSize: '0.68rem', fontWeight: 700, color: 'var(--cinza)', textTransform: 'uppercase', letterSpacing: '0.06em', display: 'block', marginBottom: '2px' }}>{c.label}</span>
                    <a href={`mailto:${c.email}`} style={{ fontSize: '0.88rem', color: 'var(--ouro)', fontWeight: 600 }}>{c.email}</a>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--branco)', marginBottom: '20px' }}>Localização</h2>
              <div style={{ fontSize: '0.88rem', color: 'var(--cinza)', lineHeight: 1.8 }}>
                <p style={{ fontWeight: 700, color: 'var(--branco)', marginBottom: '4px' }}>SONDA MÍDIA</p>
                <p>Av. 25 de Setembro, 1234</p>
                <p>Maputo, Moçambique</p>
                <p style={{ marginTop: '12px' }}>
                  <span style={{ fontWeight: 700, color: 'var(--branco)' }}>Canal seguro (Signal): </span>
                  +258 84 000 0000
                </p>
              </div>
              <Link href="/mediakit" className="btn btn--gold" style={{ marginTop: '24px', display: 'inline-block' }}>
                Ver Media Kit
              </Link>
            </div>
          </div>
        </div>
      </section>

      <AdZone />
    </div>
  )
}
