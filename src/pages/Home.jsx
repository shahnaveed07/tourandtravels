import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, CalendarDays, CarFront, ChevronDown, Compass, Headphones, Hotel, MapPin, MoveRight, Sparkles, Waves, Users, Check } from 'lucide-react';
import SectionTitle from '../components/SectionTitle.jsx';
import PackageCard from '../components/PackageCard.jsx';
import { destinations, packages, services, guides, faqs } from '../data.js';

const serviceIcons = { route: Compass, hotel: Hotel, waves: Waves, car: CarFront, users: Users, headphones: Headphones };

export default function Home({ onEnquire }) {
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
        <img className="hero-image" src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=2400&q=90" alt="A wide mountain landscape at golden hour" />
        <div className="hero-shade" />
        <div className="container hero-content">
          <div className="hero-copy"><span className="hero-kicker"><span /> TRAVEL, WITH A SENSE OF WONDER</span><h1>More than a place.<br/><i>A feeling.</i></h1><p>Some journeys stay with you long after the road ends. Find yours in the mountains, meadows and still waters of Kashmir.</p><div className="hero-buttons"><Link to="/packages" className="button button-light">Explore our trips <ArrowUpRight size={16}/></Link><button className="hero-text-link" onClick={() => onEnquire('Custom Kashmir Journey')}>Plan with a local <MoveRight size={17}/></button></div></div>
          <div className="hero-caption"><span className="caption-line"/><span>THE KASHMIR VALLEY</span><span className="caption-muted">34°05' N · 74°50' E</span></div>
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
        <Link to="/services#experiences"><span className="quick-icon"><Sparkles/></span><span><strong>Experiences</strong><small>Go beyond the view</small></span><ArrowUpRight size={15}/></Link>
      </section>

      <section className="section section-services">
        <div className="container"><SectionTitle eyebrow="TOURS, STAYS, TRANSPORT & SUPPORT" title={<>A little less planning.<br/><i>A lot more living.</i></>} text="A thoughtful travel partner for the details that make a journey feel effortless." action={<Link to="/services" className="text-link">Discover our services <ArrowUpRight size={15}/></Link>} />
          <div className="services-grid">{services.map(service => { const Icon = serviceIcons[service.icon]; return <Link to="/services" className="service-item" key={service.number}><div className="service-item-top"><span>{service.number}</span><Icon size={21}/></div><h3>{service.title}</h3><p>{service.description}</p><span className="service-arrow"><ArrowUpRight size={16}/></span></Link>; })}</div>
        </div>
      </section>

      <section className="section section-destinations">
        <div className="container"><SectionTitle eyebrow="BEAUTIFUL PLACES. DIFFERENT MOODS." title={<>Where will Kashmir<br/><i>take you?</i></>} text="Every valley has its own rhythm. Find the landscape that feels like yours." action={<Link to="/destinations/srinagar" className="text-link">Explore the valley <ArrowUpRight size={15}/></Link>} />
          <div className="destinations-grid">{destinations.slice(0, 4).map((place, index) => <Link to={`/destinations/${place.slug}`} className={`destination-card destination-card-${index + 1}`} key={place.slug}><img src={place.image} alt={`${place.name} landscape`} loading="lazy"/><span className="destination-overlay"/><span className="destination-number">0{index + 1}</span><span className="destination-copy"><small>{place.eyebrow}</small><strong>{place.name}</strong><em>Explore destination <ArrowUpRight size={15}/></em></span></Link>)}</div>
        </div>
      </section>

      <section className="section section-packages" id="packages">
        <div className="container"><SectionTitle eyebrow="A FEW GOOD WAYS TO GET AWAY" title={<>Find your <i>Kashmir.</i></>} text="Compare the route, choose your pace. We'll help with the details." action={<Link to="/packages" className="text-link">All tour packages <ArrowUpRight size={15}/></Link>} />
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
          <div className="moments-grid"><div className="moment-large"><img src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1400&q=85" alt="Sunlit mountain valley" loading="lazy"/><div><small>01 / FIND YOUR STILLNESS</small><h3>Take the<br/><i>slow way.</i></h3><Link to="/destinations/srinagar">Discover lake life <ArrowUpRight size={15}/></Link></div></div><div className="moment-tall"><img src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1000&q=85" alt="High mountain peaks" loading="lazy"/><div><small>02 / ABOVE THE TREES</small><h3>A new<br/>perspective.</h3><Link to="/destinations/gulmarg">Explore the heights <ArrowUpRight size={15}/></Link></div></div><div className="moment-note"><span className="eyebrow">TRAVEL IS PERSONAL</span><p>Some come for the mountains. Some for the quiet. The best journey makes room for both.</p><span className="note-mark">BI.</span></div></div>
        </div>
      </section>

      <section className="section section-about-band"><div className="container about-band-grid"><div className="about-band-image"><img src="https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=1200&q=85" alt="Quiet waters at dusk" loading="lazy"/><span>ROOTED IN PLACE</span></div><div className="about-band-copy"><span className="eyebrow">BASED IN KASHMIR. HERE FOR YOUR JOURNEY.</span><h2>You bring the plans.<br/><i>We bring the local.</i></h2><p>Brand Identity Tour & Travel is built around personal planning, thoughtful coordination and the belief that the journey should feel as good as the destination.</p><p>From the first idea to the final transfer, we make space for the details that matter to you.</p><Link to="/about" className="text-link">A little about us <ArrowUpRight size={15}/></Link></div></div></section>

      <section className="section section-guides"><div className="container"><SectionTitle eyebrow="A LITTLE PLANNING GOES A LONG WAY" title={<>Know before <i>you go.</i></>} text="Useful practical ideas for a more relaxed, better-prepared Kashmir journey." /><div className="guides-grid">{guides.map((guide) => <article className="guide-card" key={guide.slug}><Link className="guide-image" to={`/travel-guides/${guide.slug}`}><img src={guide.image} alt={guide.title} loading="lazy"/><span><ArrowUpRight size={17}/></span></Link><small>{guide.category}</small><h3><Link to={`/travel-guides/${guide.slug}`}>{guide.title}</Link></h3><p>{guide.description}</p></article>)}</div></div></section>

      <section className="section section-why"><div className="container why-layout"><div><span className="eyebrow">WHY TRAVEL WITH US</span><h2>The little details<br/>make the <i>difference.</i></h2><p>Good travel is not just about where you go. It's about how every part of the journey comes together.</p><button onClick={() => onEnquire()} className="button button-light">Let's talk about your trip <ArrowUpRight size={16}/></button></div><div className="why-points">{[['01','A local point of view','Practical destination knowledge and thoughtful route planning.'],['02','One connected plan','Stay, transport and experiences considered together.'],['03','Space to make it yours','Flexible ideas shaped around your pace and preferences.'],['04','Clear conversations','Written details and transparent expectations before booking.']].map(row => <div className="why-point" key={row[0]}><span>{row[0]}</span><div><h3>{row[1]}</h3><p>{row[2]}</p></div><Check size={17}/></div>)}</div></div></section>

      <section className="section section-faq"><div className="container faq-layout"><div><span className="eyebrow">LET'S MAKE IT EASY</span><h2>A few things<br/><i>you might ask.</i></h2><p>Still curious? Send us a note and we'll help you think it through.</p><button className="text-link" onClick={() => onEnquire()}>Ask our team <ArrowUpRight size={15}/></button></div><div className="faq-list">{faqs.map((faq, index) => <div className={`faq-item${activeFaq === index ? ' is-open' : ''}`} key={faq.question}><button onClick={() => setActiveFaq(activeFaq === index ? -1 : index)} aria-expanded={activeFaq === index}><span>{faq.question}</span><ChevronDown size={18}/></button>{activeFaq === index && <p>{faq.answer}</p>}</div>)}</div></div></section>

      <section className="final-cta"><div className="container final-cta-inner"><div><span className="eyebrow">YOUR DATES. YOUR PEOPLE. YOUR KIND OF TRIP.</span><h2>Let's make it <i>memorable.</i></h2><p>Tell us what you're dreaming of. We'll help shape the journey.</p></div><button onClick={() => onEnquire()} className="button button-light">Plan my trip <ArrowUpRight size={16}/></button></div></section>
    </main>
  );
}
