'use client'
import { useState } from 'react'
import AdZone from '@/components/AdZone'

const NEWSLETTERS = [
  {
    id: 'pulso',
    name: 'O Pulso',
    freq: 'Diária',
    desc: 'As notícias mais importantes do dia em Moçambique, em 5 minutos. Enviado todas as manhãs às 7h.',
    color: 'var(--ouro)',
  },
  {
    id: 'investigacao',
    name: 'Carta de Investigação',
    freq: 'Semanal',
    desc: 'Os dossiês, investigações e reportagens de profundidade que publicamos, com contexto exclusivo dos jornalistas.',
    color: '#c94040',
  },
  {
    id: 'economia',
    name: 'Boletim Económico',
    freq: 'Semanal',
    desc: 'Análises económicas, dados de mercado e perspectivas sobre a economia moçambicana e africana.',
    color: '#40a8c9',
  },
  {
    id: 'internacional',
    name: 'Carta Internacional',
    freq: 'Quinzenal',
    desc: 'Geopolítica africana, relações internacionais e o que acontece na SADC e no continente.',
    color: '#40c980',
  },
]

export default function NewsletterPage() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email) return
    setStatus('loading')
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      const data = await res.json()
      if (res.ok) {
        setStatus('success')
        setMessage('Subscrito com sucesso! Bem-vindo à família SONDA MÍDIA.')
        setEmail('')
      } else {
        setStatus('error')
        setMessage(data.error || 'Erro ao subscrever. Tente novamente.')
      }
    } catch {
      setStatus('error')
      setMessage('Erro de ligação. Tente novamente.')
    }
  }

  return (
    <div>
      {/* Hero */}
      <div style={{ background: 'var(--carvao)', borderBottom: '1px solid var(--cinza-3)', padding: '72px 0', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        {/* Radar watermark */}
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', opacity: 0.04, pointerEvents: 'none' }}>
          <svg width="400" height="400" viewBox="0 0 32 32" fill="none">
            <circle cx="16" cy="16" r="14" stroke="#FFB703" strokeWidth="0.5" />
            <circle cx="16" cy="16" r="9" stroke="#FFB703" strokeWidth="0.5" />
            <circle cx="16" cy="16" r="4" stroke="#FFB703" strokeWidth="0.5" />
            <path d="M16 16 L25.9 10.5" stroke="#FFB703" strokeWidth="0.5" />
          </svg>
        </div>
        <div className="container" style={{ maxWidth: '640px', position: 'relative', zIndex: 1 }}>
          <span style={{ fontSize: '0.62rem', fontWeight: 900, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--ouro)', display: 'block', marginBottom: '16px' }}>
            Newsletter
          </span>
          <h1 style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)', fontWeight: 900, color: 'var(--branco)', marginBottom: '16px', lineHeight: 1.15 }}>
            Jornalismo na sua caixa de entrada
          </h1>
          <p style={{ fontSize: '1rem', color: 'var(--cinza)', lineHeight: 1.65, marginBottom: '32px' }}>
            Receba as principais reportagens, investigações e análises da SONDA MÍDIA. Sem spam. Cancele quando quiser.
          </p>

          {status === 'success' ? (
            <div style={{ padding: '20px 28px', background: 'rgba(64,201,128,0.1)', border: '1px solid rgba(64,201,128,0.3)', borderRadius: '6px', color: '#40c980', fontWeight: 700 }}>
              {message}
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="nl-strip__form" style={{ maxWidth: '480px', margin: '0 auto' }}>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="O seu email"
                required
                className="nl-strip__input"
                style={{ background: 'var(--preto)', border: '2px solid var(--cinza-3)', borderRight: 'none', borderRadius: '4px 0 0 4px', flex: 1 }}
              />
              <button
                type="submit"
                disabled={status === 'loading'}
                className="nl-strip__btn"
                style={{ background: 'var(--ouro)', color: 'var(--preto)', borderRadius: '0 4px 4px 0', border: 'none' }}
              >
                {status === 'loading' ? '...' : 'Subscrever'}
              </button>
            </form>
          )}
          {status === 'error' && (
            <p style={{ fontSize: '0.82rem', color: '#e05555', marginTop: '8px' }}>{message}</p>
          )}
          <p style={{ fontSize: '0.72rem', color: 'var(--cinza-2)', marginTop: '16px' }}>
            Ao subscrever, aceita a nossa política de privacidade.
          </p>
        </div>
      </div>

      {/* Newsletter Cards */}
      <section style={{ padding: '56px 0', background: 'var(--preto)', borderBottom: '1px solid var(--cinza-3)' }}>
        <div className="container">
          <div className="section-head" style={{ marginBottom: '32px' }}>
            <div className="section-head__line" />
            <span className="section-head__title">As nossas newsletters</span>
          </div>
          <div className="grid-4">
            {NEWSLETTERS.map(nl => (
              <div key={nl.id} style={{ background: 'var(--carvao)', border: '1px solid var(--cinza-3)', borderRadius: '6px', overflow: 'hidden' }}>
                <div style={{ height: '4px', background: nl.color }} />
                <div style={{ padding: '20px' }}>
                  <span style={{ fontSize: '0.62rem', fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', color: nl.color, display: 'block', marginBottom: '8px' }}>
                    {nl.freq}
                  </span>
                  <h3 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--branco)', marginBottom: '10px' }}>{nl.name}</h3>
                  <p style={{ fontSize: '0.82rem', color: 'var(--cinza)', lineHeight: 1.6, marginBottom: '16px' }}>{nl.desc}</p>
                  <button
                    onClick={() => {
                      const el = document.querySelector('.nl-strip__input') as HTMLInputElement
                      if (el) el.focus()
                    }}
                    style={{ fontFamily: 'inherit', fontSize: '0.72rem', fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase', padding: '7px 14px', background: 'transparent', border: `1px solid ${nl.color}`, color: nl.color, borderRadius: '4px', cursor: 'pointer', transition: 'all 0.2s' }}
                  >
                    Subscrever →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Strip */}
      <section style={{ background: 'var(--carvao-2)', borderBottom: '1px solid var(--cinza-3)', padding: '0' }}>
        <div className="container">
          <div className="stats-bar" style={{ borderRadius: 0, border: 'none', borderLeft: '1px solid var(--cinza-3)', borderRight: '1px solid var(--cinza-3)' }}>
            <div className="stats-bar__item">
              <span className="stats-bar__num">1.250+</span>
              <span className="stats-bar__label">subscritores</span>
            </div>
            <div className="stats-bar__item">
              <span className="stats-bar__num">72%</span>
              <span className="stats-bar__label">taxa de abertura</span>
            </div>
            <div className="stats-bar__item">
              <span className="stats-bar__num">4</span>
              <span className="stats-bar__label">newsletters</span>
            </div>
            <div className="stats-bar__item">
              <span className="stats-bar__num">0</span>
              <span className="stats-bar__label">spam, sempre</span>
            </div>
          </div>
        </div>
      </section>

      <AdZone />
    </div>
  )
}
