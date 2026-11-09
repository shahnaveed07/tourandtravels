# Brand Identity Tour & Travel

A production-ready, fully responsive React + Vite website crafted for **Brand Identity Tour & Travel**, showcasing curated Kashmir journeys, alpine destinations, mountain stays, and personalized valley travel coordination.

---

## 1. Quick Start & Local Development

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

## 2. GitHub Pages Deployment

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
   - Execute `npm run build` with `GITHUB_ACTIONS=true` (automatically activating the `/tourandtravels/` base path).
   - Generate `404.html` and `.nojekyll` in the build output to ensure client-side deep links (e.g. `/tourandtravels/packages` or `/tourandtravels/destinations/gulmarg`) refresh without 404 errors.
   - Deploy the artifact directly to GitHub Pages.

---

## 3. Configuration & Environment Variables

Create a `.env` file (or set variables in your hosting environment):

| Variable | Description | Default |
|---|---|---|
| `VITE_ENQUIRY_ENDPOINT` | External POST endpoint for processing enquiries (e.g., webhook or API). If unset, the app operates in **Demo Mode**, offering a direct WhatsApp enquiry flow prefilled with the user's choices. | *(Empty / Demo mode)* |
| `VITE_BASE_PATH` | Base path override for Vite. If unset, defaults to `/tourandtravels/` in GitHub Actions and `/` locally. | `auto` |

---

## 4. Key Architectural Features & Audit Resolutions

### Route-Aware Base Path & Navigation
- **Deployment-aware base path**: Configured dynamically in `vite.config.js` and passed to `<BrowserRouter basename={import.meta.env.BASE_URL}>`.
- **Deep-link routing**: Fully supported under GitHub Pages with `404.html` and `.nojekyll`.
- **Scroll-to-top & anchor scrolling**: Smoothly handles page transitions and route anchors (e.g., `/services#stays`, `/services#houseboats`).

### Tour Packages & Search
- **5-Part Filter System**:
  1. *Keyword search*: Matches title, destinations, style, summaries, and highlights.
  2. *Destination filter*: Dropdown selector for all valley regions.
  3. *Duration filter*: Supports 2 Days through 8 Days.
  4. *Travel style filter*: Filter by Family, Honeymoon, Adventure, Classic tour, or Short break.
  5. *Arrival date filter*: Preserves travel dates across navigation and pre-fills the enquiry modal.
- **Duration consistency**: Legitimate packages exist for every advertised duration (2, 3, 4, 5, 6, 7, and 8 days).

### Destination Pages
- **Strict Relationship Integrity**: Displays *only genuinely related packages*.
- **Offbeat Destination Fallback**: When no pre-packaged tour exists for an offbeat region (e.g. Doodhpathri), displays an exclusive bespoke custom itinerary enquiry CTA. Unrelated packages are never shown as fallbacks.
- **Rich Content**: Overview, best season, suggested duration, highlights, practical travel guidance, and neighboring valley links.

### Travel Guides (`/travel-guides/:slug`)
- Dedicated editorial guide articles with structured advice, packing tips, airport arrival protocol, duration planning, related destinations, and matching itineraries.

### Honest Enquiry System
- **Strict Validation**: Validates full name, email format, phone numbers (8–15 digits), positive traveller counts, and future arrival dates.
- **No False Confirmation**: Clearly informs the user when no backend endpoint is configured and provides a 1-click **WhatsApp Messenger** action prefilled with the user's travel specifications.
- **Configurable Backend**: Easily connects to any REST endpoint via `VITE_ENQUIRY_ENDPOINT`.

### SEO & Performance
- Page-specific `<title>` tags and meta descriptions dynamically updated per route.
- OpenGraph and Twitter Cards metadata for rich social sharing.
- Schema.org `TravelAgency` JSON-LD structured data.
- Search-engine friendly `robots.txt` and `sitemap.xml`.
- Image `onError` fallback handlers to prevent broken visual states.

---

## 5. Centralized Data Source

All brand information, packages, sample prices, destinations, services, FAQs, and guides are organized in `src/data.js`:

```javascript
// src/data.js
export const brand = {
  name: 'Brand Identity',
  descriptor: 'Tour & Travel',
  phone: '+91 98765 43210',
  email: 'hello@brandidentitytravel.com',
  address: 'Main Market, Srinagar, Jammu & Kashmir 190001',
  hours: 'Monday – Saturday, 10:00 – 18:00 IST',
  whatsapp: '919876543210',
  social: {
    instagram: '', // Add verified official profile URL
    facebook: '',
    youtube: ''
  }
};
```

---

## 6. License & Disclaimer

*Demo Notice:* Brand Identity Tour & Travel is a showcase website template. Sample package prices, telephone numbers, emails, addresses, and sample itineraries are illustrative and must be verified or replaced with operating credentials prior to public commercial launch.
