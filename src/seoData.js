import { brand, destinations, packages, guides } from './data.js';
import { siteImages } from './imageCatalog.js';

export const SITE_ORIGIN = 'https://www.bittkashmir.in';

export function toAbsoluteImageUrl(relativePath) {
  if (!relativePath) return `${SITE_ORIGIN}/images/kashmir-valley-hero-wa0054.webp`;
  if (relativePath.startsWith('http://') || relativePath.startsWith('https://')) {
    return relativePath;
  }
  const normalized = relativePath.startsWith('/') ? relativePath : `/${relativePath}`;
  return `${SITE_ORIGIN}${normalized}`;
}

export function normalizeCanonicalPath(pathname = '/') {
  const clean = String(pathname || '/').split('?')[0].split('#')[0].trim();
  if (!clean || clean === '/') return '/';
  const withLeadingSlash = clean.startsWith('/') ? clean : `/${clean}`;
  return withLeadingSlash.length > 1 && withLeadingSlash.endsWith('/')
    ? withLeadingSlash.slice(0, -1)
    : withLeadingSlash;
}

export function toCanonicalUrl(pathname = '/') {
  const normalizedPath = normalizeCanonicalPath(pathname);
  return normalizedPath === '/' ? `${SITE_ORIGIN}/` : `${SITE_ORIGIN}${normalizedPath}`;
}

export const travelAgencySchema = {
  '@context': 'https://schema.org',
  '@type': 'TravelAgency',
  '@id': `${SITE_ORIGIN}/#organization`,
  name: `${brand.name} ${brand.descriptor}`,
  description:
    'Kashmir travel agency in Sopore, Baramulla offering tailored tour packages, Srinagar houseboat stays, Gulmarg, Pahalgam, Sonamarg & Gurez Valley itineraries, and private cab coordination.',
  url: SITE_ORIGIN,
  logo: toAbsoluteImageUrl(siteImages.logo.horizontal),
  image: toAbsoluteImageUrl(siteImages.company.storefront),
  telephone: '+91-6006343335',
  email: brand.email,
  hasMap: brand.mapUrl,
  sameAs: [brand.social?.facebook, brand.social?.instagram, brand.social?.youtube].filter(
    (url) => typeof url === 'string' && url.startsWith('http')
  ),
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Bismillah Market',
    addressLocality: 'Sopore',
    addressRegion: 'Baramulla, Jammu & Kashmir',
    postalCode: brand.pinCode,
    addressCountry: 'IN',
  },
  areaServed: {
    '@type': 'AdministrativeArea',
    name: 'Jammu and Kashmir, India',
  },
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    opens: '10:00',
    closes: '18:00',
  },
};

