export const brand = {
  name: 'Brand Identity',
  descriptor: 'Tour & Travel',
  phone: '+91 6006343335',
  email: 'bookings@bittkashmir.in',
  address: 'Bismillah Market, Sopore, Jammu & Kashmir 193201',
  hours: 'Monday – Saturday, 10:00 – 18:00 IST',
  whatsapp: '916006343335',
  social: {
    instagram: '', // Set when verified official link is available
    facebook: '',
    youtube: ''
  },
  disclaimer: 'Demo website for Brand Identity Tour & Travel. Rates, contact information and itineraries are illustrative sample data.'
};

export const destinations = [
  {
    slug: 'Sopore',
    name: 'Sopore',
    eyebrow: 'Lake days & garden walks',
    description: 'A graceful mix of still waters, old-world Mughal gardens, floating vegetable markets and warm Kashmiri hospitality.',
    overview: 'The summer capital of Jammu & Kashmir rests along the banks of the Jhelum river and the tranquil waters of Dal and Nigeen lakes. Renowned for its historic wooden architecture, traditional wooden houseboats, and centuries-old terraced gardens built by Mughal emperors, Sopore provides an ideal, relaxing base for any valley journey.',
    image: 'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=1200&q=85',
    bestSeason: 'April to October (Gardens & Lakes) · December to February (Snow & Chill)',
    suggestedDuration: '2 to 3 Days',
    highlights: ['Dal Lake sunset & sunrise Shikara rides', 'Nishat, Shalimar & Chashme Shahi gardens', 'Old City heritage walk & Jamia Masjid', 'Handcrafted Pashmina & walnut woodcraft workshops', 'Overnight stay in a cedarwood houseboat'],
    travelTips: [
      'Pre-negotiate Shikara rates at designated government-registered ghats.',
      'Rise early (around 5:30 AM) to experience the historic floating vegetable market.',
      'Keep your photo ID and flight tickets accessible for Sopore Airport security.'
    ],
    nearbySlugs: ['gulmarg', 'pahalgam', 'doodhpathri']
  },
  {
    slug: 'gulmarg',
    name: 'Gulmarg',
    eyebrow: 'A little closer to the clouds',
    description: 'Alpine meadows, dense pine forests and snow-crowned peaks make Gulmarg an unforgettable high-altitude escape in every season.',
    overview: 'Perched at 2,650 metres above sea level in the Pir Panjal range, Gulmarg (“Meadow of Flowers”) transforms from a vibrant wildflower basin in summer into one of Asia’s premier winter ski destinations. Home to one of the world’s highest operating cable cars, the Gulmarg Gondola ascends toward Apharwat Peak.',
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=85',
    bestSeason: 'December to March (Powder snow & skiing) · May to September (Lush green alpine meadows)',
    suggestedDuration: '1 to 2 Days',
    highlights: ['Gulmarg Gondola Phase 1 (Kongdoori) & Phase 2 (Apharwat Peak)', 'St. Mary’s Church & historic golf course', 'Snowboarding, skiing & sledging in winter', 'Scenic mountain walks toward Khilanmarg meadow'],
    travelTips: [
      'Book Gondola tickets well in advance online via the official J&K Cable Car Corporation portal.',
      'In winter, vehicle chains are mandatory from Tangmarg upwards; coordinate private 4x4 transfers.',
      'Dress in layers—high altitude weather changes swiftly.'
    ],
    nearbySlugs: ['Sopore']
  },
  {
    slug: 'pahalgam',
    name: 'Pahalgam',
    eyebrow: 'Slow down in the valley',
    description: 'Follow the turquoise Lidder River through pine-covered slopes, tranquil shepherd trails and open mountain valleys.',
    overview: 'Located at the confluence of streams flowing from Sheshnag Lake and the Lidder River, Pahalgam (“Valley of Shepherds”) offers a peaceful alpine respite surrounded by towering fir forests. It is both a scenic haven for nature lovers and the traditional starting point of the annual Amarnath Yatra pilgrimage.',
    image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1200&q=85',
    bestSeason: 'March to November (Mild weather, trout fishing & blossoming apple orchards)',
    suggestedDuration: '2 to 3 Days',
    highlights: ['Lidder River angling & riverside strolls', 'Betaab Valley (named after the Bollywood classic)', 'Aru Valley scenic meadows & trek basecamp', 'Chandanwari valley & Baisaran (“Mini Switzerland”)'],
    travelTips: [
      'Local sight-seeing in Aru, Betaab and Chandanwari requires designated local union taxi booking.',
      'Enjoy freshly prepared Kashmiri trout at certified riverside eateries.',
      'Wear sturdy walking or hiking shoes for the muddy trails around Baisaran meadow.'
    ],
    nearbySlugs: ['Sopore', 'doodhpathri']
  },
  {
    slug: 'sonamarg',
    name: 'Sonamarg',
    eyebrow: 'Follow the mountain roads',
    description: 'A dramatic highland landscape of sweeping meadows, turquoise glacial streams and gateway passes toward Ladakh.',
    overview: 'Translating to “Meadow of Gold”, Sonamarg lies along the Sindh River flanked by jagged glaciers and soaring Himalayan peaks. Situated along the historic Sopore-Leh highway, Sonamarg is the entry point to high-altitude Himalayan passes and the famed Great Lakes trek.',
    image: 'https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&w=1200&q=85',
    bestSeason: 'May to October (Passes open, alpine flowers & clear glacier vistas)',
    suggestedDuration: '1 to 2 Days',
    highlights: ['Thajiwas Glacier trek or pony excursion', 'Sindh River white-water rafting (seasonal)', 'Scenic mountain drive through the Z-Morh tunnel', 'Zero Point & Zoji La Pass exploration'],
    travelTips: [
      'Carry warm jackets even in peak summer due to glacial winds blowing off Thajiwas.',
      'Check morning road conditions before driving up from Sopore.',
      'Support local sledge operators with agreed rates before embarking toward the snowline.'
    ],
    nearbySlugs: ['Sopore', 'gulmarg']
  },
  {
    slug: 'gurez-valley',
    name: 'Gurez Valley',
    eyebrow: 'A quieter kind of Kashmir',
    description: 'An untouched borderland valley renowned for emerald Kishanganga waters, timber hamlets and genuine Shin culture.',
    overview: 'Shielded behind the formidable Razdan Pass at 3,300 metres, Gurez Valley is one of Kashmir’s most serene and offbeat frontiers. Flanked by the legendary pyramid-shaped Habba Khatoon peak and the rushing Kishanganga river, Gurez offers pure slow travel, stargazing and authentic Dard-Shin village hospitality.',
    image: 'https://images.unsplash.com/photo-1464278533981-50106e6176b1?auto=format&fit=crop&w=1200&q=85',
    bestSeason: 'June to September (Razdan Pass remains snow-free)',
    suggestedDuration: '2 to 3 Days',
    highlights: ['Sunset views of the Habba Khatoon pyramid peak', 'Kishanganga riverbank walks & trout watching', 'Traditional wooden log homes in Dawar and Tulail villages', 'Crossing the panoramic Razdan Pass with views of Mount Harmukh'],
    travelTips: [
      'Carry valid government photo IDs as several checkpoints require civilian registration along the route.',
      'Mobile connectivity is primarily limited to BSNL and select Airtel postpaid services.',
      'Opt for authentic homestays to taste organic local buckwheat flatbreads and fresh butter tea.'
    ],
    nearbySlugs: ['Sopore', 'sonamarg']
  },
  {
    slug: 'doodhpathri',
    name: 'Doodhpathri',
    eyebrow: 'A meadow made for wandering',
    description: 'A tranquil highland bowl of milky mountain streams, rolling velvet grasslands and quiet pine-fringed hillsides.',
    overview: 'Known as the “Valley of Milk” because of the frothy waters cascading over stones along the Shaliganga river, Doodhpathri is one of Kashmir’s least commercialised meadows. Located just 42 kilometres from Sopore in the Budgam district, it offers wide, uncrowded pastures where nomadic Gujjar shepherds graze their flocks.',
    image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1200&q=85',
    bestSeason: 'May to October (Lush green carpet) · December to March (Quiet winter snow blanket)',
    suggestedDuration: '1 Day (Day excursion from Sopore)',
    highlights: ['Picnicking along the frothy Shaliganga stream', 'Horseback ride or gentle walk to Dikbal meadow', 'Untouched pine forest viewpoints & fresh spring water', 'Fresh shepherd dairy and traditional tea stalls'],
    travelTips: [
      'Ideal as a peaceful day trip from Sopore away from tourist crowds.',
      'Pack light picnic provisions, though simple fresh snacks and tea are available locally.',
      'Leave no trace behind—help protect the fragile meadow ecosystem.'
    ],
    nearbySlugs: ['Sopore', 'pahalgam']
  }
];

