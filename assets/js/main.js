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

    // Cambia etiqueta accesible según idioma
    const openLabelES = 'Cerrar menú', openLabelEN = 'Close menu';
    const closeLabelES = 'Abrir menú',  closeLabelEN = 'Open menu';
    const isEN = document.documentElement.lang === 'en';
    menuBtn.setAttribute(
      'aria-label',
      isOpen ? (isEN ? openLabelEN : openLabelES) : (isEN ? closeLabelEN : closeLabelES)
    );

    // Bloquea scroll al abrir
    document.documentElement.classList.toggle('nav-open', isOpen);
    document.body.classList.toggle('nav-open', isOpen);
  });

  // Cierra el menú si haces clic fuera
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

  if (acceptAll) {
    acceptAll.addEventListener('click', () => {
      saveConsent({ necessary: true, analytics: true });
    });
  }
  if (rejectAll) {
    rejectAll.addEventListener('click', () => {
      saveConsent({ necessary: true, analytics: false });
    });
  }
  if (openPrefs && cookiePrefs) {
    openPrefs.addEventListener('click', () => cookiePrefs.showModal());
  }
  if (closePrefs && cookiePrefs) {
    closePrefs.addEventListener('click', () => cookiePrefs.close());
  }
  if (form) {
    form.addEventListener('submit', () => {
      saveConsent({ necessary: true, analytics: consentAnalytics?.checked || false });
      cookiePrefs.close();
    });
  }

  // Mostrar banner si no hay consentimiento guardado
  const saved = localStorage.getItem('cookieConsent');
  if (!saved) {
    cookieBanner.style.display = 'block';
  } else {
    cookieBanner.style.display = 'none';
  }
}

// ===== Resaltado interactivo en <strong> =====
// Hover → efecto con CSS
// Clic → fija/desfija resaltado (toggle class)
document.addEventListener('click', (e) => {
  const el = e.target.closest('strong');
  if (!el) return;
  el.classList.toggle('hl-active');
});
