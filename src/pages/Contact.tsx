import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { trackEvent } from '@/utils/analytics'
import './Contact.css'

export function Contact() {
  const { t } = useTranslation()
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormState(prev => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      // TODO: Integrar com backend para enviar email
      // Por enquanto, simular sucesso após 1s
      await new Promise(resolve => setTimeout(resolve, 1000))

      trackEvent('contact_form_submitted', {
        subject: formState.subject,
      })

      setSubmitStatus('success')
      setFormState({
        name: '',
        email: '',
        subject: '',
        message: '',
      })

      // Limpar mensagem de sucesso após 5s
      setTimeout(() => setSubmitStatus('idle'), 5000)
    } catch (error) {
      setSubmitStatus('error')
      setTimeout(() => setSubmitStatus('idle'), 5000)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="contact-page">
      <section className="contact-header">
        <div className="container">
          <h1>{t('contact.title')}</h1>
          <p className="contact-intro">{t('contact.intro')}</p>
        </div>
      </section>

      <div className="container contact-content">
        <div className="contact-grid">
          {/* Informações de Contato */}
          <section className="contact-info">
            <h2>{t('contact.infoTitle')}</h2>

            <div className="info-item">
              <h3>{t('contact.email')}</h3>
              <a href="mailto:seu.email@exemplo.com" className="info-link">
                seu.email@exemplo.com
              </a>
            </div>

            <div className="info-item">
              <h3>{t('contact.phone')}</h3>
              <a href="tel:+5511999999999" className="info-link">
                +55 (11) 99999-9999
              </a>
            </div>

            <div className="info-item">
              <h3>{t('contact.location')}</h3>
              <p>São Paulo, Brazil</p>
            </div>

            <div className="info-item">
              <h3>{t('contact.social')}</h3>
              <div className="social-links">
                <a href="https://linkedin.com" className="social-link" aria-label="LinkedIn">
                  LinkedIn
                </a>
                <a href="https://twitter.com" className="social-link" aria-label="Twitter">
                  Twitter
                </a>
                <a href="https://github.com" className="social-link" aria-label="GitHub">
                  GitHub
                </a>
              </div>
            </div>
          </section>

          {/* Formulário de Contato */}
          <section className="contact-form-section">
            <h2>{t('contact.sendMessage')}</h2>

            {submitStatus === 'success' && (
              <div className="form-message success" role="alert">
                {t('contact.messageSent')}
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="form-message error" role="alert">
                {t('contact.messageError')}
              </div>
            )}

            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-group">
                <label htmlFor="name">{t('contact.formName')}</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formState.name}
                  onChange={handleChange}
                  required
                  placeholder={t('contact.formNamePlaceholder')}
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">{t('contact.formEmail')}</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formState.email}
                  onChange={handleChange}
                  required
                  placeholder={t('contact.formEmailPlaceholder')}
                />
              </div>

              <div className="form-group">
                <label htmlFor="subject">{t('contact.formSubject')}</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formState.subject}
                  onChange={handleChange}
                  required
                  placeholder={t('contact.formSubjectPlaceholder')}
                />
              </div>

              <div className="form-group">
                <label htmlFor="message">{t('contact.formMessage')}</label>
                <textarea
                  id="message"
                  name="message"
                  value={formState.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  placeholder={t('contact.formMessagePlaceholder')}
                />
              </div>

              <button
                type="submit"
                className="form-submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? t('contact.formSending') : t('contact.formSubmit')}
              </button>
            </form>
          </section>
        </div>
      </div>
    </div>
  )
}

export default Contact
