import React from 'react';
import { Link } from 'react-router-dom';
import {
  AlertTriangle,
  ArrowUpRight,
  CableCar,
  Compass,
  ExternalLink,
  Info,
  MessageCircle,
  Plane,
  ShieldCheck,
  TrainFront,
} from 'lucide-react';
import { brand } from '../data.js';
import {
  bookingServices,
  buildTrainHelpWhatsAppUrl,
  buildHelicopterEnquiryWhatsAppUrl,
} from '../bookingServices.js';
import usePageSEO from '../hooks/usePageSEO.js';

export default function Bookings({ onEnquire }) {
  usePageSEO('/bookings');

  const { vandeBharat, gulmargGondola, helicopter } = bookingServices;
  const trainHelpWhatsAppUrl = buildTrainHelpWhatsAppUrl(brand.whatsapp);
  const helicopterWhatsAppUrl = buildHelicopterEnquiryWhatsAppUrl(brand.whatsapp);

  return (
    <main className="inner-page bookings-page">
      <section className="inner-hero bookings-hero">
        <div className="container inner-hero-content">
          <div className="breadcrumbs">
            <Link to="/">Home</Link>
            <span>/</span>
            <span>Bookings</span>
          </div>
          <span className="eyebrow">OFFICIAL TICKETING PORTALS &amp; TRAVEL ASSISTANCE</span>
          <h1>
            Travel &amp; activity
            <br />
            <i>booking hub.</i>
          </h1>
          <p>
            Direct access to official portals for Vande Bharat Express train tickets, Gulmarg Gondola cable car passes, and eligible helicopter services in Jammu &amp; Kashmir.
          </p>
        </div>
      </section>

      <section className="section bookings-section">
        <div className="container">
          {/* Mandatory Portal Disclaimer Banner */}
          <div className="payment-safety-banner bookings-disclaimer-banner" role="note" aria-label="Official portal booking notice">
            <div className="payment-safety-icon">
              <ShieldCheck size={24} />
            </div>
            <div className="payment-safety-copy">
              <span className="eyebrow">IMPORTANT · OFFICIAL PORTAL GUIDANCE</span>
              <p className="payment-safety-statement">
                Brand Identity Tour &amp; Travel is not the direct ticket provider for Indian Railways, the Jammu &amp; Kashmir Cable Car Corporation, or the Shri Amarnathji Shrine Board.
              </p>
              <small>
                All external booking buttons below open the official government or railway portals in a new tab so you can check live availability, official tariffs, and purchase tickets directly at face value. Never share portal passwords or OTPs with third parties.
              </small>
            </div>
          </div>

          <div className="booking-hub-stack">
            {/* BOOKING SERVICE 1 — VANDE BHARAT TRAIN BOOKING */}
            <article className="booking-hub-card" id={vandeBharat.id} aria-labelledby="heading-vande-bharat">
              <div className="booking-hub-media">
                <img src={vandeBharat.image} alt={vandeBharat.imageAlt} loading="lazy" />
                <span className="booking-provider-pill">
                  <TrainFront size={15} /> Official IRCTC Portal
                </span>
              </div>

              <div className="booking-hub-body">
                <div className="payment-method-header">
                  <span className="payment-method-index">{vandeBharat.index}</span>
                  <span className="payment-method-icon">
                    <TrainFront size={22} />
                  </span>
                </div>

                <h2 id="heading-vande-bharat">{vandeBharat.title}</h2>
                <p className="booking-hub-desc">{vandeBharat.description}</p>

                <div className="booking-steps-box">
                  <small className="booking-steps-label">HOW TO BOOK ON IRCTC</small>
                  <ol className="booking-steps-list">
                    {vandeBharat.steps.map((step, index) => (
                      <li key={step}>
                        <span className="booking-step-num">0{index + 1}</span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>

                <div className="payment-fallback-note">
                  <Info size={15} />
                  <span>{vandeBharat.notice}</span>
                </div>

                <div className="booking-hub-actions">
                  <a
                    href={vandeBharat.primaryUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="button button-dark"
                    data-testid="book-irctc-btn"
                  >
                    {vandeBharat.primaryLabel} <ExternalLink size={15} />
                  </a>
                  <a
                    href={trainHelpWhatsAppUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="button button-outline"
                    data-testid="train-whatsapp-help-btn"
                  >
                    <MessageCircle size={15} /> {vandeBharat.secondaryLabel}
                  </a>
                </div>
              </div>
            </article>

            {/* BOOKING SERVICE 2 — GULMARG GONDOLA BOOKING */}
            <article className="booking-hub-card" id={gulmargGondola.id} aria-labelledby="heading-gondola">
              <div className="booking-hub-media">
                <img src={gulmargGondola.image} alt={gulmargGondola.imageAlt} loading="lazy" />
                <span className="booking-provider-pill">
                  <CableCar size={15} /> Official JKCCC e-Ticket
                </span>
              </div>

              <div className="booking-hub-body">
                <div className="payment-method-header">
                  <span className="payment-method-index">{gulmargGondola.index}</span>
                  <span className="payment-method-icon">
                    <CableCar size={22} />
                  </span>
                </div>

                <h2 id="heading-gondola">{gulmargGondola.title}</h2>
                <p className="booking-hub-desc">{gulmargGondola.description}</p>

                <div className="gondola-phases-grid">
                  {gulmargGondola.phases.map((phase) => (
                    <div className="gondola-phase-card" key={phase.code}>
                      <span className="gondola-phase-tag">{phase.code}</span>
                      <strong>{phase.route}</strong>
                      <p>{phase.detail}</p>
                    </div>
                  ))}
                </div>

                <div className="beneficiary-disclosure-box" role="note" data-testid="gondola-official-notice">
                  <Info size={16} />
                  <p>{gulmargGondola.notice}</p>
                </div>

                <div className="booking-hub-actions">
                  <a
                    href={gulmargGondola.primaryUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="button button-dark"
                    data-testid="book-gondola-primary-btn"
                  >
                    {gulmargGondola.primaryLabel} <ExternalLink size={15} />
                  </a>
                  <a
                    href={gulmargGondola.alternateUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="button button-outline"
                    data-testid="book-gondola-alt-btn"
                  >
                    {gulmargGondola.alternateLabel} <ExternalLink size={15} />
                  </a>
                </div>
              </div>
            </article>

            {/* BOOKING SERVICE 3 — HELICOPTER / CHOPPER BOOKING */}
            <article className="booking-hub-card booking-hub-card-heli" id={helicopter.id} aria-labelledby="heading-helicopter">
              <div className="booking-hub-media">
                <img src={helicopter.image} alt={helicopter.imageAlt} loading="lazy" />
                <span className="booking-provider-pill">
                  <Plane size={15} /> Aviation &amp; Shrine Board Guidance
                </span>
              </div>

              <div className="booking-hub-body">
                <div className="payment-method-header">
                  <span className="payment-method-index">{helicopter.index}</span>
                  <span className="payment-method-icon">
                    <Plane size={22} />
                  </span>
                </div>

                <h2 id="heading-helicopter">{helicopter.title}</h2>
                <p className="booking-hub-desc">
                  Helicopter options in Jammu &amp; Kashmir are strictly separated between official Shri Amarnathji Shrine Board yatra ticketing and custom private charter enquiries.
                </p>

                <div className="heli-options-grid">
                  {/* Option A: Amarnath Yatra Helicopter Tickets */}
                  <div className="heli-option-box" data-testid="heli-option-amarnath">
                    <span className="eyebrow">OFFICIAL SHRINE BOARD PORTAL</span>
                    <h3>{helicopter.amarnath.subtitle}</h3>
                    <p>{helicopter.amarnath.description}</p>

                    <div className="heli-safety-warning" role="alert" data-testid="amarnath-heli-warning">
                      <AlertTriangle size={17} />
                      <p>{helicopter.amarnath.safetyWarning}</p>
                    </div>

                    <div className="booking-hub-actions">
                      <a
                        href={helicopter.amarnath.onlineServicesUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="button button-dark"
                        data-testid="amarnath-heli-online-btn"
                      >
                        {helicopter.amarnath.primaryLabel} <ExternalLink size={15} />
                      </a>
                      <a
                        href={helicopter.amarnath.infoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="button button-outline"
                        data-testid="amarnath-heli-info-btn"
                      >
                        {helicopter.amarnath.infoLabel} <ExternalLink size={15} />
                      </a>
                    </div>
                  </div>

                  {/* Option B: Other Helicopter / Chopper Enquiries */}
                  <div className="heli-option-box" data-testid="heli-option-charter">
                    <span className="eyebrow">CUSTOM CHARTER COORDINATION</span>
                    <h3>{helicopter.charter.subtitle}</h3>
                    <p>{helicopter.charter.description}</p>

                    <div className="payment-fallback-note">
                      <Info size={15} />
                      <span>{helicopter.charter.disclosure}</span>
                    </div>

                    <div className="booking-hub-actions">
                      <a
                        href={helicopterWhatsAppUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="button button-dark"
                        data-testid="chopper-whatsapp-enquiry-btn"
                      >
                        <MessageCircle size={15} /> {helicopter.charter.actionLabel}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="final-cta">
        <div className="container final-cta-inner">
          <div>
            <span className="eyebrow">COMBINING TICKETS WITH A KASHMIR ITINERARY?</span>
            <h2>
              We&apos;ll align your stays
              <br />
              <i>and local transfers.</i>
            </h2>
            <p>
              Once you have secured your train or Gondola tickets on the official portals, share your timings with our Sopore travel desk so we can coordinate your station pickup, Gulmarg transfers, and hotel stays.
            </p>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px' }}>
            <button
              type="button"
              className="button button-light"
              onClick={() => onEnquire && onEnquire('Itinerary & Transfer Coordination')}
            >
              Plan surrounding itinerary <ArrowUpRight size={16} />
            </button>
            <Link to="/packages" className="button button-outline" style={{ color: '#fff', borderColor: 'rgba(255,255,255,0.35)' }}>
              <Compass size={16} /> Browse tour packages
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
