
import './ProjectFilters.css';
import { useTranslation } from 'react-i18next';
import { SquaresFour, List } from 'phosphor-react';

interface CategoryOption {
  value: string;
  label: string;
}

interface ProjectFiltersProps {
  categories: CategoryOption[];
  selectedCategory: string;
  onCategoryChange: (cat: string) => void;
  view: 'grid' | 'list';
  onViewChange: (view: 'grid' | 'list') => void;
}

export function ProjectFilters({
  categories,
  selectedCategory,
  onCategoryChange,
  view,
  onViewChange,
}: ProjectFiltersProps) {
  const { t } = useTranslation();

  return (
    <div className="project-filters">
      <div className="chips-row">
        <button
          className={`chip${selectedCategory === '' ? ' active' : ''}`}
          onClick={() => onCategoryChange('')}
          type="button"
        >
          {t('projects.all')}
        </button>
        {categories.map((cat) => (
          <button
            key={cat.value}
            className={`chip${selectedCategory === cat.value ? ' active' : ''}`}
            onClick={() => onCategoryChange(cat.value)}
            type="button"
          >
            {cat.label}
          </button>
        ))}
      </div>
      <div className="view-toggle">
        <button
          className={`toggle-btn${view === 'grid' ? ' active' : ''}`}
          onClick={() => onViewChange('grid')}
          aria-label={t('projects.viewGrid') || 'Visualizar em grade'}
          type="button"
        >
          <SquaresFour size={22} weight={view === 'grid' ? 'fill' : 'regular'} aria-hidden />
        </button>
        <button
          className={`toggle-btn${view === 'list' ? ' active' : ''}`}
          onClick={() => onViewChange('list')}
          aria-label={t('projects.viewList') || 'Visualizar em lista'}
          type="button"
        >
          <List size={22} weight={view === 'list' ? 'fill' : 'regular'} aria-hidden />
        </button>
      </div>
    </div>
  );
}
