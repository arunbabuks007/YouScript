import { Link } from 'react-router-dom';

export function NotFound() {
  return (
    <section className="doc-hero">
      <div className="wrap center">
        <img src="/logo.png?v=3" alt="" width="84" height="84" style={{ margin: '0 auto 14px', borderRadius: 20 }} />
        <h1>Page not found</h1>
        <p className="lead">That page doesn’t exist. Unlike a video, there is no transcript for it either.</p>
        <p style={{ marginTop: 22 }}><Link className="btn btn-primary" to="/">Back to YouScript</Link></p>
      </div>
    </section>
  );
}
