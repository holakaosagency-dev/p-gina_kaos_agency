/* =================================================================
   KAOS — main.js
   Loader · nav sticky · hamburguesa · scroll suave · volver arriba ·
   barra de progreso · reveals on scroll · nav activo · hero.
   Patrón IIFE + safe() (un init que falle no rompe el resto).
   ================================================================= */
window.KAOS = window.KAOS || {};
(function () {
  "use strict";

  var reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  function safe(fn, name) { try { fn(); } catch (e) { console.warn("[KAOS " + name + "]", e); } }

  /* ---------- Loader (solo home) ---------- */
  function initSplash() {
    var splash = document.querySelector("[data-splash]");
    if (!splash) return;
    var bar = splash.querySelector("[data-splash-bar]");
    var start = Date.now();
    var MAX = 1500; // máx 1.5s

    if (bar) {
      var tick = setInterval(function () {
        var pct = Math.min(100, ((Date.now() - start) / MAX) * 100);
        bar.style.width = pct + "%";
        if (pct >= 100) clearInterval(tick);
      }, 40);
    }
    function hide() {
      if (bar) bar.style.width = "100%";
      splash.classList.add("is-out");
      document.body.classList.add("is-ready");
    }
    var elapsed = Date.now() - start;
    setTimeout(hide, Math.max(MAX - elapsed, 400));
    // doble red de seguridad además de la animación CSS
    setTimeout(hide, 2000);
  }

  /* ---------- Nav: sticky, progreso, hamburguesa ---------- */
  function initNav() {
    var nav = document.querySelector("[data-nav]");
    var progress = document.querySelector("[data-progress]");
    var toTop = document.querySelector("[data-totop]");
    var isInner = nav && nav.classList.contains("nav--inner");

    function onScroll() {
      var y = window.scrollY || document.documentElement.scrollTop;
      if (nav && !isInner) nav.classList.toggle("is-solid", y > 40);
      if (toTop) toTop.classList.toggle("is-show", y > 300);
      if (progress) {
        var h = document.documentElement.scrollHeight - window.innerHeight;
        progress.style.width = (h > 0 ? (y / h) * 100 : 0) + "%";
      }
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    if (toTop) toTop.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" });
    });

    // Hamburguesa
    if (nav) {
      var burger = nav.querySelector("[data-burger]");
      var mobile = nav.querySelector("[data-mobile]");
      function close() { nav.classList.remove("is-open"); document.body.style.overflow = ""; }
      function toggle() {
        var open = nav.classList.toggle("is-open");
        document.body.style.overflow = open ? "hidden" : "";
      }
      if (burger) burger.addEventListener("click", toggle);
      if (mobile) mobile.addEventListener("click", function (e) {
        if (e.target.closest("a")) close();
      });
      document.addEventListener("keydown", function (e) { if (e.key === "Escape") close(); });
    }
  }

  /* ---------- Scroll suave para anclas ---------- */
  function initSmoothScroll() {
    document.addEventListener("click", function (e) {
      var a = e.target.closest('a[href^="#"]');
      if (!a) return;
      var id = a.getAttribute("href");
      if (!id || id === "#") return;
      var el = document.querySelector(id);
      if (!el) return;
      e.preventDefault();
      var navH = 70;
      window.scrollTo({
        top: el.getBoundingClientRect().top + window.scrollY - navH,
        behavior: reduced ? "auto" : "smooth"
      });
    });
  }

  /* ---------- Reveals on scroll (IntersectionObserver + red de seguridad) ---------- */
  function initReveals() {
    var els = document.querySelectorAll(".reveal:not([data-split])");
    if (!els.length) return;
    if (!("IntersectionObserver" in window)) {
      els.forEach(function (el) { el.classList.add("is-visible"); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("is-visible"); io.unobserve(en.target); }
      });
    }, { threshold: 0.05, rootMargin: "0px 0px -6% 0px" });
    els.forEach(function (el) { io.observe(el); });

    // Seguridad: a los 6s revela lo visible que siga oculto
    setTimeout(function () {
      document.querySelectorAll(".reveal:not(.is-visible)").forEach(function (el) {
        if (el.getBoundingClientRect().top < window.innerHeight + 200) el.classList.add("is-visible");
      });
    }, 6000);
  }

  /* ---------- Hero word reveal ---------- */
  function initHero() {
    var hero = document.querySelector("[data-hero]");
    if (!hero) return;
    requestAnimationFrame(function () {
      setTimeout(function () { hero.classList.add("is-lit"); }, 200);
    });
  }

  /* ---------- Nav activo según sección (home) ---------- */
  function initScrollSpy() {
    var links = document.querySelectorAll("[data-spy] a[href^='#']");
    if (!links.length || !("IntersectionObserver" in window)) return;
    var map = {};
    links.forEach(function (a) {
      var sel = a.getAttribute("href");
      var sec = document.querySelector(sel);
      if (sec) map[sec.id] = a;
    });
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          links.forEach(function (l) { l.classList.remove("is-active"); });
          if (map[en.target.id]) map[en.target.id].classList.add("is-active");
        }
      });
    }, { threshold: 0.5 });
    Object.keys(map).forEach(function (id) {
      var sec = document.getElementById(id);
      if (sec) io.observe(sec);
    });
  }

  /* ---------- Botones magnéticos (solo puntero fino) ---------- */
  function initMagnetic() {
    if (matchMedia("(hover: none)").matches) return;
    document.querySelectorAll("[data-magnetic]").forEach(function (el) {
      el.addEventListener("mousemove", function (e) {
        var r = el.getBoundingClientRect();
        var mx = e.clientX - r.left - r.width / 2;
        var my = e.clientY - r.top - r.height / 2;
        el.style.transform = "translate(" + mx * 0.18 + "px," + my * 0.22 + "px)";
      });
      el.addEventListener("mouseleave", function () { el.style.transform = ""; });
    });
  }

  /* ---------- Año dinámico ---------- */
  function initYear() {
    document.querySelectorAll("[data-year]").forEach(function (el) {
      el.textContent = new Date().getFullYear();
    });
  }

  function initConfig() {
    var wa = document.querySelector("[data-wa]");
    window.KAOS.WA_URL = wa ? wa.getAttribute("href") : "https://wa.me/34XXXXXXXXX";
  }

  function boot() {
    safe(initConfig, "initConfig");
    safe(initSplash, "initSplash");
    safe(initNav, "initNav");
    safe(initSmoothScroll, "initSmoothScroll");
    safe(initReveals, "initReveals");
    safe(initHero, "initHero");
    safe(initScrollSpy, "initScrollSpy");
    safe(initMagnetic, "initMagnetic");
    safe(initYear, "initYear");
  }

  if (document.readyState !== "loading") boot();
  else document.addEventListener("DOMContentLoaded", boot);
})();
