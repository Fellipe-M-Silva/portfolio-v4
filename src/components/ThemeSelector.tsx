import { useState } from 'react'
import { useTheme, type Theme } from '@/hooks/useTheme'
import { useClickOutside } from '@/hooks/useClickOutside'
import { useFocusTrap } from '@/hooks/useFocusTrap'
import { Sun, Moon, Desktop, CaretDown } from 'phosphor-react'
import './ThemeSelector.css'
import '../index.css'

const themeOptions: { value: Theme; label: string }[] = [
  { value: 'light', label: 'Claro' },
  { value: 'dark', label: 'Escuro' },
  { value: 'system', label: 'Sistema' },
]

export function ThemeSelector() {
  const { theme, setTheme } = useTheme()
  const [isOpen, setIsOpen] = useState(false)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const clickOutsideRef = useClickOutside(() => setIsOpen(false))
  const focusTrapRef = useFocusTrap({ 
    isActive: isOpen, 
    onClose: () => setIsOpen(false) 
  })

  const currentIndex = themeOptions.findIndex(opt => opt.value === theme)

  const handleSelect = (newTheme: Theme) => {
    setTheme(newTheme)
    setIsOpen(false)
  }

  const handleMouseEnter = (index: number) => {
    setHoveredIndex(index)
  }

  const handleMouseLeave = () => {
    setHoveredIndex(null)
  }

  return (
    <div ref={clickOutsideRef} className="theme-selector">
      <button
        className="selector-button secondary" 
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Selecionar tema"
        aria-expanded={isOpen}
      >
        {theme === 'light' && <Sun size={20} weight="fill" />}
        {theme === 'dark' && <Moon size={20} weight="fill" />}
        {theme === 'system' && <Desktop size={20} weight="fill" />}
        <CaretDown size={16} weight="bold" className="chevron" />
      </button>

      {isOpen && (
        <div 
          ref={focusTrapRef}
          className="dropdown-menu" 
          role="listbox"
          style={{
            '--active-index': hoveredIndex !== null ? hoveredIndex : currentIndex,
          } as React.CSSProperties}
        >
          <span className="dropdown-label">Tema</span>
          {themeOptions.map((option, index) => (
            <button
              key={option.value}
              className={`dropdown-item ${theme === option.value ? 'active' : ''}`}
              onClick={() => handleSelect(option.value)}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
              role="option"
              aria-selected={theme === option.value}
            >
              {option.value === 'light' && <Sun size={20} weight={theme === option.value ? 'fill' : 'regular'} />}
              {option.value === 'dark' && <Moon size={20} weight={theme === option.value ? 'fill' : 'regular'} />}
              {option.value === 'system' && <Desktop size={20} weight={theme === option.value ? 'fill' : 'regular'} />}
              <span>{option.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default ThemeSelector
