import Link from 'next/link'

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="ftr">
      <div className="ftr__inner">
        <div className="ftr__top">
          {/* Brand */}
          <div>
            <Link href="/" style={{ display: 'inline-block', marginBottom: '12px' }}>
              <img
                src="/logo.jpg"
                alt="SONDA MÍDIA"
                style={{ height: '32px', width: 'auto', display: 'block' }}
              />
            </Link>
            <p className="ftr__tagline">
              Jornalismo investigativo independente de Moçambique. Cobertura aprofundada
              sobre poder, sociedade e economia — mais fundo que a notícia.
            </p>
            <div className="ftr__social">
              <a href="https://twitter.com/sondamidia" target="_blank" rel="noopener">Twitter</a>
              <a href="https://instagram.com/sondamidia" target="_blank" rel="noopener">Instagram</a>
              <a href="https://youtube.com/@sondamidia" target="_blank" rel="noopener">YouTube</a>
              <a href="https://facebook.com/sondamidia" target="_blank" rel="noopener">Facebook</a>
            </div>
          </div>

          {/* Editorial */}
          <div className="ftr__col">
            <h4>Editorial</h4>
            <ul>
              <li><Link href="/politica">Política</Link></li>
              <li><Link href="/economia">Economia</Link></li>
              <li><Link href="/sociedade">Sociedade</Link></li>
              <li><Link href="/internacional">Internacional</Link></li>
              <li><Link href="/investigacao">Investigação</Link></li>
              <li><Link href="/opiniao">Opinião</Link></li>
            </ul>
          </div>

          {/* Multimédia */}
          <div className="ftr__col">
            <h4>Multimédia</h4>
            <ul>
              <li><Link href="/podcast">Podcasts</Link></li>
              <li><Link href="/documentario">Documentários</Link></li>
              <li><Link href="/galeria">Galerias</Link></li>
              <li><Link href="/newsletter">Newsletter</Link></li>
            </ul>
          </div>

          {/* Institucional */}
          <div className="ftr__col">
            <h4>Institucional</h4>
            <ul>
              <li><Link href="/sobre">Sobre</Link></li>
              <li><Link href="/autor/sheymen-abdurremane">Equipa</Link></li>
              <li><Link href="/mediakit">Media Kit</Link></li>
              <li><Link href="/pesquisa">Pesquisa</Link></li>
              <li><Link href="/sobre#contato">Contacto</Link></li>
            </ul>
          </div>
        </div>

        <div className="ftr__bottom">
          <p className="ftr__copy">
            © {year} <span className="gold">SONDA MÍDIA</span>. Todos os direitos reservados. Maputo, Moçambique.
          </p>
          <nav className="ftr__legal">
            <Link href="/sobre#politica">Política Editorial</Link>
            <Link href="/sobre#privacidade">Privacidade</Link>
            <Link href="/sobre#termos">Termos</Link>
          </nav>
        </div>
      </div>
    </footer>
  )
}
