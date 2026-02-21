import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import ThemeSelector from './ThemeSelector'
import LanguageSelector from './LanguageSelector'
import './Header.css'

export function Header() {
  const { t } = useTranslation()

  return (
    <header className="header">
      <nav className="header-nav">
        <div className="nav-logo">
          <Link to="/">Portfolio</Link>
        </div>

        <ul className="nav-links">
          <li>
            <Link to="/">{t('nav.home')}</Link>
          </li>
          <li>
            <Link to="/projetos">{t('nav.projects')}</Link>
          </li>
          <li>
            <Link to="/sobre">{t('nav.about')}</Link>
          </li>
          <li>
            <Link to="/contato">{t('nav.contact')}</Link>
          </li>
        </ul>

        <div className="header-controls">
          <ThemeSelector />
          <LanguageSelector />
        </div>
      </nav>
    </header>
  )
}

export default Header
