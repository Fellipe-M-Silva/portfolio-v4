import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import App from './App'
import './index.css'

import ptTranslations from './locales/pt.json'
import enTranslations from './locales/en.json'

// Inicializar tema antes de renderizar
const initTheme = () => {
  const theme = (localStorage.getItem('portfolio-theme') as 'light' | 'dark' | 'system' | null) || 'system'
  const html = document.documentElement

  let effectiveTheme: 'light' | 'dark' = theme === 'system'
    ? window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    : theme

  html.setAttribute('data-theme', effectiveTheme)
  if (effectiveTheme === 'dark') {
    html.classList.add('dark-mode')
  } else {
    html.classList.add('light-mode')
  }
}

const initI18n = async () => {
  await i18n
    .use(initReactI18next)
    .init({
      resources: {
        pt: { translation: ptTranslations },
        en: { translation: enTranslations },
      },
      lng: 'pt',
      fallbackLng: 'pt',
      interpolation: {
        escapeValue: false,
      },
    })
}

initTheme()
initI18n().then(() => {
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <Router>
        <App />
      </Router>
    </React.StrictMode>,
  )
})
