import { Link, useParams } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, Check, Compass, MapPin } from 'lucide-react';
import { destinations, packages } from '../data.js';
import PackageCard from '../components/PackageCard.jsx';

export default function Destination({ onEnquire }) {
  const { slug } = useParams();
  const place = destinations.find(d => d.slug === slug);
  if (!place) return <main className="not-found container"><span className="eyebrow">PLACE NOT FOUND</span><h1>Let's find another view.</h1><Link className="button button-dark" to="/">Return home <ArrowRight size={15}/></Link></main>;
  const related = packages.filter(p => p.locations.some(loc => loc.toLowerCase() === place.name.toLowerCase())).slice(0, 3);
  return <main className="inner-page">
    <section className="destination-detail-hero"><img src={place.image} alt={`${place.name} destination`} /><div className="detail-hero-shade"/><div className="container destination-detail-copy"><div className="breadcrumbs"><Link to="/">Home</Link><span>/</span><span>Destinations</span><span>/</span><span>{place.name}</span></div><span className="eyebrow">{place.eyebrow}</span><h1>{place.name}.</h1><p>{place.description}</p><button className="button button-light" onClick={() => onEnquire(`Trip to ${place.name}`)}>Plan a visit <ArrowUpRight size={16}/></button></div></section>
    <section className="section destination-detail-content"><div className="container destination-detail-grid"><div><span className="eyebrow">A PLACE TO TAKE YOUR TIME</span><h2>Make room for<br/><i>{place.name}.</i></h2><p>{place.description} Let your itinerary leave space for the unexpected: a view worth stopping for, a slow lunch or another hour outside.</p><button className="text-link" onClick={() => onEnquire(`Trip to ${place.name}`)}>Ask about this destination <ArrowUpRight size={15}/></button></div><div className="destination-highlights"><span className="eyebrow">A FEW THINGS TO LOOK FOR</span>{place.highlights.map((highlight, i) => <div key={highlight}><span>0{i+1}</span><strong>{highlight}</strong><Check size={16}/></div>)}</div></div></section>
    <section className="section destination-related"><div className="container"><div className="section-heading"><div><span className="eyebrow">MAKE A JOURNEY OF IT</span><h2>Trips that include <i>{place.name}.</i></h2><p>These sample routes can be reshaped around your preferred dates.</p></div><Link className="text-link" to="/packages">All packages <ArrowUpRight size={15}/></Link></div><div className="packages-grid">{(related.length ? related : packages.slice(0, 3)).map(item => <PackageCard item={item} key={item.id} onEnquire={onEnquire}/>)}</div></div></section>
    <section className="destination-next container"><div><span className="eyebrow">KEEP EXPLORING</span><h3>There is more to discover.</h3></div><div>{destinations.filter(d => d.slug !== place.slug).slice(0, 3).map(d => <Link key={d.slug} to={`/destinations/${d.slug}`}>{d.name}<ArrowUpRight size={14}/></Link>)}</div></section>
  </main>;
}
