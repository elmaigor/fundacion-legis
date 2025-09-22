// ================================
// Fundación Legis — main.js (robusto)
// ================================
document.addEventListener("DOMContentLoaded", () => {
  // ----- Menú hamburguesa -----
  try {
    const menuBtn = document.querySelector(".menu-btn");
    const nav = document.getElementById("site-nav");
    if (menuBtn && nav) {
      menuBtn.addEventListener("click", () => {
        const expanded = menuBtn.getAttribute("aria-expanded") === "true";
        menuBtn.setAttribute("aria-expanded", String(!expanded));
        menuBtn.classList.toggle("is-open");
        nav.classList.toggle("open");
      });
      // Cerrar al hacer clic en un enlace
      nav.querySelectorAll("a").forEach(a => {
        a.addEventListener("click", () => {
          menuBtn.setAttribute("aria-expanded","false");
          menuBtn.classList.remove("is-open");
          nav.classList.remove("open");
        });
      });
    }
  } catch(e){ console.warn("Menu error:", e); }

  // ----- Popup inauguración (primera visita por sesión) -----
  try {
    const popup = document.getElementById("popup-inauguracion");
    const closePopupBtn = document.getElementById("close-popup");
    const POPUP_KEY = "fl_popup_v3"; // cambia la clave para forzar que vuelva a salir

    if (popup) {
      // Mostrar si no se ha mostrado en esta sesión
      if (!sessionStorage.getItem(POPUP_KEY)) {
        popup.style.display = "flex";
        sessionStorage.setItem(POPUP_KEY, "true");
        document.body.style.overflow = "hidden"; // sin scroll detrás
      }

      // Cerrar con botón (si existe)
      if (closePopupBtn) {
        closePopupBtn.addEventListener("click", () => {
          popup.style.display = "none";
          document.body.style.overflow = "";
        });
      }

      // Cerrar con ESC
      document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && popup.style.display === "flex") {
          popup.style.display = "none";
          document.body.style.overflow = "";
        }
      });

      // Evitar cierre al hacer click dentro del contenido
      popup.addEventListener("click", (e) => {
        if (e.target === popup) {
          // si quieres cerrar también al pulsar fuera, descomenta:
          // popup.style.display = "none";
          // document.body.style.overflow = "";
        }
      });
    }
  } catch(e){ console.warn("Popup error:", e); }

  // ----- Banner de cookies -----
  try {
    const cookieBanner = document.getElementById("cookie-banner");
    const acceptAll   = document.getElementById("accept-all");
    const rejectAll   = document.getElementById("reject-all");
    const openPrefs   = document.getElementById("open-prefs");
    const cookiePrefs = document.getElementById("cookie-prefs");
    const closePrefs  = document.getElementById("close-prefs");
    const cookieForm  = document.getElementById("cookie-form");
    const COOKIE_KEY  = "fl_cookie_consent";

    const showCookieBanner = () => {
      if (cookieBanner && !localStorage.getItem(COOKIE_KEY)) {
        cookieBanner.style.display = "block";
      }
    };
    const saveConsent = (consent) => {
      localStorage.setItem(COOKIE_KEY, JSON.stringify(consent));
      if (cookieBanner) cookieBanner.style.display = "none";
    };

    showCookieBanner();

    if (acceptAll) acceptAll.addEventListener("click", () => {
      saveConsent({ necessary:true, analytics:true });
    });
    if (rejectAll) rejectAll.addEventListener("click", () => {
      saveConsent({ necessary:true, analytics:false });
    });
    if (openPrefs && cookiePrefs) openPrefs.addEventListener("click", () => {
      cookiePrefs.showModal();
    });
    if (closePrefs && cookiePrefs) closePrefs.addEventListener("click", () => {
      cookiePrefs.close();
    });
    if (cookieForm && cookiePrefs) cookieForm.addEventListener("submit", () => {
      const analytics = document.getElementById("consent-analytics")?.checked ?? false;
      saveConsent({ necessary:true, analytics });
      cookiePrefs.close();
    });
  } catch(e){ console.warn("Cookies error:", e); }
});
