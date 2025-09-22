// main.js — Fundación Legis
// Menú móvil, popup inauguración y banner de cookies

document.addEventListener("DOMContentLoaded", () => {
  // Menú hamburguesa
  const menuBtn = document.querySelector(".menu-btn");
  const nav = document.querySelector(".navlinks");

  if (menuBtn && nav) {
    menuBtn.addEventListener("click", () => {
      const expanded = menuBtn.getAttribute("aria-expanded") === "true";
      menuBtn.setAttribute("aria-expanded", !expanded);
      menuBtn.classList.toggle("is-open");
      nav.classList.toggle("open");
    });

    // Cerrar al pulsar un enlace
    nav.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        menuBtn.setAttribute("aria-expanded", "false");
        menuBtn.classList.remove("is-open");
        nav.classList.remove("open");
      });
    });
  }

  // Popup inauguración (una vez por sesión)
  const popup
