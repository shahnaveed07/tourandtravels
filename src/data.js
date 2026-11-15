import { siteImages } from './imageCatalog.js';
import { paymentDetails } from './paymentConfig.js';

export { paymentDetails };

export const brand = {
  name: 'Brand Identity',
  descriptor: 'Tour & Travel',
  phone: '+91 6006343335',
  email: 'bookings@bittkashmir.in',
  address: 'Bismillah Market, Sopore, Baramulla, Jammu & Kashmir, India',
  pinCode: '193201',
  hours: 'Monday – Saturday, 10:00 – 18:00 IST',
  whatsapp: '916006343335',
  // Set googleBusinessShareUrl if the owner provides a direct Google Business Profile share link or verified Place ID URL
  googleBusinessShareUrl: '',
  mapUrl: 'https://www.google.com/maps/search/?api=1&query=Brand%20Identity%20Tour%20%26%20Travel%2C%20Bismillah%20Market%2C%20Sopore%2C%20Baramulla%2C%20Jammu%20%26%20Kashmir%2C%20India',
  social: {
    facebook: 'https://www.facebook.com/brandidentitytourntravel',
    instagram: 'https://www.instagram.com/brandidentitytourntravel/',
    youtube: 'https://www.youtube.com/@brandidentitytourntravel'
  }
};

