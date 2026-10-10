/* =================================================================
   KAOS — modals.js
   Modal de caso de estudio. Los disparadores [data-modal-open]
   llevan los datos en data-* y rellenan el modal #project-modal.
   Cierre con ✕, ESC o clic fuera. Animación CSS (scale + fade).
   ================================================================= */
(function () {
  "use strict";

  function init() {
    var modal = document.querySelector("[data-modal]");
    if (!modal) return;

    var elImg = modal.querySelector("[data-m-img]");
    var elCat = modal.querySelector("[data-m-cat]");
    var elTitle = modal.querySelector("[data-m-title]");
    var elDesc = modal.querySelector("[data-m-desc]");
    var elResults = modal.querySelector("[data-m-results]");
    var elCta = modal.querySelector("[data-m-cta]");
    var lastFocus = null;

    function open(trigger) {
      var d = trigger.dataset;
      if (elImg) { elImg.src = d.modalImg || ""; elImg.alt = d.modalTitle || ""; }
      if (elCat) elCat.textContent = d.modalCat || "";
      if (elTitle) elTitle.textContent = d.modalTitle || "";
      if (elDesc) elDesc.textContent = d.modalDesc || "";
      if (elCta) { elCta.href = d.modalHref || "#"; }

      if (elResults) {
        elResults.innerHTML = "";
        var results = (d.modalResults || "").split("|").filter(Boolean);
        results.forEach(function (r) {
          var parts = r.split("::");
          var div = document.createElement("div");
          div.innerHTML = "<b>" + (parts[0] || "") + "</b><span>" + (parts[1] || "") + "</span>";
          elResults.appendChild(div);
        });
      }

      lastFocus = document.activeElement;
      modal.classList.add("is-open");
      document.body.style.overflow = "hidden";
      var closeBtn = modal.querySelector("[data-m-close]");
      if (closeBtn) closeBtn.focus();
    }

    function close() {
      modal.classList.remove("is-open");
      document.body.style.overflow = "";
      if (lastFocus) lastFocus.focus();
    }

    document.addEventListener("click", function (e) {
      var trigger = e.target.closest("[data-modal-open]");
      if (trigger) { e.preventDefault(); open(trigger); return; }
    });

    modal.addEventListener("click", function (e) {
      if (e.target.closest("[data-m-close]") || e.target.closest("[data-modal-backdrop]")) close();
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && modal.classList.contains("is-open")) close();
    });
  }

  if (document.readyState !== "loading") init();
  else document.addEventListener("DOMContentLoaded", init);
})();
