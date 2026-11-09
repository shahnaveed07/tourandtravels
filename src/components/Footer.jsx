import { Link } from 'react-router-dom';
import { ArrowUpRight, Instagram, Facebook, Youtube, MapPin, Mail, Phone } from 'lucide-react';
import { brand, destinations } from '../data.js';

export default function Footer({ onEnquire }) {
  return (
    <footer className="site-footer">
      <div className="container footer-main">
        <div className="footer-brand-col">
          <Link to="/" className="brand-mark footer-brand"><span className="brand-symbol">BI</span><span className="brand-wordmark"><strong>{brand.name}</strong><small>{brand.descriptor}</small></span></Link>
          <p>Thoughtful journeys, meaningful moments and the freedom to experience a place at your own pace.</p>
          <div className="social-links"><a href="#instagram" aria-label="Instagram"><Instagram size={17}/></a><a href="#facebook" aria-label="Facebook"><Facebook size={17}/></a><a href="#youtube" aria-label="YouTube"><Youtube size={17}/></a></div>
        </div>
        <div className="footer-col"><h4>Explore</h4><Link to="/packages">Tour packages</Link><Link to="/services">Travel services</Link><Link to="/about">Our story</Link><Link to="/contact">Contact us</Link></div>
        <div className="footer-col"><h4>Destinations</h4>{destinations.slice(0, 5).map(place => <Link key={place.slug} to={`/destinations/${place.slug}`}>{place.name}</Link>)}</div>
        <div className="footer-col footer-contact"><h4>Say hello</h4><a href={`tel:${brand.phone.replaceAll(' ', '')}`}><Phone size={15}/>{brand.phone}</a><a href={`mailto:${brand.email}`}><Mail size={15}/>{brand.email}</a><span><MapPin size={15}/>{brand.address}</span><button className="text-link footer-enquire" onClick={onEnquire}>Start planning <ArrowUpRight size={15}/></button></div>
      </div>
      <div className="container footer-bottom"><span>© {new Date().getFullYear()} {brand.name} {brand.descriptor}. All rights reserved.</span><div><Link to="/privacy">Privacy policy</Link><Link to="/terms">Terms & conditions</Link></div><span className="demo-note">Demo website · Replace sample details before launch</span></div>
    </footer>
  );
}
