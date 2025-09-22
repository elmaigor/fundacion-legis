// ===== Normaliza rutas sin barra final (GitHub Pages) =====
(function () {
  var p = location.pathname;
  if (!/\.[a-z0-9]+$/i.test(p) && !p.endsWith('/')) {
    location.replace(p + '/' + location.search + location.hash);
  }
})();

// ===== Menú responsive (hamburguesa accesible) =====
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
    menuBtn.setAttribute('aria-label',
      isOpen ? (isEN ? openLabelEN : openLabelES) : (isEN ? closeLabelEN : closeLabelES)
    );

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

// ===== Banner de cookies =====
const cookieBanner = document.getElementById('cookie-banner');
const cookiePrefs  = document.getElementById('cookie-prefs');
if (cookieBanner) {
  const acceptAll = document.getElementById('accept-all');
  const rejectAll = document.getElementById('reject-all');
  const openPrefs = document.getElementById('open-prefs');
  const closePrefs = document.getElementById('close-prefs');
  const form = document.getElementById('cookie-form');
  const consentAnalytics = document.getElementById('consent-analytics');

  const saveConsent = (consent) => {
    localStorage.setItem('cookieConsent', JSON.stringify(consent));
    cookieBanner.style.display = 'none';
  };

  acceptAll?.addEventListener('click', () => saveConsent({ necessary: true, analytics: true }));
  rejectAll?.addEventListener('click', () => saveConsent({ necessary: true, analytics: false }));
  openPrefs?.addEventListener('click', () => cookiePrefs?.showModal());
  closePrefs?.addEventListener('click', () => cookiePrefs?.close());
  form?.addEventListener('submit', () => {
    saveConsent({ necessary: true, analytics: consentAnalytics?.checked || false });
    cookiePrefs?.close();
  });

  const saved = localStorage.getItem('cookieConsent');
  cookieBanner.style.display = saved ? 'none' : 'block';
}

// ===== Resaltado interactivo en <strong> (clic para fijar) =====
document.addEventListener('click', (e) => {
  const el = e.target.closest('strong');
  if (!el) return;
  el.classList.toggle('hl-active');
});

// ===== Pop-up de inauguración (solo en home ES) =====
// Debe salir SIEMPRE al entrar (primera carga), bloquear navegación hasta cerrar,
// y no volver a salir durante la sesión (sí reaparece si cierras el navegador).
document.addEventListener('DOMContentLoaded', () => {
  const popup = document.getElementById('popup-inauguracion');
  const closeBtn = document.getElementById('close-popup');

  if (popup && closeBtn) {
    const alreadyShown = sessionStorage.getItem('popupShown') === '1';
    if (!alreadyShown) {
      popup.style.display = 'flex';
      document.documentElement.classList.add('nav-open');
      document.body.classList.add('nav-open');
    }

    closeBtn.addEventListener('click', () => {
      popup.style.display = 'none';
      sessionStorage.setItem('popupShown', '1'); // evita que reaparezca en esta sesión
      document.documentElement.classList.remove('nav-open');
      document.body.classList.remove('nav-open');
    });
  }
});
