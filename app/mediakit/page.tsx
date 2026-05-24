import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Media Kit',
  description: 'Informações sobre audiência, formatos e oportunidades de parceria com o SONDA MÍDIA.',
}

const STATS = [
  { label: 'Visitantes únicos/mês', value: '120 mil+' },
  { label: 'Assinantes da newsletter', value: '28 mil' },
  { label: 'Seguidores nas redes', value: '85 mil' },
  { label: 'Tempo médio na página', value: '6 min 40s' },
]

const FORMATS = [
  {
    title: 'Branded Content',
    desc: 'Conteúdo editorial patrocinado produzido com nosso padrão jornalístico, claramente identificado como parceria.',
    price: 'A partir de R$ 8.000',
  },
  {
    title: 'Sponsored Newsletter',
    desc: 'Sua mensagem inserida na newsletter semanal enviada a 28 mil assinantes qualificados.',
    price: 'A partir de R$ 3.500/edição',
  },
  {
    title: 'Patrocínio de Podcast',
    desc: 'Menção e spot no início/meio de episódios do Sonda Cast, com público altamente engajado.',
    price: 'A partir de R$ 4.500/episódio',
  },
  {
    title: 'Display Digital',
    desc: 'Posicionamentos de display em páginas de alta visibilidade, com segmentação por editorial.',
    price: 'CPM a partir de R$ 45',
  },
  {
    title: 'Eventos e Lives',
    desc: 'Patrocínio de eventos editoriais, debates e transmissões ao vivo com jornalistas e especialistas.',
    price: 'Sob consulta',
  },
  {
    title: 'Relatórios Especiais',
    desc: 'Reports aprofundados sobre temas específicos com distribuição exclusiva para assinantes e stakeholders.',
    price: 'Sob consulta',
  },
]

