import { useEffect, useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { ArrowUpRight, Search, SlidersHorizontal, X } from 'lucide-react';
import SectionTitle from '../components/SectionTitle.jsx';
import PackageCard from '../components/PackageCard.jsx';
import { packages, destinations } from '../data.js';

export default function Packages({ onEnquire }) {
  const [params, setParams] = useSearchParams();
  const [search, setSearch] = useState(params.get('q') || '');
  const [duration, setDuration] = useState(params.get('duration') || '');
  const [type, setType] = useState(params.get('type') || '');
  const [arrivalDate, setArrivalDate] = useState(params.get('date') || '');
  useEffect(() => {
    setSearch(params.get('q') || '');
    setDuration(params.get('duration') || '');
    setType(params.get('type') || '');
    setArrivalDate(params.get('date') || '');
  }, [params.toString()]);
  const filtered = useMemo(() => packages.filter(item => {
    const text = `${item.title} ${item.locations.join(' ')} ${item.type} ${item.summary}`.toLowerCase();
    return text.includes(search.toLowerCase()) && (!duration || item.duration === duration) && (!type || item.type.toLowerCase() === type.toLowerCase());
  }), [search, duration, type]);
  const syncParams = (nextSearch = search, nextDuration = duration, nextType = type) => {
    const next = new URLSearchParams();
    if (nextSearch) next.set('q', nextSearch);
    if (nextDuration) next.set('duration', nextDuration);
    if (nextType) next.set('type', nextType);
    if (arrivalDate) next.set('date', arrivalDate);
    setParams(next, { replace: true });
  };
  const reset = () => { setSearch(''); setDuration(''); setType(''); setArrivalDate(''); setParams({}, { replace: true }); };
  const activeFilters = [search && 'Search', duration && duration, type && type, arrivalDate && `Arrival ${arrivalDate}`].filter(Boolean);

  return <main className="inner-page">
    <section className="inner-hero package-hero"><div className="container inner-hero-content"><div className="breadcrumbs"><Link to="/">Home</Link><span>/</span><span>Tour packages</span></div><span className="eyebrow">A FEW GOOD WAYS TO GET AWAY</span><h1>Find your <i>next somewhere.</i></h1><p>Choose a route, find your rhythm and let the details fall into place.</p><button className="button button-light" onClick={() => onEnquire()}>Build a custom trip <ArrowUpRight size={16}/></button></div></section>
    <section className="section listing-section"><div className="container"><div className="listing-intro"><SectionTitle eyebrow="CURATED FOR YOUR KIND OF TRAVEL" title="Journeys worth looking forward to." text="Explore our sample itineraries. Every route can be tailored around your dates, group and travel style."/><div className="listing-count"><strong>{filtered.length.toString().padStart(2, '0')}</strong><span>sample itineraries</span></div></div>
      <div className="filter-bar"><label className="filter-search"><Search size={18}/><input value={search} onChange={e => { setSearch(e.target.value); syncParams(e.target.value); }} placeholder="Search a place, package or travel style" /></label><label className="filter-select"><SlidersHorizontal size={16}/><select value={duration} onChange={e => { setDuration(e.target.value); syncParams(search, e.target.value); }}><option value="">All trip lengths</option>{['3 Days','4 Days','5 Days','6 Days','7 Days'].map(d => <option key={d}>{d}</option>)}</select></label><label className="filter-select"><select value={type} onChange={e => { setType(e.target.value); syncParams(search, duration, e.target.value); }}><option value="">All travel styles</option>{['Family','Honeymoon','Adventure','Classic tour','Short break','Couples & families'].map(t => <option key={t}>{t}</option>)}</select></label>{activeFilters.length > 0 && <button className="reset-filters" onClick={reset}><X size={14}/> Reset</button>}</div>
      {activeFilters.length > 0 && <div className="active-filters">Showing: {activeFilters.map(filter => <span key={filter}>{filter}</span>)}</div>}
      {filtered.length ? <div className="packages-grid listing-grid">{filtered.map(item => <PackageCard key={item.id} item={item} onEnquire={onEnquire}/>)}</div> : <div className="empty-results"><span><Search size={26}/></span><h3>No trips found just yet.</h3><p>Try a different destination, duration or travel style.</p><button className="button button-dark" onClick={reset}>Clear filters</button></div>}
      <div className="custom-trip-banner"><div><span className="eyebrow">NOT QUITE WHAT YOU HAD IN MIND?</span><h3>Let's build a journey around you.</h3><p>Share your dates, interests and budget. We'll start with a blank map.</p></div><button className="button button-dark" onClick={() => onEnquire()}>Create my itinerary <ArrowUpRight size={16}/></button></div>
    </div></section>
    <section className="section destination-chips"><div className="container"><span className="eyebrow">START WITH A PLACE</span><div className="destination-chip-list">{destinations.map(d => <Link to={`/destinations/${d.slug}`} key={d.slug}>{d.name}<ArrowUpRight size={14}/></Link>)}</div></div></section>
  </main>;
}
