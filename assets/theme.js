(function () {
  var root = document.documentElement;
  var KEY = "theme";
  function stored() { try { var value = localStorage.getItem(KEY); return value === "light" || value === "dark" ? value : null; } catch (e) { return null; } }
  function systemDark() { return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches; }
  function current() { return root.getAttribute("data-theme") || (systemDark() ? "dark" : "light"); }
  var saved = stored();
  if (saved) root.setAttribute("data-theme", saved);

  var icon = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">';
  var moon = icon + '<path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>';
  var sun = icon + '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>';
  function paint(button) {
    var dark = current() === "dark";
    button.innerHTML = dark ? sun : moon;
    button.setAttribute("aria-label", dark ? "Switch to light mode" : "Switch to dark mode");
    button.setAttribute("title", dark ? "Switch to light mode" : "Switch to dark mode");
  }
  document.addEventListener("DOMContentLoaded", function () {
    var button = document.querySelector(".theme-toggle");
    if (button) {
      button.hidden = false;
      paint(button);
      button.addEventListener("click", function () {
        var next = current() === "dark" ? "light" : "dark";
        root.setAttribute("data-theme", next);
        try { localStorage.setItem(KEY, next); } catch (e) {}
        paint(button);
      });
    }
    var items = document.querySelectorAll("main section, main .entry, main .paper, main .contact");
    items.forEach(function (item, index) { item.classList.add("reveal"); item.style.transitionDelay = Math.min(index * 55, 300) + "ms"; });
    if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      var observer = new IntersectionObserver(function (entries) { entries.forEach(function (entry) { if (entry.isIntersecting) { entry.target.classList.add("is-visible"); observer.unobserve(entry.target); } }); }, { threshold: .12 });
      items.forEach(function (item) { observer.observe(item); });
    } else { items.forEach(function (item) { item.classList.add("is-visible"); }); }
  });
})();
