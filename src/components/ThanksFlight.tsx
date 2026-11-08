import { useCallback, useEffect, useRef, useState } from 'react';
import { Booster } from './Booster';

export const PAPER_SECONDS = 5;      // how long the paper stays up
const FLIGHT_MS = 1500;              // flight + unfurl, before the paper's countdown starts

export interface Flight { text: string; name: string; from: { x: number; y: number } | null }

/**
 * After a payment: the character lifts off from the button, swoops to the middle of the screen and
 * unrolls his note — a thank-you paper that closes by itself after {@link PAPER_SECONDS} seconds
 * (or sooner on click / Esc). With reduced-motion on, the paper simply appears.
 */
export function ThanksFlight({ flight, onClose }: { flight: Flight; onClose: () => void }) {
  const [closing, setClosing] = useState(false);
  const reduce = typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
  const [thumbs, setThumbs] = useState<boolean>(!!reduce);   // he arrives, then gives the thumbs-up
  const closeBtn = useRef<HTMLButtonElement>(null);
  const timers = useRef<number[]>([]);

  const close = useCallback(() => {
    setClosing(c => {
      if (!c) timers.current.push(window.setTimeout(onClose, reduce ? 0 : 450));
      return true;
    });
  }, [onClose, reduce]);

  useEffect(() => {
    timers.current.push(window.setTimeout(close, (reduce ? 0 : FLIGHT_MS) + PAPER_SECONDS * 1000));
    if (!reduce) timers.current.push(window.setTimeout(() => setThumbs(true), FLIGHT_MS - 150));
    closeBtn.current?.focus();
    const key = (e: KeyboardEvent) => { if (e.key === 'Escape') close(); };
    document.addEventListener('keydown', key);
    return () => { timers.current.forEach(clearTimeout); document.removeEventListener('keydown', key); };
  }, [close, reduce]);

  // Where the flyer starts (the button) and where it ends (above the paper), as offsets.
  const vw = window.innerWidth, vh = window.innerHeight;
  const from = flight.from ?? { x: vw / 2, y: vh - 60 };
  const dx = vw / 2 - from.x, dy = Math.max(70, vh / 2 - 190) - from.y;

  return (
    <div className={'flight' + (closing ? ' closing' : '') + (reduce ? ' still' : '')} role="dialog" aria-modal="true" aria-label="Thank you" onClick={close}>
      <div className="flight-dim" />
      <div className="hearts" aria-hidden="true">{[...Array(7)].map((_, i) => <span key={i} style={{ left: `${10 + i * 13}%`, animationDelay: `${0.9 + i * 0.17}s` }}>❤️</span>)}</div>

      <div className="flyer" style={{ left: from.x, top: from.y, ['--dx' as string]: `${dx}px`, ['--dy' as string]: `${dy}px` }}>
        <Booster pose={thumbs ? 'thumbs' : 'fly'} />
      </div>

      <div className="paper" onClick={e => e.stopPropagation()}>
        <h2>Thank you{flight.name ? `, ${flight.name}` : ''}!</h2>
        <p>{flight.text}</p>
        <p className="sign">— Arun, YouScript ❤️</p>
        <div className="paper-foot">
          <div className="timer" style={{ animationDelay: `${reduce ? 0 : FLIGHT_MS}ms`, animationDuration: `${PAPER_SECONDS}s` }} />
          <button ref={closeBtn} className="paper-close" onClick={close}>Close</button>
        </div>
      </div>
    </div>
  );
}
