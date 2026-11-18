import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');

async function traceRequest(startUrl) {
  let current = startUrl;
  const hops = [];
  for (let i = 0; i < 6; i += 1) {
    const res = await fetch(current, { redirect: 'manual' });
    const location = res.headers.get('location');
    const contentType = res.headers.get('content-type') || '';
    if (res.status >= 300 && res.status < 400 && location) {
      const nextUrl = new URL(location, current).toString();
      hops.push({ status: res.status, url: current, location, resolved: nextUrl });
      current = nextUrl;
      continue;
    }
    const body = await res.text();
    return {
      input: startUrl,
      redirectCount: hops.length,
      hops,
      finalUrl: current,
      finalStatus: res.status,
      contentType,
      body,
    };
  }
  throw new Error(`Too many redirects for ${startUrl}`);
}

function assertCondition(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

async function run() {
  const sitemapXmlLocal = fs.readFileSync(path.join(rootDir, 'public', 'sitemap.xml'), 'utf8');
  const expectedUrls = [...sitemapXmlLocal.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);

  console.log('1. Checking apex-to-www permanent redirects...');
  const apexChecks = [
    ['https://bittkashmir.in/', 'https://www.bittkashmir.in/'],
    ['https://bittkashmir.in/packages', 'https://www.bittkashmir.in/packages'],
    ['https://bittkashmir.in/packages?dest=Gulmarg&duration=4%20Days', 'https://www.bittkashmir.in/packages?dest=Gulmarg&duration=4%20Days'],
    ['https://bittkashmir.in/destinations/srinagar', 'https://www.bittkashmir.in/destinations/srinagar'],
    ['https://bittkashmir.in/sitemap.xml', 'https://www.bittkashmir.in/sitemap.xml'],
    ['https://bittkashmir.in/robots.txt', 'https://www.bittkashmir.in/robots.txt'],
  ];

  for (const [input, expectedFinal] of apexChecks) {
    const res = await traceRequest(input);
    assertCondition(res.hops.length >= 1, `Expected redirect from ${input}`);
    assertCondition([301, 308].includes(res.hops[0].status), `Expected 301/308 on ${input}, got ${res.hops[0].status}`);
    assertCondition(res.finalUrl === expectedFinal, `Expected ${input} -> ${expectedFinal}, got ${res.finalUrl}`);
    assertCondition(res.finalStatus === 200, `Expected final HTTP 200 on ${input}, got ${res.finalStatus}`);
  }

  console.log('2. Checking live sitemap.xml and robots.txt...');
  const liveRobots = await traceRequest('https://www.bittkashmir.in/robots.txt');
  assertCondition(liveRobots.redirectCount === 0 && liveRobots.finalStatus === 200, 'robots.txt must return 200 directly');
  assertCondition(liveRobots.body.includes('Sitemap: https://www.bittkashmir.in/sitemap.xml'), 'robots.txt missing www sitemap');

  const liveSitemap = await traceRequest('https://www.bittkashmir.in/sitemap.xml');
  assertCondition(liveSitemap.redirectCount === 0 && liveSitemap.finalStatus === 200, 'sitemap.xml must return 200 directly');
  assertCondition(liveSitemap.contentType.includes('xml'), `sitemap.xml unexpected content-type: ${liveSitemap.contentType}`);
  assertCondition(liveSitemap.body.includes('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'), 'Invalid sitemap namespace');

  const liveLocs = [...liveSitemap.body.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  assertCondition(liveLocs.length === 24, `Expected 24 live sitemap URLs, found ${liveLocs.length}`);

  console.log('3. Checking all 24 sitemap URLs + /privacy + /terms on https://www.bittkashmir.in...');
  const allPublicUrls = [
    ...expectedUrls,
    'https://www.bittkashmir.in/privacy',
    'https://www.bittkashmir.in/terms',
  ];

  for (const url of allPublicUrls) {
    const res = await traceRequest(url);
    assertCondition(res.redirectCount === 0, `Unexpected redirect on ${url}`);
    assertCondition(res.finalStatus === 200, `Expected 200 on ${url}, got ${res.finalStatus}`);
    const canonicals = [...res.body.matchAll(/<link\s+rel="canonical"\s+href="([^"]*)"/gi)].map((m) => m[1]);
    assertCondition(canonicals.length === 1 && canonicals[0] === url, `Canonical mismatch on ${url}: ${JSON.stringify(canonicals)}`);
    const h1Count = (res.body.match(/<h1\b/gi) || []).length;
    assertCondition(h1Count === 1, `Expected 1 H1 on ${url}, found ${h1Count}`);
  }

  console.log('4. Checking verification tag & file...');
  const home = await traceRequest('https://www.bittkashmir.in/');
  assertCondition(
    home.body.includes('<meta name="google-site-verification" content="C9kN406ad9efLwXTJegiy3ASucf6Uvc8_U6ddpkwep0" />'),
    'Live homepage missing Google verification meta tag'
  );
  const gscFile = await traceRequest('https://www.bittkashmir.in/googlefea446053fa36602.html');
  assertCondition(gscFile.finalStatus === 200, 'Verification file must resolve to 200');
  assertCondition(gscFile.body.trim() === 'google-site-verification: googlefea446053fa36602.html', 'Unexpected verification file body');

  console.log(`PASSED: All ${apexChecks.length} apex redirects, ${allPublicUrls.length} canonical www pages, sitemap.xml (24 URLs), robots.txt, and verification checks succeeded live.`);
}

run().catch((err) => {
  console.error('LIVE SMOKE TEST FAILED:', err.message);
  process.exit(1);
});
