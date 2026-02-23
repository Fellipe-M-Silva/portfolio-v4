import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useClickOutside } from '@/hooks/useClickOutside'
import { useFocusTrap } from '@/hooks/useFocusTrap'
import { List, X } from 'phosphor-react'
import './MobileMenu.css'
import '../index.css'

export function MobileMenu() {
  const { t } = useTranslation()
  const location = useLocation()
  const [isOpen, setIsOpen] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)
  const [isClosing, setIsClosing] = useState(false)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const clickOutsideRef = useClickOutside(() => handleClose())
  const focusTrapRef = useFocusTrap({ 
    isActive: isAnimating && !isClosing, 
    onClose: () => handleClose() 
  })

  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/'
    }
    return location.pathname.startsWith(path)
  }

  const navLinks = [
    { path: '/', label: t('nav.home') },
    { path: '/projetos', label: t('nav.projects') },
    { path: '/sobre', label: t('nav.about') },
    { path: '/contato', label: t('nav.contact') },
  ]

  const currentIndex = navLinks.findIndex(link => isActive(link.path))

  const handleOpen = () => {
    setIsOpen(true)
    setIsClosing(false)
    // Pequeno delay para permitir que o browser renderize antes de aplicar a animação
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setIsAnimating(true)
      })
    })
  }

  const handleClose = () => {
    if (!isClosing && isOpen) {
      setIsClosing(true)
      setTimeout(() => {
        setIsOpen(false)
        setIsAnimating(false)
        setIsClosing(false)
      }, 250) // Duração da animação
    }
  }

  const handleLinkClick = () => {
    handleClose()
  }

  const handleMouseEnter = (index: number) => {
    setHoveredIndex(index)
  }

  const handleMouseLeave = () => {
    setHoveredIndex(null)
  }

  return (
    <>
      <button
        className="mobile-menu-button secondary"
        onClick={handleOpen}
        aria-label="Abrir menu"
        aria-expanded={isOpen}
      >
        <List size={20} weight="bold" />
      </button>

      {isOpen && (
        <>
          <div 
            className={`mobile-menu-overlay ${isAnimating && !isClosing ? 'open' : ''} ${isClosing ? 'closing' : ''}`} 
            onClick={handleClose}
            aria-hidden="true"
          />
          <div ref={clickOutsideRef} className="mobile-menu-wrapper">
            <div 
              ref={focusTrapRef}
              className={`mobile-menu-container ${isAnimating && !isClosing ? 'open' : ''} ${isClosing ? 'closing' : ''}`}
              role="dialog"
              aria-modal="true"
              aria-labelledby="mobile-menu-title"
            >
              <div className="mobile-menu-header">
                <h2 id="mobile-menu-title" className="mobile-menu-label">Menu</h2>
                <button
                  className="mobile-menu-close secondary"
                  onClick={handleClose}
                  aria-label="Fechar menu"
                >
                  <X size={20} weight="bold" aria-hidden="true" />
                </button>
              </div>

              <nav 
                className="mobile-menu-nav"
                aria-label="Navegação móvel"
                style={{
                  '--active-index': hoveredIndex !== null ? hoveredIndex : currentIndex,
                } as React.CSSProperties}
              >
                {navLinks.map((link, index) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`mobile-menu-link ${isActive(link.path) ? 'active' : ''}`}
                    onClick={handleLinkClick}
                    onMouseEnter={() => handleMouseEnter(index)}
                    onMouseLeave={handleMouseLeave}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        </>
      )}
    </>
  )
}

export default MobileMenu
