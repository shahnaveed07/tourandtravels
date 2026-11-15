# Brand Identity Tour & Travel

A production-ready, fully responsive static **React + Vite** website crafted for **Brand Identity Tour & Travel** (Bismillah Market, Sopore, Baramulla, Jammu & Kashmir, India — PIN `193201`), showcasing curated Kashmir journeys, alpine destinations, mountain stays, and personalized valley travel coordination.

- **Primary Production URL**: `https://www.bittkashmir.in/`
- **Canonical Origin**: `https://www.bittkashmir.in`
- **Repository**: `https://github.com/shahnaveed07/tourandtravels`

---

## 1. Architecture Overview

- **Frontend Stack**: React 19 + Vite 8 + React Router 7 with build-time static route prerendering (`scripts/generate-seo.mjs`).
- **Direct Communication (No Backend or Database)**: Visitor enquiries are validated in the browser and passed directly to the visitor's chosen **WhatsApp** (`https://wa.me/916006343335`) or **Email** (`mailto:bookings@bittkashmir.in`) application with pre-filled itinerary details. No personal data is stored by the website.
- **Local Image Catalog**: All brand logos, destination photography, package cards, travel guides, cultural highlights, company office spaces, and stay showcases are served from local WebP assets in `public/images/` via `src/imageCatalog.js`.
- **Technical SEO & Prerendering**:
  - Route-specific `<title>`, `<meta name="description">`, single `<link rel="canonical">`, `<meta name="robots">`, Open Graph, Twitter Card, and Schema.org JSON-LD (`TravelAgency`, `WebSite`, `BreadcrumbList`, `TouristDestination`, `BlogPosting`) managed via `src/seoData.js` and `src/hooks/usePageSEO.js`.
  - Build-time static prerendering writes route-specific `dist/<route>/index.html` files for all 22 indexable URLs (plus `/privacy`, `/terms`, and `dist/404.html`) and generates `public/sitemap.xml` directly from `src/data.js`.

---

## 2. Quick Start & Local Development

### Requirements
- Node.js 20.19+ or 22.12+ (Node.js 22 recommended)
- npm 10+

### Installation & Execution
```bash
# Clean, reproducible dependency installation
npm ci

# Run automated SEO, link, and data integrity test suite
npm test

# Start local development server (port 3000)
npm run dev

# Build production bundle + generate sitemap.xml + prerender all routes
npm run build

# Preview production build locally
npm run preview
```

---

## 3. Custom Domain & Hosting Configuration (`https://www.bittkashmir.in/`)

The website is configured to run at the domain root (`/`) on **`https://www.bittkashmir.in/`** and supports both **Vercel** (`vercel.json` + static prerendered directories) and **GitHub Pages** (`public/CNAME` + `.github/workflows/deploy.yml` + static prerendered directories + `dist/404.html`).

### Build Base Path
| Variable | Description | Default |
|---|---|---|
| `VITE_BASE_PATH` | Optional base path override for Vite. Defaults to `/` for `https://www.bittkashmir.in/`. | `/` |

---

## 4. Key Features

### Route-Aware SEO & Navigation
- **Root Domain Base Path**: Configured in `vite.config.js` (`base: '/'`) and passed to `<BrowserRouter basename={import.meta.env.BASE_URL}>` and `src/imageCatalog.js`.
- **Static Prerendering & Deep-Link Routing**: Every public route (`/packages`, `/packages/:slug`, `/destinations/:slug`, `/travel-guides/:slug`, `/services`, `/about`, `/contact`, `/privacy`, `/terms`) has its own prerendered `index.html` in `dist/`, ensuring direct navigation and page refreshes return HTTP 200 with full route-specific HTML and metadata.
- **Scroll-to-top & anchor scrolling**: Smoothly handles page transitions and route anchors (e.g., `/services#stays`, `/services#houseboats`, `/services#transport`, `/services#experiences`).

### Tour Packages & Search
- **5-Part Filter System**:
  1. *Keyword search*: Matches title, destinations, style, summaries, and highlights.
  2. *Destination filter*: Dropdown selector for all valley regions.
  3. *Duration filter*: Supports 2 Days through 8 Days.
  4. *Travel style filter*: Filter by Family, Honeymoon, Adventure, Classic tour, or Short break.
  5. *Arrival date filter*: Preserves travel dates across navigation and pre-fills the enquiry modal.
- **Canonical URL discipline**: Filtered `/packages?...` views retain `https://www.bittkashmir.in/packages` as their canonical URL.

### Destination Pages & Travel Guides
- **Strict Relationship Integrity**: Destination pages display only genuinely related packages.
- **Offbeat Destination Custom Route CTA**: When no fixed-departure tour exists for an offbeat region (such as Doodhpathri), displays a bespoke custom itinerary enquiry call-to-action.
- **Travel Guides (`/travel-guides/:slug`)**: Dedicated editorial guide articles with structured advice, packing tips, airport arrival protocol, duration planning, related destinations, and matching itineraries.

### Direct WhatsApp & Email Enquiry Flow
- **Client-Side Validation**: Validates full name, email format, phone numbers (8–15 digits), traveller counts, and future arrival dates.
- **Direct Dispatch**: Prepares a structured travel summary and opens the visitor's chosen WhatsApp chat (`+91 6006343335`) or default email client (`bookings@bittkashmir.in`) without storing personal data on the website.

---

## 5. Centralized Data & Image Catalog

All brand details, packages, destinations, services, FAQs, and guides live in `src/data.js`, paired with local image paths in `src/imageCatalog.js` and route metadata in `src/seoData.js`:

```javascript
// src/data.js
export const brand = {
  name: 'Brand Identity',
  descriptor: 'Tour & Travel',
  phone: '+91 6006343335',
  email: 'bookings@bittkashmir.in',
  address: 'Bismillah Market, Sopore, Baramulla, Jammu & Kashmir, India',
  pinCode: '193201',
  hours: 'Monday – Saturday, 10:00 – 18:00 IST',
  whatsapp: '916006343335',
  mapUrl: 'https://www.google.com/maps/search/?api=1&query=Bismillah+Market%2C+Sopore%2C+Baramulla%2C+Jammu+%26+Kashmir%2C+India',
  social: {
    instagram: '',
    facebook: '',
    youtube: ''
  }
};
```
