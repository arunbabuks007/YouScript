import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './styles.css';

const root = document.getElementById('root')!;
const app = (
  <StrictMode>
    <BrowserRouter><App /></BrowserRouter>
  </StrictMode>
);

// Pages are pre-rendered at build time, so adopt the existing HTML; in dev there is none yet.
if (root.hasChildNodes()) hydrateRoot(root, app); else createRoot(root).render(app);
