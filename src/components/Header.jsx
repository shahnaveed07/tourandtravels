import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X, ChevronDown, ArrowUpRight, Phone } from 'lucide-react';
import { brand, destinations, packages } from '../data.js';

const navClass = ({ isActive }) => `nav-link${isActive ? ' active' : ''}`;

export default function Header({ onEnquire }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [expanded, setExpanded] = useState('');
  const closeMobile = () => { setMobileOpen(false); setExpanded(''); };

  return (
    <>
      <div className="top-strip">
        <div className="container top-strip-inner">
          <span>Thoughtfully planned journeys. Beautifully remembered.</span>
          <div className="top-strip-right"><a href={`tel:${brand.phone.replaceAll(' ', '')}`}><Phone size={12} /> {brand.phone}</a><span className="top-divider" /> <span>{brand.hours}</span></div>
        </div>
      </div>
      <header className="site-header">
        <div className="container header-inner">
          <Link to="/" className="brand-mark" onClick={closeMobile} aria-label="Brand Identity Tour and Travel home">
            <span className="brand-symbol">BI</span>
            <span className="brand-wordmark"><strong>{brand.name}</strong><small>{brand.descriptor}</small></span>
          </Link>
          <nav className={`desktop-nav${mobileOpen ? ' open' : ''}`} aria-label="Main navigation">
            <NavLink to="/" className={navClass} onClick={closeMobile}>Home</NavLink>
            <div className={`nav-dropdown${expanded === 'packages' ? ' expanded' : ''}`}>
              <button className="nav-link nav-trigger" aria-expanded={expanded === 'packages'} onClick={() => setExpanded(expanded === 'packages' ? '' : 'packages')}>Packages <ChevronDown size={14} /></button>
              <div className="dropdown-panel packages-dropdown">
                <div><span className="dropdown-kicker">FIND YOUR JOURNEY</span><Link to="/packages" onClick={closeMobile}>All tour packages <ArrowUpRight size={14}/></Link><p>Browse curated routes by trip length and travel style.</p></div>
                <div className="dropdown-list">{packages.slice(0, 4).map(item => <Link key={item.id} to={`/packages/${item.slug}`} onClick={closeMobile}>{item.title}<span>{item.duration}</span></Link>)}</div>
                <div className="dropdown-list"><Link to="/packages?type=Family" onClick={closeMobile}>Family holidays</Link><Link to="/packages?type=Honeymoon" onClick={closeMobile}>Honeymoon escapes</Link><Link to="/packages?type=Adventure" onClick={closeMobile}>Adventure tours</Link><Link to="/packages?type=Short%20break" onClick={closeMobile}>Short breaks</Link></div>
              </div>
            </div>
            <div className={`nav-dropdown${expanded === 'destinations' ? ' expanded' : ''}`}>
              <button className="nav-link nav-trigger" aria-expanded={expanded === 'destinations'} onClick={() => setExpanded(expanded === 'destinations' ? '' : 'destinations')}>Destinations <ChevronDown size={14} /></button>
              <div className="dropdown-panel destination-dropdown">
                {destinations.map(place => <Link key={place.slug} to={`/destinations/${place.slug}`} onClick={closeMobile}><span>{place.name}</span><small>{place.eyebrow}</small></Link>)}
              </div>
            </div>
            <NavLink to="/services" className={navClass} onClick={closeMobile}>Services</NavLink>
            <NavLink to="/about" className={navClass} onClick={closeMobile}>About</NavLink>
            <NavLink to="/contact" className={navClass} onClick={closeMobile}>Contact</NavLink>
          </nav>
          <div className="header-actions">
            <button className="button button-dark button-small header-cta" onClick={() => { closeMobile(); onEnquire(); }}>Plan my trip <ArrowUpRight size={15}/></button>
            <button className="mobile-menu-btn" onClick={() => setMobileOpen(!mobileOpen)} aria-label={mobileOpen ? 'Close menu' : 'Open menu'}>{mobileOpen ? <X /> : <Menu />}</button>
          </div>
        </div>
      </header>
    </>
  );
}
