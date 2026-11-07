import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import App from './App';
import { FAQS } from './data';
import { ROUTES, SITE_URL, STORE_URL } from './config';

export { ROUTES, SITE_URL, STORE_URL };

export function render(url: string): string {
  return renderToString(<StaticRouter location={url}><App /></StaticRouter>);
}

/** Structured data for search engines and AI assistants (the home page only). */
export function homeJsonLd(): object[] {
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: 'YouScript – YouTube Transcript',
      applicationCategory: 'BrowserApplication',
      operatingSystem: 'Chrome, Windows, macOS, Linux, ChromeOS',
      description: 'A free Chrome extension that shows the transcript of any YouTube video beside the video, with search, click-to-jump, language switching and text or SRT download — entirely on your device, with no AI.',
      url: SITE_URL + '/',
      downloadUrl: STORE_URL,
      installUrl: STORE_URL,
      image: SITE_URL + '/img/og.jpg',
      screenshot: ['watch', 'card', 'search', 'languages', 'plain'].map(n => `${SITE_URL}/img/${n}.jpg`),
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      featureList: ['Transcript beside the video', 'Search the transcript', 'Click a line to jump to that moment', 'Follows the video as it plays', 'Switch to any language YouTube offers', 'Copy with or without timestamps', 'Download as .txt or .srt', 'No account, no server, no AI'],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: FAQS.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
    },
  ];
}
