import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
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

export default function Payments({ config = defaultPaymentDetails }) {
  usePageSEO('/payments');

  const [copiedKey, setCopiedKey] = useState('');
  const [qrModalOpen, setQrModalOpen] = useState(false);

  const [refForm, setRefForm] = useState({
    payerName: '',
    bookingRef: '',
    utr: '',
    paymentDate: '',
    amount: '',
    method: 'UPI QR Scan & Pay',
  });
  const [refErrors, setRefErrors] = useState({});

  const displayName = config?.displayName || config?.upi?.displayName || 'Brand Identity Tour & Travel';
  const currency = config?.currency || config?.upi?.currency || 'INR';
  const beneficiaryName =
    config?.upi?.beneficiaryName || config?.upi?.payeeName || config?.qr?.beneficiaryName || 'Syed Muzaffar';
  const beneficiaryDisclosure =
    config?.beneficiaryDisclosure ||
    'When scanning this QR, your UPI application may display the registered beneficiary name Syed Muzaffar. Please verify the beneficiary details before confirming payment.';
  const safetyNotice =
    config?.safetyNotice ||
    'Please make payment only after receiving your confirmed itinerary and payment instructions. Verify the beneficiary name and UPI details before confirming the transfer.';

  const upiReady = isUpiConfigured(config?.upi);
  const qrReady = isQrConfigured(config?.qr);
  const bankReady = isBankConfigured(config?.bank);
  const mobileBankingReady = config?.mobileBanking?.enabled !== false && (upiReady || qrReady);
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
          <span className="eyebrow">{displayName.toUpperCase()} · OFFICIAL PAYMENT GUIDANCE</span>
          <h1>
            Simple, verified ways
            <br />
            <i>to complete your booking.</i>
          </h1>
          <p>
            Official UPI Scan &amp; Pay QR, UPI ID, and UPI-enabled mobile banking instructions for confirmed Kashmir itineraries with {displayName}.
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
              <p className="payment-safety-statement" data-testid="payment-safety-notice">
                {safetyNotice}
              </p>
              <small>
                All payments are made in {currency} according to your final confirmed quotation. This website does not process automated online checkout or claim instant payment verification—every transfer is manually verified by {displayName}.
              </small>
            </div>
          </div>

          <div className="payment-methods-grid">
            {/* 1. SCAN & PAY — OFFICIAL QR CODE */}
            {qrReady && (
              <article className="payment-method-card" id="qr-payment" aria-labelledby="heading-qr">
                <div className="payment-method-header">
                  <span className="payment-method-index">01 · SCAN &amp; PAY</span>
                  <span className="payment-method-icon">
                    <QrCode size={22} />
                  </span>
                </div>
                <h2 id="heading-qr">Scan &amp; Pay Official QR</h2>
                <p className="payment-method-desc">
                  <strong>Scan using any UPI application.</strong> Works with Google Pay, PhonePe, Paytm, BHIM, and UPI-enabled mobile banking apps.
                </p>

                <div className="payment-configured-body" data-testid="qr-configured">
                  <div className="qr-display-frame">
                    <span className="qr-brand-tag">{displayName}</span>
                    <img
                      src={config.qr.image}
                      alt={config.qr.alt || 'Brand Identity Tour & Travel official UPI payment QR code'}
                      className="qr-code-image"
                      data-testid="qr-image"
                    />
                    <span className="qr-scan-caption">Scan using any UPI application</span>
                  </div>

                  <div className="beneficiary-disclosure-box" role="note" data-testid="beneficiary-disclosure">
                    <Info size={16} />
                    <p>{beneficiaryDisclosure}</p>
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
                      download="Brand-Identity-Tour-Travel-UPI-QR.jpg"
                      className="button button-outline"
                      data-testid="download-qr"
                    >
                      <Download size={15} /> Download QR
                    </a>
                  </div>
                </div>
              </article>
            )}

            {/* 2. UPI ID PAYMENT */}
            {upiReady && (
              <article className="payment-method-card" id="upi-payment" aria-labelledby="heading-upi">
                <div className="payment-method-header">
                  <span className="payment-method-index">02 · UPI ID / VPA</span>
                  <span className="payment-method-icon">
                    <Smartphone size={22} />
                  </span>
                </div>
                <h2 id="heading-upi">UPI ID Payment</h2>
                <p className="payment-method-desc">
                  Copy our official UPI ID or launch your UPI app directly. No fixed amount is prefilled—enter the exact amount from your confirmed quotation.
                </p>

                <div className="payment-configured-body" data-testid="upi-configured">
                  <div className="payment-detail-box">
                    <div className="payment-detail-row">
                      <div>
                        <small>WEBSITE DISPLAY NAME</small>
                        <strong data-testid="payment-display-name">{displayName}</strong>
                      </div>
                    </div>

                    <div className="payment-detail-row">
                      <div>
                        <small>OFFICIAL UPI ID</small>
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
                        <small>REGISTERED UPI BENEFICIARY (IN QR)</small>
                        <strong data-testid="upi-beneficiary-value">{beneficiaryName}</strong>
                      </div>
                    </div>

                    <div className="payment-detail-row">
                      <div>
                        <small>CURRENCY &amp; AMOUNT</small>
                        <strong>{currency} · Per confirmed quotation</strong>
                      </div>
                    </div>
                  </div>

                  <div className="payment-card-actions">
                    <a
                      href={upiIntentUrl}
                      className="button button-dark"
                      data-testid="open-upi-app"
                      aria-label={`Open UPI app to pay ${displayName}`}
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
                      <strong>How to pay by UPI ID:</strong> On desktop or if your browser does not open a UPI app automatically, click <strong>Copy UPI ID</strong>, open Google Pay, PhonePe, Paytm, BHIM, or your bank app, paste <strong className="payment-mono">{config.upi.id}</strong>, verify the registered beneficiary name (<strong>{beneficiaryName}</strong>), and enter your confirmed quotation amount in {currency}.
                    </span>
                  </div>
                </div>
              </article>
            )}

            {/* 3. MOBILE BANKING VIA UPI */}
            {mobileBankingReady && (
              <article className="payment-method-card" id="mobile-banking" aria-labelledby="heading-mobile-banking">
                <div className="payment-method-header">
                  <span className="payment-method-index">03 · MOBILE BANKING</span>
                  <span className="payment-method-icon">
                    <Building2 size={22} />
                  </span>
                </div>
                <h2 id="heading-mobile-banking">UPI-Enabled Mobile Banking</h2>
                <p className="payment-method-desc">
                  Use your existing bank mobile application (such as SBI YONO, J&amp;K Bank mPay, HDFC, ICICI, Axis, or any UPI-enabled bank app) to scan the official QR or pay to our UPI ID.
                </p>

                <div className="payment-configured-body" data-testid="mobile-banking-configured">
                  <div className="payment-detail-box">
                    <div className="payment-detail-row">
                      <div>
                        <small>STEP 1 · OPEN YOUR BANK APP</small>
                        <strong>Select &ldquo;Scan &amp; Pay&rdquo; or &ldquo;Send Money to UPI ID / VPA&rdquo;</strong>
                      </div>
                    </div>
                    <div className="payment-detail-row">
                      <div>
                        <small>STEP 2 · SCAN QR OR ENTER UPI ID</small>
                        <strong className="payment-mono">{config.upi.id}</strong>
                      </div>
                    </div>
                    <div className="payment-detail-row">
                      <div>
                        <small>STEP 3 · VERIFY BENEFICIARY &amp; PAY</small>
                        <strong>Confirm beneficiary &ldquo;{beneficiaryName}&rdquo; and enter quoted {currency} amount</strong>
                      </div>
                    </div>
                  </div>

                  <div className="supported-apps-block">
                    <small className="supported-apps-label">COMPATIBLE UPI &amp; MOBILE BANKING APPS</small>
                    <div className="supported-apps-tags">
                      {(config.mobileBanking?.supportedApps || []).map((appName) => (
                        <span className="supported-app-chip" key={appName}>
                          {appName}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="payment-card-actions">
                    <button
                      type="button"
                      className="button button-outline"
                      onClick={() => handleCopy('mobile-upi-id', config.upi.id)}
                    >
                      {copiedKey === 'mobile-upi-id' ? <Check size={15} /> : <Copy size={15} />}
                      {copiedKey === 'mobile-upi-id' ? 'UPI ID Copied' : 'Copy UPI ID for Bank App'}
                    </button>
                    {qrReady && (
                      <button
                        type="button"
                        className="button button-outline"
                        onClick={() => setQrModalOpen(true)}
                      >
                        <QrCode size={15} /> Open QR to Scan
                      </button>
                    )}
                  </div>

                  <div className="payment-fallback-note">
                    <Info size={15} />
                    <span>
                      <strong>Note on direct bank transfers:</strong> If you require formal NEFT / IMPS / RTGS bank account details for a corporate or high-value booking, please request them directly from our Sopore travel desk alongside your confirmed invoice.
                    </span>
                  </div>
                </div>
              </article>
            )}

            {/* OPTIONAL 4. DIRECT BANK ACCOUNT TRANSFER (HIDDEN UNLESS CONFIGURED) */}
            {bankReady && (
              <article className="payment-method-card" id="bank-transfer" aria-labelledby="heading-bank">
                <div className="payment-method-header">
                  <span className="payment-method-index">04 · NEFT / IMPS / RTGS</span>
                  <span className="payment-method-icon">
                    <Building2 size={22} />
                  </span>
                </div>
                <h2 id="heading-bank">Direct Bank Transfer</h2>
                <p className="payment-method-desc">
                  Transfer via IMPS, NEFT, or RTGS using your bank&apos;s mobile banking app or internet banking portal.
                </p>

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
                </div>
              </article>
            )}
          </div>

          {/* SHARE PAYMENT REFERENCE / UTR AFTER TRANSFER */}
          <section
            className="payment-reference-section"
            id="share-payment-reference"
            aria-labelledby="heading-payment-ref"
          >
            <div className="payment-reference-grid">
              <div className="payment-reference-intro">
                <span className="eyebrow">AFTER COMPLETING A TRANSFER</span>
                <h2 id="heading-payment-ref">
                  Share your transaction
                  <br />
                  <i>reference / UTR.</i>
                </h2>
                <p>
                  After completing your UPI or mobile banking transfer against your confirmed quotation, share your 12-digit UPI / bank transaction reference (UTR) via WhatsApp or Email so our team at {displayName} can manually verify the transfer.
                </p>
                <ul className="payment-verification-steps">
                  <li>
                    <Check size={15} />
                    <span>All payments are manually verified by {displayName}—this website never claims automatic payment confirmation.</span>
                  </li>
                  <li>
                    <Check size={15} />
                    <span>Sharing your reference opens WhatsApp or your Email app with your transaction details pre-filled.</span>
                  </li>
                  <li>
                    <Check size={15} />
                    <span>Never share your UPI PIN, OTP, card PIN, or net-banking password with anyone.</span>
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
                      placeholder="Name on booking / UPI app"
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
                      placeholder="12-digit UPI reference or UTR ID"
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
                    <span>Payment mode used</span>
                    <select name="method" value={refForm.method} onChange={updateRefField}>
                      <option value="UPI QR Scan & Pay">UPI QR Scan &amp; Pay</option>
                      <option value="UPI ID Transfer">UPI ID Transfer ({config?.upi?.id})</option>
                      <option value="UPI-Enabled Mobile Banking App">UPI-Enabled Mobile Banking App</option>
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
            <span className="eyebrow">{displayName.toUpperCase()}</span>
            <h2>Scan using any UPI application</h2>
            <p className="qr-modal-sub">
              UPI ID: <strong className="payment-mono">{config.upi?.id}</strong>
            </p>
            <div className="qr-modal-frame">
              <img
                src={config.qr.image}
                alt={config.qr.alt || 'Brand Identity Tour & Travel official UPI payment QR code'}
                className="qr-modal-image"
              />
            </div>
            <div className="beneficiary-disclosure-box qr-modal-disclosure">
              <Info size={16} />
              <p>{beneficiaryDisclosure}</p>
            </div>
            <div className="dispatch-actions">
              <a
                href={config.qr.image}
                download="Brand-Identity-Tour-Travel-UPI-QR.jpg"
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
