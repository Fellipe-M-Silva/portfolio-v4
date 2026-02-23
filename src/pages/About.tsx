import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import { useResume } from '@/hooks/useProjects'
import { useLocalizedString } from '@/utils/i18n'
import type { CareerItem } from '@/types'
import './About.css'

function ResumeCard({ item }: { item: CareerItem }) {
  const { t } = useTranslation()
  const title = useLocalizedString(item.title)
  const location = useLocalizedString(item.location)
  const type = useLocalizedString(item.type)
  const description = item.description ? useLocalizedString(item.description) : undefined

  const periodLabel = item.isPresent
    ? `${item.startYear} - ${t('about.present')}`
    : item.endYear
      ? `${item.startYear} - ${item.endYear}`
      : `${item.startYear}`

  return (
    <li className="resume-card">
      <div className="resume-card-header">
        <h3 className="resume-card-title">{title}</h3>
        <span className="resume-card-period">{periodLabel}</span>
      </div>
      <div className="resume-card-content">
        <p className="resume-card-meta">
          <span className="resume-card-location">{location}</span>
          <span className="resume-card-separator">✦</span>
          <span className="resume-card-type">{type}</span>
        </p>
        {description && (
          <p className="resume-card-description">{description}</p>
        )}
      </div>
    </li>
  )
}

function ResumeSection({ title, items }: { title: string; items: CareerItem[] }) {
  return (
    <section className="resume-section">
      <h2 className="resume-section-title">{title}</h2>
      <ul className="resume-list">
        {items.map((item) => (
          <ResumeCard key={item._id} item={item} />
        ))}
      </ul>
    </section>
  )
}

export function About() {
  const { t } = useTranslation()
  const { data: resumeData, isLoading, error } = useResume()
  const headingRef = useRef<HTMLHeadingElement>(null)
  const [loadStatus, setLoadStatus] = useState<string>('')

  // Focus management: Move foco para o H1 ao carregar a página
  useEffect(() => {
    // Pequeno delay para garantir que o conteúdo foi renderizado
    const timeoutId = setTimeout(() => {
      headingRef.current?.focus()
    }, 100)

    return () => clearTimeout(timeoutId)
  }, [])

  // Live region: Anuncia quando o conteúdo é carregado
  useEffect(() => {
    if (!isLoading && resumeData) {
      setLoadStatus(t('a11y.contentLoaded', 'Conteúdo carregado com sucesso'))
      // Limpa a mensagem após alguns segundos
      const timeoutId = setTimeout(() => setLoadStatus(''), 3000)
      return () => clearTimeout(timeoutId)
    }
    if (error) {
      setLoadStatus(t('errors.loadResume'))
    }
  }, [isLoading, resumeData, error, t])

  if (isLoading) {
    return (
      <>
        {/* Live region para status de carregamento */}
        <div role="status" aria-live="polite" aria-atomic="true" className="sr-only">
          {t('a11y.loading')}
        </div>
        
        <div className="about-page" aria-busy="true">
          <section className="about-intro-section" aria-label={t('a11y.introduction', 'Introdução')}>
            <div className="skeleton-text" style={{ height: '1.5rem' }} aria-hidden="true"></div>
            <div className="skeleton-text" style={{ width: '80%', marginTop: '1rem' }} aria-hidden="true"></div>
          </section>
          <section className="about-resume" aria-label={t('a11y.resume', 'Currículo')}>
            <div className="skeleton-text" style={{ height: '1rem', marginBottom: '2rem' }} aria-hidden="true"></div>
            <div className="skeleton-text" style={{ height: '100px', marginBottom: '1rem' }} aria-hidden="true"></div>
            <div className="skeleton-text" style={{ height: '100px' }} aria-hidden="true"></div>
          </section>
        </div>
      </>
    )
  }

  if (error) {
    return (
      <>
        {/* Live region para erro */}
        <div role="alert" aria-live="assertive" aria-atomic="true" className="sr-only">
          {t('errors.loadResume')}
        </div>
        
        <div className="about-page">
          <section className="about-intro-section" aria-label={t('a11y.introduction', 'Introdução')}>
            <h1 
              ref={headingRef}
              id="about-heading" 
              className="sr-only"
              tabIndex={-1}
            >
              {t('nav.about')}
            </h1>
            <p className="about-intro">{t('about.intro')}</p>
            <div className="error-message" role="alert">
              {t('errors.loadResume')}
            </div>
          </section>
        </div>
      </>
    )
  }

  const currentInterests = t('about.currentInterests', { returnObjects: true }) as string[]

  return (
    <>
      {/* Live region para anunciar conteúdo carregado */}
      {loadStatus && (
        <div role="status" aria-live="polite" aria-atomic="true" className="sr-only">
          {loadStatus}
        </div>
      )}

      <section className="about-intro-section" aria-labelledby="about-heading">
        <h1 
          ref={headingRef}
          id="about-heading" 
          className="sr-only"
          tabIndex={-1}
        >
          {t('nav.about')}
        </h1>
        <p className="intro-paragraph">{t('about.intro')}</p>
        <p>{t('about.paragraph1')}</p>
        <p>
          {t('about.paragraph2', { link: '' }).split('{{link}}')[0]}
          <Link to="/contato">{t('about.contactLink')}</Link>
          {t('about.paragraph2', { link: '' }).split('{{link}}')[1]}
        </p>
        <p>{t('about.currentlyTitle')}</p>
        <ul className="about-interests" aria-label={t('a11y.currentInterests', 'Interesses atuais')}>
          {currentInterests.map((interest, index) => (
            <li key={index}>{interest}</li>
          ))}
        </ul>
      </section>

        {resumeData.experience.length > 0 && (
          <ResumeSection title={t('about.experience')} items={resumeData.experience} />
        )}
        {resumeData.education.length > 0 && (
          <ResumeSection title={t('about.education')} items={resumeData.education} />
        )}
        {resumeData.research.length > 0 && (
          <ResumeSection title={t('about.research')} items={resumeData.research} />
        )}
    </>
  )
}

export default About
