import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useProjects } from '@/hooks/useProjects'
import { urlForOptimized } from '@/lib/sanityClient'
import { getLocalizedString } from '@/utils/i18n'
import './Projects.css'

export function Projects() {
  const navigate = useNavigate()
  const { t, i18n } = useTranslation()
  const { data: projects, isLoading, error } = useProjects()

  return (
    <div className="projects-page">
      <section className="projects-header">
        <div className="container">
          <h1>{t('projects.title')}</h1>
          <p>{t('projects.description')}</p>
        </div>
      </section>

      <section className="projects-list">
        <div className="container">
          {isLoading && (
            <div className="projects-grid-full">
              {[1, 2, 3, 4].map(i => (
                <article key={i} className="project-card-full skeleton">
                  <div className="project-image-full"></div>
                  <div className="project-info-full">
                    <div className="skeleton-text"></div>
                    <div className="skeleton-text"></div>
                    <div className="skeleton-button"></div>
                  </div>
                </article>
              ))}
            </div>
          )}

          {error && (
            <div className="error-message">
              Erro ao carregar projetos. Tente novamente mais tarde.
            </div>
          )}

          {!isLoading && !error && (
            <div className="projects-grid-full">
              {projects.map((project) => (
                <article
                  key={project._id}
                  className="project-card-full"
                  onClick={() => navigate(`/projetos/${project.slug.current}`)}
                >
                  <div className="project-image-full">
                    {project.image ? (
                      <img
                        src={urlForOptimized(project.image.asset, 600)}
                        alt={project.image.alt || getLocalizedString(project.title, i18n.language)}
                        loading="lazy"
                      />
                    ) : (
                      <div className="no-image">[Sem imagem]</div>
                    )}
                  </div>
                  <div className="project-info-full">
                    <h2>{getLocalizedString(project.title, i18n.language)}</h2>
                    <p>{getLocalizedString(project.description, i18n.language)}</p>
                    <button className="project-link">
                      {t('projects.viewProject')}
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}

          {!isLoading && !error && projects.length === 0 && (
            <div className="empty-state">
              <p>{t('projects.empty') || 'Nenhum projeto encontrado'}</p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

export default Projects
