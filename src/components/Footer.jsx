import { Link } from 'react-router-dom';
import { ArrowUpRight, MapPin, Mail, Phone } from 'lucide-react';
import { brand, destinations } from '../data.js';
import { siteImages } from '../imageCatalog.js';
import SocialLinks from './SocialLinks.jsx';

export default function Footer({ onEnquire }) {
  return (
    <footer className="site-footer">
      <div className="container footer-main">
        <div className="footer-brand-col">
          <Link to="/" className="brand-mark footer-brand" aria-label="Brand Identity Tour & Travel home">
            <span className="brand-logo-frame footer-logo-frame">
              <img
                src={siteImages.logo.horizontal}
                alt="Brand Identity Tour & Travel"
                className="brand-logo-img"
              />
            </span>
          </Link>
          <p>
            Thoughtfully planned Kashmir journeys, meaningful mountain moments, and the freedom to experience the valley at your own pace.
          </p>

          <SocialLinks size={17} />
        </div>

        <div className="footer-col">
          <h4>Explore</h4>
          <Link to="/packages">Tour packages</Link>
          <Link to="/services">Travel services</Link>
          <Link to="/bookings">Bookings</Link>
          <Link to="/travel-guides/getting-here-arrival-planning">Arrival guide</Link>
          <Link to="/about">Our story</Link>
          <Link to="/payments">Payment Methods</Link>
          <Link to="/contact">Contact us</Link>
        </div>

        <div className="footer-col">
          <h4>Destinations</h4>
          {destinations.slice(0, 5).map((place) => (
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
          <a
            href={brand.mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="footer-address"
            aria-label="Get Directions to Brand Identity Tour & Travel on Google Maps"
          >
            <MapPin size={15} />
            <span>{brand.address}</span>
          </a>
          <a
            href={brand.mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-link footer-map-link"
            aria-label="View Brand Identity Tour & Travel on Google Maps"
          >
            View Brand Identity Tour &amp; Travel on Google Maps <ArrowUpRight size={14} />
          </a>
          <button className="text-link footer-enquire" onClick={() => onEnquire('General Enquiry')}>
            Start planning with us <ArrowUpRight size={15} />
          </button>
        </div>
      </div>

      <div className="container footer-bottom">
        <span>
          © {new Date().getFullYear()} {brand.name} {brand.descriptor}. All rights reserved.
        </span>
        <div className="footer-legal-links">
          <Link to="/payments">Payment Methods</Link>
          <Link to="/privacy">Privacy policy</Link>
          <Link to="/terms">Terms &amp; conditions</Link>
        </div>
       <a className="text-dev" href="https://dscweb.me" target="_blank" rel="noopener noreferrer">
        Designed & developed with ❤️ by <strong className="text-bold">Dark Skull Corporation</strong>
       </a>
      </div>
    </footer>
  );
}
