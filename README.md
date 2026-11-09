# Brand Identity Tour & Travel

A responsive React + Vite travel-agency website inspired by the information architecture and editorial travel layout of the reference site `https://kashmirtourtravel.com/`.

This is an original implementation for **Brand Identity Tour & Travel**. It does not use the reference site's source code, theme assets, logo, or private content. The brand identity, copy, layout styling, and sample tour data are authored for this project.

## Run locally

Requirements: Node.js 20.19+ or 22.12+ and npm.

```bash
npm install
npm run dev
```

For a production build:

```bash
npm run build
npm run preview
```

## Included pages

- `/` — Homepage with hero, trip finder, services, destinations, featured packages, duration links, travel inspiration, reasons to travel, FAQ and enquiry CTA.
- `/packages` — Searchable and filterable sample tour listing.
- `/packages/:slug` — Package details with sample day-wise itinerary, highlights and enquiry CTA.
- `/destinations/:slug` — Destination profile, highlights and related packages.
- `/services` — Tour planning, stays, houseboats, transport, group planning and on-trip coordination.
- `/about` — Brand story and values.
- `/contact` — Sample contact information and enquiry entry point.
- `/privacy` and `/terms` — Placeholder policy pages that must be replaced with approved business/legal copy.

## Interactions

- Responsive desktop and mobile navigation.
- Homepage trip finder passes destination and duration into the package listing.
- Package listing supports keyword, destination, duration and travel-style filtering.
- Package cards route to their own detail pages.
- Enquiry modal can be opened from the header, package cards, package detail and CTAs.
- Enquiry form includes required-field validation and a local demo success state.
- FAQ accordion, destination links, service anchors, WhatsApp CTA and back-to-top control.

## Demo data — replace before launch

All of the following are placeholders, not verified business information:

- Phone: `+91 98765 43210`
- Email: `hello@brandidentitytravel.com`
- Address: `Main Market, Srinagar, Jammu & Kashmir 190001`
- Office hours, company story, team claims, packages, itinerary copy, guest counts, package prices and policy text.
- WhatsApp number in `src/data.js`.

Sample package prices are illustrative only. Do not publish them as live offers until approved.

## Important integration notes

- The enquiry form currently validates and shows a demo success state. It does **not** send or persist submissions. Connect it to a real API, CRM, email service or WhatsApp workflow before launch.
- Phone, email, address and WhatsApp links are placeholders in `src/data.js`.
- Images are loaded from Unsplash image URLs. For production, confirm each image's licence/usage rights and consider downloading approved images into a local `public/images` directory.
- Replace the placeholder Privacy Policy and Terms & Conditions with legally reviewed content relevant to the operating business.
- Add SEO metadata, analytics consent (if analytics are added), sitemap, robots.txt and deployment-specific environment configuration before production release.

## Main data source

Edit `src/data.js` to update brand contact details, destinations, package cards, sample itineraries, services, FAQs and travel-guide cards. This keeps demo content centralised and makes the handover to real business information straightforward.
