import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import './Footer.css'

export function Footer() {
  const { t } = useTranslation()

  return (
    <footer className="footer">
      <div className="footer-content">
        <p>{t('footer.text')}</p>
        <Link to="/contato" className="footer-link">
          {t('footer.contact')}
        </Link>
      </div>
    </footer>
  )
}

export default Footer
