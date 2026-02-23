import { useTranslation } from 'react-i18next'
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

  if (isLoading) {
    return (
      <div className="about-page">
        <section className="about-intro-section">
          <div className="skeleton-text" style={{ height: '1.5rem' }}></div>
          <div className="skeleton-text" style={{ width: '80%', marginTop: '1rem' }}></div>
        </section>
        <section className="about-resume">
          <div className="skeleton-text" style={{ height: '1rem', marginBottom: '2rem' }}></div>
          <div className="skeleton-text" style={{ height: '100px', marginBottom: '1rem' }}></div>
          <div className="skeleton-text" style={{ height: '100px' }}></div>
        </section>
      </div>
    )
  }

  if (error) {
    return (
      <div className="about-page">
        <section className="about-intro-section">
          <p className="about-intro">{t('about.intro')}</p>
          <div className="error-message">
            Erro ao carregar currículo. Tente novamente mais tarde.
          </div>
        </section>
      </div>
    )
  }

  return (
    <div className="about-page">
      <section className="about-intro-section">
          <p className="about-intro">{t('about.intro')}</p>
          <p>Disponível para oportunidades de freelancing e trabalho remoto. Se você tem uma ideia que quer transformar em realidade, <a>manda uma mensagem</a>!</p>
          <p>Além de design e programação, estou:</p>
          <ul className="about-interests">
            <li>Lendo Memórias de um Sargento de Milícia</li>
            <li>Estudando Cálculo (de novo)</li>
            <li>Jogando Hades 2</li>
          </ul>
      </section>

      <section className="about-resume">
        {resumeData.experience.length > 0 && (
          <ResumeSection title={t('about.experience')} items={resumeData.experience} />
        )}
        {resumeData.education.length > 0 && (
          <ResumeSection title={t('about.education')} items={resumeData.education} />
        )}
        {resumeData.research.length > 0 && (
          <ResumeSection title={t('about.research')} items={resumeData.research} />
        )}
      </section>
    </div>
  )
}

export default About
