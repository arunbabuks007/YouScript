/**
 * The boost mascot: the boy with the jet pack (public/img/boosty-boy.png, background removed) who sits
 * on the Buy-me-a-boost button. He sways, leans in on hover, hops while a payment is being prepared and —
 * in the "fly" pose — rockets off from his two jet tanks holding a rolled-up thank-you note.
 * Pure <img> + SVG + CSS (see .booster in styles.css).
 */
export type Pose = 'sit' | 'stand' | 'fly' | 'thumbs';

/** One picture per pose (natural size in px). A new pose = a file here + its size in styles.css. */
const IMAGE: Record<Pose, { src: string; w: number; h: number }> = {
  sit:    { src: '/img/boosty-boy.png',        w: 268, h: 420 },   // on the button, waiting
  stand:  { src: '/img/boosty-boy-stand.png',  w: 170, h: 463 },   // up on his feet while the payment is prepared (and on the 404 page)
  fly:    { src: '/img/boosty-boy-fly.png',    w: 241, h: 364 },   // rocketing off after payment (flames are part of the picture)
  thumbs: { src: '/img/boosty-boy-thumbs.png', w: 267, h: 417 },   // thank-you
};

function Flame({ side }: { side: 'l' | 'r' }) {
  return (
    <svg className={`flame fl-${side}`} viewBox="0 0 30 64" focusable="false">
      <defs>
        <linearGradient id={`bo-flame-${side}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffffff" /><stop offset=".18" stopColor="#7dd3fc" /><stop offset=".5" stopColor="#38bdf8" /><stop offset=".8" stopColor="#6366f1" stopOpacity=".7" /><stop offset="1" stopColor="#a855f7" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d="M15 0c-12 14-13 34 0 62 13-28 12-48 0-62z" fill={`url(#bo-flame-${side})`} />
    </svg>
  );
}

export function Booster({ pose, busy = false, inline = false }: { pose: Pose; busy?: boolean; inline?: boolean }) {
  const img = IMAGE[pose];
  return (
    <div className={`booster ${pose}${busy ? ' busy' : ''}${inline ? ' inline' : ''}`} aria-hidden="true">
      <div className="rig">
        <Flame side="l" />
        <Flame side="r" />
        <img className="mascot" key={pose} src={img.src} alt="" width={img.w} height={img.h} draggable={false} />
      </div>
      <svg className="note" viewBox="0 0 60 24" focusable="false">
        <rect x="2" y="4" width="50" height="16" rx="8" fill="#fff7e0" stroke="#e7c872" strokeWidth="2" />
        <circle cx="52" cy="12" r="6" fill="#fde9a8" stroke="#e7c872" strokeWidth="2" />
        <path d="M12 12h26" stroke="#e7c872" strokeWidth="2" strokeLinecap="round" />
        <path d="M21 4v16" stroke="#ef4444" strokeWidth="3" />
      </svg>
    </div>
  );
}
