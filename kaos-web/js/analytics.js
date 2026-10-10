/* =================================================================
   KAOS — analytics.js
   Google Analytics 4 condicional. Solo se carga si el usuario acepta
   las cookies analíticas (lo decide js/cookies.js).
   ================================================================= */
window.KAOS = window.KAOS || {};
(function () {
  "use strict";

  /* TODO: Reemplazar G-XXXXXXXXXX con el ID real de Google Analytics 4 */
  var GA_ID = "G-XXXXXXXXXX";

  var loaded = false;

  /* Activa GA4 (llamado desde cookies.js cuando hay consentimiento) */
  window.KAOS.loadAnalytics = function () {
    if (loaded) return;
    if (!GA_ID || GA_ID.indexOf("XXXX") !== -1) {
      console.info("[KAOS analytics] GA_ID es un placeholder; GA4 no se cargará hasta configurarlo.");
      return;
    }
    loaded = true;
    var s = document.createElement("script");
    s.async = true;
    s.src = "https://www.googletagmanager.com/gtag/js?id=" + GA_ID;
    document.head.appendChild(s);

    window.dataLayer = window.dataLayer || [];
    function gtag() { window.dataLayer.push(arguments); }
    window.gtag = gtag;
    gtag("js", new Date());
    gtag("config", GA_ID, { anonymize_ip: true });
  };

  /* Desactiva la recogida de datos de GA si el usuario rechaza */
  window.KAOS.disableAnalytics = function () {
    window["ga-disable-" + GA_ID] = true;
  };

  window.KAOS.GA_ID = GA_ID;
})();
