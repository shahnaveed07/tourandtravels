import { useEffect, useState, useId } from 'react';
import { X, CheckCircle2, ArrowRight, MessageCircle, AlertCircle, Loader2, Send } from 'lucide-react';
import { brand } from '../data.js';

const initialForm = {
  name: '',
  email: '',
  phone: '',
  city: '',
  travellers: '2',
  date: '',
  package: '',
  message: ''
};

export default function EnquiryModal({
  open,
  onClose,
  initialPackage = '',
  initialDate = ''
}) {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('idle'); // 'idle' | 'success' | 'dispatch_ready' | 'error'
  const [errorMessage, setErrorMessage] = useState('');

  const modalTitleId = useId();

  useEffect(() => {
    if (open) {
      setForm({
        ...initialForm,
        package: initialPackage || '',
        date: initialDate || ''
      });
      setErrors({});
      setIsSubmitting(false);
      setSubmitStatus('idle');
      setErrorMessage('');
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
    }
    return () => document.body.classList.remove('modal-open');
  }, [open, initialPackage, initialDate]);

  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) {
      errs.name = 'Full name is required.';
    } else if (form.name.trim().length < 2) {
      errs.name = 'Please provide a valid name (at least 2 characters).';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!form.email.trim()) {
      errs.email = 'Email address is required.';
    } else if (!emailRegex.test(form.email.trim())) {
      errs.email = 'Please provide a valid email address.';
    }

    const cleanPhone = form.phone.replace(/[\s\-()]/g, '');
    if (!form.phone.trim()) {
      errs.phone = 'Phone number is required.';
    } else if (cleanPhone.length < 8 || !/^\+?[0-9]{8,15}$/.test(cleanPhone)) {
      errs.phone = 'Please provide a valid telephone number (8–15 digits).';
    }

    if (form.date) {
      const selected = new Date(form.date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selected < today) {
        errs.date = 'Arrival date cannot be in the past.';
      }
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const update = (event) => {
    const { name, value } = event.target;
    setForm(current => ({ ...current, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const endpoint = import.meta.env.VITE_ENQUIRY_ENDPOINT;

  const buildWhatsAppMessage = () => {
    return `Hello ${brand.name} ${brand.descriptor}!\n` +
      `I would like to enquire about a trip to Kashmir:\n\n` +
      `• Name: ${form.name.trim()}\n` +
      `• Email: ${form.email.trim()}\n` +
      `• Phone: ${form.phone.trim()}\n` +
      `• Travelling From: ${form.city.trim() || 'Not specified'}\n` +
      `• Travellers: ${form.travellers}\n` +
      `• Preferred Arrival: ${form.date || 'Flexible'}\n` +
      `• Package of Interest: ${form.package || 'Custom Itinerary'}\n` +
      `• Notes: ${form.message.trim() || 'None'}`;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validate()) return;

    // If an external enquiry endpoint is configured via VITE_ENQUIRY_ENDPOINT
    if (endpoint) {
      setIsSubmitting(true);
      setErrorMessage('');
      try {
        const response = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ...form,
            submittedAt: new Date().toISOString()
          })
        });

        if (!response.ok) {
          throw new Error(`Server returned status ${response.status}`);
        }

        setSubmitStatus('success');
      } catch (err) {
        setSubmitStatus('error');
        setErrorMessage(
          err.message || 'Unable to connect to the enquiry endpoint. Please try WhatsApp or email.'
        );
      } finally {
        setIsSubmitting(false);
      }
    } else {
      // Direct instant dispatch via WhatsApp chat
      setSubmitStatus('dispatch_ready');
    }
  };

  const handleWhatsAppDirect = () => {
    const text = buildWhatsAppMessage();
    const url = `https://wa.me/${brand.whatsapp}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const todayStr = new Date().toISOString().split('T')[0];

  return (
    <div
      className="modal-backdrop"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section
        className="enquiry-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby={modalTitleId}
      >
        <button className="modal-close" onClick={onClose} aria-label="Close enquiry form">
          <X size={19} />
        </button>

        {submitStatus === 'success' && (
          <div className="success-state">
            <span className="success-icon">
              <CheckCircle2 size={36} />
            </span>
            <span className="eyebrow">ENQUIRY DELIVERED</span>
            <h2>Thank you, {form.name.trim()}!</h2>
            <p>
              Your enquiry has been successfully delivered to our travel planning team. We will review your dates and travel requirements and respond by email within 24 hours.
            </p>
            <div className="success-actions">
              <button className="button button-dark" onClick={onClose}>
                Back to exploring <ArrowRight size={16} />
              </button>
            </div>
          </div>
        )}

        {submitStatus === 'dispatch_ready' && (
          <div className="dispatch-notice-state">
            <span className="dispatch-icon">
              <MessageCircle size={36} />
            </span>
            <span className="eyebrow">READY TO SEND</span>
            <h2>Send your enquiry on WhatsApp.</h2>
            <p className="dispatch-explain">
              Connect directly with our travel planning desk in Sopore. All your itinerary preferences, guest counts, and dates are prepared and ready to send.
            </p>
            <p className="dispatch-recommendation">
              Click below to start a live conversation with our Kashmir team:
            </p>
            <div className="dispatch-actions">
              <button className="button button-dark whatsapp-btn" onClick={handleWhatsAppDirect}>
                <MessageCircle size={17} /> Send via WhatsApp now
              </button>
              <button className="button button-outline" onClick={() => setSubmitStatus('idle')}>
                Edit enquiry details
              </button>
            </div>
          </div>
        )}

        {submitStatus === 'error' && (
          <div className="error-state">
            <span className="error-icon">
              <AlertCircle size={36} />
            </span>
            <span className="eyebrow">SUBMISSION ERROR</span>
            <h2>Could not send enquiry.</h2>
            <p>{errorMessage}</p>
            <div className="modal-state-actions">
              <button className="button button-dark" onClick={handleWhatsAppDirect}>
                <MessageCircle size={17} /> Send via WhatsApp instead
              </button>
              <button className="button button-outline" onClick={() => setSubmitStatus('idle')}>
                Try again
              </button>
            </div>
          </div>
        )}

        {submitStatus === 'idle' && (
          <>
            <span className="eyebrow">LET'S PLAN SOMETHING BEAUTIFUL</span>
            <h2 id={modalTitleId}>Tell us about your trip.</h2>
            <p className="modal-intro">
              Share a few details about your journey. Our team will tailor a day-wise itinerary around your pace and preferences.
            </p>

            <form className="enquiry-form" onSubmit={handleSubmit} noValidate>
              <label>
                Your name <span className="field-req">*</span>
                <input
                  name="name"
                  value={form.name}
                  onChange={update}
                  placeholder="Full name"
                  required
                  aria-invalid={!!errors.name}
                />
                {errors.name && <span className="field-error">{errors.name}</span>}
              </label>

              <label>
                Email address <span className="field-req">*</span>
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={update}
                  placeholder="you@example.com"
                  required
                  aria-invalid={!!errors.email}
                />
                {errors.email && <span className="field-error">{errors.email}</span>}
              </label>

              <label>
                Phone number <span className="field-req">*</span>
                <input
                  name="phone"
                  type="tel"
                  value={form.phone}
                  onChange={update}
                  placeholder="+91 98765 43210"
                  required
                  aria-invalid={!!errors.phone}
                />
                {errors.phone && <span className="field-error">{errors.phone}</span>}
              </label>

              <label>
                Travelling from
                <input
                  name="city"
                  value={form.city}
                  onChange={update}
                  placeholder="Your departure city"
                />
              </label>

              <label>
                Travellers
                <select name="travellers" value={form.travellers} onChange={update}>
                  <option value="1">1 traveller (Solo)</option>
                  <option value="2">2 travellers (Couple / Pair)</option>
                  <option value="3-4">3–4 travellers (Family / Friends)</option>
                  <option value="5-8">5–8 travellers (Small Group)</option>
                  <option value="9+">9+ travellers (Large Group)</option>
                </select>
              </label>

              <label>
                Preferred arrival date
                <input
                  name="date"
                  type="date"
                  min={todayStr}
                  value={form.date}
                  onChange={update}
                  aria-invalid={!!errors.date}
                />
                {errors.date && <span className="field-error">{errors.date}</span>}
              </label>

              <label className="field-full">
                Package or route of interest
                <input
                  name="package"
                  value={form.package}
                  onChange={update}
                  placeholder="e.g. Kashmir Valley Escape, Romantic Journey, or Custom"
                />
              </label>

              <label className="field-full">
                Additional preferences or requirements
                <textarea
                  name="message"
                  rows={3}
                  value={form.message}
                  onChange={update}
                  placeholder="Tell us about stay preferences, dietary needs, places you want to include, or pace…"
                />
              </label>

              <button
                className="button button-dark field-full submit-enquiry"
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={16} className="animate-spin" /> Sending enquiry…
                  </>
                ) : (
                  <>
                    Send enquiry <ArrowRight size={16} />
                  </>
                )}
              </button>
            </form>

            <div className="form-mode-note">
              <span>
                Our travel team in Sopore will review your preferences and get in touch within 24 hours.
              </span>
            </div>

            <div className="modal-direct-actions">
              <span>Prefer instant assistance?</span>
              <button
                type="button"
                className="direct-wa-link"
                onClick={handleWhatsAppDirect}
              >
                <MessageCircle size={15} /> Chat on WhatsApp
              </button>
              <a href={`mailto:${brand.email}`} className="direct-mail-link">
                Email us
              </a>
            </div>
          </>
        )}
      </section>
    </div>
  );
}
