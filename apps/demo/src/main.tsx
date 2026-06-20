import { StrictMode, useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import Landing from './Landing';
import Gallery from './Gallery';
import Overview from './Overview';
import Expressions from './Expressions';
import './index.css';

// Minimal hash router so the demo can show both surface standards:
//   #/landing -> marketing/landing (light)   |   default -> app/product UI (dark)
function Root() {
  const [hash, setHash] = useState(() => window.location.hash);
  useEffect(() => {
    const onHash = () => setHash(window.location.hash);
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  if (hash.startsWith('#/landing')) return <Landing />;
  if (hash.startsWith('#/gallery')) return <Gallery />;
  if (hash.startsWith('#/expressions')) return <Expressions />;
  if (hash.startsWith('#/overview') || hash === '' || hash === '#/') return <Overview />;
  return <App />;
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Root />
  </StrictMode>,
);