export const destinations = [
  {
    slug: 'srinagar',
    name: 'Srinagar',
    eyebrow: 'Lake days & garden walks',
    description: 'A graceful mix of still waters, old-world Mughal gardens, floating vegetable markets and warm Kashmiri hospitality.',
    overview: 'The summer capital of Jammu & Kashmir rests along the banks of the Jhelum river and the tranquil waters of Dal and Nigeen lakes. Renowned for its historic wooden architecture, cedarwood houseboats, and centuries-old terraced gardens built along the Zabarwan foothills, Srinagar serves as the cultural gateway and primary accommodation hub for valley itineraries.',
    accessNote: 'Sheikh ul-Alam International Airport (SXR) lies approximately 12–15 km from central Srinagar and Dal Lake boulevard. Ideal as both a first-night base for acclimatisation and a base for day trips.',
    image: siteImages.destinations.srinagar,
    imageWidth: 1024,
    imageHeight: 572,
    bestSeason: 'April to October (Gardens & Lakes) · December to February (Snow & Chill)',
    suggestedDuration: '2 to 3 Days',
    highlights: ['Dal Lake sunset & sunrise Shikara rides', 'Nishat, Shalimar & Chashme Shahi gardens', 'Old City heritage walk & Jamia Masjid', 'Handcrafted Pashmina & walnut woodcraft workshops', 'Overnight stay in a cedarwood houseboat'],
    travelTips: [
      'Use government-designated Shikara ghats and confirm the route duration before boarding.',
      'Rise early (around 5:30 AM) to experience the historic floating vegetable market on Dal Lake.',
      'Keep your government photo ID and flight tickets accessible for Srinagar Airport security checks.'
    ],
    nearbySlugs: ['gulmarg', 'pahalgam', 'doodhpathri']
  },
  {
    slug: 'gulmarg',
    name: 'Gulmarg',
    eyebrow: 'A little closer to the clouds',
    description: 'Alpine meadows, dense pine forests and snow-crowned peaks make Gulmarg an unforgettable high-altitude escape in every season.',
    overview: 'Perched at 2,650 metres above sea level in the Pir Panjal range (Baramulla district), Gulmarg (“Meadow of Flowers”) transforms from a wildflower plateau in summer into a snow-covered alpine bowl in winter. Home to the Gulmarg Gondola cable car ascending toward Kongdori and Apharwat ridge, it can be visited either as a full-day excursion or an overnight mountain stay.',
    accessNote: 'Located roughly 50–55 km from Srinagar via Tangmarg (around 2 hours by road). In heavy snowfall months, chained 4x4 local transfers are arranged from Tangmarg up to Gulmarg.',
    image: siteImages.destinations.gulmarg,
    imageWidth: 1024,
    imageHeight: 572,
    bestSeason: 'December to March (Winter snow & skiing) · May to September (Green alpine meadows)',
    suggestedDuration: '1 to 2 Days',
    highlights: ['Gulmarg Gondola Phase 1 (Kongdori) & Phase 2 (Apharwat Peak)', 'St. Mary’s Church & high-altitude golf plateau', 'Winter snow activities & alpine meadow walks', 'Scenic mountain views toward Khilanmarg meadow'],
    travelTips: [
      'Book Gondola Phase I and Phase II tickets online in advance only via the official J&K Cable Car Corporation portal.',
      'In winter, anti-skid snow chains are required from Tangmarg upward; plan weather buffer time.',
      'Carry windproof warm layers and UV sunglasses—high-altitude weather shifts quickly.'
    ],
    nearbySlugs: ['srinagar', 'doodhpathri']
  },
  {
    slug: 'pahalgam',
    name: 'Pahalgam',
    eyebrow: 'Slow down in the valley',
    description: 'Follow the turquoise Lidder River through pine-covered slopes, tranquil shepherd trails and open mountain valleys.',
    overview: 'Situated along the confluence of streams flowing from Sheshnag and the Lidder River in Anantnag district, Pahalgam (“Valley of Shepherds”) offers a slower alpine pace surrounded by fir forests and open pastures. Travellers typically stay one or two nights here to enjoy riverside walks and visit neighbouring Aru and Betaab valleys.',
    accessNote: 'Around 90–95 km from Srinagar (approximately 2.5 to 3 hours via Pampore and Awantipora). Interior valleys (Aru, Betaab, and Chandanwari) are serviced by registered Pahalgam local union taxis.',
    image: siteImages.destinations.pahalgam,
    imageWidth: 1024,
    imageHeight: 765,
    bestSeason: 'March to November (Mild mountain weather & pine trails)',
    suggestedDuration: '2 to 3 Days',
    highlights: ['Lidder River walks & riverside leisure', 'Betaab Valley pine floor & stream views', 'Aru Valley meadows & trailheads', 'Chandanwari road & Baisaran meadow lookout'],
    travelTips: [
      'Sightseeing inside Aru, Betaab and Chandanwari requires hiring designated Pahalgam union vehicles locally.',
      'Wear gripped walking footwear for forest trails around Baisaran meadow, especially after rain.',
      'Allocate at least one overnight stay rather than rushing Pahalgam on a single day return.'
    ],
    nearbySlugs: ['srinagar', 'doodhpathri']
  },
  {
    slug: 'sonamarg',
    name: 'Sonamarg',
    eyebrow: 'Follow the mountain roads',
    description: 'A dramatic highland landscape of sweeping meadows, turquoise glacial streams and gateway passes toward Ladakh.',
    overview: 'Translating to “Meadow of Gold”, Sonamarg rests along the rushing Sindh River in Ganderbal district, framed by steep Himalayan ridges and glaciers. Located on the scenic Srinagar–Leh corridor, it serves as a dramatic summer highland stop for Thajiwas Glacier excursions and alpine photography.',
    accessNote: 'Approximately 80 km northeast of Srinagar along the Sindh Valley highway (about 2.5 hours one way). Access beyond the main Sonamarg bowl depends on seasonal snow clearance and local union cab rules.',
    image: siteImages.destinations.sonamarg,
    imageWidth: 1024,
    imageHeight: 765,
    bestSeason: 'May to October (Open highland meadows & clear glacier access)',
    suggestedDuration: '1 to 2 Days',
    highlights: ['Thajiwas Glacier walk or pony excursion', 'Sindh River valley & alpine camp views', 'Highland drive past pine gorges & bridges', 'Seasonal Zoji La foothills & Baltal corridor viewpoints'],
    travelTips: [
      'Carry a warm jacket even in July or August due to crisp winds descending from Thajiwas Glacier.',
      'Leave Srinagar early (around 7:30–8:00 AM) to enjoy calmer mountain traffic and clear midday light.',
      'Check official displayed tariff boards before hiring local ponies, sledges, or Zero Point union cabs.'
    ],
    nearbySlugs: ['srinagar', 'gurez-valley']
  },
  {
    slug: 'gurez-valley',
    name: 'Gurez Valley',
    eyebrow: 'A quieter kind of Kashmir',
    description: 'An untouched borderland valley renowned for emerald Kishanganga waters, timber hamlets and genuine Shin culture.',
    overview: 'Set across the 3,300-metre Razdan Pass in northern Bandipora district, Gurez Valley is one of Kashmir’s least crowded and most distinctive highland regions. Anchored by the pyramid-shaped Habba Khatoon peak, log-built villages in Dawar and Tulail, and the clear Kishanganga River, Gurez rewards travellers seeking quiet slow travel.',
    accessNote: 'Around 125 km north of Srinagar via Bandipora and Razdan Pass (roughly 4.5 to 5.5 hours depending on road conditions). Razdan Pass typically remains open during warmer months and closes in heavy winter snow.',
    image: siteImages.destinations.gurezValley,
    imageWidth: 1024,
    imageHeight: 765,
    bestSeason: 'June to September (Razdan Pass snow-free & summer meadows open)',
    suggestedDuration: '2 to 3 Days',
    highlights: ['Golden-hour views of Habba Khatoon peak', 'Kishanganga riverbank trails around Dawar', 'Traditional wooden architecture in Dawar & Tulail', 'Panoramic Razdan Pass drive with views toward Harmukh'],
    travelTips: [
      'Carry original valid government photo IDs for mandatory civilian registration at route checkpoints.',
      'Mobile connectivity in Gurez is largely limited to BSNL and select Airtel postpaid connections.',
      'Book accommodations in advance—homestays and lodges in Dawar have limited seasonal inventory.'
    ],
    nearbySlugs: ['srinagar', 'sonamarg']
  },
  {
    slug: 'doodhpathri',
    name: 'Doodhpathri',
    eyebrow: 'A meadow made for wandering',
    description: 'A tranquil highland bowl of milky mountain streams, rolling velvet grasslands and quiet pine-fringed hillsides.',
    overview: 'Named “Valley of Milk” for the frothy white rapids of the Shaliganga stream tumbling over rocky beds, Doodhpathri lies in Budgam district roughly 42 km southwest of Srinagar. Far less built-up than major resorts, its broad green pastures and tall pine slopes make it a peaceful day excursion for families and slow travellers.',
    accessNote: 'About 1.5 to 2 hours by road from Srinagar via Budgam and Khansahib. Overnight hotel options inside the meadow are very limited, so most travellers pair Doodhpathri with a Srinagar base.',
    image: siteImages.destinations.doodhpathri,
    imageWidth: 1024,
    imageHeight: 572,
    bestSeason: 'May to October (Green grasslands) · December to March (Quiet snow landscapes)',
    suggestedDuration: '1 Day (Day excursion from Srinagar)',
    highlights: ['Picnicking along the frothy Shaliganga stream', 'Gentle walks across Tangnar & Mujpathri meadows', 'Uncommercialised pine ridges & valley viewpoints', 'Fresh shepherd kahwa and quiet family picnic spots'],
    travelTips: [
      'Best planned as a relaxed full-day round trip from Srinagar with custom private cab coordination.',
      'Bring drinking water and light snacks, as dining choices on the upper meadow are simple local stalls.',
      'Carry everything back out—help preserve Doodhpathri’s clean pastures and streams.'
    ],
    nearbySlugs: ['srinagar', 'pahalgam']
  }
];

