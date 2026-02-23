import { useState, useRef, useEffect } from 'react'
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
  const [focusedIndex, setFocusedIndex] = useState<number>(-1)
  const clickOutsideRef = useClickOutside(() => handleClose())
  const focusTrapRef = useFocusTrap({ 
    isActive: isOpen, 
    onClose: () => handleClose() 
  })
  const buttonRef = useRef<HTMLButtonElement>(null)
  const optionRefs = useRef<(HTMLButtonElement | null)[]>([])

  const currentIndex = languageOptions.findIndex(opt => opt.code === i18n.language)

  // Foca na opção quando o índice muda
  useEffect(() => {
    if (isOpen && focusedIndex >= 0) {
      optionRefs.current[focusedIndex]?.focus()
    }
  }, [focusedIndex, isOpen])

  const handleOpen = () => {
    setIsOpen(true)
    setFocusedIndex(currentIndex)
  }

  const handleClose = () => {
    setIsOpen(false)
    setFocusedIndex(-1)
    buttonRef.current?.focus()
  }

  const handleSelect = (code: string) => {
    i18n.changeLanguage(code)
    handleClose()
  }

  // Navegação circular
  const getNextIndex = (currentIdx: number, direction: 1 | -1): number => {
    const nextIndex = currentIdx + direction
    if (nextIndex >= languageOptions.length) return 0
    if (nextIndex < 0) return languageOptions.length - 1
    return nextIndex
  }

  // Handlers de teclado para o botão
  const handleButtonKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        handleOpen()
        setFocusedIndex(0)
        break
      case 'ArrowUp':
        e.preventDefault()
        handleOpen()
        setFocusedIndex(languageOptions.length - 1)
        break
      case 'Enter':
      case ' ':
        e.preventDefault()
        if (!isOpen) handleOpen()
        break
    }
  }

  // Handlers de teclado para as opções
  const handleOptionKeyDown = (e: React.KeyboardEvent, index: number) => {
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        setFocusedIndex(getNextIndex(index, 1))
        break
      case 'ArrowUp':
        e.preventDefault()
        setFocusedIndex(getNextIndex(index, -1))
        break
      case 'Home':
        e.preventDefault()
        setFocusedIndex(0)
        break
      case 'End':
        e.preventDefault()
        setFocusedIndex(languageOptions.length - 1)
        break
      case 'Enter':
      case ' ':
        e.preventDefault()
        handleSelect(languageOptions[index].code)
        break
      case 'Escape':
        e.preventDefault()
        handleClose()
        break
      case 'Tab':
        handleClose()
        break
    }
  }

  return (
    <div ref={clickOutsideRef} className="language-selector">
      <button
        ref={buttonRef}
        id="language-selector-button"
        className="selector-button secondary"
        onClick={handleOpen}
        onKeyDown={handleButtonKeyDown}
        aria-label="Selecionar idioma"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-controls="language-listbox"
      >
        <Translate size={20} weight="fill" aria-hidden="true" />
        <CaretDown size={16} weight="bold" className="chevron" aria-hidden="true" />
      </button>

      {isOpen && (
        <div 
          ref={focusTrapRef}
          id="language-listbox"
          className="dropdown-menu" 
          role="listbox"
          aria-labelledby="language-selector-button"
          aria-activedescendant={focusedIndex >= 0 ? `language-option-${focusedIndex}` : undefined}
          style={{
            '--active-index': focusedIndex >= 0 ? focusedIndex : currentIndex,
          } as React.CSSProperties}
        >
          <span className="dropdown-label" aria-hidden="true">Idioma</span>
          {languageOptions.map((option, index) => (
            <button
              key={option.code}
              id={`language-option-${index}`}
              ref={el => optionRefs.current[index] = el}
              className={`dropdown-item ${i18n.language === option.code ? 'active' : ''}`}
              onClick={() => handleSelect(option.code)}
              onKeyDown={(e) => handleOptionKeyDown(e, index)}
              onMouseEnter={() => setFocusedIndex(index)}
              role="option"
              aria-selected={i18n.language === option.code}
              tabIndex={focusedIndex === index ? 0 : -1}
            >
              <span className="language-flag" aria-hidden="true">{option.flag}</span>
              <span>{option.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default LanguageSelector
