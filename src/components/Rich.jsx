/* ═══════════════════════════════════════════════════════════
   RICH — inline emphasis for body copy

   Long paragraphs on a dark background get skimmed, not read.
   Marking the two or three phrases that carry the argument gives
   a scanning reader an entry point, and gives the eye somewhere
   to land between lines.

   Copy in the data files marks emphasis with **double asterisks**,
   so the writing stays readable as plain text and the styling
   decision lives here rather than being baked into every string.

   Two levels:
     **strong**   → highlighted, carries the point
     __quiet__    → de-emphasised aside, reads as a whisper
   ═══════════════════════════════════════════════════════════ */

const TOKEN = /(\*\*[^*]+\*\*|__[^_]+__)/g;

export function richParts(text) {
  return String(text ?? '').split(TOKEN).filter(Boolean);
}

export default function Rich({ text, children, as: Tag = 'span', style = {}, className = '' }) {
  const source = text ?? children ?? '';

  /* Nothing to parse — render straight through so the common
     case allocates no extra nodes. */
  if (typeof source !== 'string') return <Tag style={style} className={className}>{source}</Tag>;

  const parts = richParts(source);

  return (
    <Tag style={style} className={className}>
      {parts.map((part, i) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return <mark key={i} className="mc-hl">{part.slice(2, -2)}</mark>;
        }
        if (part.startsWith('__') && part.endsWith('__')) {
          return <span key={i} className="mc-quiet">{part.slice(2, -2)}</span>;
        }
        return part;
      })}
    </Tag>
  );
}

/** Strips the markers — for alt text, meta descriptions and schema. */
export function plain(text) {
  return String(text ?? '').replace(/\*\*|__/g, '');
}

/* ─── Paragraph stack ─────────────────────────────────────
   Copy in the data files is authored as an array when it needs
   more than one paragraph. Passing a plain string still works,
   so older entries render unchanged.
───────────────────────────────────────────────────────── */
export function Paragraphs({ text, style = {}, gap = '20px', className = '' }) {
  const items = Array.isArray(text) ? text : [text];
  return (
    <div className={className} style={{ display: 'flex', flexDirection: 'column', gap }}>
      {items.filter(Boolean).map((t, i) => (
        <Rich key={i} as="p" text={t} style={style} />
      ))}
    </div>
  );
}
