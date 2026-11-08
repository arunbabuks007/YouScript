// The few facts the whole site shares. Change them here.

/** Where the site is deployed — used for canonical links, the sitemap and social previews.
 *  If your Netlify address is different, change the fallback below (or set VITE_SITE_URL in Netlify). */
export const SITE_URL: string = (import.meta.env.VITE_SITE_URL as string | undefined)?.replace(/\/$/, '') || 'https://youscript-ytscript.netlify.app';

/** The YouScript page on the Chrome Web Store. Until it is published this opens a store search; replace with the real
 *  listing address (https://chromewebstore.google.com/detail/<name>/<id>) once it exists. */
export const STORE_URL = 'https://chromewebstore.google.com/search/YouScript%20YouTube%20Transcript';

export const CONTACT_EMAIL = 'arunbabuks03@gmail.com';
export const SUPPORT_MAIL = `mailto:${CONTACT_EMAIL}?subject=YouScript%20support`;
export const VERSION = '1.0.0';
export const POLICY_UPDATED = 'November 7, 2026';

export interface RouteMeta { path: string; title: string; description: string; }

/** One entry per page: the browser tab title and the search/social description. Also drives the
 *  pre-rendered HTML and the sitemap. */
export const ROUTES: RouteMeta[] = [
  {
    path: '/',
    title: 'YouScript – YouTube Transcript for Chrome',
    description: 'Read, search, copy and download any YouTube video’s transcript beside the video, and switch it to any language YouTube offers. Free, private, no account, no AI.',
  },
  {
    path: '/features',
    title: 'All Features – YouScript YouTube Transcript',
    description: 'Everything the YouScript card does: read and search the transcript, click a line to jump, follow the video, switch language, copy, and download as text or SRT subtitles.',
  },
  {
    path: '/support',
    title: 'Help & Troubleshooting – YouScript',
    description: 'YouScript not showing a transcript or a language? Fix it in a minute with these steps, or email for help.',
  },
  {
    path: '/boost',
    title: 'Boost YouScript – support the developer',
    description: 'YouScript is free. If it saved you time, send a small boost to help keep it improving.',
  },
  {
    path: '/privacy',
    title: 'Privacy Policy – YouScript',
    description: 'YouScript runs entirely in your browser: no servers, no tracking, no analytics. See exactly what it stores and why each permission is needed.',
  },
];

/** The backend that records tips (shared with the developer's other apps; tips are tagged product "youscript"). */
export const API_BASE: string = (import.meta.env.VITE_API_BASE as string | undefined) || 'https://vidhastra-backend.onrender.com';

/** Bump this when the screenshots in public/img change: it is added to every picture's address so browsers fetch the new files. */
export const IMG_V = '4';
/** Address of a picture in public/img, with the version added. */
export const img = (name: string) => `/img/${name}?v=${IMG_V}`;
