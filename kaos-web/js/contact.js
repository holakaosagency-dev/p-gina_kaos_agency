/* =================================================================
   KAOS — contact.js
   Formulario de contacto con EmailJS + validación en tiempo real +
   estado loading + mensajes de éxito/error (con WhatsApp de respaldo).
   ================================================================= */
(function () {
  "use strict";

  /* ===========================================================
     TODO: Reemplazar con las credenciales reales de EmailJS
     1) Crea cuenta en https://www.emailjs.com (gratis)
     2) Conecta un servicio de email (Gmail/Outlook) -> SERVICE_ID
     3) Crea una plantilla con variables: from_name, from_email,
        phone, service, message -> TEMPLATE_ID
     4) Copia tu Public Key -> PUBLIC_KEY
     =========================================================== */
  var PUBLIC_KEY = "TU_PUBLIC_KEY";
  var SERVICE_ID = "TU_SERVICE_ID";
  var TEMPLATE_ID = "TU_TEMPLATE_ID";

  function isConfigured() {
    return PUBLIC_KEY.indexOf("TU_") === -1 && SERVICE_ID.indexOf("TU_") === -1 && TEMPLATE_ID.indexOf("TU_") === -1;
  }

  function validateField(field) {
    var input = field.querySelector("input, select, textarea");
    var err = field.querySelector(".err");
    if (!input) return true;
    var ok = input.checkValidity();
    if (err) err.textContent = ok ? "" : (input.validationMessage || "Revisa este campo");
    field.classList.toggle("has-error", !ok);
    return ok;
  }

  function init() {
    var form = document.querySelector("[data-contact-form]");
    if (!form) return;

    var status = form.querySelector("[data-form-status]");
    var btn = form.querySelector("[data-submit]");
    var btnLabel = btn ? btn.querySelector("[data-submit-label]") : null;
    var fields = Array.prototype.slice.call(form.querySelectorAll(".field"));

    // Init EmailJS si está disponible y configurado
    if (window.emailjs && isConfigured()) {
      try { emailjs.init(PUBLIC_KEY); } catch (e) {}
    }

    // Validación en tiempo real
    fields.forEach(function (field) {
      var input = field.querySelector("input, select, textarea");
      if (!input) return;
      input.addEventListener("blur", function () { validateField(field); });
      input.addEventListener("input", function () {
        if (field.classList.contains("has-error")) validateField(field);
      });
    });

    function setStatus(msg, type) {
      if (!status) return;
      status.innerHTML = msg;
      status.className = "form__status" + (type ? " is-" + type : "");
    }
    function setLoading(on) {
      if (!btn) return;
      btn.setAttribute("data-loading", on ? "true" : "false");
      if (btnLabel) btnLabel.innerHTML = on
        ? '<span class="spinner" aria-hidden="true"></span> Enviando…'
        : 'Enviar mensaje <span class="arrow">→</span>';
    }

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var allOk = true;
      fields.forEach(function (f) { if (!validateField(f)) allOk = false; });
      if (!allOk) { setStatus("Revisa los campos marcados antes de enviar.", "err"); return; }

      // Si EmailJS no está configurado todavía: feedback claro + fallback WhatsApp
      if (!window.emailjs || !isConfigured()) {
        setStatus("Formulario listo. Falta conectar EmailJS (ver js/contact.js). Mientras tanto, escríbenos por " +
          '<a href="' + (window.KAOS && window.KAOS.WA_URL ? window.KAOS.WA_URL : "#") + '" target="_blank" rel="noopener">WhatsApp</a>.', "err");
        return;
      }

      setLoading(true);
      setStatus("", "");

      emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, form).then(function () {
        setLoading(false);
        form.reset();
        setStatus("¡Recibido! Te contactamos en menos de 24h. 🚀", "ok");
        if (window.gtag) window.gtag("event", "generate_lead", { method: "contact_form" });
      }, function (error) {
        setLoading(false);
        setStatus("Algo falló al enviar. Inténtalo de nuevo o escríbenos por " +
          '<a href="' + (window.KAOS && window.KAOS.WA_URL ? window.KAOS.WA_URL : "#") + '" target="_blank" rel="noopener">WhatsApp</a>.', "err");
        console.warn("[KAOS contact] EmailJS error:", error);
      });
    });
  }

  if (document.readyState !== "loading") init();
  else document.addEventListener("DOMContentLoaded", init);
})();
