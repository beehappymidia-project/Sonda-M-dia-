import type { Metadata } from 'next'
import Link from 'next/link'
import AdZone from '@/components/AdZone'

export const metadata: Metadata = {
  title: 'Media Kit',
  description: 'Informações sobre audiência, formatos e oportunidades de parceria com o SONDA MÍDIA.',
}

const STATS = [
  { label: 'Visitantes únicos/mês', value: '85 mil+' },
  { label: 'Assinantes da newsletter', value: '18 mil' },
  { label: 'Seguidores nas redes', value: '52 mil' },
  { label: 'Tempo médio na página', value: '5 min 20s' },
]

const FORMATS = [
  { title: 'Branded Content', desc: 'Conteúdo editorial patrocinado produzido com o nosso padrão jornalístico, claramente identificado como parceria.', price: 'A partir de MZN 60.000' },
  { title: 'Sponsored Newsletter', desc: 'A sua mensagem inserida na newsletter semanal enviada a 18 mil assinantes qualificados.', price: 'A partir de MZN 25.000/edição' },
  { title: 'Patrocínio de Podcast', desc: 'Menção e spot no início/meio de episódios do nosso podcast, com público altamente envolvido.', price: 'A partir de MZN 30.000/episódio' },
  { title: 'Display Digital', desc: 'Posicionamentos de display em páginas de alta visibilidade, com segmentação por editorial.', price: 'CPM a partir de MZN 300' },
  { title: 'Eventos e Lives', desc: 'Patrocínio de eventos editoriais, debates e transmissões ao vivo com jornalistas e especialistas.', price: 'Sob consulta' },
  { title: 'Relatórios Especiais', desc: 'Reports aprofundados sobre temas específicos com distribuição exclusiva para assinantes e parceiros.', price: 'Sob consulta' },
]

export default function MediaKitPage() {
  return (
    <div>
      {/* Hero */}
      <div style={{ background: 'var(--carvao)', borderBottom: '1px solid var(--cinza-3)', padding: '80px 0' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <img src="/logo.jpg" alt="SONDA MÍDIA" style={{ height: '56px', width: 'auto', margin: '0 auto 32px', display: 'block' }} />
          <h1 style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)', fontWeight: 900, color: 'var(--branco)', marginBottom: '16px', lineHeight: 1.15 }}>
            Media Kit 2025
          </h1>
          <p style={{ fontSize: '1rem', color: 'var(--cinza)', lineHeight: 1.7, maxWidth: '540px', margin: '0 auto 32px' }}>
            Alcance uma audiência qualificada de leitores envolvidos com jornalismo investigativo de qualidade.
          </p>
          <a href="mailto:comercial@sondamidia.co.mz" className="btn btn--gold">
            Falar com Comercial
          </a>
        </div>
      </div>

      {/* Stats */}
      <div className="stats-bar" style={{ margin: '0', borderRadius: '0', border: 'none', borderBottom: '1px solid var(--cinza-3)', borderTop: '1px solid var(--cinza-3)' }}>
        {STATS.map(s => (
          <div key={s.label} className="stats-bar__item">
            <span className="stats-bar__num">{s.value}</span>
            <span className="stats-bar__label">{s.label}</span>
          </div>
        ))}
      </div>

      {/* Audience */}
      <div style={{ padding: '64px 0', borderBottom: '1px solid var(--cinza-3)' }}>
        <div className="container">
          <div className="grid-2" style={{ alignItems: 'center' }}>
            <div>
              <div className="section-head">
                <div className="section-head__line" />
                <span className="section-head__title">Audiência</span>
              </div>
              <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--branco)', marginTop: '8px', marginBottom: '20px' }}>
                Quem lê o SONDA MÍDIA
              </h2>
              <p style={{ fontSize: '0.9rem', color: 'var(--cinza)', lineHeight: 1.8, marginBottom: '24px' }}>
                A nossa audiência é formada por profissionais qualificados: jornalistas, advogados, professores, gestores públicos e empresários que buscam informação aprofundada e confiável sobre Moçambique.
              </p>
              <div className="grid-2">
                {[
                  { label: 'Ensino superior', pct: '72%' },
                  { label: 'Classe média e alta', pct: '58%' },
                  { label: '25–44 anos', pct: '61%' },
                  { label: 'Maputo e Matola', pct: '54%' },
                ].map(d => (
                  <div key={d.label} style={{ padding: '16px', background: 'var(--carvao)', borderRadius: '4px', border: '1px solid var(--cinza-3)' }}>
                    <div style={{ fontSize: '1.5rem', fontWeight: 900, color: 'var(--ouro)', marginBottom: '4px' }}>{d.pct}</div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--cinza)' }}>{d.label}</div>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ padding: '32px', background: 'var(--carvao)', borderRadius: '6px', border: '1px solid var(--cinza-3)' }}>
              <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--branco)', marginBottom: '20px' }}>
                Distribuição por editorial
              </h3>
              {[
                { label: 'Investigação', pct: 35 },
                { label: 'Política & Economia', pct: 30 },
                { label: 'Internacional', pct: 18 },
                { label: 'Multimédia', pct: 12 },
                { label: 'Outros', pct: 5 },
              ].map(d => (
                <div key={d.label} style={{ marginBottom: '14px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                    <span style={{ fontSize: '0.82rem', color: 'var(--cinza)' }}>{d.label}</span>
                    <span style={{ fontSize: '0.82rem', color: 'var(--ouro)', fontWeight: 700 }}>{d.pct}%</span>
                  </div>
                  <div style={{ height: '4px', background: 'var(--cinza-3)', borderRadius: '2px' }}>
                    <div style={{ height: '100%', width: `${d.pct}%`, background: 'var(--ouro)', borderRadius: '2px' }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Formats */}
      <div style={{ padding: '64px 0', background: 'var(--carvao-2)', borderBottom: '1px solid var(--cinza-3)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <div className="section-head" style={{ justifyContent: 'center' }}>
              <div className="section-head__line" />
              <span className="section-head__title">Parceria</span>
              <div className="section-head__line" />
            </div>
            <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--branco)', marginTop: '8px' }}>
              Formatos Disponíveis
            </h2>
          </div>
          <div className="grid-3">
            {FORMATS.map(f => (
              <div key={f.title} style={{ padding: '28px', background: 'var(--carvao)', borderRadius: '6px', border: '1px solid var(--cinza-3)' }}>
                <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--branco)', marginBottom: '12px' }}>{f.title}</h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--cinza)', lineHeight: 1.65, marginBottom: '20px' }}>{f.desc}</p>
                <p style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--ouro)' }}>{f.price}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div style={{ padding: '80px 0', textAlign: 'center' }}>
        <div className="container container--narrow">
          <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--branco)', marginBottom: '16px' }}>
            Pronto para alcançar a nossa audiência?
          </h2>
          <p style={{ fontSize: '0.95rem', color: 'var(--cinza)', marginBottom: '32px' }}>
            A nossa equipa comercial está disponível para apresentar propostas personalizadas.
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="mailto:comercial@sondamidia.co.mz" className="btn btn--gold">
              Enviar Proposta
            </a>
            <Link href="/sobre#contato" className="btn btn--outline">
              Mais Informações
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
