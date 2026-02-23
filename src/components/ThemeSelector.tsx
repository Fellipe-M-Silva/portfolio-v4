import { useState, useRef, useEffect } from 'react'
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
  const [focusedIndex, setFocusedIndex] = useState<number>(-1)
  const clickOutsideRef = useClickOutside(() => handleClose())
  const focusTrapRef = useFocusTrap({ 
    isActive: isOpen, 
    onClose: () => handleClose() 
  })
  const buttonRef = useRef<HTMLButtonElement>(null)
  const optionRefs = useRef<(HTMLButtonElement | null)[]>([])

  const currentIndex = themeOptions.findIndex(opt => opt.value === theme)

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

  const handleSelect = (newTheme: Theme) => {
    setTheme(newTheme)
    handleClose()
  }

  // Navegação circular
  const getNextIndex = (currentIdx: number, direction: 1 | -1): number => {
    const nextIndex = currentIdx + direction
    if (nextIndex >= themeOptions.length) return 0
    if (nextIndex < 0) return themeOptions.length - 1
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
        setFocusedIndex(themeOptions.length - 1)
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
        setFocusedIndex(themeOptions.length - 1)
        break
      case 'Enter':
      case ' ':
        e.preventDefault()
        handleSelect(themeOptions[index].value)
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
    <div ref={clickOutsideRef} className="theme-selector">
      <button
        ref={buttonRef}
        id="theme-selector-button"
        className="selector-button secondary" 
        onClick={handleOpen}
        onKeyDown={handleButtonKeyDown}
        aria-label="Selecionar tema"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-controls="theme-listbox"
      >
        {theme === 'light' && <Sun size={20} weight="fill" aria-hidden="true" />}
        {theme === 'dark' && <Moon size={20} weight="fill" aria-hidden="true" />}
        {theme === 'system' && <Desktop size={20} weight="fill" aria-hidden="true" />}
        <CaretDown size={16} weight="bold" className="chevron" aria-hidden="true" />
      </button>

      {isOpen && (
        <div 
          ref={focusTrapRef}
          id="theme-listbox"
          className="dropdown-menu" 
          role="listbox"
          aria-labelledby="theme-selector-button"
          aria-activedescendant={focusedIndex >= 0 ? `theme-option-${focusedIndex}` : undefined}
          style={{
            '--active-index': focusedIndex >= 0 ? focusedIndex : currentIndex,
          } as React.CSSProperties}
        >
          <span className="dropdown-label" aria-hidden="true">Tema</span>
          {themeOptions.map((option, index) => (
            <button
              key={option.value}
              id={`theme-option-${index}`}
              ref={el => optionRefs.current[index] = el}
              className={`dropdown-item ${theme === option.value ? 'active' : ''}`}
              onClick={() => handleSelect(option.value)}
              onKeyDown={(e) => handleOptionKeyDown(e, index)}
              onMouseEnter={() => setFocusedIndex(index)}
              role="option"
              aria-selected={theme === option.value}
              tabIndex={focusedIndex === index ? 0 : -1}
            >
              {option.value === 'light' && <Sun size={20} weight={theme === option.value ? 'fill' : 'regular'} aria-hidden="true" />}
              {option.value === 'dark' && <Moon size={20} weight={theme === option.value ? 'fill' : 'regular'} aria-hidden="true" />}
              {option.value === 'system' && <Desktop size={20} weight={theme === option.value ? 'fill' : 'regular'} aria-hidden="true" />}
              <span>{option.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default ThemeSelector
