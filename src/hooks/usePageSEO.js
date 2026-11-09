import { useEffect } from 'react';
import { getRouteSEO, SITE_ORIGIN, toCanonicalUrl, toAbsoluteImageUrl } from '../seoData.js';

function upsertMeta(selector, attrName, attrValue, content) {
  if (!content) return;
  const elements = document.head.querySelectorAll(selector);
  if (elements.length > 0) {
    elements[0].setAttribute('content', content);
    // Remove any accidental duplicates
    for (let i = 1; i < elements.length; i += 1) {
      elements[i].remove();
    }
  } else {
    const meta = document.createElement('meta');
    meta.setAttribute(attrName, attrValue);
    meta.setAttribute('content', content);
    document.head.appendChild(meta);
  }
}

function upsertCanonical(href) {
  if (!href) return;
  const links = document.head.querySelectorAll('link[rel="canonical"]');
  if (links.length > 0) {
    links[0].setAttribute('href', href);
    // Guarantee exactly one canonical link tag
    for (let i = 1; i < links.length; i += 1) {
      links[i].remove();
    }
  } else {
    const link = document.createElement('link');
    link.setAttribute('rel', 'canonical');
    link.setAttribute('href', href);
    document.head.appendChild(link);
  }
}

function upsertJsonLd(schemas) {
  if (!schemas) return;
  const scripts = document.head.querySelectorAll('script[type="application/ld+json"]');
  const payload = JSON.stringify(Array.isArray(schemas) && schemas.length === 1 ? schemas[0] : schemas);
  if (scripts.length > 0) {
    scripts[0].id = 'seo-json-ld';
    scripts[0].textContent = payload;
    for (let i = 1; i < scripts.length; i += 1) {
      scripts[i].remove();
    }
  } else {
    const script = document.createElement('script');
    script.id = 'seo-json-ld';
    script.type = 'application/ld+json';
    script.textContent = payload;
    document.head.appendChild(script);
  }
}

/**
 * Reusable SEO & metadata hook.
 * Accepts either a route path (e.g. '/packages') or an explicit SEO overrides object,
 * and updates existing document head tags without creating duplicates.
 */
export default function usePageSEO(pathOrConfig) {
  useEffect(() => {
    if (typeof document === 'undefined') return;

    const baseSEO =
      typeof pathOrConfig === 'string'
        ? getRouteSEO(pathOrConfig)
        : getRouteSEO(pathOrConfig?.path || '/');

    const overrides = typeof pathOrConfig === 'object' && pathOrConfig !== null ? pathOrConfig : {};

    const title = overrides.title || baseSEO.title;
    const description = overrides.description || baseSEO.description;
    const canonical = overrides.canonical
      ? overrides.canonical.startsWith(SITE_ORIGIN)
        ? overrides.canonical.split('?')[0].split('#')[0]
        : toCanonicalUrl(overrides.canonical)
      : baseSEO.canonical;
    const robots = overrides.robots || baseSEO.robots || 'index, follow';
    const ogTitle = overrides.ogTitle || overrides.title || baseSEO.ogTitle || title;
    const ogDescription =
      overrides.ogDescription || overrides.description || baseSEO.ogDescription || description;
    const ogUrl = overrides.ogUrl || canonical;
    const ogImage = overrides.ogImage
      ? toAbsoluteImageUrl(overrides.ogImage)
      : baseSEO.ogImage;
    const ogType = overrides.ogType || baseSEO.ogType || 'website';
    const twitterCard = overrides.twitterCard || baseSEO.twitterCard || 'summary_large_image';
    const twitterTitle = overrides.twitterTitle || ogTitle;
    const twitterDescription = overrides.twitterDescription || ogDescription;
    const twitterImage = overrides.twitterImage
      ? toAbsoluteImageUrl(overrides.twitterImage)
      : ogImage;
    const jsonLd = overrides.jsonLd || baseSEO.jsonLd;

    document.title = title;
    upsertMeta('meta[name="description"]', 'name', 'description', description);
    upsertMeta('meta[name="robots"]', 'name', 'robots', robots);
    upsertCanonical(canonical);

    upsertMeta('meta[property="og:type"]', 'property', 'og:type', ogType);
    upsertMeta('meta[property="og:url"]', 'property', 'og:url', ogUrl);
    upsertMeta('meta[property="og:title"]', 'property', 'og:title', ogTitle);
    upsertMeta('meta[property="og:description"]', 'property', 'og:description', ogDescription);
    upsertMeta('meta[property="og:image"]', 'property', 'og:image', ogImage);
    upsertMeta('meta[property="og:site_name"]', 'property', 'og:site_name', 'Brand Identity Tour & Travel');

    upsertMeta('meta[name="twitter:card"]', 'name', 'twitter:card', twitterCard);
    upsertMeta('meta[name="twitter:url"]', 'name', 'twitter:url', ogUrl);
    upsertMeta('meta[name="twitter:title"]', 'name', 'twitter:title', twitterTitle);
    upsertMeta('meta[name="twitter:description"]', 'name', 'twitter:description', twitterDescription);
    upsertMeta('meta[name="twitter:image"]', 'name', 'twitter:image', twitterImage);

    upsertJsonLd(jsonLd);
  }, [pathOrConfig]);
}