export default function MediaKitPage() {
  return (
    <div>
      {/* Hero */}
      <div style={{
        background: 'linear-gradient(135deg, #0a0a0a 0%, #111 100%)',
        borderBottom: '1px solid #1a1a1a',
        padding: '80px 0',
      }}>
        <div className="container" style={{ maxWidth: '800px', textAlign: 'center' }}>
          <img src="/logo.jpg" alt="SONDA MÍDIA" style={{ height: '56px', width: 'auto', marginBottom: '32px' }} />
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '42px', fontWeight: 900, color: '#e8e8e8', marginBottom: '16px', lineHeight: '1.2' }}>
            Media Kit 2025
          </h1>
          <p style={{ fontSize: '18px', color: '#777', lineHeight: '1.7', maxWidth: '560px', margin: '0 auto 32px' }}>
            Alcance uma audiência qualificada de leitores engajados com jornalismo investigativo de qualidade.
          </p>
          <a href="mailto:comercial@sondamidia.com.br" style={{
            display: 'inline-block',
            background: '#c9a84c',
            color: '#0a0a0a',
            fontSize: '14px', fontWeight: 700,
            letterSpacing: '0.1em', textTransform: 'uppercase',
            padding: '16px 36px', borderRadius: '2px',
          }}>
            Falar com Comercial
          </a>
        </div>
      </div>

      {/* Stats */}
      <div style={{ background: '#0d0d0d', borderBottom: '1px solid #1a1a1a', padding: '48px 0' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '32px', textAlign: 'center' }}>
            {STATS.map(s => (
              <div key={s.label} style={{ padding: '24px', borderRight: '1px solid #1a1a1a' }}>
                <div style={{ fontFamily: 'var(--font-serif)', fontSize: '36px', fontWeight: 900, color: '#c9a84c', marginBottom: '8px' }}>
                  {s.value}
                </div>
                <div style={{ fontSize: '13px', color: '#666', letterSpacing: '0.05em' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Audience */}
      <div style={{ padding: '64px 0', borderBottom: '1px solid #1a1a1a' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '64px', alignItems: 'center' }}>
            <div>
              <span className="section-label" style={{ fontSize: '11px' }}>Audiência</span>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '28px', fontWeight: 700, color: '#e0e0e0', marginTop: '8px', marginBottom: '20px' }}>
                Quem lê o SONDA MÍDIA
              </h2>
              <p style={{ fontSize: '15px', color: '#777', lineHeight: '1.8', marginBottom: '24px' }}>
                Nossa audiência é formada por profissionais qualificados: jornalistas, advogados, professores, gestores públicos, empresários e ativistas que buscam informação aprofundada e confiável.
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                {[
                  { label: 'Ensino superior completo', pct: '78%' },
                  { label: 'Renda acima de 5 SM', pct: '61%' },
                  { label: '25–44 anos', pct: '54%' },
                  { label: 'São Paulo e Rio', pct: '47%' },
                ].map(d => (
                  <div key={d.label} style={{ padding: '16px', background: '#111', borderRadius: '3px', border: '1px solid #1a1a1a' }}>
                    <div style={{ fontSize: '24px', fontWeight: 700, color: '#c9a84c', marginBottom: '4px' }}>{d.pct}</div>
                    <div style={{ fontSize: '12px', color: '#666' }}>{d.label}</div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div style={{ padding: '32px', background: '#111', borderRadius: '4px', border: '1px solid #1a1a1a' }}>
                <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#e0e0e0', marginBottom: '20px' }}>
                  Distribuição por editorial
                </h3>
                {[
                  { label: 'Investigação', pct: 38 },
                  { label: 'Política & Economia', pct: 27 },
                  { label: 'Cultura', pct: 18 },
                  { label: 'Podcast', pct: 12 },
                  { label: 'Outros', pct: 5 },
                ].map(d => (
                  <div key={d.label} style={{ marginBottom: '14px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                      <span style={{ fontSize: '13px', color: '#888' }}>{d.label}</span>
                      <span style={{ fontSize: '13px', color: '#c9a84c', fontWeight: 600 }}>{d.pct}%</span>
                    </div>
                    <div style={{ height: '4px', background: '#1a1a1a', borderRadius: '2px' }}>
                      <div style={{ height: '100%', width: `${d.pct}%`, background: '#c9a84c', borderRadius: '2px' }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Formats */}
      <div style={{ padding: '64px 0', background: '#0d0d0d', borderBottom: '1px solid #1a1a1a' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <span className="section-label" style={{ fontSize: '11px' }}>Parceria</span>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '32px', fontWeight: 700, color: '#e0e0e0', marginTop: '8px' }}>
              Formatos Disponíveis
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
            {FORMATS.map(f => (
              <div key={f.title} style={{
                padding: '28px', background: '#111', borderRadius: '4px',
                border: '1px solid #1a1a1a',
              }}>
                <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#e0e0e0', marginBottom: '12px' }}>{f.title}</h3>
                <p style={{ fontSize: '14px', color: '#777', lineHeight: '1.65', marginBottom: '20px' }}>{f.desc}</p>
                <p style={{ fontSize: '13px', fontWeight: 700, color: '#c9a84c' }}>{f.price}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div style={{ padding: '80px 0', textAlign: 'center' }}>
        <div className="container" style={{ maxWidth: '560px' }}>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '28px', fontWeight: 700, color: '#e0e0e0', marginBottom: '16px' }}>
            Pronto para alcançar nossa audiência?
          </h2>
          <p style={{ fontSize: '15px', color: '#777', marginBottom: '32px' }}>
            Nossa equipe comercial está disponível para apresentar propostas personalizadas.
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
            <a href="mailto:comercial@sondamidia.com.br" style={{
              background: '#c9a84c', color: '#0a0a0a',
              fontSize: '13px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase',
              padding: '14px 28px', borderRadius: '2px',
            }}>
              Enviar Proposta
            </a>
            <Link href="/sobre#contato" style={{
              border: '1px solid #333', color: '#aaa',
              fontSize: '13px', fontWeight: 600,
              padding: '14px 28px', borderRadius: '2px',
            }}>
              Mais Informações
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
