import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, CalendarDays, CarFront, ChevronDown, Compass, Headphones, Hotel, MapPin, MoveRight, Sparkles, Waves, Users, Check } from 'lucide-react';
import SectionTitle from '../components/SectionTitle.jsx';
import PackageCard from '../components/PackageCard.jsx';
import { brand, destinations, packages, services, guides, faqs } from '../data.js';
import { siteImages } from '../imageCatalog.js';
import usePageSEO from '../hooks/usePageSEO.js';

const serviceIcons = { route: Compass, hotel: Hotel, waves: Waves, car: CarFront, users: Users, headphones: Headphones };

export default function Home({ onEnquire }) {
  usePageSEO('/');
  const navigate = useNavigate();
  const [place, setPlace] = useState('');
  const [duration, setDuration] = useState('');
  const [date, setDate] = useState('');
  const [activeFaq, setActiveFaq] = useState(0);
  const findTrip = (event) => {
    event.preventDefault();
    const params = new URLSearchParams();
    if (place) params.set('dest', place);
    if (duration) params.set('duration', duration);
    if (date) params.set('date', date);
    navigate(`/packages?${params.toString()}`);
  };

  return (
    <main>
      <section className="hero-section">
        <img
          className="hero-image"
          src={siteImages.hero}
          alt="Panoramic Kashmir mountain valley landscape curated by Brand Identity Tour & Travel"
          width={1024}
          height={765}
          fetchPriority="high"
          decoding="eager"
        />
        <div className="hero-shade" />
        <div className="container hero-content">
          <div className="hero-copy"><span className="hero-kicker"><span /> BRAND IDENTITY TOUR &amp; TRAVEL · SOPORE, KASHMIR</span><h1>Kashmir Tour<br/><i>Packages.</i></h1><p>Tailored Srinagar houseboats, Gulmarg, Pahalgam, Sonamarg, Gurez Valley &amp; private cabs—planned locally from Sopore, Jammu &amp; Kashmir.</p><div className="hero-buttons"><Link to="/packages" className="button button-light">Explore Kashmir packages <ArrowUpRight size={16}/></Link><button className="hero-text-link" onClick={() => onEnquire('Custom Kashmir Journey')}>Plan with a local <MoveRight size={17}/></button></div></div>
          <div className="hero-caption"><span className="caption-line"/><span>THE KASHMIR VALLEY</span><span className="caption-muted">SOPORE · BARAMULLA · J&amp;K</span></div>
          <div className="hero-side-note">A JOURNEY WORTH TAKING<br/>AGAIN AND AGAIN</div>
        </div>
        <div className="hero-bottom container"><span>CURATED JOURNEYS</span><span className="hero-bottom-center">Mountains. Meadows. Memories.</span><span>01 — 08</span></div>
      </section>

      <section className="trip-finder-wrap container" aria-label="Find your trip">
        <form className="trip-finder" onSubmit={findTrip}>
          <label className="finder-field"><span className="finder-icon"><MapPin size={18}/></span><span><small>WHERE TO?</small><select value={place} onChange={e => setPlace(e.target.value)}><option value="">Choose a destination</option>{destinations.map(d => <option key={d.slug} value={d.name}>{d.name}</option>)}</select></span></label>
          <label className="finder-field"><span className="finder-icon"><CalendarDays size={18}/></span><span><small>WHEN ARE YOU GOING?</small><input type="date" value={date} min={new Date().toISOString().split('T')[0]} onChange={e => setDate(e.target.value)} /></span></label>
          <label className="finder-field"><span className="finder-icon"><Compass size={18}/></span><span><small>HOW LONG?</small><select value={duration} onChange={e => setDuration(e.target.value)}><option value="">Any duration</option>{['2 Days','3 Days','4 Days','5 Days','6 Days','7 Days','8 Days'].map(v => <option key={v}>{v}</option>)}</select></span></label>
          <button className="button button-dark finder-submit" type="submit">Find my trip <ArrowUpRight size={16}/></button>
        </form>
      </section>

      <section className="quick-services container">
        <Link to="/packages"><span className="quick-icon"><Compass/></span><span><strong>Tours</strong><small>Make it a journey</small></span><ArrowUpRight size={15}/></Link>
        <Link to="/services#stays"><span className="quick-icon"><Hotel/></span><span><strong>Hotels</strong><small>Stay your way</small></span><ArrowUpRight size={15}/></Link>
        <Link to="/services#houseboats"><span className="quick-icon"><Waves/></span><span><strong>Houseboats</strong><small>Life on the lake</small></span><ArrowUpRight size={15}/></Link>
        <Link to="/services#transport"><span className="quick-icon"><CarFront/></span><span><strong>Private cabs</strong><small>Take the scenic route</small></span><ArrowUpRight size={15}/></Link>
        <Link to="/destinations/srinagar"><span className="quick-icon"><MapPin/></span><span><strong>Destinations</strong><small>Find your favourite</small></span><ArrowUpRight size={15}/></Link>
        <Link to="/bookings"><span className="quick-icon"><Sparkles/></span><span><strong>Bookings</strong><small>Train, Gondola &amp; Heli</small></span><ArrowUpRight size={15}/></Link>
      </section>

      <section className="section section-services">
        <div className="container"><SectionTitle eyebrow="KASHMIR TOURS, STAYS, CAB TRANSFERS & SUPPORT" title={<>Personalised Kashmir<br/><i>Travel Services.</i></>} text="Thoughtful local coordination for hotels, houseboats, private cabs, and custom routes across Jammu & Kashmir." action={<Link to="/services" className="text-link">Discover our services <ArrowUpRight size={15}/></Link>} />
          <div className="services-grid">{services.map(service => { const Icon = serviceIcons[service.icon]; return <Link to="/services" className="service-item" key={service.number}><div className="service-item-top"><span>{service.number}</span><Icon size={21}/></div><h3>{service.title}</h3><p>{service.description}</p><span className="service-arrow"><ArrowUpRight size={16}/></span></Link>; })}</div>
        </div>
      </section>

      <section className="section section-destinations">
        <div className="container"><SectionTitle eyebrow="SIGHTSEEING & VALLEYS ACROSS KASHMIR" title={<>Kashmir Destinations<br/><i>Worth Exploring.</i></>} text="Every valley has its own rhythm—compare Srinagar, Gulmarg, Pahalgam, Sonamarg, Gurez Valley, and Doodhpathri." action={<Link to="/destinations/srinagar" className="text-link">Explore Srinagar &amp; valleys <ArrowUpRight size={15}/></Link>} />
          <div className="destinations-grid">{destinations.slice(0, 4).map((place, index) => <Link to={`/destinations/${place.slug}`} className={`destination-card destination-card-${index + 1}`} key={place.slug}><img src={place.image} alt={`${place.name} Kashmir landscape`} width={place.imageWidth || 1024} height={place.imageHeight || 572} loading="lazy" decoding="async" onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = siteImages.hero; }}/><span className="destination-overlay"/><span className="destination-number">0{index + 1}</span><span className="destination-copy"><small>{place.eyebrow}</small><strong>{place.name}</strong><em>Explore destination <ArrowUpRight size={15}/></em></span></Link>)}</div>
        </div>
      </section>

      <section className="section section-packages" id="packages">
        <div className="container"><SectionTitle eyebrow="2 TO 8 DAYS · CUSTOMISABLE ROUTES" title={<>Curated Kashmir<br/><i>Tour Packages.</i></>} text="Compare routes for families, couples, and offbeat travellers. Indicative estimates are finalised by written quotation." action={<Link to="/packages" className="text-link">All tour packages <ArrowUpRight size={15}/></Link>} />
          <div className="packages-grid">{packages.map(item => <PackageCard key={item.id} item={item} onEnquire={onEnquire}/>)}</div>
          <div className="packages-bottom"><span>Handpicked routes · Flexible dates · Personalised details</span><Link to="/packages" className="button button-outline">See all journeys <ArrowRight size={16}/></Link></div>
        </div>
      </section>

      <section className="section section-duration">
        <div className="container duration-layout"><div><span className="eyebrow">A QUICK ESCAPE OR A LITTLE LONGER?</span><h2>Make time<br/><i>for yourself.</i></h2><p>Find a journey for the days you have and the people you're bringing.</p></div><div className="duration-links">{['2 Days','3 Days','4 Days','5 Days','6 Days','7 Days','8 Days'].map((day, index) => <Link to={`/packages?duration=${encodeURIComponent(day)}`} key={day}><span>0{index + 1}</span><strong>{day}</strong><ArrowUpRight size={17}/></Link>)}</div></div>
        <div className="container trip-types"><span>TRAVEL YOUR WAY</span><Link to="/packages?type=Family">Family time</Link><Link to="/packages?type=Honeymoon">Just the two of you</Link><Link to="/packages?type=Adventure">Find your adventure</Link><Link to="/packages?type=Classic%20tour">Classic escapes</Link></div>
      </section>

      <section className="section section-moments">
        <div className="container"><SectionTitle eyebrow="COME FOR THE VIEW. STAY FOR THE MOMENTS." title={<>A different kind of <i>everyday.</i></>} text="The best parts of travel are often the moments between the destinations." />
          <div className="moments-grid"><div className="moment-large"><img src={siteImages.homeMoments[2].src} alt={siteImages.homeMoments[2].alt} width={1024} height={572} loading="lazy" decoding="async"/><div><small>01 / FIND YOUR STILLNESS</small><h3>Take the<br/><i>slow way.</i></h3><Link to="/destinations/srinagar">Discover lake life <ArrowUpRight size={15}/></Link></div></div><div className="moment-tall"><img src={siteImages.homeMoments[3].src} alt={siteImages.homeMoments[3].alt} width={1024} height={765} loading="lazy" decoding="async"/><div><small>02 / ABOVE THE TREES</small><h3>A new<br/>perspective.</h3><Link to="/destinations/gulmarg">Explore the heights <ArrowUpRight size={15}/></Link></div></div><div className="moment-note"><span className="eyebrow">TRAVEL IS PERSONAL</span><p>Some come for the mountains. Some for the quiet. The best journey makes room for both.</p><span className="note-mark">BITT</span></div></div>
          <div className="moments-subgrid">
            {[siteImages.homeMoments[0], siteImages.homeMoments[1], siteImages.homeMoments[4]].map((moment) => (
              <figure className="moment-thumb" key={moment.src}>
                <img src={moment.src} alt={moment.alt} width={1024} height={765} loading="lazy" decoding="async" />
                <figcaption>{moment.alt}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-about-band"><div className="container about-band-grid"><div className="about-band-image"><img src={siteImages.company.office} alt="Brand Identity Tour & Travel office interior at Bismillah Market, Sopore" width={1024} height={765} loading="lazy" decoding="async"/><span>SOPORE, BARAMULLA</span></div><div className="about-band-copy"><span className="eyebrow">BASED IN SOPORE, KASHMIR · HERE FOR YOUR JOURNEY</span><h2>Local Sopore Planning.<br/><i>Across All Kashmir.</i></h2><p>Brand Identity Tour &amp; Travel (also searched locally as Brand Identity Tour and Travels) operates from Bismillah Market, Sopore, Baramulla (193201), built around personal trip planning and attentive coordination.</p><p>From Srinagar airport pickup to Dal Lake houseboats, valley transfers, and the final drop, every plan is confirmed clearly in writing.</p><div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', alignItems: 'center' }}><Link to="/about" className="text-link">A little about us <ArrowUpRight size={15}/></Link><a href={brand.mapUrl} target="_blank" rel="noopener noreferrer" className="text-link">View Brand Identity Tour &amp; Travel on Google Maps <ArrowUpRight size={15}/></a><a href={brand.mapUrl} target="_blank" rel="noopener noreferrer" className="text-link">Get Directions <ArrowUpRight size={15}/></a></div></div></div></section>

      <section className="section section-guides"><div className="container"><SectionTitle eyebrow="KASHMIR TRAVEL PLANNING GUIDES" title={<>Know before <i>you go.</i></>} text="Practical seasonal, airport, train, and valley advice for a smoother Kashmir journey." /><div className="guides-grid">{guides.map((guide) => <article className="guide-card" key={guide.slug}><Link className="guide-image" to={`/travel-guides/${guide.slug}`} aria-label={`Read travel guide: ${guide.title}`}><img src={guide.image} alt={guide.title} width={1024} height={572} loading="lazy" decoding="async" onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = siteImages.hero; }}/><span><ArrowUpRight size={17}/></span></Link><small>{guide.category}</small><h3><Link to={`/travel-guides/${guide.slug}`}>{guide.title}</Link></h3><p>{guide.description}</p></article>)}</div></div></section>

      <section className="section section-why"><div className="container why-layout"><div><span className="eyebrow">WHY CHOOSE BRAND IDENTITY TOUR &amp; TRAVEL</span><h2>Local clarity<br/>at every <i>mile.</i></h2><p>Good travel is not just about where you go. It&apos;s about how every part of the journey comes together cleanly.</p><button onClick={() => onEnquire()} className="button button-light">Let&apos;s talk about your trip <ArrowUpRight size={16}/></button></div><div className="why-points">{[['01','A local point of view','Practical destination knowledge and thoughtful route planning from Sopore.'],['02','One connected plan','Stay, transport and experiences considered together.'],['03','Space to make it yours','Flexible ideas shaped around your pace and preferences.'],['04','Clear conversations','Written details and transparent expectations before booking.']].map(row => <div className="why-point" key={row[0]}><span>{row[0]}</span><div><h3>{row[1]}</h3><p>{row[2]}</p></div><Check size={17}/></div>)}</div></div></section>

      <section className="section section-faq"><div className="container faq-layout"><div><span className="eyebrow">LET'S MAKE IT EASY</span><h2>A few things<br/><i>you might ask.</i></h2><p>Still curious? Send us a note and we'll help you think it through.</p><button className="text-link" onClick={() => onEnquire()}>Ask our team <ArrowUpRight size={15}/></button></div><div className="faq-list">{faqs.map((faq, index) => <div className={`faq-item${activeFaq === index ? ' is-open' : ''}`} key={faq.question}><button onClick={() => setActiveFaq(activeFaq === index ? -1 : index)} aria-expanded={activeFaq === index}><span>{faq.question}</span><ChevronDown size={18}/></button>{activeFaq === index && <p>{faq.answer}</p>}</div>)}</div></div></section>

      <section className="final-cta"><div className="container final-cta-inner"><div><span className="eyebrow">YOUR DATES. YOUR PEOPLE. YOUR KIND OF TRIP.</span><h2>Let's make it <i>memorable.</i></h2><p>Tell us what you're dreaming of. We'll help shape the journey.</p></div><button onClick={() => onEnquire()} className="button button-light">Plan my trip <ArrowUpRight size={16}/></button></div></section>
    </main>
  );
}
