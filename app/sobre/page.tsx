import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Sobre',
  description: 'Conheça o SONDA MÍDIA, projeto de jornalismo investigativo independente.',
}

export default function SobrePage() {
  return (
    <div>
      {/* Hero */}
      <div style={{ background: '#0d0d0d', borderBottom: '1px solid #1a1a1a', padding: '64px 0' }}>
        <div className="container" style={{ maxWidth: '760px' }}>
          <span className="section-label" style={{ fontSize: '12px' }}>Institucional</span>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '42px', fontWeight: 900, color: '#e8e8e8', marginTop: '12px', marginBottom: '20px', lineHeight: '1.2' }}>
            Sobre o SONDA MÍDIA
          </h1>
          <p style={{ fontSize: '18px', color: '#888', lineHeight: '1.75' }}>
            O SONDA MÍDIA é um veículo de jornalismo investigativo independente dedicado a coberturas de profundidade sobre poder, sociedade e cultura no Brasil.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="container" style={{ padding: '64px 24px', maxWidth: '760px' }}>
        <section style={{ marginBottom: '64px' }}>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '28px', fontWeight: 700, color: '#e0e0e0', marginBottom: '20px' }}>
            Nossa Missão
          </h2>
          <div style={{ fontSize: '16px', color: '#888', lineHeight: '1.85' }}>
            <p style={{ marginBottom: '20px' }}>
              Acreditamos que o jornalismo de qualidade é um serviço público essencial. Em um ambiente de desinformação crescente, o SONDA MÍDIA aposta em reportagens documentadas, narrativas de fôlego e análises criteriosas que ajudam o leitor a compreender o mundo em que vive.
            </p>
            <p style={{ marginBottom: '20px' }}>
              Nosso trabalho cobre investigações sobre corrupção e poder, documentários sobre questões sociais urgentes, análises econômicas e políticas, produções culturais e entrevistas com protagonistas de cada área.
            </p>
            <p>
              Somos independentes editorialmente e não aceitamos pressões de anunciantes ou grupos políticos. Nossa sustentabilidade vem do engajamento dos nossos leitores.
            </p>
          </div>
        </section>

        <section style={{ marginBottom: '64px', padding: '40px', background: '#111', borderRadius: '4px', border: '1px solid #1a1a1a' }}>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '24px', fontWeight: 700, color: '#e0e0e0', marginBottom: '24px' }}>
            Nossos Valores
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
            {[
              { title: 'Independência', desc: 'Não somos afiliados a partidos, grupos empresariais ou governos. Nossa lealdade é com a verdade.' },
              { title: 'Rigor', desc: 'Múltiplas fontes, documentos, dados verificados. Publicamos quando temos certeza.' },
              { title: 'Transparência', desc: 'Exibimos nossas metodologias, corrigimos erros publicamente e identificamos todas as fontes que podem ser reveladas.' },
              { title: 'Impacto', desc: 'Buscamos histórias que provoquem mudança. Jornalismo que mobiliza e informa a sociedade.' },
            ].map(v => (
              <div key={v.title}>
                <h3 style={{ fontSize: '14px', fontWeight: 700, color: '#c9a84c', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '8px' }}>
                  {v.title}
                </h3>
                <p style={{ fontSize: '14px', color: '#777', lineHeight: '1.65' }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="contato" style={{ marginBottom: '64px' }}>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '28px', fontWeight: 700, color: '#e0e0e0', marginBottom: '20px' }}>
            Contato
          </h2>
          <div style={{ fontSize: '15px', color: '#888', lineHeight: '1.85' }}>
            <p style={{ marginBottom: '12px' }}>
              <strong style={{ color: '#aaa' }}>Redação:</strong>{' '}
              <a href="mailto:redacao@sondamidia.com.br" style={{ color: '#c9a84c' }}>redacao@sondamidia.com.br</a>
            </p>
            <p style={{ marginBottom: '12px' }}>
              <strong style={{ color: '#aaa' }}>Pauta e denúncias:</strong>{' '}
              <a href="mailto:pauta@sondamidia.com.br" style={{ color: '#c9a84c' }}>pauta@sondamidia.com.br</a>
            </p>
            <p style={{ marginBottom: '12px' }}>
              <strong style={{ color: '#aaa' }}>Comercial:</strong>{' '}
              <a href="mailto:comercial@sondamidia.com.br" style={{ color: '#c9a84c' }}>comercial@sondamidia.com.br</a>
            </p>
            <p style={{ marginBottom: '24px' }}>
              <strong style={{ color: '#aaa' }}>Canal seguro (Signal):</strong>{' '}
              <span>+55 11 9XXXX-XXXX</span>
            </p>
            <Link href="/mediakit" style={{
              display: 'inline-block',
              background: '#c9a84c',
              color: '#0a0a0a',
              fontSize: '13px', fontWeight: 700,
              letterSpacing: '0.08em', textTransform: 'uppercase',
              padding: '12px 24px', borderRadius: '2px',
            }}>
              Ver Media Kit
            </Link>
          </div>
        </section>

        <section>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '28px', fontWeight: 700, color: '#e0e0e0', marginBottom: '20px' }}>
            Política Editorial
          </h2>
          <div style={{ fontSize: '15px', color: '#777', lineHeight: '1.85' }}>
            <p style={{ marginBottom: '20px' }}>
              Seguimos os princípios do jornalismo ético conforme o Código de Ética dos Jornalistas Brasileiros. Identificamos claramente conteúdo jornalístico, opiniões e materiais patrocinados.
            </p>
            <p>
              Correções são publicadas com destaque. Reclamações editoriais devem ser enviadas para a ouvidoria em{' '}
              <a href="mailto:ouvidoria@sondamidia.com.br" style={{ color: '#c9a84c' }}>ouvidoria@sondamidia.com.br</a>.
            </p>
          </div>
        </section>
      </div>
    </div>
  )
}
