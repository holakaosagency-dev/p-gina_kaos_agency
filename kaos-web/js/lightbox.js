/* =================================================================
   KAOS — lightbox.js
   Lightbox del portfolio en Vanilla JS (sin librerías).
   Cualquier elemento [data-lightbox] con data-full / data-title /
   data-desc entra en la galería. Navegación con flechas y teclado,
   cierre con ESC o clic fuera.
   ================================================================= */
(function () {
  "use strict";

  function init() {
    var items = Array.prototype.slice.call(document.querySelectorAll("[data-lightbox]"));
    if (!items.length) return;

    var box = document.querySelector("[data-lightbox-stage]");
    if (!box) return;
    var imgEl = box.querySelector("[data-lb-img]");
    var titleEl = box.querySelector("[data-lb-title]");
    var descEl = box.querySelector("[data-lb-desc]");
    var current = 0;

    function dataFor(el) {
      return {
        full: el.getAttribute("data-full") || (el.querySelector("img") && el.querySelector("img").src),
        title: el.getAttribute("data-title") || "",
        desc: el.getAttribute("data-desc") || "",
        alt: el.getAttribute("data-alt") || (el.querySelector("img") && el.querySelector("img").alt) || ""
      };
    }
    function render(i) {
      current = (i + items.length) % items.length;
      var d = dataFor(items[current]);
      imgEl.src = d.full;
      imgEl.alt = d.alt;
      if (titleEl) titleEl.textContent = d.title;
      if (descEl) descEl.textContent = d.desc;
      // re-disparar animación de entrada
      imgEl.style.animation = "none"; void imgEl.offsetWidth; imgEl.style.animation = "";
    }
    function open(i) { render(i); box.classList.add("is-open"); document.body.style.overflow = "hidden"; }
    function close() { box.classList.remove("is-open"); document.body.style.overflow = ""; }
    function next() { render(current + 1); }
    function prev() { render(current - 1); }

    items.forEach(function (el, i) {
      el.addEventListener("click", function (e) {
        if (e.target.closest("a")) return; // deja navegar los enlaces internos
        e.preventDefault(); open(i);
      });
      el.setAttribute("role", "button");
      el.setAttribute("tabindex", "0");
      el.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") { e.preventDefault(); open(i); }
      });
    });

    box.addEventListener("click", function (e) {
      if (e.target.closest("[data-lb-next]")) return next();
      if (e.target.closest("[data-lb-prev]")) return prev();
      if (e.target.closest("[data-lb-close]")) return close();
      if (!e.target.closest("[data-lb-img]") && !e.target.closest(".lightbox__caption")) close();
    });

    document.addEventListener("keydown", function (e) {
      if (!box.classList.contains("is-open")) return;
      if (e.key === "Escape") close();
      else if (e.key === "ArrowRight") next();
      else if (e.key === "ArrowLeft") prev();
    });
  }

  if (document.readyState !== "loading") init();
  else document.addEventListener("DOMContentLoaded", init);
})();
