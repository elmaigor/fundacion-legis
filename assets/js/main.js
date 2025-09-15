
/* Fundación Legis — main.js
   Consent, menu, and a11y helpers.
*/
// Normaliza rutas sin barra final: /fundacion-legis -> /fundacion-legis/
(function () {
  var p = location.pathname;
  if (!/\.[a-z0-9]+$/i.test(p) && !p.endsWith('/')) {
    location.replace(p + '/' + location.search + location.hash);
  }
})();

const menuBtn = document.querySelector('.menu-btn');
const links = document.querySelector('.navlinks');
if (menuBtn && links) {
  menuBtn.addEventListener('click', () => {
    const isOpen = links.classList.toggle('open');
    menuBtn.classList.toggle('is-open', isOpen);
    menuBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');

    const openLabelES = 'Cerrar menú', openLabelEN = 'Close menu';
    const closeLabelES = 'Abrir menú',  closeLabelEN = 'Open menu';
    const isEN = document.documentElement.lang === 'en';
    menuBtn.setAttribute('aria-label', isOpen ? (isEN ? openLabelEN : openLabelES) : (isEN ? closeLabelEN : closeLabelES));

    document.documentElement.classList.toggle('nav-open', isOpen);
    document.body.classList.toggle('nav-open', isOpen);
  });

  document.addEventListener('click', (e) => {
    if (!links.contains(e.target) && !menuBtn.contains(e.target) && links.classList.contains('open')) {
      links.classList.remove('open');
      menuBtn.classList.remove('is-open');
      menuBtn.setAttribute('aria-expanded', 'false');
      const isEN = document.documentElement.lang === 'en';
      menuBtn.setAttribute('aria-label', isEN ? 'Open menu' : 'Abrir menú');
      document.documentElement.classList.remove('nav-open');
      document.body.classList.remove('nav-open');
    }
  });
}

  // Cookie consent
  const BANNER = document.getElementById('cookie-banner');
  const PREFS  = document.getElementById('cookie-prefs');
  const form   = document.getElementById('cookie-form');
  const LS_KEY = 'fl_consent_v1';

  function getConsent() {
    try { return JSON.parse(localStorage.getItem(LS_KEY) || 'null'); } catch (_e) { return null; }
  }
  function setConsent(obj) {
    localStorage.setItem(LS_KEY, JSON.stringify(obj));
    document.documentElement.dataset.consent = obj.analytics ? 'analytics' : 'functional';
  }
  function showBanner() { BANNER?.classList.add('show'); }
  function hideBanner() { BANNER?.classList.remove('show'); }

  const saved = getConsent();
  if (!saved) showBanner(); else setConsent(saved);

  document.getElementById('accept-all')?.addEventListener('click', () => {
    setConsent({ analytics: true }); hideBanner();
  });
  document.getElementById('reject-all')?.addEventListener('click', () => {
    setConsent({ analytics: false }); hideBanner();
  });
  document.getElementById('open-prefs')?.addEventListener('click', () => PREFS?.showModal());
  document.getElementById('close-prefs')?.addEventListener('click', () => PREFS?.close());

  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    const analytics = document.getElementById('consent-analytics').checked;
    setConsent({ analytics });
    hideBanner();
    PREFS?.close();
  });

  // Smooth anchor focus for accessibility
  const internalLinks = document.querySelectorAll('a[href^="#"]');
  internalLinks.forEach(a => a.addEventListener('click', (e) => {
    const id = a.getAttribute('href').slice(1);
    const el = document.getElementById(id);
    if (el) {
      e.preventDefault();
      el.scrollIntoView({ behavior: 'smooth' });
      el.setAttribute('tabindex', '-1'); el.focus({ preventScroll: true });
      setTimeout(() => el.removeAttribute('tabindex'), 1000);
    }
  }));

  // (Optional) Place for analytics initialization respecting consent
  // if (getConsent()?.analytics) { /* initialize analytics here */ }
})();
