(function () {
  var root = document.documentElement;
  var KEY = "theme";
  function stored() { try { var value = localStorage.getItem(KEY); return value === "light" || value === "dark" ? value : null; } catch (e) { return null; } }
  function systemDark() { return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches; }
  var saved = stored();
  if (saved) root.setAttribute("data-theme", saved);

  document.addEventListener("DOMContentLoaded", function () {
    var button = document.querySelector(".theme-toggle");
    if (button) button.remove();

    var items = document.querySelectorAll("main section, main .entry, main .paper, main .contact");
    items.forEach(function (item, index) {
      item.classList.add("reveal");
      item.style.transitionDelay = Math.min(index * 55, 300) + "ms";
    });
    if ("IntersectionObserver" in window) {
      var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) { if (entry.isIntersecting) { entry.target.classList.add("is-visible"); observer.unobserve(entry.target); } });
      }, { threshold: .12 });
      items.forEach(function (item) { observer.observe(item); });
    } else { items.forEach(function (item) { item.classList.add("is-visible"); }); }

    var intro = document.querySelector(".intro");
    if (intro && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      intro.addEventListener("pointermove", function (event) {
        var box = intro.getBoundingClientRect();
        var x = (event.clientX - box.left) / box.width - .5;
        var y = (event.clientY - box.top) / box.height - .5;
        intro.style.transform = "perspective(1100px) rotateY(" + (x * 2.2) + "deg) rotateX(" + (-y * 2.2) + "deg)";
      });
      intro.addEventListener("pointerleave", function () { intro.style.transform = ""; });
    }
  });
})();
