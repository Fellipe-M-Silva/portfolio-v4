import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './ProjectCard.css';


export interface ProjectCardTag {
  _id: string;
  title: { pt: string; en: string };
  slug: { current: string };
}

export interface ProjectCardProps {
  thumbnail: string;
  thumbnailAlt?: string;
  title: string;
  tags: ProjectCardTag[];
  shortDescription: string;
  link?: string;
  externalRepo?: string;
  liveDemo?: string;
  className?: string;
}

export function ProjectCard({
  thumbnail,
  thumbnailAlt,
  title,
  tags,
  shortDescription,
  link,
  externalRepo,
  liveDemo,
  className = '',
}: ProjectCardProps) {
  const { t, i18n } = useTranslation();
  const CardContent = (
    <div className={`project-card group ${className}`.trim()}>
      <div className="project-image">
        {thumbnail ? (
          <img src={thumbnail} alt={thumbnailAlt || title} loading="lazy" />
        ) : (
          <div className="no-image">[Sem imagem]</div>
        )}
      </div>
      <div className="project-info">
        <h3>{title}</h3>
        {tags && tags.length > 0 && (
          <ul className="project-tags">
            {tags.map(tag => {
              const tagLabel = tag.title?.[i18n.language] || tag.title?.pt || tag.title?.en || tag.slug.current;
              return (
                <li key={tag._id}><span className="mono">{tagLabel}</span></li>
              );
            })}
          </ul>
        )}
        <p>{shortDescription}</p>
        {(link || externalRepo || liveDemo) && (
          <div className="project-actions">
            {link && (
              <span className="project-btn secondary" tabIndex={0} role="button">
                {t('projects.viewProject')}
              </span>
            )}
            {externalRepo && (
              <a
                className="project-btn secondary"
                href={externalRepo}
                target="_blank"
                rel="noopener noreferrer"
                tabIndex={0}
              >
                {i18n.language === 'pt' ? 'Repositório' : 'Repository'}
              </a>
            )}
            {liveDemo && (
              <a
                className="project-btn secondary"
                href={liveDemo}
                target="_blank"
                rel="noopener noreferrer"
                tabIndex={0}
              >
                {i18n.language === 'pt' ? 'Live Demo' : 'Live Demo'}
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );

  return link ? (
    <Link to={link} className="project-card-link" tabIndex={-1} aria-label={title}>
      {/* Não renderiza botão interno se já for link externo */}
      {CardContent}
    </Link>
  ) : CardContent;
}
