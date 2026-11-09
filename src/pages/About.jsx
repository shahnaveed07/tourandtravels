import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Compass, HeartHandshake, Leaf, Sparkles } from 'lucide-react';
import { siteImages } from '../imageCatalog.js';

export default function About({ onEnquire }) {
  useEffect(() => {
    document.title = 'About Us — Brand Identity Tour & Travel';
  }, []);

  return (
    <main className="inner-page">
      <section className="inner-hero about-hero">
        <div className="container inner-hero-content">
          <div className="breadcrumbs"><Link to="/">Home</Link><span>/</span><span>About us</span></div>
          <span className="eyebrow">A LOCAL POINT OF VIEW. A PERSONAL WAY TO TRAVEL.</span>
          <h1>We believe the<br/><i>journey is yours.</i></h1>
          <p>Good travel begins with listening. The rest is thoughtful planning, local understanding and room for the moments you didn't plan.</p>
        </div>
      </section>

      <section className="section about-story">
        <div className="container about-story-grid">
          <div className="about-story-image">
            <img
              src={siteImages.company.storefront}
              alt="Brand Identity Tour & Travel storefront at Bismillah Market, Sopore"
              loading="lazy"
            />
            <span>OUR HEAD OFFICE IN SOPORE</span>
          </div>
          <div>
            <span className="eyebrow">OUR STORY</span>
            <h2>Rooted in the place.<br/><i>Open to the world.</i></h2>
            <p>Headquartered at Bismillah Market in Sopore (Baramulla, Jammu & Kashmir), Brand Identity Tour & Travel brings together destination discovery, boutique stay planning, reliable transport, and attentive on-trip coordination under one roof.</p>
            <p>Our approach is simple: understand what matters to each traveller, create a practical route and make the moving parts feel connected. Every journey should have enough structure to feel easy and enough freedom to feel personal.</p>
            <p className="about-signature">The Brand Identity team</p>
            <button className="text-link" onClick={() => onEnquire()}>Start a conversation <ArrowUpRight size={15}/></button>
          </div>
        </div>

        <div className="container company-spaces-grid">
          <figure className="company-space-card">
            <img
              src={siteImages.company.office}
              alt="Brand Identity Tour & Travel reception and traveller lounge"
              loading="lazy"
            />
            <figcaption>
              <small>SOPORE RECEPTION</small>
              <strong>Welcoming travellers in person</strong>
            </figcaption>
          </figure>
          <figure className="company-space-card">
            <img
              src={siteImages.company.meetingRoom}
              alt="Brand Identity Tour & Travel itinerary planning room"
              loading="lazy"
            />
            <figcaption>
              <small>ITINERARY CONSULTATION ROOM</small>
              <strong>Tailoring routes around your pace</strong>
            </figcaption>
          </figure>
        </div>
      </section>

      <section className="section values-section">
        <div className="container">
          <div className="section-heading">
            <div>
              <span className="eyebrow">WHAT GUIDES US</span>
              <h2>Good travel has<br/><i>a few essentials.</i></h2>
            </div>
          </div>
          <div className="values-grid">
            <article><Compass size={24}/><span>01</span><h3>Local perspective</h3><p>Understand the place, respect the pace and plan with context.</p></article>
            <article><HeartHandshake size={24}/><span>02</span><h3>Personal attention</h3><p>Make room for the people, priorities and small details in every trip.</p></article>
            <article><Leaf size={24}/><span>03</span><h3>Considered choices</h3><p>Travel thoughtfully, with clear expectations and practical decisions.</p></article>
            <article><Sparkles size={24}/><span>04</span><h3>Memorable moments</h3><p>Build journeys that leave space for discovery, wonder and rest.</p></article>
          </div>
        </div>
      </section>

      <section className="section catalog-showcase-section">
        <div className="container">
          <div className="section-heading">
            <div>
              <span className="eyebrow">KASHMIR HERITAGE & VALLEY MOMENTS</span>
              <h2>The craft, culture & <i>landscapes</i> we share.</h2>
              <p>From saffron orchards and Pashmina looms to quiet wooden bridges and alpine streams across the valley.</p>
            </div>
          </div>
          <div className="culture-gallery-grid">
            {[...siteImages.culture.slice(0, 4), ...siteImages.gallery.slice(0, 4)].map((item) => (
              <figure className="culture-gallery-item" key={item.src}>
                <img src={item.src} alt={item.alt} loading="lazy" />
                <figcaption>{item.alt}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="about-quote">
        <div className="container">
          <span className="eyebrow">A THOUGHT TO TRAVEL WITH</span>
          <blockquote>“The best itinerary is not the one that fits the most in. It's the one that feels right.”</blockquote>
          <span className="quote-rule"/>
        </div>
      </section>

      <section className="final-cta">
        <div className="container final-cta-inner">
          <div>
            <span className="eyebrow">LET'S MAKE A START</span>
            <h2>Your next story<br/><i>starts somewhere.</i></h2>
            <p>Tell us what kind of journey you have in mind.</p>
          </div>
          <button className="button button-light" onClick={() => onEnquire()}>Plan with us <ArrowUpRight size={16}/></button>
        </div>
      </section>
    </main>
  );
}
