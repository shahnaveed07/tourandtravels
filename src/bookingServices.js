import { brand } from './data.js';
import { siteImages } from './imageCatalog.js';

export const bookingServices = {
  vandeBharat: {
    id: 'vande-bharat',
    index: '01 · INDIAN RAILWAYS / IRCTC',
    title: 'Vande Bharat Express — Train Booking',
    providerName: 'Indian Railway Catering and Tourism Corporation (IRCTC)',
    image: siteImages.gallery[0]?.src || siteImages.hero,
    imageAlt: 'Mountain valley railway and bridge route in Kashmir',
    description:
      'Search Indian Railways routes, Vande Bharat Express services, journey dates, ticket availability and fares using the official IRCTC portal.',
    primaryUrl: 'https://www.irctc.co.in/nget/train-search',
    primaryLabel: 'Book Train Tickets on IRCTC',
    secondaryLabel: 'Need Help with Train Booking?',
    whatsappPrefill:
      'Hello Brand Identity Tour & Travel. I would like assistance planning train travel to Kashmir. My preferred route, travel date and passenger count are:',
    steps: [
      'Open the official IRCTC train-search page.',
      'Select the source and destination stations.',
      'Select the date of journey.',
      'Search the available trains.',
      'Select Vande Bharat Express where it is operating on the chosen route and date.',
      'Complete booking and payment directly on IRCTC.',
    ],
    notice:
      'Brand Identity Tour & Travel is not the railway ticket issuer. Train numbers, schedules, route availability, and fares are determined solely by Indian Railways / IRCTC. Never share your IRCTC username, password, or OTP with anyone.',
  },
  gulmargGondola: {
    id: 'gulmarg-gondola',
    index: '02 · JAMMU & KASHMIR CABLE CAR CORPORATION',
    title: 'Gulmarg Gondola — Cable Car Tickets',
    providerName: 'Jammu & Kashmir Cable Car Corporation (JKCCC)',
    image: siteImages.destinations.gulmarg,
    imageAlt: 'High-altitude alpine slopes and peaks at Gulmarg, Kashmir',
    description:
      'Book the Gulmarg Gondola through the official Jammu & Kashmir Cable Car Corporation portal.',
    primaryUrl: 'https://etickets.jammukashmircablecar.com/',
    primaryLabel: 'Book Gulmarg Gondola Tickets',
    alternateUrl: 'https://eticket.webfront.in/',
    alternateLabel: 'Open Alternate Booking Portal',
    phases: [
      {
        code: 'Phase I',
        route: 'Gulmarg to Kongdori',
        detail: 'Ascends from the Gulmarg resort base to the bowl-shaped Kongdori valley meadow.',
      },
      {
        code: 'Phase II',
        route: 'Kongdori to Apharwat',
        detail: 'Ascends from Kongdori to the high-altitude Apharwat ridge (subject to Phase I boarding and weather clearance).',
      },
    ],
    notice:
      'Ticket availability, operating schedules and weather-related restrictions are controlled by the official corporation. Check the official portal before travel.',
  },
  helicopter: {
    id: 'helicopter-services',
    index: '03 · HELICOPTER & CHOPPER SERVICES',
    title: 'Helicopter & Chopper Services',
    image: siteImages.destinations.sonamarg,
    imageAlt: 'Snow-crowned Himalayan peaks in Jammu & Kashmir',
    amarnath: {
      subtitle: 'A. Amarnath Yatra Helicopter Tickets',
      providerName: 'Shri Amarnathji Shrine Board (SASB)',
      description:
        "Helicopter services for eligible Amarnath Yatra routes are subject to the Shrine Board's announced booking window, route and operator arrangements.",
      infoUrl: 'https://jksasb.nic.in/Heli-Services.html',
      infoLabel: 'View Official Heli-Services Information',
      onlineServicesUrl: 'https://jksasb.nic.in/onlineservices/',
      primaryLabel: 'Official Amarnath Helicopter Booking',
      safetyWarning:
        'Amarnath Yatra helicopter tickets must be booked through the official Shri Amarnathji Shrine Board portal. Do not pay unofficial agents claiming to issue Shrine Board helicopter tickets.',
    },
    charter: {
      subtitle: 'B. Other Helicopter / Chopper Enquiries',
      description:
        'Interested in private helicopter transfers or mountain sightseeing charter enquiries? Reach out to our coordination desk on WhatsApp with your tentative route, travel date, and passenger count so we can check feasibility with an authorized operator.',
      actionLabel: 'Enquire About Helicopter / Chopper Services',
      whatsappPrefill:
        'Hello Brand Identity Tour & Travel. I would like to enquire about helicopter/chopper services. My preferred route, travel date and passenger count are:',
      disclosure:
        'Private charter or sightseeing helicopter services are not pre-confirmed on this website and remain subject to aviation clearance, weather conditions, and verification with an authorized operator.',
    },
  },
};

export function buildTrainHelpWhatsAppUrl(whatsappNumber = brand.whatsapp) {
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    bookingServices.vandeBharat.whatsappPrefill
  )}`;
}

export function buildHelicopterEnquiryWhatsAppUrl(whatsappNumber = brand.whatsapp) {
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    bookingServices.helicopter.charter.whatsappPrefill
  )}`;
}
