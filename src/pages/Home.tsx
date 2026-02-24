import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useFeaturedProjects } from '@/hooks/useProjects'
import { urlForOptimized } from '@/lib/sanityClient'
import { getLocalizedString } from '@/utils/i18n'
import './Home.css'
import { ProjectCard } from '@/components/ProjectCard'

export function Home() {
  const navigate = useNavigate()
  const { t, i18n } = useTranslation()
  const { data: projects, isLoading, error } = useFeaturedProjects(3)

  return (
    <>
      {/* Hero Section */}
      <section>
        <h1 className="hero-title">{t('home.title')}</h1>
        <p className="hero-description">{t('home.description')}</p>
        <ul className="hero-social-links">
          <li><a href="#">LinkedIn</a></li>
          <li><a href="#">Behance</a></li>
          <li><a href="#">Dribbble</a></li>
          <li><a href="#">Github</a></li>
        </ul>
        <button className='hero-btn primary'>Contato</button>
        <button className='hero-btn secondary'>Currículo</button>
      </section>

      {/* Featured Projects Section */}
      <section className='breakout'>
        <h2 className="section-title">{t('home.featured')}</h2>

          {isLoading && (
            <div className="projects-grid">
              {[1, 2, 3].map(i => (
                <div key={i} className="project-card skeleton">
                  <div className="project-image"></div>
                  <div className="project-info">
                    <div className="skeleton-text"></div>
                    <div className="skeleton-text"></div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {error && (
            <div className="error-message">
              Erro ao carregar projetos. Tente novamente mais tarde.
            </div>
          )}

          {!isLoading && !error && (
            <div className="projects-grid">
              {projects.map(project => (
                <ProjectCard
                  key={project._id}
                  thumbnail={project.image ? urlForOptimized(project.image.asset, 400) : ''}
                  thumbnailAlt={project.image?.alt || getLocalizedString(project.title, i18n.language)}
                  title={getLocalizedString(project.title, i18n.language)}
                  tags={project.tags || []}
                  shortDescription={getLocalizedString(project.description, i18n.language)}
                  link={`/projetos/${project.slug.current}`}
                />
              ))}
            </div>
          )}
      </section>
    </>

  )
}

export default Home
