/* =================================================================
   KAOS — counters.js
   Contadores que animan de 0 al valor real al entrar en viewport.
   Markup: <span class="metric__num"><span data-counter="120">0</span><span class="suffix">+</span></span>
   ================================================================= */
(function () {
  "use strict";

  function decimalsOf(str) { var p = String(str).split("."); return p[1] ? p[1].length : 0; }

  function animate(el) {
    var target = parseFloat(el.getAttribute("data-counter")) || 0;
    var dec = decimalsOf(el.getAttribute("data-counter"));
    var DURATION = 1900;
    var start = null;
    function easeOut(t) { return 1 - Math.pow(1 - t, 3); }
    function step(ts) {
      if (!start) start = ts;
      var p = Math.min((ts - start) / DURATION, 1);
      var val = target * easeOut(p);
      el.textContent = dec ? val.toFixed(dec) : Math.round(val).toLocaleString("es-ES");
      if (p < 1) requestAnimationFrame(step);
      else el.textContent = dec ? target.toFixed(dec) : target.toLocaleString("es-ES");
    }
    requestAnimationFrame(step);
  }

  function setFinal(el) {
    var t = parseFloat(el.getAttribute("data-counter")) || 0;
    var dec = decimalsOf(el.getAttribute("data-counter"));
    el.textContent = dec ? t.toFixed(dec) : t.toLocaleString("es-ES");
  }

  function init() {
    var els = document.querySelectorAll("[data-counter]");
    if (!els.length) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) {
      els.forEach(setFinal); return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { animate(en.target); io.unobserve(en.target); }
      });
    }, { threshold: 0.4 });
    els.forEach(function (el) { io.observe(el); });
  }

  if (document.readyState !== "loading") init();
  else document.addEventListener("DOMContentLoaded", init);
})();
