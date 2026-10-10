/* =================================================================
   KAOS — contact.js
   Formularios de contacto con EmailJS + validación en tiempo real +
   estado loading + mensajes de éxito/error (con WhatsApp de respaldo).
   Sirve para todos los [data-contact-form] de la página ("Escríbenos un
   mail" y "Te llamamos nosotros"). Todos usan la misma plantilla EmailJS.
   ================================================================= */
(function () {
  "use strict";

  /* ===========================================================
     TODO: Reemplazar con las credenciales reales de EmailJS
     1) Crea cuenta en https://www.emailjs.com (gratis)
     2) Conecta un servicio de email (Gmail/Outlook) -> SERVICE_ID
     3) Crea una plantilla con variables: from_name, from_email,
        phone, service, message -> TEMPLATE_ID
        (en "To Email" pon el correo de KAOS)
     4) Copia tu Public Key -> PUBLIC_KEY
     =========================================================== */
  var PUBLIC_KEY = "TU_PUBLIC_KEY";
  var SERVICE_ID = "TU_SERVICE_ID";
  var TEMPLATE_ID = "TU_TEMPLATE_ID";

  function isConfigured() {
    return PUBLIC_KEY.indexOf("TU_") === -1 && SERVICE_ID.indexOf("TU_") === -1 && TEMPLATE_ID.indexOf("TU_") === -1;
  }

  function waLink() {
    return '<a href="' + (window.KAOS && window.KAOS.WA_URL ? window.KAOS.WA_URL : "#") + '" target="_blank" rel="noopener">WhatsApp</a>';
  }

  function validateField(field) {
    var input = field.querySelector("input:not([type=hidden]), select, textarea");
    var err = field.querySelector(".err");
    if (!input) return true;
    var ok = input.checkValidity();
    if (err) err.textContent = ok ? "" : (input.validationMessage || "Revisa este campo");
    field.classList.toggle("has-error", !ok);
    return ok;
  }

  function setupForm(form) {
    var status = form.querySelector("[data-form-status]");
    var btn = form.querySelector("[data-submit]");
    var btnLabel = btn ? btn.querySelector("[data-submit-label]") : null;
    var idleLabel = btnLabel ? btnLabel.innerHTML : "";
    var okMsg = form.getAttribute("data-ok-msg") || "¡Recibido! Te contactamos en menos de 24h. 🚀";
    var fields = Array.prototype.slice.call(form.querySelectorAll(".field"));

    // Validación en tiempo real
    fields.forEach(function (field) {
      var input = field.querySelector("input:not([type=hidden]), select, textarea");
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
      if (btnLabel) btnLabel.innerHTML = on ? '<span class="spinner" aria-hidden="true"></span> Enviando…' : idleLabel;
    }

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var allOk = true;
      fields.forEach(function (f) { if (!validateField(f)) allOk = false; });
      if (!allOk) { setStatus("Revisa los campos marcados antes de enviar.", "err"); return; }

      // Si EmailJS no está configurado todavía: feedback claro + fallback WhatsApp
      if (!window.emailjs || !isConfigured()) {
        setStatus("Formulario listo. Falta conectar EmailJS (ver js/contact.js). Mientras tanto, escríbenos por " + waLink() + ".", "err");
        return;
      }

      setLoading(true);
      setStatus("", "");

      emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, form).then(function () {
        setLoading(false);
        form.reset();
        setStatus(okMsg, "ok");
        if (window.gtag) window.gtag("event", "generate_lead", { method: form.getAttribute("data-contact-form") || "contact_form" });
      }, function (error) {
        setLoading(false);
        setStatus("Algo falló al enviar. Inténtalo de nuevo o escríbenos por " + waLink() + ".", "err");
        console.warn("[KAOS contact] EmailJS error:", error);
      });
    });
  }

  function init() {
    var forms = document.querySelectorAll("[data-contact-form]");
    if (!forms.length) return;

    // Init EmailJS si está disponible y configurado
    if (window.emailjs && isConfigured()) {
      try { emailjs.init(PUBLIC_KEY); } catch (e) {}
    }

    Array.prototype.forEach.call(forms, setupForm);
  }

  if (document.readyState !== "loading") init();
  else document.addEventListener("DOMContentLoaded", init);
})();
