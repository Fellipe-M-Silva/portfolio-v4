import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { trackEvent } from '@/utils/analytics'
import './Contact.css'
import '../index.css'

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
    <>
      <section className="contact-intro">
        <p className="intro-paragraph">
          {t('contact.introText1')}
          {' '}
          <span id="hello">{t('contact.hello')}</span>
          {t('contact.introText2')}
        </p>
        <p>{t('contact.introText3')}</p>
      </section>

      <section className='contact-form-section'>
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
          {/* <p className='braile-message' aria-hidden>⠍⠁⠝⠙⠁ ⠍⠑⠝⠎⠁⠛⠑⠍⠖</p> */}
          <p style={{fontFamily: 'var(--font-family-mono)', color: 'var(--color-text-on-primary)'}} aria-hidden>/////////////</p>
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

          <div className="form-group" id="subject-group">
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

          <div className="form-group" id="message-group">
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

          <div className="form-footer">
            <p className='lgpd-notice'>
              {t('contact.lgpdNotice')}
            </p>
          <button
            type="submit"
            className="submit-btn "
            disabled={isSubmitting}
          >
            {isSubmitting ? t('contact.formSending') : t('contact.formSubmit')}
          </button>
          </div>
        </form>
      </section>
    </>
  )
}

export default Contact
