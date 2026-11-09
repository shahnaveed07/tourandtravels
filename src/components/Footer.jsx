import { Link } from 'react-router-dom';
import { ArrowUpRight, MapPin, Mail, Phone } from 'lucide-react';
import { brand, destinations } from '../data.js';

function InstagramIcon({ size = 17 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
    </svg>
  );
}

function FacebookIcon({ size = 17 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
    </svg>
  );
}

function YoutubeIcon({ size = 17 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"/>
      <polygon points="10 15 15 12 10 9 10 15"/>
    </svg>
  );
}

export default function Footer({ onEnquire }) {
  return (
    <footer className="site-footer">
      <div className="container footer-main">
        <div className="footer-brand-col">
          <Link to="/" className="brand-mark footer-brand"><span className="brand-symbol">BI</span><span className="brand-wordmark"><strong>{brand.name}</strong><small>{brand.descriptor}</small></span></Link>
          <p>Thoughtful journeys, meaningful moments and the freedom to experience a place at your own pace.</p>
          <div className="social-links"><a href="#instagram" aria-label="Instagram"><InstagramIcon size={17}/></a><a href="#facebook" aria-label="Facebook"><FacebookIcon size={17}/></a><a href="#youtube" aria-label="YouTube"><YoutubeIcon size={17}/></a></div>
        </div>
        <div className="footer-col"><h4>Explore</h4><Link to="/packages">Tour packages</Link><Link to="/services">Travel services</Link><Link to="/about">Our story</Link><Link to="/contact">Contact us</Link></div>
        <div className="footer-col"><h4>Destinations</h4>{destinations.slice(0, 5).map(place => <Link key={place.slug} to={`/destinations/${place.slug}`}>{place.name}</Link>)}</div>
        <div className="footer-col footer-contact"><h4>Say hello</h4><a href={`tel:${brand.phone.replaceAll(' ', '')}`}><Phone size={15}/>{brand.phone}</a><a href={`mailto:${brand.email}`}><Mail size={15}/>{brand.email}</a><span><MapPin size={15}/>{brand.address}</span><button className="text-link footer-enquire" onClick={onEnquire}>Start planning <ArrowUpRight size={15}/></button></div>
      </div>
      <div className="container footer-bottom"><span>© {new Date().getFullYear()} {brand.name} {brand.descriptor}. All rights reserved.</span><div><Link to="/privacy">Privacy policy</Link><Link to="/terms">Terms & conditions</Link></div><span className="demo-note">Demo website · Replace sample details before launch</span></div>
    </footer>
  );
}
