export default function Faq({ items }: { items: Array<[string, string]> }) {
  return (
    <div className="faq-list">
      {items.map(([q, a]) => (
        <details key={q} className="faq-item">
          <summary>{q}</summary>
          <p>{a}</p>
        </details>
      ))}
    </div>
  );
}
