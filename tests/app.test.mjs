import test from 'node:test';
import assert from 'node:assert/strict';
import { brand, destinations, packages, guides, services, faqs } from '../src/data.js';

test('Brand data has required fields', () => {
  assert.equal(brand.name, 'Brand Identity');
  assert.equal(brand.descriptor, 'Tour & Travel');
  assert.ok(brand.phone);
  assert.ok(brand.email);
  assert.ok(brand.whatsapp);
  assert.ok(brand.address);
});

test('Destinations have valid slugs and required content', () => {
  assert.ok(destinations.length >= 6);
  const slugs = new Set();
  destinations.forEach(d => {
    assert.ok(d.slug, 'Destination must have slug');
    assert.ok(!slugs.has(d.slug), `Duplicate destination slug: ${d.slug}`);
    slugs.add(d.slug);
    assert.ok(d.name, 'Destination must have name');
    assert.ok(d.description, 'Destination must have description');
    assert.ok(d.image, 'Destination must have image');
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

test('Every package has internally consistent itinerary count matching its duration', () => {
  packages.forEach(pkg => {
    const daysMatch = pkg.duration.match(/^(\d+)\s*Days$/);
    assert.ok(daysMatch, `Invalid duration format in package ${pkg.id}: ${pkg.duration}`);
    const expectedDays = parseInt(daysMatch[1], 10);
    assert.equal(pkg.itinerary.length, expectedDays, `Package ${pkg.id} duration (${pkg.duration}) does not match itinerary day count (${pkg.itinerary.length})`);
    assert.ok(pkg.inclusions?.length >= 3, `Package ${pkg.id} missing inclusions`);
    assert.ok(pkg.exclusions?.length >= 3, `Package ${pkg.id} missing exclusions`);
    assert.ok(pkg.highlights?.length >= 3, `Package ${pkg.id} missing highlights`);
    assert.ok(pkg.price, `Package ${pkg.id} missing price`);
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

test('Travel guides have complete articles, sections, and related references', () => {
  assert.ok(guides.length >= 3);
  guides.forEach(g => {
    assert.ok(g.slug, 'Guide missing slug');
    assert.ok(g.title, 'Guide missing title');
    assert.ok(g.intro, 'Guide missing intro');
    assert.ok(g.sections.length >= 2, 'Guide should have at least 2 structured sections');
    assert.ok(g.relatedPackageSlugs?.length >= 1, 'Guide should link to at least one package');
  });
});
