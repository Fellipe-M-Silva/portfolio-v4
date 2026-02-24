import './ProjectCardList.css';

export interface ProjectCardListProps {
  projects: Array<{
    _id: string;
    thumbnail: string;
    thumbnailAlt?: string;
    title: string;
    tags: string[];
    shortDescription: string;
    link?: string;
  }>;
}

export function ProjectCardList({ projects }: ProjectCardListProps) {
  return (
    <ul className="project-list-view">
      {projects.map(project => (
        <li key={project._id} className="project-list-item">
          <div className="project-list-thumb">
            {project.thumbnail ? (
              <img src={project.thumbnail} alt={project.thumbnailAlt || project.title} loading="lazy" />
            ) : (
              <div className="no-image">[Sem imagem]</div>
            )}
          </div>
          <div className="project-list-info">
            <h3>{project.title}</h3>
            {project.tags && project.tags.length > 0 && (
              <ul className="project-tags">
                {project.tags.map(tag => (
                  <li key={tag}><span className="mono">{tag}</span></li>
                ))}
              </ul>
            )}
            <p>{project.shortDescription}</p>
            {project.link && (
              <a href={project.link} className="project-list-link" target="_blank" rel="noopener noreferrer">Abrir</a>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
}
