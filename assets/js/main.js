// main.js — Fundación Legis
// Control de menú móvil, popup inauguración y banner de cookies

document.addEventListener("DOMContentLoaded", () => {
  // ----------------
  // Menú hamburguesa
  // ----------------
  const menuBtn = document.querySelector(".menu-btn");
  const nav = document.querySelector(".navlinks");

  if (menuBtn && nav) {
    menuBtn.addEventListener("click", () => {
      const expanded = menuBtn.getAttribute("aria-expanded") === "true";
      menuBtn.setAttribute("aria-expanded", !expanded);
      menuBtn.classList.toggle("is-open");
      nav.classList.toggle("open");
    });

    // Al hacer clic en un enlace, cerrar el menú
    nav.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        menuBtn.setAttribute("aria-expanded", "false");
        menuBtn.classList.remove("is-open");
        nav.classList.remove("open");
      });
    });
  }

  // ----------------
  // Popup inauguración
  // ----------------
  const popup = document.getElementById("popup-inauguracion");
  const closePopup = document.getElementById("close-popup");
  if (popup && closePopup) {
    // Mostrar solo al entrar en la web por primera vez en la sesión
    if (!sessionStorage.getItem("popupShown")) {
      popup.style.display = "flex";
      sessionStorage.setItem("popupShown", "true");
    }

    // Cerrar popup
    closePopup.addEventListener("click", () => {
      popup.style.display = "none";
    });
  }

  // ----------------
  // Banner de cookies
  // ----------------
  const cookieBanner = document.getElementById("cookie-banner");
  const acceptAll = document.getElementById("accept-all");
  const rejectAll = document.getElementById("reject-all");

  if (cookieBanner && !localStorage.getItem("cookiesDecision")) {
    cookieBanner.style.display = "block";
  }

  if (acceptAll) {
    acceptAll.addEventListener("click", () => {
      localStorage.setItem("cookiesDecision", "accepted");
      cookieBanner.style.display = "none";
    });
  }

  if (rejectAll) {
    rejectAll.addEventListener("click", () => {
      localStorage.setItem("cookiesDecision", "rejected");
      cookieBanner.style.display = "none";
    });
  }
});
