import { Link, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import ThemeSelector from './ThemeSelector'
import LanguageSelector from './LanguageSelector'
import MobileMenu from './MobileMenu'
import './Header.css'

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
    <header className="header">
      <nav className="header-nav">
        <div className="nav-logo">
          <Link to="/">Fellipe Mayan</Link>
        </div>

        <ul className="nav-links">
          <li>
            <Link to="/" className={isActive('/') ? 'active' : ''}>{t('nav.home')}</Link>
          </li>
          <li>
            <Link to="/projetos" className={isActive('/projetos') ? 'active' : ''}>{t('nav.projects')}</Link>
          </li>
          <li>
            <Link to="/sobre" className={isActive('/sobre') ? 'active' : ''}>{t('nav.about')}</Link>
          </li>
          <li>
            <Link to="/contato" className={isActive('/contato') ? 'active' : ''}>{t('nav.contact')}</Link>
          </li>
        </ul>

        <div className="header-controls">
          <ThemeSelector />
          <LanguageSelector />
          <MobileMenu />
        </div>
      </nav>
    </header>
  )
}

export default Header
