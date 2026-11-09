export const brand = {
  name: 'Brand Identity',
  descriptor: 'Tour & Travel',
  phone: '+91 98765 43210',
  email: 'hello@brandidentitytravel.com',
  address: 'Main Market, Srinagar, Jammu & Kashmir 190001',
  hours: 'Monday – Saturday, 10:00 – 18:00 IST',
  whatsapp: '919876543210'
};

export const destinations = [
  {
    slug: 'srinagar', name: 'Srinagar', eyebrow: 'Lake days & garden walks',
    description: 'A graceful mix of still waters, old-world gardens, floating markets and warm Kashmiri hospitality.',
    image: 'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=1200&q=85',
    highlights: ['Dal Lake & Shikara rides', 'Mughal Gardens', 'Old City markets', 'Houseboat stays']
  },
  {
    slug: 'gulmarg', name: 'Gulmarg', eyebrow: 'A little closer to the clouds',
    description: 'Meadows, pine forests and high mountain views make Gulmarg a beautiful escape in every season.',
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=85',
    highlights: ['Gulmarg Gondola', 'Alpine meadows', 'Snow activities', 'Mountain walks']
  },
  {
    slug: 'pahalgam', name: 'Pahalgam', eyebrow: 'Slow down in the valley',
    description: 'Follow the river through pine-covered slopes, open meadows and the quieter corners of the valley.',
    image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1200&q=85',
    highlights: ['Lidder River', 'Aru Valley', 'Betaab Valley', 'Meadow walks']
  },
  {
    slug: 'sonamarg', name: 'Sonamarg', eyebrow: 'Follow the mountain roads',
    description: 'A dramatic mountain landscape of wide meadows, glacial streams and trails beneath snow-bright peaks.',
    image: 'https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&w=1200&q=85',
    highlights: ['Thajiwas Glacier', 'Sindh River', 'Alpine viewpoints', 'Scenic drives']
  },
  {
    slug: 'gurez-valley', name: 'Gurez Valley', eyebrow: 'A quieter kind of Kashmir',
    description: 'A remote-feeling mountain valley known for open landscapes, traditional villages and slow travel.',
    image: 'https://images.unsplash.com/photo-1464278533981-50106e6176b1?auto=format&fit=crop&w=1200&q=85',
    highlights: ['Habba Khatoon Peak', 'Kishanganga River', 'Dawar village', 'Mountain culture']
  },
  {
    slug: 'doodhpathri', name: 'Doodhpathri', eyebrow: 'A meadow made for wandering',
    description: 'A peaceful highland meadow with soft streams, rolling grassland and forest-framed mountain views.',
    image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1200&q=85',
    highlights: ['Wide green meadows', 'Shaliganga stream', 'Pine forest scenery', 'Picnic viewpoints']
  }
];

