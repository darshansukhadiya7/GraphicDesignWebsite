import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { AlertCircle, CheckCircle2, ChevronDown, Check, LoaderCircle } from 'lucide-react'
import { contactEmail, whatsappUrl } from '../data/siteData'

const serviceOptions = [
  'Logo Design & Brand Identity',
  'Social Media Creatives',
  'Packaging & Label Design',
  'Brochure & Catalogue Design',
  'Business Stationery Design',
  'Banner, Hoarding & Advertising Design',
  'Web Design',
  'Premium Printing Solutions',
  'Additional Creative Services',
]

const emailDomainSuggestions = {
  'ail.com': 'gmail.com',
  'gmai.com': 'gmail.com',
  'gmial.com': 'gmail.com',
  'gmal.com': 'gmail.com',
  'hotmai.com': 'hotmail.com',
  'hotmial.com': 'hotmail.com',
  'yaho.com': 'yahoo.com',
  'yahho.com': 'yahoo.com',
  'outlok.com': 'outlook.com',
  'outllok.com': 'outlook.com',
  'iclod.com': 'icloud.com',
}

function getEmailDomainError(email) {
  const domain = email.trim().split('@').pop().toLowerCase()
  const suggestion = Object.prototype.hasOwnProperty.call(emailDomainSuggestions, domain)
    ? emailDomainSuggestions[domain]
    : ''

  return suggestion
    ? `Check the email domain. Did you mean @${suggestion}?`
    : ''
}

