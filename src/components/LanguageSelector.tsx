import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useClickOutside } from '@/hooks/useClickOutside'
import { useFocusTrap } from '@/hooks/useFocusTrap'
import { Translate, CaretDown } from 'phosphor-react'
import './LanguageSelector.css'
import '../index.css'

const languageOptions = [
  { code: 'pt', label: 'Português', flag: '🇧🇷' },
  { code: 'en', label: 'English', flag: '🇬🇧' },
]

export function LanguageSelector() {
  const { i18n } = useTranslation()
  const [isOpen, setIsOpen] = useState(false)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const clickOutsideRef = useClickOutside(() => setIsOpen(false))
  const focusTrapRef = useFocusTrap({ 
    isActive: isOpen, 
    onClose: () => setIsOpen(false) 
  })

  const currentIndex = languageOptions.findIndex(opt => opt.code === i18n.language)

  const handleSelect = (code: string) => {
    i18n.changeLanguage(code)
    setIsOpen(false)
  }

  const handleMouseEnter = (index: number) => {
    setHoveredIndex(index)
  }

  const handleMouseLeave = () => {
    setHoveredIndex(null)
  }

  return (
    <div ref={clickOutsideRef} className="language-selector">
      <button
        className="selector-button secondary"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Selecionar idioma"
        aria-expanded={isOpen}
      >
        <Translate size={20} weight="fill" />
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
          <span className="dropdown-label">Idioma</span>
          {languageOptions.map((option, index) => (
            <button
              key={option.code}
              className={`dropdown-item ${i18n.language === option.code ? 'active' : ''}`}
              onClick={() => handleSelect(option.code)}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
              role="option"
              aria-selected={i18n.language === option.code}
            >
              <span className="language-flag">{option.flag}</span>
              <span>{option.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default LanguageSelector
