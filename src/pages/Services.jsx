import { Link } from 'react-router-dom';
import {
  ArrowUpRight,
  CableCar,
  CarFront,
  ExternalLink,
  Headphones,
  Hotel,
  MapPinned,
  Plane,
  TrainFront,
  Users,
  Waves,
} from 'lucide-react';
import { siteImages } from '../imageCatalog.js';
import { bookingServices } from '../bookingServices.js';
import usePageSEO from '../hooks/usePageSEO.js';

const serviceDetails = [
  { id: 'tours', no: '01', icon: MapPinned, title: 'Custom tour planning', copy: 'A route built around your travel dates, interests, preferred pace and budget. Start with a sample package or begin with a blank itinerary.', bullets: ['Day-wise route design', 'Destination and activity planning', 'Flexible duration and stopovers'] },
  { id: 'stays', no: '02', icon: Hotel, title: 'Hotels & curated stays', copy: 'Find the right base for each part of your journey, from comfortable city stays to a mountain-facing retreat.', bullets: ['Hotel category options', 'Room and meal-plan coordination', 'Stay suggestions by destination'] },
  { id: 'houseboats', no: '03', icon: Waves, title: 'Houseboat experiences', copy: 'Add a quieter chapter to your stay with a traditional houseboat experience on the lake.', bullets: ['Stay-style recommendations', 'Room and amenity preferences', 'Optional Shikara experience'] },
  { id: 'transport', no: '04', icon: CarFront, title: 'Private transport', copy: 'Coordinate the road journey, from airport transfers to local sightseeing and multi-day valley routes.', bullets: ['Airport pickup and drop', 'Local sightseeing transfers', 'Multi-day route coordination'] },
  { id: 'groups', no: '05', icon: Users, title: 'Family, couple & group travel', copy: 'Make the itinerary work for the people travelling: room sharing, rest stops, interests and time together.', bullets: ['Family-friendly trip pacing', 'Couple and honeymoon planning', 'Group movement and coordination'] },
  { id: 'experiences', no: '06', icon: Headphones, title: 'On-trip coordination', copy: 'Keep the practical details connected while you travel, with a point of contact for itinerary questions.', bullets: ['Pickup and timing coordination', 'Local activity guidance', 'Changes to the day plan'] }
];

