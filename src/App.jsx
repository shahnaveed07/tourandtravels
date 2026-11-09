import { useCallback, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import EnquiryModal from './components/EnquiryModal.jsx';
import Home from './pages/Home.jsx';
import Packages from './pages/Packages.jsx';
import PackageDetail from './pages/PackageDetail.jsx';
import Destination from './pages/Destination.jsx';
import About from './pages/About.jsx';
import Services from './pages/Services.jsx';
import Contact from './pages/Contact.jsx';
import Legal from './pages/Legal.jsx';
import { ArrowUp, MessageCircle } from 'lucide-react';
import { brand } from './data.js';
import { useEffect } from 'react';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'auto' }); }, [pathname]);
  return null;
}

function NotFound() {
  return <main className="not-found container"><span className="eyebrow">404 · OFF THE MAP</span><h1>That page took<br/><i>a different turn.</i></h1><p>Let's get you back to somewhere beautiful.</p><a href="/" className="button button-dark">Back to home</a></main>;
}

export default function App() {
  const [enquiryOpen, setEnquiryOpen] = useState(false);
  const [enquiryPackage, setEnquiryPackage] = useState('');
  const openEnquiry = useCallback((packageName = '') => { setEnquiryPackage(packageName); setEnquiryOpen(true); }, []);
  const closeEnquiry = useCallback(() => setEnquiryOpen(false), []);
  return <>
    <ScrollToTop />
    <Header onEnquire={() => openEnquiry()} />
    <Routes>
      <Route path="/" element={<Home onEnquire={openEnquiry}/>}/>
      <Route path="/packages" element={<Packages onEnquire={openEnquiry}/>}/>
      <Route path="/packages/:slug" element={<PackageDetail onEnquire={openEnquiry}/>}/>
      <Route path="/destinations/:slug" element={<Destination onEnquire={openEnquiry}/>}/>
      <Route path="/about" element={<About onEnquire={openEnquiry}/>}/>
      <Route path="/services" element={<Services onEnquire={openEnquiry}/>}/>
      <Route path="/contact" element={<Contact onEnquire={openEnquiry}/>}/>
      <Route path="/privacy" element={<Legal page="privacy"/>}/>
      <Route path="/terms" element={<Legal page="terms"/>}/>
      <Route path="*" element={<NotFound/>}/>
    </Routes>
    <Footer onEnquire={() => openEnquiry()}/>
    <a className="floating-whatsapp" href={`https://wa.me/${brand.whatsapp}`} target="_blank" rel="noreferrer" aria-label="Chat on WhatsApp"><MessageCircle size={21}/><span>Chat with us</span></a>
    <button className="back-to-top" aria-label="Back to top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}><ArrowUp size={17}/></button>
    <EnquiryModal open={enquiryOpen} onClose={closeEnquiry} initialPackage={enquiryPackage}/>
  </>;
}
