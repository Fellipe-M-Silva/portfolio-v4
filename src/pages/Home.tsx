import { useNavigate, Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useFeaturedProjects } from '@/hooks/useProjects'
import { urlForOptimized } from '@/lib/sanityClient'
import { getLocalizedString } from '@/utils/i18n'
import './Home.css'

export function Home() {
  const navigate = useNavigate()
  const { t, i18n } = useTranslation()
  const { data: projects, isLoading, error } = useFeaturedProjects(3)

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">{t('home.title')}</h1>
          <p className="hero-description">{t('home.description')}</p>
          <button
            className="hero-cta"
            onClick={() => navigate('/projetos')}
          >
            {t('home.cta')}
          </button>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="featured-projects">
        <div className="container">
          <div className="section-header">
            <h2>{t('home.featured')}</h2>
          </div>

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
                <Link
                  key={project._id}
                  to={`/projetos/${project.slug.current}`}
                  className="project-card"
                >
                  <div className="project-image">
                    {project.image ? (
                      <img
                        src={urlForOptimized(project.image.asset, 400)}
                        alt={project.image.alt || getLocalizedString(project.title, i18n.language)}
                        loading="lazy"
                      />
                    ) : (
                      <div className="no-image">[Sem imagem]</div>
                    )}
                  </div>
                  <div className="project-info">
                    <h3>{getLocalizedString(project.title, i18n.language)}</h3>
                    <p>{getLocalizedString(project.description, i18n.language)}</p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <h2>Pronto para conversar?</h2>
          <p>Vamos discutir como posso ajudar no seu projeto</p>
          <Link to="/contato" className="cta-button">
            Entre em contato
          </Link>
        </div>
      </section>
    </div>
  )
}

export default Home
