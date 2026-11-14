import { Link } from 'react-router-dom';
import { STORE_URL } from '../config';
import { Icon } from '../components/Icon';

interface Section { id: string; title: string; intro: string; items: string[]; }

const SECTIONS: Section[] = [
  {
    id: 'reading', title: 'Reading the transcript',
    intro: 'The card sits at the top of the sidebar on every watch page.',
    items: [
      'Loads automatically when a video opens (you can turn this off and press “Load transcript” instead)',
      'Shows every line with its timestamp, in the order it is spoken',
      'Shows how many lines the transcript has',
      'Highlights the line being spoken and scrolls with the video',
      'Pauses auto-scroll while you scroll yourself, then resumes',
      'Collapses to a single bar when you do not need it',
      'Follows you from video to video without a page reload',
      'Says so plainly when a video has no transcript',
    ],
  },
  {
    id: 'chapters', title: 'Video chapters',
    intro: 'Browse sections visually with preview thumbnails.',
    items: [
      'Automatic chapter detection from YouTube markers and descriptions',
      'Preview thumbnails for every chapter with duration markers',
      'Click any chapter to jump directly to that part of the video',
      'Highlights the currently playing chapter as you watch',
      'Easy tab switching between Transcript and Chapters',
      'Can be toggled on or off anytime in Settings',
    ],
  },
  {
    id: 'finding', title: 'Finding things',
    intro: 'Skip to the part you care about.',
    items: [
      'Search box that filters the lines as you type',
      'Every word you type must match, in any order',
      'Ignores capital letters and accents',
      'Shows “3 of 120 lines” while searching',
      'Click a line, or its timestamp, to jump the video there',
      'Jumping also resumes playback if the video was paused',
    ],
  },
  {
    id: 'languages', title: 'Languages',
    intro: 'The Language menu lists what YouTube itself offers for that video.',
    items: [
      'The video’s own caption languages, by name (for example “English”, “German (Germany)”)',
      'Automatic captions, listed as “auto-generated”',
      'Around 150 more languages under “Translated by YouTube”',
      'Same timestamps in every language',
      '“Original” switches straight back',
      'Search, copy and download all use the language you are viewing',
      'Hidden when the video offers only one language',
    ],
  },
  {
    id: 'saving', title: 'Copying and saving',
    intro: 'Get the text out of YouTube and into your own tools.',
    items: [
      'Copy the whole transcript with one click',
      'Timestamps on or off, for plain notes or for reference',
      '.txt download: plain text, named after the video',
      '.srt download: subtitle file with start and end times, ready for a player or editor',
      'Works with whichever language you are viewing',
    ],
  },
  {
    id: 'look', title: 'Look and feel',
    intro: 'It should look like part of YouTube.',
    items: [
      'Follows YouTube’s light and dark theme',
      'Sits in the sidebar, above the recommended videos',
      'Built with plain text only, so nothing from a video can change how the card looks or behaves',
      'Works in the default layout, and when the page is narrow',
    ],
  },
  {
    id: 'privacy', title: 'Privacy',
    intro: 'The short version: it does not talk to anyone but YouTube.',
    items: [
      'No account and no sign-in',
      'No server of ours, no analytics, no tracking',
      'No AI service: nothing you watch is sent for processing',
      'No remote code: everything that runs is inside the installed extension',
      'Three settings, stored by your browser',
    ],
  },
];

export function Features() {
  return (
    <>
      <section className="doc-hero">
        <div className="wrap center">
          <span className="pill"><Icon name="panel" size={14} /> One card, everything about the transcript</span>
          <h1>Every YouScript feature</h1>
          <p className="lead">YouScript does one thing and does it properly. Here is everything it can do.</p>
          <p style={{ marginTop: 22 }}><a className="btn btn-primary" href={STORE_URL} target="_blank" rel="noopener"><Icon name="chrome" size={18} /> Add to Chrome — it’s free</a></p>
        </div>
      </section>

      <div className="wrap doc wide">
        <nav className="toc" aria-label="On this page">
          <h2>On this page</h2>
          <ol className="toc-grid">
            {SECTIONS.map(s => <li key={s.id}><a href={'#' + s.id}>{s.title}</a></li>)}
            <li><a href="#settings">Settings</a></li>
          </ol>
        </nav>

        {SECTIONS.map(s => (
          <section key={s.id} id={s.id}>
            <h2>{s.title}</h2>
            <p>{s.intro}</p>
            <ul>{s.items.map(i => <li key={i}>{i}</li>)}</ul>
          </section>
        ))}

        <section id="settings">
          <h2>Settings</h2>
          <p>Click the YouScript icon in Chrome’s toolbar. Customize your experience, and changes reach open YouTube tabs straight away.</p>
          <div className="core-grid">
            <article className="card"><h3>Load the transcript automatically</h3><p className="muted">On by default. Turn it off to load only when you press the button.</p></article>
            <article className="card"><h3>Show timestamps</h3><p className="muted">On by default. Also switchable from the card itself.</p></article>
            <article className="card"><h3>Follow the video while it plays</h3><p className="muted">On by default. Highlights the current line and scrolls to it.</p></article>
            <article className="card"><h3>Show chapters</h3><p className="muted">On by default. Shows video chapters with preview thumbnails when available.</p></article>
            <article className="card"><h3>Default language</h3><p className="muted">Pick your preferred language from a searchable list to auto-translate transcripts.</p></article>
          </div>
          <p style={{ marginTop: 22 }}><Link className="btn btn-ghost" to="/support">Need help? <Icon name="arrow" size={18} /></Link></p>
        </section>
      </div>
    </>
  );
}
