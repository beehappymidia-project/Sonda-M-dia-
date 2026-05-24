import Link from 'next/link'

export default function NotFound() {
  return (
    <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ textAlign: 'center' }}>
        <span className="section-label" style={{ fontSize: '12px' }}>Erro 404</span>
        <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '48px', fontWeight: 900, color: '#e8e8e8', margin: '16px 0 8px' }}>
          Página não encontrada
        </h1>
        <p style={{ fontSize: '16px', color: '#666', marginBottom: '32px' }}>
          O conteúdo que procura não existe ou foi movido.
        </p>
        <Link href="/" style={{
          display: 'inline-block',
          background: '#c9a84c',
          color: '#0a0a0a',
          fontSize: '13px',
          fontWeight: 700,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          padding: '12px 28px',
          borderRadius: '2px',
        }}>
          Voltar ao início
        </Link>
      </div>
    </div>
  )
}
