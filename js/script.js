document.addEventListener("DOMContentLoaded", function () {
  // Mobile menu toggle
  var toggle = document.querySelector(".nav__toggle");
  var links = document.querySelector(".nav__links");

  if (toggle && links) {
    toggle.addEventListener("click", function () {
      var isOpen = links.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });

    links.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        links.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // Header scroll effect
  var header = document.querySelector(".site-header");
  if (header) {
    var onScroll = function () {
      if (window.scrollY > 20) {
        header.classList.add("is-scrolled");
      } else {
        header.classList.remove("is-scrolled");
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  // Scroll-triggered fade-in animations
  var animEls = document.querySelectorAll(".fade-in, .fade-in-left, .fade-in-right");
  if (animEls.length > 0 && "IntersectionObserver" in window) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    animEls.forEach(function (el) {
      observer.observe(el);
    });
  }

  // Language switcher
  var langBtns = document.querySelectorAll(".lang-switch__btn");
  var savedLang = localStorage.getItem("site-lang") || "ja";

  function setLang(lang) {
    document.documentElement.lang = lang;
    langBtns.forEach(function (btn) {
      btn.classList.toggle("is-active", btn.dataset.lang === lang);
    });
    localStorage.setItem("site-lang", lang);
  }

  setLang(savedLang);

  langBtns.forEach(function (btn) {
    btn.addEventListener("click", function () {
      setLang(btn.dataset.lang);
    });
  });
});
