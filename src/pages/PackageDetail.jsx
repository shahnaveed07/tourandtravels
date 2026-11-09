import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, ArrowUpRight, CalendarDays, Check, Clock3, Info, MapPin, Users, X } from 'lucide-react';
import { packages, destinations } from '../data.js';
import PackageCard from '../components/PackageCard.jsx';

export default function PackageDetail({ onEnquire }) {
  const { slug } = useParams();
  const item = packages.find(p => p.slug === slug);

  useEffect(() => {
    if (item) {
      document.title = `${item.title} (${item.duration}) — Brand Identity Tour & Travel`;
    }
  }, [item]);

  if (!item) {
    return (
      <main className="not-found container">
        <span className="eyebrow">TRIP NOT FOUND</span>
        <h1>This journey isn't on the map.</h1>
        <p>Explore our other curated Kashmir itineraries or let us build one around your dates.</p>
        <Link className="button button-dark" to="/packages">
          Browse all packages <ArrowRight size={15} />
        </Link>
      </main>
    );
  }

  // Related packages: other packages sharing at least one location or similar type
  const related = packages
    .filter(p => p.id !== item.id && (
      p.locations.some(loc => item.locations.includes(loc)) ||
      p.type === item.type
    ))
    .slice(0, 3);

  return (
    <main className="inner-page detail-page">
      <section className="detail-hero">
        <img
          src={item.image}
          alt={`${item.title} scenery`}
          onError={(e) => {
            e.currentTarget.src = 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=85';
          }}
        />
        <div className="detail-hero-shade" />
        <div className="container detail-hero-content">
          <div className="breadcrumbs">
            <Link to="/">Home</Link>
            <span>/</span>
            <Link to="/packages">Packages</Link>
            <span>/</span>
            <span>{item.title}</span>
          </div>
          <span className="eyebrow">{item.tag} · {item.type}</span>
          <h1>{item.title}</h1>
          <p>{item.summary}</p>
          <div className="detail-meta">
            <span><Clock3 size={15} />{item.nights} / {item.duration}</span>
            <span><MapPin size={15} />{item.locations.join(' · ')}</span>
          </div>
        </div>
      </section>

      <section className="section detail-content-section">
        <div className="container detail-layout">
          <div className="detail-main">
            <span className="eyebrow">THE JOURNEY</span>
            <h2>A little more of <i>what's waiting.</i></h2>
            <p className="detail-lead">
              A carefully designed route created to help you imagine the days ahead. The final plan can be personalized to your travel dates, group size, and specific preferences.
            </p>

            {/* Day-wise Itinerary */}
            <div className="itinerary-list">
              {item.itinerary.map((day, index) => (
                <article className="itinerary-day" key={day[0]}>
                  <div className="itinerary-day-count">
                    <span>{String(index + 1).padStart(2, '0')}</span>
                  </div>
                  <div>
                    <small>{day[0]}</small>
                    <h3>{day[1]}</h3>
                    <p>{day[2]}</p>
                  </div>
                </article>
              ))}
            </div>

            {/* Trip Highlights */}
            <div className="detail-highlights">
              <span className="eyebrow">TRIP HIGHLIGHTS</span>
              <div className="highlight-list">
                {item.highlights.map(highlight => (
                  <span key={highlight}>
                    <Check size={15} />{highlight}
                  </span>
                ))}
              </div>
            </div>

            {/* Inclusions & Exclusions */}
            <div className="inclusions-exclusions-grid">
              <div className="inclusions-block">
                <div className="inc-header">
                  <Check size={18} className="text-forest" />
                  <h4>What's Included</h4>
                </div>
                <ul>
                  {(item.inclusions || []).map((inc, i) => (
                    <li key={i}>
                      <Check size={14} />
                      <span>{inc}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="exclusions-block">
                <div className="inc-header">
                  <X size={18} className="text-muted" />
                  <h4>What's Excluded</h4>
                </div>
                <ul>
                  {(item.exclusions || []).map((exc, i) => (
                    <li key={i}>
                      <X size={14} />
                      <span>{exc}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Important Travel Notes */}
            <div className="detail-note">
              <div className="note-title">
                <Info size={17} />
                <strong>Important Travel & Booking Information</strong>
              </div>
              <p>
                {item.notes || 'A written itinerary quotation with verified supplier availability, specific hotel names, vehicle type, seasonal permit guidelines, and cancellation terms will be provided upon enquiry.'}
              </p>
            </div>
          </div>

          <aside className="detail-sidebar">
            <div className="booking-card">
              <span className="eyebrow">YOUR JOURNEY, YOUR WAY</span>
              <small>Starting price from</small>
              <strong className="booking-price">{item.price}<em> / person</em></strong>
              <div className="booking-fact">
                <Clock3 size={16} />
                <span>{item.nights} · {item.duration}</span>
              </div>
              <div className="booking-fact">
                <Users size={16} />
                <span>Flexible group size</span>
              </div>
              <div className="booking-fact">
                <CalendarDays size={16} />
                <span>Choose your travel dates</span>
              </div>
              <button
                className="button button-dark booking-button"
                onClick={() => onEnquire(item.title)}
              >
                Enquire about this trip <ArrowUpRight size={16} />
              </button>
              <p>Enquiry only · No booking is confirmed by submitting a form.</p>
            </div>

            <Link to="/packages" className="back-link">
              <ArrowLeft size={15} /> Back to all packages
            </Link>
          </aside>
        </div>
      </section>

      {/* Related Packages */}
      {related.length > 0 && (
        <section className="section related-packages-section">
          <div className="container">
            <div className="section-heading">
              <div>
                <span className="eyebrow">SIMILAR EXPERIENCES</span>
                <h2>You might also <i>enjoy.</i></h2>
                <p>Other carefully curated Kashmir routes sharing similar valleys and paces.</p>
              </div>
              <Link to="/packages" className="text-link">
                All packages <ArrowUpRight size={15} />
              </Link>
            </div>
            <div className="packages-grid">
              {related.map(p => (
                <PackageCard key={p.id} item={p} onEnquire={onEnquire} />
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
