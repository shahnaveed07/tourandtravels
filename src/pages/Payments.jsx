import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowUpRight,
  Building2,
  Check,
  Copy,
  Download,
  ExternalLink,
  Info,
  Mail,
  Maximize2,
  MessageCircle,
  QrCode,
  ShieldCheck,
  Smartphone,
  X,
} from 'lucide-react';
import { brand } from '../data.js';
import {
  paymentDetails as defaultPaymentDetails,
  isUpiConfigured,
  isBankConfigured,
  isQrConfigured,
  buildUpiIntentUrl,
  formatBankDetailsText,
  buildPaymentReferenceWhatsAppUrl,
  buildPaymentReferenceMailtoUrl,
} from '../paymentConfig.js';
import usePageSEO from '../hooks/usePageSEO.js';

async function copyTextToClipboard(text) {
  if (!text) return false;
  try {
    if (typeof navigator !== 'undefined' && navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch {
    // Fallback for restricted clipboard contexts
  }
  try {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.setAttribute('readonly', '');
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    return true;
  } catch {
    return false;
  }
}

export default function Payments({ onEnquire, config = defaultPaymentDetails }) {
  usePageSEO('/payments');

  const [copiedKey, setCopiedKey] = useState('');
  const [qrModalOpen, setQrModalOpen] = useState(false);

  const [refForm, setRefForm] = useState({
    payerName: '',
    bookingRef: '',
    utr: '',
    paymentDate: '',
    amount: '',
    method: 'UPI Transfer',
  });
  const [refErrors, setRefErrors] = useState({});

  const upiReady = isUpiConfigured(config?.upi);
  const bankReady = isBankConfigured(config?.bank);
  const qrReady = isQrConfigured(config?.qr);
  const upiIntentUrl = upiReady ? buildUpiIntentUrl(config.upi) : '';

  useEffect(() => {
    if (!qrModalOpen) return;
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') setQrModalOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [qrModalOpen]);

  const handleCopy = async (key, value) => {
    const ok = await copyTextToClipboard(value);
    if (ok) {
      setCopiedKey(key);
      setTimeout(() => {
        setCopiedKey((current) => (current === key ? '' : current));
      }, 2200);
    }
  };

  const updateRefField = (event) => {
    const { name, value } = event.target;
    setRefForm((prev) => ({ ...prev, [name]: value }));
    if (refErrors[name]) {
      setRefErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const validateRefForm = () => {
    const nextErrors = {};
    if (!refForm.utr.trim()) {
      nextErrors.utr = 'Please enter your Transaction Reference / UTR number.';
    }
    if (!refForm.paymentDate.trim()) {
      nextErrors.paymentDate = 'Please select the date of payment.';
    }
    if (!refForm.amount.trim()) {
      nextErrors.amount = 'Please enter the amount transferred in INR.';
    }
    setRefErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const whatsappRefUrl = buildPaymentReferenceWhatsAppUrl(brand, refForm);
  const mailtoRefUrl = buildPaymentReferenceMailtoUrl(brand, refForm);

  const handleSendRefWhatsApp = (event) => {
    event.preventDefault();
    if (!validateRefForm()) return;
    window.open(whatsappRefUrl, '_blank', 'noopener,noreferrer');
  };

  const handleSendRefEmail = (event) => {
    event.preventDefault();
    if (!validateRefForm()) return;
    window.location.href = mailtoRefUrl;
  };

  const requestPaymentDetailsWhatsApp = `https://wa.me/${brand.whatsapp}?text=${encodeURIComponent(
    `Hello ${brand.name} ${brand.descriptor}! Please share your official payment instructions for my confirmed Kashmir itinerary.`
  )}`;

  const requestPaymentDetailsMailto = `mailto:${brand.email}?subject=${encodeURIComponent(
    `Request for Official Payment Instructions — ${brand.name} ${brand.descriptor}`
  )}&body=${encodeURIComponent(
    `Hello ${brand.name} team,\n\nPlease share your official bank transfer / UPI payment details for my confirmed itinerary.\n\nWarm regards,`
  )}`;

  const bankRows = bankReady
    ? [
        { key: 'accountHolder', label: 'Account Holder Name', value: config.bank.accountHolder },
        { key: 'bankName', label: 'Bank Name', value: config.bank.bankName },
        { key: 'accountNumber', label: 'Account Number', value: config.bank.accountNumber, mono: true },
        { key: 'ifsc', label: 'IFSC Code', value: config.bank.ifsc, mono: true },
        { key: 'accountType', label: 'Account Type', value: config.bank.accountType },
        ...(config.bank.branch?.trim()
          ? [{ key: 'branch', label: 'Branch Name', value: config.bank.branch }]
          : []),
      ]
    : [];

  return (
    <main className="inner-page payments-page">
      <section className="inner-hero payments-hero">
        <div className="container inner-hero-content">
          <div className="breadcrumbs">
            <Link to="/">Home</Link>
            <span>/</span>
            <span>Payment methods</span>
          </div>
          <span className="eyebrow">TRANSPARENT BOOKING &amp; PAYMENT GUIDANCE</span>
          <h1>
            Simple, verified ways
            <br />
            <i>to complete your booking.</i>
          </h1>
          <p>
            Review our supported payment methods for confirmed Kashmir itineraries: UPI, Mobile Banking (NEFT / IMPS / RTGS), and Scan &amp; Pay QR.
          </p>
        </div>
      </section>

      <section className="section payments-section">
        <div className="container">
          {/* Mandatory Customer Safety Notice */}
          <div className="payment-safety-banner" role="note" aria-label="Important payment safety notice">
            <div className="payment-safety-icon">
              <ShieldCheck size={24} />
            </div>
            <div className="payment-safety-copy">
              <span className="eyebrow">CUSTOMER PAYMENT SAFETY NOTICE</span>
              <p className="payment-safety-statement">
                Please make payments only after receiving your confirmed itinerary and payment instructions from Brand Identity Tour &amp; Travel. Verify the beneficiary name and payment details before completing a transfer.
              </p>
              <small>
                This website is an informational travel portal and does not process automatic online checkout or store banking data. Never share your UPI PIN, OTP, card PIN, or net-banking password with anyone.
              </small>
            </div>
          </div>

          <div className="payment-methods-grid">
            {/* METHOD A: UPI PAYMENT */}
            <article className="payment-method-card" id="upi-payment" aria-labelledby="heading-upi">
              <div className="payment-method-header">
                <span className="payment-method-index">01 · UPI TRANSFER</span>
                <span className="payment-method-icon">
                  <Smartphone size={22} />
                </span>
              </div>
              <h2 id="heading-upi">UPI Payment</h2>
              <p className="payment-method-desc">
                Pay directly from any UPI-enabled mobile application in Indian Rupees (INR) according to the amount confirmed on your written quotation.
              </p>

              {upiReady ? (
                <div className="payment-configured-body" data-testid="upi-configured">
                  <div className="payment-detail-box">
                    <div className="payment-detail-row">
                      <div>
                        <small>OFFICIAL UPI ID / VPA</small>
                        <strong className="payment-mono" data-testid="upi-vpa-value">
                          {config.upi.id}
                        </strong>
                      </div>
                      <button
                        type="button"
                        className="copy-inline-btn"
                        data-testid="copy-upi-id"
                        onClick={() => handleCopy('upi-id', config.upi.id)}
                        aria-label={`Copy UPI ID ${config.upi.id}`}
                      >
                        {copiedKey === 'upi-id' ? <Check size={14} /> : <Copy size={14} />}
                        <span>{copiedKey === 'upi-id' ? 'Copied' : 'Copy UPI ID'}</span>
                      </button>
                    </div>

                    <div className="payment-detail-row">
                      <div>
                        <small>VERIFIED PAYEE NAME</small>
                        <strong data-testid="upi-payee-value">{config.upi.payeeName}</strong>
                      </div>
                    </div>
                  </div>

                  <div className="payment-card-actions">
                    <a
                      href={upiIntentUrl}
                      className="button button-dark"
                      data-testid="open-upi-app"
                      aria-label={`Open UPI app to pay ${config.upi.payeeName}`}
                    >
                      Open UPI App <ExternalLink size={15} />
                    </a>
                    <button
                      type="button"
                      className="button button-outline"
                      onClick={() => handleCopy('upi-id', config.upi.id)}
                    >
                      {copiedKey === 'upi-id' ? <Check size={15} /> : <Copy size={15} />}
                      {copiedKey === 'upi-id' ? 'UPI ID Copied' : 'Copy UPI ID'}
                    </button>
                  </div>

                  <div className="payment-fallback-note">
                    <Info size={15} />
                    <span>
                      <strong>Browser fallback:</strong> If your browser or desktop device does not launch a UPI app automatically, click <strong>Copy UPI ID</strong> above, open your preferred UPI application (Google Pay, PhonePe, Paytm, BHIM, or your bank app), and enter the confirmed quotation amount manually.
                    </span>
                  </div>
                </div>
              ) : (
                <div className="payment-unconfigured-state" data-testid="upi-unconfigured">
                  <p>
                    To prevent unverified transfers before availability is confirmed, our official business UPI ID (VPA) and beneficiary name are shared directly on your written booking quotation.
                  </p>
                  <div className="payment-request-links">
                    <a
                      href={requestPaymentDetailsWhatsApp}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-link"
                    >
                      Request UPI details on WhatsApp <ArrowUpRight size={14} />
                    </a>
                    <a href={requestPaymentDetailsMailto} className="text-link">
                      Request via Email <ArrowUpRight size={14} />
                    </a>
                  </div>
                </div>
              )}
            </article>

            {/* METHOD B: MOBILE BANKING / BANK TRANSFER */}
            <article className="payment-method-card" id="bank-transfer" aria-labelledby="heading-bank">
              <div className="payment-method-header">
                <span className="payment-method-index">02 · NEFT / IMPS / RTGS</span>
                <span className="payment-method-icon">
                  <Building2 size={22} />
                </span>
              </div>
              <h2 id="heading-bank">Mobile Banking &amp; Bank Transfer</h2>
              <p className="payment-method-desc">
                Transfer via IMPS, NEFT, or RTGS using your bank&apos;s mobile banking app or internet banking portal.
              </p>

              {bankReady ? (
                <div className="payment-configured-body" data-testid="bank-configured">
                  <div className="payment-detail-box bank-details-list">
                    {bankRows.map((row) => (
                      <div className="payment-detail-row" key={row.key}>
                        <div>
                          <small>{row.label.toUpperCase()}</small>
                          <strong
                            className={row.mono ? 'payment-mono' : ''}
                            data-testid={`bank-value-${row.key}`}
                          >
                            {row.value}
                          </strong>
                        </div>
                        <button
                          type="button"
                          className="copy-inline-btn"
                          data-testid={`copy-bank-${row.key}`}
                          onClick={() => handleCopy(`bank-${row.key}`, row.value)}
                          aria-label={`Copy ${row.label}`}
                        >
                          {copiedKey === `bank-${row.key}` ? <Check size={14} /> : <Copy size={14} />}
                          <span>{copiedKey === `bank-${row.key}` ? 'Copied' : 'Copy'}</span>
                        </button>
                      </div>
                    ))}
                  </div>

                  <div className="payment-card-actions">
                    <button
                      type="button"
                      className="button button-dark"
                      data-testid="copy-all-bank"
                      onClick={() => handleCopy('bank-all', formatBankDetailsText(config.bank))}
                    >
                      {copiedKey === 'bank-all' ? <Check size={15} /> : <Copy size={15} />}
                      {copiedKey === 'bank-all' ? 'All Bank Details Copied' : 'Copy All Bank Details'}
                    </button>
                  </div>

                  <div className="payment-fallback-note">
                    <Info size={15} />
                    <span>
                      <strong>Transfer tip:</strong> Add the beneficiary account in your mobile banking app, verify the IFSC code and account holder name, and retain your UTR / reference number after completing the transfer.
                    </span>
                  </div>
                </div>
              ) : (
                <div className="payment-unconfigured-state" data-testid="bank-unconfigured">
                  <p>
                    Official bank account credentials (Account Holder Name, Bank Name, Account Number, IFSC Code, Account Type, and Branch) for NEFT, IMPS, and RTGS transfers are provided on your written itinerary invoice once dates and stays are confirmed.
                  </p>
                  <div className="payment-request-links">
                    <a
                      href={requestPaymentDetailsWhatsApp}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-link"
                    >
                      Request bank details on WhatsApp <ArrowUpRight size={14} />
                    </a>
                    <a href={requestPaymentDetailsMailto} className="text-link">
                      Request via Email <ArrowUpRight size={14} />
                    </a>
                  </div>
                </div>
              )}
            </article>

            {/* METHOD C: QR CODE — SCAN & PAY */}
            <article className="payment-method-card" id="qr-payment" aria-labelledby="heading-qr">
              <div className="payment-method-header">
                <span className="payment-method-index">03 · SCAN &amp; PAY</span>
                <span className="payment-method-icon">
                  <QrCode size={22} />
                </span>
              </div>
              <h2 id="heading-qr">QR Code — Scan &amp; Pay</h2>
              <p className="payment-method-desc">
                <strong>Scan using any UPI application.</strong> Compatible with Google Pay, PhonePe, Paytm, BHIM, and standard bank UPI apps.
              </p>

              {qrReady ? (
                <div className="payment-configured-body" data-testid="qr-configured">
                  <div className="qr-display-frame">
                    <img
                      src={config.qr.image}
                      alt={config.qr.alt || 'Brand Identity Tour & Travel official UPI payment QR'}
                      className="qr-code-image"
                      data-testid="qr-image"
                    />
                    <span className="qr-scan-caption">Scan using any UPI application</span>
                  </div>

                  <div className="payment-card-actions">
                    <button
                      type="button"
                      className="button button-dark"
                      data-testid="open-qr-modal"
                      onClick={() => setQrModalOpen(true)}
                    >
                      <Maximize2 size={15} /> View Larger QR
                    </button>
                    <a
                      href={config.qr.image}
                      download="Brand-Identity-Tour-Travel-UPI-QR"
                      className="button button-outline"
                      data-testid="download-qr"
                    >
                      <Download size={15} /> Download QR
                    </a>
                  </div>
                </div>
              ) : (
                <div className="payment-unconfigured-state" data-testid="qr-unconfigured">
                  <div className="qr-awaiting-badge">
                    <QrCode size={28} />
                    <span>Scan using any UPI application</span>
                  </div>
                  <p>
                    Our official merchant UPI QR code is shared directly with your written booking proposal so you can scan and pay the agreed deposit using Google Pay, PhonePe, Paytm, BHIM, or any compatible UPI app.
                  </p>
                  <div className="payment-request-links">
                    <a
                      href={requestPaymentDetailsWhatsApp}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-link"
                    >
                      Request official QR on WhatsApp <ArrowUpRight size={14} />
                    </a>
                    <button
                      type="button"
                      className="text-link"
                      onClick={() => onEnquire && onEnquire('Payment & Booking Enquiry')}
                    >
                      Enquire about an itinerary <ArrowUpRight size={14} />
                    </button>
                  </div>
                </div>
              )}
            </article>
          </div>

          {/* PHASE 5: SHARE PAYMENT REFERENCE / UTR AFTER TRANSFER */}
          <section
            className="payment-reference-section"
            id="share-payment-reference"
            aria-labelledby="heading-payment-ref"
          >
            <div className="payment-reference-grid">
              <div className="payment-reference-intro">
                <span className="eyebrow">AFTER COMPLETING A TRANSFER</span>
                <h2 id="heading-payment-ref">
                  Share your payment
                  <br />
                  <i>reference for verification.</i>
                </h2>
                <p>
                  Once you have completed a UPI or bank transfer against your confirmed quotation, share your transaction reference / UTR with our travel desk so our team can manually verify and issue your written payment receipt.
                </p>
                <ul className="payment-verification-steps">
                  <li>
                    <Check size={15} />
                    <span>All transfers are manually verified by Brand Identity Tour &amp; Travel.</span>
                  </li>
                  <li>
                    <Check size={15} />
                    <span>Submitting a reference opens WhatsApp or your Email app with pre-filled details.</span>
                  </li>
                  <li>
                    <Check size={15} />
                    <span>We never ask for your UPI PIN, bank password, card PIN, or OTP.</span>
                  </li>
                </ul>
              </div>

              <form className="payment-reference-form" noValidate onSubmit={(e) => e.preventDefault()}>
                <div className="enquiry-form">
                  <label>
                    <span>Your name</span>
                    <input
                      name="payerName"
                      value={refForm.payerName}
                      onChange={updateRefField}
                      placeholder="Name on booking / bank account"
                    />
                  </label>

                  <label>
                    <span>Booking / quotation reference</span>
                    <input
                      name="bookingRef"
                      value={refForm.bookingRef}
                      onChange={updateRefField}
                      placeholder="Optional (if provided on quote)"
                    />
                  </label>

                  <label>
                    <span>
                      Transaction reference / UTR <span className="field-req">*</span>
                    </span>
                    <input
                      name="utr"
                      value={refForm.utr}
                      onChange={updateRefField}
                      placeholder="12-digit UTR or bank reference ID"
                      required
                      aria-invalid={!!refErrors.utr}
                    />
                    {refErrors.utr && <span className="field-error">{refErrors.utr}</span>}
                  </label>

                  <label>
                    <span>
                      Payment date <span className="field-req">*</span>
                    </span>
                    <input
                      name="paymentDate"
                      type="date"
                      value={refForm.paymentDate}
                      onChange={updateRefField}
                      required
                      aria-invalid={!!refErrors.paymentDate}
                    />
                    {refErrors.paymentDate && (
                      <span className="field-error">{refErrors.paymentDate}</span>
                    )}
                  </label>

                  <label>
                    <span>
                      Amount paid (INR) <span className="field-req">*</span>
                    </span>
                    <input
                      name="amount"
                      type="text"
                      inputMode="numeric"
                      value={refForm.amount}
                      onChange={updateRefField}
                      placeholder="e.g. 10,000"
                      required
                      aria-invalid={!!refErrors.amount}
                    />
                    {refErrors.amount && <span className="field-error">{refErrors.amount}</span>}
                  </label>

                  <label>
                    <span>Transfer mode used</span>
                    <select name="method" value={refForm.method} onChange={updateRefField}>
                      <option value="UPI Transfer">UPI Transfer</option>
                      <option value="IMPS Bank Transfer">IMPS Bank Transfer</option>
                      <option value="NEFT Bank Transfer">NEFT Bank Transfer</option>
                      <option value="RTGS Bank Transfer">RTGS Bank Transfer</option>
                      <option value="UPI QR Scan & Pay">UPI QR Scan &amp; Pay</option>
                    </select>
                  </label>

                  <div className="enquiry-actions-duo field-full">
                    <button
                      type="button"
                      className="button button-dark channel-btn channel-whatsapp"
                      data-testid="send-payment-whatsapp"
                      onClick={handleSendRefWhatsApp}
                    >
                      <MessageCircle size={18} />
                      <span>
                        <strong>Share Reference via WhatsApp</strong>
                        <small>Opens chat with +{brand.whatsapp}</small>
                      </span>
                    </button>

                    <button
                      type="button"
                      className="button button-outline channel-btn channel-email"
                      data-testid="send-payment-email"
                      onClick={handleSendRefEmail}
                    >
                      <Mail size={18} />
                      <span>
                        <strong>Share Reference via Email</strong>
                        <small>Opens mail to {brand.email}</small>
                      </span>
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </section>
        </div>
      </section>

      {/* Larger QR Modal when QR is configured and opened */}
      {qrReady && qrModalOpen && (
        <div
          className="modal-backdrop"
          data-testid="qr-modal"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setQrModalOpen(false);
          }}
        >
          <section
            className="enquiry-modal qr-lightbox-modal"
            role="dialog"
            aria-modal="true"
            aria-label="Official UPI Payment QR Code"
          >
            <button
              type="button"
              className="modal-close"
              data-testid="close-qr-modal"
              onClick={() => setQrModalOpen(false)}
              aria-label="Close QR code preview"
            >
              <X size={19} />
            </button>
            <span className="eyebrow">BRAND IDENTITY TOUR &amp; TRAVEL</span>
            <h2>Scan using any UPI application</h2>
            <div className="qr-modal-frame">
              <img
                src={config.qr.image}
                alt={config.qr.alt || 'Brand Identity Tour & Travel official UPI payment QR'}
                className="qr-modal-image"
              />
            </div>
            <div className="dispatch-actions">
              <a
                href={config.qr.image}
                download="Brand-Identity-Tour-Travel-UPI-QR"
                className="button button-dark"
              >
                <Download size={15} /> Download QR Image
              </a>
              <button
                type="button"
                className="button button-outline"
                onClick={() => setQrModalOpen(false)}
              >
                Close
              </button>
            </div>
          </section>
        </div>
      )}
    </main>
  );
}
