import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { API_BASE, SUPPORT_MAIL } from '../config';
import { Icon } from '../components/Icon';
import { Booster } from '../components/Booster';
import { ThanksFlight, type Flight } from '../components/ThanksFlight';

const MIN = 20, MAX = 10000, TIERS = [49, 99, 249, 499];

interface RazorpayResponse { razorpay_order_id: string; razorpay_payment_id: string; razorpay_signature: string; }
interface RazorpayCtor { new (o: Record<string, unknown>): { open(): void; on(e: string, f: (r: { error?: { description?: string } }) => void): void }; }
declare global { interface Window { Razorpay?: RazorpayCtor } }

// The server sleeps when idle (free hosting), so the first call can take a while.
async function api<T>(path: string, body: unknown): Promise<T> {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), 75000);
  try {
    const r = await fetch(API_BASE + path, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body), signal: ctrl.signal });
    const j = await r.json().catch(() => ({}));
    if (!r.ok) throw new Error((j as { message?: string }).message || 'Something went wrong.');
    return j as T;
  } catch (e) {
    if ((e as Error).name === 'AbortError') throw new Error('The server took too long. Please try again.');
    throw e;
  } finally { clearTimeout(timer); }
}

function loadCheckout(): Promise<void> {
  if (window.Razorpay) return Promise.resolve();
  return new Promise((res, rej) => {
    const s = document.createElement('script');
    s.src = 'https://checkout.razorpay.com/v1/checkout.js';
    s.onload = () => res();
    s.onerror = () => rej(new Error('Could not load the payment window. Check your connection.'));
    document.head.appendChild(s);
  });
}

export function Boost() {
  const [amount, setAmount] = useState<number>(99);
  const [custom, setCustom] = useState('');
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<{ text: string; err?: boolean }>({ text: '' });
  const [flight, setFlight] = useState<Flight | null>(null);
  const sitter = useRef<HTMLDivElement>(null);

  const valid = Number.isInteger(amount) && amount >= MIN && amount <= MAX;
  const rupees = (n: number) => n.toLocaleString('en-IN');

  const pickTier = (v: number) => { setAmount(v); setCustom(''); };
  const onCustom = (v: string) => { setCustom(v); const n = parseInt(v, 10); setAmount(Number.isNaN(n) ? 0 : n); };

  async function start() {
    if (busy || !valid) return;
    setBusy(true); setMsg({ text: 'Preparing your payment…' });
    const wake = setTimeout(() => setMsg({ text: 'Waking the server up — this can take up to a minute the first time…' }), 4000);
    try {
      const [order] = await Promise.all([
        api<{ orderId: string; amount: number; currency: string; key: string }>('/api/boost/create-order', { amount, name, message, product: 'youscript' }),
        loadCheckout(),
      ]);
      clearTimeout(wake); setMsg({ text: '' });
      const rzp = new window.Razorpay!({
        key: order.key, amount: order.amount, currency: order.currency, order_id: order.orderId,
        name: 'YouScript', description: 'Boost YouScript', theme: { color: '#5b6cff' },
        handler: (resp: RazorpayResponse) => confirmPayment(resp),
        modal: { ondismiss: () => { setBusy(false); setMsg({ text: 'Payment cancelled — nothing was charged.' }); } },
      });
      rzp.on('payment.failed', f => { setBusy(false); setMsg({ text: f.error?.description || 'The payment failed. You have not been charged.', err: true }); });
      rzp.open();
    } catch (e) {
      clearTimeout(wake); setBusy(false); setMsg({ text: (e as Error).message, err: true });
    }
  }

  async function confirmPayment(resp: RazorpayResponse) {
    setMsg({ text: 'Confirming your payment…' });
    try {
      await api('/api/boost/verify', { razorpayOrderId: resp.razorpay_order_id, razorpayPaymentId: resp.razorpay_payment_id, razorpaySignature: resp.razorpay_signature });
      done(`Your ₹${rupees(amount)} boost has arrived. Thank you for supporting YouScript!`);
    } catch {
      // The money WAS taken, and Razorpay also notifies the server directly, so reassure rather than alarm.
      done('Your payment went through. If it takes a moment to show on my side, that is fine — thank you!');
    }
  }
  const done = (text: string) => {
    setBusy(false); setMsg({ text: '' });
    const r = sitter.current?.getBoundingClientRect();         // where he takes off from
    setFlight({ text, name: name.trim(), from: r ? { x: r.left + r.width / 2, y: r.top + r.height / 2 } : null });
  };
  const landed = () => { setFlight(null); setMsg({ text: '❤️ Thank you — your boost has arrived.' }); };

  return (
    <section className="boost-page">
      <div className="glow" aria-hidden="true" />
      <div className="boost-card">
        {flight && <ThanksFlight flight={flight} onClose={landed} />}
        {(
          <>
            <div className="ico big"><Icon name="rocket" size={30} /></div>
            <h1>Boost YouScript</h1>
            <p className="lead">YouScript is free. If it saved you some time, a small boost helps me keep making it better.</p>

            <label className="lab">Choose an amount</label>
            <div className="chips">
              {TIERS.map(v => (
                <button key={v} type="button" className={'chip' + (amount === v && !custom ? ' on' : '')} onClick={() => pickTier(v)}>₹{v}</button>
              ))}
            </div>
            <div className="amt">
              <span>₹</span>
              <input className="field" type="number" inputMode="numeric" min={MIN} max={MAX} step={1} value={custom}
                onChange={e => onCustom(e.target.value)} placeholder={`Or enter your own (${MIN} – ${rupees(MAX)})`} aria-label="Custom amount in rupees" />
            </div>

            <label className="lab" htmlFor="b-name">Your name <small>(optional)</small></label>
            <input id="b-name" className="field" maxLength={40} value={name} onChange={e => setName(e.target.value)} placeholder="e.g. Asha" />

            <label className="lab" htmlFor="b-msg">A message <small>(optional)</small></label>
            <textarea id="b-msg" className="field" maxLength={200} value={message} onChange={e => setMessage(e.target.value)} placeholder="What are you using YouScript for?" />
            <div className="count">{message.length}/200</div>

            <div className="pay-wrap">
              <div ref={sitter} className={'sitter' + (flight ? ' gone' : '')}><Booster pose={busy ? 'stand' : 'sit'} busy={busy} /></div>
              <button className="btn btn-primary btn-lg pay" disabled={busy || !valid} onClick={start}>
                {valid ? `Send a ₹${rupees(amount)} boost` : 'Choose an amount'}
              </button>
            </div>
            <div className={'msg' + (msg.err ? ' err' : '')} role="status" aria-live="polite">{msg.text}</div>

            <p className="fine">
              Payments are handled securely by Razorpay — YouScript never sees your card or UPI details. The amount and the optional name and
              message are stored so the boost can be recorded (see the <Link to="/privacy#data-storage">privacy policy</Link>).
              A boost is a voluntary tip and doesn’t unlock anything. Trouble with a payment? <a href={SUPPORT_MAIL} target="_blank" rel="noopener">Tell me here</a>.
            </p>
          </>
        )}
      </div>
    </section>
  );
}
