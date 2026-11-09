import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Clock3, Mail, MapPin, MessageCircle, Phone } from 'lucide-react';
import { brand } from '../data.js';
import { siteImages } from '../imageCatalog.js';

export default function Contact({ onEnquire }) {
  useEffect(() => {
    document.title = 'Contact Us — Brand Identity Tour & Travel';
  }, []);

  return (
    <main className="inner-page">
      <section className="inner-hero contact-hero">
        <div className="container inner-hero-content">
          <div className="breadcrumbs">
            <Link to="/">Home</Link>
            <span>/</span>
            <span>Contact</span>
          </div>
          <span className="eyebrow">A GOOD JOURNEY STARTS WITH A CONVERSATION</span>
          <h1>Let's talk about<br /><i>somewhere.</i></h1>
          <p>Tell us where you want to go in Kashmir, when you plan to travel, and who is coming along.</p>
        </div>
      </section>

      <section className="section contact-section">
        <div className="container contact-layout">
          <div className="contact-info">
            <span className="eyebrow">REACH OUT TO OUR KASHMIR TEAM</span>
            <h2>We'd love to<br /><i>hear from you.</i></h2>
            <p>
              Use the contact details below to speak directly with our travel coordinators, or open our detailed enquiry form to share your tentative itinerary ideas.
            </p>

            <div className="contact-info-list">
              <a href={`tel:${brand.phone.replaceAll(' ', '')}`} aria-label={`Call us at ${brand.phone}`}>
                <span><Phone size={18} /></span>
                <div>
                  <small>CALL DIRECTLY</small>
                  <strong>{brand.phone}</strong>
                </div>
                <ArrowUpRight size={16} />
              </a>

              <a href={`mailto:${brand.email}`} aria-label={`Email us at ${brand.email}`}>
                <span><Mail size={18} /></span>
                <div>
                  <small>SEND AN EMAIL</small>
                  <strong>{brand.email}</strong>
                </div>
                <ArrowUpRight size={16} />
              </a>

              <a
                href={`https://wa.me/${brand.whatsapp}?text=${encodeURIComponent(`Hello ${brand.name}! I would like to speak with a travel coordinator.`)}`}
                target="_blank"
                rel="noreferrer"
                aria-label="Chat on WhatsApp"
              >
                <span><MessageCircle size={18} /></span>
                <div>
                  <small>WHATSAPP MESSENGER</small>
                  <strong>Chat with a Coordinator</strong>
                </div>
                <ArrowUpRight size={16} />
              </a>

              <a
                href={brand.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`View ${brand.address} on Google Maps`}
              >
                <span><MapPin size={18} /></span>
                <div>
                  <small>OUR OFFICE LOCATION</small>
                  <strong>{brand.address}</strong>
                </div>
                <ArrowUpRight size={16} />
              </a>

              <div>
                <span><Clock3 size={18} /></span>
                <div>
                  <small>OFFICE HOURS</small>
                  <strong>{brand.hours}</strong>
                </div>
              </div>
            </div>

            <div className="contact-buttons-row">
              <button className="button button-dark" onClick={() => onEnquire('General Enquiry')}>
                Open enquiry form <ArrowUpRight size={16} />
              </button>
              {brand.whatsapp ? (
                <a
                  href={`https://wa.me/${brand.whatsapp}?text=${encodeURIComponent(`Hello ${brand.name}! I would like to enquire about traveling to Kashmir.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="button button-outline whatsapp-contact-btn"
                >
                  <MessageCircle size={16} /> Chat on WhatsApp
                </a>
              ) : (
                <button disabled className="button button-outline">
                  WhatsApp Pending
                </button>
              )}
              {brand.email ? (
                <a
                  href={`mailto:${brand.email}?subject=${encodeURIComponent('Travel Enquiry — Brand Identity Tour & Travel')}&body=${encodeURIComponent(`Hello ${brand.name} team,\n\nI would like to enquire about planning a trip to Kashmir.\n\nWarm regards,`)}`}
                  className="button button-outline"
                >
                  <Mail size={16} /> Send Email
                </a>
              ) : (
                <button disabled className="button button-outline">
                  Email Pending
                </button>
              )}
            </div>
          </div>

          <div className="contact-visual">
            <img
              src={siteImages.company.storefront}
              alt="Brand Identity Tour & Travel storefront at Bismillah Market, Sopore"
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = siteImages.hero;
              }}
            />
            <div className="contact-visual-note">
              <span className="eyebrow">BRAND IDENTITY TOUR & TRAVEL</span>
              <strong>Make the journey<br /><i>your own.</i></strong>
            </div>
          </div>
        </div>
      </section>

      <section className="contact-bottom container">
        <span>Have a specific destination in mind?</span>
        <Link to="/destinations/srinagar">Explore Srinagar <ArrowUpRight size={15} /></Link>
        <Link to="/packages">Browse all tour packages <ArrowUpRight size={15} /></Link>
      </section>
    </main>
  );
}
