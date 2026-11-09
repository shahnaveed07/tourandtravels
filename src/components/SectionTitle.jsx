export default function SectionTitle({ eyebrow, title, text, align = 'left', light = false, action }) {
  return (
    <div className={`section-heading align-${align}${light ? ' light' : ''}`}>
      <div><span className="eyebrow">{eyebrow}</span><h2>{title}</h2>{text && <p>{text}</p>}</div>
      {action && <div className="section-heading-action">{action}</div>}
    </div>
  );
}