export function buildBreadcrumbSchema(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function getIndexableRoutes() {
  return [
    '/',
    '/packages',
    '/services',
    '/bookings',
    '/about',
    '/contact',
    '/payments',
    ...destinations.map((d) => `/destinations/${d.slug}`),
    ...packages.map((p) => `/packages/${p.slug}`),
    ...guides.map((g) => `/travel-guides/${g.slug}`),
  ];
}

export function getAllPrerenderRoutes() {
  return [...getIndexableRoutes(), '/privacy', '/terms'];
}

export function getRouteSEO(pathname = '/') {
  const cleanPath = normalizeCanonicalPath(pathname);
  const canonical = toCanonicalUrl(cleanPath);

  if (cleanPath === '/') {
    const ogImage = toAbsoluteImageUrl(siteImages.hero);
    const title = 'Brand Identity Tour & Travel — Kashmir Tour Packages, Stays & Private Transfers';
    const description =
      'Plan your Kashmir holiday with Brand Identity Tour & Travel in Sopore, J&K. Curated Srinagar, Gulmarg, Pahalgam, Sonamarg & Gurez Valley tour packages, houseboats and private cabs.';
    return {
      title,
      description,
      canonical,
      robots: 'index, follow',
      ogTitle: title,
      ogDescription: description,
      ogUrl: canonical,
      ogImage,
      ogType: 'website',
      twitterCard: 'summary_large_image',
      twitterTitle: title,
      twitterDescription: description,
      twitterImage: ogImage,
      jsonLd: [
        travelAgencySchema,
        {
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          '@id': `${SITE_ORIGIN}/#website`,
          url: `${SITE_ORIGIN}/`,
          name: 'Brand Identity Tour & Travel',
          publisher: { '@id': `${SITE_ORIGIN}/#organization` },
        },
      ],
    };
  }

  if (cleanPath === '/packages') {
    const ogImage = toAbsoluteImageUrl(siteImages.hero);
    const title = 'Kashmir Tour Packages (2 to 8 Days) — Brand Identity Tour & Travel';
    const description =
      'Compare 2 to 8 day Kashmir tour packages covering Srinagar, Gulmarg, Pahalgam, Sonamarg and Gurez Valley. Customise family trips, honeymoon escapes, houseboat stays and private cabs.';
    return {
      title,
      description,
      canonical,
      robots: 'index, follow',
      ogTitle: title,
      ogDescription: description,
      ogUrl: canonical,
      ogImage,
      ogType: 'website',
      twitterCard: 'summary_large_image',
      twitterTitle: title,
      twitterDescription: description,
      twitterImage: ogImage,
      jsonLd: [
        travelAgencySchema,
        buildBreadcrumbSchema([
          { name: 'Home', url: `${SITE_ORIGIN}/` },
          { name: 'Tour Packages', url: canonical },
        ]),
      ],
    };
  }

  if (cleanPath.startsWith('/packages/')) {
    const slug = cleanPath.replace('/packages/', '');
    const pkg = packages.find((p) => p.slug === slug);
    if (pkg) {
      const ogImage = toAbsoluteImageUrl(pkg.image);
      const title = `${pkg.title} (${pkg.duration} / ${pkg.nights}) — Kashmir Package | Brand Identity Tour & Travel`;
      const description = `${pkg.summary} Covers ${pkg.locations.join(', ')} over ${pkg.duration} (${pkg.nights}) with stays, Shikara ride and private transfers.`;
      return {
        title,
        description,
        canonical,
        robots: 'index, follow',
        ogTitle: title,
        ogDescription: description,
        ogUrl: canonical,
        ogImage,
        ogType: 'website',
        twitterCard: 'summary_large_image',
        twitterTitle: title,
        twitterDescription: description,
        twitterImage: ogImage,
        jsonLd: [
          travelAgencySchema,
          buildBreadcrumbSchema([
            { name: 'Home', url: `${SITE_ORIGIN}/` },
            { name: 'Tour Packages', url: `${SITE_ORIGIN}/packages` },
            { name: pkg.title, url: canonical },
          ]),
        ],
      };
    }
  }

  if (cleanPath.startsWith('/destinations/')) {
    const slug = cleanPath.replace('/destinations/', '');
    const place = destinations.find((d) => d.slug === slug);
    if (place) {
      const ogImage = toAbsoluteImageUrl(place.image);
      const title = `${place.name} Travel Guide, Best Season & Tour Packages — Brand Identity Tour & Travel`;
      const description = `${place.description} Best season: ${place.bestSeason}. Ideal duration: ${place.suggestedDuration}. Plan your ${place.name} itinerary with local experts.`;
      return {
        title,
        description,
        canonical,
        robots: 'index, follow',
        ogTitle: title,
        ogDescription: description,
        ogUrl: canonical,
        ogImage,
        ogType: 'website',
        twitterCard: 'summary_large_image',
        twitterTitle: title,
        twitterDescription: description,
        twitterImage: ogImage,
        jsonLd: [
          travelAgencySchema,
          buildBreadcrumbSchema([
            { name: 'Home', url: `${SITE_ORIGIN}/` },
            { name: place.name, url: canonical },
          ]),
          {
            '@context': 'https://schema.org',
            '@type': 'TouristDestination',
            name: `${place.name}, Jammu & Kashmir`,
            description: place.overview || place.description,
            url: canonical,
            image: ogImage,
            touristType: ['Families', 'Couples', 'Nature & Mountain Travellers'],
            containedInPlace: {
              '@type': 'AdministrativeArea',
              name: 'Jammu & Kashmir, India',
            },
          },
        ],
      };
    }
  }

  if (cleanPath.startsWith('/travel-guides/')) {
    const slug = cleanPath.replace('/travel-guides/', '');
    const guide = guides.find((g) => g.slug === slug);
    if (guide) {
      const ogImage = toAbsoluteImageUrl(guide.image);
      const title = `${guide.title} — Kashmir Travel Guide | Brand Identity Tour & Travel`;
      const description = `${guide.description} Practical advice from Brand Identity Tour & Travel in Kashmir.`;
      return {
        title,
        description,
        canonical,
        robots: 'index, follow',
        ogTitle: title,
        ogDescription: description,
        ogUrl: canonical,
        ogImage,
        ogType: 'article',
        twitterCard: 'summary_large_image',
        twitterTitle: title,
        twitterDescription: description,
        twitterImage: ogImage,
        jsonLd: [
          travelAgencySchema,
          buildBreadcrumbSchema([
            { name: 'Home', url: `${SITE_ORIGIN}/` },
            { name: guide.title, url: canonical },
          ]),
          {
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline: guide.title,
            description: guide.description,
            image: ogImage,
            mainEntityOfPage: {
              '@type': 'WebPage',
              '@id': canonical,
            },
            author: {
              '@type': 'Organization',
              name: `${brand.name} ${brand.descriptor}`,
              url: SITE_ORIGIN,
            },
            publisher: {
              '@type': 'Organization',
              name: `${brand.name} ${brand.descriptor}`,
              logo: {
                '@type': 'ImageObject',
                url: toAbsoluteImageUrl(siteImages.logo.horizontal),
              },
            },
          },
        ],
      };
    }
  }

  if (cleanPath === '/services') {
    const ogImage = toAbsoluteImageUrl(siteImages.hero);
    const title = 'Kashmir Travel Services: Custom Tours, Stays, Houseboats & Cabs — Brand Identity Tour & Travel';
    const description =
      'Complete Kashmir travel coordination: tailor-made tour planning, curated hotels, Dal Lake houseboat stays, Srinagar airport transfers, private cabs, and on-trip local support.';
    return {
      title,
      description,
      canonical,
      robots: 'index, follow',
      ogTitle: title,
      ogDescription: description,
      ogUrl: canonical,
      ogImage,
      ogType: 'website',
      twitterCard: 'summary_large_image',
      twitterTitle: title,
      twitterDescription: description,
      twitterImage: ogImage,
      jsonLd: [
        travelAgencySchema,
        buildBreadcrumbSchema([
          { name: 'Home', url: `${SITE_ORIGIN}/` },
          { name: 'Services', url: canonical },
        ]),
      ],
    };
  }

  if (cleanPath === '/about') {
    const ogImage = toAbsoluteImageUrl(siteImages.company.storefront);
    const title = 'About Brand Identity Tour & Travel — Local Kashmir Travel Planners in Sopore';
    const description =
      'Meet Brand Identity Tour & Travel at Bismillah Market, Sopore, Baramulla, Jammu & Kashmir. Rooted in local insight, personal route planning, and thoughtful valley coordination.';
    return {
      title,
      description,
      canonical,
      robots: 'index, follow',
      ogTitle: title,
      ogDescription: description,
      ogUrl: canonical,
      ogImage,
      ogType: 'website',
      twitterCard: 'summary_large_image',
      twitterTitle: title,
      twitterDescription: description,
      twitterImage: ogImage,
      jsonLd: [
        travelAgencySchema,
        buildBreadcrumbSchema([
          { name: 'Home', url: `${SITE_ORIGIN}/` },
          { name: 'About Us', url: canonical },
        ]),
      ],
    };
  }

  if (cleanPath === '/contact') {
    const ogImage = toAbsoluteImageUrl(siteImages.company.storefront);
    const title = 'Contact Brand Identity Tour & Travel — Sopore, Jammu & Kashmir (+91 6006343335)';
    const description =
      'Speak with our Kashmir travel coordinators in Bismillah Market, Sopore, Baramulla (PIN 193201). Call +91 6006343335, chat on WhatsApp, or email bookings@bittkashmir.in.';
    return {
      title,
      description,
      canonical,
      robots: 'index, follow',
      ogTitle: title,
      ogDescription: description,
      ogUrl: canonical,
      ogImage,
      ogType: 'website',
      twitterCard: 'summary_large_image',
      twitterTitle: title,
      twitterDescription: description,
      twitterImage: ogImage,
      jsonLd: [
        travelAgencySchema,
        buildBreadcrumbSchema([
          { name: 'Home', url: `${SITE_ORIGIN}/` },
          { name: 'Contact', url: canonical },
        ]),
      ],
    };
  }

  if (cleanPath === '/bookings') {
    const ogImage = toAbsoluteImageUrl(siteImages.destinations.gulmarg);
    const title = 'Travel & Activity Bookings | Brand Identity Tour & Travel';
    const description =
      'Find official booking portals for Vande Bharat Express train tickets (IRCTC), Gulmarg Gondola cable car tickets (JKCCC), and eligible Amarnath Yatra helicopter services in Kashmir.';
    return {
      title,
      description,
      canonical,
      robots: 'index, follow',
      ogTitle: title,
      ogDescription: description,
      ogUrl: canonical,
      ogImage,
      ogType: 'website',
      twitterCard: 'summary_large_image',
      twitterTitle: title,
      twitterDescription: description,
      twitterImage: ogImage,
      jsonLd: [
        travelAgencySchema,
        buildBreadcrumbSchema([
          { name: 'Home', url: `${SITE_ORIGIN}/` },
          { name: 'Bookings', url: canonical },
        ]),
      ],
    };
  }

  if (cleanPath === '/payments') {
    const ogImage = toAbsoluteImageUrl(siteImages.company.storefront);
    const title = 'Payment Methods & Booking Guidance — Brand Identity Tour & Travel';
    const description =
      'View official payment methods for Brand Identity Tour & Travel in Kashmir: UPI transfer, Mobile Banking (NEFT, IMPS, RTGS), Scan & Pay QR, and booking payment verification.';
    return {
      title,
      description,
      canonical,
      robots: 'index, follow',
      ogTitle: title,
      ogDescription: description,
      ogUrl: canonical,
      ogImage,
      ogType: 'website',
      twitterCard: 'summary_large_image',
      twitterTitle: title,
      twitterDescription: description,
      twitterImage: ogImage,
      jsonLd: [
        travelAgencySchema,
        buildBreadcrumbSchema([
          { name: 'Home', url: `${SITE_ORIGIN}/` },
          { name: 'Payment Methods', url: canonical },
        ]),
      ],
    };
  }

  if (cleanPath === '/privacy') {
    const ogImage = toAbsoluteImageUrl(siteImages.hero);
    const title = 'Privacy Policy — Brand Identity Tour & Travel';
    const description =
      'Learn how Brand Identity Tour & Travel handles trip enquiries passed directly to WhatsApp or your email application without storing personal data on this website.';
    return {
      title,
      description,
      canonical,
      robots: 'index, follow',
      ogTitle: title,
      ogDescription: description,
      ogUrl: canonical,
      ogImage,
      ogType: 'website',
      twitterCard: 'summary_large_image',
      twitterTitle: title,
      twitterDescription: description,
      twitterImage: ogImage,
      jsonLd: [
        travelAgencySchema,
        buildBreadcrumbSchema([
          { name: 'Home', url: `${SITE_ORIGIN}/` },
          { name: 'Privacy Policy', url: canonical },
        ]),
      ],
    };
  }

  if (cleanPath === '/terms') {
    const ogImage = toAbsoluteImageUrl(siteImages.hero);
    const title = 'Terms & Conditions — Brand Identity Tour & Travel';
    const description =
      'Review enquiry, booking confirmation, pricing quotation, and cancellation guidelines for Kashmir tours coordinated by Brand Identity Tour & Travel.';
    return {
      title,
      description,
      canonical,
      robots: 'index, follow',
      ogTitle: title,
      ogDescription: description,
      ogUrl: canonical,
      ogImage,
      ogType: 'website',
      twitterCard: 'summary_large_image',
      twitterTitle: title,
      twitterDescription: description,
      twitterImage: ogImage,
      jsonLd: [
        travelAgencySchema,
        buildBreadcrumbSchema([
          { name: 'Home', url: `${SITE_ORIGIN}/` },
          { name: 'Terms & Conditions', url: canonical },
        ]),
      ],
    };
  }

  // Fallback / 404 NotFound
  const ogImage = toAbsoluteImageUrl(siteImages.hero);
  const title = 'Page Not Found (404) — Brand Identity Tour & Travel';
  const description =
    'The page you requested could not be found. Explore curated Kashmir tour packages, valley destinations, and travel guides with Brand Identity Tour & Travel.';
  return {
    title,
    description,
    canonical: `${SITE_ORIGIN}/`,
    robots: 'noindex, nofollow',
    ogTitle: title,
    ogDescription: description,
    ogUrl: `${SITE_ORIGIN}/`,
    ogImage,
    ogType: 'website',
    twitterCard: 'summary_large_image',
    twitterTitle: title,
    twitterDescription: description,
    twitterImage: ogImage,
    jsonLd: [travelAgencySchema],
  };
}
