# Brand Identity Tour & Travel

A production-ready, fully responsive static **React + Vite** website crafted for **Brand Identity Tour & Travel** (Sopore, Baramulla, Jammu & Kashmir), showcasing curated Kashmir journeys, alpine destinations, mountain stays, and personalized valley travel coordination.

---

## 1. Architecture Overview

- **Frontend Stack**: React 19 + Vite 8 + React Router 7 (purely static client-side single-page application).
- **Direct Communication (No Backend or Database)**: Visitor enquiries are validated in the browser and passed directly to the visitor's chosen **WhatsApp** (`https://wa.me/916006343335`) or **Email** (`mailto:bookings@bittkashmir.in`) application with pre-filled itinerary details. No personal data is stored by the website.
- **Local Image Catalog**: All brand logos, destination photography, package cards, travel guides, cultural highlights, company office spaces, and stay showcases are served from local WebP assets in `public/images/` via `src/imageCatalog.js`.

---

## 2. Quick Start & Local Development

### Requirements
- Node.js 20.19+ or 22.12+ (Node.js 22 recommended)
- npm 10+

### Installation & Execution
```bash
# Clean, reproducible dependency installation
npm ci

# Run test suite
npm test

# Start local development server (port 3000)
npm run dev

# Build production bundle
npm run build

# Preview production build locally
npm run preview
```

---

## 3. GitHub Pages Deployment

The repository is hosted at:
`https://github.com/shahnaveed07/tourandtravels`

The production website deploys to:
`https://shahnaveed07.github.io/tourandtravels/`

### Automated Deployment via GitHub Actions
A deployment workflow is configured at `.github/workflows/deploy.yml`.

#### Step-by-Step GitHub Setup Instructions:
1. Open the repository on GitHub: [shahnaveed07/tourandtravels](https://github.com/shahnaveed07/tourandtravels).
2. Go to **Settings** → **Pages** (under the "Code and automation" section in the left sidebar).
3. Under **Build and deployment** → **Source**, select **GitHub Actions** (do NOT select "Deploy from a branch").
4. Push your changes to the `main` branch (or run manually via **Actions** → **Deploy to GitHub Pages** → **Run workflow**).
5. The workflow will:
   - Check out the codebase using Node.js 22.
   - Run `npm ci` for deterministic dependency installation.
   - Run `npm test` to verify all data integrity, duration consistency, and local image catalog assertions before building.
   - Execute `npm run build` with `GITHUB_ACTIONS=true` (automatically activating the `/tourandtravels/` base path).
   - Generate `404.html` and `.nojekyll` in the build output to ensure client-side deep links (e.g. `/tourandtravels/packages` or `/tourandtravels/destinations/gulmarg`) refresh without 404 errors.
   - Deploy the artifact directly to GitHub Pages.

### Optional Build Base Path Override
| Variable | Description | Default |
|---|---|---|
| `VITE_BASE_PATH` | Optional base path override for Vite. If unset, defaults to `/tourandtravels/` in GitHub Actions and `/` locally. | `auto` |

---

## 4. Key Features

### Route-Aware Base Path & Navigation
- **Deployment-aware base path**: Configured dynamically in `vite.config.js` and passed to `<BrowserRouter basename={import.meta.env.BASE_URL}>` and `src/imageCatalog.js`.
- **Deep-link routing**: Fully supported under GitHub Pages with `404.html` and `.nojekyll`.
- **Scroll-to-top & anchor scrolling**: Smoothly handles page transitions and route anchors (e.g., `/services#stays`, `/services#houseboats`).

### Tour Packages & Search
- **5-Part Filter System**:
  1. *Keyword search*: Matches title, destinations, style, summaries, and highlights.
  2. *Destination filter*: Dropdown selector for all valley regions.
  3. *Duration filter*: Supports 2 Days through 8 Days.
  4. *Travel style filter*: Filter by Family, Honeymoon, Adventure, Classic tour, or Short break.
  5. *Arrival date filter*: Preserves travel dates across navigation and pre-fills the enquiry modal.
- **Duration consistency**: Curated packages cover every advertised duration (2, 3, 4, 5, 6, 7, and 8 days).

### Destination Pages & Travel Guides
- **Strict Relationship Integrity**: Destination pages display only genuinely related packages.
- **Offbeat Destination Custom Route CTA**: When no fixed-departure tour exists for an offbeat region (such as Doodhpathri), displays a bespoke custom itinerary enquiry call-to-action.
- **Travel Guides (`/travel-guides/:slug`)**: Dedicated editorial guide articles with structured advice, packing tips, airport arrival protocol, duration planning, related destinations, and matching itineraries.

### Direct WhatsApp & Email Enquiry Flow
- **Client-Side Validation**: Validates full name, email format, phone numbers (8–15 digits), traveller counts, and future arrival dates.
- **Direct Dispatch**: Prepares a structured travel summary and opens the visitor's chosen WhatsApp chat (`+91 6006343335`) or default email client (`bookings@bittkashmir.in`) without storing personal data on the website.

---

## 5. Centralized Data & Image Catalog

All brand details, packages, destinations, services, FAQs, and guides live in `src/data.js`, paired with local image paths in `src/imageCatalog.js`:

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
