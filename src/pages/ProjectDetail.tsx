import { useNavigate, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useProject } from '@/hooks/useProjects'
import { urlForOptimized } from '@/lib/sanityClient'
import { getLocalizedString } from '@/utils/i18n'
import './ProjectDetail.css'

export function ProjectDetail() {
  const navigate = useNavigate()
  const { slug } = useParams<{ slug: string }>()
  const { t, i18n } = useTranslation()
  const { data: project, isLoading, error } = useProject(slug)

  if (isLoading) {
    return (
      <div className="project-detail">
        <div className="project-header-detail">
          <div className="container">
            <button
              className="back-button"
              onClick={() => navigate('/projetos')}
            >
              ← {t('project.backToProjects')}
            </button>
            <div className="skeleton-text"></div>
            <div className="skeleton-text" style={{ width: '70%' }}></div>
          </div>
        </div>
        <div className="container project-content">
          <div className="skeleton-box" style={{ height: '200px' }}></div>
        </div>
      </div>
    )
  }

  if (error || !project) {
    return (
      <div className="project-detail">
        <div className="project-header-detail">
          <div className="container">
            <button
              className="back-button"
              onClick={() => navigate('/projetos')}
            >
              ← {t('project.backToProjects')}
            </button>
            <div className="error-message">
              Erro ao carregar o projeto. Tente novamente mais tarde.
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      <div>
        <button
          className="back-button"
          onClick={() => navigate('/projetos')}
        >
          ← {t('project.backToProjects')}
        </button>
        <h1>{getLocalizedString(project.title, i18n.language)}</h1>
        <p className="project-subtitle">{getLocalizedString(project.description, i18n.language)}</p>
      </div>

      <div className="container project-content">
        {/* Project Meta Information */}
        <aside className="project-meta">
          <div className="meta-item">
            <h3>{t('project.teamSize')}</h3>
            <p>{project.teamSize || 'N/A'}</p>
          </div>
          <div className="meta-item">
            <h3>{t('project.duration')}</h3>
            <p>{project.duration || 'N/A'}</p>
          </div>
          <div className="meta-item">
            <h3>{t('project.role')}</h3>
            <p>{project.role || 'N/A'}</p>
          </div>
        </aside>

        {/* Project Main Content */}
        <main className="project-main">
          {/* Cover Image */}
          <figure className="project-cover">
            <div className="project-image-detail">
              {project.image ? (
                <img
                  src={urlForOptimized(project.image.asset, 1200, 600)}
                  alt={project.image.alt || getLocalizedString(project.title, i18n.language)}
                  loading="lazy"
                />
              ) : (
                <div className="no-image">[Sem imagem]</div>
              )}
            </div>
          </figure>

          {/* Challenge Section */}
          {project.challenge && (
            <section className="content-section">
              <h2>{t('project.challengeTitle')}</h2>
              <p>{getLocalizedString(project.challenge, i18n.language)}</p>
            </section>
          )}

          {/* Solution Section */}
          {project.solution && (
            <section className="content-section">
              <h2>{t('project.solutionTitle')}</h2>
              <p>{getLocalizedString(project.solution, i18n.language)}</p>
            </section>
          )}

          {/* Results Section */}
          {project.results && (
            <section className="content-section">
              <h2>{t('project.resultsTitle')}</h2>
              <p>{getLocalizedString(project.results, i18n.language)}</p>
            </section>
          )}
        </main>
      </div>

      {/* Next Project CTA */}
      <section className="next-project">
        <div className="container">
          <button
            className="next-button"
            onClick={() => navigate('/projetos')}
          >
            {t('project.nextProject')} →
          </button>
        </div>
      </section>
    </>
  )
}

export default ProjectDetail
