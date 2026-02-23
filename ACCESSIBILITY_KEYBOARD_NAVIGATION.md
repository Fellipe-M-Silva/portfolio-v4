# 🎹 Implementação de Navegação por Teclado Completa

Este documento mostra como implementar navegação por teclado completa nos dropdowns (ThemeSelector e LanguageSelector) seguindo as [melhores práticas ARIA para Listbox](https://www.w3.org/WAI/ARIA/apg/patterns/listbox/).

## 📋 Comportamento Esperado

### Quando o dropdown está fechado:

- **Enter / Space**: Abre o dropdown
- **Arrow Down**: Abre o dropdown e foca na primeira opção
- **Arrow Up**: Abre o dropdown e foca na última opção

### Quando o dropdown está aberto:

- **Arrow Down**: Move foco para próxima opção (circular)
- **Arrow Up**: Move foco para opção anterior (circular)
- **Home**: Move foco para primeira opção
- **End**: Move foco para última opção
- **Enter / Space**: Seleciona a opção focada e fecha
- **Escape**: Fecha o dropdown sem selecionar
- **Tab**: Fecha o dropdown e move foco para próximo elemento

## 🔧 Implementação no ThemeSelector

```typescript
import { useState, useRef, useEffect } from 'react'
import { useTheme, type Theme } from '@/hooks/useTheme'
import { useClickOutside } from '@/hooks/useClickOutside'
import { useFocusTrap } from '@/hooks/useFocusTrap'
import { Sun, Moon, Desktop, CaretDown } from 'phosphor-react'
import './ThemeSelector.css'

const themeOptions: { value: Theme; label: string }[] = [
  { value: 'light', label: 'Claro' },
  { value: 'dark', label: 'Escuro' },
  { value: 'system', label: 'Sistema' },
]

export function ThemeSelector() {
  const { theme, setTheme } = useTheme()
  const [isOpen, setIsOpen] = useState(false)
  const [focusedIndex, setFocusedIndex] = useState<number>(-1)
  const clickOutsideRef = useClickOutside(() => setIsOpen(false))
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

  const handleSelect = (newTheme: Theme, shouldClose = true) => {
    setTheme(newTheme)
    if (shouldClose) {
      handleClose()
    }
  }

  // Navegação circular
  const getNextIndex = (currentIndex: number, direction: 1 | -1): number => {
    const nextIndex = currentIndex + direction
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
        handleOpen()
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
        // Deixa o comportamento padrão fechar o dropdown
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
              {option.value === 'light' && (
                <Sun size={20} weight={theme === option.value ? 'fill' : 'regular'} aria-hidden="true" />
              )}
              {option.value === 'dark' && (
                <Moon size={20} weight={theme === option.value ? 'fill' : 'regular'} aria-hidden="true" />
              )}
              {option.value === 'system' && (
                <Desktop size={20} weight={theme === option.value ? 'fill' : 'regular'} aria-hidden="true" />
              )}
              <span>{option.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default ThemeSelector
```

## 🔑 Principais Mudanças

### 1. **Estado de Foco**

```typescript
const [focusedIndex, setFocusedIndex] = useState<number>(-1);
```

- Rastreia qual opção está focada
- `-1` = nenhuma opção focada (dropdown fechado)

### 2. **Refs para Elementos**

```typescript
const buttonRef = useRef<HTMLButtonElement>(null);
const optionRefs = useRef<(HTMLButtonElement | null)[]>([]);
```

- `buttonRef`: Referência ao botão para retornar foco ao fechar
- `optionRefs`: Array de refs para cada opção

### 3. **Foco Programático**

```typescript
useEffect(() => {
	if (isOpen && focusedIndex >= 0) {
		optionRefs.current[focusedIndex]?.focus();
	}
}, [focusedIndex, isOpen]);
```

- Move o foco visual quando `focusedIndex` muda

### 4. **Navegação Circular**

```typescript
const getNextIndex = (currentIndex: number, direction: 1 | -1): number => {
	const nextIndex = currentIndex + direction;
	if (nextIndex >= themeOptions.length) return 0;
	if (nextIndex < 0) return themeOptions.length - 1;
	return nextIndex;
};
```

- Arrow Down na última opção volta para a primeira
- Arrow Up na primeira opção vai para a última

### 5. **ARIA Melhorado**

```typescript
aria-activedescendant={focusedIndex >= 0 ? `theme-option-${focusedIndex}` : undefined}
tabIndex={focusedIndex === index ? 0 : -1}
```

- `aria-activedescendant`: Informa leitores de tela qual opção está focada
- `tabIndex`: Apenas a opção focada pode receber foco de teclado

## 🎨 Aplicar em LanguageSelector

A mesma lógica pode ser aplicada no `LanguageSelector.tsx`:

```typescript
// Substituir os mesmos padrões:
// 1. Adicionar focusedIndex state
// 2. Adicionar refs
// 3. Adicionar handlers de teclado
// 4. Adicionar useEffect para foco
// 5. Atualizar ARIA attributes
```

## 🧪 Testando

### Checklist de Testes

- [ ] **Enter/Space no botão** - Abre o dropdown
- [ ] **Arrow Down no botão** - Abre e foca primeira opção
- [ ] **Arrow Up no botão** - Abre e foca última opção
- [ ] **Arrow Down nas opções** - Navega para próxima (circular)
- [ ] **Arrow Up nas opções** - Navega para anterior (circular)
- [ ] **Home** - Vai para primeira opção
- [ ] **End** - Vai para última opção
- [ ] **Enter/Space em opção** - Seleciona e fecha
- [ ] **Escape** - Fecha sem selecionar
- [ ] **Tab** - Fecha e move para próximo elemento
- [ ] **Click fora** - Fecha o dropdown
- [ ] **Mouse hover** - Atualiza foco visual

### Com Leitor de Tela

- [ ] Botão anuncia "Selecionar tema, botão, recolhido/expandido"
- [ ] Ao abrir, anuncia opções disponíveis
- [ ] Ao navegar, anuncia cada opção
- [ ] Opção selecionada é identificada
- [ ] Ao fechar, foco retorna ao botão

## 📚 Referências

- [WAI-ARIA Authoring Practices: Listbox](https://www.w3.org/WAI/ARIA/apg/patterns/listbox/)
- [WAI-ARIA Authoring Practices: Combobox](https://www.w3.org/WAI/ARIA/apg/patterns/combobox/)
- [Inclusive Components: Menus & Menu Buttons](https://inclusive-components.design/menus-menu-buttons/)
- [MDN: Keyboard-navigable JavaScript widgets](https://developer.mozilla.org/en-US/docs/Web/Accessibility/Keyboard-navigable_JavaScript_widgets)

## 🚀 Próximos Passos

1. Implementar no `ThemeSelector.tsx`
2. Implementar no `LanguageSelector.tsx`
3. Testar com teclado
4. Testar com leitores de tela (NVDA, VoiceOver)
5. Adicionar testes automatizados (jest-axe)
