(function () {
  "use strict";

  var toggle = document.getElementById("menuToggle");
  var links = document.getElementById("navLinks");
  if (toggle && links) {
    toggle.addEventListener("click", function () {
      var open = links.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(open));
    });
    links.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        links.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // Scroll-driven day -> night transition
  var root = document.documentElement;
  var ticking = false;
  function updateSky() {
    ticking = false;
    var h = window.innerHeight || 1;
    var max = h * 1.6;
    var progress = window.scrollY / max;
    if (progress < 0) progress = 0;
    if (progress > 1) progress = 1;
    root.style.setProperty("--night-progress", progress.toFixed(3));
  }
  function onScroll() {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(updateSky);
    }
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);
  updateSky();
})();
