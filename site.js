/* site.js — menu per cellulare e selettore lingua */
(function () {
  document.querySelectorAll('.js-header').forEach(function (h) {
    var t = h.querySelector('.menu-toggle');
    if (!t) return;
    t.addEventListener('click', function () {
      var open = h.classList.toggle('open');
      t.setAttribute('aria-expanded', open);
    });
    h.querySelectorAll('nav a').forEach(function (a) {
      a.addEventListener('click', function () {
        h.classList.remove('open');
        t.setAttribute('aria-expanded', 'false');
      });
    });
  });
  document.querySelectorAll('.lang-switch').forEach(function (s) {
    var b = s.querySelector('.lang-btn');
    b.addEventListener('click', function (e) {
      e.stopPropagation();
      var open = s.classList.toggle('open');
      b.setAttribute('aria-expanded', open);
    });
  });
  document.addEventListener('click', function () {
    document.querySelectorAll('.lang-switch.open').forEach(function (s) {
      s.classList.remove('open');
      s.querySelector('.lang-btn').setAttribute('aria-expanded', 'false');
    });
  });
  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    document.querySelectorAll('.lang-switch.open, .js-header.open').forEach(function (el) { el.classList.remove('open'); });
  });
})();
