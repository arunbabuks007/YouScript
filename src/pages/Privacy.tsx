import type { ReactNode } from 'react';
import { CONTACT_EMAIL, POLICY_UPDATED, STORE_URL, SUPPORT_MAIL } from '../config';

type Tone = 'green' | 'blue' | 'yellow';
const Box = ({ tone, title, children }: { tone: Tone; title: string; children: ReactNode }) => (
  <div className={`pbox ${tone}`}><div className="pbox-title">{title}</div>{children}</div>
);
const Tag = ({ local }: { local?: boolean }) => <span className={'tag' + (local ? ' local' : '')}>{local ? 'Browser only' : 'None'}</span>;

const PERMS: { name: ReactNode; why: ReactNode; local?: boolean }[] = [
  { name: 'host access: www.youtube.com', why: 'YouScript adds its card to YouTube’s video page and reads the transcript YouTube shows there. For the optional Language menu it asks YouTube’s own caption service for the lines in the language you pick. It runs only on www.youtube.com. It does not request access to any other website, your tabs or your browsing history.' },
  { name: 'storage', local: true, why: <>Saves your three display settings (load automatically, show timestamps, follow the video) with <code>chrome.storage.sync</code>, so Chrome can keep them in step across your devices if you use Chrome sync. The developer cannot see them.</> },
];

