import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Sobre',
  description: 'Conheça o SONDA MÍDIA, projecto de jornalismo investigativo independente de Moçambique.',
}

export default function SobrePage() {
  return (
    <div>
      {/* Hero */}
      <div style={{ background: 'var(--carvao)', borderBottom: '1px solid var(--cinza-3)', padding: '64px 0' }}>
        <div className="container container--narrow">
          <div className="section-head">
            <div className="section-head__line" />
            <span className="section-head__title">Institucional</span>
          </div>
          <h1 style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)', fontWeight: 900, color: 'var(--branco)', marginTop: '12px', marginBottom: '20px', lineHeight: 1.15 }}>
            Sobre o SONDA MÍDIA
          </h1>
          <p style={{ fontSize: '1.05rem', color: 'var(--cinza)', lineHeight: 1.75 }}>
            O SONDA MÍDIA é um veículo de jornalismo investigativo independente dedicado a coberturas de profundidade sobre poder, sociedade e economia em Moçambique.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="container container--narrow" style={{ padding: '64px 24px' }}>
        <section style={{ marginBottom: '64px' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--branco)', marginBottom: '20px' }}>
            A Nossa Missão
          </h2>
          <div style={{ fontSize: '0.95rem', color: 'var(--cinza)', lineHeight: 1.85 }}>
            <p style={{ marginBottom: '20px' }}>
              Acreditamos que o jornalismo de qualidade é um serviço público essencial. Num ambiente de desinformação crescente, o SONDA MÍDIA aposta em reportagens documentadas, narrativas de fôlego e análises criteriosas que ajudam o leitor a compreender o mundo em que vive.
            </p>
            <p style={{ marginBottom: '20px' }}>
              O nosso trabalho cobre investigações sobre corrupção e poder, documentários sobre questões sociais urgentes, análises económicas e políticas, produções culturais e entrevistas com protagonistas de cada área.
            </p>
            <p>
              Somos independentes editorialmente e não aceitamos pressões de anunciantes ou grupos políticos. A nossa sustentabilidade vem do envolvimento dos nossos leitores.
            </p>
          </div>
        </section>

        <section style={{ marginBottom: '64px', padding: '40px', background: 'var(--carvao)', borderRadius: '6px', border: '1px solid var(--cinza-3)' }}>
          <h2 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--branco)', marginBottom: '24px' }}>
            Os Nossos Valores
          </h2>
          <div className="grid-2">
            {[
              { title: 'Independência', desc: 'Não somos afiliados a partidos, grupos empresariais ou governos. A nossa lealdade é com a verdade.' },
              { title: 'Rigor', desc: 'Múltiplas fontes, documentos, dados verificados. Publicamos quando temos certeza.' },
              { title: 'Transparência', desc: 'Exibimos as nossas metodologias, corrigimos erros publicamente e identificamos todas as fontes que podem ser reveladas.' },
              { title: 'Impacto', desc: 'Buscamos histórias que provoquem mudança. Jornalismo que mobiliza e informa a sociedade.' },
            ].map(v => (
              <div key={v.title}>
                <h3 style={{ fontSize: '0.72rem', fontWeight: 900, color: 'var(--ouro)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '8px' }}>
                  {v.title}
                </h3>
                <p style={{ fontSize: '0.88rem', color: 'var(--cinza)', lineHeight: 1.65 }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="contato" style={{ marginBottom: '64px' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--branco)', marginBottom: '20px' }}>
            Contacto
          </h2>
          <div style={{ fontSize: '0.95rem', color: 'var(--cinza)', lineHeight: 1.85 }}>
            <p style={{ marginBottom: '12px' }}>
              <strong style={{ color: 'var(--branco)' }}>Redacção:</strong>{' '}
              <a href="mailto:redacao@sondamidia.co.mz" style={{ color: 'var(--ouro)' }}>redacao@sondamidia.co.mz</a>
            </p>
            <p style={{ marginBottom: '12px' }}>
              <strong style={{ color: 'var(--branco)' }}>Pauta e denúncias:</strong>{' '}
              <a href="mailto:pauta@sondamidia.co.mz" style={{ color: 'var(--ouro)' }}>pauta@sondamidia.co.mz</a>
            </p>
            <p style={{ marginBottom: '12px' }}>
              <strong style={{ color: 'var(--branco)' }}>Comercial:</strong>{' '}
              <a href="mailto:comercial@sondamidia.co.mz" style={{ color: 'var(--ouro)' }}>comercial@sondamidia.co.mz</a>
            </p>
            <p style={{ marginBottom: '24px' }}>
              <strong style={{ color: 'var(--branco)' }}>Canal seguro (Signal):</strong>{' '}
              <span>+258 8X XXX XXXX</span>
            </p>
            <Link href="/mediakit" className="btn btn--gold">
              Ver Media Kit
            </Link>
          </div>
        </section>

        <section id="politica" style={{ marginBottom: '64px' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--branco)', marginBottom: '20px' }}>
            Política Editorial
          </h2>
          <div style={{ fontSize: '0.95rem', color: 'var(--cinza)', lineHeight: 1.85 }}>
            <p style={{ marginBottom: '20px' }}>
              Seguimos os princípios do jornalismo ético. Identificamos claramente conteúdo jornalístico, opiniões e materiais patrocinados.
            </p>
            <p>
              Correcções são publicadas com destaque. Reclamações editoriais devem ser enviadas para a ouvidoria em{' '}
              <a href="mailto:ouvidoria@sondamidia.co.mz" style={{ color: 'var(--ouro)' }}>ouvidoria@sondamidia.co.mz</a>.
            </p>
          </div>
        </section>

        <section id="privacidade">
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--branco)', marginBottom: '20px' }}>
            Privacidade
          </h2>
          <p style={{ fontSize: '0.95rem', color: 'var(--cinza)', lineHeight: 1.85 }}>
            Recolhemos apenas os dados necessários para o funcionamento dos nossos serviços. Não partilhamos dados pessoais com terceiros para fins comerciais. Para cancelar a newsletter, utilize o link de cancelamento no rodapé de cada e-mail.
          </p>
        </section>
      </div>
    </div>
  )
}
