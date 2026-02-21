import { useState } from 'react'
import { useTheme, type Theme } from '@/hooks/useTheme'
import { useClickOutside } from '@/hooks/useClickOutside'
import './ThemeSelector.css'

const themeOptions: { value: Theme; label: string }[] = [
  { value: 'light', label: 'Claro' },
  { value: 'dark', label: 'Escuro' },
  { value: 'system', label: 'Sistema' },
]

export function ThemeSelector() {
  const { theme, setTheme } = useTheme()
  const [isOpen, setIsOpen] = useState(false)
  const ref = useClickOutside(() => setIsOpen(false))

  const currentLabel = themeOptions.find(opt => opt.value === theme)?.label || 'Sistema'

  const handleSelect = (newTheme: Theme) => {
    setTheme(newTheme)
    setIsOpen(false)
  }

  return (
    <div ref={ref} className="theme-selector">
      <button
        className="selector-button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Selecionar tema"
        aria-expanded={isOpen}
      >
        {theme === 'light' && '☀️'}
        {theme === 'dark' && '🌙'}
        {theme === 'system' && '⚙️'}
        <span className="selector-label">{currentLabel}</span>
      </button>

      {isOpen && (
        <div className="dropdown-menu" role="listbox">
          {themeOptions.map(option => (
            <button
              key={option.value}
              className={`dropdown-item ${theme === option.value ? 'active' : ''}`}
              onClick={() => handleSelect(option.value)}
              role="option"
              aria-selected={theme === option.value}
            >
              {option.value === 'light' && '☀️'}
              {option.value === 'dark' && '🌙'}
              {option.value === 'system' && '⚙️'}
              <span>{option.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default ThemeSelector
