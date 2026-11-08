import { Link } from 'react-router-dom';
import { FAQS, FEATURES, STATS } from '../data';
import { STORE_URL, img } from '../config';
import { Icon } from '../components/Icon';

function Browser({ src, alt, label }: { src: string; alt: string; label?: string }) {
  return (
    <figure className="frame">
      <div className="frame-bar"><i /><i /><i />{label && <span>{label}</span>}</div>
      <img src={src} alt={alt} width={1200} height={752} loading="lazy" />
    </figure>
  );
}

function Pop({ src, alt, w = 420, h = 637 }: { src: string; alt: string; w?: number; h?: number }) {
  return (
    <figure className="pop">
      <img src={src} alt={alt} width={w} height={h} loading="lazy" />
    </figure>
  );
}

function Showcase({ flip, kicker, title, text, points, img, alt, w, h }: {
  flip?: boolean; kicker: string; title: string; text: string; points: string[]; img: string; alt: string; w?: number; h?: number;
}) {
  return (
    <section className={'show wrap' + (flip ? ' flip' : '')}>
      <div className="show-text">
        <span className="kicker">{kicker}</span>
        <h2>{title}</h2>
        <p className="lead">{text}</p>
        <ul className="ticks">
          {points.map(p => <li key={p}><Icon name="check" size={18} />{p}</li>)}
        </ul>
      </div>
      <Pop src={img} alt={alt} w={w} h={h} />
    </section>
  );
}

