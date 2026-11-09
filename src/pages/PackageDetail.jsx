import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, ArrowUpRight, CalendarDays, Check, Clock3, MapPin, Users } from 'lucide-react';
import { packages } from '../data.js';

export default function PackageDetail({ onEnquire }) {
  const { slug } = useParams();
  const item = packages.find(p => p.slug === slug);
  if (!item) return <main className="not-found container"><span className="eyebrow">TRIP NOT FOUND</span><h1>This journey isn't on the map.</h1><Link className="button button-dark" to="/packages">Browse all packages <ArrowRight size={15}/></Link></main>;
  return <main className="inner-page detail-page">
    <section className="detail-hero"><img src={item.image} alt={`${item.title} scenery`} /><div className="detail-hero-shade"/><div className="container detail-hero-content"><div className="breadcrumbs"><Link to="/">Home</Link><span>/</span><Link to="/packages">Packages</Link><span>/</span><span>{item.title}</span></div><span className="eyebrow">{item.tag} · {item.type}</span><h1>{item.title}</h1><p>{item.summary}</p><div className="detail-meta"><span><Clock3 size={15}/>{item.nights} / {item.duration}</span><span><MapPin size={15}/>{item.locations.join(' · ')}</span></div></div></section>
    <section className="section detail-content-section"><div className="container detail-layout"><div className="detail-main"><span className="eyebrow">THE JOURNEY</span><h2>A little more of <i>what's waiting.</i></h2><p className="detail-lead">A sample route designed to help you imagine the days ahead. The final plan can be adjusted to your travel dates, pace and preferences.</p>
      <div className="itinerary-list">{item.itinerary.map((day, index) => <article className="itinerary-day" key={day[0]}><div className="itinerary-day-count"><span>{String(index + 1).padStart(2, '0')}</span></div><div><small>{day[0]}</small><h3>{day[1]}</h3><p>{day[2]}</p></div></article>)}</div>
      <div className="detail-highlights"><span className="eyebrow">TRIP HIGHLIGHTS</span><div className="highlight-list">{item.highlights.map(highlight => <span key={highlight}><Check size={15}/>{highlight}</span>)}</div></div>
      <div className="detail-note"><strong>A note before you book</strong><p>All rates, itinerary details and service inclusions on this demo are illustrative. Confirm room category, vehicle type, meals, tickets, taxes, seasonal access and cancellation terms in a written quotation.</p></div>
    </div><aside className="detail-sidebar"><div className="booking-card"><span className="eyebrow">YOUR JOURNEY, YOUR WAY</span><small>Sample price from</small><strong className="booking-price">{item.price}<em> / person</em></strong><div className="booking-fact"><Clock3 size={16}/><span>{item.nights} · {item.duration}</span></div><div className="booking-fact"><Users size={16}/><span>Flexible group size</span></div><div className="booking-fact"><CalendarDays size={16}/><span>Choose your travel dates</span></div><button className="button button-dark booking-button" onClick={() => onEnquire(item.title)}>Enquire about this trip <ArrowUpRight size={16}/></button><p>Enquiry only · No booking is confirmed by submitting a form.</p></div><Link to="/packages" className="back-link"><ArrowLeft size={15}/> Back to all packages</Link></aside></div></section>
  </main>;
}