export const sampleInclusions = [
  'Accommodation in selected hotel categories or luxury lake houseboats on double sharing',
  'Daily breakfast and dinner (MAP meal plan) prepared with hygienic standards',
  'Exclusive private vehicle (Sedan or SUV based on group size) for all transfers and sightseeing',
  'Pick-up and drop-off assistance at Sopore International Airport',
  'One 1-hour sunset Shikara ride across the lotus gardens of Dal Lake',
  'Driver night charges, toll taxes, fuel costs and vehicle parking permits'
];

export const sampleExclusions = [
  'Airfare or railway tickets to/from Sopore',
  'Gulmarg Gondola cable car tickets (must be booked via the official J&K tourism portal)',
  'Local union cab charges in Pahalgam (Aru/Betaab/Chandanwari) and Sonamarg (Zero Point)',
  'Pony/horse riding charges, ski equipment hire, and sledging rentals',
  'Entry tickets to Mughal Gardens, historical monuments, and national sanctuaries',
  'Personal expenses, travel insurance, laundry, and tips'
];

export const packages = [
  {
    id: 'Sopore-express',
    slug: 'Sopore-express-getaway',
    title: 'Sopore Express Getaway',
    duration: '2 Days',
    nights: '1 Night',
    locations: ['Sopore'],
    price: '₹4,499',
    tag: 'Quick Pause',
    type: 'Short break',
    image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=85',
    summary: 'A crisp 48-hour mountain pause featuring an evening Shikara cruise on Dal Lake and a morning stroll through Nishat and Shalimar gardens.',
    highlights: ['Sunset Dal Lake Shikara cruise', 'Mughal garden visit (Nishat & Shalimar)', 'Overnight stay in a cedarwood houseboat', 'Traditional Kashmiri Kahwa tasting'],
    inclusions: sampleInclusions,
    exclusions: sampleExclusions,
    notes: 'Ideal for weekend travellers or business transit guests looking for a refreshing taste of Kashmir.',
    itinerary: [
      ['Day 1', 'Arrive in Sopore & Lake Check-in', 'Private airport pickup, transfer to your designated houseboat on Dal Lake, and a tranquil 1-hour Shikara ride around floating gardens at dusk.'],
      ['Day 2', 'Mughal Gardens & Departure', 'Morning breakfast, visit Nishat Bagh and Shalimar Bagh along the lake boulevard, and drop-off at Sopore International Airport as per flight schedule.']
    ]
  },
  {
    id: 'Sopore-weekend',
    slug: 'Sopore-scenic-weekend',
    title: 'Sopore Scenic Weekend',
    duration: '3 Days',
    nights: '2 Nights',
    locations: ['Sopore'],
    price: '₹6,499',
    tag: 'Short break',
    type: 'Short break',
    image: destinations[0].image,
    summary: 'A relaxed city escape with lake views, garden time, Old City heritage discovery and an authentic taste of local Kashmiri culture.',
    highlights: ['Dal Lake & Nigeen Lake viewpoints', 'Mughal Garden circuit & Chashme Shahi spring', 'Old City heritage walk & spice bazaar', 'Easy-paced, flexible schedule'],
    inclusions: sampleInclusions,
    exclusions: sampleExclusions,
    notes: 'Perfect for first-time visitors seeking an easy, unhurried city retreat without long mountain drives.',
    itinerary: [
      ['Day 1', 'Welcome to Sopore & Houseboat Check-in', 'Meet your driver at Sopore airport, transfer to a traditional cedarwood houseboat on Dal Lake, and enjoy an evening Shikara cruise.'],
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
    locations: ['Sopore', 'Gulmarg'],
    price: '₹8,999',
    tag: 'Bestseller',
    type: 'Couples & families',
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=85',
    summary: 'A refreshing first look at Kashmir, with lake time, terraced garden visits and an exhilarating high-altitude mountain day trip to Gulmarg.',
    highlights: ['Dal Lake Shikara experience', 'Gulmarg alpine meadow day excursion', 'Mughal garden heritage tour', 'Houseboat + hotel stay combination'],
    inclusions: sampleInclusions,
    exclusions: sampleExclusions,
    notes: 'Gondola tickets should be pre-booked online through the official portal to secure Phase 2 access.',
    itinerary: [
      ['Day 1', 'Arrive in Sopore & Dal Lake', 'Airport pickup, check-in to your lakeside hotel or houseboat, followed by a sunset Shikara ride across the tranquil waters.'],
      ['Day 2', 'Sopore Gardens & Viewpoints', 'Visit Nishat Bagh, Shalimar Bagh and the Botanical Gardens. Evening free for leisurely walks along Boulevard Road.'],
      ['Day 3', 'Gulmarg Alpine Excursion', 'Full-day excursion to Gulmarg (54 km). Experience the Gondola cable car up toward Apharwat Peak before returning to Sopore for dinner.'],
      ['Day 4', 'Souvenir Shopping & Departure', 'Breakfast, checkout and transfer to Sopore Airport with fond memories of the valley.']
    ]
  },
  {
    id: 'family-retreat',
    slug: 'family-valley-retreat',
    title: 'Family Valley Retreat',
    duration: '5 Days',
    nights: '4 Nights',
    locations: ['Sopore', 'Gulmarg', 'Pahalgam'],
    price: '₹12,499',
    tag: 'Family favourite',
    type: 'Family',
    image: destinations[2].image,
    summary: 'A relaxed family route balancing gentle sightseeing, open pine meadows, riverside strolls and comfortable stays suited for all ages.',
    highlights: ['Family-paced itinerary with minimal rushing', 'Lidder River moments in Pahalgam', 'Gulmarg meadow cable car experience', 'Private dedicated vehicle for the entire journey'],
    inclusions: sampleInclusions,
    exclusions: sampleExclusions,
    notes: 'Children and seniors enjoy the gentle riverside trails and comfortable private sedan transfers.',
    itinerary: [
      ['Day 1', 'Welcome to Sopore', 'Warm airport welcome, transfer to hotel, and an easy evening Shikara ride on Dal Lake.'],
      ['Day 2', 'Sopore to Gulmarg', 'Scenic drive to Gulmarg. Check into your mountain resort and spend the day taking in the alpine meadows and pine views.'],
      ['Day 3', 'Gulmarg to Pahalgam', 'Morning scenic road journey through saffron fields of Pampore to the valley of shepherds, Pahalgam. Settle in by the Lidder River.'],
      ['Day 4', 'Pahalgam Valley Discovery', 'Visit Betaab Valley or Aru Valley, enjoy gentle walking trails, and return to Sopore in the late afternoon for a houseboat stay.'],
      ['Day 5', 'Kashmir Farewell', 'Breakfast overlooking the water, checkout and transfer to Sopore Airport for your onward flight.']
    ]
  },
  {
    id: 'romantic-journey',
    slug: 'romantic-kashmir-journey',
    title: 'Romantic Kashmir Journey',
    duration: '6 Days',
    nights: '5 Nights',
    locations: ['Sopore', 'Gulmarg', 'Pahalgam'],
    price: '₹17,999',
    tag: 'For Two',
    type: 'Honeymoon',
    image: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=1200&q=85',
    summary: 'A slower mountain escape for couples, featuring boutique hillside stays, candlelit dinners, intimate Shikara hours and unhurried valley days.',
    highlights: ['Private Shikara ride with special flower arrangement', 'Overnight stay amidst the pine groves of Pahalgam', 'Gulmarg mountain resort experience', 'Romantic lakeside dinner arrangements'],
    inclusions: sampleInclusions,
    exclusions: sampleExclusions,
    notes: 'Special couple arrangements such as room decoration and flower bouquets can be customized upon request.',
    itinerary: [
      ['Day 1', 'Arrive Together in Sopore', 'Private arrival transfer to your premium houseboat on Dal Lake. Enjoy a serene private sunset Shikara ride with Kashmiri Kahwa.'],
      ['Day 2', 'Sopore to Pahalgam', 'Drive along the Lidder River corridor through apple orchards to Pahalgam. Evening stroll along the whispering riverbanks.'],
      ['Day 3', 'Pahalgam Valleys at Your Pace', 'Day reserved for exploring Betaab Valley, Aru Valley or taking a peaceful pony trek up to Baisaran meadow.'],
      ['Day 4', 'Pahalgam to Gulmarg', 'Picturesque mountain drive to Gulmarg. Check into your boutique mountain stay and enjoy cozy fireplace views.'],
      ['Day 5', 'Gulmarg Gondola & Return to Sopore', 'Take the morning Gondola to Phase 1 or 2 for snow vistas, then drive back to Sopore for an evening exploring local boutiques.'],
      ['Day 6', 'Departure with Cherished Memories', 'Enjoy a leisurely breakfast together before your private transfer to Sopore International Airport.']
    ]
  },
  {
    id: 'alpine-adventure',
    slug: 'alpine-adventure-trail',
    title: 'Alpine Adventure Trail',
    duration: '6 Days',
    nights: '5 Nights',
    locations: ['Sopore', 'Gulmarg', 'Sonamarg'],
    price: '₹19,499',
    tag: 'Adventure',
    type: 'Adventure',
    image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1200&q=85',
    summary: 'A mountain-forward itinerary for active travellers seeking crisp glacial air, alpine ridge trails, river rapids and dramatic Himalayan viewpoints.',
    highlights: ['Thajiwas Glacier trek in Sonamarg', 'Gulmarg Apharwat Peak hike (Phase 2)', 'Sindh River adventure experience', 'Breathtaking high-altitude photography opportunities'],
    inclusions: sampleInclusions,
    exclusions: sampleExclusions,
    notes: 'Sturdy trekking footwear, thermal innerwear and UV sunglasses are recommended for glacial treks.',
    itinerary: [
      ['Day 1', 'Sopore Arrival & Route Briefing', 'Arrive in Sopore, gear check with your travel coordinator, and gentle evening walk by the lake.'],
      ['Day 2', 'Sopore to Sonamarg & Glaciers', 'Drive through the Sindh Valley to Sonamarg. Embark on a scenic guided trek toward the foot of Thajiwas Glacier.'],
      ['Day 3', 'Sonamarg Alpine Exploration', 'Morning exploration of surrounding trails or optional seasonal river rafting along Sindh River. Overnight in Sonamarg.'],
      ['Day 4', 'Sonamarg to Gulmarg', 'Scenic cross-valley highway drive to Gulmarg. Afternoon acclimatization walk through pine forests.'],
      ['Day 5', 'Gulmarg Apharwat Heights', 'Ride the Gondola to Phase 2 (3,980m) for thrilling panoramic views of Nanga Parbat and surrounding Himalayan crests.'],
      ['Day 6', 'Descent to Sopore & Departure', 'Morning descent from Gulmarg back to Sopore Airport for your onward journey.']
    ]
  },
  {
    id: 'grand-discovery',
    slug: 'grand-kashmir-discovery',
    title: 'Grand Kashmir Discovery',
    duration: '7 Days',
    nights: '6 Nights',
    locations: ['Sopore', 'Sonamarg', 'Gulmarg', 'Pahalgam'],
    price: '₹21,999',
    tag: 'Most Complete',
    type: 'Classic tour',
    image: destinations[3].image,
    summary: 'A complete, classic journey connecting Kashmir’s four signature destinations, from quiet lakeside mornings to dramatic glacial passes.',
    highlights: ['All four iconic destinations: Sopore, Sonamarg, Gulmarg, Pahalgam', 'Balanced driving times with multi-night stay quality', 'Traditional Shikara ride & houseboat experience', 'Complete valley sightseeing with local insight'],
    inclusions: sampleInclusions,
    exclusions: sampleExclusions,
    notes: 'The most comprehensive introduction to Kashmir, balancing varied landscapes, heritage, and mountain leisure.',
    itinerary: [
      ['Day 1', 'Arrival in Sopore', 'Pickup and check-in to your hotel. Evening sunset Shikara ride across Dal Lake.'],
      ['Day 2', 'Sonamarg Day Excursion', 'Full day excursion to the Meadow of Gold along Sindh River. Explore Thajiwas Glacier and return to Sopore.'],
      ['Day 3', 'Sopore to Gulmarg', 'Scenic drive to Gulmarg. Check into your mountain resort and spend the afternoon taking in the alpine meadows.'],
      ['Day 4', 'Gulmarg Gondola & Transfer to Pahalgam', 'Morning Gondola cable car ride, followed by an afternoon scenic drive south to the Lidder Valley in Pahalgam.'],
      ['Day 5', 'Pahalgam Valleys', 'Spend an unhurried day exploring Betaab Valley, Aru Valley or the gentle trails of Chandanwari.'],
      ['Day 6', 'Pahalgam to Sopore Houseboat', 'Return to Sopore in the afternoon and check into a luxury lake houseboat. Evening walk through traditional craft lanes.'],
      ['Day 7', 'Departure from Sopore', 'Enjoy lakeside breakfast, checkout, and transfer to Sopore Airport for your onward journey.']
    ]
  },
  {
    id: 'grand-kashmir-gurez',
    slug: 'grand-kashmir-gurez-odyssey',
    title: 'Grand Kashmir & Gurez Odyssey',
    duration: '8 Days',
    nights: '7 Nights',
    locations: ['Sopore', 'Gulmarg', 'Pahalgam', 'Sonamarg', 'Gurez Valley'],
    price: '₹26,999',
    tag: 'Flagship Journey',
    type: 'Classic tour',
    image: destinations[4].image,
    summary: 'The ultimate 8-day expedition spanning iconic alpine meadows, serene lake houseboats, and the untouched borderland tranquility of Gurez Valley.',
    highlights: ['Remote Gurez Valley & Habba Khatoon peak experience', 'Crossing scenic Razdan Pass (3,300m)', 'Classic circuit: Sopore, Gulmarg, Pahalgam & Sonamarg', 'Authentic Shin-Dard culture and organic village cuisine'],
    inclusions: sampleInclusions,
    exclusions: sampleExclusions,
    notes: 'Requires carrying government photo IDs for security checkposts en route to Gurez Valley.',
    itinerary: [
      ['Day 1', 'Arrival in Sopore', 'Airport welcome, transfer to hotel, and gentle evening Shikara ride on Dal Lake.'],
      ['Day 2', 'Sopore to Gulmarg Meadows', 'Drive to Gulmarg, Gondola cable car adventure, and evening alpine leisure.'],
      ['Day 3', 'Gulmarg to Pahalgam Valley', 'Scenic transfer south along saffron fields to the pine-scented Lidder River in Pahalgam.'],
      ['Day 4', 'Pahalgam Valley Discovery', 'Visit Betaab Valley, Aru Valley, and enjoy riverside dining before returning to Sopore.'],
      ['Day 5', 'Sopore over Razdan Pass to Gurez Valley', 'Early morning departure through Bandipora, ascending over dramatic Razdan Pass into the secluded paradise of Dawar, Gurez.'],
      ['Day 6', 'Gurez Valley & Habba Khatoon', 'Explore pristine villages along the turquoise Kishanganga River and watch the golden hour glow on Habba Khatoon peak.'],
      ['Day 7', 'Gurez to Sopore Houseboat Stay', 'Scenic drive back to Sopore. Check in to a traditional cedarwood houseboat on Dal Lake for your celebratory farewell dinner.'],
      ['Day 8', 'Kashmir Farewell & Departure', 'Relaxed breakfast on the deck, souvenir stop, and timely transfer to Sopore Airport.']
    ]
  }
];

export const services = [
  { number: '01', title: 'Tailor-made tour planning', description: 'Day-wise journeys shaped around your dates, pace, interests and budget.', icon: 'route' },
  { number: '02', title: 'Hotels & curated stays', description: 'Choose a stay style and let us help coordinate the details.', icon: 'hotel' },
  { number: '03', title: 'Houseboat experiences', description: 'Make room for a slower morning and a different view of the lake.', icon: 'waves' },
  { number: '04', title: 'Private transport', description: 'Airport transfers, local sightseeing and multi-day valley routes.', icon: 'car' },
  { number: '05', title: 'Family, couple & group tours', description: 'Thoughtful pacing and practical arrangements for every kind of traveller.', icon: 'users' },
  { number: '06', title: 'On-trip coordination', description: 'A local point of contact for the moving parts of your journey.', icon: 'headphones' }
];

export const faqs = [
  { question: 'Can I customise a tour package?', answer: 'Yes. Every sample itinerary is a starting point. Travel dates, number of guests, stay category and sightseeing preferences can be adjusted in a final proposal.' },
  { question: 'Are hotel stays and transport included?', answer: 'The exact inclusions depend on the selected package. The final written quotation lists the named stay, room category, vehicle type, meals, taxes and any optional activities.' },
  { question: 'How do I confirm a booking?', answer: 'Send an enquiry with your travel dates and group details. A booking should only be considered confirmed after availability, inclusions, payment schedule and cancellation terms are issued in writing.' },
  { question: 'Can you arrange airport pickup?', answer: 'Airport pickup can be added to any proposed itinerary. Share your arrival time and flight details so the transfer can be planned accurately.' },
  { question: 'Are the displayed prices final?', answer: 'No. All prices on this demo website are sample illustrative figures for layout and testing. Replace them with approved live rates before publishing.' }
];

export const guides = [
  {
    slug: 'getting-here-arrival-planning',
    category: '01 / GETTING HERE',
    title: 'A smoother start to your Kashmir journey',
    description: 'A practical checklist for arrival planning, airport transfers, security guidelines and settling into your first day.',
    image: destinations[0].image,
    readTime: '5 min read',
    intro: 'Arriving in Sopore is one of India’s most scenic approaches—on clear days, snow-draped Himalayan crests rise on either side of the descending aircraft. With a little prior preparation around airport protocols and transfer coordination, your first 24 hours can be completely seamless.',
    sections: [
      {
        heading: 'Sopore International Airport Essentials',
        content: 'Sheikh ul-Alam International Airport (SXR) is a high-security defense airport. Due to standard aviation regulations, security screening procedures here take slightly longer than in civilian domestic terminals. Keep government-issued photo identification and digital or printed boarding passes readily accessible.',
        points: [
          'Pre-arrange airport pickup before landing to avoid negotiating with unverified operators at arrival curbs.',
          'Postpaid mobile networks (Jio, Airtel, BSNL) work seamlessly; most prepaid SIMs from outside J&K do not operate in the valley due to telecom regulations.',
          'On your departure day, arrive at least 2.5 to 3 hours prior to your scheduled flight to clear checkpost entry and multi-tier baggage screening.'
        ]
      },
      {
        heading: 'The First Evening: Keep It Gentle',
        content: 'Whether your journey begins at a heritage houseboat on Dal Lake or a boutique hotel in Sopore, keep your first afternoon light. The altitude in Sopore is roughly 1,585 metres (5,200 ft), which is mild, but traveling and winding transfers call for relaxed pacing.',
        points: [
          'Step onto a Shikara around 5:00 PM for the golden hour over Dal or Nigeen lake.',
          'Sip warm saffron Kahwa infused with crushed almonds and cardamom to soothe travel fatigue.',
          'Plan your major mountain road trips (like Gulmarg or Sonamarg) starting from Day 2 onwards.'
        ]
      }
    ],
    practicalAdvice: [
      'Carry some cash in small denominations for local vendors, Shikara tips and tea stalls.',
      'Check in with your travel coordinator as soon as your flight lands in Sopore.'
    ],
    relatedDestinations: ['Sopore', 'gulmarg'],
    relatedPackageSlugs: ['Sopore-scenic-weekend', 'kashmir-valley-escape']
  },
  {
    slug: 'choosing-trip-length-duration',
    category: '02 / PLAN YOUR DAYS',
    title: 'How to choose the right trip length',
    description: 'Balance drive times, scenic stops and slower days when building your route across Kashmir’s valleys.',
    image: destinations[2].image,
    readTime: '6 min read',
    intro: 'Kashmir is not a destination to rush. While distances on a map may look short (Sopore to Gulmarg is just 54 km, and Pahalgam is 90 km), mountain roads, scenic viewpoints, and village crossings mean a 50 km drive often takes 2 to 2.5 hours. Choosing the right duration ensures you spend your holiday enjoying the scenery rather than watching it through a windshield.',
    sections: [
      {
        heading: '3 to 4 Days: The Focused Getaway',
        content: 'If you have a long weekend or 3 to 4 days, avoid the temptation to visit every valley. Instead, base yourself in Sopore and select one high-altitude excursion—either Gulmarg or Sonamarg.',
        points: [
          'Spend 2 nights in Sopore (including 1 night on a houseboat).',
          'Dedicate one full day to Gulmarg for alpine meadow walks and Gondola cable car views.',
          'Leave mornings free for Mughal garden strolls and authentic local Wazwan or cafe visits.'
        ]
      },
      {
        heading: '5 to 6 Days: The Classic Circuit',
        content: 'A 5 to 6-day itinerary is the golden standard for families and couples. It comfortably covers Sopore, Gulmarg, and Pahalgam without excessive daily packing and unpacking.',
        points: [
          'Stay 1 or 2 nights in Pahalgam along the Lidder River to experience true pine-scented mornings.',
          'Enjoy a full day in Gulmarg with plenty of buffer time for Gondola time-slots.',
          'End with a tranquil houseboat stay on Dal or Nigeen Lake before departing.'
        ]
      },
      {
        heading: '7 to 8 Days: The Grand Explorer & Offbeat Valleys',
        content: 'With a full week, you can add Sonamarg’s glaciers or venture into the secluded borderland wonder of Gurez Valley over Razdan Pass, discovering a quieter, raw side of Kashmir.',
        points: [
          'Explore Thajiwas Glacier and Sindh Valley.',
          'Experience traditional timber villages in Dawar and Habba Khatoon peak in Gurez.',
          'Ample time to pause for unplanned riverside picnics and village handicraft discovery.'
        ]
      }
    ],
    practicalAdvice: [
      'Never schedule a high-altitude mountain trip on your flight departure morning.',
      'Allow at least 2 consecutive nights at mountain destinations like Pahalgam for true relaxation.'
    ],
    relatedDestinations: ['Sopore', 'pahalgam', 'gulmarg', 'sonamarg'],
    relatedPackageSlugs: ['family-valley-retreat', 'romantic-kashmir-journey', 'grand-kashmir-discovery']
  },
  {
    slug: 'kashmir-travel-tips-essentials',
    category: '03 / TRAVEL WELL',
    title: 'Small details that make a better holiday',
    description: 'A few useful things to consider before you confirm a stay, pack your bags or set foot on a mountain trail.',
    image: destinations[3].image,
    readTime: '5 min read',
    intro: 'Every travel destination has its own unspoken rhythm and practical quirks. From packing the right layers for unexpected mountain breezes to understanding local taxi union guidelines, these insider tips help ensure your holiday is smooth, respectful, and memorable.',
    sections: [
      {
        heading: 'Packing for Variable Mountain Weather',
        content: 'Kashmir’s mountain weather shifts rapidly. Even in peak June or July when Sopore reaches comfortable temperatures of 28°C to 30°C, high-altitude spots like Gulmarg Phase 2 or Sonamarg glaciers can dip to 8°C with sudden chilly winds.',
        points: [
          'Pack versatile layers: breathable cottons for daytime valley sightseeing and light woollens or fleece jackets for evenings.',
          'If traveling between November and March, thermal innerwear, heavy jackets, gloves, and waterproof footwear are essential.',
          'Bring high-SPF sunscreen, sunglasses, and lip balm—high-altitude UV rays are strong even on overcast days.'
        ]
      },
      {
        heading: 'Understanding Local Transport Regulations',
        content: 'To protect local livelihoods, tourism associations in places like Pahalgam and Sonamarg operate destination-specific union taxi and pony networks.',
        points: [
          'Outside tourist taxis (including Sopore cabs) are permitted to drop guests at hotels, but designated interior sightseeing (e.g., Aru, Betaab, Chandanwari in Pahalgam, or Zero Point in Sonamarg) requires hiring locally registered union vehicles.',
          'Reputable travel planners clearly mention these local union guidelines in advance so there are no unexpected surprises on-site.',
          'Pony rates are displayed on official tourism boards at major junctions—always check the board before negotiating.'
        ]
      }
    ],
    practicalAdvice: [
      'Always carry copies of your valid government ID cards (Aadhaar, Passport, or Voter ID).',
      'Respect local cultural customs when visiting religious shrines and old heritage neighborhoods.'
    ],
    relatedDestinations: ['Sopore', 'sonamarg', 'pahalgam'],
    relatedPackageSlugs: ['alpine-adventure-trail', 'grand-kashmir-gurez']
  }
];
