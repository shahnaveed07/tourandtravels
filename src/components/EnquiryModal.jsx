import { useEffect, useState, useId } from 'react';
import { X, MessageCircle, Mail, ArrowRight, CheckCircle2, RotateCcw } from 'lucide-react';
import { brand } from '../data.js';

const initialForm = {
  name: '',
  phone: '',
  email: '',
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
  const [submittedChannel, setSubmittedChannel] = useState(''); // '' | 'whatsapp' | 'email'

  const modalTitleId = useId();

  const hasWhatsApp = Boolean(brand.whatsapp && brand.whatsapp.trim().length >= 7);
  const hasEmail = Boolean(brand.email && brand.email.includes('@'));

  useEffect(() => {
    if (open) {
      setForm({
        ...initialForm,
        package: initialPackage || '',
        date: initialDate || ''
      });
      setErrors({});
      setSubmittedChannel('');
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
      errs.name = 'Please provide your name.';
    } else if (form.name.trim().length < 2) {
      errs.name = 'Name must be at least 2 characters.';
    }

    const cleanPhone = form.phone.replace(/[\s\-()]/g, '');
    if (!form.phone.trim()) {
      errs.phone = 'Phone number is required so our team can reach you.';
    } else if (cleanPhone.length < 8 || !/^\+?[0-9]{8,15}$/.test(cleanPhone)) {
      errs.phone = 'Please provide a valid phone number (8–15 digits).';
    }

    if (form.email.trim()) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(form.email.trim())) {
        errs.email = 'Please provide a valid email address.';
      }
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

  const buildWhatsAppMessage = () => {
    return `Hello ${brand.name} ${brand.descriptor}!\n\n` +
      `I would like to enquire about traveling to Kashmir:\n\n` +
      `• Name: ${form.name.trim()}\n` +
      `• Phone: ${form.phone.trim()}\n` +
      (form.email.trim() ? `• Email: ${form.email.trim()}\n` : '') +
      `• Selected Package: ${form.package || 'Custom Route'}\n` +
      `• Travel Date: ${form.date || 'Flexible / To be discussed'}\n` +
      `• Number of Travellers: ${form.travellers}\n` +
      (form.city.trim() ? `• Departing From: ${form.city.trim()}\n` : '') +
      (form.message.trim() ? `• Notes & Requirements: ${form.message.trim()}\n` : '') +
      `\nPlease let me know availability and proposal details.`;
  };

  const buildEmailSubject = () => {
    const pkg = form.package ? ` — ${form.package}` : '';
    return `Travel Enquiry${pkg} — Brand Identity Tour & Travel`;
  };

  const buildEmailBody = () => {
    return `Dear Brand Identity Tour & Travel Team,\n\n` +
      `I would like to enquire about planning a trip to Kashmir with the following details:\n\n` +
      `Customer Name: ${form.name.trim()}\n` +
      `Phone Number: ${form.phone.trim()}\n` +
      `Email: ${form.email.trim() || 'Not specified'}\n` +
      `Selected Package / Route: ${form.package || 'Custom Route'}\n` +
      `Preferred Travel Date: ${form.date || 'Flexible'}\n` +
      `Number of Travellers: ${form.travellers}\n` +
      `Departure City: ${form.city.trim() || 'Not specified'}\n\n` +
      `Message & Special Requirements:\n` +
      `${form.message.trim() || 'None'}\n\n` +
      `Warm regards,\n` +
      `${form.name.trim()}`;
  };

  const handleSendWhatsApp = (e) => {
    e.preventDefault();
    if (!validate()) return;
    if (!hasWhatsApp) return;

    const text = buildWhatsAppMessage();
    const url = `https://wa.me/${brand.whatsapp}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
    setSubmittedChannel('whatsapp');
  };

  const handleSendEmail = (e) => {
    e.preventDefault();
    if (!validate()) return;
    if (!hasEmail) return;

    const subject = encodeURIComponent(buildEmailSubject());
    const body = encodeURIComponent(buildEmailBody());
    const mailtoUrl = `mailto:${brand.email}?subject=${subject}&body=${body}`;
    window.location.href = mailtoUrl;
    setSubmittedChannel('email');
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

        {submittedChannel === 'whatsapp' && (
          <div className="dispatch-notice-state">
            <span className="dispatch-icon whatsapp-icon-wrap">
              <MessageCircle size={34} />
            </span>
            <span className="eyebrow">CONTINUE ON WHATSAPP</span>
            <h2>Complete your message in WhatsApp.</h2>
            <p className="dispatch-explain">
              WhatsApp has been opened with your pre-filled travel details. Tap <strong>Send</strong> in WhatsApp to dispatch your enquiry directly to our Kashmir travel desk in Sopore.
            </p>
            <div className="channel-summary-card">
              <small>RECIPIENT WHATSAPP</small>
              <strong>+{brand.whatsapp}</strong>
              <span>({brand.name} Travel Desk)</span>
            </div>
            <div className="dispatch-actions">
              <button
                className="button button-dark whatsapp-btn"
                onClick={() => {
                  const text = buildWhatsAppMessage();
                  window.open(`https://wa.me/${brand.whatsapp}?text=${encodeURIComponent(text)}`, '_blank', 'noopener,noreferrer');
                }}
              >
                <MessageCircle size={17} /> Re-open WhatsApp
              </button>
              <button className="button button-outline" onClick={() => setSubmittedChannel('')}>
                <RotateCcw size={15} /> Edit details
              </button>
              <button className="button button-outline" onClick={onClose}>
                Done
              </button>
            </div>
          </div>
        )}

        {submittedChannel === 'email' && (
          <div className="dispatch-notice-state">
            <span className="dispatch-icon email-icon-wrap">
              <Mail size={34} />
            </span>
            <span className="eyebrow">CONTINUE IN EMAIL</span>
            <h2>Send from your email app.</h2>
            <p className="dispatch-explain">
              Your default email application has opened with a pre-filled enquiry addressed to <strong>{brand.email}</strong>. Please press <strong>Send</strong> in your mail client to transmit your enquiry.
            </p>
            <div className="channel-summary-card">
              <small>RECIPIENT EMAIL</small>
              <strong>{brand.email}</strong>
              <span>(Brand Identity Tour & Travel)</span>
            </div>
            <div className="dispatch-actions">
              <button
                className="button button-dark"
                onClick={() => {
                  const subject = encodeURIComponent(buildEmailSubject());
                  const body = encodeURIComponent(buildEmailBody());
                  window.location.href = `mailto:${brand.email}?subject=${subject}&body=${body}`;
                }}
              >
                <Mail size={17} /> Re-open Email App
              </button>
              <button className="button button-outline" onClick={() => setSubmittedChannel('')}>
                <RotateCcw size={15} /> Edit details
              </button>
              <button className="button button-outline" onClick={onClose}>
                Done
              </button>
            </div>
          </div>
        )}

        {!submittedChannel && (
          <>
            <span className="eyebrow">DIRECT COMMUNICATION · NO INTERMEDIARIES</span>
            <h2 id={modalTitleId}>Plan your Kashmir trip.</h2>
            <p className="modal-intro">
              Fill in your details below and choose whether to connect directly via <strong>WhatsApp</strong> or <strong>Email</strong>.
            </p>

            <form className="enquiry-form" noValidate onSubmit={(e) => e.preventDefault()}>
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
                Phone / WhatsApp number <span className="field-req">*</span>
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
                Email address
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={update}
                  placeholder="you@example.com (optional)"
                  aria-invalid={!!errors.email}
                />
                {errors.email && <span className="field-error">{errors.email}</span>}
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
                Number of travellers
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
                Message or special requirements
                <textarea
                  name="message"
                  rows={3}
                  value={form.message}
                  onChange={update}
                  placeholder="Hotel category preference, places you want to visit, travel pace, or special requests…"
                />
              </label>

              {/* Two Direct Communication Channels */}
              <div className="enquiry-actions-duo field-full">
                <button
                  type="button"
                  className="button button-dark channel-btn channel-whatsapp"
                  onClick={handleSendWhatsApp}
                  disabled={!hasWhatsApp}
                  aria-label="Send enquiry via WhatsApp"
                >
                  <MessageCircle size={18} />
                  <span>
                    <strong>Send via WhatsApp</strong>
                    <small>{hasWhatsApp ? `Opens chat with +${brand.whatsapp}` : 'WhatsApp number pending configuration'}</small>
                  </span>
                </button>

                <button
                  type="button"
                  className="button button-outline channel-btn channel-email"
                  onClick={handleSendEmail}
                  disabled={!hasEmail}
                  aria-label="Send enquiry via Email"
                >
                  <Mail size={18} />
                  <span>
                    <strong>Send via Email</strong>
                    <small>{hasEmail ? `Opens mail to ${brand.email}` : 'Email pending configuration'}</small>
                  </span>
                </button>
              </div>
            </form>

            <div className="form-mode-note">
              <span>
                <strong>Direct communication:</strong> Selecting either option prepares your enquiry and opens WhatsApp or your email client. You can review and confirm before dispatching.
              </span>
            </div>
          </>
        )}
      </section>
    </div>
  );
}