export default function ContactForm() {
  const [status, setStatus] = useState({ type: 'idle', message: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [selectedService, setSelectedService] = useState('')
  const [serviceMenuOpen, setServiceMenuOpen] = useState(false)
  const [emailError, setEmailError] = useState('')

  useEffect(() => {
    if (status.type !== 'success') return undefined

    const timeoutId = window.setTimeout(() => {
      setStatus((currentStatus) =>
        currentStatus.type === 'success' ? { type: 'idle', message: '' } : currentStatus,
      )
    }, 10_000)

    return () => window.clearTimeout(timeoutId)
  }, [status.type])

  const handleSubmit = async (event) => {
    event.preventDefault()

    const form = event.currentTarget
    const nameInput = form.elements.name
    const emailInput = form.elements.email
    const phoneInput = form.elements.phone
    const name = nameInput.value.trim()
    const email = emailInput.value.trim()
    const phone = phoneInput.value.trim()

    nameInput.setCustomValidity(
      name.length < 2 ? 'Please enter your name using at least 2 characters.' : '',
    )
    if (!nameInput.reportValidity()) return

    const phoneDigits = phone.replace(/\D/g, '')
    phoneInput.setCustomValidity(
      !/^\+?[0-9][0-9\s().-]{5,19}$/.test(phone) ||
        phoneDigits.length < 7 ||
        phoneDigits.length > 15
        ? 'Enter a phone number containing 7 to 15 digits.'
        : '',
    )
    if (!phoneInput.reportValidity()) return

    const emailValidationError = getEmailDomainError(email)
    setEmailError(emailValidationError)
    emailInput.setCustomValidity(emailValidationError)
    if (!emailInput.reportValidity()) return

    if (!selectedService) {
      setServiceMenuOpen(true)
      setStatus({ type: 'error', message: 'Please choose a service for your inquiry.' })
      return
    }

    const formData = new FormData(form)
    const submission = Object.fromEntries(formData.entries())
    submission.name = name
    submission.email = email
    submission.phone = phone
    submission.description = String(submission.description || '').trim()
    submission.service = selectedService
    submission._replyto = submission.email
    submission._subject = `New project inquiry — ${submission.service}`
    submission._template = 'table'

    setIsSubmitting(true)
    setStatus({ type: 'pending', message: 'Sending your inquiry…' })

    try {
      const response = await fetch(`https://formsubmit.co/ajax/${contactEmail}`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submission),
      })
      const result = await response.json()

      if (!response.ok || (result.success !== true && result.success !== 'true')) {
        throw new Error(result.message || 'The email service could not confirm your inquiry.')
      }

      form.reset()
      setSelectedService('')
      setStatus({
        type: 'success',
        message: 'Thank you! Your inquiry has been submitted. Our team will be in touch shortly.',
      })
    } catch (error) {
      console.error('Unable to submit project inquiry:', error)
      setStatus({
        type: 'error',
        message:
          error instanceof Error
            ? error.message
            : 'We could not submit your inquiry. Please try WhatsApp or email us directly.',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <input type="hidden" name="_template" value="table" />
      <div className="field-row two-up">
        <label>
          <span>Name <span aria-hidden="true">*</span></span>
          <input
            type="text"
            name="name"
            placeholder="Your name"
            autoComplete="name"
            minLength={2}
            maxLength={80}
            required
            onInput={(event) => event.currentTarget.setCustomValidity('')}
            onInvalid={(event) => {
              if (event.currentTarget.validity.valueMissing) {
                event.currentTarget.setCustomValidity('Please enter your name.')
              }
            }}
          />
        </label>
        <label>
          <span>Email <span aria-hidden="true">*</span></span>
          <input
            type="email"
            name="email"
            placeholder="you@example.com"
            autoComplete="email"
            maxLength={254}
            required
            aria-invalid={emailError ? 'true' : 'false'}
            aria-describedby={emailError ? 'email-validation-error' : undefined}
            onBlur={(event) => {
              setEmailError(getEmailDomainError(event.currentTarget.value))
            }}
            onInvalid={(event) => {
              const message = event.currentTarget.validity.customError
                ? event.currentTarget.validationMessage
                : event.currentTarget.validity.valueMissing
                  ? 'Please enter your email address.'
                  : 'Please enter a valid email address.'
              event.currentTarget.setCustomValidity(message)
              setEmailError(message)
            }}
            onInput={(event) => {
              event.currentTarget.setCustomValidity('')
              setEmailError('')
            }}
          />
          {emailError ? (
            <span id="email-validation-error" className="email-validation-error" role="alert">
              {emailError}
            </span>
          ) : null}
        </label>
      </div>

      <div className="field-row two-up">
        <label>
          <span>Phone <span aria-hidden="true">*</span></span>
          <input
            type="tel"
            name="phone"
            placeholder="+91 98765 43210"
            autoComplete="tel"
            inputMode="tel"
            title="Enter a phone number with 7 to 15 digits."
            maxLength={20}
            required
            onInput={(event) => event.currentTarget.setCustomValidity('')}
          />
        </label>
        <div className="contact-service-field">
          <span id="service-select-label">Service <span aria-hidden="true">*</span></span>
          <input type="hidden" name="service" value={selectedService} />
          <div
            className="service-select"
            onBlur={(event) => {
              if (!event.currentTarget.contains(event.relatedTarget)) {
                setServiceMenuOpen(false)
              }
            }}
            onKeyDown={(event) => {
              if (event.key === 'Escape') setServiceMenuOpen(false)
              if (event.key === 'ArrowDown') setServiceMenuOpen(true)
            }}
          >
            <button
              type="button"
              className={`service-select-trigger ${serviceMenuOpen ? 'is-open' : ''}`}
              role="combobox"
              aria-labelledby="service-select-label"
              aria-expanded={serviceMenuOpen}
              aria-controls="service-options"
              aria-haspopup="listbox"
              aria-required="true"
              onClick={() => setServiceMenuOpen((isOpen) => !isOpen)}
            >
              <span className={selectedService ? 'selected-value' : 'select-placeholder'}>
                {selectedService || 'Choose a service'}
              </span>
              <ChevronDown size={18} />
            </button>
            <AnimatePresence>
              {serviceMenuOpen ? (
                <motion.div
                  id="service-options"
                  className="service-select-options"
                  role="listbox"
                  aria-labelledby="service-select-label"
                  initial={{ opacity: 0, y: -8, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -6, scale: 0.98 }}
                  transition={{ duration: 0.18, ease: 'easeOut' }}
                >
                  {serviceOptions.map((service) => (
                    <button
                      type="button"
                      role="option"
                      aria-selected={selectedService === service}
                      className="service-select-option"
                      key={service}
                      onClick={() => {
                        setSelectedService(service)
                        setServiceMenuOpen(false)
                        setStatus({ type: 'idle', message: '' })
                      }}
                    >
                      <span>{service}</span>
                      {selectedService === service ? <Check size={16} /> : null}
                    </button>
                  ))}
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        </div>
      </div>

      <label>
        <span>Project description <span className="optional-label">(Optional)</span></span>
        <textarea
          name="description"
          rows="5"
          placeholder="What are you looking to create? Share your goals, audience, required formats or quantities, preferred timeline, and any useful references."
          maxLength={3000}
        />
      </label>

      <div className="form-actions">
        <button type="submit" className="primary-button" disabled={isSubmitting}>
          {isSubmitting ? 'Sending inquiry…' : 'Send inquiry'}
        </button>
        <a
          href={whatsappUrl}
          className="secondary-button"
          target="_blank"
          rel="noreferrer"
        >
          WhatsApp us
        </a>
      </div>
      <AnimatePresence mode="wait" initial={false}>
        {status.message ? (
          <motion.div
            key={status.type}
            className={`form-status ${status.type}`}
            role={status.type === 'error' ? 'alert' : 'status'}
            aria-live={status.type === 'error' ? 'assertive' : 'polite'}
            initial={{ opacity: 0, y: 10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.24, ease: 'easeOut' }}
          >
            <span className="form-status-icon">
              {status.type === 'success' ? (
                <CheckCircle2 size={21} />
              ) : status.type === 'error' ? (
                <AlertCircle size={21} />
              ) : (
                <LoaderCircle className="status-spinner" size={21} />
              )}
            </span>
            <span>{status.message}</span>
          </motion.div>
        ) : null}
      </AnimatePresence>
      <p className="form-note">
        Submissions are relayed through FormSubmit to {contactEmail}. We&apos;ll use your email to reply.
      </p>
    </form>
  )
}
