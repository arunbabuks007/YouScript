import type { IconName } from './components/Icon';

export interface Feature { icon: IconName; title: string; text: string; }

export const FEATURES: Feature[] = [
  { icon: 'panel', title: 'The transcript, beside the video', text: 'Open any YouTube video and a card at the top of the sidebar already shows the full transcript. No button to hunt for, no pop-up to open, no page to leave.' },
  { icon: 'clock', title: 'Click a line, jump there', text: 'Every line has its timestamp. Click the line or the time and the video jumps to that exact moment, even if it was paused.' },
  { icon: 'search', title: 'Search inside the video', text: 'Type a word and only the lines that contain it stay. It ignores capital letters and accents, so “cafe” finds “café”. Perfect for finding the one minute you remember.' },
  { icon: 'pulse', title: 'Follows along as it plays', text: 'The line being spoken is highlighted and the list scrolls with it. Scroll yourself and it politely waits, then picks the thread up again.' },
  { icon: 'layers', title: 'Any language YouTube offers', text: 'Pick one of the video’s own caption languages, or any of the roughly 150 languages YouTube can translate them into. The translation is YouTube’s own, so it is instant and free.' },
  { icon: 'comment', title: 'Copy it your way', text: 'One click copies the whole transcript, with or without timestamps. Turn timestamps off and you get clean text ready to paste into notes.' },
  { icon: 'download', title: 'Download as text or subtitles', text: 'Save the transcript as a plain .txt file, or as an .srt subtitle file that opens in any video player or editor.' },
  { icon: 'palette', title: 'Looks right in light and dark', text: 'The card follows YouTube’s theme and sits in the sidebar like it belongs there. Collapse it when you do not need it.' },
  { icon: 'shield', title: 'Private by design', text: 'No account, no server of ours, no analytics. The extension only talks to YouTube, and your three settings live in your browser.' },
];

export interface Faq { q: string; a: string; }

export const FAQS: Faq[] = [
  {
    q: 'How do I get the transcript of a YouTube video?',
    a: 'Install YouScript and open any YouTube video. The transcript appears in a card at the top of the sidebar, ready to read, search, copy or download. You do not need to click anything first.',
  },
  {
    q: 'Is YouScript free?',
    a: 'Yes. There is no account, no sign-up, no subscription and no usage limit.',
  },
  {
    q: 'Does it use AI?',
    a: 'No. The transcript is the one YouTube already has for the video: captions written by the creator, or the automatic captions YouTube generates. Other languages come from YouTube’s own translation. YouScript does not send anything to an AI service.',
  },
  {
    q: 'Does YouScript collect or upload any data?',
    a: 'No. It has no server of its own, no analytics and no tracking, and it loads no remote code. Your settings stay in your browser. The privacy policy lists exactly what is stored and why each permission is needed.',
  },
  {
    q: 'How do I read the transcript in another language?',
    a: 'Use the Language menu at the top of the card. It lists the video’s own caption languages and, under “Translated by YouTube”, every language YouTube can translate them into. Choose one and the lines change, with the same timestamps. Choose “Original” to go back.',
  },
  {
    q: 'Why is there no Language menu on some videos?',
    a: 'The menu only shows what YouTube offers. If a video has a single caption track and YouTube offers no translation for it, there is nothing to choose and the menu is hidden.',
  },
  {
    q: 'A video says it has no transcript. Why?',
    a: 'Some videos have no captions at all: the creator turned them off, the video is brand new and YouTube has not generated them yet, or there is no speech. YouScript can only show what YouTube has.',
  },
  {
    q: 'How good is the translated transcript?',
    a: 'It is YouTube’s automatic translation, so it is as good as the translation you get from YouTube’s own subtitle menu: fine for understanding a video, not perfect for names, slang or songs.',
  },
  {
    q: 'What do the .txt and .srt buttons do?',
    a: '.txt saves the transcript as plain text, with timestamps if you have them switched on. .srt saves it as a subtitle file with start and end times, which video players and editors can load. Both use the language you are viewing.',
  },
  {
    q: 'Why does YouScript need access to YouTube?',
    a: 'It adds the card to YouTube’s watch page and reads the transcript YouTube shows there, so it needs to run on youtube.com. It does not ask for access to any other website, your browsing history or your tabs.',
  },
  {
    q: 'Does it work on Edge, Brave and other Chromium browsers?',
    a: 'YouScript is built for Google Chrome (version 111 or newer). Chromium browsers that can install Chrome Web Store extensions, such as Edge and Brave, generally run it too, though Chrome is the one it is tested on.',
  },
];

export const STATS: { value: string; label: string }[] = [
  { value: '150+', label: 'languages' },
  { value: '0', label: 'bytes of data collected' },
  { value: '1 click', label: 'to jump to any moment' },
  { value: 'No AI', label: 'just YouTube’s captions' },
];
