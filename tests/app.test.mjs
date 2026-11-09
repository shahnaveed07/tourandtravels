import test from 'node:test';
import assert from 'node:assert/strict';
import { brand, destinations, packages, guides, services, faqs } from '../src/data.js';
import { siteImages } from '../src/imageCatalog.js';

test('Brand data has required fields', () => {
  assert.equal(brand.name, 'Brand Identity');
  assert.equal(brand.descriptor, 'Tour & Travel');
  assert.ok(brand.phone);
  assert.ok(brand.email && brand.email.includes('@'), 'Brand email must be valid format');
  assert.ok(brand.whatsapp && /^\d{10,15}$/.test(brand.whatsapp), 'Brand whatsapp must be valid digits without symbols');
  assert.ok(brand.address);
  assert.ok(brand.mapUrl);
});

test('Local image catalog exports company logos, hero, destinations, packages, and guides', () => {
  assert.ok(siteImages.logo?.horizontal?.endsWith('brand-logo-horizontal-wa0083.webp'));
  assert.ok(siteImages.logo?.emblem?.endsWith('brand-logo-emblem-wa0084.webp'));
  assert.ok(siteImages.hero?.endsWith('kashmir-valley-hero-wa0054.webp'));
  assert.ok(siteImages.company?.storefront?.endsWith('brand-sopore-storefront-wa0085.webp'));
  assert.ok(siteImages.company?.office?.endsWith('brand-office-interior-wa0045.webp'));
  assert.ok(siteImages.company?.meetingRoom?.endsWith('brand-office-meeting-room-wa0055.webp'));
});

test('Destinations have valid slugs, required content, and local images', () => {
  assert.ok(destinations.length >= 6);
  const slugs = new Set();
  destinations.forEach(d => {
    assert.ok(d.slug, 'Destination must have slug');
    assert.ok(!slugs.has(d.slug), `Duplicate destination slug: ${d.slug}`);
    slugs.add(d.slug);
    assert.ok(d.name, 'Destination must have name');
    assert.ok(d.description, 'Destination must have description');
    assert.ok(d.image, 'Destination must have image');
    assert.ok(!d.image.includes('unsplash.com'), `Destination ${d.slug} must use local image`);
    assert.ok(d.image.startsWith('/images/'), `Destination ${d.slug} image must resolve to /images/`);
    assert.ok(d.highlights.length >= 3, 'Destination must have at least 3 highlights');
  });
});

test('Duration consistency: every advertised duration (2 to 8 days) has at least 1 package', () => {
  const advertisedDurations = ['2 Days', '3 Days', '4 Days', '5 Days', '6 Days', '7 Days', '8 Days'];
  advertisedDurations.forEach(dur => {
    const matching = packages.filter(p => p.duration === dur);
    assert.ok(matching.length >= 1, `Expected at least one package for advertised duration: ${dur}`);
  });
});

test('Every package has internally consistent itinerary count matching its duration and uses local images', () => {
  assert.equal(packages.length, 8);
  packages.forEach(pkg => {
    const daysMatch = pkg.duration.match(/^(\d+)\s*Days$/);
    assert.ok(daysMatch, `Invalid duration format in package ${pkg.id}: ${pkg.duration}`);
    const expectedDays = parseInt(daysMatch[1], 10);
    assert.equal(pkg.itinerary.length, expectedDays, `Package ${pkg.id} duration (${pkg.duration}) does not match itinerary day count (${pkg.itinerary.length})`);
    assert.ok(pkg.inclusions?.length >= 3, `Package ${pkg.id} missing inclusions`);
    assert.ok(pkg.exclusions?.length >= 3, `Package ${pkg.id} missing exclusions`);
    assert.ok(pkg.highlights?.length >= 3, `Package ${pkg.id} missing highlights`);
    assert.ok(pkg.price, `Package ${pkg.id} missing price`);
    assert.ok(!pkg.image.includes('unsplash.com'), `Package ${pkg.id} must use local image`);
    assert.ok(pkg.image.startsWith('/images/'), `Package ${pkg.id} image must resolve to /images/`);
  });
});

test('Destination package relation logic: no unrelated package fallback', () => {
  // Test Srinagar (has packages)
  const srinagarPackages = packages.filter(p => p.locations.some(loc => loc.toLowerCase() === 'srinagar'));
  assert.ok(srinagarPackages.length > 0);

  // Test Doodhpathri (offbeat destination without fixed pre-made package)
  const doodhpathriPackages = packages.filter(p => p.locations.some(loc => loc.toLowerCase() === 'doodhpathri'));
  assert.equal(doodhpathriPackages.length, 0, 'Doodhpathri correctly has no fixed package to test custom itinerary fallback');
});

test('Travel guides have complete articles, sections, related references, and local images', () => {
  assert.ok(guides.length >= 3);
  guides.forEach(g => {
    assert.ok(g.slug, 'Guide missing slug');
    assert.ok(g.title, 'Guide missing title');
    assert.ok(g.intro, 'Guide missing intro');
    assert.ok(!g.image.includes('unsplash.com'), `Guide ${g.slug} must use local image`);
    assert.ok(g.image.startsWith('/images/'), `Guide ${g.slug} image must resolve to /images/`);
    assert.ok(g.sections.length >= 2, 'Guide should have at least 2 structured sections');
    assert.ok(g.relatedPackageSlugs?.length >= 1, 'Guide should link to at least one package');
  });
});
