// ================================
// Fundación Legis — main.js
// ================================

// ----- Menú hamburguesa -----
const menuBtn = document.querySelector(".menu-btn");
const nav = document.getElementById("site-nav");

if (menuBtn && nav) {
  menuBtn.addEventListener("click", () => {
    const expanded = menuBtn.getAttribute("aria-expanded") === "true";
    menuBtn.setAttribute("aria-expanded", String(!expanded));
    menuBtn.classList.toggle("is-open");
    nav.classList.toggle("open");
  });
}

// ----- Popup inauguración -----
const popup = document.getElementById("popup-inauguracion");
const closePopupBtn = document.getElementById("close-popup");

// Clave de sesión: cambia si quieres forzar que reaparezca
const popupKey = "fl_popup_v1";

if (popup && closePopupBtn) {
  if (!sessionStorage.getItem(popupKey)) {
    popup.style.display = "flex";
    sessionStorage.setItem(popupKey, "true");
    document.body.style.overflow = "hidden"; // evitar scroll detrás
  }

  // Cerrar con botón
  closePopupBtn.addEventListener("click", () => {
    popup.style.display = "none";
    document.body.style.overflow = "";
  });

  // Cerrar con tecla Escape
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && popup.style.display === "flex") {
      popup.style.display = "none";
      document.body.style.overflow = "";
    }
  });
}

// ----- Cookie banner -----
const cookieBanner = document.getElementById("cookie-banner");
const acceptAll = document.getElementById("accept-all");
const rejectAll = document.getElementById("reject-all");
const openPrefs = document.getElementById("open-prefs");
const cookiePrefsDialog = document.getElementById("cookie-prefs");
const closePrefs = document.getElementById("close-prefs");
const cookieForm = document.getElementById("cookie-form");

const cookieKey = "fl_cookie_consent";

function showCookieBanner() {
  if (!localStorage.getItem(cookieKey)) {
    cookieBanner.style.display = "block";
  }
}

function saveConsent(consent) {
  localStorage.setItem(cookieKey, JSON.stringify(consent));
  cookieBanner.style.display = "none";
}

if (cookieBanner) {
  showCookieBanner();

  if (acceptAll) {
    acceptAll.addEventListener("click", () => {
      saveConsent({ necessary: true, analytics: true });
    });
  }

  if (rejectAll) {
    rejectAll.addEventListener("click", () => {
      saveConsent({ necessary: true, analytics: false });
    });
  }

  if (openPrefs && cookiePrefsDialog) {
    openPrefs.addEventListener("click", () => {
      cookiePrefsDialog.showModal();
    });
  }

  if (closePrefs && cookiePrefsDialog) {
    closePrefs.addEventListener("click", () => {
      cookiePrefsDialog.close();
    });
  }

  if (cookieForm && cookiePrefsDialog) {
    cookieForm.addEventListener("submit", () => {
      const analytics = document.getElementById("consent-analytics").checked;
      saveConsent({ necessary: true, analytics: analytics });
      cookiePrefsDialog.close();
    });
  }
}
