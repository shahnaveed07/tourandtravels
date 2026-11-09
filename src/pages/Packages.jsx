import { useEffect, useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { ArrowUpRight, CalendarDays, MapPin, Search, SlidersHorizontal, X } from 'lucide-react';
import SectionTitle from '../components/SectionTitle.jsx';
import PackageCard from '../components/PackageCard.jsx';
import { packages, destinations } from '../data.js';

export default function Packages({ onEnquire }) {
  const [params, setParams] = useSearchParams();

  // Read initial filter values from URL params
  const [search, setSearch] = useState(params.get('q') || '');
  const [destination, setDestination] = useState(params.get('dest') || '');
  const [duration, setDuration] = useState(params.get('duration') || '');
  const [type, setType] = useState(params.get('type') || '');
  const [arrivalDate, setArrivalDate] = useState(params.get('date') || '');

  // Keep internal states in sync when user navigates using browser Back/Forward
  useEffect(() => {
    document.title = 'Tour Packages — Brand Identity Tour & Travel';
    setSearch(params.get('q') || '');
    setDestination(params.get('dest') || '');
    setDuration(params.get('duration') || '');
    setType(params.get('type') || '');
    setArrivalDate(params.get('date') || '');
  }, [params]);

  // Push filter state into URL parameters without stale closure issues
  const applyFilters = (updates) => {
    const nextSearch = 'q' in updates ? updates.q : search;
    const nextDest = 'dest' in updates ? updates.dest : destination;
    const nextDuration = 'duration' in updates ? updates.duration : duration;
    const nextType = 'type' in updates ? updates.type : type;
    const nextDate = 'date' in updates ? updates.date : arrivalDate;

    // Update React local state immediately
    if ('q' in updates) setSearch(nextSearch);
    if ('dest' in updates) setDestination(nextDest);
    if ('duration' in updates) setDuration(nextDuration);
    if ('type' in updates) setType(nextType);
    if ('date' in updates) setArrivalDate(nextDate);

    // Sync to URL
    const nextParams = new URLSearchParams();
    if (nextSearch.trim()) nextParams.set('q', nextSearch.trim());
    if (nextDest) nextParams.set('dest', nextDest);
    if (nextDuration) nextParams.set('duration', nextDuration);
    if (nextType) nextParams.set('type', nextType);
    if (nextDate) nextParams.set('date', nextDate);

    setParams(nextParams, { replace: true });
  };

  const resetAll = () => {
    setSearch('');
    setDestination('');
    setDuration('');
    setType('');
    setArrivalDate('');
    setParams(new URLSearchParams(), { replace: true });
  };

  // Filter package data accurately
  const filtered = useMemo(() => {
    return packages.filter(item => {
      // 1. Keyword search (matches title, location, type, summary, and highlights)
      if (search.trim()) {
        const query = search.toLowerCase().trim();
        const fullContent = `${item.title} ${item.locations.join(' ')} ${item.type} ${item.summary} ${(item.highlights || []).join(' ')}`.toLowerCase();
        if (!fullContent.includes(query)) return false;
      }

      // 2. Destination filter
      if (destination) {
        const match = item.locations.some(loc => loc.toLowerCase() === destination.toLowerCase());
        if (!match) return false;
      }

      // 3. Duration filter
      if (duration && item.duration !== duration) {
        return false;
      }

      // 4. Travel style filter
      if (type && item.type.toLowerCase() !== type.toLowerCase()) {
        return false;
      }

      return true;
    });
  }, [search, destination, duration, type]);

  // Extract unique styles and durations from package list
  const availableDurations = useMemo(() => {
    const set = new Set(packages.map(p => p.duration));
    return ['2 Days', '3 Days', '4 Days', '5 Days', '6 Days', '7 Days', '8 Days'].filter(d => set.has(d));
  }, []);

  const availableTypes = useMemo(() => {
    return Array.from(new Set(packages.map(p => p.type)));
  }, []);

  const activeFilters = [
    search && { key: 'q', label: `Search: "${search}"` },
    destination && { key: 'dest', label: `Destination: ${destination}` },
    duration && { key: 'duration', label: `Length: ${duration}` },
    type && { key: 'type', label: `Style: ${type}` },
    arrivalDate && { key: 'date', label: `Arrival: ${arrivalDate}` }
  ].filter(Boolean);

  const removeSingleFilter = (key) => {
    applyFilters({ [key]: '' });
  };

  return (
    <main className="inner-page">
      <section className="inner-hero package-hero">
        <div className="container inner-hero-content">
          <div className="breadcrumbs">
            <Link to="/">Home</Link>
            <span>/</span>
            <span>Tour packages</span>
          </div>
          <span className="eyebrow">CURATED KASHMIR JOURNEYS</span>
          <h1>Find your <i>next somewhere.</i></h1>
          <p>Choose a route, find your rhythm and let the details fall into place.</p>
          <button className="button button-light" onClick={() => onEnquire('', arrivalDate)}>
            Build a custom trip <ArrowUpRight size={16} />
          </button>
        </div>
      </section>

      <section className="section listing-section">
        <div className="container">
          <div className="listing-intro">
            <SectionTitle
              eyebrow="CURATED FOR YOUR KIND OF TRAVEL"
              title="Journeys worth looking forward to."
              text="Explore our curated itineraries. Every route can be tailored around your travel dates, group size, and preferred pace."
            />
            <div className="listing-count">
              <strong>{filtered.length.toString().padStart(2, '0')}</strong>
              <span>available {filtered.length === 1 ? 'itinerary' : 'itineraries'}</span>
            </div>
          </div>

          {/* Comprehensive 5-part Filter Controls */}
          <div className="filter-bar" role="search" aria-label="Tour package filters">
            {/* 1. Keyword search */}
            <label className="filter-search" aria-label="Search keywords">
              <Search size={18} />
              <input
                value={search}
                onChange={e => applyFilters({ q: e.target.value })}
                placeholder="Search destination, style or title…"
              />
              {search && (
                <button
                  type="button"
                  className="filter-clear-btn"
                  onClick={() => applyFilters({ q: '' })}
                  aria-label="Clear keyword search"
                >
                  <X size={14} />
                </button>
              )}
            </label>

            {/* 2. Destination filter */}
            <label className="filter-select" aria-label="Filter by destination">
              <MapPin size={16} />
              <select
                value={destination}
                onChange={e => applyFilters({ dest: e.target.value })}
              >
                <option value="">All destinations</option>
                {destinations.map(d => (
                  <option key={d.slug} value={d.name}>{d.name}</option>
                ))}
              </select>
            </label>

            {/* 3. Duration filter */}
            <label className="filter-select" aria-label="Filter by duration">
              <SlidersHorizontal size={16} />
              <select
                value={duration}
                onChange={e => applyFilters({ duration: e.target.value })}
              >
                <option value="">All durations</option>
                {availableDurations.map(d => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </label>

            {/* 4. Travel style filter */}
            <label className="filter-select" aria-label="Filter by travel style">
              <select
                value={type}
                onChange={e => applyFilters({ type: e.target.value })}
              >
                <option value="">All travel styles</option>
                {availableTypes.map(t => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </label>

            {/* 5. Arrival Date Handling */}
            <label className="filter-date" aria-label="Filter by arrival date">
              <CalendarDays size={16} />
              <input
                type="date"
                value={arrivalDate}
                min={new Date().toISOString().split('T')[0]}
                onChange={e => applyFilters({ date: e.target.value })}
                title="Planned Arrival Date"
              />
            </label>

            {activeFilters.length > 0 && (
              <button className="reset-filters" onClick={resetAll} aria-label="Reset all filters">
                <X size={14} /> Reset
              </button>
            )}
          </div>

          {/* Active filter pills */}
          {activeFilters.length > 0 && (
            <div className="active-filters">
              <span className="active-filter-label">Active filters:</span>
              {activeFilters.map(filter => (
                <button
                  key={filter.key}
                  className="filter-pill"
                  onClick={() => removeSingleFilter(filter.key)}
                  title={`Remove ${filter.label}`}
                >
                  {filter.label} <X size={12} />
                </button>
              ))}
              <button className="clear-all-inline" onClick={resetAll}>
                Clear all
              </button>
            </div>
          )}

          {/* Results grid or Empty State */}
          {filtered.length > 0 ? (
            <div className="packages-grid listing-grid">
              {filtered.map(item => (
                <PackageCard
                  key={item.id}
                  item={item}
                  onEnquire={(pkgTitle) => onEnquire(pkgTitle, arrivalDate)}
                />
              ))}
            </div>
          ) : (
            <div className="empty-results">
              <span className="empty-icon"><Search size={28} /></span>
              <h3>No itineraries match your criteria</h3>
              <p>
                We couldn't find any packages matching your active filters. Try adjusting your duration or destination criteria, or let us create a custom trip.
              </p>
              <div className="empty-actions">
                <button className="button button-dark" onClick={resetAll}>
                  Reset all filters
                </button>
                <button
                  className="button button-outline"
                  onClick={() => onEnquire('Custom Kashmir Itinerary', arrivalDate)}
                >
                  Request a custom itinerary
                </button>
              </div>
            </div>
          )}

          {/* Custom Trip Banner */}
          <div className="custom-trip-banner">
            <div>
              <span className="eyebrow">NOT QUITE WHAT YOU HAD IN MIND?</span>
              <h3>Let's build a journey around you.</h3>
              <p>Share your tentative dates, group size and budget. We will start with a blank map.</p>
            </div>
            <button className="button button-dark" onClick={() => onEnquire('Custom Trip Planning', arrivalDate)}>
              Create my itinerary <ArrowUpRight size={16} />
            </button>
          </div>
        </div>
      </section>

      {/* Destination Quick Chips */}
      <section className="section destination-chips">
        <div className="container">
          <span className="eyebrow">START WITH A PLACE</span>
          <div className="destination-chip-list">
            {destinations.map(d => (
              <Link to={`/destinations/${d.slug}`} key={d.slug}>
                {d.name} <ArrowUpRight size={14} />
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
