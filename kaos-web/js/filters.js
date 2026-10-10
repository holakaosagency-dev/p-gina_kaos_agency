/* =================================================================
   KAOS — filters.js
   Filtro de portfolio por categoría (proyectos.html).
   Botones [data-filter] + tarjetas [data-cats] con categorías
   separadas por espacios. JS puro, animación al mostrar.
   ================================================================= */
(function () {
  "use strict";

  function init() {
    var bar = document.querySelector("[data-filters]");
    var grid = document.querySelector("[data-work-grid]");
    if (!bar || !grid) return;

    var buttons = bar.querySelectorAll("[data-filter]");
    var cards = grid.querySelectorAll("[data-cats]");

    bar.addEventListener("click", function (e) {
      var btn = e.target.closest("[data-filter]");
      if (!btn) return;
      var cat = btn.getAttribute("data-filter");

      buttons.forEach(function (b) { b.classList.toggle("is-active", b === btn); });

      grid.classList.add("is-filtering");
      cards.forEach(function (card) {
        var cats = card.getAttribute("data-cats") || "";
        var show = cat === "all" || cats.split(/\s+/).indexOf(cat) !== -1;
        card.classList.toggle("is-hidden", !show);
      });
      // limpia la clase de animación tras el ciclo
      setTimeout(function () { grid.classList.remove("is-filtering"); }, 600);
    });
  }

  if (document.readyState !== "loading") init();
  else document.addEventListener("DOMContentLoaded", init);
})();
