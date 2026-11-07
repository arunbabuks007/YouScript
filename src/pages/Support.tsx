import { Link } from 'react-router-dom';
import { CONTACT_EMAIL, STORE_URL, SUPPORT_MAIL, VERSION } from '../config';
import { Icon } from '../components/Icon';

export function Support() {
  return (
    <>
      <section className="doc-hero">
        <div className="wrap center">
          <span className="pill"><Icon name="pulse" size={14} /> Help &amp; troubleshooting</span>
          <h1>YouScript isn’t showing a transcript?</h1>
          <p className="lead">Most problems are fixed in a minute. Start at the top.</p>
        </div>
      </section>

      <div className="wrap doc">
        <section id="quick">
          <h2>1. Quick fixes</h2>
          <ol>
            <li><strong>Refresh the YouTube page.</strong> A tab that was open before YouScript was installed or updated needs one reload.</li>
            <li><strong>Wait a few seconds.</strong> The card says “Reading…” while it collects the transcript. On a slow connection or while an ad is playing it can take longer.</li>
            <li><strong>Press “Try again”.</strong> If the card says it could not read the transcript yet, that button reads it again.</li>
            <li><strong>Check you are on a video page.</strong> The card appears on <code>youtube.com/watch</code> pages, not on the home page, search results or Shorts.</li>
            <li><strong>Disable other transcript extensions.</strong> Two extensions working on the same page can get in each other’s way.</li>
            <li><strong>Restart the browser,</strong> or disable and re-enable YouScript on <code>chrome://extensions</code>.</li>
          </ol>
        </section>

        <section id="none">
          <h2>2. “This video has no transcript”</h2>
          <p>YouScript shows the transcript YouTube has for the video. If YouTube has none, there is nothing to show. That happens when:</p>
          <ul>
            <li>the creator turned captions off,</li>
            <li>the video was just uploaded and YouTube has not generated automatic captions yet (try again in a few hours),</li>
            <li>the video has no speech, such as music or silent footage, or</li>
            <li>YouTube does not generate captions for the language spoken.</li>
          </ul>
          <p>To check, look at the video’s own “Show transcript” button under the description. If YouTube does not offer one either, neither can YouScript.</p>
        </section>

        <section id="language">
          <h2>3. The Language menu</h2>
          <ul>
            <li><strong>No Language menu?</strong> It only appears when the video has more than one caption language or YouTube offers a translation. A video with a single caption track and no translation shows nothing to choose.</li>
            <li><strong>“Could not load that language”?</strong> Press the same language again. If it keeps failing, reload the page and try once more; YouTube sometimes needs a moment after a video starts.</li>
            <li><strong>The translation reads oddly?</strong> It is YouTube’s automatic translation, the same as the one in YouTube’s own subtitle menu. Names, slang and songs are the hardest for it.</li>
          </ul>
        </section>

        <section id="contact">
          <h2>4. Still stuck? Email me</h2>
          <p>When the card could not read a transcript it shows a <strong>Copy details</strong> button. Press it and paste the result into your email: it is a short technical report with no personal information. It also helps if you include:</p>
          <ul>
            <li>the link to a video where it happens,</li>
            <li>what you expected and what you see instead,</li>
            <li>your browser and version (for example Chrome 130),</li>
            <li>the YouScript version: <strong>{VERSION}</strong>.</li>
          </ul>
          <div className="contact">
            <div className="c-ico" aria-hidden="true"><Icon name="mail" size={26} /></div>
            <div>
              <h3>Developer contact</h3>
              <p>Email: <a href={SUPPORT_MAIL}>{CONTACT_EMAIL}</a></p>
              <p className="muted">I aim to reply within a few days.</p>
            </div>
          </div>
        </section>

        <section id="faq">
          <h2>Good to know</h2>
          <ul>
            <li><strong>Settings missing on another computer?</strong> The three settings follow your Chrome profile if Chrome sync is on.</li>
            <li><strong>Want the card out of the way?</strong> Press the arrow at its top right to collapse it. It stays collapsed until you open it again.</li>
            <li><strong>Leaving a review</strong> on the <a href={STORE_URL} target="_blank" rel="noopener">Chrome Web Store</a> helps other people find YouScript.</li>
          </ul>
          <p style={{ marginTop: 18 }}><Link className="btn btn-ghost" to="/privacy">Privacy policy <Icon name="arrow" size={18} /></Link></p>
        </section>
      </div>
    </>
  );
}