export function Home() {
  return (
    <>
      {/* ── hero ── */}
      <section className="hero">
        <div className="glow" aria-hidden="true" />
        <div className="wrap hero-in">
          <img className="hero-logo" src="/logo-512.png" alt="YouScript – YouTube Transcript" width="132" height="132" />
          <span className="pill"><Icon name="lock" size={14} /> Free · No account · No AI · 100% private</span>
          <h1>Every YouTube video, <span className="grad">in words.</span></h1>
          <p className="hero-sub">
            YouScript shows the full transcript right beside the video. Search it, click any line to jump there,
            copy it, download it, or read it in the language you want.
          </p>
          <div className="cta">
            <a className="btn btn-primary btn-lg" href={STORE_URL} target="_blank" rel="noopener"><Icon name="chrome" size={20} /> Add to Chrome — it’s free</a>
            <Link className="btn btn-ghost btn-lg" to="/#features">See what it does <Icon name="arrow" size={18} /></Link>
          </div>
          <ul className="trust">
            {STATS.map(s => <li key={s.label}><strong>{s.value}</strong> {s.label}</li>)}
          </ul>
          <div className="hero-visual">
            <Browser src={img('watch.jpg')} alt="A YouTube video with the YouScript transcript card in the sidebar, showing timestamps and lyrics" label="YouTube with YouScript" />
            <figure className="pop hero-pop"><img src={img('card.jpg')} alt="The YouScript card: a language menu, a search box, Copy, .txt and .srt buttons and the timestamped transcript" width={420} height={637} /></figure>
          </div>
        </div>
      </section>

      {/* ── how it works ── */}
      <section id="how" className="section wrap">
        <div className="center">
          <span className="kicker">How it works</span>
          <h2>Install it. Open a video. That’s it.</h2>
        </div>
        <ol className="steps">
          <li><span className="num">1</span><h3>Add it to Chrome</h3><p>One click from the Chrome Web Store. There is nothing to sign up for or set up.</p></li>
          <li><span className="num">2</span><h3>Open any video</h3><p>The YouScript card appears at the top of the sidebar and the transcript fills in by itself within a few seconds.</p></li>
          <li><span className="num">3</span><h3>Use it</h3><p>Search, click a line to jump, switch the language, copy or download. Collapse the card when you are done.</p></li>
        </ol>
      </section>

      {/* ── features ── */}
      <section id="features" className="section wrap">
        <div className="center">
          <span className="kicker">What you get</span>
          <h2>A transcript that is actually useful</h2>
          <p className="lead">Reading is faster than watching. YouScript turns any video into something you can skim, search and keep.</p>
        </div>
        <div className="grid">
          {FEATURES.map(f => (
            <article className="card" key={f.title}>
              <div className="ico"><Icon name={f.icon} /></div>
              <h3>{f.title}</h3>
              <p>{f.text}</p>
            </article>
          ))}
        </div>
        <p className="center" style={{ marginTop: 28 }}><Link className="btn btn-ghost" to="/features">See every feature <Icon name="arrow" size={18} /></Link></p>
      </section>

      {/* ── showcases ── */}
      <Showcase
        kicker="Find the moment" title="Remember a word? Find the minute."
        text="Type any word from the video and the list shrinks to just the lines that contain it, each with its timestamp. Click one and you are there. No more scrubbing through an hour of video."
        points={['Ignores capital letters and accents', 'Shows how many lines matched', 'Click a line or its time to jump the video']}
        img={img('search.jpg')} alt="The YouScript card with “never gonna” typed in the search box and only the matching lines shown"
      />
      <Showcase flip
        kicker="Any language" title="Read it in the language you think in."
        text="Open the Language menu and you will see the video’s own caption languages, plus every language YouTube can translate them into. Choose one and the transcript changes, timestamps and all."
        points={['The video’s own caption tracks, listed by name', 'Around 150 more under “Translated by YouTube”', 'Copy and download use the language you are viewing']}
        img={img('languages.jpg')} alt="The YouScript card with the Language menu open, listing English, German, Japanese, Spanish and a long list of languages translated by YouTube"
      />
      <Showcase
        kicker="Take it with you" title="Clean text, or real subtitles."
        text="Switch timestamps off for plain text you can paste straight into your notes. Or download an .srt subtitle file with proper start and end times for your video player or editor."
        points={['One-click copy, with or without timestamps', 'Download .txt or .srt', 'The file is named after the video']}
        img={img('plain.jpg')} alt="The YouScript card with timestamps turned off, showing clean transcript text"
      />
      <Showcase flip
        kicker="Your way" title="Three switches. That’s all the settings."
        text="YouScript does one thing, so it has almost nothing to configure: load the transcript automatically, show timestamps, and follow the video while it plays. Turn each on or off from the toolbar icon."
        points={['Auto-load the transcript when a video opens', 'Show or hide timestamps', 'Follow along as the video plays']}
        img={img('popup.png')} alt="The YouScript toolbar popup with three switches: load automatically, show timestamps and follow the video" w={340} h={330}
      />

      {/* ── no AI ── */}
      <section className="band">
        <div className="wrap band-in">
          <div className="ico big"><Icon name="shield" size={34} /></div>
          <div>
            <h2>YouTube’s captions. Nothing else.</h2>
            <p className="lead">YouScript does not use AI and has no server. The transcript is the one YouTube already has for the video, and other languages come from YouTube’s own translation. Nothing you watch is sent anywhere.</p>
          </div>
          <Link className="btn btn-ghost" to="/privacy">Read the privacy policy</Link>
        </div>
      </section>

      {/* ── faq ── */}
      <section id="faq" className="section wrap narrow">
        <div className="center">
          <span className="kicker">FAQ</span>
          <h2>Questions people ask</h2>
        </div>
        <div className="faq">
          {FAQS.map(f => (
            <details key={f.q}>
              <summary>{f.q}<Icon name="chevron" size={20} /></summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="section wrap">
        <div className="boost-cta">
          <div className="ico big"><Icon name="rocket" size={32} /></div>
          <div>
            <h2>Enjoying YouScript?</h2>
            <p>It’s free, and it will stay free. If it saved you some time, a small boost helps me keep improving it.</p>
          </div>
          <Link className="btn btn-primary btn-lg" to="/boost">Boost YouScript</Link>
        </div>
      </section>

      <section className="final">
        <div className="wrap center">
          <h2>Stop scrubbing. Start reading.</h2>
          <p className="lead" style={{ marginBottom: 26 }}>Add YouScript to Chrome and get the transcript of any YouTube video in a click.</p>
          <a className="btn btn-primary btn-lg" href={STORE_URL} target="_blank" rel="noopener"><Icon name="chrome" size={20} /> Add to Chrome — it’s free</a>
        </div>
      </section>
    </>
  );
}