export const packages = [
  {
    id: 'srinagar-express',
    slug: 'srinagar-express-getaway',
    title: 'Srinagar Express Getaway',
    duration: '2 Days',
    nights: '1 Night',
    locations: ['Srinagar'],
    price: '₹4,499',
    tag: 'Quick Pause',
    type: 'Short break',
    image: siteImages.packages.srinagarExpress,
    imageWidth: 1024,
    imageHeight: 572,
    summary: 'A crisp 48-hour Srinagar pause featuring an evening Shikara cruise on Dal Lake, cedarwood houseboat stay, and Mughal gardens.',
    highlights: ['Sunset Dal Lake Shikara cruise', 'Mughal garden visit (Nishat & Shalimar)', 'Overnight stay in a cedarwood houseboat', 'Traditional Kashmiri Kahwa tasting'],
    inclusions: [
      '1 night stay in a selected Srinagar hotel or Dal Lake houseboat on double-sharing basis',
      'Breakfast and dinner (MAP plan) as confirmed in your written quotation',
      'Private vehicle for Srinagar Airport pick-up, Mughal Garden sightseeing, and departure drop',
      'One 1-hour sunset Shikara ride on Dal Lake',
      'Toll taxes, fuel, parking permits, and driver allowances for the Srinagar circuit'
    ],
    exclusions: [
      'Airfare or railway tickets to and from Srinagar',
      'Entry tickets to Mughal Gardens (Nishat Bagh, Shalimar Bagh) and monuments',
      'Lunch, extra snacks, laundry, personal expenses, and travel insurance',
      'Extended Shikara hours or optional day excursions outside Srinagar city'
    ],
    notes: 'Indicative per-person estimate for transit guests or weekend breaks; exact pricing depends on travel season, stay category, and group size.',
    itinerary: [
      ['Day 1', 'Arrive in Srinagar & Lake Check-in', 'Private airport pickup, transfer to your designated houseboat on Dal Lake, and a tranquil 1-hour Shikara ride around floating gardens at dusk.'],
      ['Day 2', 'Mughal Gardens & Departure', 'Morning breakfast, visit Nishat Bagh and Shalimar Bagh along the lake boulevard, and drop-off at Srinagar International Airport as per flight schedule.']
    ]
  },
  {
    id: 'srinagar-weekend',
    slug: 'srinagar-scenic-weekend',
    title: 'Srinagar Scenic Weekend',
    duration: '3 Days',
    nights: '2 Nights',
    locations: ['Srinagar'],
    price: '₹6,499',
    tag: 'Short break',
    type: 'Short break',
    image: siteImages.packages.srinagarWeekend,
    imageWidth: 1024,
    imageHeight: 765,
    summary: 'A relaxed 3-day Srinagar weekend with lake views, Mughal garden walks, Old City heritage lanes, and local craft stops.',
    highlights: ['Dal Lake & Nigeen Lake viewpoints', 'Mughal Garden circuit & Chashme Shahi spring', 'Old City heritage walk & spice bazaar', 'Easy-paced, flexible schedule'],
    inclusions: [
      '2 nights accommodation across selected Srinagar hotel and/or lake houseboat',
      'Daily breakfast and dinner (MAP meal plan) per confirmed quotation',
      'Dedicated private sedan or SUV for Srinagar Airport transfers and 3-day city sightseeing',
      '1-hour evening Shikara cruise on Dal or Nigeen Lake',
      'Vehicle fuel, local parking fees, and driver charges'
    ],
    exclusions: [
      'Flights or train bookings to Srinagar / Jammu',
      'Entry passes at Nishat, Shalimar, Chashme Shahi, and Pari Mahal gardens',
      'Lunches, shopping purchases (dry fruits, saffron, handicrafts), and tips',
      'Any custom day-trip add-ons to Gulmarg or Doodhpathri unless added to quote'
    ],
    notes: 'Ideal 3-day Srinagar itinerary for first-time visitors seeking an unhurried stay without long mountain highway drives.',
    itinerary: [
      ['Day 1', 'Welcome to Srinagar & Houseboat Check-in', 'Meet your driver at Srinagar airport, transfer to a traditional cedarwood houseboat on Dal Lake, and enjoy an evening Shikara cruise.'],
      ['Day 2', 'Gardens, Viewpoints & Local Bazaars', 'Explore Nishat Bagh, Shalimar Bagh, and Shankaracharya hilltop temple for panoramic valley vistas. Afternoon visit to heritage craft lanes.'],
      ['Day 3', 'Old City Stroll & Departure', 'Breakfast by the lake, optional quick stop for dry fruits and saffron, followed by airport transfer for your departure.']
    ]
  },
  {
    id: 'valley-escape',
    slug: 'kashmir-valley-escape',
    title: 'Kashmir Valley Escape',
    duration: '4 Days',
    nights: '3 Nights',
    locations: ['Srinagar', 'Gulmarg'],
    price: '₹8,999',
    tag: 'Bestseller',
    type: 'Couples & families',
    image: siteImages.packages.valleyEscape,
    imageWidth: 1024,
    imageHeight: 765,
    summary: 'A 4-day Srinagar and Gulmarg tour balancing Dal Lake Shikara rides, Mughal gardens, and an alpine meadow excursion.',
    highlights: ['Dal Lake Shikara experience', 'Gulmarg alpine meadow day excursion', 'Mughal garden heritage tour', 'Houseboat + hotel stay combination'],
    inclusions: [
      '3 nights stay in Srinagar (hotel and optional houseboat split) on double-sharing basis',
      'Daily breakfast and dinner (MAP plan) as specified in the itinerary quote',
      'Private cab for Srinagar Airport pick-up, local garden sightseeing, and Gulmarg return excursion',
      'One 1-hour sunset Shikara ride on Dal Lake',
      'Road tolls, fuel, and parking charges for Srinagar and Tangmarg/Gulmarg approach'
    ],
    exclusions: [
      'Airfare or train tickets to and from Kashmir',
      'Gulmarg Gondola tickets (booked directly via the official JKCCC online portal)',
      'Winter 4x4 chained vehicle surcharge from Tangmarg to Gulmarg during heavy snow',
      'Garden entry tickets, pony/sledge hire in Gulmarg, lunches, and personal expenses'
    ],
    notes: 'Gondola tickets must be booked in advance directly through the official JKCCC portal listed on our Bookings page.',
    itinerary: [
      ['Day 1', 'Arrive in Srinagar & Dal Lake', 'Airport pickup, check-in to your lakeside hotel or houseboat, followed by a sunset Shikara ride across the tranquil waters.'],
      ['Day 2', 'Srinagar Gardens & Viewpoints', 'Visit Nishat Bagh, Shalimar Bagh and the Botanical Gardens. Evening free for leisurely walks along Boulevard Road.'],
      ['Day 3', 'Gulmarg Alpine Excursion', 'Full-day excursion to Gulmarg (54 km). Experience the Gondola cable car up toward Apharwat Peak before returning to Srinagar for dinner.'],
      ['Day 4', 'Souvenir Shopping & Departure', 'Breakfast, checkout and transfer to Srinagar Airport with fond memories of the valley.']
    ]
  },
  {
    id: 'family-retreat',
    slug: 'family-valley-retreat',
    title: 'Family Valley Retreat',
    duration: '5 Days',
    nights: '4 Nights',
    locations: ['Srinagar', 'Gulmarg', 'Pahalgam'],
    price: '₹12,499',
    tag: 'Family favourite',
    type: 'Family',
    image: siteImages.packages.familyRetreat,
    imageWidth: 1024,
    imageHeight: 765,
    summary: 'A 5-day Kashmir family tour covering Srinagar, Gulmarg, and Pahalgam with gentle travel pacing and spacious stays.',
    highlights: ['Family-paced itinerary with minimal rushing', 'Lidder River moments in Pahalgam', 'Gulmarg meadow cable car experience', 'Private dedicated vehicle for the entire journey'],
    inclusions: [
      '4 nights accommodation split across Srinagar, Gulmarg/mountain base, and Pahalgam',
      'Daily breakfast and dinner (MAP plan) suitable for multi-generational families',
      'Exclusive private family SUV or tempo traveller based on total headcount',
      'Srinagar Airport arrival pick-up and departure drop-off',
      '1-hour Shikara ride on Dal Lake plus all highway tolls, fuel, and driver allowances'
    ],
    exclusions: [
      'Flights or Vande Bharat / Indian Railways train tickets',
      'Gulmarg Gondola Phase I / II passes via official JKCCC portal',
      'Pahalgam local union taxi fees for interior Aru, Betaab, and Chandanwari valleys',
      'Monument/garden tickets, pony rides, lunches, and personal expenses'
    ],
    notes: 'Designed for children and senior travellers with comfortable driving intervals and minimal daily hotel-hopping.',
    itinerary: [
      ['Day 1', 'Welcome to Srinagar', 'Warm airport welcome, transfer to hotel, and an easy evening Shikara ride on Dal Lake.'],
      ['Day 2', 'Srinagar to Gulmarg', 'Scenic drive to Gulmarg. Check into your mountain resort and spend the day taking in the alpine meadows and pine views.'],
      ['Day 3', 'Gulmarg to Pahalgam', 'Morning scenic road journey through saffron fields of Pampore to the valley of shepherds, Pahalgam. Settle in by the Lidder River.'],
      ['Day 4', 'Pahalgam Valley Discovery', 'Visit Betaab Valley or Aru Valley, enjoy gentle walking trails, and return to Srinagar in the late afternoon for a houseboat stay.'],
      ['Day 5', 'Kashmir Farewell', 'Breakfast overlooking the water, checkout and transfer to Srinagar Airport for your onward flight.']
    ]
  },
  {
    id: 'romantic-journey',
    slug: 'romantic-kashmir-journey',
    title: 'Romantic Kashmir Journey',
    duration: '6 Days',
    nights: '5 Nights',
    locations: ['Srinagar', 'Gulmarg', 'Pahalgam'],
    price: '₹17,999',
    tag: 'For Two',
    type: 'Honeymoon',
    image: siteImages.packages.romanticJourney,
    imageWidth: 1024,
    imageHeight: 572,
    summary: 'A 6-day Kashmir honeymoon package pairing hillside stays in Pahalgam and Gulmarg with intimate Dal Lake houseboat evenings.',
    highlights: ['Private Shikara ride at golden hour', 'Overnight stay amidst the pine groves of Pahalgam', 'Gulmarg mountain resort experience', 'Flexible customisation for couples'],
    inclusions: [
      '5 nights couple accommodation across Dal Lake houseboat, Pahalgam, and Gulmarg/Srinagar',
      'Daily breakfast and dinner (MAP meal plan)',
      'Dedicated private couple vehicle for all airport transfers and valley sightseeing',
      'Private 1-hour sunset Shikara ride on Dal Lake',
      'Driver night charges, parking fees, and road tolls'
    ],
    exclusions: [
      'Airfare or rail travel to Srinagar',
      'Gulmarg Gondola e-tickets (booked via official JKCCC portal)',
      'Local Pahalgam union cabs for Aru/Betaab valleys and pony treks to Baisaran',
      'Optional honeymoon room decor/cake requests unless explicitly added to the written quote'
    ],
    notes: 'Optional room decoration or private dinner arrangements can be quoted separately when confirming dates and stay category.',
    itinerary: [
      ['Day 1', 'Arrive Together in Srinagar', 'Private arrival transfer to your premium houseboat on Dal Lake. Enjoy a serene private sunset Shikara ride with Kashmiri Kahwa.'],
      ['Day 2', 'Srinagar to Pahalgam', 'Drive along the Lidder River corridor through apple orchards to Pahalgam. Evening stroll along the whispering riverbanks.'],
      ['Day 3', 'Pahalgam Valleys at Your Pace', 'Day reserved for exploring Betaab Valley, Aru Valley or taking a peaceful pony trek up to Baisaran meadow.'],
      ['Day 4', 'Pahalgam to Gulmarg', 'Picturesque mountain drive to Gulmarg. Check into your boutique mountain stay and enjoy cozy fireplace views.'],
      ['Day 5', 'Gulmarg Gondola & Return to Srinagar', 'Take the morning Gondola to Phase 1 or 2 for snow vistas, then drive back to Srinagar for an evening exploring local boutiques.'],
      ['Day 6', 'Departure with Cherished Memories', 'Enjoy a leisurely breakfast together before your private transfer to Srinagar International Airport.']
    ]
  },
  {
    id: 'alpine-adventure',
    slug: 'alpine-adventure-trail',
    title: 'Alpine Adventure Trail',
    duration: '6 Days',
    nights: '5 Nights',
    locations: ['Srinagar', 'Gulmarg', 'Sonamarg'],
    price: '₹19,499',
    tag: 'Adventure',
    type: 'Adventure',
    image: siteImages.packages.alpineAdventure,
    imageWidth: 1024,
    imageHeight: 572,
    summary: 'A 6-day Kashmir adventure route connecting Srinagar with Sonamarg’s glacial valleys and Gulmarg’s high-altitude ridges.',
    highlights: ['Thajiwas Glacier walk in Sonamarg', 'Gulmarg Apharwat ridge experience (Phase 2)', 'Sindh River valley drive', 'High-altitude alpine scenery & photography'],
    inclusions: [
      '5 nights stay across Srinagar, Sonamarg, and Gulmarg on twin/double sharing basis',
      'Daily breakfast and dinner (MAP meal plan)',
      'Private SUV transport across the Sindh Valley (Sonamarg) and Gulmarg mountain roads',
      'Srinagar Airport arrival and departure transfers plus Shikara ride',
      'Fuel, tolls, and commercial driver charges'
    ],
    exclusions: [
      'Flights or rail tickets to Jammu / Srinagar',
      'Gulmarg Gondola tickets via official JKCCC portal and winter snow-chain vehicles at Tangmarg',
      'Sonamarg local union vehicle charges for Zero Point / Thajiwas approach and rafting fees',
      'Trekking gear, winter boots, pony hire, lunches, and personal travel insurance'
    ],
    notes: 'Sturdy footwear, layered thermals, and UV sunglasses are strongly advised for Sonamarg glaciers and Apharwat ridges.',
    itinerary: [
      ['Day 1', 'Srinagar Arrival & Route Briefing', 'Arrive in Srinagar, gear check with your travel coordinator, and gentle evening walk by the lake.'],
      ['Day 2', 'Srinagar to Sonamarg & Glaciers', 'Drive through the Sindh Valley to Sonamarg. Embark on a scenic guided walk toward the foot of Thajiwas Glacier.'],
      ['Day 3', 'Sonamarg Alpine Exploration', 'Morning exploration of surrounding trails or optional seasonal river rafting along Sindh River. Overnight in Sonamarg.'],
      ['Day 4', 'Sonamarg to Gulmarg', 'Scenic cross-valley highway drive to Gulmarg. Afternoon acclimatization walk through pine forests.'],
      ['Day 5', 'Gulmarg Apharwat Heights', 'Ride the Gondola to Phase 2 (3,980m) for thrilling panoramic views of the Pir Panjal and surrounding Himalayan crests.'],
      ['Day 6', 'Descent to Srinagar & Departure', 'Morning descent from Gulmarg back to Srinagar Airport for your onward journey.']
    ]
  },
  {
    id: 'grand-discovery',
    slug: 'grand-kashmir-discovery',
    title: 'Grand Kashmir Discovery',
    duration: '7 Days',
    nights: '6 Nights',
    locations: ['Srinagar', 'Sonamarg', 'Gulmarg', 'Pahalgam'],
    price: '₹21,999',
    tag: 'Most Complete',
    type: 'Classic tour',
    image: siteImages.packages.grandDiscovery,
    imageWidth: 1024,
    imageHeight: 572,
    summary: 'A classic 7-day Kashmir valley tour spanning Srinagar, Sonamarg, Gulmarg, and Pahalgam with balanced mountain driving.',
    highlights: ['All four iconic destinations: Srinagar, Sonamarg, Gulmarg, Pahalgam', 'Balanced driving times with multi-night stay quality', 'Traditional Shikara ride & houseboat experience', 'Complete valley sightseeing with local insight'],
    inclusions: [
      '6 nights accommodation covering Srinagar hotel, lake houseboat, Gulmarg, and Pahalgam',
      'Daily breakfast and dinner (MAP plan) as agreed in the final quote',
      'Dedicated private cab for airport transfers, Sonamarg day trip, and inter-valley travel',
      'One 1-hour Dal Lake Shikara cruise',
      'Highway tolls, parking permits, fuel, and driver allowances'
    ],
    exclusions: [
      'Air or train tickets to and from Srinagar',
      'Gulmarg Gondola passes (JKCCC official portal) & Tangmarg winter 4x4 chain transfers',
      'Local union cabs inside Pahalgam (Aru/Betaab/Chandanwari) and Sonamarg (Zero Point/Thajiwas)',
      'Garden tickets, pony/sledge rentals, lunches, and personal expenses'
    ],
    notes: 'Our most balanced 1-week Kashmir itinerary covering all four classic valley regions without overpacked driving days.',
    itinerary: [
      ['Day 1', 'Arrival in Srinagar', 'Pickup and check-in to your hotel. Evening sunset Shikara ride across Dal Lake.'],
      ['Day 2', 'Sonamarg Day Excursion', 'Full day excursion to the Meadow of Gold along Sindh River. Explore Thajiwas Glacier and return to Srinagar.'],
      ['Day 3', 'Srinagar to Gulmarg', 'Scenic drive to Gulmarg. Check into your mountain resort and spend the afternoon taking in the alpine meadows.'],
      ['Day 4', 'Gulmarg Gondola & Transfer to Pahalgam', 'Morning Gondola cable car ride, followed by an afternoon scenic drive south to the Lidder Valley in Pahalgam.'],
      ['Day 5', 'Pahalgam Valleys', 'Spend an unhurried day exploring Betaab Valley, Aru Valley or the gentle trails of Chandanwari.'],
      ['Day 6', 'Pahalgam to Srinagar Houseboat', 'Return to Srinagar in the afternoon and check into a lake houseboat. Evening walk through traditional craft lanes.'],
      ['Day 7', 'Departure from Srinagar', 'Enjoy lakeside breakfast, checkout, and transfer to Srinagar Airport for your onward journey.']
    ]
  },
  {
    id: 'grand-kashmir-gurez',
    slug: 'grand-kashmir-gurez-odyssey',
    title: 'Grand Kashmir & Gurez Odyssey',
    duration: '8 Days',
    nights: '7 Nights',
    locations: ['Srinagar', 'Gulmarg', 'Pahalgam', 'Sonamarg', 'Gurez Valley'],
    price: '₹26,999',
    tag: 'Flagship Journey',
    type: 'Classic tour',
    image: siteImages.packages.gurezOdyssey,
    imageWidth: 1024,
    imageHeight: 572,
    summary: 'An 8-day Kashmir expedition combining Srinagar, Gulmarg, Pahalgam, and Sonamarg with remote Gurez Valley across Razdan Pass.',
    highlights: ['Remote Gurez Valley & Habba Khatoon peak experience', 'Crossing scenic Razdan Pass (3,300m)', 'Classic circuit: Srinagar, Gulmarg, Pahalgam & Sonamarg', 'Dard-Shin village landscapes along the Kishanganga'],
    inclusions: [
      '7 nights stay combining Srinagar, Pahalgam, Gurez Valley lodge/homestay, and houseboat',
      'Daily breakfast and dinner (MAP meal plan)',
      'High-clearance private SUV suitable for mountain highways and Razdan Pass',
      'Srinagar Airport pickup/drop and Dal Lake Shikara cruise',
      'Fuel, tolls, parking fees, and driver mountain allowance'
    ],
    exclusions: [
      'Flights or railway tickets to Kashmir',
      'Gulmarg Gondola passes via JKCCC portal',
      'Pahalgam local union cabs (Aru/Betaab) and Sonamarg local pony/sledge or union transfers',
      'Personal expenses, lunches, and monument entry fees'
    ],
    notes: 'Best scheduled between June and September when Razdan Pass is open; original government photo ID is mandatory for Gurez route checkpoints.',
    itinerary: [
      ['Day 1', 'Arrival in Srinagar', 'Airport welcome, transfer to hotel, and gentle evening Shikara ride on Dal Lake.'],
      ['Day 2', 'Srinagar to Gulmarg Meadows', 'Drive to Gulmarg, Gondola cable car excursion, and evening alpine leisure.'],
      ['Day 3', 'Gulmarg to Pahalgam Valley', 'Scenic transfer south along saffron fields to the pine-scented Lidder River in Pahalgam.'],
      ['Day 4', 'Pahalgam Valley Discovery', 'Visit Betaab Valley, Aru Valley, and enjoy riverside dining before returning to Srinagar.'],
      ['Day 5', 'Srinagar over Razdan Pass to Gurez Valley', 'Early morning departure through Bandipora, ascending over dramatic Razdan Pass into the secluded valley of Dawar, Gurez.'],
      ['Day 6', 'Gurez Valley & Habba Khatoon', 'Explore pristine villages along the turquoise Kishanganga River and watch the golden hour glow on Habba Khatoon peak.'],
      ['Day 7', 'Gurez to Srinagar Houseboat Stay', 'Scenic drive back to Srinagar. Check in to a traditional cedarwood houseboat on Dal Lake for your farewell dinner.'],
      ['Day 8', 'Kashmir Farewell & Departure', 'Relaxed breakfast on the deck, souvenir stop, and timely transfer to Srinagar Airport.']
    ]
  }
];

