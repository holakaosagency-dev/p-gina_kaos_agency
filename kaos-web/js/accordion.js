/* =================================================================
   KAOS — accordion.js
   Acordeón accesible para servicios y canales de contacto.
   Markup: [data-accordion] > .acc__btn[aria-controls] + .acc__panel#id
   Solo un panel abierto por contenedor. Sin JS, todo queda desplegado.
   Un botón con aria-expanded="true" en el HTML arranca abierto.
   ================================================================= */
(function () {
  "use strict";

  function init() {
    var groups = document.querySelectorAll("[data-accordion]");
    Array.prototype.forEach.call(groups, function (group) {
      var buttons = group.querySelectorAll(".acc__btn[aria-controls]");

      function panelOf(btn) { return document.getElementById(btn.getAttribute("aria-controls")); }
      function set(btn, open) {
        var panel = panelOf(btn);
        btn.setAttribute("aria-expanded", open ? "true" : "false");
        if (panel) panel.classList.toggle("is-open", open);
      }

      Array.prototype.forEach.call(buttons, function (btn) {
        set(btn, btn.getAttribute("aria-expanded") === "true");
        btn.addEventListener("click", function () {
          var willOpen = btn.getAttribute("aria-expanded") !== "true";
          Array.prototype.forEach.call(buttons, function (other) { if (other !== btn) set(other, false); });
          set(btn, willOpen);
        });
      });

      group.classList.add("is-ready");
    });
  }

  if (document.readyState !== "loading") init();
  else document.addEventListener("DOMContentLoaded", init);
})();
