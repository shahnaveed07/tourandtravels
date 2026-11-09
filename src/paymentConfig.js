export const paymentDetails = {
  upi: {
    enabled: false,
    id: '',
    payeeName: '',
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
  qr: {
    enabled: false,
    image: '',
    alt: 'Brand Identity Tour & Travel official UPI payment QR',
  },
};

export function isUpiConfigured(upi = paymentDetails.upi) {
  return Boolean(
    upi &&
      upi.enabled === true &&
      typeof upi.id === 'string' &&
      upi.id.trim().length > 0 &&
      typeof upi.payeeName === 'string' &&
      upi.payeeName.trim().length > 0
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
  if (!upi || !upi.id || !upi.payeeName) return '';
  const pa = encodeURIComponent(upi.id.trim());
  const pn = encodeURIComponent(upi.payeeName.trim());
  return `upi://pay?pa=${pa}&pn=${pn}&cu=INR`;
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
  const method = form.method?.trim() || 'UPI / Bank Transfer';

  return (
    `Hello ${brand.name} ${brand.descriptor}!\n\n` +
    `I have completed a payment transfer and would like to share the payment reference for manual verification:\n\n` +
    (payerName ? `• Payer Name: ${payerName}\n` : '') +
    `• Booking Reference: ${bookingRef}\n` +
    `• Transaction Reference / UTR: ${utr}\n` +
    `• Payment Date: ${paymentDate}\n` +
    `• Amount Paid: ₹${amount}\n` +
    `• Payment Method: ${method}\n\n` +
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