export function Privacy() {
  return (
    <>
      <section className="doc-hero">
        <div className="wrap center">
          <span className="pill"><span aria-hidden="true">🔒</span> No servers · No tracking · No analytics · No AI</span>
          <h1>Privacy Policy</h1>
          <p className="lead">YouScript – YouTube Transcript (Chrome extension)</p>
        </div>
      </section>

      <div className="wrap doc">
        <Box tone="blue" title="📅 Effective date">
          <p><strong>Last updated: {POLICY_UPDATED}.</strong> This policy applies to every version of the YouScript extension distributed through the Chrome Web Store, from version 1.0.0 onward.</p>
        </Box>

        <nav className="toc" aria-label="Table of contents">
          <h2>Table of contents</h2>
          <ol>
            <li><a href="#overview">Overview &amp; summary</a></li>
            <li><a href="#data-collected">What YouScript handles</a></li>
            <li><a href="#permissions">Permissions explained</a></li>
            <li><a href="#network">Network requests</a></li>
            <li><a href="#data-storage">How data is stored</a></li>
            <li><a href="#data-sharing">Data sharing &amp; third parties</a></li>
            <li><a href="#data-retention">Retention &amp; deletion</a></li>
            <li><a href="#children">Children’s privacy</a></li>
            <li><a href="#changes">Changes to this policy</a></li>
            <li><a href="#contact">Contact us</a></li>
          </ol>
        </nav>

        <section id="overview">
          <h2>1. Overview &amp; summary</h2>
          <Box tone="green" title="✅ Short version">
            <p>YouScript shows a YouTube video’s transcript inside your browser. <strong>I do not collect, transmit or sell any personal data, browsing history, page content or usage information. YouScript has no server to send it to, and it does not use any AI service.</strong></p>
          </Box>
          <p>YouScript (“the Extension”, “I”, “my”) is a Chrome extension that adds a card to youtube.com video pages. The card shows the transcript YouTube already has for the video and lets you search it, jump to a moment, switch its language, and copy or download it. It is built and maintained by an independent developer and is not affiliated with YouTube or Google LLC.</p>
        </section>

        <section id="data-collected">
          <h2>2. What YouScript handles</h2>
          <Box tone="green" title="📵 I do NOT collect">
            <p>Names, e-mail addresses, account or sign-in details, your YouTube watch history, search queries, the titles of videos you watch, cookies, passwords, payment details, location, device identifiers or any other personal or sensitive data.</p>
          </Box>
          <p>The only information the Extension ever works with is:</p>
          <ul>
            <li><strong>Your settings</strong> — three on/off choices: load the transcript automatically, show timestamps, follow the video while it plays.</li>
            <li><strong>The YouTube page you are looking at</strong> — the Extension reads the transcript lines and the list of caption languages that YouTube already shows or holds for the video you have open. This happens on your device and the text is shown in the card; it is not stored or sent to me.</li>
            <li><strong>Diagnostic reports</strong> — if the card cannot read a transcript it offers a “Copy details” button. The report lists element names, counts and the video’s id. It stays on your screen and in your clipboard if you press the button. It is sent to nobody unless you choose to paste it into an email to me.</li>
            <li><strong>Downloads</strong> — “.txt” and “.srt” save the transcript you are viewing to your own computer through the browser’s normal download. The file never passes through any server.</li>
          </ul>
          <Box tone="yellow" title="⚠️ Note">
            <p>If you turn on Chrome sync, Chrome itself may copy your three settings between your devices through your Google account. That is a Chrome feature governed by Google’s privacy policy; the developer of YouScript has no access to it.</p>
          </Box>
        </section>

        <section id="permissions">
          <h2>3. Permissions explained</h2>
          <p>YouScript asks for only the permissions below. Each is used exclusively for the feature described and not to collect data:</p>
          <div className="table-wrap">
            <table className="perm">
              <thead><tr><th>Permission</th><th>Why it is required</th><th>Data sent to the developer?</th></tr></thead>
              <tbody>
                {PERMS.map((p, i) => (
                  <tr key={i}><td className="pname">{p.name}</td><td>{p.why}</td><td><Tag local={p.local} /></td></tr>
                ))}
              </tbody>
            </table>
          </div>
          <p>YouScript does not use the <code>tabs</code>, <code>history</code>, <code>cookies</code>, <code>webRequest</code> or <code>&lt;all_urls&gt;</code> permissions, has no background service, and does not run on any site other than YouTube.</p>
        </section>

        <section id="network">
          <h2>4. Network requests</h2>
          <Box tone="blue" title="🌐 The extension itself contacts no server of mine">
            <p>The Extension has no backend and sends no data to the developer or to any analytics, advertising, AI or crash-reporting service. It loads no remote code: everything it runs is in the installed extension package.</p>
          </Box>
          <p>The only network requests it causes go to YouTube itself, from your own YouTube tab:</p>
          <ul>
            <li><strong>The language you choose.</strong> When you pick a language in the Language menu, the Extension asks YouTube’s caption service (<code>www.youtube.com/api/timedtext</code>) for the lines in that language. This is the same service YouTube’s own player uses for subtitles, and it uses the same short-lived token the player itself obtained.</li>
            <li><strong>Turning captions on for a moment.</strong> If the player has not yet requested captions when you pick a language, the Extension switches the video’s captions button on briefly so the player obtains that token, then puts the button back as it was.</li>
          </ul>
        </section>

        <section id="data-storage">
          <h2>5. How data is stored</h2>
          <ul>
            <li>The three settings are stored with <code>chrome.storage.sync</code>, which is managed by your browser.</li>
            <li>The developer has no access to your browser’s storage and receives nothing from it.</li>
            <li>The transcript itself is held in the page’s memory while the video is open and is discarded when you leave. It is never written to disk by the Extension, except when you press a download button.</li>
            <li>Nothing about your browsing or settings is stored on any server operated by me.</li>
          </ul>
        </section>

        <section id="data-sharing">
          <h2>6. Data sharing &amp; third parties</h2>
          <p>I do <strong>not</strong> share, sell, rent or transfer any data to anyone. There are no analytics or telemetry libraries, no advertising networks, no data brokers, no AI services and no third-party SDKs in the Extension. The only third party involved is YouTube, which your browser already talks to when you watch a video, under YouTube’s own terms and privacy policy.</p>
          <p>YouScript’s use and transfer of information received from Google APIs adheres to the Chrome Web Store User Data Policy, including the Limited Use requirements.</p>
        </section>

        <section id="data-retention">
          <h2>7. Retention &amp; deletion</h2>
          <ul>
            <li><strong>Remove everything</strong> by uninstalling YouScript from <code>chrome://extensions</code>. Settings kept by Chrome sync are removed from your account as part of the browser’s own sync controls.</li>
            <li>The developer holds no copy of anything, so there is nothing for me to delete on your behalf. If you emailed me a diagnostic report or screenshot that you want removed, write to me and I will delete it.</li>
          </ul>
        </section>

        <section id="children">
          <h2>8. Children’s privacy</h2>
          <p>YouScript collects no personal information from anyone, including children under 13 (or the applicable age of digital consent where you live). If you are a parent or guardian and have concerns, please <a href="#contact">contact me</a>.</p>
        </section>

        <section id="changes">
          <h2>9. Changes to this policy</h2>
          <p>If the Extension’s data practices ever change, I will update this page and its “Last updated” date before the change ships. The current version is always at this address.</p>
        </section>

        <section id="contact">
          <h2>10. Contact</h2>
          <p>Questions or concerns about this policy or the Extension’s data practices:</p>
          <div className="contact">
            <div className="c-ico" aria-hidden="true">✉️</div>
            <div>
              <h3>Developer contact</h3>
              <p>Email: <a href={SUPPORT_MAIL}>{CONTACT_EMAIL}</a></p>
              <p className="muted">I aim to answer privacy questions within 5 business days.</p>
            </div>
          </div>
          <div className="contact">
            <div className="c-ico" aria-hidden="true">🔗</div>
            <div>
              <h3>Chrome Web Store</h3>
              <p className="muted"><a href={STORE_URL} target="_blank" rel="noopener">Open the YouScript listing</a></p>
            </div>
          </div>
        </section>

        <p className="muted center small">This privacy policy was last updated on <strong>{POLICY_UPDATED}</strong>.</p>
      </div>
    </>
  );
}
