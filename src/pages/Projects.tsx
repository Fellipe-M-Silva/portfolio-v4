import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useProjects } from '@/hooks/useProjects';
import { urlForOptimized } from '@/lib/sanityClient';
import { getLocalizedString } from '@/utils/i18n';
import { ProjectCard } from '@/components/ProjectCard';
import { ProjectFilters } from '@/components/ProjectFilters';
import { useCategories } from '@/hooks/useCategories';
import './Projects.css';


import { useState, useMemo, useEffect } from 'react';

export function Projects() {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const { data: projects, isLoading, error } = useProjects();

  // Filtros e ordenação
  const [category, setCategory] = useState('');
  const { categories, isLoading: loadingCategories } = useCategories();
  const [view, setView] = useState<'grid' | 'list'>(() => {
    if (typeof window !== 'undefined') {
      return (localStorage.getItem('projectsView') as 'grid' | 'list') || 'grid';
    }
    return 'grid';
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('projectsView', view);
    }
  }, [view]);

  // Extrair tags únicas dos projetos (usando referência)
  const availableTags = useMemo(() => {
    // Junta todas as tags referenciadas nos projetos
    const allTags = projects.flatMap(p => p.tags || []);
    // Remove duplicadas por _id
    const unique: Record<string, any> = {};
    allTags.forEach(tag => {
      if (tag && tag._id) unique[tag._id] = tag;
    });
    return Object.values(unique);
  }, [projects]);

  // Filtrar por tag
  const filtered = useMemo(() => {
    let filtered = projects;
    if (category) {
      filtered = filtered.filter(p => (p.tags || []).some(tag => tag && tag._id === category));
    }
    // Ordenação fixa: mais recente para mais antigo
    filtered = filtered.slice().sort((a, b) => (b.publishedAt || '').localeCompare(a.publishedAt || ''));
    return filtered;
  }, [projects, category, i18n.language]);

  return (
    <>
      <section>
        <h1 className='page-title'>{t('projects.title')}</h1>
        <p>{t('projects.description')}</p>
      </section>

      <section className="breakout">
        <div className="container">
          <ProjectFilters
            categories={availableTags.map(tag => ({
              value: tag._id,
              label: tag.title?.[i18n.language] || tag.title?.pt || tag.slug?.current || 'Tag'
            }))}
            selectedCategory={category}
            onCategoryChange={setCategory}
            view={view}
            onViewChange={setView}
          />

          {isLoading && (
            <div className="projects-grid-full">
              {[1, 2, 3, 4].map(i => (
                <article key={i} className="project-card-grid skeleton">
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
            <>
              {view === 'list' ? (
                <div className="projects-list-view">
                  {filtered.map((project) => (
                    <ProjectCard
                      key={project._id}
                      thumbnail={project.image ? urlForOptimized(project.image.asset, 600) : ''}
                      thumbnailAlt={project.image?.alt || getLocalizedString(project.title, i18n.language)}
                      title={getLocalizedString(project.title, i18n.language)}
                      tags={project.tags || []}
                      shortDescription={getLocalizedString(project.description, i18n.language)}
                      link={`/projetos/${project.slug.current}`}
                      className="project-card-list"
                    />
                  ))}
                </div>
              ) : (
                <div className="projects-grid-full">
                  {filtered.map((project) => (
                    <ProjectCard
                      key={project._id}
                      thumbnail={project.image ? urlForOptimized(project.image.asset, 600) : ''}
                      thumbnailAlt={project.image?.alt || getLocalizedString(project.title, i18n.language)}
                      title={getLocalizedString(project.title, i18n.language)}
                      tags={project.tags || []}
                      shortDescription={getLocalizedString(project.description, i18n.language)}
                      link={`/projetos/${project.slug.current}`}
                      className="project-card-grid"
                    />
                  ))}
                </div>
              )}
            </>
          )}

          {!isLoading && !error && filtered.length === 0 && (
            <div className="empty-state">
              <p>{t('projects.empty') || 'Nenhum projeto encontrado'}</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export default Projects