export const packages = [
  {
    id: 'valley-escape', slug: 'kashmir-valley-escape', title: 'Kashmir Valley Escape', duration: '4 Days', nights: '3 Nights',
    locations: ['Srinagar', 'Gulmarg'], price: '₹8,999', tag: 'Bestseller', type: 'Couples & families',
    image: destinations[0].image, summary: 'A refreshing first look at Kashmir, with lake time, garden visits and a mountain day trip.',
    highlights: ['Dal Lake experience', 'Gulmarg day excursion', 'Curated sightseeing', 'Comfortable stays'],
    itinerary: [
      ['Day 1', 'Arrive in Srinagar', 'Airport pickup, hotel check-in and an easy evening by Dal Lake.'],
      ['Day 2', 'Srinagar sights', 'Explore the Mughal Gardens, local craft lanes and the lakeside promenade.'],
      ['Day 3', 'Gulmarg excursion', 'Spend the day among open meadows and mountain views before returning to Srinagar.'],
      ['Day 4', 'Departure', 'Breakfast, checkout and transfer as per your departure schedule.']
    ]
  },
  {
    id: 'family-retreat', slug: 'family-valley-retreat', title: 'Family Valley Retreat', duration: '5 Days', nights: '4 Nights',
    locations: ['Srinagar', 'Gulmarg', 'Pahalgam'], price: '₹12,499', tag: 'Family favourite', type: 'Family',
    image: destinations[2].image, summary: 'A relaxed family route balancing scenic drives, gentle sightseeing and time together.',
    highlights: ['Family-paced itinerary', 'Pahalgam valley visit', 'Private transfers', 'Flexible sightseeing'],
    itinerary: [
      ['Day 1', 'Welcome to Srinagar', 'Meet your travel coordinator and settle into your stay.'],
      ['Day 2', 'Srinagar discovery', 'Enjoy lake views, gardens and an optional heritage walk.'],
      ['Day 3', 'Pahalgam', 'Travel through the valley and enjoy the riverside atmosphere.'],
      ['Day 4', 'Gulmarg', 'A scenic day in the meadows with optional local activities.'],
      ['Day 5', 'Return journey', 'Breakfast and departure transfer.']
    ]
  },
  {
    id: 'romantic-journey', slug: 'romantic-kashmir-journey', title: 'Romantic Kashmir Journey', duration: '6 Days', nights: '5 Nights',
    locations: ['Srinagar', 'Gulmarg', 'Pahalgam'], price: '₹17,999', tag: 'For two', type: 'Honeymoon',
    image: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=1200&q=85', summary: 'A slower escape for two, with beautiful stays, intimate experiences and unhurried valley days.',
    highlights: ['Special stay arrangements', 'Shikara experience', 'Mountain day trip', 'Flexible couple itinerary'],
    itinerary: [
      ['Day 1', 'Arrive together', 'Private pickup and a relaxed evening at your stay.'],
      ['Day 2', 'Srinagar moments', 'Explore the gardens and enjoy an optional Shikara experience.'],
      ['Day 3', 'Gulmarg retreat', 'A full day for mountain views, walks and optional activities.'],
      ['Day 4', 'Pahalgam valley', 'Drive through the countryside and settle in for a peaceful evening.'],
      ['Day 5', 'A day at your pace', 'Keep the day open for local exploration or rest.'],
      ['Day 6', 'Departure', 'Breakfast and transfer for your onward journey.']
    ]
  },
  {
    id: 'grand-discovery', slug: 'grand-kashmir-discovery', title: 'Grand Kashmir Discovery', duration: '7 Days', nights: '6 Nights',
    locations: ['Srinagar', 'Sonamarg', 'Gulmarg', 'Pahalgam'], price: '₹21,999', tag: 'Most complete', type: 'Classic tour',
    image: destinations[3].image, summary: 'A fuller journey through Kashmir’s signature landscapes, from lakeside mornings to alpine valleys.',
    highlights: ['Four iconic destinations', 'Day-wise route planning', 'Scenic transfers', 'Time for local experiences'],
    itinerary: [
      ['Day 1', 'Arrival in Srinagar', 'Pickup and check-in. Keep the first evening light.'],
      ['Day 2', 'Srinagar', 'Visit selected gardens, viewpoints and local markets.'],
      ['Day 3', 'Sonamarg', 'Explore the mountain meadow and return as per road conditions.'],
      ['Day 4', 'Gulmarg', 'Enjoy the alpine setting and optional gondola visit.'],
      ['Day 5', 'Pahalgam', 'Travel to the Lidder Valley and enjoy the riverside setting.'],
      ['Day 6', 'Valley day', 'Explore a nearby meadow or enjoy a relaxed local day.'],
      ['Day 7', 'Departure', 'Checkout and onward transfer.']
    ]
  },
  {
    id: 'alpine-adventure', slug: 'alpine-adventure-trail', title: 'Alpine Adventure Trail', duration: '6 Days', nights: '5 Nights',
    locations: ['Srinagar', 'Gulmarg', 'Sonamarg'], price: '₹19,499', tag: 'Adventure', type: 'Adventure',
    image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1200&q=85', summary: 'A mountain-forward itinerary for travellers who want fresh air, open trails and dramatic views.',
    highlights: ['Mountain viewpoints', 'Meadow walks', 'Optional snow activities', 'Scenic road journeys'],
    itinerary: [
      ['Day 1', 'Srinagar arrival', 'Arrive and prepare for the mountain route.'],
      ['Day 2', 'Srinagar to Sonamarg', 'Travel along the Sindh River corridor and explore the meadow.'],
      ['Day 3', 'Sonamarg', 'Enjoy an open day for local viewpoints and optional activities.'],
      ['Day 4', 'Gulmarg transfer', 'Continue to Gulmarg through scenic mountain roads.'],
      ['Day 5', 'Gulmarg outdoors', 'Explore the meadows and choose an optional activity.'],
      ['Day 6', 'Departure', 'Return to Srinagar for onward travel.']
    ]
  },
  {
    id: 'srinagar-weekend', slug: 'srinagar-scenic-weekend', title: 'Srinagar Scenic Weekend', duration: '3 Days', nights: '2 Nights',
    locations: ['Srinagar'], price: '₹6,499', tag: 'Short break', type: 'Short break',
    image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=85', summary: 'A compact city escape with lake views, garden time and a taste of local culture.',
    highlights: ['Dal Lake visit', 'Mughal Garden circuit', 'Local market time', 'Easy-paced plan'],
    itinerary: [
      ['Day 1', 'Arrive in Srinagar', 'Pickup, check-in and a relaxed lakeside evening.'],
      ['Day 2', 'City highlights', 'Discover gardens, viewpoints and local food streets.'],
      ['Day 3', 'Departure', 'Breakfast, checkout and transfer.']
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
  { question: 'Are hotel stays and transport included?', answer: 'The exact inclusions depend on the selected package. The final written quotation should list the named stay, room category, vehicle type, meals, taxes and any optional activities.' },
  { question: 'How do I confirm a booking?', answer: 'Send an enquiry with your travel dates and group details. A booking should only be considered confirmed after availability, inclusions, payment schedule and cancellation terms are issued in writing.' },
  { question: 'Can you arrange airport pickup?', answer: 'Airport pickup can be added to a proposed itinerary. Share your arrival time and flight details so the transfer can be planned accurately.' },
  { question: 'Are the displayed prices final?', answer: 'No. All prices on this demo website are sample figures for layout and testing. Replace them with approved live rates before publishing.' }
];

export const guides = [
  { category: '01 / GETTING HERE', title: 'A smoother start to your Kashmir journey', description: 'A practical checklist for arrival planning, transfers and your first day.', image: destinations[0].image },
  { category: '02 / PLAN YOUR DAYS', title: 'How to choose the right trip length', description: 'Balance drive times, scenic stops and slower days when building your route.', image: destinations[2].image },
  { category: '03 / TRAVEL WELL', title: 'Small details that make a better holiday', description: 'A few useful things to consider before you confirm a stay or experience.', image: destinations[3].image }
];
