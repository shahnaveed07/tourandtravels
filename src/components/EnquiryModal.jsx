import { useEffect, useState } from 'react';
import { X, CheckCircle2, ArrowRight } from 'lucide-react';
import { brand } from '../data.js';

const initialForm = { name: '', email: '', phone: '', city: '', travellers: '2', date: '', package: '', message: '' };

export default function EnquiryModal({ open, onClose, initialPackage = '' }) {
  const [form, setForm] = useState(initialForm);
  const [sent, setSent] = useState(false);
  useEffect(() => {
    if (open) {
      setForm({ ...initialForm, package: initialPackage || '' });
      setSent(false);
      document.body.classList.add('modal-open');
    } else document.body.classList.remove('modal-open');
    return () => document.body.classList.remove('modal-open');
  }, [open, initialPackage]);
  useEffect(() => {
    if (!open) return;
    const keydown = (event) => { if (event.key === 'Escape') onClose(); };
    window.addEventListener('keydown', keydown);
    return () => window.removeEventListener('keydown', keydown);
  }, [open, onClose]);
  if (!open) return null;
  const update = (event) => setForm(current => ({ ...current, [event.target.name]: event.target.value }));
  const submit = (event) => { event.preventDefault(); setSent(true); };
  return (
    <div className="modal-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <section className="enquiry-modal" role="dialog" aria-modal="true" aria-labelledby="enquiry-title">
        <button className="modal-close" onClick={onClose} aria-label="Close enquiry form"><X size={19}/></button>
        {sent ? <div className="success-state"><span className="success-icon"><CheckCircle2 size={34}/></span><span className="eyebrow">THANK YOU</span><h2>We've got your note.</h2><p>Your demo enquiry has been captured on this screen. Connect a backend or enquiry service to receive real submissions.</p><button className="button button-dark" onClick={onClose}>Back to exploring <ArrowRight size={16}/></button></div> : <>
          <span className="eyebrow">LET'S PLAN SOMETHING BEAUTIFUL</span><h2 id="enquiry-title">Tell us about your trip.</h2><p className="modal-intro">Share a few details and our sample travel team will know where to begin.</p>
          <form className="enquiry-form" onSubmit={submit}>
            <label>Your name<input name="name" value={form.name} onChange={update} placeholder="Full name" required /></label>
            <label>Email address<input name="email" type="email" value={form.email} onChange={update} placeholder="you@example.com" required /></label>
            <label>Phone number<input name="phone" type="tel" value={form.phone} onChange={update} placeholder="+91 00000 00000" required /></label>
            <label>Travelling from<input name="city" value={form.city} onChange={update} placeholder="Your city" /></label>
            <label>Travellers<select name="travellers" value={form.travellers} onChange={update}><option value="1">1 traveller</option><option value="2">2 travellers</option><option value="3-4">3–4 travellers</option><option value="5-8">5–8 travellers</option><option value="9+">9+ travellers</option></select></label>
            <label>Preferred arrival<input name="date" type="date" value={form.date} onChange={update} /></label>
            <label className="field-full">Package of interest<input name="package" value={form.package} onChange={update} placeholder="Not sure yet? Tell us your idea." /></label>
            <label className="field-full">Anything else?<textarea name="message" rows="3" value={form.message} onChange={update} placeholder="Dates, places, preferences or special requests…" /></label>
            <button className="button button-dark field-full submit-enquiry" type="submit">Send enquiry <ArrowRight size={16}/></button>
          </form>
          <p className="form-disclaimer">Demo form only. Submitting does not confirm a booking or send data to a server. Contact details shown in this template are placeholders.</p>
          <div className="modal-contact">Prefer a conversation? <a href={`mailto:${brand.email}`}>{brand.email}</a></div>
        </>}
      </section>
    </div>
  );
}
