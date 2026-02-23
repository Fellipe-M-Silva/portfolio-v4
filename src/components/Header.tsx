import { Link, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import ThemeSelector from './ThemeSelector'
import LanguageSelector from './LanguageSelector'
import MobileMenu from './MobileMenu'
import './Header.css''
export function Header() {
  const { t } = useTranslation()
  const location = useLocation()

  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/'
    }
    return location.pathname.startsWith(path)
  }

  return (
    <>
      {/* Skip to main content link */}
      <a href="#main-content" className="skip-link">
        {t('a11y.skipToContent', 'Pular para o conteúdo principal')}
      </a>
      
      <header className="header">
        <div className="nav-logo breakout-left">
          <Link to="/">Fellipe Mayan</Link>
        </div>

        <nav className="header-nav content" aria-label={t('a11y.mainNavigation', 'Navegação principal')}>
          <ul className="nav-links">
            <li>
              <Link 
                to="/" 
                className={isActive('/') ? 'active' : ''}
                aria-current={isActive('/') ? 'page' : undefined}
              >
                {t('nav.home')}
              </Link>
            </li>
            <li>
              <Link 
                to="/projetos" 
                className={isActive('/projetos') ? 'active' : ''}
                aria-current={isActive('/projetos') ? 'page' : undefined}
              >
                {t('nav.projects')}
              </Link>
            </li>
            <li>
              <Link 
                to="/sobre" 
                className={isActive('/sobre') ? 'active' : ''}
                aria-current={isActive('/sobre') ? 'page' : undefined}
              >
                {t('nav.about')}
              </Link>
            </li>
            <li>
              <Link 
                to="/contato" 
                className={isActive('/contato') ? 'active' : ''}
                aria-current={isActive('/contato') ? 'page' : undefined}
              >
                {t('nav.contact')}
              </Link>
            </li>
          </ul>
        </nav>

        <div className="header-controls breakout-right">
          <ThemeSelector />
          <LanguageSelector />
        </div>
        <div className="header-mobile-menu breakout-right">
          <MobileMenu />
        </div>
      </header>
    </>
  )
}

export default Header