export const services = [
  { number: '01', title: 'Tailor-made tour planning', description: 'Day-wise Kashmir journeys shaped around your dates, pace, interests and budget.', icon: 'route' },
  { number: '02', title: 'Hotels & curated stays', description: 'Choose your preferred stay category across Srinagar, Gulmarg, Pahalgam and Gurez.', icon: 'hotel' },
  { number: '03', title: 'Houseboat experiences', description: 'Spend a quiet night on Dal or Nigeen Lake with traditional Kashmiri hospitality.', icon: 'waves' },
  { number: '04', title: 'Private transport', description: 'Srinagar airport transfers, local sightseeing cabs and multi-day valley routes.', icon: 'car' },
  { number: '05', title: 'Family, couple & group tours', description: 'Thoughtful pacing and practical arrangements for family, honeymoon and group travel.', icon: 'users' },
  { number: '06', title: 'On-trip coordination', description: 'Direct Sopore & Srinagar local support for every moving part of your Kashmir trip.', icon: 'headphones' }
];

export const faqs = [
  { question: 'Can I customise a Kashmir tour package?', answer: 'Yes. Every itinerary can be tailored to your requirements. Travel dates, number of guests, stay categories, vehicle choices and sightseeing preferences can all be personalized in your proposal.' },
  { question: 'What is included in package starting price estimates?', answer: 'Listed per-person amounts are indicative starting estimates based on standard double sharing. Your written quotation clarifies exact hotel/houseboat names, room category, MAP meal plan, private vehicle type, inclusions, and exclusions before you confirm.' },
  { question: 'How do I confirm a booking?', answer: 'Send an enquiry with your tentative travel dates and group details. A booking is confirmed only after availability, written inclusions, final quotation, payment schedule, and cancellation terms are agreed upon.' },
  { question: 'Can you arrange Srinagar airport pickup and train station transfers?', answer: 'Yes, private airport transfers at Srinagar International Airport (SXR) or railway transfers can be coordinated cleanly alongside any multi-day itinerary.' },
  { question: 'Where should I book Gulmarg Gondola or Vande Bharat train tickets?', answer: 'Gulmarg Gondola tickets must be purchased directly on the official J&K Cable Car Corporation portal, and train tickets directly via IRCTC. Our Bookings hub provides direct links to official portals so you never overpay unofficial agents.' },
  { question: 'Where is your head office located?', answer: 'Our head office is at Bismillah Market, Sopore, Baramulla, Jammu & Kashmir, India (PIN 193201). You can also reach our coordinators via phone (+91 6006343335), WhatsApp, or email (bookings@bittkashmir.in).' }
];

