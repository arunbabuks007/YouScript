// After `vite build` (client) and `vite build --ssr` (server bundle): turn every route into a real HTML file,
// so search engines, AI assistants and the Chrome Web Store reviewers get the full content without running
// any JavaScript. The browser then "hydrates" the same markup and the site behaves as a normal React app.
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const dist = path.resolve('dist');
const template = fs.readFileSync(path.join(dist, 'index.html'), 'utf8');
if (!template.includes('<!--app-html-->') || !template.includes('<!--head-->')) {
  throw new Error('index.html lost its <!--head--> / <!--app-html--> markers — the pre-render cannot continue');
}

const { render, ROUTES, SITE_URL, STORE_URL, homeJsonLd } = await import(pathToFileURL(path.resolve('dist-ssr/entry-server.js')).href);

const NO_INDEX = new Set([]);                              // pages to keep out of search results
const esc = s => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');

function head({ path: p, title, description }, extra = '') {
  const url = SITE_URL + (p === '/' ? '/' : p);
  const image = SITE_URL + '/img/og.jpg';
  return [
    `<title>${esc(title)}</title>`,
    `<meta name="description" content="${esc(description)}">`,
    NO_INDEX.has(p) ? '<meta name="robots" content="noindex, follow">' : '<meta name="robots" content="index, follow, max-image-preview:large">',
    `<link rel="canonical" href="${url}">`,
    '<meta property="og:type" content="website">',
    '<meta property="og:site_name" content="YouScript">',
    `<meta property="og:title" content="${esc(title)}">`,
    `<meta property="og:description" content="${esc(description)}">`,
    `<meta property="og:url" content="${url}">`,
    `<meta property="og:image" content="${image}">`,
    '<meta name="twitter:card" content="summary_large_image">',
    `<meta name="twitter:title" content="${esc(title)}">`,
    `<meta name="twitter:description" content="${esc(description)}">`,
    `<meta name="twitter:image" content="${image}">`,
    extra,
  ].join('\n  ');
}

function page(meta, urlForRouter, extraHead = '') {
  return template
    .replace('<!--head-->', head(meta, extraHead))
    .replace('<!--app-html-->', render(urlForRouter));
}

function write(file, html) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, html);
  console.log('prerendered', path.relative(dist, file));
}

for (const r of ROUTES) {
  const jsonLd = r.path === '/'
    ? homeJsonLd().map(o => `<script type="application/ld+json">${JSON.stringify(o).replace(/</g, '\\u003c')}</script>`).join('\n  ')
    : '';
  write(r.path === '/' ? path.join(dist, 'index.html') : path.join(dist, r.path.slice(1) + '.html'), page(r, r.path, jsonLd));
}

// Netlify serves 404.html (with a real 404 status) for any address that has no file.
write(path.join(dist, '404.html'), page(
  { path: '/404', title: 'Page not found – YouScript', description: 'That page does not exist.' }, '/not-found',
).replace('content="index, follow, max-image-preview:large"', 'content="noindex"'));

// ── crawler helpers ──
fs.writeFileSync(path.join(dist, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
  ROUTES.filter(r => !NO_INDEX.has(r.path)).map(r => `  <url><loc>${SITE_URL}${r.path === '/' ? '/' : r.path}</loc></url>`).join('\n') + '\n</urlset>\n');
fs.writeFileSync(path.join(dist, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`);

// llms.txt: a plain-language summary for AI assistants (https://llmstxt.org).
fs.writeFileSync(path.join(dist, 'llms.txt'), `# YouScript – YouTube Transcript

> YouScript is a free Chrome extension that shows the transcript of any YouTube video in a card beside the video. Search it, click a line to jump to that moment, switch it to any language YouTube offers, copy it, or download it as text or SRT subtitles. Everything runs in the user's browser: no account, no servers, no analytics, no AI, no remote code.

## Key facts
- Works on www.youtube.com watch pages. It does not run on any other site.
- The transcript is the one YouTube already has for the video (creator captions or automatic captions). Other languages are YouTube's own translations, listed in a Language menu. Nothing is sent to an AI service.
- Search ignores capitals and accents; every word typed must match.
- The current line is highlighted and the list follows the video as it plays.
- Copy with or without timestamps; download .txt or .srt.
- Three settings: load automatically, show timestamps, follow the video.
- Price: free.
- Privacy: settings are stored in the browser (chrome.storage.sync). Nothing is sent to the developer. Only permissions: access to www.youtube.com and storage.
- Built for Google Chrome 111 or newer; Chromium browsers that install Chrome Web Store extensions generally run it too.

## Links
- [Chrome Web Store](${STORE_URL}): install YouScript
- [Home](${SITE_URL}/): overview, screenshots and FAQ
- [All features](${SITE_URL}/features): everything the card does
- [Help & troubleshooting](${SITE_URL}/support): fixes and how to report a problem
- [Privacy policy](${SITE_URL}/privacy): what is stored and why each permission is needed
- [Support](mailto:arunbabuks03@gmail.com): questions, bug reports and feature requests
`);
console.log('wrote sitemap.xml, robots.txt, llms.txt for', SITE_URL);
