import { Link, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useState, useEffect } from 'react'
import { useWeather } from '../hooks'
import './Footer.css'
import '../index.css'

export function Footer() {
  const { t, i18n } = useTranslation()
  const location = useLocation()
  const [currentTime, setCurrentTime] = useState(new Date())
  // Ajusta o idioma para o formato aceito pela API do OpenWeather
  const lang = (() => {
    if (i18n.language.startsWith('pt')) return 'pt_br';
    if (i18n.language.startsWith('en')) return 'en';
    return i18n.language;
  })();
  // Força recarregamento do clima ao trocar de idioma
  useEffect(() => {
    const cacheKey = `weather_data_${lang}`;
    localStorage.removeItem(cacheKey);
  }, [lang]);
  const { data: weatherData, loading: weatherLoading } = useWeather('Quixadá', 'BR', lang)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 60000) // Atualiza a cada minuto

    return () => clearInterval(timer)
  }, [])

  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/'
    }
    return location.pathname.startsWith(path)
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const timeString = currentTime.toLocaleTimeString('pt-BR', {
    hour: '2-digit',
    minute: '2-digit'
  })

  return (
    <footer className="footer">
      <div className="footer-nav">
        <button onClick={scrollToTop} className="primary" aria-label={t('footer.backToTopAria', 'Voltar ao topo')}>
          ↑ {t('footer.backToTop', 'Topo')}
        </button>
        <nav>
          <ul className="footer-links">
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
        </nav>
      </div>

      <div className="footer-info">
        <p><strong>{t('footer.location', 'Quixadá, Brasil')}</strong></p>
        <p className="footer-time">{t('footer.currentTime', { time: timeString })}</p>
        {weatherLoading ? (
          <p className="footer-weather">{t('footer.weatherLoading', 'Carregando clima...')}</p>
        ) : weatherData ? (
          <p className="footer-weather">
            {t('footer.weatherNow', {
              description: weatherData.description,
              tempMin: weatherData.tempMin,
              tempMax: weatherData.tempMax
            })}
          </p>
        ) : (
          <p className="footer-weather">{t('footer.weatherUnavailable', 'Clima indisponível no momento')}</p>
        )}
        <p className="footer-cta">
          {/* Divide o texto e insere o Link no local correto */}
          {(() => {
            const stillTime = t('footer.stillTime');
            const linkText = t('about.contactLink');
            const [before, after] = stillTime.split(linkText);
            return <>
              {before}
              <Link to="/contato">{linkText}</Link>
              {after}
            </>;
          })()}
        </p>
        <p>
          {t('footer.lastUpdated', {
            date: new Date(import.meta.env.VITE_DEPLOY_DATE || Date.now()).toLocaleDateString(i18n.language === 'pt' ? 'pt-BR' : 'en-US', {
              year: 'numeric',
              month: 'short'
            })
          })}
        </p>
      </div>

      <div className="footer-social">
        <a href="https://linkedin.com/in/fellipemayan" target="_blank" rel="noopener noreferrer" >
          {t('footer.linkedin', 'LinkedIn')}<span className="external-icon" aria-hidden="true">↗</span>
        </a>
        <a href="https://dribbble.com/fellipemayan" target="_blank" rel="noopener noreferrer" >
          {t('footer.dribbble', 'Dribbble')}<span className="external-icon" aria-hidden="true">↗</span>
        </a>
        <a href="https://behance.net/fellipemayan" target="_blank" rel="noopener noreferrer" >
          {t('footer.behance', 'Behance')}<span className="external-icon" aria-hidden="true">↗</span>
        </a>
        <a href="https://github.com/fellipemayan" target="_blank" rel="noopener noreferrer" >
          {t('footer.github', 'GitHub')}<span className="external-icon" aria-hidden="true">↗</span>
        </a>
      </div>

      <div className="footer-credits">
        <p className="footer-made-with">{t('footer.madeWith', 'Feito com carinho (e o feedback de amigos)')}</p>
        <p className="footer-copyright">{t('footer.copyright', { year: new Date().getFullYear() })}</p>
      </div>
    </footer>
  )
}

export default Footer