export const guides = [
  {
    slug: 'getting-here-arrival-planning',
    category: '01 / GETTING HERE',
    title: 'How to Reach Kashmir & Arrival Planning Guide',
    description: 'Practical checklist for arriving via Srinagar Airport (SXR) or train, security screening, prepaid SIM rules, and Day 1 pacing.',
    image: siteImages.guides.arrivalPlanning,
    imageWidth: 1024,
    imageHeight: 765,
    readTime: '6 min read',
    intro: 'Whether you fly into Sheikh ul-Alam International Airport (SXR) in Srinagar or connect by rail via Indian Railways, planning your arrival logistics in advance keeps your first 24 hours in Kashmir smooth and unhurried.',
    sections: [
      {
        heading: 'Srinagar International Airport (SXR) Essentials',
        content: 'Sheikh ul-Alam International Airport (SXR) is a joint civil-defence airfield with enhanced security protocols. Keep digital or printed boarding passes and original government photo identification accessible from the arrival and departure approach gates.',
        points: [
          'Pre-arrange private airport pickup in advance rather than negotiating at arrival curbs.',
          'Postpaid mobile connections (Airtel, Jio, BSNL) work reliably in Kashmir; outside prepaid SIM cards normally do not connect under regional telecom rules.',
          'On departure day, reach Srinagar Airport 2.5 to 3 hours before flight time to clear outer security checks and terminal screening calmly.'
        ]
      },
      {
        heading: 'Arriving by Train & Connecting Road Transfers',
        content: 'Travellers coming by rail—including Vande Bharat Express services operating on Indian Railways corridors—should always check live train schedules, stations, and fares directly on the official IRCTC portal before locking hotel dates.',
        points: [
          'Verify operating days, boarding station, and arrival station on IRCTC before finalising highway pickups.',
          'Coordinate transfer timing with your travel planner so road arrival matches check-in hours.',
          'Visit our Travel Booking Hub for direct official IRCTC links and WhatsApp transfer planning assistance.'
        ]
      },
      {
        heading: 'The First Evening: Keep Day 1 Gentle',
        content: 'Srinagar sits at roughly 1,585 metres (5,200 ft). Whether staying at a lakeside hotel or a Dal Lake houseboat, reserve Day 1 for gentle acclimatisation and lakeside rest before mountain drives.',
        points: [
          'Step onto a registered Shikara around 5:00 PM for sunset across Dal or Nigeen Lake.',
          'Leave long mountain road excursions (Gulmarg, Sonamarg, or Pahalgam) for Day 2 onward.',
          'Keep small cash denominations handy for local tea stalls, Shikara tips, and market stops.'
        ]
      }
    ],
    practicalAdvice: [
      'Book official Gulmarg Gondola e-tickets well ahead of arrival via the JKCCC portal—especially for peak spring and winter slots.',
      'Share your confirmed flight or rail PNR timing with our Sopore coordination desk so airport or station transfers stay aligned.'
    ],
    relatedDestinations: ['srinagar', 'gulmarg'],
    relatedPackageSlugs: ['srinagar-scenic-weekend', 'kashmir-valley-escape']
  },
  {
    slug: 'choosing-trip-length-duration',
    category: '02 / PLAN YOUR DAYS',
    title: 'How to Choose the Best Kashmir Itinerary & Trip Length',
    description: 'Balance valley drive times, hotel stays, Srinagar-Gulmarg-Pahalgam circuits, and offbeat Gurez planning across 3 to 8 days.',
    image: siteImages.guides.choosingDuration,
    imageWidth: 1024,
    imageHeight: 572,
    readTime: '6 min read',
    intro: 'Distances in Kashmir look short on a map—Srinagar to Gulmarg is roughly 54 km and Pahalgam is around 90 km—yet winding hill sections, seasonal traffic, and scenic stops mean 50–90 km often takes 2 to 3 hours. Matching your days to the right circuit prevents rushed mornings.',
    sections: [
      {
        heading: '2 to 4 Days: Srinagar, Houseboats & One Alpine Valley',
        content: 'For long weekends or 3–4 day breaks, anchor every night in Srinagar (including 1 night in a cedarwood houseboat) and add a single full-day alpine excursion to either Gulmarg or Doodhpathri.',
        points: [
          'Spend Day 1 on Dal Lake Shikara rides and Boulevard walks.',
          'Dedicate a full day to Gulmarg meadows and the Gondola cable car—without squeezing in another highway transfer.',
          'Explore Nishat, Shalimar, and Old City craft bazaars on your remaining half-day.'
        ]
      },
      {
        heading: '5 to 6 Days: The Classic Family & Honeymoon Circuit',
        content: 'Five to six days is the most balanced trip duration for families and couples. It links Srinagar, Gulmarg, and Pahalgam with overnight stays in the mountains rather than back-to-back day returns.',
        points: [
          'Spend 1–2 nights in Pahalgam along the Lidder River with relaxed visits to Aru and Betaab valleys.',
          'Pair 1 night in Gulmarg (or an early-start excursion) with Gondola Phase I / Phase II timing.',
          'Finish with a calm houseboat evening on Dal or Nigeen Lake before airport departure.'
        ]
      },
      {
        heading: '7 to 8 Days: Sonamarg Glaciers & Offbeat Gurez Valley',
        content: 'With a full week or 8 days, you can comfortably include Sonamarg’s Thajiwas valley or venture north across the 3,300m Razdan Pass into Gurez Valley during summer.',
        points: [
          'Allow 2 nights in Gurez (Dawar) to absorb Kishanganga river views and Habba Khatoon peak without highway fatigue.',
          'Keep Day 7 back in Srinagar as a weather buffer before your Day 8 flight.',
          'Avoid scheduling high-altitude excursions on the morning of your outbound flight.'
        ]
      }
    ],
    practicalAdvice: [
      'Families with young kids or seniors benefit from staying at least 2 consecutive nights in Pahalgam instead of single-night packing.',
      'In summer (June–September), adding Gurez Valley adds quiet slow travel far from busy resort hubs.'
    ],
    relatedDestinations: ['srinagar', 'pahalgam', 'gulmarg', 'sonamarg', 'gurez-valley'],
    relatedPackageSlugs: ['family-valley-retreat', 'romantic-kashmir-journey', 'grand-kashmir-discovery', 'grand-kashmir-gurez-odyssey']
  },
  {
    slug: 'kashmir-travel-tips-essentials',
    category: '03 / TRAVEL WELL',
    title: 'Best Time to Visit Kashmir, Packing & Local Transport Tips',
    description: 'Seasonal weather guide for spring, summer, autumn and snow months, plus Pahalgam/Sonamarg union cab rules and packing essentials.',
    image: siteImages.guides.travelEssentials,
    imageWidth: 1024,
    imageHeight: 765,
    readTime: '6 min read',
    intro: 'Each season in Kashmir—blossom spring, green summer meadows, amber Chinar autumn, and snowy winter—carries different packing needs and local road considerations. Understanding mountain microclimates and regional cab union rules keeps expectations transparent from day one.',
    sections: [
      {
        heading: 'Seasonal Weather & Best Time to Visit Kashmir',
        content: 'Kashmir offers four distinct travel seasons. Srinagar can reach 28°C–30°C in June–July while high-altitude Gulmarg Phase II or Thajiwas Glacier stays crisp around 5°C–10°C even in midsummer.',
        points: [
          'Spring (March–April): Tulip Garden blooms, almond blossoms, mild valley breezes, and snow lingering on upper peaks.',
          'Summer (May–August): Lush green meadows in Pahalgam, Sonamarg, Doodhpathri, and Gurez Valley across open mountain passes.',
          'Autumn (September–November): Crisp golden Chinar foliage in Srinagar Mughal Gardens and clear mountain visibility.',
          'Winter (December–February): Heavy snow experiences in Gulmarg and Srinagar chill; thermal layers, waterproof boots, and chained 4x4 Tangmarg transfers apply.'
        ]
      },
      {
        heading: 'Understanding Union Taxis, Ponies & Activity Portals',
        content: 'To support local mountain communities, tourism associations in Pahalgam, Sonamarg, and winter Tangmarg–Gulmarg zones operate dedicated local union vehicles for interior sightseeing.',
        points: [
          'Outside tourist cabs drop and pick up at Pahalgam or Sonamarg hotels, while interior points (Aru, Betaab, Chandanwari, or Zero Point) require hiring registered local union taxis.',
          'Always verify posted official rate boards for pony rides or sledges before starting an excursion.',
          'Book Gulmarg Gondola tickets and Amarnath helicopter passes solely through official government portals—never through unverified touts.'
        ]
      }
    ],
    practicalAdvice: [
      'Carry original Aadhaar, Passport, or Voter ID for hotel check-ins, Srinagar Airport checks, and Gurez highway checkpoints.',
      'Pack UV sunglasses, sunscreen, lip balm, and comfortable layered outerwear regardless of the travel month.'
    ],
    relatedDestinations: ['srinagar', 'sonamarg', 'pahalgam', 'doodhpathri'],
    relatedPackageSlugs: ['alpine-adventure-trail', 'grand-kashmir-gurez-odyssey']
  }
];
