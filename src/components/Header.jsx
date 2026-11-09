import { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, ArrowUpRight, Phone } from 'lucide-react';
import { brand, destinations, packages } from '../data.js';
import { siteImages } from '../imageCatalog.js';
import SocialLinks from './SocialLinks.jsx';

const navClass = ({ isActive }) => `nav-link${isActive ? ' active' : ''}`;

export default function Header({ onEnquire }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [expanded, setExpanded] = useState('');
  const navRef = useRef(null);
  const location = useLocation();

  const closeMobile = () => {
    setMobileOpen(false);
    setExpanded('');
  };

  // Close menus on route change
  useEffect(() => {
    closeMobile();
  }, [location.pathname, location.search]);

  // Close dropdowns on outside click or Escape key
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setExpanded('');
      }
    };
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setExpanded('');
        setMobileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <>
      <div className="top-strip">
        <div className="container top-strip-inner">
          <span>Thoughtfully planned Kashmir journeys. Beautifully remembered.</span>
          <div className="top-strip-right">
            <a href={`tel:${brand.phone.replaceAll(' ', '')}`} aria-label={`Call us at ${brand.phone}`}>
              <Phone size={12} /> {brand.phone}
            </a>
            <span className="top-divider" />
            <span className="top-strip-hours">{brand.hours}</span>
            <span className="top-divider" />
            <SocialLinks size={13} className="top-strip-social" />
          </div>
        </div>
      </div>

      <header className="site-header">
        <div className="container header-inner" ref={navRef}>
          <Link
            to="/"
            className="brand-mark"
            onClick={closeMobile}
            aria-label="Brand Identity Tour & Travel home"
          >
            <span className="brand-logo-frame">
              <img
                src={siteImages.logo.horizontal}
                alt="Brand Identity Tour & Travel"
                className="brand-logo-img"
              />
            </span>
          </Link>

          <nav className={`desktop-nav${mobileOpen ? ' open' : ''}`} aria-label="Main navigation">
            <NavLink to="/" end className={navClass} onClick={closeMobile}>
              Home
            </NavLink>

            {/* Packages Dropdown */}
            <div className={`nav-dropdown${expanded === 'packages' ? ' expanded' : ''}`}>
              <button
                type="button"
                className="nav-link nav-trigger"
                aria-expanded={expanded === 'packages'}
                aria-haspopup="true"
                onClick={() => setExpanded(expanded === 'packages' ? '' : 'packages')}
              >
                Packages <ChevronDown size={14} />
              </button>
              <div className="dropdown-panel packages-dropdown">
                <div>
                  <span className="dropdown-kicker">FIND YOUR JOURNEY</span>
                  <Link to="/packages" onClick={closeMobile}>
                    All tour packages <ArrowUpRight size={14} />
                  </Link>
                  <p>Browse curated routes by duration, destination, and travel style.</p>
                </div>
                <div className="dropdown-list">
                  <span className="dropdown-subheading">Featured Itineraries</span>
                  {packages.slice(0, 4).map(item => (
                    <Link key={item.id} to={`/packages/${item.slug}`} onClick={closeMobile}>
                      {item.title} <span>{item.duration}</span>
                    </Link>
                  ))}
                </div>
                <div className="dropdown-list">
                  <span className="dropdown-subheading">By Travel Style</span>
                  <Link to="/packages?type=Family" onClick={closeMobile}>Family holidays</Link>
                  <Link to="/packages?type=Honeymoon" onClick={closeMobile}>Honeymoon escapes</Link>
                  <Link to="/packages?type=Adventure" onClick={closeMobile}>Adventure tours</Link>
                  <Link to="/packages?type=Short%20break" onClick={closeMobile}>Short breaks (2–3 days)</Link>
                </div>
              </div>
            </div>

            {/* Destinations Dropdown */}
            <div className={`nav-dropdown${expanded === 'destinations' ? ' expanded' : ''}`}>
              <button
                type="button"
                className="nav-link nav-trigger"
                aria-expanded={expanded === 'destinations'}
                aria-haspopup="true"
                onClick={() => setExpanded(expanded === 'destinations' ? '' : 'destinations')}
              >
                Destinations <ChevronDown size={14} />
              </button>
              <div className="dropdown-panel destination-dropdown">
                {destinations.map(place => (
                  <Link key={place.slug} to={`/destinations/${place.slug}`} onClick={closeMobile}>
                    <span>{place.name}</span>
                    <small>{place.eyebrow}</small>
                  </Link>
                ))}
              </div>
            </div>

            <NavLink to="/services" className={navClass} onClick={closeMobile}>
              Services
            </NavLink>
            <NavLink to="/bookings" className={navClass} onClick={closeMobile}>
              Bookings
            </NavLink>
            <NavLink to="/about" className={navClass} onClick={closeMobile}>
              About
            </NavLink>
            <NavLink to="/contact" className={navClass} onClick={closeMobile}>
              Contact
            </NavLink>
          </nav>

          <div className="header-actions">
            <button
              className="button button-dark button-small header-cta"
              onClick={() => {
                closeMobile();
                onEnquire();
              }}
            >
              Plan my trip <ArrowUpRight size={15} />
            </button>
            <button
              className="mobile-menu-btn"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>
    </>
  );
}
