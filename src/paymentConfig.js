export const paymentDetails = {
  displayName: 'Brand Identity Tour & Travel',
  currency: 'INR',
  beneficiaryDisclosure:
    'When scanning this QR, your UPI application may display the registered beneficiary name Syed Muzaffar. Please verify the beneficiary details before confirming payment.',
  safetyNotice:
    'Please make payment only after receiving your confirmed itinerary and payment instructions. Verify the beneficiary name and UPI details before confirming the transfer.',
  upi: {
    enabled: true,
    id: 'kashmirilovers1234567890@oksbi',
    displayName: 'Brand Identity Tour & Travel',
    beneficiaryName: 'Syed Muzaffar',
    currency: 'INR',
  },
  qr: {
    enabled: true,
    image: '/assets/aistudio/IMG-20261109-WA0096_576732db.jpg',
    alt: 'Brand Identity Tour & Travel official UPI payment QR code',
    displayName: 'Brand Identity Tour & Travel',
    beneficiaryName: 'Syed Muzaffar',
  },
  mobileBanking: {
    enabled: true,
    supportedApps: [
      'Google Pay',
      'PhonePe',
      'Paytm',
      'BHIM',
      'UPI-enabled mobile banking apps',
    ],
  },
  bank: {
    enabled: false,
    accountHolder: '',
    bankName: '',
    accountNumber: '',
    ifsc: '',
    accountType: '',
    branch: '',
  },
};

export function isUpiConfigured(upi = paymentDetails.upi) {
  return Boolean(
    upi &&
      upi.enabled === true &&
      typeof upi.id === 'string' &&
      upi.id.trim().length > 0 &&
      typeof (upi.beneficiaryName || upi.payeeName) === 'string' &&
      (upi.beneficiaryName || upi.payeeName).trim().length > 0
  );
}

export function isBankConfigured(bank = paymentDetails.bank) {
  return Boolean(
    bank &&
      bank.enabled === true &&
      typeof bank.accountHolder === 'string' &&
      bank.accountHolder.trim().length > 0 &&
      typeof bank.bankName === 'string' &&
      bank.bankName.trim().length > 0 &&
      typeof bank.accountNumber === 'string' &&
      bank.accountNumber.trim().length > 0 &&
      typeof bank.ifsc === 'string' &&
      bank.ifsc.trim().length > 0 &&
      typeof bank.accountType === 'string' &&
      bank.accountType.trim().length > 0
  );
}

export function isQrConfigured(qr = paymentDetails.qr) {
  return Boolean(
    qr &&
      qr.enabled === true &&
      typeof qr.image === 'string' &&
      qr.image.trim().length > 0
  );
}

export function buildUpiIntentUrl(upi = paymentDetails.upi) {
  const beneficiary = upi?.beneficiaryName || upi?.payeeName || '';
  if (!upi || !upi.id || !beneficiary) return '';
  const pa = encodeURIComponent(upi.id.trim());
  const pn = encodeURIComponent(beneficiary.trim());
  const cu = encodeURIComponent((upi.currency || 'INR').trim());
  return `upi://pay?pa=${pa}&pn=${pn}&cu=${cu}`;
}

export function formatBankDetailsText(bank = paymentDetails.bank) {
  if (!isBankConfigured(bank)) return '';
  const lines = [
    `Account Holder Name: ${bank.accountHolder.trim()}`,
    `Bank Name: ${bank.bankName.trim()}`,
    `Account Number: ${bank.accountNumber.trim()}`,
    `IFSC Code: ${bank.ifsc.trim()}`,
    `Account Type: ${bank.accountType.trim()}`,
  ];
  if (bank.branch && bank.branch.trim()) {
    lines.push(`Branch: ${bank.branch.trim()}`);
  }
  return lines.join('\n');
}

export function buildPaymentReferenceMessage(brand, form) {
  const bookingRef = form.bookingRef?.trim() || 'Not specified';
  const utr = form.utr?.trim() || '';
  const paymentDate = form.paymentDate?.trim() || '';
  const amount = form.amount?.trim() || '';
  const payerName = form.payerName?.trim() || '';
  const method = form.method?.trim() || 'UPI / QR Scan & Pay';

  return (
    `Hello ${brand.name} ${brand.descriptor}!\n\n` +
    `I have completed a payment transfer and would like to share the transaction reference / UTR for manual verification:\n\n` +
    (payerName ? `• Payer Name: ${payerName}\n` : '') +
    `• Booking Reference: ${bookingRef}\n` +
    `• Transaction Reference / UTR: ${utr}\n` +
    `• Payment Date: ${paymentDate}\n` +
    `• Amount Paid: ₹${amount} (INR)\n` +
    `• Payment Mode: ${method}\n\n` +
    `Please verify and confirm receipt at your convenience.`
  );
}

export function buildPaymentReferenceWhatsAppUrl(brand, form) {
  const text = buildPaymentReferenceMessage(brand, form);
  return `https://wa.me/${brand.whatsapp}?text=${encodeURIComponent(text)}`;
}

export function buildPaymentReferenceMailtoUrl(brand, form) {
  const refLabel = form.bookingRef?.trim() ? ` (${form.bookingRef.trim()})` : '';
  const subject = `Payment Reference / UTR Submission${refLabel} — ${brand.name} ${brand.descriptor}`;
  const body = buildPaymentReferenceMessage(brand, form);
  return `mailto:${brand.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
