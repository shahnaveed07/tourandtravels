import { Link } from 'react-router-dom';
import { ArrowUpRight, MapPin, Mail, Phone } from 'lucide-react';
import { brand, destinations } from '../data.js';

function InstagramIcon({ size = 17 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
    </svg>
  );
}

function FacebookIcon({ size = 17 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
    </svg>
  );
}

function YoutubeIcon({ size = 17 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"/>
      <polygon points="10 15 15 12 10 9 10 15"/>
    </svg>
  );
}

export default function Footer({ onEnquire }) {
  const hasInstagram = brand.social?.instagram && brand.social.instagram.startsWith('http');
  const hasFacebook = brand.social?.facebook && brand.social.facebook.startsWith('http');
  const hasYoutube = brand.social?.youtube && brand.social.youtube.startsWith('http');
  const hasAnySocial = hasInstagram || hasFacebook || hasYoutube;

  return (
    <footer className="site-footer">
      <div className="container footer-main">
        <div className="footer-brand-col">
          <Link to="/" className="brand-mark footer-brand" aria-label="Brand Identity home">
            <span className="brand-symbol">BI</span>
            <span className="brand-wordmark">
              <strong>{brand.name}</strong>
              <small>{brand.descriptor}</small>
            </span>
          </Link>
          <p>
            Thoughtfully planned Kashmir journeys, meaningful mountain moments, and the freedom to experience the valley at your own pace.
          </p>

          {/* Social links: only rendered as interactive links when legitimate URLs exist; otherwise displayed as verified coming soon badge or hidden */}
          {hasAnySocial ? (
            <div className="social-links" aria-label="Social media links">
              {hasInstagram && (
                <a href={brand.social.instagram} target="_blank" rel="noopener noreferrer" aria-label="Visit our Instagram">
                  <InstagramIcon size={17} />
                </a>
              )}
              {hasFacebook && (
                <a href={brand.social.facebook} target="_blank" rel="noopener noreferrer" aria-label="Visit our Facebook">
                  <FacebookIcon size={17} />
                </a>
              )}
              {hasYoutube && (
                <a href={brand.social.youtube} target="_blank" rel="noopener noreferrer" aria-label="Visit our YouTube channel">
                  <YoutubeIcon size={17} />
                </a>
              )}
            </div>
          ) : (
            <div className="social-placeholder-note">
              <small>Official social channels launching soon.</small>
            </div>
          )}
        </div>

        <div className="footer-col">
          <h4>Explore</h4>
          <Link to="/packages">Tour packages</Link>
          <Link to="/services">Travel services</Link>
          <Link to="/travel-guides/getting-here-arrival-planning">Arrival guide</Link>
          <Link to="/about">Our story</Link>
          <Link to="/contact">Contact us</Link>
        </div>

        <div className="footer-col">
          <h4>Destinations</h4>
          {destinations.slice(0, 5).map(place => (
            <Link key={place.slug} to={`/destinations/${place.slug}`}>
              {place.name}
            </Link>
          ))}
        </div>

        <div className="footer-col footer-contact">
          <h4>Say hello</h4>
          <a href={`tel:${brand.phone.replaceAll(' ', '')}`} aria-label={`Call ${brand.phone}`}>
            <Phone size={15} />
            <span>{brand.phone}</span>
          </a>
          <a href={`mailto:${brand.email}`} aria-label={`Email ${brand.email}`}>
            <Mail size={15} />
            <span>{brand.email}</span>
          </a>
          <span className="footer-address">
            <MapPin size={15} />
            <span>{brand.address}</span>
          </span>
          <button className="text-link footer-enquire" onClick={() => onEnquire('General Enquiry')}>
            Start planning with us <ArrowUpRight size={15} />
          </button>
        </div>
      </div>

      <div className="container footer-bottom">
        <span>© {new Date().getFullYear()} {brand.name} {brand.descriptor}. All rights reserved.</span>
        <div className="footer-legal-links">
          <Link to="/privacy">Privacy policy</Link>
          <Link to="/terms">Terms & conditions</Link>
        </div>
       
      </div>
    </footer>
  );
}
