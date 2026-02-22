import { useTranslation } from 'react-i18next'
import { useAbout } from '@/hooks/useProjects'
import { getLocalizedString } from '@/utils/i18n'
import './About.css'

export function About() {
  const { t, i18n } = useTranslation()
  const { data: about, isLoading, error } = useAbout()

  if (isLoading) {
    return (
      <div className="about-page">
        <section className="about-header">
          <div className="container">
            <div className="skeleton-text" style={{ height: '3rem' }}></div>
            <div className="skeleton-text" style={{ width: '70%' }}></div>
          </div>
        </section>
        <div className="container about-content">
          <div className="skeleton-text"></div>
          <div className="skeleton-text"></div>
        </div>
      </div>
    )
  }

  if (error || !about) {
    return (
      <div className="about-page">
        <section className="about-header">
          <div className="container">
            <h1>{t('about.title')}</h1>
            <div className="error-message">
              Erro ao carregar página. Tente novamente mais tarde.
            </div>
          </div>
        </section>
      </div>
    )
  }

  return (
    <div className="about-page">
      <section className="about-header">
        <div className="container">
          <p className="about-intro">{t('about.intro')}</p>
        </div>
      </section>

      <div className="container about-content">
        {/* Biografia */}
        {about.bio && (
          <section className="about-section">
            <h2>Meu Percurso</h2>
            <p>{getLocalizedString(about.bio, i18n.language)}</p>
          </section>
        )}

        <div className="about-grid">
          {/* Experiência */}
          {about.experience && about.experience.length > 0 && (
            <section className="about-section">
              <h2>{t('about.experience')}</h2>
              <ul className="experience-list">
                {about.experience.map(exp => (
                  <li key={exp._key}>
                    <strong>{exp.company}</strong> - {exp.position}
                    <span className="date">
                      {exp.startDate} {exp.endDate ? `- ${exp.endDate}` : '- Presente'}
                    </span>
                    {exp.description && (
                      <p>{getLocalizedString(exp.description, i18n.language)}</p>
                    )}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Habilidades */}
          {about.skills && about.skills.length > 0 && (
            <section className="about-section">
              <h2>{t('about.skills')}</h2>
              <div className="skills-grid">
                {Object.entries(
                  about.skills.reduce((acc, skill) => {
                    if (!acc[skill.category]) acc[skill.category] = [];
                    acc[skill.category].push(skill.name);
                    return acc;
                  }, {} as Record<string, string[]>)
                ).map(([category, skills]) => (
                  <div key={category} className="skills-category">
                    <h3>{category}</h3>
                    <ul>
                      {skills.map((skill, idx) => (
                        <li key={idx}>{skill}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* CTA para Download CV */}
        <section className="cv-section">
          <h2>Quer saber mais?</h2>
          <p>Confira meu CV completo para mais detalhes</p>
          <a href="/CV.pdf" download className="cv-button">
            {t('about.downloadCV')}
          </a>
        </section>
      </div>
    </div>
  )
}

export default About
