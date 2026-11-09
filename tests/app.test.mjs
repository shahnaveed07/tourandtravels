import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { brand, destinations, packages, guides, services, faqs, paymentDetails } from '../src/data.js';
import {
  isUpiConfigured,
  isBankConfigured,
  isQrConfigured,
  buildUpiIntentUrl,
  formatBankDetailsText,
  buildPaymentReferenceMessage,
  buildPaymentReferenceWhatsAppUrl,
  buildPaymentReferenceMailtoUrl,
} from '../src/paymentConfig.js';
import { siteImages } from '../src/imageCatalog.js';
import {
  bookingServices,
  buildTrainHelpWhatsAppUrl,
  buildHelicopterEnquiryWhatsAppUrl,
} from '../src/bookingServices.js';
import {
  SITE_ORIGIN,
  getIndexableRoutes,
  getAllPrerenderRoutes,
  getRouteSEO,
  toCanonicalUrl,
  travelAgencySchema,
} from '../src/seoData.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');
const publicDir = path.join(rootDir, 'public');
const srcDir = path.join(rootDir, 'src');

function getAllFiles(dirPath, arrayOfFiles = []) {
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name);
    if (entry.isDirectory()) {
      getAllFiles(fullPath, arrayOfFiles);
    } else {
      arrayOfFiles.push(fullPath);
    }
  }
  return arrayOfFiles;
}

test('Brand data has required fields, verified contact formats, Google Maps link, and official social URLs', () => {
  assert.equal(brand.name, 'Brand Identity');
  assert.equal(brand.descriptor, 'Tour & Travel');
  assert.equal(brand.phone, '+91 6006343335');
  assert.equal(brand.email, 'bookings@bittkashmir.in');
  assert.equal(brand.whatsapp, '916006343335');
  assert.equal(brand.pinCode, '193201');
  assert.ok(brand.address.includes('Bismillah Market, Sopore, Baramulla'));
  assert.equal(
    brand.mapUrl,
    'https://www.google.com/maps/search/?api=1&query=Brand%20Identity%20Tour%20%26%20Travel%2C%20Bismillah%20Market%2C%20Sopore%2C%20Baramulla%2C%20Jammu%20%26%20Kashmir%2C%20India'
  );
  assert.equal(brand.googleBusinessShareUrl, '');
  assert.equal(brand.social.facebook, 'https://www.facebook.com/brandidentitytourntravel');
  assert.equal(brand.social.instagram, 'https://www.instagram.com/brandidentitytourntravel/');
  assert.equal(brand.social.youtube, 'https://www.youtube.com/@brandidentitytourntravel');

  assert.equal(travelAgencySchema.hasMap, brand.mapUrl);
  assert.deepEqual(travelAgencySchema.sameAs, [
    'https://www.facebook.com/brandidentitytourntravel',
    'https://www.instagram.com/brandidentitytourntravel/',
    'https://www.youtube.com/@brandidentitytourntravel',
  ]);
});

test('1–3. Destination, package, and travel guide slugs are unique and non-empty', () => {
  const destSlugs = new Set();
  for (const d of destinations) {
    assert.ok(d.slug && typeof d.slug === 'string' && d.slug.trim().length > 0, 'Destination slug must be non-empty');
    assert.ok(!destSlugs.has(d.slug), `Duplicate destination slug: ${d.slug}`);
    destSlugs.add(d.slug);
  }
  assert.equal(destSlugs.size, 6);

  const pkgSlugs = new Set();
  for (const p of packages) {
    assert.ok(p.slug && typeof p.slug === 'string' && p.slug.trim().length > 0, 'Package slug must be non-empty');
    assert.ok(!pkgSlugs.has(p.slug), `Duplicate package slug: ${p.slug}`);
    pkgSlugs.add(p.slug);
  }
  assert.equal(pkgSlugs.size, 8);

  const guideSlugs = new Set();
  for (const g of guides) {
    assert.ok(g.slug && typeof g.slug === 'string' && g.slug.trim().length > 0, 'Guide slug must be non-empty');
    assert.ok(!guideSlugs.has(g.slug), `Duplicate guide slug: ${g.slug}`);
    guideSlugs.add(g.slug);
  }
  assert.equal(guideSlugs.size, 3);
});

