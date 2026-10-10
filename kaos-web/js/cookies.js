/* =================================================================
   KAOS — cookies.js
   Banner de cookies RGPD/LOPD. Controla la activación de Analytics.
   Guarda la preferencia en localStorage y no vuelve a mostrarse.
   ================================================================= */
window.KAOS = window.KAOS || {};
(function () {
  "use strict";

  var KEY = "kaos_consent_v1";

  function read() {
    try { return JSON.parse(localStorage.getItem(KEY)); }
    catch (e) { return null; }
  }
  function save(obj) {
    obj.ts = Date.now();
    try { localStorage.setItem(KEY, JSON.stringify(obj)); } catch (e) {}
  }

  function applyConsent(consent) {
    if (consent && consent.analytics) {
      if (window.KAOS.loadAnalytics) window.KAOS.loadAnalytics();
    } else {
      if (window.KAOS.disableAnalytics) window.KAOS.disableAnalytics();
    }
  }

  function init() {
    var banner = document.querySelector("[data-cookie-banner]");
    var stored = read();

    // Aplica la preferencia previa en cada carga
    if (stored) { applyConsent(stored); if (banner) banner.remove(); return; }

    if (!banner) return; // banner solo presente si no hay consentimiento aún

    // Mostrar con una pequeña espera para no competir con el loader/hero
    setTimeout(function () { banner.classList.add("is-show"); }, 900);

    var prefs = banner.querySelector("[data-cookie-prefs]");
    var analyticsToggle = banner.querySelector("#cookie-analytics");

    function decide(analytics) {
      save({ necessary: true, analytics: !!analytics });
      applyConsent({ analytics: !!analytics });
      banner.classList.remove("is-show");
      setTimeout(function () { banner.remove(); }, 700);
    }

    banner.addEventListener("click", function (e) {
      var btn = e.target.closest("[data-cookie]");
      if (!btn) return;
      var action = btn.getAttribute("data-cookie");
      if (action === "accept") decide(true);
      else if (action === "necessary") decide(false);
      else if (action === "customize") { if (prefs) prefs.classList.toggle("is-open"); }
      else if (action === "save") decide(analyticsToggle ? analyticsToggle.checked : false);
    });
  }

  /* Permite reabrir preferencias desde la política de cookies */
  window.KAOS.resetCookieConsent = function () {
    try { localStorage.removeItem(KEY); } catch (e) {}
    location.reload();
  };

  if (document.readyState !== "loading") init();
  else document.addEventListener("DOMContentLoaded", init);
})();