export default function Services({ onEnquire }) {
  usePageSEO('/services');

  return (
    <main className="inner-page">
      <section className="inner-hero services-hero">
        <div className="container inner-hero-content">
          <div className="breadcrumbs">
            <Link to="/">Home</Link>
            <span>/</span>
            <span>Services</span>
          </div>
          <span className="eyebrow">THE DETAILS, THOUGHTFULLY CONNECTED</span>
          <h1>
            Travel well.
            <br />
            <i>We&apos;ll handle the in-between.</i>
          </h1>
          <p>
            From the first route idea to the last transfer, bring the pieces together with one considered plan.
          </p>
        </div>
      </section>

      <section className="section service-detail-section">
        <div className="container">
          <div className="service-page-intro">
            <span className="eyebrow">WHAT WE CAN HELP WITH</span>
            <h2>
              One journey.
              <br />
              <i>Every moving part.</i>
            </h2>
            <p>
              Choose one service or combine a few into a complete travel plan. The final scope and inclusions are always confirmed in writing.
            </p>
          </div>
          <div className="service-detail-list">
            {serviceDetails.map((service) => {
              const Icon = service.icon;
              return (
                <article className="service-detail-row" id={service.id} key={service.id}>
                  <div className="service-detail-mark">
                    <span>{service.no}</span>
                    <Icon size={25} />
                  </div>
                  <div className="service-detail-copy">
                    <h3>{service.title}</h3>
                    <p>{service.copy}</p>
                    <ul>
                      {service.bullets.map((b) => (
                        <li key={b}>{b}</li>
                      ))}
                    </ul>
                  </div>
                  <button
                    className="round-arrow"
                    onClick={() => onEnquire(service.title)}
                    aria-label={`Enquire about ${service.title}`}
                  >
                    <ArrowUpRight size={20} />
                  </button>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* CONCISE BOOKING-SERVICES SECTION LINKING TO FULL /bookings HUB */}
      <section className="section services-booking-teaser" id="official-bookings">
        <div className="container">
          <div className="section-heading">
            <div>
              <span className="eyebrow">OFFICIAL TICKETING PORTALS</span>
              <h2>
                Train, Gondola &amp; <i>Helicopter</i> bookings.
              </h2>
              <p>
                Access official ticketing portals for Vande Bharat Express (IRCTC), Gulmarg Gondola (JKCCC), and eligible Amarnath Yatra helicopter services in our Travel Booking Hub.
              </p>
            </div>
            <Link to="/bookings" className="button button-dark">
              Open Travel Booking Hub <ArrowUpRight size={16} />
            </Link>
          </div>

          <div className="services-booking-cards">
            <article className="services-booking-mini-card">
              <div className="payment-method-header">
                <span className="payment-method-index">01 · IRCTC RAILWAYS</span>
                <span className="payment-method-icon">
                  <TrainFront size={20} />
                </span>
              </div>
              <h3>{bookingServices.vandeBharat.title}</h3>
              <p>{bookingServices.vandeBharat.description}</p>
              <div className="services-booking-mini-links">
                <a
                  href={bookingServices.vandeBharat.primaryUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-link"
                >
                  {bookingServices.vandeBharat.primaryLabel} <ExternalLink size={14} />
                </a>
                <Link to="/bookings#vande-bharat" className="text-link">
                  View booking steps <ArrowUpRight size={14} />
                </Link>
              </div>
            </article>

            <article className="services-booking-mini-card">
              <div className="payment-method-header">
                <span className="payment-method-index">02 · JKCCC CABLE CAR</span>
                <span className="payment-method-icon">
                  <CableCar size={20} />
                </span>
              </div>
              <h3>{bookingServices.gulmargGondola.title}</h3>
              <p>Official Phase I (Gulmarg to Kongdori) &amp; Phase II (Kongdori to Apharwat) e-tickets via JKCCC.</p>
              <div className="services-booking-mini-links">
                <a
                  href={bookingServices.gulmargGondola.primaryUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-link"
                >
                  {bookingServices.gulmargGondola.primaryLabel} <ExternalLink size={14} />
                </a>
                <Link to="/bookings#gulmarg-gondola" className="text-link">
                  Phase guide &amp; alternate portal <ArrowUpRight size={14} />
                </Link>
              </div>
            </article>

            <article className="services-booking-mini-card">
              <div className="payment-method-header">
                <span className="payment-method-index">03 · AVIATION &amp; SHRINE BOARD</span>
                <span className="payment-method-icon">
                  <Plane size={20} />
                </span>
              </div>
              <h3>{bookingServices.helicopter.title}</h3>
              <p>Official SASB Amarnath Yatra helicopter portal links and custom valley charter coordination.</p>
              <div className="services-booking-mini-links">
                <Link to="/bookings#helicopter-services" className="text-link">
                  Official portals &amp; charter enquiry <ArrowUpRight size={14} />
                </Link>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="section stays-showcase-section">
        <div className="container">
          <div className="section-heading">
            <div>
              <span className="eyebrow">CURATED STAYS ACROSS KASHMIR</span>
              <h2>
                Boutique hotels, mountain lodges &amp; <i>lakeside retreats.</i>
              </h2>
              <p>
                Handpicked accommodation options across{' '}
                <Link to="/destinations/srinagar" style={{ color: 'inherit', textDecoration: 'underline' }}>
                  Srinagar
                </Link>
                ,{' '}
                <Link to="/destinations/gulmarg" style={{ color: 'inherit', textDecoration: 'underline' }}>
                  Gulmarg
                </Link>
                ,{' '}
                <Link to="/destinations/pahalgam" style={{ color: 'inherit', textDecoration: 'underline' }}>
                  Pahalgam
                </Link>{' '}
                and{' '}
                <Link to="/destinations/sonamarg" style={{ color: 'inherit', textDecoration: 'underline' }}>
                  Sonamarg
                </Link>{' '}
                matched to your travel style.
              </p>
            </div>
            <Link to="/packages" className="text-link">
              Browse tour packages <ArrowUpRight size={15} />
            </Link>
          </div>
          <div className="culture-gallery-grid">
            {siteImages.stays.slice(0, 6).map((stay) => (
              <figure className="culture-gallery-item" key={stay.src}>
                <img src={stay.src} alt={stay.alt} loading="lazy" />
                <figcaption>{stay.alt}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="service-process">
        <div className="container">
          <span className="eyebrow">A SIMPLE WAY TO BEGIN</span>
          <h2>
            From first thought
            <br />
            <i>to final details.</i>
          </h2>
          <div className="process-grid">
            <div>
              <span>01</span>
              <h3>Tell us the idea</h3>
              <p>Share dates, group size, destinations and what a good trip means to you.</p>
            </div>
            <div>
              <span>02</span>
              <h3>Shape the route</h3>
              <p>Review a proposed itinerary with stay, transport and experience options.</p>
            </div>
            <div>
              <span>03</span>
              <h3>Confirm the details</h3>
              <p>Check the written inclusions, availability, payment terms and cancellation policy.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="final-cta">
        <div className="container final-cta-inner">
          <div>
            <span className="eyebrow">A GOOD PLAN STARTS WITH A CONVERSATION</span>
            <h2>
              What are you
              <br />
              <i>in the mood for?</i>
            </h2>
            <p>Tell us a little about your journey.</p>
          </div>
          <button className="button button-light" onClick={() => onEnquire()}>
            Let&apos;s plan it <ArrowUpRight size={16} />
          </button>
        </div>
      </section>
    </main>
  );
}