test('4–7. Cross-reference integrity across packages, destinations, and travel guides', () => {
  const destinationNames = new Set(destinations.map((d) => d.name));
  const destinationSlugs = new Set(destinations.map((d) => d.slug));
  const packageSlugs = new Set(packages.map((p) => p.slug));

  // 4. Every package location matches a real destination name
  for (const pkg of packages) {
    assert.ok(Array.isArray(pkg.locations) && pkg.locations.length > 0);
    for (const loc of pkg.locations) {
      assert.ok(
        destinationNames.has(loc),
        `Package "${pkg.slug}" references unknown destination location "${loc}"`
      );
    }
  }

  // 5. Every destination nearbySlugs entry matches a real destination slug
  for (const dest of destinations) {
    assert.ok(Array.isArray(dest.nearbySlugs) && dest.nearbySlugs.length > 0);
    for (const nearSlug of dest.nearbySlugs) {
      assert.ok(
        destinationSlugs.has(nearSlug),
        `Destination "${dest.slug}" references unknown nearbySlug "${nearSlug}"`
      );
      assert.notEqual(nearSlug, dest.slug, `Destination "${dest.slug}" should not list itself in nearbySlugs`);
    }
  }

  // 6. Every travel guide relatedDestinations entry matches a real destination slug
  // 7. Every travel guide relatedPackageSlugs entry matches a real package slug
  for (const guide of guides) {
    assert.ok(Array.isArray(guide.relatedDestinations) && guide.relatedDestinations.length > 0);
    for (const relDest of guide.relatedDestinations) {
      assert.ok(
        destinationSlugs.has(relDest),
        `Guide "${guide.slug}" references unknown relatedDestination "${relDest}"`
      );
    }

    assert.ok(Array.isArray(guide.relatedPackageSlugs) && guide.relatedPackageSlugs.length > 0);
    for (const relPkg of guide.relatedPackageSlugs) {
      assert.ok(
        packageSlugs.has(relPkg),
        `Guide "${guide.slug}" references unknown relatedPackageSlug "${relPkg}"`
      );
    }
  }
});

