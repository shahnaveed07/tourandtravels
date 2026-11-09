import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, ArrowUpRight, Check, Clock3, Compass, MapPin } from 'lucide-react';
import { guides, destinations, packages } from '../data.js';
import { siteImages } from '../imageCatalog.js';
import PackageCard from '../components/PackageCard.jsx';

export default function TravelGuideDetail({ onEnquire }) {
  const { slug } = useParams();
  const guide = guides.find(g => g.slug === slug);

  useEffect(() => {
    if (guide) {
      document.title = `${guide.title} — Brand Identity Tour & Travel`;
    }
  }, [guide]);

  if (!guide) {
    return (
      <main className="not-found container">
        <span className="eyebrow">GUIDE NOT FOUND</span>
        <h1>This guide isn't in our library.</h1>
        <p>Explore other stories, practical advice and sample itineraries for Kashmir.</p>
        <Link className="button button-dark" to="/">
          Return to home <ArrowRight size={15} />
        </Link>
      </main>
    );
  }

  const relatedPackages = packages.filter(p => guide.relatedPackageSlugs?.includes(p.slug));
  const relatedDestinations = destinations.filter(d => guide.relatedDestinations?.includes(d.slug));

  return (
    <main className="inner-page guide-detail-page">
      <section className="detail-hero guide-hero">
        <img
          src={guide.image}
          alt={guide.title}
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = siteImages.hero;
          }}
        />
        <div className="detail-hero-shade" />
        <div className="container detail-hero-content">
          <div className="breadcrumbs">
            <Link to="/">Home</Link>
            <span>/</span>
            <span>Travel Guides</span>
            <span>/</span>
            <span>{guide.title}</span>
          </div>
          <span className="eyebrow">{guide.category}</span>
          <h1>{guide.title}</h1>
          <p>{guide.description}</p>
          <div className="detail-meta">
            <span><Clock3 size={15} />{guide.readTime}</span>
            <span><Compass size={15} />Local Travel Advice</span>
          </div>
        </div>
      </section>

      <section className="section guide-content-section">
        <div className="container guide-layout">
          <article className="guide-article">
            <p className="guide-lead">{guide.intro}</p>

            {guide.sections.map((section, idx) => (
              <div className="guide-section-block" key={section.heading}>
                <h2>{section.heading}</h2>
                <p>{section.content}</p>
                {section.points && section.points.length > 0 && (
                  <ul className="guide-points-list">
                    {section.points.map((pt, pIdx) => (
                      <li key={pIdx}>
                        <Check size={16} className="guide-check-icon" />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}

            {guide.practicalAdvice && (
              <div className="guide-advice-box">
                <span className="eyebrow">PRACTICAL KASHMIR ADVICE</span>
                <h3>Good things to keep in mind</h3>
                <ul>
                  {guide.practicalAdvice.map((adv, aIdx) => (
                    <li key={aIdx}>{adv}</li>
                  ))}
                </ul>
              </div>
            )}

            <div className="guide-disclaimer">
              <small>
                <strong>Traveler Note:</strong> Regulations, permits, union taxi guidelines, and weather conditions can change seasonally. Always confirm real-time ground updates with your dedicated travel planner before departure.
              </small>
            </div>
          </article>

          <aside className="guide-sidebar">
            <div className="guide-sidebar-card">
              <span className="eyebrow">NEED PLANNING HELP?</span>
              <h3>Turn advice into your journey.</h3>
              <p>Share your tentative travel dates, group size, and interests. We will tailor an unhurried route for you.</p>
              <button
                className="button button-dark booking-button"
                onClick={() => onEnquire(`Custom trip based on guide: ${guide.title}`)}
              >
                Plan a journey <ArrowUpRight size={16} />
              </button>
            </div>

            {relatedDestinations.length > 0 && (
              <div className="guide-related-places">
                <h4>Featured Destinations</h4>
                <div className="guide-places-list">
                  {relatedDestinations.map(d => (
                    <Link to={`/destinations/${d.slug}`} key={d.slug} className="guide-place-item">
                      <MapPin size={15} />
                      <div>
                        <strong>{d.name}</strong>
                        <small>{d.eyebrow}</small>
                      </div>
                      <ArrowUpRight size={14} />
                    </Link>
                  ))}
                </div>
              </div>
            )}

            <Link to="/" className="back-link">
              <ArrowLeft size={15} /> Back to all stories
            </Link>
          </aside>
        </div>
      </section>

      {relatedPackages.length > 0 && (
        <section className="section guide-packages-section">
          <div className="container">
            <div className="section-heading">
              <div>
                <span className="eyebrow">RELEVANT SAMPLE ITINERARIES</span>
                <h2>Journeys that fit this <i>guide.</i></h2>
                <p>These sample routes integrate the ideas and destinations highlighted in this article.</p>
              </div>
              <Link to="/packages" className="text-link">
                All packages <ArrowUpRight size={15} />
              </Link>
            </div>
            <div className="packages-grid">
              {relatedPackages.map(pkg => (
                <PackageCard key={pkg.id} item={pkg} onEnquire={onEnquire} />
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
