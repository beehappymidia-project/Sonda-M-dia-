'use client'
import { useState } from 'react'
import type { Metadata } from 'next'

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
        setMessage('Subscrito com sucesso! Bem-vindo à SONDA MÍDIA.')
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
    <div style={{ minHeight: '70vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '60px 24px' }}>
      <div style={{ maxWidth: '560px', width: '100%', textAlign: 'center' }}>
        <span className="section-label" style={{ fontSize: '12px' }}>Newsletter</span>
        <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '36px', fontWeight: 900, color: '#e8e8e8', margin: '16px 0 8px', lineHeight: '1.2' }}>
          Jornalismo investigativo na sua caixa de entrada
        </h1>
        <p style={{ fontSize: '16px', color: '#666', lineHeight: '1.7', marginBottom: '40px' }}>
          Receba as principais reportagens, análises e exclusivos do SONDA MÍDIA. Sem spam. Cancele quando quiser.
        </p>

        {status === 'success' ? (
          <div style={{ padding: '24px', background: '#111', border: '1px solid #1a3a1a', borderRadius: '4px', color: '#4caf50' }}>
            {message}
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div style={{ display: 'flex', gap: '0', marginBottom: '12px' }}>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="O seu e-mail"
                required
                style={{
                  flex: 1,
                  padding: '14px 18px',
                  background: '#111',
                  border: '1px solid #2a2a2a',
                  borderRight: 'none',
                  borderRadius: '2px 0 0 2px',
                  color: '#e0e0e0',
                  fontSize: '14px',
                  outline: 'none',
                }}
              />
              <button
                type="submit"
                disabled={status === 'loading'}
                style={{
                  padding: '14px 24px',
                  background: '#c9a84c',
                  color: '#0a0a0a',
                  border: 'none',
                  borderRadius: '0 2px 2px 0',
                  fontSize: '13px',
                  fontWeight: 700,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  cursor: status === 'loading' ? 'wait' : 'pointer',
                }}
              >
                {status === 'loading' ? '...' : 'Assinar'}
              </button>
            </div>
            {status === 'error' && (
              <p style={{ fontSize: '13px', color: '#e05555', marginTop: '8px' }}>{message}</p>
            )}
          </form>
        )}

        <p style={{ fontSize: '12px', color: '#444', marginTop: '24px' }}>
          Ao subscrever, aceita a nossa política de privacidade. Os seus dados não serão partilhados com terceiros.
        </p>
      </div>
    </div>
  )
}
