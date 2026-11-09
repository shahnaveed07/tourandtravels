import { Link } from 'react-router-dom';
import { ArrowUpRight, Clock3, MapPin } from 'lucide-react';

export default function PackageCard({ item, onEnquire, compact = false }) {
  return (
    <article className={`package-card${compact ? ' compact' : ''}`}>
      <Link to={`/packages/${item.slug}`} className="package-image-wrap">
        <img
          src={item.image}
          alt={`${item.title} tour scenery`}
          loading="lazy"
          onError={(e) => {
            e.currentTarget.src = 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=85';
          }}
        />
        {item.tag && <span className="image-tag">{item.tag}</span>}
        <span className="image-arrow"><ArrowUpRight size={18}/></span>
      </Link>
      <div className="package-card-content">
        <div className="package-meta"><span><Clock3 size={13}/>{item.nights} / {item.duration}</span><span>{item.type}</span></div>
        <h3><Link to={`/packages/${item.slug}`}>{item.title}</Link></h3>
        <p className="package-locations"><MapPin size={14}/>{item.locations.join(' · ')}</p>
        {!compact && <p className="package-summary">{item.summary}</p>}
        <div className="package-card-bottom"><div><small>Sample price from</small><strong>{item.price}<em> / person</em></strong></div><div className="package-actions"><Link className="text-link" to={`/packages/${item.slug}`}>View trip <ArrowUpRight size={14}/></Link><button className="icon-enquire" onClick={() => onEnquire(item.title)} aria-label={`Enquire about ${item.title}`}><ArrowUpRight size={17}/></button></div></div>
      </div>
    </article>
  );
}