test('8. Every image path in src/data.js and src/imageCatalog.js exists on disk in public/images/', () => {
  const imagePaths = new Set();

  function collectImages(value) {
    if (!value) return;
    if (typeof value === 'string') {
      if (value.startsWith('/images/')) {
        imagePaths.add(value);
      }
      return;
    }
    if (Array.isArray(value)) {
      value.forEach(collectImages);
      return;
    }
    if (typeof value === 'object') {
      Object.values(value).forEach(collectImages);
    }
  }

  collectImages(siteImages);
  collectImages(destinations.map((d) => d.image));
  collectImages(packages.map((p) => p.image));
  collectImages(guides.map((g) => g.image));

  assert.ok(imagePaths.size >= 40, `Expected at least 40 catalog images, found ${imagePaths.size}`);

  for (const imgUrl of imagePaths) {
    assert.ok(!imgUrl.includes('unsplash.com'), `Found external Unsplash URL: ${imgUrl}`);
    const diskPath = path.join(publicDir, imgUrl.replace(/^\//, ''));
    assert.ok(fs.existsSync(diskPath), `Missing image file in public/: ${imgUrl} (${diskPath})`);
    const stat = fs.statSync(diskPath);
    assert.ok(stat.size > 0, `Image file is empty: ${diskPath}`);
  }
});

test('9–10. public/sitemap.xml and public/robots.txt contain all 24 canonical https://www.bittkashmir.in URLs (including /payments and /bookings)', () => {
  const robotsTxt = fs.readFileSync(path.join(publicDir, 'robots.txt'), 'utf8');
  assert.ok(robotsTxt.includes('User-agent: *'), 'robots.txt must include User-agent: *');
  assert.ok(robotsTxt.includes('Allow: /'), 'robots.txt must include Allow: /');
  assert.ok(
    robotsTxt.includes('Sitemap: https://www.bittkashmir.in/sitemap.xml'),
    'robots.txt must point to https://www.bittkashmir.in/sitemap.xml'
  );

  const sitemapXml = fs.readFileSync(path.join(publicDir, 'sitemap.xml'), 'utf8');
  assert.ok(!sitemapXml.includes('<lastmod>'), 'sitemap.xml must not include fake lastmod dates');

  const locMatches = [...sitemapXml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  const expectedUrls = getIndexableRoutes().map((r) => toCanonicalUrl(r));

  assert.equal(expectedUrls.length, 24, 'Expected 24 indexable routes (1 home + 6 static + 6 dest + 8 pkg + 3 guides)');
  assert.equal(locMatches.length, 24, `Expected 24 <loc> entries in sitemap.xml, found ${locMatches.length}`);
  assert.ok(locMatches.includes('https://www.bittkashmir.in/payments'), 'sitemap.xml must include https://www.bittkashmir.in/payments');
  assert.ok(locMatches.includes('https://www.bittkashmir.in/bookings'), 'sitemap.xml must include https://www.bittkashmir.in/bookings');

  for (const expectedUrl of expectedUrls) {
    assert.ok(
      locMatches.includes(expectedUrl),
      `Missing expected URL in public/sitemap.xml: ${expectedUrl}`
    );
  }
});

test('11. No source or public file references shahnaveed07.github.io or /tourandtravels/', () => {
  const filesToScan = [
    path.join(rootDir, 'index.html'),
    path.join(rootDir, 'vite.config.js'),
    path.join(rootDir, 'README.md'),
    ...getAllFiles(srcDir),
    ...getAllFiles(publicDir).filter((f) => /\.(txt|xml|html|json|svg|webmanifest)$/i.test(f)),
  ];

  for (const filePath of filesToScan) {
    const content = fs.readFileSync(filePath, 'utf8');
    const relPath = path.relative(rootDir, filePath);
    assert.ok(
      !content.includes('shahnaveed07.github.io'),
      `Found obsolete shahnaveed07.github.io reference in ${relPath}`
    );
    assert.ok(
      !content.includes('/tourandtravels/'),
      `Found obsolete /tourandtravels/ reference in ${relPath}`
    );
  }
});

test('12. Internal links, hash anchors, and external target="_blank" security attributes across src/', () => {
  const srcFiles = getAllFiles(srcDir).filter((f) => /\.(js|jsx)$/i.test(f));
  const servicesContent = fs.readFileSync(path.join(srcDir, 'pages', 'Services.jsx'), 'utf8');

  // Verify Services.jsx defines all anchor IDs linked from Home.jsx
  for (const anchorId of ['tours', 'stays', 'houseboats', 'transport', 'groups', 'experiences']) {
    assert.ok(
      servicesContent.includes(`id: '${anchorId}'`),
      `Services.jsx must define section id="${anchorId}"`
    );
  }

  for (const filePath of srcFiles) {
    const content = fs.readFileSync(filePath, 'utf8');
    const relPath = path.relative(rootDir, filePath);

    // Check for empty or placeholder href/to values
    assert.ok(!/href\s*=\s*["'](?:#|javascript:void\(0\)|)["']/i.test(content), `Invalid empty/# href in ${relPath}`);
    assert.ok(!/\bto\s*=\s*["'](?:#|javascript:void\(0\)|)["']/i.test(content), `Invalid empty/# Link to in ${relPath}`);

    // Check that every target="_blank" in JSX has rel="noopener noreferrer"
    const anchorTagsWithBlank = content.match(/<a\b[^>]*target=["']_blank["'][^>]*>/g) || [];
    for (const tag of anchorTagsWithBlank) {
      assert.ok(
        /rel=["'](?=[^"']*noopener)(?=[^"']*noreferrer)[^"']*["']/.test(tag),
        `External <a target="_blank"> missing rel="noopener noreferrer" in ${relPath}: ${tag}`
      );
    }
  }
});

test('13. All route SEO configurations have unique titles, unique descriptions, single canonicals, and valid JSON-LD (with zero banking/UPI data in metadata)', () => {
  const allRoutes = [...getAllPrerenderRoutes(), '/404-not-found'];
  const seenTitles = new Map();
  const seenDescriptions = new Map();

  for (const route of allRoutes) {
    const seo = getRouteSEO(route);
    assert.ok(seo.title && seo.title.trim().length >= 20, `Route ${route} must have a descriptive title`);
    assert.ok(
      seo.description && seo.description.trim().length >= 50,
      `Route ${route} must have a descriptive meta description`
    );

    assert.ok(
      !seenTitles.has(seo.title),
      `Duplicate SEO title between "${route}" and "${seenTitles.get(seo.title)}": ${seo.title}`
    );
    seenTitles.set(seo.title, route);

    assert.ok(
      !seenDescriptions.has(seo.description),
      `Duplicate SEO description between "${route}" and "${seenDescriptions.get(seo.description)}"`
    );
    seenDescriptions.set(seo.description, route);

    assert.ok(
      seo.canonical.startsWith(SITE_ORIGIN),
      `Canonical URL for ${route} must start with ${SITE_ORIGIN}: ${seo.canonical}`
    );
    assert.ok(!seo.canonical.includes('?') && !seo.canonical.includes('#'), 'Canonical must not contain query/hash');
    assert.ok(seo.ogImage.startsWith(`${SITE_ORIGIN}/images/`), `OG image for ${route} must be absolute local URL`);
    assert.ok(seo.twitterImage.startsWith(`${SITE_ORIGIN}/images/`), `Twitter image for ${route} must be absolute local URL`);

    if (route === '/404-not-found') {
      assert.equal(seo.robots, 'noindex, nofollow');
    } else {
      assert.equal(seo.robots, 'index, follow');
    }

    assert.ok(Array.isArray(seo.jsonLd) && seo.jsonLd.length >= 1, `Route ${route} must include JSON-LD schema`);
    const serialized = JSON.stringify(seo.jsonLd);
    assert.doesNotThrow(() => JSON.parse(serialized), `Invalid JSON-LD on route ${route}`);
    assert.ok(serialized.includes('TravelAgency'), `Route ${route} JSON-LD must include TravelAgency`);

    // Ensure no bank account numbers, IFSC codes, or UPI VPA strings appear in JSON-LD or SEO metadata
    assert.ok(!/upi:\/\/pay/i.test(serialized), `JSON-LD on ${route} must not expose UPI links`);
    assert.ok(!/ifsc/i.test(serialized), `JSON-LD on ${route} must not expose IFSC details`);
    assert.ok(!/accountNumber/i.test(serialized), `JSON-LD on ${route} must not expose bank account numbers`);
  }

  const paymentsSeo = getRouteSEO('/payments');
  assert.equal(paymentsSeo.canonical, 'https://www.bittkashmir.in/payments');
  assert.ok(paymentsSeo.title.includes('Payment Methods'));

  // Filtered package query URLs must resolve to canonical https://www.bittkashmir.in/packages
  const filteredPackagesSEO = getRouteSEO('/packages?dest=Gulmarg&duration=4%20Days&type=Family');
  assert.equal(filteredPackagesSEO.canonical, 'https://www.bittkashmir.in/packages');
});

test('14. Build-time prerender HTML injection & dist output verification', async () => {
  const { buildSitemapXml, injectHeadMetadata } = await import('../scripts/generate-seo.mjs');
  const generatedXml = buildSitemapXml();
  const savedXml = fs.readFileSync(path.join(publicDir, 'sitemap.xml'), 'utf8');
  assert.equal(generatedXml, savedXml, 'public/sitemap.xml must stay in sync with buildSitemapXml()');

  const templateHtml = fs.readFileSync(path.join(rootDir, 'index.html'), 'utf8');
  const sampleSeo = getRouteSEO('/packages/kashmir-valley-escape');
  const injected = injectHeadMetadata(templateHtml, sampleSeo, '<h1>Kashmir Valley Escape</h1>');
  assert.ok(injected.includes('<title>Kashmir Valley Escape (4 Days / 3 Nights) — Kashmir Package | Brand Identity Tour &amp; Travel</title>'));
  assert.ok(injected.includes(`<link rel="canonical" href="https://www.bittkashmir.in/packages/kashmir-valley-escape" />`));
  assert.ok(injected.includes('<div id="root"><h1>Kashmir Valley Escape</h1></div>'));

  const canonicalCount = (injected.match(/<link\s+rel="canonical"/g) || []).length;
  assert.equal(canonicalCount, 1, 'Injected HTML must have exactly one canonical tag');

  const distDir = path.join(rootDir, 'dist');
  if (fs.existsSync(path.join(distDir, 'index.html'))) {
    for (const route of getAllPrerenderRoutes()) {
      const htmlPath =
        route === '/'
          ? path.join(distDir, 'index.html')
          : path.join(distDir, route.slice(1), 'index.html');
      assert.ok(fs.existsSync(htmlPath), `Missing prerendered route file: ${htmlPath}`);
      const html = fs.readFileSync(htmlPath, 'utf8');
      const expectedSeo = getRouteSEO(route);
      assert.ok(html.includes(`<link rel="canonical" href="${expectedSeo.canonical}" />`), `Prerendered ${route} missing canonical`);
      assert.equal((html.match(/<link\s+rel="canonical"/g) || []).length, 1, `Duplicate canonical in ${route}`);
      assert.ok(!html.includes('<div id="root"></div>'), `Prerendered ${route} should have non-empty #root markup`);
    }
    assert.ok(fs.existsSync(path.join(distDir, '404.html')), 'dist/404.html must exist');
    assert.ok(fs.existsSync(path.join(distDir, 'CNAME')), 'dist/CNAME must exist');
    assert.ok(fs.existsSync(path.join(distDir, 'googlefea446053fa36602.html')), 'dist/googlefea446053fa36602.html must exist');
  }
});

test('15. Official payment QR asset, UPI ID configuration, beneficiary disclosure, and Payments page rendering', async () => {
  // 1. Official QR image file exists on disk
  assert.equal(paymentDetails.qr.enabled, true);
  assert.equal(paymentDetails.qr.image, '/assets/aistudio/IMG-20261109-WA0096_576732db.jpg');
  const qrDiskPath = path.join(publicDir, paymentDetails.qr.image.replace(/^\//, ''));
  assert.ok(fs.existsSync(qrDiskPath), `Official QR image must exist on disk at ${qrDiskPath}`);
  assert.ok(fs.statSync(qrDiskPath).size > 0, 'Official QR image file must not be empty');

  // 2. UPI ID, display name, and actual encoded beneficiary name configuration
  assert.equal(paymentDetails.displayName, 'Brand Identity Tour & Travel');
  assert.equal(paymentDetails.currency, 'INR');
  assert.equal(paymentDetails.upi.enabled, true);
  assert.equal(paymentDetails.upi.id, 'kashmirilovers1234567890@oksbi');
  assert.equal(paymentDetails.upi.displayName, 'Brand Identity Tour & Travel');
  assert.equal(paymentDetails.upi.beneficiaryName, 'Syed Muzaffar');
  assert.notEqual(
    paymentDetails.upi.beneficiaryName,
    paymentDetails.displayName,
    'Actual encoded beneficiary name must not be overwritten with business display name'
  );

  assert.equal(isUpiConfigured(paymentDetails.upi), true);
  assert.equal(isQrConfigured(paymentDetails.qr), true);

  // 3. UPI deep link preserves actual encoded beneficiary name and does not hardcode an amount
  const upiUrl = buildUpiIntentUrl(paymentDetails.upi);
  assert.equal(
    upiUrl,
    'upi://pay?pa=kashmirilovers1234567890%40oksbi&pn=Syed%20Muzaffar&cu=INR'
  );
  assert.ok(!upiUrl.includes('am='), 'UPI intent URL must not prefill a fixed payment amount');

  // 4. Direct NEFT/IMPS/RTGS bank transfer remains disabled until actual business bank details are supplied
  assert.equal(paymentDetails.bank.enabled, false);
  assert.equal(paymentDetails.bank.accountHolder, '');
  assert.equal(paymentDetails.bank.bankName, '');
  assert.equal(paymentDetails.bank.accountNumber, '');
  assert.equal(paymentDetails.bank.ifsc, '');
  assert.equal(isBankConfigured(paymentDetails.bank), false);
  assert.equal(formatBankDetailsText(paymentDetails.bank), '');

  // 5. Render /payments route via Vite SSR and verify all required elements
  const { createServer } = await import('vite');
  const vite = await createServer({
    root: rootDir,
    logLevel: 'error',
    server: { middlewareMode: true },
    appType: 'custom',
  });
  let paymentsHtml = '';
  try {
    const { renderRoute } = await vite.ssrLoadModule('/src/entry-server.jsx');
    const { getConfiguredSocialItems } = await vite.ssrLoadModule('/src/components/SocialLinks.jsx');
    const socialItems = getConfiguredSocialItems();
    assert.equal(socialItems.length, 3);
    assert.deepEqual(
      socialItems.map((s) => s.key),
      ['facebook', 'instagram', 'youtube']
    );
    paymentsHtml = renderRoute('/payments');
  } finally {
    await vite.close();
  }
  assert.ok(paymentsHtml.includes('Brand Identity Tour &amp; Travel'));
  assert.ok(paymentsHtml.includes('kashmirilovers1234567890@oksbi'));
  assert.ok(paymentsHtml.includes('Syed Muzaffar'));
  assert.ok(paymentsHtml.includes('/assets/aistudio/IMG-20261109-WA0096_576732db.jpg'));
  assert.ok(
    paymentsHtml.includes(
      'When scanning this QR, your UPI application may display the registered beneficiary name Syed Muzaffar. Please verify the beneficiary details before confirming payment.'
    ),
    'Payments page must display exact transparent beneficiary disclosure note'
  );
  assert.ok(
    paymentsHtml.includes(
      'Please make payment only after receiving your confirmed itinerary and payment instructions. Verify the beneficiary name and UPI details before confirming the transfer.'
    ),
    'Payments page must display exact customer payment safety notice'
  );
  assert.ok(paymentsHtml.includes('Copy UPI ID'));
  assert.ok(paymentsHtml.includes('Open UPI App'));
  assert.ok(paymentsHtml.includes('View Larger QR'));
  assert.ok(paymentsHtml.includes('Download QR'));
  assert.ok(paymentsHtml.includes('Google Pay'));
  assert.ok(paymentsHtml.includes('PhonePe'));
  assert.ok(paymentsHtml.includes('Paytm'));
  assert.ok(paymentsHtml.includes('BHIM'));
  assert.ok(
    !paymentsHtml.includes('data-testid="bank-configured"'),
    'Unconfigured direct bank transfer section must remain hidden'
  );

  // 6. Test post-transfer reference message builders
  const sampleForm = {
    bookingRef: 'BITT-2026-104',
    utr: '412345678901',
    paymentDate: '2026-05-15',
    amount: '18,500',
    payerName: 'Aamir Khan',
    method: 'UPI QR Scan & Pay',
  };
  const refMsg = buildPaymentReferenceMessage(brand, sampleForm);
  assert.ok(refMsg.includes('BITT-2026-104'));
  assert.ok(refMsg.includes('412345678901'));
  assert.ok(refMsg.includes('₹18,500'));

  const waUrl = buildPaymentReferenceWhatsAppUrl(brand, sampleForm);
  assert.ok(waUrl.startsWith('https://wa.me/916006343335?text='));

  const mailUrl = buildPaymentReferenceMailtoUrl(brand, sampleForm);
  assert.ok(mailUrl.startsWith('mailto:bookings@bittkashmir.in?subject='));

  // 7. Verify Footer and App route include /payments
  const footerContent = fs.readFileSync(path.join(srcDir, 'components', 'Footer.jsx'), 'utf8');
  assert.ok(footerContent.includes('to="/payments"'), 'Footer must include navigation link to /payments');
  const appContent = fs.readFileSync(path.join(srcDir, 'App.jsx'), 'utf8');
  assert.ok(appContent.includes('path="/payments"'), 'App.jsx must define route path="/payments"');
});

test('Duration and package itinerary consistency', () => {
  const advertisedDurations = ['2 Days', '3 Days', '4 Days', '5 Days', '6 Days', '7 Days', '8 Days'];
  for (const dur of advertisedDurations) {
    const matching = packages.filter((p) => p.duration === dur);
    assert.ok(matching.length >= 1, `Expected at least one package for advertised duration: ${dur}`);
  }

  for (const pkg of packages) {
    const daysMatch = pkg.duration.match(/^(\d+)\s*Days$/);
    assert.ok(daysMatch);
    const expectedDays = parseInt(daysMatch[1], 10);
    assert.equal(pkg.itinerary.length, expectedDays);
  }
});

test('16. Centralized bookingServices configuration, official portal URLs, WhatsApp helpers, and /bookings SSR rendering', async () => {
  // 1. Official booking portal URLs
  assert.equal(bookingServices.vandeBharat.primaryUrl, 'https://www.irctc.co.in/nget/train-search');
  assert.equal(bookingServices.vandeBharat.primaryLabel, 'Book Train Tickets on IRCTC');
  assert.equal(bookingServices.vandeBharat.secondaryLabel, 'Need Help with Train Booking?');
  assert.equal(bookingServices.vandeBharat.steps.length, 6);

  assert.equal(bookingServices.gulmargGondola.primaryUrl, 'https://etickets.jammukashmircablecar.com/');
  assert.equal(bookingServices.gulmargGondola.alternateUrl, 'https://eticket.webfront.in/');
  assert.equal(bookingServices.gulmargGondola.primaryLabel, 'Book Gulmarg Gondola Tickets');
  assert.equal(bookingServices.gulmargGondola.alternateLabel, 'Open Alternate Booking Portal');
  assert.equal(bookingServices.gulmargGondola.phases.length, 2);
  assert.equal(bookingServices.gulmargGondola.phases[0].route, 'Gulmarg to Kongdori');
  assert.equal(bookingServices.gulmargGondola.phases[1].route, 'Kongdori to Apharwat');
  assert.equal(
    bookingServices.gulmargGondola.notice,
    'Ticket availability, operating schedules and weather-related restrictions are controlled by the official corporation. Check the official portal before travel.'
  );

  assert.equal(bookingServices.helicopter.amarnath.infoUrl, 'https://jksasb.nic.in/Heli-Services.html');
  assert.equal(bookingServices.helicopter.amarnath.onlineServicesUrl, 'https://jksasb.nic.in/onlineservices/');
  assert.equal(bookingServices.helicopter.amarnath.primaryLabel, 'Official Amarnath Helicopter Booking');
  assert.equal(
    bookingServices.helicopter.amarnath.safetyWarning,
    'Amarnath Yatra helicopter tickets must be booked through the official Shri Amarnathji Shrine Board portal. Do not pay unofficial agents claiming to issue Shrine Board helicopter tickets.'
  );
  assert.equal(
    bookingServices.helicopter.charter.whatsappPrefill,
    'Hello Brand Identity Tour & Travel. I would like to enquire about helicopter/chopper services. My preferred route, travel date and passenger count are:'
  );

  // 2. WhatsApp helper URLs
  const trainWaUrl = buildTrainHelpWhatsAppUrl();
  assert.ok(trainWaUrl.startsWith('https://wa.me/916006343335?text='));
  const heliWaUrl = buildHelicopterEnquiryWhatsAppUrl();
  assert.ok(heliWaUrl.startsWith('https://wa.me/916006343335?text='));
  assert.ok(
    decodeURIComponent(heliWaUrl.split('text=')[1]).includes(
      'Hello Brand Identity Tour & Travel. I would like to enquire about helicopter/chopper services. My preferred route, travel date and passenger count are:'
    )
  );

  // 3. SEO for /bookings
  const bookingsSeo = getRouteSEO('/bookings');
  assert.equal(bookingsSeo.title, 'Travel & Activity Bookings | Brand Identity Tour & Travel');
  assert.equal(bookingsSeo.canonical, 'https://www.bittkashmir.in/bookings');

  // 4. SSR render of /bookings and /services
  const { createServer } = await import('vite');
  const vite = await createServer({
    root: rootDir,
    logLevel: 'error',
    server: { middlewareMode: true },
    appType: 'custom',
  });
  let bookingsHtml = '';
  let servicesHtml = '';
  try {
    const { renderRoute } = await vite.ssrLoadModule('/src/entry-server.jsx');
    bookingsHtml = renderRoute('/bookings');
    servicesHtml = renderRoute('/services');
  } finally {
    await vite.close();
  }

  assert.ok(bookingsHtml.includes('https://www.irctc.co.in/nget/train-search'));
  assert.ok(bookingsHtml.includes('Book Train Tickets on IRCTC'));
  assert.ok(bookingsHtml.includes('Need Help with Train Booking?'));
  assert.ok(bookingsHtml.includes('https://etickets.jammukashmircablecar.com/'));
  assert.ok(bookingsHtml.includes('https://eticket.webfront.in/'));
  assert.ok(bookingsHtml.includes('Gulmarg to Kongdori'));
  assert.ok(bookingsHtml.includes('Kongdori to Apharwat'));
  assert.ok(bookingsHtml.includes('https://jksasb.nic.in/onlineservices/'));
  assert.ok(bookingsHtml.includes('https://jksasb.nic.in/Heli-Services.html'));
  assert.ok(bookingsHtml.includes('Official Amarnath Helicopter Booking'));
  assert.ok(
    bookingsHtml.includes(
      'Amarnath Yatra helicopter tickets must be booked through the official Shri Amarnathji Shrine Board portal. Do not pay unofficial agents claiming to issue Shrine Board helicopter tickets.'
    )
  );
  assert.ok(servicesHtml.includes('/bookings'), 'Services page must link to /bookings');
});

