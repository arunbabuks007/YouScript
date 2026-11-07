import { useEffect, useState } from 'react';
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';
import { CONTACT_EMAIL, ROUTES, STORE_URL, SUPPORT_MAIL } from '../config';
import { Icon } from './Icon';

/** Sets the tab title + description on client-side navigation (the pre-rendered HTML already carries them). */
function usePageMeta() {
  const { pathname } = useLocation();
  useEffect(() => {
    const meta = ROUTES.find(r => r.path === pathname) ?? ROUTES[0];
    document.title = meta.title;
    document.querySelector('meta[name="description"]')?.setAttribute('content', meta.description);
  }, [pathname]);
}

/** New page → top; a #hash link → that section. */
function useScrollReset() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.slice(1));
      if (el) { el.scrollIntoView({ behavior: 'smooth', block: 'start' }); return; }
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);
}

export function Layout() {
  usePageMeta();
  useScrollReset();
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  useEffect(() => setOpen(false), [pathname]);

  return (
    <>
      <header className="nav">
        <div className="wrap nav-in">
          <Link to="/" className="brand" aria-label="YouScript home">
            <img src="/favicon.png" alt="" width="36" height="36" />
            <span>You<b>Script</b></span>
          </Link>
          <nav className={'links' + (open ? ' open' : '')} aria-label="Main">
            <NavLink to="/features">Features</NavLink>
            <Link to="/#how">How it works</Link>
            <Link to="/#faq">FAQ</Link>
            <NavLink to="/support">Help</NavLink>
            <NavLink to="/privacy">Privacy</NavLink>
            <a className="btn btn-primary btn-sm" href={STORE_URL} target="_blank" rel="noopener">
              <Icon name="chrome" size={16} /> Add to Chrome
            </a>
          </nav>
          <button className="burger" aria-label="Menu" aria-expanded={open} onClick={() => setOpen(o => !o)}>
            <Icon name={open ? 'x' : 'menu'} />
          </button>
        </div>
      </header>

      <main><Outlet /></main>

      <footer className="foot">
        <div className="wrap foot-in">
          <div>
            <div className="brand"><img src="/favicon.png" alt="" width="32" height="32" /><span>You<b>Script</b></span></div>
            <p className="muted" style={{ marginTop: 10, maxWidth: 340 }}>Read, search and download the transcript of any YouTube video. Free, private, no AI.</p>
          </div>
          <div className="foot-cols">
            <div>
              <h4>Product</h4>
              <Link to="/features">All features</Link>
              <Link to="/#how">How it works</Link>
              <Link to="/#faq">FAQ</Link>
            </div>
            <div>
              <h4>Legal &amp; help</h4>
              <Link to="/privacy">Privacy policy</Link>
              <Link to="/support">Help &amp; troubleshooting</Link>
              <a href={`mailto:${CONTACT_EMAIL}`}>Contact</a>
            </div>
            <div>
              <h4>Get it</h4>
              <a href={STORE_URL} target="_blank" rel="noopener">Chrome Web Store</a>
              <a href={SUPPORT_MAIL}>Report a bug</a>
            </div>
          </div>
        </div>
        <div className="wrap foot-bottom">
          <span>© {new Date().getFullYear()} YouScript. All rights reserved.</span>
          <span>YouScript is an independent extension, not affiliated with or endorsed by YouTube or Google LLC. YouTube is a trademark of Google LLC.</span>
        </div>
      </footer>
    </>
  );
}
