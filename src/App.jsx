import { useCallback, useState, useEffect, Component } from 'react';
import { Route, Routes, useLocation, Link } from 'react-router-dom';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import EnquiryModal from './components/EnquiryModal.jsx';
import Home from './pages/Home.jsx';
import Packages from './pages/Packages.jsx';
import PackageDetail from './pages/PackageDetail.jsx';
import Destination from './pages/Destination.jsx';
import TravelGuideDetail from './pages/TravelGuideDetail.jsx';
import About from './pages/About.jsx';
import Services from './pages/Services.jsx';
import Contact from './pages/Contact.jsx';
import Legal from './pages/Legal.jsx';
import { ArrowUp, MessageCircle, AlertTriangle, RefreshCw } from 'lucide-react';
import { brand } from './data.js';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Application error caught by ErrorBoundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <main className="not-found container" style={{ padding: '80px 20px', textAlign: 'center' }}>
          <span className="eyebrow" style={{ color: '#bd8758' }}>SOMETHING WENT UNEXPECTEDLY</span>
          <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: '38px', margin: '20px 0' }}>
            We hit a bump along the road.
          </h1>
          <p style={{ maxWidth: '500px', margin: '0 auto 30px', color: '#777f76' }}>
            Please refresh the page or return to the homepage to continue exploring our Kashmir journeys.
          </p>
          <div style={{ display: 'flex', gap: '15px', justifyContent: 'center' }}>
            <button
              className="button button-dark"
              onClick={() => {
                this.setState({ hasError: false });
                window.location.reload();
              }}
            >
              <RefreshCw size={15} /> Refresh page
            </button>
            <Link to="/" className="button button-outline" onClick={() => this.setState({ hasError: false })}>
              Return to home
            </Link>
          </div>
        </main>
      );
    }
    return this.props.children;
  }
}

function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      // Allow DOM to settle before querying anchor
      const timeoutId = setTimeout(() => {
        const targetElement = document.querySelector(hash);
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: 'smooth' });
        }
      }, 50);
      return () => clearTimeout(timeoutId);
    } else {
      window.scrollTo({ top: 0, behavior: 'auto' });
    }
  }, [pathname, hash]);

  return null;
}

function NotFound() {
  return (
    <main className="not-found container">
      <span className="eyebrow">404 · OFF THE MAP</span>
      <h1>That page took<br /><i>a different turn.</i></h1>
      <p>Let's get you back to somewhere beautiful.</p>
      <Link to="/" className="button button-dark">Back to home</Link>
    </main>
  );
}

export default function App() {
  const [enquiryOpen, setEnquiryOpen] = useState(false);
  const [enquiryPackage, setEnquiryPackage] = useState('');
  const [enquiryDate, setEnquiryDate] = useState('');
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const openEnquiry = useCallback((packageName = '', initialDate = '') => {
    setEnquiryPackage(packageName);
    setEnquiryDate(initialDate);
    setEnquiryOpen(true);
  }, []);

  const closeEnquiry = useCallback(() => {
    setEnquiryOpen(false);
  }, []);

  return (
    <ErrorBoundary>
      <ScrollToTop />
      <Header onEnquire={() => openEnquiry()} />
      <Routes>
        <Route path="/" element={<Home onEnquire={openEnquiry} />} />
        <Route path="/packages" element={<Packages onEnquire={openEnquiry} />} />
        <Route path="/packages/:slug" element={<PackageDetail onEnquire={openEnquiry} />} />
        <Route path="/destinations/:slug" element={<Destination onEnquire={openEnquiry} />} />
        <Route path="/travel-guides/:slug" element={<TravelGuideDetail onEnquire={openEnquiry} />} />
        <Route path="/about" element={<About onEnquire={openEnquiry} />} />
        <Route path="/services" element={<Services onEnquire={openEnquiry} />} />
        <Route path="/contact" element={<Contact onEnquire={openEnquiry} />} />
        <Route path="/privacy" element={<Legal page="privacy" />} />
        <Route path="/terms" element={<Legal page="terms" />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer onEnquire={() => openEnquiry()} />

      <a
        className="floating-whatsapp"
        href={`https://wa.me/${brand.whatsapp}?text=${encodeURIComponent(`Hello ${brand.name}! I would like to enquire about traveling to Kashmir.`)}`}
        target="_blank"
        rel="noreferrer"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle size={21} />
        <span>Chat with us</span>
      </a>

      {showScrollTop && (
        <button
          className="back-to-top"
          aria-label="Back to top"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <ArrowUp size={17} />
        </button>
      )}

      <EnquiryModal
        open={enquiryOpen}
        onClose={closeEnquiry}
        initialPackage={enquiryPackage}
        initialDate={enquiryDate}
      />
    </ErrorBoundary>
  );
}
