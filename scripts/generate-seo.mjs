import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  getIndexableRoutes,
  getAllPrerenderRoutes,
  getRouteSEO,
  toCanonicalUrl,
} from '../src/seoData.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');
const publicDir = path.join(rootDir, 'public');
const distDir = path.join(rootDir, 'dist');

function escapeHtmlAttr(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function escapeHtmlText(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

export function buildSitemapXml() {
  const routes = getIndexableRoutes();
  const urlEntries = routes
    .map((route) => {
      const loc = toCanonicalUrl(route);
      return `  <url>\n    <loc>${loc}</loc>\n  </url>`;
    })
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urlEntries}\n</urlset>\n`;
}

export function injectHeadMetadata(templateHtml, seo, renderedAppHtml = '') {
  let html = templateHtml;

  // Replace <title>
  html = html.replace(
    /<title>[\s\S]*?<\/title>/i,
    `<title>${escapeHtmlText(seo.title)}</title>`
  );

  // Replace meta description
  html = html.replace(
    /<meta\s+name="description"\s+content="[^"]*"\s*\/?>/i,
    `<meta name="description" content="${escapeHtmlAttr(seo.description)}" />`
  );

  // Replace meta robots
  html = html.replace(
    /<meta\s+name="robots"\s+content="[^"]*"\s*\/?>/i,
    `<meta name="robots" content="${escapeHtmlAttr(seo.robots)}" />`
  );

  // Replace canonical link
  html = html.replace(
    /<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/i,
    `<link rel="canonical" href="${escapeHtmlAttr(seo.canonical)}" />`
  );

  // Replace Open Graph tags
  html = html.replace(
    /<meta\s+property="og:type"\s+content="[^"]*"\s*\/?>/i,
    `<meta property="og:type" content="${escapeHtmlAttr(seo.ogType)}" />`
  );
  html = html.replace(
    /<meta\s+property="og:url"\s+content="[^"]*"\s*\/?>/i,
    `<meta property="og:url" content="${escapeHtmlAttr(seo.ogUrl)}" />`
  );
  html = html.replace(
    /<meta\s+property="og:title"\s+content="[^"]*"\s*\/?>/i,
    `<meta property="og:title" content="${escapeHtmlAttr(seo.ogTitle)}" />`
  );
  html = html.replace(
    /<meta\s+property="og:description"\s+content="[^"]*"\s*\/?>/i,
    `<meta property="og:description" content="${escapeHtmlAttr(seo.ogDescription)}" />`
  );
  html = html.replace(
    /<meta\s+property="og:image"\s+content="[^"]*"\s*\/?>/i,
    `<meta property="og:image" content="${escapeHtmlAttr(seo.ogImage)}" />`
  );

  // Replace Twitter tags
  html = html.replace(
    /<meta\s+name="twitter:card"\s+content="[^"]*"\s*\/?>/i,
    `<meta name="twitter:card" content="${escapeHtmlAttr(seo.twitterCard)}" />`
  );
  html = html.replace(
    /<meta\s+name="twitter:url"\s+content="[^"]*"\s*\/?>/i,
    `<meta name="twitter:url" content="${escapeHtmlAttr(seo.ogUrl)}" />`
  );
  html = html.replace(
    /<meta\s+name="twitter:title"\s+content="[^"]*"\s*\/?>/i,
    `<meta name="twitter:title" content="${escapeHtmlAttr(seo.twitterTitle)}" />`
  );
  html = html.replace(
    /<meta\s+name="twitter:description"\s+content="[^"]*"\s*\/?>/i,
    `<meta name="twitter:description" content="${escapeHtmlAttr(seo.twitterDescription)}" />`
  );
  html = html.replace(
    /<meta\s+name="twitter:image"\s+content="[^"]*"\s*\/?>/i,
    `<meta name="twitter:image" content="${escapeHtmlAttr(seo.twitterImage)}" />`
  );

  // Replace JSON-LD script
  const jsonLdPayload = JSON.stringify(
    Array.isArray(seo.jsonLd) && seo.jsonLd.length === 1 ? seo.jsonLd[0] : seo.jsonLd,
    null,
    2
  );
  html = html.replace(
    /<script[^>]*type="application\/ld\+json"[^>]*>[\s\S]*?<\/script>/i,
    `<script id="seo-json-ld" type="application/ld+json">\n${jsonLdPayload}\n    </script>`
  );

  // Inject prerendered HTML into #root
  if (renderedAppHtml) {
    html = html.replace(
      /<div id="root"><\/div>/i,
      `<div id="root">${renderedAppHtml}</div>`
    );
  }

  return html;
}

async function main() {
  const shouldPrerender = process.argv.includes('--prerender');

  // 1. Always write public/sitemap.xml from data source of truth
  const sitemapXml = buildSitemapXml();
  fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemapXml, 'utf8');
  if (fs.existsSync(distDir)) {
    fs.writeFileSync(path.join(distDir, 'sitemap.xml'), sitemapXml, 'utf8');
  }

  if (!shouldPrerender) {
    console.log(`Generated public/sitemap.xml with ${getIndexableRoutes().length} indexable URLs.`);
    return;
  }

  if (!fs.existsSync(path.join(distDir, 'index.html'))) {
    throw new Error('dist/index.html not found. Run vite build before prerendering.');
  }

  const templateHtml = fs.readFileSync(path.join(distDir, 'index.html'), 'utf8');

  // 2. Load SSR renderer via Vite's built-in SSR module loader
  const { createServer } = await import('vite');
  const vite = await createServer({
    root: rootDir,
    logLevel: 'error',
    server: { middlewareMode: true },
    appType: 'custom',
  });

  try {
    const { renderRoute } = await vite.ssrLoadModule('/src/entry-server.jsx');
    const allRoutes = getAllPrerenderRoutes();

    for (const route of allRoutes) {
      const seo = getRouteSEO(route);
      const appHtml = renderRoute(route);
      const fullHtml = injectHeadMetadata(templateHtml, seo, appHtml);

      const targetFile =
        route === '/'
          ? path.join(distDir, 'index.html')
          : path.join(distDir, route.slice(1), 'index.html');

      fs.mkdirSync(path.dirname(targetFile), { recursive: true });
      fs.writeFileSync(targetFile, fullHtml, 'utf8');
    }

    // Also generate dist/404.html with 404 metadata (noindex, nofollow) for unknown paths
    const seo404 = getRouteSEO('/404-not-found');
    const html404 = injectHeadMetadata(templateHtml, seo404, renderRoute('/404-not-found'));
    fs.writeFileSync(path.join(distDir, '404.html'), html404, 'utf8');

    // Ensure .nojekyll exists in dist/
    fs.writeFileSync(path.join(distDir, '.nojekyll'), '', 'utf8');

    console.log(
      `Prerendered ${allRoutes.length} routes + 404.html and generated sitemap.xml (${getIndexableRoutes().length} URLs).`
    );
  } finally {
    await vite.close();
  }
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  main().catch((err) => {
    console.error(err);
    process.exit(1);
  });
}
