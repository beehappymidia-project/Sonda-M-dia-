'use client'
import { useState } from 'react'
import ArticleCard from '@/components/ArticleCard'
import AdZone from '@/components/AdZone'
import Link from 'next/link'

const POPULAR = ['Cabo Delgado', 'Gás Natural', 'Eleições 2024', 'Inflação', 'Investigação', 'SADC', 'Maputo', 'Corrupção']

const SECTIONS = ['Política', 'Economia', 'Sociedade', 'Internacional', 'Investigação', 'Multimédia', 'Opinião']
const FORMATS = ['Reportagem', 'Análise', 'Investigação', 'Podcast', 'Galeria', 'Vídeo', 'Opinião']

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
      setResults(data.results || [])
    } catch {
      setResults([])
    } finally {
      setLoading(false)
    }
  }

  async function searchFor(term: string) {
    setQuery(term)
    setLoading(true)
    setSearched(true)
    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(term)}`)
      const data = await res.json()
      setResults(data.results || [])
    } catch {
      setResults([])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      {/* Hero */}
      <div className="page-hero">
        <p style={{ fontSize: '0.68rem', fontWeight: 900, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--ouro)', marginBottom: '16px', position: 'relative', zIndex: 1 }}>
          Pesquisa
        </p>
        <h1 className="page-hero__title">Encontre o que procura</h1>
        <p className="page-hero__lead">Pesquise em toda a nossa base de conteúdos — reportagens, investigações, podcasts e muito mais.</p>
        <form onSubmit={handleSearch} className="search-bar">
          <input
            type="search"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Pesquisar artigos, autores, temas..."
            className="search-bar__input"
          />
          <button type="submit" className="search-bar__btn">Pesquisar</button>
        </form>

        {/* Popular searches */}
        <div style={{ marginTop: '20px', display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: 'center', position: 'relative', zIndex: 1 }}>
          {POPULAR.map(term => (
            <button
              key={term}
              onClick={() => searchFor(term)}
              style={{ fontFamily: 'inherit', fontSize: '0.72rem', fontWeight: 700, padding: '5px 12px', borderRadius: '20px', border: '1px solid var(--cinza-3)', background: 'transparent', color: 'var(--cinza)', cursor: 'pointer', transition: 'all 0.2s' }}
            >
              {term}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: '40px 0', background: 'var(--preto)' }}>
        <div className="container">
          <div className="grid-main">
            {/* Results */}
            <div>
              {loading && (
                <p style={{ color: 'var(--cinza)', fontSize: '0.95rem' }}>A pesquisar...</p>
              )}
              {!loading && searched && results.length === 0 && (
                <div style={{ padding: '48px 0' }}>
                  <p style={{ color: 'var(--cinza)', fontSize: '1rem', marginBottom: '16px' }}>
                    Nenhum resultado para &ldquo;{query}&rdquo;.
                  </p>
                  <p style={{ fontSize: '0.85rem', color: 'var(--cinza-2)' }}>Tente outros termos ou navegue pelas secções abaixo.</p>
                </div>
              )}
              {!loading && results.length > 0 && (
                <>
                  <p style={{ fontSize: '0.82rem', color: 'var(--cinza)', marginBottom: '24px' }}>
                    {results.length} resultado{results.length !== 1 ? 's' : ''} para &ldquo;{query}&rdquo;
                  </p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
                    {results.map((a, i) => (
                      <div key={a.id} style={{ paddingBottom: '20px', marginBottom: '20px', borderBottom: i < results.length - 1 ? '1px solid var(--cinza-3)' : 'none' }}>
                        <ArticleCard article={a} size="horizontal" />
                      </div>
                    ))}
                  </div>
                </>
              )}
              {!searched && (
                <div style={{ padding: '40px 0' }}>
                  <p style={{ color: 'var(--cinza-2)', fontSize: '1rem', textAlign: 'center', marginBottom: '40px' }}>
                    Introduza um termo acima ou navegue pelas secções
                  </p>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
                    {SECTIONS.map(s => (
                      <Link key={s} href={`/${s.toLowerCase().replace(/ã/g, 'a').replace(/ç/g, 'c').replace(/é/g, 'e').replace(/â/g, 'a').replace(/ê/g, 'e').replace(/í/g, 'i').replace(/ó/g, 'o')}`} style={{ padding: '16px', background: 'var(--carvao)', border: '1px solid var(--cinza-3)', borderRadius: '4px', fontWeight: 700, color: 'var(--branco)', fontSize: '0.88rem', transition: 'border-color 0.2s', display: 'block' }}>
                        {s} →
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Filters Sidebar */}
            <aside className="sidebar">
              <div className="sidebar__widget">
                <div className="sidebar__widget-head">Secção</div>
                <div className="sidebar__widget-body">
                  <ul className="sidebar__list">
                    {SECTIONS.map(s => (
                      <li key={s}><button onClick={() => searchFor(s)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--branco)', fontFamily: 'inherit', fontSize: '0.82rem', fontWeight: 600, padding: 0, textAlign: 'left' }}>{s}</button></li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="sidebar__widget">
                <div className="sidebar__widget-head">Formato</div>
                <div className="sidebar__widget-body">
                  <ul className="sidebar__list">
                    {FORMATS.map(f => (
                      <li key={f}><button onClick={() => searchFor(f)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--branco)', fontFamily: 'inherit', fontSize: '0.82rem', fontWeight: 600, padding: 0, textAlign: 'left' }}>{f}</button></li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="sidebar__widget">
                <div className="sidebar__widget-head">Período</div>
                <div className="sidebar__widget-body">
                  <ul className="sidebar__list">
                    {['Esta semana', 'Este mês', 'Este ano', '2024', '2023'].map(p => (
                      <li key={p}><span style={{ fontSize: '0.82rem', color: 'var(--cinza)', fontWeight: 600 }}>{p}</span></li>
                    ))}
                  </ul>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>

      <AdZone />
    </div>
  )
}
