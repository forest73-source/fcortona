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

  /* Link a una sezione (es. opere.html#arcani-maggiori): quando la pagina ha finito di caricare,
     riporta la vista sulla sezione giusta anche se le immagini sopra hanno cambiato l'altezza */
  function goToHash() {
    if (!location.hash) return;
    var t = document.getElementById(decodeURIComponent(location.hash.slice(1)));
    if (t) t.scrollIntoView({ block: 'start' });
  }
  window.addEventListener('load', function () { setTimeout(goToHash, 50); });
})();

/* Resta in Contatto: apre il programma di posta con la richiesta di iscrizione già scritta */
(function () {
  var T = {
    it: ['Iscrizione alla newsletter', 'Vorrei iscrivermi alla newsletter.\nLa mia email: '],
    en: ['Newsletter subscription', 'I would like to subscribe to the newsletter.\nMy email: '],
    fr: ['Inscription à la newsletter', 'Je souhaite m’inscrire à la newsletter.\nMon e-mail : '],
    pt: ['Inscrição na newsletter', 'Gostaria de me inscrever na newsletter.\nMeu e-mail: '],
    zh: ['订阅简报', '我想订阅简报。\n我的邮箱：']
  };
  var lang = (document.documentElement.lang || 'it').slice(0, 2);
  var t = T[lang] || T.it;
  document.querySelectorAll('.newsletter form, form.newsletter-form').forEach(function (f) {
    f.addEventListener('submit', function (e) {
      e.preventDefault();
      var m = f.querySelector('input[type="email"]');
      if (!m || !m.value) return;
      window.location.href = 'mailto:cortonafrancescapainter@gmail.com?subject=' +
        encodeURIComponent(t[0]) + '&body=' + encodeURIComponent(t[1] + m.value);
    });
  });
})();
