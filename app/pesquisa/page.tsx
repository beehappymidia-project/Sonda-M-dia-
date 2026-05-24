'use client'
import { useState, useEffect } from 'react'
import ArticleCard from '@/components/ArticleCard'

export default function PesquisaPage() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [searched, setSearched] = useState(false)

  async function handleSearch(e: React.FormEvent) {
    e.preventDefault()
    if (!query.trim()) return
    setLoading(true)
    setSearched(true)
    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`)
      const data = await res.json()
      setResults(data.results || data.articles || [])
    } catch {
      setResults([])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <div style={{ background: '#0d0d0d', borderBottom: '1px solid #1a1a1a', padding: '40px 0' }}>
        <div className="container">
          <span className="section-label" style={{ fontSize: '12px' }}>Pesquisa</span>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '36px', fontWeight: 900, color: '#e8e8e8', marginTop: '8px', marginBottom: '24px' }}>
            Buscar Conteúdo
          </h1>
          <form onSubmit={handleSearch} style={{ display: 'flex', gap: '0', maxWidth: '600px' }}>
            <input
              type="search"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Pesquisar artigos, autores, temas..."
              style={{
                flex: 1,
                padding: '14px 18px',
                background: '#111',
                border: '1px solid #2a2a2a',
                borderRight: 'none',
                borderRadius: '2px 0 0 2px',
                color: '#e0e0e0',
                fontSize: '15px',
                outline: 'none',
              }}
            />
            <button
              type="submit"
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
                cursor: 'pointer',
              }}
            >
              Buscar
            </button>
          </form>
        </div>
      </div>

      <div className="container" style={{ padding: '48px 24px' }}>
        {loading && (
          <p style={{ color: '#666', fontSize: '15px' }}>A pesquisar...</p>
        )}
        {!loading && searched && results.length === 0 && (
          <p style={{ color: '#666', fontSize: '15px' }}>
            Nenhum resultado para "{query}".
          </p>
        )}
        {!loading && results.length > 0 && (
          <>
            <p style={{ fontSize: '13px', color: '#666', marginBottom: '32px' }}>
              {results.length} resultado{results.length !== 1 ? 's' : ''} para "{query}"
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '32px' }}>
              {results.map(a => (
                <ArticleCard key={a.id} article={a} size="medium" />
              ))}
            </div>
          </>
        )}
        {!searched && (
          <p style={{ color: '#444', fontSize: '15px', textAlign: 'center', padding: '60px 0' }}>
            Introduza um termo de pesquisa acima.
          </p>
        )}
      </div>
    </div>
  )
}
