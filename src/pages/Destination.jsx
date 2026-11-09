import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, ArrowUpRight, Calendar, Check, Clock3, Compass, Info, MapPin } from 'lucide-react';
import { destinations, packages } from '../data.js';
import { siteImages } from '../imageCatalog.js';
import PackageCard from '../components/PackageCard.jsx';

export default function Destination({ onEnquire }) {
  const { slug } = useParams();
  const place = destinations.find(d => d.slug === slug);

  useEffect(() => {
    if (place) {
      document.title = `${place.name} Travel Guide & Packages — Brand Identity Tour & Travel`;
    }
  }, [place]);

  if (!place) {
    return (
      <main className="not-found container">
        <span className="eyebrow">PLACE NOT FOUND</span>
        <h1>Let's find another view.</h1>
        <p>The destination you are looking for is not in our valley catalog.</p>
        <Link className="button button-dark" to="/">
          Return home <ArrowRight size={15} />
        </Link>
      </main>
    );
  }

  // Filter ONLY packages that genuinely include this destination in their locations array
  const related = packages.filter(p =>
    p.locations.some(loc => loc.toLowerCase() === place.name.toLowerCase())
  );

  const nearbyDestinations = (place.nearbySlugs || [])
    .map(s => destinations.find(d => d.slug === s))
    .filter(Boolean);

  return (
    <main className="inner-page">
      <section className="destination-detail-hero">
        <img
          src={place.image}
          alt={`${place.name} landscape`}
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = siteImages.hero;
          }}
        />
        <div className="detail-hero-shade" />
        <div className="container destination-detail-copy">
          <div className="breadcrumbs">
            <Link to="/">Home</Link>
            <span>/</span>
            <span>Destinations</span>
            <span>/</span>
            <span>{place.name}</span>
          </div>
          <span className="eyebrow">{place.eyebrow}</span>
          <h1>{place.name}.</h1>
          <p>{place.description}</p>
          <div className="destination-quick-facts">
            {place.bestSeason && (
              <span><Calendar size={14} /> <strong>Best Season:</strong> {place.bestSeason}</span>
            )}
            {place.suggestedDuration && (
              <span><Clock3 size={14} /> <strong>Ideal Duration:</strong> {place.suggestedDuration}</span>
            )}
          </div>
          <div className="hero-buttons">
            <button className="button button-light" onClick={() => onEnquire(`Custom Trip to ${place.name}`)}>
              Plan a visit <ArrowUpRight size={16} />
            </button>
          </div>
        </div>
      </section>

      <section className="section destination-detail-content">
        <div className="container destination-detail-grid">
          <div>
            <span className="eyebrow">DESTINATION OVERVIEW</span>
            <h2>Make room for<br /><i>{place.name}.</i></h2>
            <p className="destination-overview-text">
              {place.overview || place.description}
            </p>
            <p>
              Whether you are planning a relaxed day trip or anchoring a week-long route around {place.name}, our team arranges private transfers, authentic valley stays, and experienced local coordination.
            </p>
            <div className="destination-cta-block">
              <button className="text-link" onClick={() => onEnquire(`Enquiry about ${place.name}`)}>
                Ask our travel team about {place.name} <ArrowUpRight size={15} />
              </button>
            </div>
          </div>

          <div className="destination-highlights">
            <span className="eyebrow">WHAT TO EXPERIENCE</span>
            {place.highlights.map((highlight, i) => (
              <div key={highlight} className="destination-highlight-item">
                <span>{String(i + 1).padStart(2, '0')}</span>
                <strong>{highlight}</strong>
                <Check size={16} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {place.travelTips && place.travelTips.length > 0 && (
        <section className="section destination-tips-section">
          <div className="container">
            <div className="destination-tips-card">
              <div className="tips-header">
                <Info size={22} />
                <div>
                  <span className="eyebrow">LOCAL PRACTICAL GUIDANCE</span>
                  <h3>Essential tips for visiting {place.name}</h3>
                </div>
              </div>
              <ul className="destination-tips-list">
                {place.travelTips.map((tip, idx) => (
                  <li key={idx}>
                    <Check size={15} />
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
              <small className="destination-disclaimer-note">
                Practical travel guidance. Real-time road status, snow passes and timing should be verified prior to departure.
              </small>
            </div>
          </div>
        </section>
      )}

      {/* Related Packages Section: SHOW ONLY GENUINELY RELATED PACKAGES */}
      <section className="section destination-related">
        <div className="container">
          <div className="section-heading">
            <div>
              <span className="eyebrow">SAMPLE ITINERARIES</span>
              <h2>Trips that include <i>{place.name}.</i></h2>
              <p>Explore itineraries that feature {place.name} in their day-wise route design.</p>
            </div>
            <Link className="text-link" to={`/packages?dest=${encodeURIComponent(place.name)}`}>
              Filter all trips for {place.name} <ArrowUpRight size={15} />
            </Link>
          </div>

          {related.length > 0 ? (
            <div className="packages-grid">
              {related.map(item => (
                <PackageCard item={item} key={item.id} onEnquire={onEnquire} />
              ))}
            </div>
          ) : (
            <div className="empty-destination-packages">
              <div className="empty-dest-icon">
                <Compass size={32} />
              </div>
              <h3>Looking for an exclusive {place.name} itinerary?</h3>
              <p>
                We currently do not offer a fixed fixed-departure package solely for {place.name}. Because {place.name} is a tranquil and offbeat region, we tailor private bespoke itineraries based on your preferred dates, group size, and vehicle choice.
              </p>
              <button
                className="button button-dark"
                onClick={() => onEnquire(`Bespoke Custom Route for ${place.name}`)}
              >
                Request a Custom {place.name} Itinerary <ArrowUpRight size={16} />
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Nearby / Next Destinations */}
      <section className="destination-next container">
        <div>
          <span className="eyebrow">KEEP EXPLORING</span>
          <h3>More valley landscapes to discover.</h3>
        </div>
        <div>
          {(nearbyDestinations.length > 0 ? nearbyDestinations : destinations.filter(d => d.slug !== place.slug).slice(0, 3)).map(d => (
            <Link key={d.slug} to={`/destinations/${d.slug}`}>
              {d.name} <ArrowUpRight size={14} />
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
