import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { brand } from '../data.js';

export default function Legal({ page }) {
  const isPrivacy = page === 'privacy';
  useEffect(() => {
    document.title = `${isPrivacy ? 'Privacy Policy' : 'Terms & Conditions'} — Brand Identity Tour & Travel`;
  }, [isPrivacy]);

  return (
    <main className="section legal-page container">
      <div className="breadcrumbs">
        <Link to="/">Home</Link>
        <span>/</span>
        <span>{isPrivacy ? 'Privacy policy' : 'Terms & conditions'}</span>
      </div>
      <span className="eyebrow">POLICY & CUSTOMER TERMS</span>
      <h1>{isPrivacy ? 'Privacy policy' : 'Terms & conditions'}.</h1>
      <p className="legal-updated">Last updated: November 2026</p>

      {isPrivacy ? (
        <>
          <h2>Information you share</h2>
          <p>
            When you enquire about a tour, we collect relevant details such as your name, email address, phone number, departure city, tentative travel dates, and trip preferences to prepare a tailored itinerary quotation.
          </p>

          <h2>How your information is used</h2>
          <p>
            Your information is used strictly to communicate with you regarding your travel plans, coordinate hotel or transport bookings, and provide on-trip assistance. We do not sell, rent, or distribute your personal details to third parties for commercial marketing.
          </p>

          <h2>Contact us regarding your data</h2>
          <p>
            If you have questions about our privacy practices, you can write directly to{' '}
            <a href={`mailto:${brand.email}`} style={{ color: 'var(--forest)', fontWeight: 600 }}>
              {brand.email}
            </a>{' '}
            or visit our office at {brand.address}.
          </p>
        </>
      ) : (
        <>
          <h2>Enquiries and bookings</h2>
          <p>
            Submitting an online enquiry does not constitute a confirmed reservation. A booking is confirmed only upon mutual written agreement on itinerary details, hotel/transport availability, pricing, payment schedules, and receipt of the required advance deposit.
          </p>

          <h2>Pricing and itinerary adjustments</h2>
          <p>
            All listed package rates are starting prices per person and are subject to seasonal revisions, festival surcharges, hotel availability, and specific customized preferences. A final binding price quotation is issued in writing prior to confirmation.
          </p>

          <h2>Changes and cancellation</h2>
          <p>
            Cancellation terms, refund policies, and transfer rules vary depending on the hotel partners, local union vehicle policies, and season of travel. Detailed cancellation terms will be provided alongside your customized itinerary quotation.
          </p>

          <h2>Office location</h2>
          <p>
            Brand Identity Tour & Travel operates from {brand.address} (PIN {brand.pinCode}). Contact us at{' '}
            <a href={`tel:${brand.phone.replaceAll(' ', '')}`} style={{ color: 'var(--forest)', fontWeight: 600 }}>
              {brand.phone}
            </a>.
          </p>
        </>
      )}

      <div style={{ marginTop: '30px' }}>
        <Link to="/contact" className="button button-dark">
          Contact the team
        </Link>
      </div>
    </main>
  );
}
