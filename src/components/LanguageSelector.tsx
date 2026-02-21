import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useClickOutside } from '@/hooks/useClickOutside'
import './LanguageSelector.css'

const languageOptions = [
  { code: 'pt', label: 'Português', flag: '🇧🇷' },
  { code: 'en', label: 'English', flag: '🇬🇧' },
]

export function LanguageSelector() {
  const { i18n } = useTranslation()
  const [isOpen, setIsOpen] = useState(false)
  const ref = useClickOutside(() => setIsOpen(false))

  const currentLang = languageOptions.find(opt => opt.code === i18n.language)
  const currentLabel = currentLang?.label || 'Português'
  const currentFlag = currentLang?.flag || '🇧🇷'

  const handleSelect = (code: string) => {
    i18n.changeLanguage(code)
    setIsOpen(false)
  }

  return (
    <div ref={ref} className="language-selector">
      <button
        className="selector-button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Selecionar idioma"
        aria-expanded={isOpen}
      >
        <span className="language-flag">{currentFlag}</span>
        <span className="selector-label">{currentLabel}</span>
      </button>

      {isOpen && (
        <div className="dropdown-menu" role="listbox">
          {languageOptions.map(option => (
            <button
              key={option.code}
              className={`dropdown-item ${i18n.language === option.code ? 'active' : ''}`}
              onClick={() => handleSelect(option.code)}
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
